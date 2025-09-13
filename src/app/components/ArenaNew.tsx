'use client';

import { useState, useEffect, useRef } from 'react';

interface Character {
  id: string;
  mbtiType: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isInteracting: boolean;
}

interface Conversation {
  character1: Character;
  character2: Character;
  messages: { speaker: string; content: string }[];
  turn: number;
  isActive: boolean;
}

const mbtiTypes = [
  { code: 'INTJ', name: '建筑师', emoji: '🏗️', color: 'text-purple-600' },
  { code: 'INTP', name: '思想家', emoji: '🧪', color: 'text-purple-500' },
  { code: 'ENTJ', name: '指挥官', emoji: '👑', color: 'text-orange-600' },
  { code: 'ENTP', name: '辩论家', emoji: '🦊', color: 'text-orange-500' },
  { code: 'INFJ', name: '提倡者', emoji: '🧙‍♂️', color: 'text-green-600' },
  { code: 'INFP', name: '调停者', emoji: '🦥', color: 'text-pink-600' },
  { code: 'ENFJ', name: '主人公', emoji: '🐶', color: 'text-green-500' },
  { code: 'ENFP', name: '竞选者', emoji: '🐬', color: 'text-blue-500' },
  { code: 'ISTJ', name: '物流师', emoji: '🔍', color: 'text-blue-600' },
  { code: 'ISFJ', name: '守护者', emoji: '🦌', color: 'text-blue-400' },
  { code: 'ESTJ', name: '总经理', emoji: '🦁', color: 'text-orange-500' },
  { code: 'ESFJ', name: '执政官', emoji: '🐘', color: 'text-pink-500' },
  { code: 'ISTP', name: '鉴赏家', emoji: '🛠️', color: 'text-yellow-600' },
  { code: 'ISFP', name: '探险家', emoji: '🐰', color: 'text-yellow-500' },
  { code: 'ESTP', name: '企业家', emoji: '🐆', color: 'text-red-600' },
  { code: 'ESFP', name: '娱乐家', emoji: '🎭', color: 'text-yellow-500' }
];

export default function ChatRoom() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showMbtiSelector, setShowMbtiSelector] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const CHARACTER_SIZE = 60;
  const INTERACTION_DISTANCE = 120;
  const SPEED = 1;

  const getMbtiInfo = (type: string) => {
    return mbtiTypes.find(mbti => mbti.code === type);
  };

  const addCharacter = (mbtiType: string) => {
    const newCharacter: Character = {
      id: Date.now().toString(),
      mbtiType,
      x: Math.random() * (CANVAS_WIDTH - CHARACTER_SIZE),
      y: Math.random() * (CANVAS_HEIGHT - CHARACTER_SIZE),
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      isInteracting: false
    };
    setCharacters(prev => [...prev, newCharacter]);
    setShowMbtiSelector(false);
  };

  const resetChatRoom = () => {
    setCharacters([]);
    setConversations([]);
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const distance = (char1: Character, char2: Character) => {
    return Math.sqrt(Math.pow(char1.x - char2.x, 2) + Math.pow(char1.y - char2.y, 2));
  };

  const startConversation = async (char1: Character, char2: Character) => {
    // 标记角色为正在互动状态
    setCharacters(prev => prev.map(char => {
      if (char.id === char1.id || char.id === char2.id) {
        return { ...char, isInteracting: true };
      }
      return char;
    }));

    const conversation: Conversation = {
      character1: char1,
      character2: char2,
      messages: [],
      turn: 0,
      isActive: true
    };

    setConversations(prev => [...prev, conversation]);

    // 开始对话
    for (let turn = 0; turn < 10; turn++) {
      const speaker = turn % 2 === 0 ? char1 : char2;
      const listener = turn % 2 === 0 ? char2 : char1;
      
      try {
        const response = await fetch('/api/chatroom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPersonality: speaker.mbtiType,
            conversationHistory: conversation.messages.map(msg => ({
              text: msg.content,
              sender: 'ai',
              mbtiType: msg.speaker
            })),
            triggerType: turn === 0 ? 'start' : 'continue'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          conversation.messages.push({
            speaker: speaker.mbtiType,
            content: data.response
          });

          // 更新对话状态
          setConversations(prev => prev.map(conv => 
            conv.character1.id === conversation.character1.id && 
            conv.character2.id === conversation.character2.id ? 
            { ...conv, messages: [...conversation.messages], turn: turn + 1 } : conv
          ));

          // 等待2秒再继续下一轮
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error('对话生成失败:', error);
        break;
      }
    }

    // 对话结束，释放角色
    setTimeout(() => {
      setCharacters(prev => prev.map(char => {
        if (char.id === char1.id || char.id === char2.id) {
          return { ...char, isInteracting: false };
        }
        return char;
      }));

      setConversations(prev => prev.filter(conv => 
        !(conv.character1.id === conversation.character1.id && 
          conv.character2.id === conversation.character2.id)
      ));
    }, 3000);
  };

  const updateCharacters = () => {
    setCharacters(prev => {
      const newCharacters = prev.map(char => {
        if (char.isInteracting) return char;

        let newX = char.x + char.vx;
        let newY = char.y + char.vy;
        let newVx = char.vx;
        let newVy = char.vy;

        // 边界碰撞检测
        if (newX <= 0 || newX >= CANVAS_WIDTH - CHARACTER_SIZE) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(CANVAS_WIDTH - CHARACTER_SIZE, newX));
        }
        if (newY <= 0 || newY >= CANVAS_HEIGHT - CHARACTER_SIZE) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(CANVAS_HEIGHT - CHARACTER_SIZE, newY));
        }

        return { ...char, x: newX, y: newY, vx: newVx, vy: newVy };
      });

      // 检测角色间的碰撞和互动
      for (let i = 0; i < newCharacters.length; i++) {
        for (let j = i + 1; j < newCharacters.length; j++) {
          const char1 = newCharacters[i];
          const char2 = newCharacters[j];
          
          if (!char1.isInteracting && !char2.isInteracting && 
              distance(char1, char2) < INTERACTION_DISTANCE) {
            // 开始对话
            startConversation(char1, char2);
          }
        }
      }

      return newCharacters;
    });
  };

  useEffect(() => {
    const animate = () => {
      updateCharacters();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20 bg-white/50 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              聊天室
            </h1>
            <p className="text-gray-600 mt-2">
              🏟️ 观察不同MBTI人格的自主互动
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowMbtiSelector(!showMbtiSelector)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ➕ 添加角色
            </button>
            <button
              onClick={resetChatRoom}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔄 重置聊天室
            </button>
          </div>
        </div>
      </div>

      {/* MBTI Type Selector */}
      {showMbtiSelector && (
        <div className="p-6 bg-white/80 backdrop-blur-xl border-b border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">选择MBTI人格类型</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {mbtiTypes.map((type) => (
              <button
                key={type.code}
                onClick={() => addCharacter(type.code)}
                className="p-3 bg-white/80 hover:bg-white border border-white/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-center"
              >
                <div className="text-2xl mb-1">{type.emoji}</div>
                <div className={`text-xs font-mono font-bold ${type.color}`}>
                  {type.code}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Arena Canvas */}
      <div className="flex-1 p-6">
        <div 
          ref={canvasRef}
          className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl shadow-inner overflow-hidden mx-auto"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          {characters.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎭</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  聊天室空无一人
                </h3>
                <p className="text-gray-600">
                  点击"添加角色"来观察MBTI人格之间的互动
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Characters */}
              {characters.map((character) => {
                const mbtiInfo = getMbtiInfo(character.mbtiType);
                return (
                  <div
                    key={character.id}
                    className={`absolute transition-all duration-100 ${
                      character.isInteracting ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      left: character.x,
                      top: character.y,
                      width: CHARACTER_SIZE,
                      height: CHARACTER_SIZE
                    }}
                  >
                    <div className={`w-full h-full rounded-full border-4 ${
                      character.isInteracting 
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' 
                        : 'border-white shadow-lg'
                    } bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300`}>
                      <div className="text-2xl">{mbtiInfo?.emoji}</div>
                      <div className={`text-xs font-mono font-bold ${mbtiInfo?.color}`}>
                        {character.mbtiType}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Conversation Bubbles */}
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                if (!lastMessage) return null;

                const char1 = conversation.character1;
                const char2 = conversation.character2;
                const midX = (char1.x + char2.x) / 2;
                const midY = (char1.y + char2.y) / 2 - 80;

                return (
                  <div
                    key={`${char1.id}-${char2.id}`}
                    className="absolute z-30 max-w-xs"
                    style={{ left: midX - 150, top: Math.max(0, midY) }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl p-3 shadow-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono font-bold text-sm ${
                          getMbtiInfo(lastMessage.speaker)?.color
                        }`}>
                          {lastMessage.speaker}
                        </span>
                        <span className="text-xs text-gray-500">
                          {conversation.turn}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {lastMessage.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
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
  messages: { speaker: string; content: string; turn: number; displayedContent: string }[];
  currentTurn: number;
  isActive: boolean;
  timeRemaining: number;
}

const mbtiTypes = [
  { code: 'INTJ', name: '建筑师', emoji: '🏗️', color: 'text-purple-600' },
  { code: 'INTP', name: '思想家', emoji: '🧪', color: 'text-purple-500' },
  { code: 'ENTJ', name: '指挥官', emoji: '👑', color: 'text-orange-600' },
  { code: 'ENTP', name: '辩论家', emoji: '🦊', color: 'text-orange-500' },
  { code: 'INFJ', name: '提倡者', emoji: '🧙‍♂️', color: 'text-green-600' },
  { code: 'INFP', name: '调停者', emoji: '🦄', color: 'text-pink-600' },
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

export default function Arena() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedMbtiType, setSelectedMbtiType] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const streamingTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Arena settings
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const CHARACTER_SIZE = 60;
  const INTERACTION_DISTANCE = 100;
  const SPEED = 1.5;
  const MAX_CONVERSATION_TURNS = 10;
  const CONVERSATION_TURN_DURATION = 3000; // 3 seconds per turn

  const getMbtiInfo = (type: string) => {
    return mbtiTypes.find(mbti => mbti.code === type);
  };

  const addCharacter = () => {
    if (!selectedMbtiType) return;
    
    const newCharacter: Character = {
      id: Date.now().toString() + Math.random(),
      mbtiType: selectedMbtiType,
      x: Math.random() * (CANVAS_WIDTH - CHARACTER_SIZE),
      y: Math.random() * (CANVAS_HEIGHT - CHARACTER_SIZE),
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      isInteracting: false
    };
    setCharacters(prev => [...prev, newCharacter]);
  };

  const resetArena = () => {
    setCharacters([]);
    setConversations([]);
    setSelectedMbtiType(null);
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    // Clear all streaming timeouts
    streamingTimeouts.current.forEach(timeout => clearTimeout(timeout));
    streamingTimeouts.current.clear();
  };

  // Streaming text effect
  const startStreamingText = (conversationId: string, messageIndex: number, fullText: string) => {
    const timeoutKey = `${conversationId}-${messageIndex}`;
    
    // Clear any existing timeout
    const existingTimeout = streamingTimeouts.current.get(timeoutKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    let currentIndex = 0;
    const streamInterval = 50; // milliseconds per character

    const streamNextChar = () => {
      if (currentIndex <= fullText.length) {
        const displayedText = fullText.substring(0, currentIndex);
        
        setConversations(prev => prev.map(conv => {
          if (`${conv.character1.id}-${conv.character2.id}` === conversationId) {
            const updatedMessages = [...conv.messages];
            if (updatedMessages[messageIndex]) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                displayedContent: displayedText
              };
            }
            return { ...conv, messages: updatedMessages };
          }
          return conv;
        }));

        currentIndex++;
        
        if (currentIndex <= fullText.length) {
          const timeout = setTimeout(streamNextChar, streamInterval);
          streamingTimeouts.current.set(timeoutKey, timeout);
        } else {
          streamingTimeouts.current.delete(timeoutKey);
        }
      }
    };

    streamNextChar();
  };

  // Calculate bubble position with collision avoidance
  const calculateBubblePosition = (speaker: Character, conversations: Conversation[], currentConvId: string) => {
    const bubbleWidth = 280;
    const bubbleHeight = 100;
    let bubbleX = speaker.x + CHARACTER_SIZE / 2 - bubbleWidth / 2;
    let bubbleY = speaker.y - 10; // Gap between bubble bottom and character top
    
    // Ensure bubble stays within canvas bounds
    bubbleX = Math.max(10, Math.min(CANVAS_WIDTH - bubbleWidth - 10, bubbleX));
    bubbleY = Math.max(10, bubbleY);
    
    // If bubble would be too high, place it below the character
    if (bubbleY < 10) {
      bubbleY = speaker.y + CHARACTER_SIZE + 5;
    }

    // Check for collisions with other conversation bubbles
    let attempts = 0;
    const maxAttempts = 5;
    const offsetStep = 30;

    while (attempts < maxAttempts) {
      let hasCollision = false;
      
      for (const otherConv of conversations) {
        const otherConvId = `${otherConv.character1.id}-${otherConv.character2.id}`;
        if (otherConvId === currentConvId) continue;
        
        const lastMessage = otherConv.messages[otherConv.messages.length - 1];
        if (!lastMessage) continue;

        const otherSpeaker = lastMessage.speaker === otherConv.character1.mbtiType ? 
          otherConv.character1 : otherConv.character2;
        
        // Calculate other bubble position (simplified)
        let otherBubbleX = otherSpeaker.x + CHARACTER_SIZE / 2 - bubbleWidth / 2;
        let otherBubbleY = otherSpeaker.y - 10;
        otherBubbleX = Math.max(10, Math.min(CANVAS_WIDTH - bubbleWidth - 10, otherBubbleX));
        otherBubbleY = Math.max(10, otherBubbleY);
        if (otherBubbleY < 10) {
          otherBubbleY = otherSpeaker.y + CHARACTER_SIZE + 5;
        }

        // Check if bubbles overlap
        if (bubbleX < otherBubbleX + bubbleWidth &&
            bubbleX + bubbleWidth > otherBubbleX &&
            bubbleY < otherBubbleY + bubbleHeight &&
            bubbleY + bubbleHeight > otherBubbleY) {
          hasCollision = true;
          break;
        }
      }

      if (!hasCollision) break;

      // Try different positions
      attempts++;
      if (attempts % 2 === 1) {
        // Try moving horizontally
        bubbleX += offsetStep * Math.sign(speaker.x - CANVAS_WIDTH / 2);
        bubbleX = Math.max(10, Math.min(CANVAS_WIDTH - bubbleWidth - 10, bubbleX));
      } else {
        // Try moving vertically
        bubbleY += offsetStep;
        if (bubbleY + bubbleHeight > CANVAS_HEIGHT - 10) {
          bubbleY = speaker.y - bubbleHeight - 20 - offsetStep * attempts;
          bubbleY = Math.max(10, bubbleY);
        }
      }
    }

    return { bubbleX, bubbleY };
  };

  const removeCharacter = (id: string) => {
    setCharacters(prev => prev.filter(char => char.id !== id));
    setConversations(prev => prev.filter(conv => 
      conv.character1.id !== id && conv.character2.id !== id
    ));
  };

  const distance = (char1: Character, char2: Character) => {
    return Math.sqrt(Math.pow(char1.x - char2.x, 2) + Math.pow(char1.y - char2.y, 2));
  };

  const startConversation = async (char1: Character, char2: Character) => {
    // Mark characters as interacting
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
      currentTurn: 0,
      isActive: true,
      timeRemaining: CONVERSATION_TURN_DURATION
    };

    setConversations(prev => [...prev, conversation]);

    // Start the conversation loop
    for (let turn = 0; turn < MAX_CONVERSATION_TURNS; turn++) {
      const speaker = turn % 2 === 0 ? char1 : char2;
      const listener = turn % 2 === 0 ? char2 : char1;
      
      try {
        const response = await fetch('/api/chatroom/arena', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            speaker: speaker.mbtiType,
            listener: listener.mbtiType,
            conversationHistory: conversation.messages,
            turn: turn,
            isFirstTurn: turn === 0
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const newMessage = {
            speaker: speaker.mbtiType,
            content: data.response,
            turn: turn,
            displayedContent: ''
          };
          
          conversation.messages.push(newMessage);

          // Update conversation state
          setConversations(prev => prev.map(conv => 
            conv.character1.id === conversation.character1.id && 
            conv.character2.id === conversation.character2.id ? 
            { ...conv, messages: [...conversation.messages], currentTurn: turn + 1 } : conv
          ));

          // Start streaming text effect
          const conversationId = `${conversation.character1.id}-${conversation.character2.id}`;
          const messageIndex = conversation.messages.length - 1;
          startStreamingText(conversationId, messageIndex, data.response);

          // Wait before next turn
          await new Promise(resolve => setTimeout(resolve, CONVERSATION_TURN_DURATION));
        } else {
          console.error('Failed to generate conversation turn');
          break;
        }
      } catch (error) {
        console.error('对话生成失败:', error);
        break;
      }
    }

    // End conversation - clear bubble content first, then release characters
    setTimeout(() => {
      // First clear the bubble content
      setConversations(prev => prev.map(conv => {
        if (conv.character1.id === conversation.character1.id && 
            conv.character2.id === conversation.character2.id) {
          const clearedMessages = conv.messages.map(msg => ({
            ...msg,
            displayedContent: ''
          }));
          return { ...conv, messages: clearedMessages };
        }
        return conv;
      }));

      // Then remove the conversation and release characters after a short delay
      setTimeout(() => {
        setCharacters(prev => prev.map(char => {
          if (char.id === char1.id || char.id === char2.id) {
            return { 
              ...char, 
              isInteracting: false,
              vx: (Math.random() - 0.5) * SPEED * 2,
              vy: (Math.random() - 0.5) * SPEED * 2
            };
          }
          return char;
        }));

        setConversations(prev => prev.filter(conv => 
          !(conv.character1.id === conversation.character1.id && 
            conv.character2.id === conversation.character2.id)
        ));
      }, 500); // Small delay to show empty bubble before removal
    }, 2000);
  };

  const updateCharacters = () => {
    setCharacters(prev => {
      const newCharacters = prev.map(char => {
        if (char.isInteracting) return char;

        let newX = char.x + char.vx;
        let newY = char.y + char.vy;
        let newVx = char.vx;
        let newVy = char.vy;

        // Boundary collision detection
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

      // Check for character interactions
      for (let i = 0; i < newCharacters.length; i++) {
        for (let j = i + 1; j < newCharacters.length; j++) {
          const char1 = newCharacters[i];
          const char2 = newCharacters[j];
          
          // Check if these characters are already in a conversation
          const existingConversation = conversations.find(conv => 
            (conv.character1.id === char1.id && conv.character2.id === char2.id) ||
            (conv.character1.id === char2.id && conv.character2.id === char1.id)
          );
          
          if (!char1.isInteracting && !char2.isInteracting && 
              !existingConversation &&
              distance(char1, char2) < INTERACTION_DISTANCE) {
            // Start conversation
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🏟️</span>
            竞技场
          </h2>
          <p className="text-sm text-gray-600 mt-1">观察不同MBTI人格的自主互动对话</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetArena}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span>🔄</span>
            重置竞技场
          </button>
        </div>
      </div>

      {/* Role Selection Panel - Always Visible */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">选择角色类型</h3>
          <button
            onClick={addCharacter}
            disabled={!selectedMbtiType}
            className={`px-4 py-2 font-medium text-sm rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              selectedMbtiType
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>🚀</span>
            加入竞技场
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {mbtiTypes.map((type) => (
            <button
              key={type.code}
              onClick={() => setSelectedMbtiType(type.code)}
              className={`p-3 border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-center ${
                selectedMbtiType === type.code
                  ? 'bg-blue-100 border-blue-400 shadow-lg ring-2 ring-blue-300'
                  : 'bg-white/80 hover:bg-white border-white/30'
              }`}
            >
              <div className="text-2xl mb-1">{type.emoji}</div>
              <div className={`text-xs font-mono font-bold ${type.color}`}>
                {type.code}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {type.name}
              </div>
            </button>
          ))}
        </div>
        {selectedMbtiType && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getMbtiInfo(selectedMbtiType)?.emoji}</div>
              <div>
                <div className="font-semibold text-gray-800">
                  已选择: {getMbtiInfo(selectedMbtiType)?.name} ({selectedMbtiType})
                </div>
                <div className="text-sm text-gray-600">
                  点击"加入竞技场"按钮将此角色添加到竞技场中
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Arena Canvas */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <div 
          ref={canvasRef}
          className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-2xl shadow-inner overflow-hidden mx-auto"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          {characters.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏟️</div>
                <h3 className="text-xl font-semibold text-gray-800">
                  竞技场空无一人
                </h3>
                <p className="text-gray-600">
                  点击"添加角色"来观察MBTI人格之间的自主互动
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
                    } group`}
                    style={{
                      left: character.x,
                      top: character.y,
                      width: CHARACTER_SIZE,
                      height: CHARACTER_SIZE
                    }}
                  >
                    <div className={`w-full h-full rounded-full border-4 ${
                      character.isInteracting 
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' 
                        : 'border-white shadow-lg'
                    } bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer hover:scale-110`}>
                      <div className="text-2xl">{mbtiInfo?.emoji}</div>
                      <div className={`text-xs font-mono font-bold ${mbtiInfo?.color}`}>
                        {character.mbtiType}
                      </div>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeCharacter(character.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                );
              })}

              {/* Conversation Bubbles */}
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                if (!lastMessage) return null;

                const char1 = conversation.character1;
                const char2 = conversation.character2;
                const currentConvId = `${char1.id}-${char2.id}`;
                
                // Determine speaker character
                const speaker = lastMessage.speaker === char1.mbtiType ? char1 : char2;
                
                // Calculate bubble position with collision avoidance
                const { bubbleX, bubbleY } = calculateBubblePosition(speaker, conversations, currentConvId);
                const bubbleWidth = 280;

                return (
                  <div
                    key={`${char1.id}-${char2.id}`}
                    className="absolute z-30"
                    style={{ 
                      left: bubbleX, 
                      bottom: CANVAS_HEIGHT - bubbleY,
                      width: bubbleWidth,
                      maxWidth: bubbleWidth
                    }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm border border-white/30 rounded-xl p-3 shadow-lg relative">
                      {/* Speech bubble pointer */}
                      <div 
                        className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"
                        style={{
                          left: Math.max(8, Math.min(bubbleWidth - 16, speaker.x + CHARACTER_SIZE / 2 - bubbleX - 8)),
                          bottom: bubbleY < speaker.y ? '-8px' : 'auto',
                          top: bubbleY > speaker.y + CHARACTER_SIZE ? '-8px' : 'auto',
                          transform: bubbleY > speaker.y + CHARACTER_SIZE ? 'rotate(180deg)' : 'none'
                        }}
                      />
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono font-bold text-sm ${
                          getMbtiInfo(lastMessage.speaker)?.color
                        }`}>
                          {lastMessage.speaker}
                        </span>
                        <span className="text-xs text-gray-500">
                          {conversation.currentTurn}/{MAX_CONVERSATION_TURNS}轮
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {lastMessage.displayedContent !== undefined ? lastMessage.displayedContent : lastMessage.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        {/* Stats */}
        {characters.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              角色数量: {characters.length}
            </span>
            <span className="mx-4 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              进行中对话: {conversations.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
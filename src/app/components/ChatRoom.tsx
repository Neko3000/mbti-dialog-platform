'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  mbtiType?: string;
  timestamp: Date;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [autoTimer, setAutoTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearAutoTimer = () => {
    if (autoTimer) {
      clearTimeout(autoTimer);
      setAutoTimer(null);
    }
  };

  const sendAIMessage = async (conversationHistory: Message[]) => {
    try {
      const response = await fetch('/api/chatroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationHistory: conversationHistory.map(msg => ({
            content: msg.content,
            sender: msg.sender,
            mbtiType: msg.mbtiType
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('AI 响应失败');
      }

      const data = await response.json();
      
      const newMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        sender: 'ai',
        mbtiType: data.mbtiType,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      
      // 设置 5 秒后自动发送下一条消息
      const timer = setTimeout(() => {
        sendAIMessage([...conversationHistory, newMessage]);
      }, 5000);
      
      setAutoTimer(timer);
      
    } catch (error) {
      console.error('AI 响应失败:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // 清除自动计时器
    clearAutoTimer();

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    // 发送 AI 响应
    await sendAIMessage(newMessages);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    clearAutoTimer();
    setMessages([]);
    setInputText('');
    setIsLoading(false);
  };

  const getMbtiInfo = (type: string) => {
    return mbtiTypes.find(mbti => mbti.code === type);
  };

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
              🏟️ 与16种不同MBTI人格进行动态对话练习
            </p>
          </div>
          <button
            onClick={startNewConversation}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 开始新对话
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 max-w-md">
              <div className="text-6xl">🤖</div>
              <h3 className="text-xl font-semibold text-gray-800">
                欢迎来到MBTI聊天室
              </h3>
              <p className="text-gray-600 leading-relaxed">
                发送一个话题开始对话，AI将以不同的MBTI人格与您互动。
                <br />
                每5秒会有新的人格加入对话！
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg'
                  }`}
                >
                  {message.sender === 'ai' && message.mbtiType && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200/50">
                      <span className="text-xl">
                        {getMbtiInfo(message.mbtiType)?.emoji}
                      </span>
                      <span className={`font-mono font-bold text-sm ${getMbtiInfo(message.mbtiType)?.color}`}>
                        {message.mbtiType}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getMbtiInfo(message.mbtiType)?.name}
                      </span>
                    </div>
                  )}
                  <p className={`${
                    message.sender === 'user' 
                      ? 'text-white' 
                      : 'text-gray-800'
                  } leading-relaxed`}>
                    {message.content}
                  </p>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-white/70' 
                      : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">AI正在思考...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/20 bg-white/50 backdrop-blur-xl">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={messages.length === 0 
                ? "输入一个话题开始对话，例如：我们来讨论一下团队协作的最佳方式..." 
                : "继续对话..."
              }
              className="w-full p-4 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500 text-gray-800 shadow-inner transition-all duration-300"
              rows={2}
              maxLength={500}
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {inputText.length}/500
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 transform ${
              !inputText.trim() || isLoading
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg active:scale-95'
            }`}
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
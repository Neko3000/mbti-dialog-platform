'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  mbtiType?: string;
  timestamp: number;
}

const mbtiTypes = [
  { code: 'INTJ', name: '建筑师', emoji: '🏗️', color: 'from-purple-500 to-purple-700' },
  { code: 'INTP', name: '思想家', emoji: '🧪', color: 'from-purple-400 to-indigo-600' },
  { code: 'ENTJ', name: '指挥官', emoji: '👑', color: 'from-orange-500 to-red-600' },
  { code: 'ENTP', name: '辩论家', emoji: '🦊', color: 'from-orange-400 to-pink-500' },
  { code: 'INFJ', name: '提倡者', emoji: '🧙‍♂️', color: 'from-green-500 to-teal-600' },
  { code: 'INFP', name: '调停者', emoji: '🦥', color: 'from-pink-400 to-rose-600' },
  { code: 'ENFJ', name: '主人公', emoji: '🐶', color: 'from-green-400 to-emerald-600' },
  { code: 'ENFP', name: '竞选者', emoji: '🐬', color: 'from-blue-400 to-cyan-600' },
  { code: 'ISTJ', name: '物流师', emoji: '🔍', color: 'from-blue-500 to-blue-700' },
  { code: 'ISFJ', name: '守护者', emoji: '🦌', color: 'from-blue-400 to-indigo-600' },
  { code: 'ESTJ', name: '总经理', emoji: '🦁', color: 'from-orange-500 to-amber-600' },
  { code: 'ESFJ', name: '执政官', emoji: '🐘', color: 'from-pink-400 to-purple-500' },
  { code: 'ISTP', name: '鉴赏家', emoji: '🛠️', color: 'from-yellow-500 to-orange-600' },
  { code: 'ISFP', name: '探险家', emoji: '🐰', color: 'from-yellow-400 to-pink-500' },
  { code: 'ESTP', name: '企业家', emoji: '🐆', color: 'from-yellow-500 to-red-600' },
  { code: 'ESFP', name: '娱乐家', emoji: '🎭', color: 'from-yellow-400 to-orange-500' }
];

export default function Arena() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextResponseTimer, setNextResponseTimer] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isGeneratingRef = useRef<boolean>(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomMBTIType = (excludeType?: string) => {
    let availableTypes = mbtiTypes;
    
    // If we need to exclude a type, filter it out
    if (excludeType) {
      availableTypes = mbtiTypes.filter(type => type.code !== excludeType);
    }
    
    return availableTypes[Math.floor(Math.random() * availableTypes.length)];
  };

  const generateAIResponse = async (conversationHistory: Message[]) => {
    // Prevent multiple simultaneous generations
    if (isGeneratingRef.current) {
      return;
    }
    
    isGeneratingRef.current = true;
    
    try {
      // Get the last AI message's MBTI type to avoid consecutive duplicates
      const lastAIMessage = conversationHistory
        .slice()
        .reverse()
        .find(msg => msg.sender === 'ai' && msg.mbtiType);
      
      const randomType = getRandomMBTIType(lastAIMessage?.mbtiType);
      
      const response = await fetch('/api/arena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationHistory: conversationHistory.map(msg => ({
            text: msg.text,
            sender: msg.sender,
            mbtiType: msg.mbtiType
          })),
          currentPersonality: randomType.code,
          triggerType: 'response'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}-${Math.random()}`,
        text: data.response,
        sender: 'ai',
        mbtiType: randomType.code,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('生成AI响应失败:', error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}-${Math.random()}`,
        text: '抱歉，我暂时无法回应。请稍后再试。',
        sender: 'ai',
        mbtiType: 'SYSTEM',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      isGeneratingRef.current = false;
    }
  };

  const triggerAutoResponse = () => {
    setMessages(currentMessages => {
      // Generate AI response using current messages
      generateAIResponse(currentMessages);
      return currentMessages; // Don't modify the state here
    });
    
    // Schedule next auto response
    startAutoResponseTimer();
  };

  const startAutoResponseTimer = () => {
    clearTimer();
    
    let countdown = 3;
    setNextResponseTimer(countdown);
    
    const countdownInterval = setInterval(() => {
      countdown -= 1;
      setNextResponseTimer(countdown);
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setNextResponseTimer(null);
        timerRef.current = null;
        
        // Trigger auto response after a small delay
        setTimeout(triggerAutoResponse, 100);
      }
    }, 1000);
    
    timerRef.current = countdownInterval;
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setNextResponseTimer(null);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Clear any running timer
    clearTimer();

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText.trim(),
      sender: 'user',
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    // Generate immediate AI response
    await generateAIResponse(updatedMessages);
    
    setIsLoading(false);
    
    // Start the auto response timer
    setTimeout(() => {
      startAutoResponseTimer();
    }, 500);
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInputText('');
    clearTimer();
    setIsLoading(false);
    isGeneratingRef.current = false;
  };

  const getMBTITypeInfo = (code: string) => {
    return mbtiTypes.find(type => type.code === code);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🎭</span>
            竞技场
          </h2>
          <p className="text-sm text-gray-600 mt-1">与多种MBTI人格进行动态对话</p>
        </div>
        <button
          onClick={handleNewConversation}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <span>🔄</span>
          开始新对话
        </button>
      </div>

      {/* Messages Container */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 flex flex-col h-[800px]">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="space-y-3">
                <div className="text-6xl">💬</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">欢迎来到MBTI竞技场</h3>
                  <p className="text-gray-600 text-sm">
                    发送一条消息开始对话，AI将以不同的MBTI人格与您互动
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' ? (
                    <div className="flex gap-3 max-w-xs lg:max-w-md">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getMBTITypeInfo(message.mbtiType || '')?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center text-xl font-medium flex-shrink-0 shadow-lg ring-2 ring-white/50`}>
                        {getMBTITypeInfo(message.mbtiType || '')?.emoji || '🤖'}
                      </div>
                      
                      {/* Message bubble */}
                      <div className="flex flex-col">
                        {/* Name and MBTI type */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-gray-800">
                            {getMBTITypeInfo(message.mbtiType || '')?.name || 'AI'}
                          </span>
                          <span className={`text-xs font-mono font-bold text-white bg-gradient-to-r ${getMBTITypeInfo(message.mbtiType || '')?.color || 'from-gray-400 to-gray-600'} px-2 py-1 rounded-full shadow-sm`}>
                            {message.mbtiType || 'AI'}
                          </span>
                        </div>
                        
                        {/* Message content */}
                        <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-5 py-4 rounded-2xl rounded-tl-md border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white px-5 py-4 rounded-2xl rounded-tr-md max-w-xs lg:max-w-md shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-400/30">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {message.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Timer Display */}
        {messages.length > 0 && (
          <div className="px-4 py-2 border-t border-white/20">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span>
                {nextResponseTimer !== null 
                  ? `下一条回复将在 ${nextResponseTimer} 秒后自动生成`
                  : '正在生成回复...'
                }
              </span>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="输入您的消息..."
              className="flex-1 px-4 py-3 bg-white/80 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                !inputText.trim() || isLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-lg'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                '发送'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
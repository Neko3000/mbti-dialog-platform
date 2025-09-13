'use client';

import { useState, useEffect, useRef } from 'react';

const mbtiTypes = [
  { code: 'INTJ', name: '建筑师', description: '偏好直接、逻辑清晰和客观的沟通。聚焦于效率和解决方案。', emoji: '🏗️', gradient: 'from-purple-500 to-purple-700' },
  { code: 'INTP', name: '思想家', description: '喜欢探讨概念和理论。重视逻辑一致性和精确性。', emoji: '🧪', gradient: 'from-purple-400 to-indigo-600' },
  { code: 'ENTJ', name: '指挥官', description: '偏好果断、结构化的沟通。重视效率和明确的行动计划。', emoji: '👑', gradient: 'from-orange-500 to-red-600' },
  { code: 'ENTP', name: '辩论家', description: '享受探讨可能性和新观点。喜欢开放性讨论和头脑风暴。', emoji: '🦊', gradient: 'from-orange-400 to-pink-500' },
  { code: 'INFJ', name: '提倡者', description: '重视深度和意义。偏好温和、体贴的沟通方式。', emoji: '🧙‍♂️', gradient: 'from-green-500 to-teal-600' },
  { code: 'INFP', name: '调停者', description: '重视和谐、个人意义和鼓励。不喜欢苛刻的批评。', emoji: '🦥', gradient: 'from-pink-400 to-rose-600' },
  { code: 'ENFJ', name: '主人公', description: '重视和谐和他人感受。喜欢鼓励性和支持性的沟通。', emoji: '🐶', gradient: 'from-green-400 to-emerald-600' },
  { code: 'ENFP', name: '竞选者', description: '喜欢热情、积极的沟通。重视创意和可能性。', emoji: '🐬', gradient: 'from-blue-400 to-cyan-600' },
  { code: 'ISTJ', name: '物流师', description: '偏好清晰、具体和实用的信息。重视传统和可靠性。', emoji: '🔍', gradient: 'from-blue-500 to-blue-700' },
  { code: 'ISFJ', name: '守护者', description: '重视和谐和他人需求。偏好温和、支持性的沟通。', emoji: '🦌', gradient: 'from-blue-400 to-indigo-600' },
  { code: 'ESTJ', name: '总经理', description: '重视结构、事实和清晰的行动计划。不喜欢模糊性。', emoji: '🦁', gradient: 'from-orange-500 to-amber-600' },
  { code: 'ESFJ', name: '执政官', description: '重视和谐和团队合作。喜欢友好、支持性的沟通。', emoji: '🐘', gradient: 'from-pink-400 to-purple-500' },
  { code: 'ISTP', name: '鉴赏家', description: '偏好简洁、实用的沟通。重视自主性和灵活性。', emoji: '🛠️', gradient: 'from-yellow-500 to-orange-600' },
  { code: 'ISFP', name: '探险家', description: '重视个人价值观和和谐。偏好温和、非对抗性的沟通。', emoji: '🐰', gradient: 'from-yellow-400 to-pink-500' },
  { code: 'ESTP', name: '企业家', description: '喜欢直接、行动导向的沟通。重视实际结果和即时反馈。', emoji: '🐆', gradient: 'from-yellow-500 to-red-600' },
  { code: 'ESFP', name: '娱乐家', description: '喜欢热情、友好的沟通。重视积极性和人际联系。', emoji: '🎭', gradient: 'from-yellow-400 to-orange-500' }
];

export default function LanguageConverter() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [fullResponseText, setFullResponseText] = useState<string>('');
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  // 字符级流式显示函数
  const startCharacterStream = (text: string) => {
    let currentIndex = 0;
    const charDelay = 50; // 每个字符间隔50ms
    
    const displayNextChar = () => {
      if (currentIndex <= text.length) {
        const displayedText = text.substring(0, currentIndex);
        setOutputText(displayedText);
        currentIndex++;
        
        if (currentIndex <= text.length) {
          streamingTimeoutRef.current = setTimeout(displayNextChar, charDelay);
        } else {
          setIsStreaming(false);
        }
      }
    };
    
    displayNextChar();
  };

  const handleTransform = async () => {
    if (!selectedType || !inputText.trim()) return;

    setIsLoading(true);
    setOutputText('');
    setFullResponseText('');
    
    // 清除之前的流式显示定时器
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
    
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText: inputText.trim(),
          targetType: selectedType,
        }),
      });

      if (!response.ok) {
        throw new Error('转换失败');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      if (reader) {
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6);
                const data = JSON.parse(jsonStr);
                
                if (data.content) {
                  accumulatedText += data.content;
                } else if (data.done) {
                  setIsLoading(false);
                  setFullResponseText(accumulatedText);
                  setIsStreaming(true);
                  startCharacterStream(accumulatedText);
                  return;
                } else if (data.error) {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.error('Parse error:', parseError);
              }
            }
          }
          
          buffer = lines[lines.length - 1];
        }
      }
    } catch (error) {
      console.error('转换失败:', error);
      setOutputText('转换失败，请稍后重试。');
      setIsStreaming(false);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setSelectedType(null);
    setCopySuccess(false);
    setIsStreaming(false);
    setFullResponseText('');
    
    // 清除流式显示定时器
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* MBTI Type Selector */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>✨</span>
          选择目标人格类型
        </h2>
        
        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {mbtiTypes.map((type) => (
            <button
              key={type.code}
              onClick={() => setSelectedType(type.code)}
              className={`
                group relative p-3 rounded-xl transition-all duration-300 text-center
                transform hover:scale-105 hover:-translate-y-1
                ${selectedType === type.code
                  ? `bg-gradient-to-br ${type.gradient} text-white shadow-lg scale-105`
                  : 'bg-white/60 hover:bg-white/80 text-gray-700 shadow-md border border-white/40'
                }
              `}
            >
              <div className="relative z-10">
                <div className="text-2xl mb-1">
                  {type.emoji}
                </div>
                <div className="font-mono font-bold text-sm mb-1">
                  {type.code}
                </div>
                <div className="text-xs opacity-90">
                  {type.name}
                </div>
              </div>
              {selectedType === type.code && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Type Description */}
        {selectedType && (
          <div className={`bg-gradient-to-r ${mbtiTypes.find(t => t.code === selectedType)?.gradient} rounded-xl p-4 text-white shadow-lg animate-in slide-in-from-top-3 duration-500`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">
                {mbtiTypes.find(t => t.code === selectedType)?.emoji}
              </span>
              <div>
                <span className="font-mono font-bold text-lg">
                  {selectedType}
                </span>
                <span className="text-white/90 ml-2">
                  {mbtiTypes.find(t => t.code === selectedType)?.name}
                </span>
              </div>
            </div>
            <p className="text-white/95 text-sm leading-relaxed">
              {mbtiTypes.find(t => t.code === selectedType)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Input/Output Section */}
      <div className="grid gap-6">
        {/* Input Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>💭</span>
            您的原始信息
          </label>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="在此输入您想要转换的信息...&#10;例如：这个设计方案需要重新修改，不符合要求。"
              className="w-full h-32 p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl resize-none 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                       placeholder-gray-400 text-gray-800 shadow-inner transition-all duration-300"
              maxLength={1000}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-lg">
              {inputText.length}/1000
            </div>
          </div>
        </div>

        {/* Transform Button */}
        <div className="text-center">
          <button
            onClick={handleTransform}
            disabled={!selectedType || !inputText.trim() || isLoading || isStreaming}
            className={`
              relative px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform
              ${(!selectedType || !inputText.trim() || isLoading || isStreaming)
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {isLoading || isStreaming ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isStreaming ? '生成中...' : '转换中...'}
                </>
              ) : (
                <>
                  <span>✨</span>
                  智能转换
                </>
              )}
            </span>
          </button>
        </div>

        {/* Output Area */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span>🎯</span>
            转换后的信息
          </label>
          <div className="relative">
            <div className="w-full min-h-32 p-4 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl shadow-inner">
              {outputText ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {isStreaming ? (
                      <>
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        <span className="text-blue-700">正在生成...</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-green-700">转换完成</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-white/60 p-3 rounded-lg">
                    {outputText}
                    {isStreaming && (
                      <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-1 align-text-bottom"></span>
                    )}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-28 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl">🤖</div>
                    <p className="text-gray-500 font-medium">
                      转换结果将显示在此处
                    </p>
                  </div>
                </div>
              )}
            </div>
            {outputText && (
              <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  copySuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-white shadow-md border border-white/50'
                }`}
              >
                {copySuccess ? '✅ 已复制!' : '📋 复制'}
              </button>
            )}
          </div>
        </div>

        {/* Clear Button */}
        {(inputText || outputText || selectedType) && (
          <div className="text-center">
            <button
              onClick={handleClear}
              className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <span>🗑️</span>
              清空所有
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
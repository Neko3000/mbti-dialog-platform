'use client';

import { useState } from 'react';

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

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const handleTransform = async () => {
    if (!selectedType || !inputText.trim()) return;

    setIsLoading(true);
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

      const data = await response.json();
      setOutputText(data.transformedText);
    } catch (error) {
      console.error('转换失败:', error);
      setOutputText('转换失败，请稍后重试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              MBTI 沟通对策集
            </h1>
          </div>
          <p className="text-gray-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            🎯 将您的表达方式智能转换为任何MBTI性格类型偏好的沟通语言
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* MBTI Selector */}
          <div className="p-8 border-b border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ✨ 选择目标人格类型
            </h2>
            
            {/* 4x4 Grid - Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {mbtiTypes.map((type) => (
                <button
                  key={type.code}
                  onClick={() => setSelectedType(type.code)}
                  className={`
                    group relative p-4 rounded-2xl transition-all duration-300 text-center overflow-hidden
                    transform hover:scale-105 hover:-translate-y-1
                    ${selectedType === type.code
                      ? `bg-gradient-to-br ${type.gradient} text-white shadow-xl scale-105`
                      : 'bg-white/60 hover:bg-white/80 text-gray-700 shadow-lg border border-white/40'
                    }
                  `}
                >
                  <div className="relative z-10">
                    <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {type.emoji}
                    </div>
                    <div className="font-mono font-bold text-lg mb-1">
                      {type.code}
                    </div>
                    <div className="text-sm opacity-90">
                      {type.name}
                    </div>
                  </div>
                  {selectedType === type.code && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Type Description */}
            {selectedType && (
              <div className={`bg-gradient-to-r ${mbtiTypes.find(t => t.code === selectedType)?.gradient} rounded-2xl p-6 text-white shadow-lg animate-in slide-in-from-top-3 duration-500`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">
                    {mbtiTypes.find(t => t.code === selectedType)?.emoji}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-xl">
                      {selectedType}
                    </span>
                    <span className="text-white/90 ml-3 text-lg">
                      {mbtiTypes.find(t => t.code === selectedType)?.name}
                    </span>
                  </div>
                </div>
                <p className="text-white/95 leading-relaxed">
                  {mbtiTypes.find(t => t.code === selectedType)?.description}
                </p>
              </div>
            )}
          </div>

          {/* Input/Output Section */}
          <div className="p-8">
            <div className="space-y-8">
              {/* Input Area */}
              <div className="relative">
                <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>💭</span>
                  您的原始信息
                </label>
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="在此输入您想要转换的信息...\n例如：这个设计方案需要重新修改，不符合要求。"
                    className="w-full h-36 p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl resize-none 
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
                  disabled={!selectedType || !inputText.trim() || isLoading}
                  className={`
                    relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform overflow-hidden
                    ${(!selectedType || !inputText.trim() || isLoading)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95'
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        转换中...
                      </>
                    ) : (
                      <>
                        <span>✨</span>
                        智能转换
                      </>
                    )}
                  </span>
                  {!(!selectedType || !inputText.trim() || isLoading) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </button>
              </div>

              {/* Output Area */}
              <div className="relative">
                <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  转换后的信息
                </label>
                <div className="relative">
                  <div className="w-full min-h-36 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl overflow-y-auto shadow-inner">
                    {outputText ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          转换完成
                        </div>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap bg-white/60 p-4 rounded-xl">
                          {outputText}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 text-center">
                        <div className="space-y-2">
                          <div className="text-4xl">🤖</div>
                          <p className="text-gray-500 font-medium">
                            转换结果将显示在此处
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {outputText && (
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(outputText);
                          setCopySuccess(true);
                          setTimeout(() => setCopySuccess(false), 2000);
                        } catch (err) {
                          console.error('复制失败:', err);
                        }
                      }}
                      className={`absolute top-2 right-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        copySuccess
                          ? 'bg-green-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-white shadow-lg border border-white/50'
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
                    onClick={() => {
                      setInputText('');
                      setOutputText('');
                      setSelectedType(null);
                      setCopySuccess(false);
                    }}
                    className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                  >
                    <span>🗑️</span>
                    清空所有
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

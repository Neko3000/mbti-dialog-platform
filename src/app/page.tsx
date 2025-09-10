'use client';

import { useState } from 'react';

const mbtiTypes = [
  { code: 'INTJ', name: '建筑师', description: '偏好直接、逻辑清晰和客观的沟通。聚焦于效率和解决方案。' },
  { code: 'INTP', name: '思想家', description: '喜欢探讨概念和理论。重视逻辑一致性和精确性。' },
  { code: 'ENTJ', name: '指挥官', description: '偏好果断、结构化的沟通。重视效率和明确的行动计划。' },
  { code: 'ENTP', name: '辩论家', description: '享受探讨可能性和新观点。喜欢开放性讨论和头脑风暴。' },
  { code: 'INFJ', name: '提倡者', description: '重视深度和意义。偏好温和、体贴的沟通方式。' },
  { code: 'INFP', name: '调停者', description: '重视和谐、个人意义和鼓励。不喜欢苛刻的批评。' },
  { code: 'ENFJ', name: '主人公', description: '重视和谐和他人感受。喜欢鼓励性和支持性的沟通。' },
  { code: 'ENFP', name: '竞选者', description: '喜欢热情、积极的沟通。重视创意和可能性。' },
  { code: 'ISTJ', name: '物流师', description: '偏好清晰、具体和实用的信息。重视传统和可靠性。' },
  { code: 'ISFJ', name: '守护者', description: '重视和谐和他人需求。偏好温和、支持性的沟通。' },
  { code: 'ESTJ', name: '总经理', description: '重视结构、事实和清晰的行动计划。不喜欢模糊性。' },
  { code: 'ESFJ', name: '执政官', description: '重视和谐和团队合作。喜欢友好、支持性的沟通。' },
  { code: 'ISTP', name: '鉴赏家', description: '偏好简洁、实用的沟通。重视自主性和灵活性。' },
  { code: 'ISFP', name: '探险家', description: '重视个人价值观和和谐。偏好温和、非对抗性的沟通。' },
  { code: 'ESTP', name: '企业家', description: '喜欢直接、行动导向的沟通。重视实际结果和即时反馈。' },
  { code: 'ESFP', name: '娱乐家', description: '喜欢热情、友好的沟通。重视积极性和人际联系。' }
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            MBTI 沟通对策集
          </h1>
          <p className="text-gray-600 text-lg font-light">
            将您的表达方式智能转换为任何MBTI性格类型偏好的沟通语言
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* MBTI Selector */}
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              选择目标人格类型
            </h2>
            
            {/* 4x4 Grid */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {mbtiTypes.map((type) => (
                <button
                  key={type.code}
                  onClick={() => setSelectedType(type.code)}
                  className={`
                    p-3 rounded-lg border transition-all duration-200 text-center
                    ${selectedType === type.code
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="font-mono font-semibold text-sm mb-1">
                    {type.code}
                  </div>
                  <div className="text-xs text-gray-600">
                    {type.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Type Description */}
            {selectedType && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono font-semibold text-blue-700">
                    {selectedType}
                  </span>
                  <span className="text-blue-600">
                    {mbtiTypes.find(t => t.code === selectedType)?.name}
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  {mbtiTypes.find(t => t.code === selectedType)?.description}
                </p>
              </div>
            )}
          </div>

          {/* Input/Output Section */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Input Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  您的原始信息
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="在此输入您想要转换的信息..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder-gray-400"
                  maxLength={1000}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {inputText.length}/1000
                </div>
              </div>

              {/* Transform Button */}
              <div className="text-center">
                <button
                  onClick={handleTransform}
                  disabled={!selectedType || !inputText.trim() || isLoading}
                  className={`
                    px-8 py-3 rounded-lg font-medium transition-all duration-200
                    ${(!selectedType || !inputText.trim() || isLoading)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                    }
                  `}
                >
                  {isLoading ? '转换中...' : '转换'}
                </button>
              </div>

              {/* Output Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  转换后的信息
                </label>
                <div className="relative">
                  <div className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-y-auto">
                    {outputText ? (
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {outputText}
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        转换结果将显示在此处
                      </p>
                    )}
                  </div>
                  {outputText && (
                    <button
                      onClick={() => navigator.clipboard.writeText(outputText)}
                      className="absolute top-2 right-2 px-3 py-1 text-xs bg-white border border-gray-200 
                               rounded hover:bg-gray-50 transition-colors"
                    >
                      复制
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
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
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

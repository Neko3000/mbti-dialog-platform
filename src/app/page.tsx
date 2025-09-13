'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LanguageConverter from '@/components/LanguageConverter';
import Arena from '@/components/Arena';

export default function Home() {
  const [activeModule, setActiveModule] = useState<'converter' | 'arena'>('converter');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                MBTI 沟通对策集
              </h1>
              <p className="text-gray-600 text-lg">
                🎯 将您的表达方式智能转换为任何MBTI性格类型偏好的沟通语言
              </p>
              <p className="text-gray-500 text-md mt-2">
                讲话太难听？不知道如何和职场同事 / 社交朋友 / 亲密恋人沟通？用这个平台把对方钓成翘嘴！
              </p>
            </div>

            <div className="pb-64">
              {activeModule === 'converter' ? (
                <LanguageConverter />
              ) : (
                <Arena />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

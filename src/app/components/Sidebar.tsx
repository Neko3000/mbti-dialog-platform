'use client';

interface SidebarProps {
  activeModule: 'language-transformer' | 'arena';
  onModuleChange: (module: 'language-transformer' | 'arena') => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const modules = [
    {
      id: 'language-transformer' as const,
      name: '语言转换器',
      icon: '🔄',
      description: '智能转换沟通风格'
    },
    {
      id: 'arena' as const,
      name: '竞技场',
      icon: '🏟️',
      description: '多人格对话练习'
    }
  ];

  return (
    <div className="w-64 h-screen bg-white/80 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col shadow-xl">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            MBTI
          </h1>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          沟通对策集
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`
              w-full p-4 rounded-2xl transition-all duration-300 text-left group
              ${activeModule === module.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:shadow-lg'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {module.icon}
              </span>
              <span className="font-semibold">
                {module.name}
              </span>
            </div>
            <p className={`text-sm ${
              activeModule === module.id 
                ? 'text-white/90' 
                : 'text-gray-500'
            }`}>
              {module.description}
            </p>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-white/20">
        <p className="text-xs text-gray-400 text-center">
          由 Gemini AI 驱动
        </p>
      </div>
    </div>
  );
}
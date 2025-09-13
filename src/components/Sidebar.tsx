'use client';

interface SidebarProps {
  activeModule: 'converter' | 'chatroom';
  onModuleChange: (module: 'converter' | 'chatroom') => void;
}

const modules = [
  {
    id: 'converter' as const,
    name: '语言转换器',
    icon: '🔄',
    description: '智能转换沟通风格'
  },
  {
    id: 'chatroom' as const,
    name: '聊天室',
    icon: '🎭',
    description: '多人格对话模拟'
  }
];

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">MBTI 对策集</h1>
            <p className="text-xs text-gray-500">沟通智能助手</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left group
                ${activeModule === module.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <span className="text-xl flex-shrink-0">
                {module.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${
                  activeModule === module.id ? 'text-white' : 'text-gray-900'
                }`}>
                  {module.name}
                </div>
                <div className={`text-xs ${
                  activeModule === module.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {module.description}
                </div>
              </div>
              {activeModule === module.id && (
                <div className="w-1 h-4 bg-white/30 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20">
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span>⚡</span>
            <span>Powered by Gemini AI</span>
          </div>
          <div>让沟通更有效</div>
        </div>
      </div>
    </div>
  );
}
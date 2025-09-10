export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">页面未找到</h2>
        <p className="text-gray-500 mb-8">抱歉，您访问的页面不存在。</p>
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          返回首页
        </a>
      </div>
    </div>
  );
}
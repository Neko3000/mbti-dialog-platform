# 🔧 MBTI沟通对策集 - 配置指南

## 🚀 快速开始

### 1. 获取 Gemini API 密钥

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 点击 "Create API Key" 创建新的API密钥
3. 复制生成的API密钥

### 2. 配置环境变量

1. 在项目根目录找到 `.env.local` 文件
2. 将您的API密钥替换到文件中：

```bash
# Gemini API配置  
GEMINI_API_KEY=你的实际API密钥
```

⚠️ **重要提示：**
- 请不要将真实的API密钥提交到git仓库
- `.env.local` 文件已被添加到 `.gitignore` 中

### 3. 启动应用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

应用将在 `http://localhost:3000` 或 `http://localhost:3001` 启动。

## 🔍 功能测试

1. 选择一个MBTI人格类型（如INTJ、INFP等）
2. 在输入框中输入您想要转换的文本
3. 点击"转换"按钮
4. 查看AI转换后的结果
5. 点击"复制"按钮复制结果

## 💡 使用示例

**原始文本：**
```
新设计不符合需求文档里的规定。我们需要重新做，重点要突出用户流程 A、B 和 C。请在明天 EOD 前提交新版本。
```

**选择 INFP 后的转换结果：**
```
我非常欣赏你投入在这些设计中的创造力，能看到其中蕴含的独特想法。为了确保我们与项目的核心目标完全对齐，我们是否可以一起探讨一下如何更好地融合用户流程 A、B 和 C？我相信以你的视角，一定能让这些流程变得更出色。我们明天约个时间一起 brainstorm 一下吧。
```

## 🛠️ 技术架构

- **前端：** Next.js 15 + React 19 + Tailwind CSS 4
- **AI模型：** Google Gemini 1.5 Flash
- **API安全：** Next.js API Routes（服务端代理）
- **类型系统：** TypeScript

## 📝 注意事项

- 首次使用需要配置Gemini API密钥
- 转换结果基于AI生成，建议根据实际情况调整
- 应用支持全部16种MBTI人格类型
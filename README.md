# 🎯 MBTI Dialog Platform

[中文版本](./README_CN.md) | **English Version**

An intelligent communication platform that transforms your natural expression into communication styles preferred by any MBTI personality type. Bridge the gap between intent and perception for more effective and empathetic interactions.

## ✨ Features

### 🔄 Language Converter
Transform your natural expressions into communication styles tailored for specific MBTI personality types. Choose from all 16 MBTI types and get real-time conversions with streaming text output.

**Example Transformation:**
- **Input:** "The design doesn't meet the requirements. We need to redo it, focusing on user flows A, B, and C. Please submit the new version by end of day tomorrow."
- **Output for INFP:** "I really appreciate the creativity you've put into these designs and can see the unique ideas within them. To ensure we're completely aligned with the project's core objectives, could we explore together how to better integrate user flows A, B, and C? I believe with your perspective, these flows can become even more outstanding. Let's schedule time tomorrow to brainstorm together."

### 💬 Chat Room
Experience dynamic conversations with AI personalities representing different MBTI types. Start a conversation and watch as different personality types respond naturally, creating a multi-perspective discussion environment.

### 🏟️ Arena
Observe autonomous interactions between different MBTI personalities. Add multiple personality types to the arena and watch them move around, initiate conversations when they meet, and engage in natural dialogues that reflect their unique communication styles.

## 🛠️ Technology Stack

- **Framework:** Next.js 15.5.2 with App Router
- **Frontend:** React 19.1.0 + TypeScript
- **Styling:** Tailwind CSS 4.0
- **AI Integration:** Google Gemini AI API
- **Build Tool:** Turbopack for fast development and builds

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd mbti-dialog-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start
```

## 🎨 User Interface

The application features a modern, minimalist design with:

- **Sidebar Navigation:** Easy switching between Language Converter, Chat Room, and Arena
- **Gradient Backgrounds:** Beautiful color transitions for visual appeal
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Streaming Text:** Real-time character-by-character text display for engaging user experience
- **Interactive Elements:** Smooth animations and hover effects

## 🧠 MBTI Integration

### Supported Personality Types

| Type | Name | Emoji | Communication Style |
|------|------|--------|-------------------|
| INTJ | Architect | 🏗️ | Direct, logical, solution-focused |
| INTP | Thinker | 🧪 | Conceptual, theoretical, precise |
| ENTJ | Commander | 👑 | Decisive, structured, action-oriented |
| ENTP | Debater | 🦊 | Explorative, possibility-focused, open discussion |
| INFJ | Advocate | 🧙‍♂️ | Deep, meaningful, gentle |
| INFP | Mediator | 🦥 | Harmonious, value-driven, encouraging |
| ENFJ | Protagonist | 🐶 | Supportive, people-focused, inspiring |
| ENFP | Campaigner | 🐬 | Enthusiastic, creative, positive |
| ISTJ | Logistician | 🔍 | Clear, practical, reliable |
| ISFJ | Protector | 🦌 | Gentle, supportive, caring |
| ESTJ | Executive | 🦁 | Structured, fact-based, results-oriented |
| ESFJ | Consul | 🐘 | Friendly, cooperative, team-focused |
| ISTP | Virtuoso | 🛠️ | Concise, practical, flexible |
| ISFP | Adventurer | 🐰 | Gentle, value-based, non-confrontational |
| ESTP | Entrepreneur | 🐆 | Direct, action-oriented, results-focused |
| ESFP | Entertainer | 🎭 | Warm, friendly, positive |

## 🏗️ Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── chatroom/          # Chat room API endpoints
│   │   └── transform/         # Language transformation API
│   ├── components/
│   │   ├── Arena.tsx          # Arena visualization component
│   │   └── ArenaNew.tsx       # Enhanced arena features
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ChatRoom.tsx           # Multi-personality chat interface
│   ├── LanguageConverter.tsx  # Text transformation interface
│   └── Sidebar.tsx            # Navigation sidebar
└── lib/
    └── mbti-prompts.ts        # MBTI personality definitions and prompts
```

## 🔒 Security & Privacy

- API keys are securely handled through Next.js API routes
- Client-side code never exposes sensitive credentials
- Input validation and sanitization implemented
- No user data is stored or tracked

## 🚀 Deployment

The application can be deployed on various platforms:

### Vercel (Recommended)
```bash
# Connect your GitHub repository to Vercel
# Add your GOOGLE_AI_API_KEY environment variable
# Deploy automatically on push
```

### Other Platforms
```bash
npm run build
npm start
```

Make sure to set your environment variables on your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) - The React Framework for Production
- Powered by [Google Gemini AI](https://ai.google.dev/) - Advanced language understanding
- Styled with [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- MBTI personality insights based on Myers-Briggs Type Indicator research

## 📞 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

---

**Made with ❤️ for better human communication**

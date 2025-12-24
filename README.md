# TypeMaster Pro 🚀

A comprehensive, production-ready touch typing application built with React, Vite, and Tailwind CSS. Master touch typing through structured lessons, essays, technical documentation, and custom practice sessions with real-time analytics and gamification.

![TypeMaster Pro](https://img.shields.io/badge/TypeMaster-Pro-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?logo=tailwind-css)

## ✨ Features

### 📚 Comprehensive Learning Content
- **55 Structured Lessons** - Progressive lessons covering home row, top row, bottom row, numbers, punctuation, special characters, speed building, and advanced typing
- **20 Essays** - Practice with beginner to advanced essays on various topics
- **8 Technical Documentation** - Type real code snippets in React, Python, SQL, Docker, Git, TypeScript, AWS Lambda, and REST API
- **Custom Text Import** - Practice with your own text (minimum 20 characters)

### 📊 Advanced Analytics & Tracking
- **Real-time WPM (Words Per Minute)** - Live speed tracking during practice
- **Accuracy Percentage** - Instant feedback on typing accuracy
- **Session History** - Track all practice sessions with detailed metrics
- **Progress Charts** - Visual representation of improvement over time (Premium)
- **Weak Key Analysis** - Identify keys that need more practice (Premium)

### 🏆 Gamification & Motivation
- **21 Achievements** - Unlock achievements for speed milestones, accuracy streaks, practice time, and completion
- **XP & Leveling System** - Earn experience points and level up
- **Daily Streak Tracking** - Build consistent practice habits
- **Progressive Lesson Unlocking** - Complete lessons with 95%+ accuracy to unlock the next

### 💎 Premium Features (₹19 Lifetime)
- Detailed performance graphs
- Weak key identification
- Speed vs accuracy analysis
- Advanced analytics dashboard
- Session history

### 💾 Data Persistence
- All user data stored in localStorage
- Progress saved automatically
- Works offline after first load

### 🎨 User Experience
- Dark theme optimized for extended practice
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation across 7 modes
- Visual feedback with color-coded accuracy
- Real-time character highlighting

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3+
- **Build Tool**: Vite 5.4+
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback, useRef)
- **Storage**: Browser localStorage API

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/2024bbm1007/typing-master.git
cd typing-master
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## 📱 Usage Guide

### Getting Started
1. Open the application in your browser
2. Navigate through the 7 main tabs: Home, Lessons, Essays, Technical, Custom, Analytics, Progress
3. Start with beginner lessons in the **Lessons** tab
4. Practice regularly to build your daily streak

### Lessons Mode
- Lessons unlock progressively
- Complete each lesson with 95%+ accuracy to unlock the next
- 8 sections: Home Row, Top Row, Bottom Row, Numbers, Punctuation, Special Chars, Speed, Advanced

### Essays Mode
- 20 essays ranging from beginner to advanced
- Practice with real-world content
- Complete essays to unlock achievements

### Technical Mode
- Practice typing code snippets
- 8 different categories: Frontend, Backend, DevOps, Database, etc.
- Perfect for developers improving coding speed

### Custom Mode
- Import your own text (minimum 20 characters)
- Practice with study notes, work documents, or any content

### Analytics Mode (Premium)
- View progress charts showing WPM improvement
- Identify weak keys that need practice
- Review recent session performance

### Progress Mode
- See completion percentage for lessons, essays, and technical docs
- View all 21 achievements and unlock status
- Track overall statistics

## 🎯 Typing Practice Tips

1. **Focus on accuracy first** - Speed will naturally improve
2. **Practice daily** - Build a streak for consistent improvement
3. **Proper posture** - Sit straight, feet flat, wrists neutral
4. **Home row position** - Keep fingers on ASDF and JKL;
5. **Don't look at keyboard** - Build muscle memory
6. **Take breaks** - Rest every 20-30 minutes

## 🏗️ Project Structure

```
typing-master/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── src/
│   ├── main.jsx           # Application entry point
│   ├── App.jsx            # Main TypeMaster Pro component
│   └── index.css          # Global styles and Tailwind imports
└── public/                 # Static assets (if any)
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Static Hosting

The built application can be deployed to any static hosting service:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
1. Update `vite.config.js` with base path if needed
2. Build the project: `npm run build`
3. Deploy `dist/` folder to gh-pages branch

**Other Options:**
- Firebase Hosting
- AWS S3 + CloudFront
- Cloudflare Pages
- Surge.sh

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [React](https://react.dev/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Happy Typing! 🎉**

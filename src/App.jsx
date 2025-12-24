import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Target, Zap, TrendingUp, Award, Flame, Star, Clock, CheckCircle, ChevronRight, ChevronLeft, Upload, Code, FileText, BarChart3, Crown, Lock, RotateCcw, Home } from 'lucide-react';

// ============================================
// CONTENT DATA
// ============================================

const ESSAYS = [
  {
    id: 1,
    title: "The Power of Persistence",
    difficulty: "beginner",
    text: "Success is not achieved overnight. It requires consistent effort, dedication, and the willingness to push through challenges.  Every expert was once a beginner who refused to give up.  When you face obstacles, remember that each attempt brings you closer to mastery.  The journey of improvement is filled with small victories that compound over time.  Whether learning a new skill or pursuing a goal, persistence transforms ordinary individuals into extraordinary achievers.  Embrace the process, celebrate progress, and never underestimate the power of showing up every single day.",
    estimatedTime: 3
  },
  {
    id: 2,
    title: "Technology and Human Connection",
    difficulty: "intermediate",
    text: "In our increasingly digital world, technology has revolutionized how we communicate and connect.  Social media platforms enable instant communication across continents, video calls bring distant loved ones face-to-face, and collaborative tools allow teams to work seamlessly from anywhere. However, this convenience comes with challenges.  Screen time can replace meaningful in-person interactions, and digital communication sometimes lacks the depth of face-to-face conversations. The key lies in finding balance using technology to enhance rather than replace human connection.",
    estimatedTime: 5
  },
  {
    id:  3,
    title: "The Science of Habit Formation",
    difficulty: "intermediate",
    text:  "Habits shape our daily lives more than we realize.  Research shows that approximately forty percent of our actions are driven by habit rather than conscious decision-making. Understanding how habits form empowers us to build positive routines and break negative patterns. The habit loop consists of three components: cue, routine, and reward.  Identifying triggers that prompt unwanted behaviors and replacing them with beneficial alternatives creates lasting change. Small, consistent actions compound into remarkable transformations.",
    estimatedTime: 5
  },
  {
    id:  4,
    title: "Climate Change and Innovation",
    difficulty:  "intermediate",
    text:  "Climate change represents one of humanity's greatest challenges, but it also drives unprecedented innovation. Renewable energy technologies have advanced dramatically, with solar and wind power becoming increasingly cost-effective.  Electric vehicles are transforming transportation, while breakthrough battery technology enables better energy storage.  Scientists are developing carbon capture methods, and engineers are designing sustainable buildings that generate more energy than they consume.",
    estimatedTime: 5
  },
  {
    id:  5,
    title: "The Art of Effective Communication",
    difficulty: "intermediate",
    text:  "Clear communication forms the foundation of successful relationships and professional achievement.  Effective communicators understand that listening is as important as speaking.  They pay attention to body language, tone, and context, recognizing that words convey only part of any message. Active listening involves giving full attention, asking clarifying questions, and reflecting back understanding.  When speaking, clarity and conciseness prevent misunderstandings.",
    estimatedTime: 5
  },
  {
    id:  6,
    title: "The Future of Artificial Intelligence",
    difficulty: "advanced",
    text: "Artificial intelligence is reshaping every aspect of modern society, from healthcare diagnostics to creative endeavors. Machine learning algorithms analyze vast datasets to identify patterns invisible to human observation, enabling breakthroughs in drug discovery, climate modeling, and personalized medicine. Natural language processing allows machines to understand and generate human language with increasing sophistication. However, these advances raise important ethical questions about privacy, bias, and the future of work.",
    estimatedTime: 6
  },
  {
    id: 7,
    title: "Mindfulness in Modern Life",
    difficulty: "beginner",
    text: "In our fast-paced world, mindfulness offers a path to peace and clarity. The practice involves paying attention to the present moment without judgment.  Simple techniques like focused breathing, body scans, and mindful observation can reduce stress and improve well-being. Research demonstrates that regular mindfulness practice changes brain structure, enhancing emotional regulation and concentration. You do not need special equipment or extensive training to begin.",
    estimatedTime:  4
  },
  {
    id:  8,
    title: "The Global Economy",
    difficulty: "advanced",
    text: "The interconnected nature of today's global economy creates both opportunities and vulnerabilities. International trade enables countries to specialize in areas of comparative advantage, increasing overall efficiency and prosperity. Supply chains span continents, delivering products worldwide.  However, this interconnection means economic shocks in one region ripple globally.  Central banks coordinate policies to maintain stability, while international organizations facilitate cooperation.",
    estimatedTime: 6
  },
  {
    id: 9,
    title: "The Importance of Sleep",
    difficulty:  "beginner",
    text: "Sleep is essential for physical health, mental clarity, and emotional well-being. During sleep, our bodies repair tissues, consolidate memories, and process emotions.  Chronic sleep deprivation impairs cognitive function, weakens immune systems, and increases risk for numerous health conditions. Most adults need seven to nine hours of quality sleep nightly. Creating consistent sleep schedules and limiting screen time before bed improve sleep quality.",
    estimatedTime: 4
  },
  {
    id: 10,
    title: "Space Exploration and Discovery",
    difficulty:  "advanced",
    text: "Humanity's drive to explore space has led to remarkable achievements and technological breakthroughs. From the first satellite launches to Mars rovers and the International Space Station, each milestone expands our understanding of the universe.  Private companies now complement government space agencies, making space more accessible.  Reusable rockets dramatically reduce launch costs, while plans for lunar bases and Mars missions capture public imagination.",
    estimatedTime: 6
  },
  {
    id: 11,
    title: "The Digital Revolution",
    difficulty:  "intermediate",
    text: "The digital revolution has fundamentally transformed how we live, work, and interact. The internet connects billions of people, creating unprecedented access to information and opportunities.  Cloud computing enables businesses of all sizes to leverage powerful technology without massive infrastructure investments. Smartphones put computing power in everyone's pocket, democratizing access to knowledge and services.",
    estimatedTime: 5
  },
  {
    id: 12,
    title:  "Sustainable Living",
    difficulty: "intermediate",
    text: "Adopting sustainable practices benefits both the environment and personal well-being. Small changes accumulate into significant impact reducing single-use plastics, choosing renewable energy, supporting local businesses, and minimizing food waste.  Sustainable living is not about perfection but progress.  Growing your own vegetables, even in small containers, connects you with food sources.  Choosing durable products over disposable alternatives reduces waste.",
    estimatedTime: 5
  },
  {
    id: 13,
    title: "The Evolution of Music",
    difficulty:  "intermediate",
    text: "Music has been fundamental to human culture throughout history, evolving from ancient rhythms to modern digital compositions. Each era brought innovations from classical orchestration to jazz improvisation, rock rebellion to hip-hop storytelling, and electronic experimentation.  Technology continuously transforms how we create, distribute, and consume music. Despite these changes, music's core purpose remains constant: expressing emotions and telling stories.",
    estimatedTime: 5
  },
  {
    id: 14,
    title: "Critical Thinking Skills",
    difficulty:  "advanced",
    text: "Critical thinking involves analyzing information objectively, questioning assumptions, and forming reasoned judgments. In an era of information overload and misinformation, these skills are more important than ever. Effective critical thinkers evaluate sources, recognize bias, distinguish fact from opinion, and identify logical fallacies.  They consider multiple perspectives before reaching conclusions and remain open to revising beliefs when presented with compelling evidence.",
    estimatedTime: 6
  },
  {
    id:  15,
    title: "The Benefits of Reading",
    difficulty:  "beginner",
    text: "Reading offers countless benefits for mind and soul. Books transport us to different worlds, expand our knowledge, and develop empathy by exploring diverse perspectives. Regular reading improves vocabulary, writing skills, and cognitive function. It reduces stress, enhances focus, and provides entertainment without screens. Whether fiction or non-fiction, each book offers unique insights and experiences.",
    estimatedTime: 4
  },
  {
    id: 16,
    title: "Entrepreneurship and Innovation",
    difficulty: "advanced",
    text:  "Entrepreneurship drives economic growth and societal progress by transforming innovative ideas into valuable products and services.  Successful entrepreneurs identify problems and create solutions, often disrupting established industries. The journey requires resilience, adaptability, and willingness to learn from failure. Modern technology has lowered barriers to entry as online platforms enable global reach with minimal initial investment.",
    estimatedTime: 6
  },
  {
    id:  17,
    title: "The Human Brain",
    difficulty:  "advanced",
    text:  "The human brain is the most complex structure known to science, containing approximately eighty-six billion neurons forming trillions of connections.  This remarkable organ controls everything from automatic functions like breathing to abstract thought and creativity.  Neuroscience continues uncovering how the brain processes information, forms memories, and generates consciousness.  Neuroplasticity means we can learn and adapt throughout life.",
    estimatedTime: 6
  },
  {
    id: 18,
    title:  "Financial Literacy",
    difficulty: "intermediate",
    text:  "Financial literacy empowers individuals to make informed decisions about money management, investment, and long-term planning. Understanding basic concepts like budgeting, compound interest, diversification, and risk management provides foundation for financial security. Creating and maintaining a budget tracks income and expenses, revealing spending patterns and opportunities to save. Emergency funds protect against unexpected costs.",
    estimatedTime: 5
  },
  {
    id: 19,
    title:  "The Ocean Mysteries",
    difficulty:  "intermediate",
    text: "Earth's oceans cover seventy percent of the planet's surface yet remain largely unexplored. These vast waters regulate climate, produce oxygen, and host incredible biodiversity. From microscopic plankton to massive whales, ocean ecosystems are complex and interconnected.  Coral reefs, often called rainforests of the sea, support thousands of species despite covering minimal ocean floor.",
    estimatedTime: 5
  },
  {
    id: 20,
    title:  "The Power of Gratitude",
    difficulty: "beginner",
    text: "Practicing gratitude transforms perspective and improves well-being. Taking time to appreciate positive aspects of life, however small, shifts focus from what is lacking to what is abundant. Research shows grateful people experience better mental health, stronger relationships, and greater life satisfaction.  Simple practices like keeping gratitude journals or expressing appreciation to others cultivate this mindset.",
    estimatedTime: 4
  }
];

const LESSONS = [
  { id: 1, title: "Home Row - ASDF", text: "aaa sss ddd fff aaa sss ddd fff asdf asdf asdf fdsa fdsa", difficulty: "beginner", section: "Home Row", estimatedTime: 2 },
  { id: 2, title: "Home Row - JKL;", text: "jjj kkk lll ;;; jjj kkk lll ;;; jkl; jkl; jkl; ;lkj ;lkj", difficulty: "beginner", section: "Home Row", estimatedTime: 2 },
  { id:  3, title:  "Home Row - Combined", text: "asdf jkl; asdf jkl; fdsa ;lkj fdsa ;lkj asdf jkl; fdsa ;lkj", difficulty: "beginner", section: "Home Row", estimatedTime: 2 },
  { id:  4, title:  "Home Row Words", text: "sad lad dad fad ask lass fall flask dad ask a lad falls", difficulty: "beginner", section: "Home Row", estimatedTime: 3 },
  { id: 5, title: "More Home Row", text:  "as ask asks fall falls all lass flask flask add sass", difficulty: "beginner", section: "Home Row", estimatedTime: 3 },
  { id: 6, title: "Home Row Sentences", text: "a sad lad asks dad; dad falls; a lass asks; all lads fall", difficulty: "beginner", section: "Home Row", estimatedTime: 3 },
  { id:  7, title:  "Speed Builder Home", text: "dad sad fad lad ask lass fall all; ask dad; fall sad flask", difficulty: "beginner", section: "Home Row", estimatedTime: 3 },
  { id: 8, title: "Home Row Mastery", text: "a sad dad falls; ask a lad; all sad lads ask; a lass falls", difficulty: "beginner", section: "Home Row", estimatedTime: 3 },
  { id:  9, title:  "Top Row - QWER", text: "qqq www eee rrr qqq www eee rrr qwer qwer qwer rewq rewq", difficulty: "beginner", section:  "Top Row", estimatedTime: 2 },
  { id: 10, title: "Top Row - TYUI", text: "ttt yyy uuu iii ttt yyy uuu iii tyui tyui tyui iuyt iuyt", difficulty:  "beginner", section: "Top Row", estimatedTime: 2 },
  { id: 11, title: "Top Row - OP", text: "ooo ppp ooo ppp opop opop tyuiop tyuiop qwertyuiop poiuytrewq", difficulty: "beginner", section:  "Top Row", estimatedTime: 2 },
  { id: 12, title: "Top Row Words", text: "wet yet tire wire quite write poetry try ripe type your trip", difficulty: "beginner", section: "Top Row", estimatedTime: 3 },
  { id: 13, title: "Top Row Combos", text: "were there their power tower query wrapper trooper reporter", difficulty: "beginner", section: "Top Row", estimatedTime: 3 },
  { id: 14, title: "Mixed Home and Top", text: "read write type fast work well dear friends always ready", difficulty: "beginner", section: "Top Row", estimatedTime: 3 },
  { id:  15, title:  "Top Row Practice", text: "quit query tower power wrapper trooper writer poetry typewriter", difficulty: "beginner", section:  "Top Row", estimatedTime: 3 },
  { id: 16, title: "Top Row Sentences", text: "we were there today; write poetry; quite tired; easy work today", difficulty: "beginner", section: "Top Row", estimatedTime: 4 },
  { id: 17, title: "Bottom Row - ZXCV", text:  "zzz xxx ccc vvv zzz xxx ccc vvv zxcv zxcv zxcv vcxz vcxz", difficulty:  "beginner", section: "Bottom Row", estimatedTime: 2 },
  { id: 18, title: "Bottom Row - BNM", text: "bbb nnn mmm bbb nnn mmm bnm bnm bnm zxcvbnm mnbvcxz bnm", difficulty: "beginner", section: "Bottom Row", estimatedTime: 2 },
  { id:  19, title:  "Bottom Row Words", text: "van ban can man zoom boom cave wave brave name come become", difficulty: "beginner", section: "Bottom Row", estimatedTime: 3 },
  { id: 20, title: "All Letters Combined", text: "maximum cabinet objective vacant zombie clever modern combine", difficulty: "intermediate", section: "Bottom Row", estimatedTime: 3 },
  { id:  21, title:  "Full Keyboard Words", text: "computer keyboard monitor maximize objective function example", difficulty: "intermediate", section: "Bottom Row", estimatedTime: 4 },
  { id: 22, title: "Complex Combinations", text: "the quick brown fox jumps over the very lazy dog nearby today", difficulty: "intermediate", section: "Bottom Row", estimatedTime: 4 },
  { id:  23, title:  "Numbers 1-5", text: "111 222 333 444 555 111 222 333 444 555 12345 12345 54321", difficulty: "intermediate", section: "Numbers", estimatedTime:  2 },
  { id: 24, title: "Numbers 6-0", text: "666 777 888 999 000 666 777 888 999 000 67890 67890 09876", difficulty: "intermediate", section: "Numbers", estimatedTime: 2 },
  { id: 25, title: "All Numbers", text: "1234567890 0987654321 1234567890 147 258 369 123 456 789 0", difficulty: "intermediate", section: "Numbers", estimatedTime: 3 },
  { id: 26, title: "Numbers in Context", text: "I have 5 apples and 10 oranges for 15 people arriving today.", difficulty: "intermediate", section: "Numbers", estimatedTime: 3 },
  { id: 27, title: "Dates and Times", text:  "January 15 2024 at 3:45 PM until December 31 2025 at noon.", difficulty: "intermediate", section: "Numbers", estimatedTime:  4 },
  { id: 28, title: "Number Sequences", text: "Call 555-1234 or visit 100 Main Street by 9: 00 AM tomorrow.", difficulty: "intermediate", section: "Numbers", estimatedTime:  4 },
  { id: 29, title: "Periods and Commas", text: "Hello, world.  How are you? I am fine, thank you.  Great job.", difficulty: "intermediate", section: "Punctuation", estimatedTime: 3 },
  { id: 30, title: "Question Marks", text:  "What?  How? Why? When? Where?  Who are you?  What time is it?", difficulty: "intermediate", section: "Punctuation", estimatedTime:  3 },
  { id: 31, title: "Exclamations", text: "Wow! Amazing! Fantastic! Great job!  Well done!  Awesome work!", difficulty: "intermediate", section: "Punctuation", estimatedTime: 3 },
  { id: 32, title: "Apostrophes", text:  "don't can't won't shouldn't wouldn't couldn't isn't aren't", difficulty: "intermediate", section: "Punctuation", estimatedTime: 3 },
  { id: 33, title: "Quotation Marks", text: "She said Hello and I replied Hi there with a smile today.", difficulty: "intermediate", section: "Punctuation", estimatedTime: 4 },
  { id: 34, title: "Mixed Punctuation", text: "Hello!  How are you? I'm fine, thanks. That's great news today!", difficulty: "intermediate", section: "Punctuation", estimatedTime: 4 },
  { id: 35, title: "Symbols Basic", text: "### @@@ $$$ user@email.com $50 $100 #hashtag @mention today", difficulty: "intermediate", section: "Special Chars", estimatedTime:  3 },
  { id: 36, title: "More Symbols", text: "50% 100% *asterisk* &and (parentheses) [brackets] {braces}", difficulty: "intermediate", section: "Special Chars", estimatedTime: 3 },
  { id:  37, title:  "Programming Chars", text: "int x = 10; if (x > 5) { return true; } else { return false; }", difficulty: "advanced", section: "Special Chars", estimatedTime: 4 },
  { id: 38, title: "Email Format", text: "john. doe@example.com jane_smith123@website.org contact@test.io", difficulty: "intermediate", section: "Special Chars", estimatedTime: 3 },
  { id: 39, title: "URLs and Paths", text: "https://www.example.com/path/to/page. html? id=123&name=test", difficulty: "advanced", section: "Special Chars", estimatedTime: 4 },
  { id: 40, title: "Math Expressions", text: "x + y = z; a * b = c; (x + y) / 2 = average; x^2 + 1 = result", difficulty: "advanced", section: "Special Chars", estimatedTime: 4 },
  { id: 41, title: "Common Words Speed", text: "the and for you not with this that but have from they we are", difficulty: "intermediate", section: "Speed", estimatedTime: 3 },
  { id: 42, title: "Speed Drill 1", text: "Practice makes perfect when you focus on consistent daily improvement.", difficulty: "intermediate", section: "Speed", estimatedTime:  4 },
  { id: 43, title: "Speed Drill 2", text: "Quick typing requires proper finger placement and regular practice sessions.", difficulty: "intermediate", section: "Speed", estimatedTime:  4 },
  { id: 44, title: "Speed Drill 3", text: "The development of muscle memory comes from repetition and focused attention.", difficulty: "advanced", section: "Speed", estimatedTime:  5 },
  { id: 45, title: "Speed Challenge", text: "Advanced typists maintain accuracy while increasing speed through deliberate practice.", difficulty: "advanced", section:  "Speed", estimatedTime: 5 },
  { id: 46, title: "Speed Mastery", text: "Achieving mastery requires dedication, consistency, patience, and willingness to learn.", difficulty: "advanced", section: "Speed", estimatedTime: 6 },
  { id: 47, title: "Complex Sentences", text:  "Although the weather was unpredictable, we decided to continue with our plans.", difficulty: "advanced", section:  "Advanced", estimatedTime:  5 },
  { id: 48, title: "Technical Writing", text: "The implementation of distributed systems requires understanding consensus algorithms.", difficulty: "advanced", section: "Advanced", estimatedTime: 6 },
  { id: 49, title: "Business Communication", text: "Please review the quarterly financial report and provide feedback regarding budget.", difficulty: "advanced", section: "Advanced", estimatedTime: 6 },
  { id: 50, title: "Academic Style", text: "Contemporary research demonstrates that cognitive performance improves with exercise.", difficulty: "advanced", section: "Advanced", estimatedTime:  6 },
  { id: 51, title: "Creative Writing", text: "The crimson sunset painted the horizon with spectacular hues while waves whispered.", difficulty: "advanced", section: "Advanced", estimatedTime: 6 },
  { id: 52, title: "Code Comments", text: "// Initialize variables and configure settings for the application to run properly", difficulty: "advanced", section: "Advanced", estimatedTime: 5 },
  { id: 53, title: "Mixed Content", text: "Schedule the meeting for 3: 30 PM on Friday.  Contact sarah@company.com for details.", difficulty: "advanced", section: "Advanced", estimatedTime:  6 },
  { id: 54, title: "Long Form Practice", text: "Mastering touch typing is a valuable skill that enhances productivity across all tasks.", difficulty: "advanced", section: "Advanced", estimatedTime:  7 },
  { id: 55, title: "Ultimate Challenge", text: "The intersection of technology, creativity, and human ingenuity drives innovation forward.", difficulty: "advanced", section: "Advanced", estimatedTime:  8 }
];

const TECHNICAL_DOCS = [
  {
    id: 1,
    title: "React Component",
    category: "Frontend",
    text: `const Button = ({ onClick, children, variant }) => {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
};
export default Button;`,
    estimatedTime: 4
  },
  {
    id:  2,
    title: "Python Function",
    category:  "Backend",
    text: `def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib`,
    estimatedTime: 5
  },
  {
    id:  3,
    title: "REST API Endpoint",
    category: "API",
    text:  `POST /api/v1/users/authenticate
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Response: { "token": "jwt_token_here" }`,
    estimatedTime: 5
  },
  {
    id:  4,
    title: "SQL Query",
    category: "Database",
    text: `SELECT u.user_id, u.username,
       COUNT(o.order_id) as total_orders
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.status = 'active'
GROUP BY u.user_id
ORDER BY total_orders DESC;`,
    estimatedTime: 5
  },
  {
    id:  5,
    title: "Docker Configuration",
    category:  "DevOps",
    text: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]`,
    estimatedTime: 4
  },
  {
    id:  6,
    title: "Git Commands",
    category:  "Version Control",
    text: `git clone https://github.com/user/repo.git
git checkout -b feature/new-feature
git add . 
git commit -m "Add new feature"
git push origin feature/new-feature
git merge main`,
    estimatedTime: 5
  },
  {
    id: 7,
    title: "TypeScript Interface",
    category: "Frontend",
    text: `interface User {
  id: string;
  username:  string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}
type UserRole = 'admin' | 'user';`,
    estimatedTime: 5
  },
  {
    id:  8,
    title: "AWS Lambda Function",
    category: "Cloud",
    text:  `exports.handler = async (event) => {
  const { httpMethod, body } = event;
  if (httpMethod !== 'POST') {
    return { statusCode: 405 };
  }
  const data = JSON.parse(body);
  return { statusCode: 200, body: JSON.stringify(data) };
};`,
    estimatedTime: 6
  }
];

const ACHIEVEMENTS = [
  { id: 'speed_30', name: 'Speed Starter', desc: 'Reach 30 WPM', icon: '🚀', requirement: { type: 'wpm', value: 30 } },
  { id: 'speed_50', name: 'Speed Builder', desc: 'Reach 50 WPM', icon: '⚡', requirement: { type: 'wpm', value: 50 } },
  { id: 'speed_60', name: 'Speed Racer', desc: 'Reach 60 WPM', icon: '🏎️', requirement: { type: 'wpm', value: 60 } },
  { id: 'speed_80', name: 'Fast Typer', desc: 'Reach 80 WPM', icon: '🔥', requirement: { type: 'wpm', value: 80 } },
  { id: 'speed_100', name: 'Lightning Fingers', desc: 'Reach 100 WPM', icon: '⚡⚡', requirement:  { type: 'wpm', value:  100 } },
  { id: 'speed_120', name: 'Speed Demon', desc: 'Reach 120 WPM', icon: '👹', requirement: { type: 'wpm', value: 120 } },
  { id: 'perfect', name: 'Perfect Typist', desc: '100% accuracy', icon: '💯', requirement: { type: 'accuracy', value: 100 } },
  { id: 'accurate_95', name: 'Nearly Perfect', desc: '95%+ accuracy 10 times', icon: '🎯', requirement:  { type: 'accuracy_streak', value: 10 } },
  { id: 'streak_7', name: 'Weekly Warrior', desc: '7 day streak', icon: '🔥', requirement: { type: 'streak', value:  7 } },
  { id: 'streak_30', name: 'Monthly Master', desc: '30 day streak', icon: '🔥🔥', requirement:  { type: 'streak', value: 30 } },
  { id: 'sessions_10', name: 'Getting Started', desc: '10 sessions', icon: '📝', requirement: { type: 'sessions', value: 10 } },
  { id: 'sessions_50', name: 'Regular Practitioner', desc: '50 sessions', icon: '📚', requirement: { type: 'sessions', value: 50 } },
  { id: 'sessions_100', name: 'Dedicated', desc: '100 sessions', icon: '🏆', requirement: { type: 'sessions', value: 100 } },
  { id: 'lessons_10', name: 'Quick Learner', desc: 'Complete 10 lessons', icon: '🎓', requirement: { type: 'lessons', value: 10 } },
  { id: 'lessons_all', name: 'Lesson Master', desc: 'Complete all lessons', icon: '🏅', requirement: { type: 'lessons', value: 55 } },
  { id: 'essays_5', name: 'Essay Novice', desc: 'Complete 5 essays', icon: '✍️', requirement:  { type: 'essays', value: 5 } },
  { id: 'essays_all', name: 'Essay Master', desc: 'Complete all essays', icon: '📜', requirement: { type: 'essays', value: 20 } },
  { id: 'time_1hr', name: 'One Hour', desc: 'Practice for 1 hour', icon: '⏱️', requirement: { type: 'time', value:  3600 } },
  { id: 'time_5hr', name: 'Five Hours', desc: 'Practice for 5 hours', icon: '⏱️⏱️', requirement: { type: 'time', value:  18000 } },
  { id: 'premium', name: 'Premium Member', desc: 'Unlock premium', icon: '👑', requirement: { type: 'premium', value: true } },
  { id: 'tech_master', name: 'Code Typer', desc: 'Complete all tech docs', icon: '💻', requirement: { type: 'docs', value: 8 } }
];

// ============================================
// STORAGE SERVICE
// ============================================

const StorageService = {
  KEYS: {
    USER_DATA: 'typingmaster_user_data',
    ACTIVE_SESSION: 'typingmaster_active_session'
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  getUserData() {
    return this.get(this.KEYS.USER_DATA) || this.getDefaultUserData();
  },

  setUserData(data) {
    return this.set(this.KEYS.USER_DATA, data);
  },

  getDefaultUserData() {
    return {
      isPremium: false,
      premiumUntil: null,
      bestWpm: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      totalSessions: 0,
      totalTime: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      achievements: [],
      lessonsCompleted: [],
      essaysCompleted: [],
      docsCompleted: [],
      sessionHistory: [],
      keyErrors: {},
      wpmHistory: [],
      accuracyHistory: [],
      accuracyStreak: 0,
      xp: 0,
      level: 1
    };
  },

  clearActiveSession() {
    return this.remove(this.KEYS.ACTIVE_SESSION);
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
};

// ============================================
// MAIN APPLICATION
// ============================================

export default function TypingMasterApp() {
  const [mode, setMode] = useState('home');
  const [userData, setUserData] = useState(StorageService.getDefaultUserData());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCustomTextModal, setShowCustomTextModal] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [practiceText, setPracticeText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentEssay, setCurrentEssay] = useState(null);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [customText, setCustomText] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionResults, setSessionResults] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const data = StorageService. getUserData();
    setUserData(data);
    checkStreak(data);
  }, []);

  useEffect(() => {
    StorageService.setUserData(userData);
  }, [userData]);

  useEffect(() => {
    if (isTyping && startTime) {
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        if (elapsed > 0 && userInput.length > 0) {
          const calculatedWpm = Math.round((userInput.length / 5) / elapsed) || 0;
          setWpm(calculatedWpm);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isTyping, startTime, userInput]);

  const checkStreak = (data) => {
    if (!data.lastPracticeDate) return;
    const today = new Date().toDateString();
    const lastDate = new Date(data.lastPracticeDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastDate !== today && lastDate !== yesterday) {
      setUserData(prev => ({ ...prev, currentStreak: 0 }));
    }
  };

  const showNotificationMsg = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const startSession = useCallback((text, lesson = null, essay = null, doc = null) => {
    setPracticeText(text);
    setUserInput('');
    setCurrentIndex(0);
    setErrors([]);
    setIsTyping(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCurrentLesson(lesson);
    setCurrentEssay(essay);
    setCurrentDoc(doc);
    setSessionComplete(false);
    setSessionResults(null);
    setMode('typing');
    
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleTyping = useCallback((e) => {
    const value = e.target.value;
    
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      setStartTime(Date.now());
    }

    setUserInput(value);
    
    const newErrors = [];
    let correct = 0;
    
    for (let i = 0; i < value.length && i < practiceText.length; i++) {
      if (value[i] === practiceText[i]) {
        correct++;
      } else {
        newErrors.push(i);
      }
    }
    
    setErrors(newErrors);
    setCurrentIndex(value.length);
    
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(acc);

    if (value.length >= practiceText.length) {
      completeSession(wpm, acc, newErrors);
    }
  }, [isTyping, practiceText, wpm]);

  const completeSession = useCallback((finalWpm, finalAccuracy, finalErrors) => {
    if (sessionComplete) return;
    setSessionComplete(true);
    setIsTyping(false);
    
    const duration = startTime ? (Date.now() - startTime) / 1000 : 0;
    const today = new Date().toDateString();
    
    const keyErrorsUpdate = { ...userData.keyErrors };
    finalErrors.forEach(idx => {
      if (idx < practiceText.length) {
        const expectedKey = practiceText[idx];
        keyErrorsUpdate[expectedKey] = (keyErrorsUpdate[expectedKey] || 0) + 1;
      }
    });
    
    const xpEarned = Math.floor(10 + (finalWpm / 10) + finalAccuracy);
    
    let newStreak = userData.currentStreak;
    if (userData.lastPracticeDate) {
      const lastDate = new Date(userData.lastPracticeDate).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastDate === yesterday) {
        newStreak = userData.currentStreak + 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    const newAccuracyStreak = finalAccuracy >= 95 ? userData.accuracyStreak + 1 : 0;

    const sessionRecord = {
      id: generateId(),
      date: Date.now(),
      wpm: finalWpm,
      accuracy:  finalAccuracy,
      duration,
      type: currentLesson ? 'lesson' : currentEssay ? 'essay' : currentDoc ? 'doc' : 'custom'
    };

    const updatedData = {
      ...userData,
      bestWpm: Math.max(userData.bestWpm, finalWpm),
      averageWpm:  userData.totalSessions > 0 
        ? Math.round((userData.averageWpm * userData.totalSessions + finalWpm) / (userData.totalSessions + 1))
        : finalWpm,
      averageAccuracy: userData.totalSessions > 0
        ?  Math.round((userData.averageAccuracy * userData.totalSessions + finalAccuracy) / (userData.totalSessions + 1))
        : finalAccuracy,
      totalSessions:  userData.totalSessions + 1,
      totalTime: userData.totalTime + Math.round(duration),
      currentStreak: newStreak,
      longestStreak: Math.max(userData.longestStreak, newStreak),
      lastPracticeDate: Date.now(),
      sessionHistory: [...userData.sessionHistory, sessionRecord]. slice(-500),
      keyErrors: keyErrorsUpdate,
      wpmHistory: [...userData.wpmHistory, { date: Date.now(), wpm: finalWpm }].slice(-100),
      accuracyHistory: [...userData.accuracyHistory, { date: Date.now(), accuracy: finalAccuracy }]. slice(-100),
      accuracyStreak:  newAccuracyStreak,
      xp: userData.xp + xpEarned,
      level: calculateLevel(userData.xp + xpEarned)
    };

    if (finalAccuracy >= 95) {
      if (currentLesson && !userData.lessonsCompleted.includes(currentLesson.id)) {
        updatedData.lessonsCompleted = [...userData.lessonsCompleted, currentLesson.id];
      }
      if (currentEssay && !userData.essaysCompleted.includes(currentEssay.id)) {
        updatedData.essaysCompleted = [...userData.essaysCompleted, currentEssay.id];
      }
      if (currentDoc && !userData.docsCompleted.includes(currentDoc.id)) {
        updatedData.docsCompleted = [...userData.docsCompleted, currentDoc.id];
      }
    }

    const newAchievements = checkAchievements(updatedData);
    const brandNewAchievements = newAchievements. filter(a => !userData.achievements.includes(a));
    updatedData.achievements = [...new Set([...userData.achievements, ...newAchievements])];

    setUserData(updatedData);
    setSessionResults({
      wpm:  finalWpm,
      accuracy: finalAccuracy,
      duration,
      xpEarned,
      newAchievements: brandNewAchievements
    });

    if (brandNewAchievements.length > 0) {
      const ach = ACHIEVEMENTS.find(a => a.id === brandNewAchievements[0]);
      if (ach) {
        showNotificationMsg(`🎉 Achievement unlocked:  ${ach.name}`);
      }
    }
  }, [sessionComplete, startTime, userData, currentLesson, currentEssay, currentDoc, practiceText]);

  const calculateLevel = (xp) => {
    let level = 1;
    let xpRequired = 100;
    let totalXpRequired = 0;
    
    while (xp >= totalXpRequired + xpRequired) {
      totalXpRequired += xpRequired;
      level++;
      xpRequired = level * 100;
    }
    
    return level;
  };

  const checkAchievements = (data) => {
    const unlocked = [];
    
    ACHIEVEMENTS.forEach(ach => {
      if (data.achievements.includes(ach.id)) return;
      
      const { type, value } = ach.requirement;
      
      switch (type) {
        case 'wpm':
          if (data.bestWpm >= value) unlocked.push(ach.id);
          break;
        case 'accuracy': 
          if (data.sessionHistory.some(s => s.accuracy >= value)) unlocked.push(ach.id);
          break;
        case 'accuracy_streak':
          if (data.accuracyStreak >= value) unlocked.push(ach.id);
          break;
        case 'streak':
          if (data.currentStreak >= value) unlocked.push(ach.id);
          break;
        case 'sessions': 
          if (data.totalSessions >= value) unlocked.push(ach.id);
          break;
        case 'lessons':
          if (data.lessonsCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'essays': 
          if (data. essaysCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'docs': 
          if (data.docsCompleted.length >= value) unlocked.push(ach.id);
          break;
        case 'time':
          if (data.totalTime >= value) unlocked.push(ach.id);
          break;
        case 'premium':
          if (data.isPremium) unlocked.push(ach.id);
          break;
        default:
          break;
      }
    });
    
    return unlocked;
  };

  const handlePayment = () => {
    const premiumUntil = new Date();
    premiumUntil.setFullYear(premiumUntil.getFullYear() + 1);
    
    setUserData(prev => ({
      ...prev,
      isPremium: true,
      premiumUntil: premiumUntil.toISOString(),
      achievements: [... new Set([...prev.achievements, 'premium'])]
    }));
    
    setShowPaymentModal(false);
    showNotificationMsg('🎉 Premium activated! Enjoy all analytics features.');
  };

  const handleCustomTextSubmit = () => {
    if (customText.trim().length < 20) {
      showNotificationMsg('Please enter at least 20 characters', 'error');
      return;
    }
    startSession(customText. trim());
    setShowCustomTextModal(false);
    setCustomText('');
  };

  const isLessonUnlocked = (lesson) => {
    if (lesson.id === 1) return true;
    return userData.lessonsCompleted.includes(lesson.id - 1);
  };

  const renderChar = (char, index) => {
    let className = 'inline transition-all duration-75';
    
    if (index < currentIndex) {
      if (errors. includes(index)) {
        className += ' bg-red-500 text-white rounded px-0.5';
      } else {
        className += ' text-emerald-400';
      }
    } else if (index === currentIndex) {
      className += ' bg-yellow-400 text-gray-900 rounded px-0.5 animate-pulse';
    } else {
      className += ' text-gray-500';
    }
    
    if (char === ' ') {
      return <span key={index} className={className}>&nbsp;</span>;
    }
    
    return <span key={index} className={className}>{char}</span>;
  };

  const sections = [... new Set(LESSONS.map(l => l.section))];
  const filteredLessons = selectedSection === 'all' 
    ?  LESSONS 
    : LESSONS.filter(l => l.section === selectedSection);

  // Analytics Components
  const WeakKeyAnalysis = () => {
    if (!userData.isPremium) {
      return (
        <div className="bg-gray-800/50 border-2 border-yellow-500/30 rounded-xl p-6 text-center">
          <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Weak Key Analysis</h3>
          <p className="text-gray-400 text-sm mb-4">Identify your problem keys</p>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-sm"
          >
            Unlock Premium ₹19
          </button>
        </div>
      );
    }

    const sortedKeys = Object.entries(userData.keyErrors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    if (sortedKeys.length === 0) {
      return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Weak Key Analysis
          </h3>
          <p className="text-gray-400 text-sm">Complete more sessions to see data. </p>
        </div>
      );
    }

    const maxErrors = sortedKeys[0][1];

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-red-400" />
          Your Weak Keys
        </h3>
        <div className="space-y-2">
          {sortedKeys.map(([key, count]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono bg-gray-900 px-2 py-0.5 rounded">
                  {key === ' ' ? 'Space' : key}
                </span>
                <span className="text-red-400">{count} errors</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{ width: `${(count / maxErrors) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProgressChart = () => {
    if (!userData.isPremium) {
      return (
        <div className="bg-gray-800/50 border-2 border-yellow-500/30 rounded-xl p-6 text-center">
          <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Progress Charts</h3>
          <p className="text-gray-400 text-sm mb-4">Track improvement over time</p>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-sm"
          >
            Unlock Premium ₹19
          </button>
        </div>
      );
    }

    if (userData.wpmHistory.length < 3) {
      return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">WPM Progress</h3>
          <p className="text-gray-400 text-sm">Complete at least 3 sessions to see chart. </p>
        </div>
      );
    }

    const data = userData.wpmHistory. slice(-15);
    const maxWpm = Math.max(...data.map(d => d.wpm), 1);
    const chartHeight = 120;

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          WPM Progress
        </h3>
        <div className="relative" style={{ height: chartHeight }}>
          <svg width="100%" height={chartHeight} className="overflow-visible">
            <polyline
              points={data.map((d, i) => {
                const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
                const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
                return `${x}%,${y}`;
              }).join(' ')}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {data.map((d, i) => {
              const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
              const y = chartHeight - ((d.wpm / maxWpm) * (chartHeight - 20)) - 10;
              return <circle key={i} cx={`${x}%`} cy={y} r="3" fill="#06b6d4" />;
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Oldest</span>
          <span className="text-cyan-400 font-semibold">Latest:  {data[data.length - 1]?.wpm} WPM</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-emerald-500' : 
          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border-2 border-yellow-500/50 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Premium Features
              </h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white text-xl">×</button>
            </div>

            <div className="space-y-3 mb-6">
              {['Detailed Performance Graphs', 'Weak Key Identification', 'Speed vs Accuracy Analysis', 'Advanced Analytics Dashboard'].map(feature => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 text-center">
              <div className="text-4xl font-bold text-yellow-400">₹19</div>
              <div className="text-sm text-gray-400">Lifetime access</div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Unlock Premium Now
            </button>
          </div>
        </div>
      )}

      {/* Custom Text Modal */}
      {showCustomTextModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Import Custom Text</h2>
              <button onClick={() => setShowCustomTextModal(false)} className="text-gray-400 hover:text-white text-xl">×</button>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e. target.value)}
              placeholder="Paste or type your custom text here (minimum 20 characters)..."
              className="w-full h-48 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm focus:border-cyan-500 outline-none resize-none"
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">
                {customText.length} characters {customText.length >= 20 ? '✓' : `(need ${20 - customText.length} more)`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCustomTextModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomTextSubmit}
                  disabled={customText.length < 20}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold disabled:opacity-50"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
                  TypeMaster Pro
                  {userData.isPremium && <Crown className="w-4 h-4 text-yellow-400" />}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!userData.isPremium && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold text-xs hover:shadow-lg flex items-center gap-1"
                >
                  <Crown className="w-3 h-3" />
                  Premium ₹19
                </button>
              )}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-semibold text-orange-400 text-sm">{userData.currentStreak}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-purple-400 text-sm">Lv. {userData.level}</span>
              </div>
            </div>
          </div>
          
          <nav className="flex gap-1.5 mt-3 overflow-x-auto pb-1">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'lessons', label: 'Lessons', icon:  FileText },
              { id: 'essays', label: 'Essays', icon: FileText },
              { id: 'technical', label: 'Technical', icon: Code },
              { id: 'custom', label: 'Custom', icon: Upload },
              { id: 'analytics', label: 'Analytics', icon:  BarChart3 },
              { id: 'progress', label: 'Progress', icon: Trophy }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  mode === tab.id 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'analytics' && !userData.isPremium && <Lock className="w-3 h-3" />}
              </button>
            ))}
          </nav>
        </div>
      </header>

       {/* Main Content */}
       <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* HOME MODE */}
        {mode === 'home' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Master Touch Typing
              </h2>
              <p className="text-gray-400">55 Lessons • 20 Essays • 8 Technical Docs • Custom Practice</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400 text-xs">Best WPM</span>
                </div>
                <div className="text-2xl font-bold text-cyan-400">{userData.bestWpm}</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-400 text-xs">Avg Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">{userData.averageAccuracy}%</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-xs">Sessions</span>
                </div>
                <div className="text-2xl font-bold text-purple-400">{userData.totalSessions}</div>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-400 text-xs">Total Time</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">{formatTime(userData.totalTime)}</div>
              </div>
            </div>

            {/* Quick Start Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setMode('lessons')}
                className="p-5 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-xl hover:border-cyan-400 transition-all text-left"
              >
                <FileText className="w-7 h-7 text-cyan-400 mb-2" />
                <h3 className="font-bold mb-1">Lessons</h3>
                <p className="text-gray-400 text-xs">{userData.lessonsCompleted.length}/{LESSONS.length} completed</p>
              </button>
              <button
                onClick={() => setMode('essays')}
                className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl hover:border-purple-400 transition-all text-left"
              >
                <FileText className="w-7 h-7 text-purple-400 mb-2" />
                <h3 className="font-bold mb-1">Essays</h3>
                <p className="text-gray-400 text-xs">{userData.essaysCompleted.length}/{ESSAYS.length} completed</p>
              </button>
              <button
                onClick={() => setMode('technical')}
                className="p-5 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-xl hover:border-emerald-400 transition-all text-left"
              >
                <Code className="w-7 h-7 text-emerald-400 mb-2" />
                <h3 className="font-bold mb-1">Technical</h3>
                <p className="text-gray-400 text-xs">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length} completed</p>
              </button>
              <button
                onClick={() => setShowCustomTextModal(true)}
                className="p-5 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-xl hover:border-yellow-400 transition-all text-left"
              >
                <Upload className="w-7 h-7 text-yellow-400 mb-2" />
                <h3 className="font-bold mb-1">Custom</h3>
                <p className="text-gray-400 text-xs">Practice your text</p>
              </button>
            </div>

            {/* Recent Achievements */}
            {userData.achievements.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Recent Achievements ({userData.achievements.length}/{ACHIEVEMENTS.length})
                </h3>
                <div className="flex flex-wrap gap-3">
                  {userData.achievements.slice(-6).map(achId => {
                    const ach = ACHIEVEMENTS. find(a => a.id === achId);
                    if (!ach) return null;
                    return (
                      <div key={achId} className="bg-gray-900/50 rounded-lg px-3 py-2 border border-yellow-500/20">
                        <span className="text-xl mr-2">{ach.icon}</span>
                        <span className="text-sm font-medium">{ach.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* LESSONS MODE */}
        {mode === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold">Structured Lessons</h2>
                <p className="text-gray-400 text-sm">{userData.lessonsCompleted.length}/{LESSONS.length} completed</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedSection('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    selectedSection === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  All
                </button>
                {sections.map(section => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      selectedSection === section ? 'bg-cyan-500 text-white' : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons. map(lesson => {
                const isCompleted = userData.lessonsCompleted.includes(lesson.id);
                const isUnlocked = isLessonUnlocked(lesson);
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => isUnlocked && startSession(lesson.text, lesson)}
                    disabled={!isUnlocked}
                    className={`p-4 rounded-xl text-left transition-all ${
                      !isUnlocked 
                        ? 'bg-gray-800/30 border border-gray-700/50 opacity-50 cursor-not-allowed' 
                        : isCompleted
                        ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-500">{lesson.section}</div>
                        <div className="font-bold">{lesson.id}. {lesson.title}</div>
                      </div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {!isUnlocked && <Lock className="w-5 h-5 text-gray-500" />}
                    </div>
                    <div className="text-xs text-gray-400 truncate mb-2 font-mono">{lesson.text}</div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :  
                        lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {lesson.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">~{lesson.estimatedTime}min</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ESSAYS MODE */}
        {mode === 'essays' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Essay Practice</h2>
              <p className="text-gray-400 text-sm">{userData.essaysCompleted.length}/{ESSAYS.length} completed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ESSAYS.map(essay => {
                const isCompleted = userData.essaysCompleted.includes(essay.id);
                
                return (
                  <button
                    key={essay.id}
                    onClick={() => startSession(essay.text, null, essay)}
                    className={`p-5 rounded-xl text-left transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-lg">{essay.title}</div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{essay.text}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        essay.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' : 
                        essay.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {essay.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">~{essay.estimatedTime}min</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TECHNICAL MODE */}
        {mode === 'technical' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-400" />
                Technical Documentation
              </h2>
              <p className="text-gray-400 text-sm">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length} completed</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TECHNICAL_DOCS.map(doc => {
                const isCompleted = userData.docsCompleted.includes(doc.id);
                
                return (
                  <button
                    key={doc.id}
                    onClick={() => startSession(doc.text, null, null, doc)}
                    className={`p-5 rounded-xl text-left transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-500">{doc.category}</div>
                        <div className="font-bold">{doc.title}</div>
                      </div>
                      {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </div>
                    <pre className="text-xs text-gray-400 bg-gray-900/50 p-2 rounded overflow-hidden whitespace-pre-wrap line-clamp-3 mb-3">
                      {doc.text}
                    </pre>
                    <span className="text-xs text-gray-500">~{doc.estimatedTime}min</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CUSTOM MODE */}
        {mode === 'custom' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Upload className="w-6 h-6 text-yellow-400" />
                Custom Text Practice
              </h2>
              <p className="text-gray-400 text-sm">Import your own text for personalized practice</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-4">Import Text</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Paste any text you want to practice - articles, documents, or study materials. 
                </p>
                <button
                  onClick={() => setShowCustomTextModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Import Text
                </button>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-4">Suggestions</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Study notes for exams
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Work documents and reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Code snippets from projects
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Book excerpts or articles
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS MODE */}
        {mode === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
                Advanced Analytics
              </h2>
              <p className="text-gray-400 text-sm">
                {userData.isPremium ? 'Deep insights into your performance' : 'Unlock premium for detailed analytics'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressChart />
              <WeakKeyAnalysis />
            </div>

            {userData.isPremium && userData.sessionHistory.length > 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-4">Recent Sessions</h3>
                <div className="space-y-2">
                  {userData.sessionHistory.slice(-10).reverse().map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
                      <span className="text-sm text-gray-400">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-cyan-400 font-semibold">{session.wpm} WPM</span>
                        <span className="text-emerald-400 font-semibold">{session.accuracy}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROGRESS MODE */}
        {mode === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            
            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Lessons</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${(userData.lessonsCompleted.length / LESSONS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.lessonsCompleted.length}/{LESSONS.length}</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Essays</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-600"
                    style={{ width: `${(userData.essaysCompleted.length / ESSAYS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.essaysCompleted.length}/{ESSAYS.length}</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <h3 className="font-bold mb-3">Technical Docs</h3>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600"
                    style={{ width: `${(userData.docsCompleted.length / TECHNICAL_DOCS.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">{userData.docsCompleted.length}/{TECHNICAL_DOCS.length}</span>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold mb-4">Achievements ({userData.achievements.length}/{ACHIEVEMENTS.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {ACHIEVEMENTS.map(ach => {
                  const unlocked = userData.achievements.includes(ach.id);
                  return (
                    <div 
                      key={ach.id}
                      className={`rounded-lg p-3 text-center border ${
                        unlocked 
                          ? 'bg-yellow-500/10 border-yellow-500/30' 
                          : 'bg-gray-900/50 border-gray-700/50 opacity-40'
                      }`}
                    >
                      <div className="text-2xl mb-1">{ach.icon}</div>
                      <div className="font-semibold text-xs">{ach.name}</div>
                      <div className="text-xs text-gray-400">{ach.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TYPING MODE */}
        {mode === 'typing' && practiceText && (
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Speed</div>
                <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
                <div className="text-xs text-gray-400">WPM</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                <div className="text-3xl font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-gray-400">{currentIndex}/{practiceText.length}</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <div className="text-sm text-gray-400 mb-1">Errors</div>
                <div className="text-3xl font-bold text-purple-400">{errors.length}</div>
                <div className="text-xs text-gray-400">mistakes</div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              {/* Session Info */}
              {(currentLesson || currentEssay || currentDoc) && (
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="text-sm text-gray-400">
                    {currentLesson && `Lesson ${currentLesson.id}:  ${currentLesson.title}`}
                    {currentEssay && currentEssay.title}
                    {currentDoc && `${currentDoc.category}:  ${currentDoc.title}`}
                  </div>
                </div>
              )}
              
              {/* Text Display */}
              <div className="bg-gray-900/50 rounded-lg p-5 mb-5 font-mono text-lg leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                {practiceText. split('').map((char, idx) => renderChar(char, idx))}
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all"
                    style={{ width: `${(currentIndex / practiceText.length) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-400 mt-1 text-center">
                  {Math.round((currentIndex / practiceText.length) * 100)}% Complete
                </div>
              </div>

              {/* Input Field */}
              {!sessionComplete && (
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleTyping}
                  className="w-full bg-gray-900 border-2 border-gray-700 focus:border-cyan-500 rounded-lg px-4 py-3 font-mono outline-none mb-5"
                  placeholder="Start typing here..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              )}

              {/* Session Results */}
              {sessionComplete && sessionResults && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 mb-5 text-center">
                  <h3 className="text-xl font-bold text-emerald-400 mb-3">Session Complete!</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">{sessionResults.wpm}</div>
                      <div className="text-xs text-gray-400">WPM</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{sessionResults.accuracy}%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">+{sessionResults.xpEarned}</div>
                      <div className="text-xs text-gray-400">XP Earned</div>
                    </div>
                  </div>
                  {sessionResults.accuracy >= 95 && (
                    <p className="text-sm text-emerald-400">✓ Content marked as completed! </p>
                  )}
                  {sessionResults.accuracy < 95 && (
                    <p className="text-sm text-yellow-400">⚠ Need 95%+ accuracy to complete</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => startSession(practiceText, currentLesson, currentEssay, currentDoc)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>
                
                {currentLesson && (
                  <button
                    onClick={() => {
                      const nextLesson = LESSONS.find(l => l.id === currentLesson.id + 1);
                      if (nextLesson && isLessonUnlocked(nextLesson)) {
                        startSession(nextLesson.text, nextLesson);
                      }
                    }}
                    disabled={!LESSONS.find(l => l.id === currentLesson.id + 1) || !userData.lessonsCompleted. includes(currentLesson.id)}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {currentEssay && (
                  <button
                    onClick={() => {
                      const nextEssay = ESSAYS.find(e => e.id === currentEssay.id + 1);
                      if (nextEssay) startSession(nextEssay.text, null, nextEssay);
                    }}
                    disabled={!ESSAYS.find(e => e.id === currentEssay.id + 1)}
                    className="px-5 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center gap-2"
                  >
                    Next Essay
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    if (currentLesson) setMode('lessons');
                    else if (currentEssay) setMode('essays');
                    else if (currentDoc) setMode('technical');
                    else setMode('home');
                  }}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm">
              <strong className="text-blue-400">💡 Tip: </strong> Focus on accuracy first, speed will come naturally! 
            </div>
          </div>
        )}
      </main>

      {/* CSS for line-clamp */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

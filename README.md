# 🎓 Interactive Learning Platform

A modern, fully responsive learning platform built with **React**, **TypeScript**, and **Tailwind CSS**. Features story-based learning, interactive quizzes, achievement tracking, and comprehensive user profile management.

![Learning Platform](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## ✨ Features

### 🏠 Home Dashboard
- Real-time XP progress tracking
- Level system with visual progress bar
- 4 interactive quick action buttons
- Horizontal scrollable story carousels
- Responsive card layouts

### 🎵 Audio Story Player
- Play/Pause functionality
- Skip forward/backward controls (10 seconds)
- Interactive volume slider with percentage display
- Real-time progress tracking
- Story completion rewards with XP

### 🧠 Interactive Quiz System
- 6 diverse topic categories
- 3 difficulty levels (Beginner, Intermediate, Advanced)
- 5 questions per quiz with instant feedback
- Visual answer validation (green/red)
- XP rewards based on difficulty
- Achievement unlocking for perfect scores

### 👤 Profile Management
- Editable user information
- Live stats display (XP, Streak, Stories)
- Achievement tracking system
- Notification settings with toggle switches
- Privacy settings

### 🏆 Achievement System
- 5 unique achievements to unlock
- Progress tracking
- Visual locked/unlocked states
- Automatic unlocking based on milestones

### 📱 Fully Responsive
- Mobile-first design (320px+)
- Tablet optimized (640px+)
- Desktop compatible (1024px+)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or create the project**
```bash
npm create vite@latest learning-platform -- --template react-ts
cd learning-platform
```

2. **Install dependencies**
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
npx tailwindcss init -p
```

3. **Create folder structure**
```bash
mkdir -p src/components/modals src/data src/types
```

4. **Copy all code files** from this repository into the appropriate locations

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
Navigate to `http://localhost:5173`

## 📁 Project Structure
```
learning-platform/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomeScreen.tsx
│   │   ├── PlayerScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── BottomNav.tsx
│   │   └── modals/
│   │       ├── EditProfileModal.tsx
│   │       ├── NotificationsModal.tsx
│   │       ├── QuizResultsModal.tsx
│   │       └── AchievementsModal.tsx
│   ├── data/
│   │   ├── stories.ts
│   │   ├── quizTopics.ts
│   │   └── quizQuestions.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎮 How to Use

### Home Screen
1. View your XP progress at the top
2. Click **Daily** to complete daily challenges (+50 XP)
3. Click **Quiz** to start a quiz
4. Click **Goals** to see daily objectives
5. Click **Rewards** to view all achievements
6. Scroll through story carousels and click to play

### Player Screen
1. Click any story card to open the player
2. Use **Play/Pause** to control playback
3. **Skip Back/Forward** to jump 10 seconds
4. Click the **volume bar** to adjust volume
5. Complete stories to earn XP and unlock achievements

### Quiz System
1. Navigate to **Learn** tab
2. Select a **topic** (Science, Math, History, etc.)
3. Choose a **difficulty level** (Beginner, Intermediate, Advanced)
4. Click **Start Quiz**
5. Answer 5 questions with instant feedback
6. View results and earned XP
7. Get perfect score (5/5) to unlock "Quiz Master" achievement

### Profile
1. View your stats (XP, Streak, Stories)
2. Click **Edit Profile** to change your name
3. Click **Notifications** to toggle settings
4. Click **View All** to see all achievements

## 🎯 Achievement System

| Achievement | Description | Unlock Condition |
|------------|-------------|------------------|
| 🎯 First Steps | Completed first story | Unlocked by default |
| 🔥 Week Warrior | 7 day learning streak | Unlocked by default |
| ⭐ Quiz Master | Perfect score on quiz | Get 5/5 on any quiz |
| 📚 Speed Reader | Complete 10 stories | Finish 10 stories |
| 🦉 Night Owl | Study after 10 PM | Coming soon |

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **TypeScript 5.2** - Type safety
- **Tailwind CSS 3.3** - Utility-first styling
- **Vite 5.0** - Fast build tool
- **Lucide React** - Beautiful icons

## 📦 Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify
1. Run `npm run build`
2. Upload `dist` folder to [netlify.com](https://netlify.com)

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🎨 Customization

### Add New Stories
Edit `src/data/stories.ts`:
```typescript
export const stories: Story[] = [
  { id: 9, title: "New Story", duration: "10 min", image: "🌟", category: "Custom", xp: 45 }
];
```

### Add Quiz Questions
Edit `src/data/quizQuestions.ts`:
```typescript
{
  question: "Your question?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  correct: 1 // Index of correct answer (0-3)
}
```

### Modify XP Rewards
- Daily Challenge: Line in `HomeScreen.tsx` - currently +50 XP
- Stories: Edit `xp` value in `stories.ts`
- Quizzes: Edit `difficultyLevels` in `App.tsx`

### Add Achievements
Edit achievements array in `App.tsx`:
```typescript
{ 
  id: 6, 
  title: 'New Achievement', 
  desc: 'Description', 
  icon: '🎖️', 
  color: 'bg-pink-50 border-pink-200', 
  unlocked: false 
}
```

## 🎯 Key Assumptions

1. Stories simulate audio playback (no actual audio files)
2. Quiz questions are predefined (5 questions per quiz)
3. XP system:
   - Daily challenges: +50 XP
   - Stories: 40-70 XP (varies by story)
   - Quizzes: 30-100 XP (based on difficulty)
4. No backend - all state stored in memory
5. Mobile-first responsive design (320px minimum width)
6. Modern browser support (ES2020+)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

### Port already in use
Vite will automatically use another port (5174, 5175, etc.)

### TypeScript errors
```bash
npm install
npm run dev
```

### Missing dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Styling not working
Verify `tailwind.config.js` has correct content paths

## ✅ Testing Checklist

- [ ] Home screen loads with XP bar
- [ ] All 4 quick action buttons work
- [ ] Story cards are clickable
- [ ] Player controls work (play/pause/skip)
- [ ] Volume slider is interactive
- [ ] Quiz topic selection works
- [ ] Quiz difficulty selection unlocks after topic
- [ ] Quiz questions display correctly
- [ ] Answer feedback shows (green/red)
- [ ] Quiz completion shows results
- [ ] Profile displays correct stats
- [ ] Edit profile changes

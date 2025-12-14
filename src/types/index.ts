export type Screen = 'home' | 'player' | 'quiz' | 'profile';

export type Story = {
  id: number;
  title: string;
  duration: string;
  image: string;
  category: string;
  xp: number;
};

export type QuizTopic = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

export type DifficultyLevel = {
  id: string;
  title: string;
  description: string;
  xp: number;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

export type Achievement = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
  unlocked: boolean;
};

export type NotificationSettings = {
  dailyReminders: boolean;
  achievementAlerts: boolean;
  weeklyReport: boolean;
};

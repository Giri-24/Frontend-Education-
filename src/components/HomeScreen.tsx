import React from 'react';
import { User, Zap, Brain, Target, Star, ChevronRight } from 'lucide-react';
import { Story } from '../types';
import { stories, recentStories } from '../data/stories';

interface HomeScreenProps {
  userXP: number;
  nextLevelXP: number;
  xpProgress: number;
  userLevel: number;
  setCurrentScreen: (screen: 'home' | 'player' | 'quiz' | 'profile') => void;
  handleStoryClick: (story: Story) => void;
  setDailyStreak: React.Dispatch<React.SetStateAction<number>>;
  setUserXP: React.Dispatch<React.SetStateAction<number>>;
  setShowAchievements: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  userXP,
  nextLevelXP,
  xpProgress,
  userLevel,
  setCurrentScreen,
  handleStoryClick,
  setDailyStreak,
  setUserXP,
  setShowAchievements
}) => {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Hello, Student! 👋</h1>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1">Ready to learn something new?</p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium">Level {userLevel}</span>
            <span className="text-xs sm:text-sm">{userXP} / {nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2.5 sm:h-3 rounded-full transition-all duration-300"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Daily', color: 'from-yellow-400 to-orange-500', action: () => {
              setDailyStreak(prev => prev + 1);
              setUserXP(prev => prev + 50);
              alert('Daily challenge completed! +50 XP 🎯');
            }},
            { icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Quiz', color: 'from-pink-400 to-rose-500', action: () => setCurrentScreen('quiz') },
            { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Goals', color: 'from-green-400 to-emerald-500', action: () => alert('Set daily goals: 30 min study, 3 stories, 1 quiz 🎯') },
            { icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Rewards', color: 'from-blue-400 to-cyan-500', action: () => setShowAchievements(true) }
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={action.action}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-gradient-to-br ${action.color} text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all`}
            >
              {action.icon}
              <span className="text-xs font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Stories */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Popular Stories</h2>
          <button className="text-indigo-600 text-xs sm:text-sm font-semibold flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map(story => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(story)}
              className="flex-shrink-0 w-36 sm:w-40 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="h-28 sm:h-32 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-4xl sm:text-5xl">
                {story.image}
              </div>
              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-1 line-clamp-2">{story.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{story.duration}</span>
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Zap className="w-3 h-3" /> {story.xp}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Stories */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Continue Learning</h2>
          <button className="text-indigo-600 text-xs sm:text-sm font-semibold flex items-center gap-1">
            See All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {recentStories.map(story => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(story)}
              className="flex-shrink-0 w-36 sm:w-40 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="h-28 sm:h-32 bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-4xl sm:text-5xl">
                {story.image}
              </div>
              <div className="p-2.5 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-1 line-clamp-2">{story.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{story.duration}</span>
                  <span className="flex items-center gap-1 text-yellow-600">
                    <Zap className="w-3 h-3" /> {story.xp}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

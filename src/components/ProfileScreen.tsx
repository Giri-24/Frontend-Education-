import React from 'react';
import { User, Zap, Target, Book, ChevronRight, Bell, Shield } from 'lucide-react';
import { Achievement } from '../types';

interface ProfileScreenProps {
  userName: string;
  userLevel: number;
  userXP: number;
  dailyStreak: number;
  totalStories: number;
  achievements: Achievement[];
  setShowEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAchievements: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  userLevel,
  userXP,
  dailyStreak,
  totalStories,
  achievements,
  setShowEditProfile,
  setShowNotifications,
  setShowAchievements
}) => {
  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 sm:p-8 rounded-b-3xl">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4 border-4 border-white/30">
            <User className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">{userName}</h1>
          <p className="text-indigo-100 text-sm">Level {userLevel} • {userXP} XP</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { icon: <Zap className="w-5 h-5" />, label: 'Daily Streak', value: `${dailyStreak} days`, color: 'from-yellow-400 to-orange-500' },
            { icon: <Target className="w-5 h-5" />, label: 'XP Earned', value: userXP, color: 'from-green-400 to-emerald-500' },
            { icon: <Book className="w-5 h-5" />, label: 'Stories', value: totalStories, color: 'from-blue-400 to-cyan-500' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-xl sm:rounded-2xl p-4 text-center`}
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
              <div className="text-xs font-medium opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Settings</h2>
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
          {[
            { icon: <User className="w-5 h-5" />, label: 'Edit Profile', action: () => setShowEditProfile(true) },
            { icon: <Bell className="w-5 h-5" />, label: 'Notifications', action: () => setShowNotifications(true) },
            { icon: <Shield className="w-5 h-5" />, label: 'Privacy', action: () => alert('Privacy settings coming soon!') }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                  {item.icon}
                </div>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Achievements</h2>
          <button 
            onClick={() => setShowAchievements(true)}
            className="text-indigo-600 text-sm font-semibold flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {achievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className={`${achievement.color} border rounded-xl p-3 flex-shrink-0 w-32 ${
                !achievement.unlocked ? 'opacity-50' : ''
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-sm text-gray-800">{achievement.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{achievement.desc}</p>
              <div className="mt-2 text-right">
                {achievement.unlocked ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Unlocked</span>
                ) : (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;

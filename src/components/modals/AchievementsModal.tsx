import React from 'react';
import { X, Check } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementsModalProps {
  achievements: Achievement[];
  setShowAchievements: React.Dispatch<React.SetStateAction<boolean>>;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  setShowAchievements
}) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-sm max-h-[80vh] overflow-y-auto p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">All Achievements</h2>
          <button 
            onClick={() => setShowAchievements(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`${achievement.color} border-2 rounded-xl p-4 flex items-center gap-4 transition-all ${
                achievement.unlocked ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-base text-gray-800">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.desc}</p>
              </div>
              {achievement.unlocked ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-bold text-indigo-600">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </span> Achievements Unlocked
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementsModal;

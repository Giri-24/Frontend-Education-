import React from 'react';
import { Home, Book, Trophy, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setCurrentScreen }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {[
          { icon: Home, label: 'Home', screen: 'home' as Screen },
          { icon: Book, label: 'Learn', screen: 'quiz' as Screen },
          { icon: Trophy, label: 'Progress', screen: 'home' as Screen },
          { icon: User, label: 'Profile', screen: 'profile' as Screen }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentScreen(item.screen)}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${
              currentScreen === item.screen
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;

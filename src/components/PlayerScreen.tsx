import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Zap } from 'lucide-react';
import { Story } from '../types';

interface PlayerScreenProps {
  selectedStory: Story | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  volume: number;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  handleStoryComplete: () => void;
  formatTime: (seconds: number) => string;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({
  selectedStory,
  isPlaying,
  progress,
  currentTime,
  volume,
  setIsPlaying,
  setCurrentTime,
  setProgress,
  setVolume,
  handleStoryComplete,
  formatTime
}) => {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 pb-24">
        {/* Story Artwork */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center text-7xl sm:text-9xl transform hover:scale-105 transition-transform">
            {selectedStory?.image}
          </div>
        </div>

        {/* Story Info */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{selectedStory?.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-1">{selectedStory?.category}</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <span>{selectedStory?.duration}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-yellow-600">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" /> {selectedStory?.xp} XP
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{selectedStory?.duration}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-1.5 sm:h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 sm:h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <button 
            onClick={() => {
              setCurrentTime(Math.max(0, currentTime - 10));
              setProgress(Math.max(0, progress - 10));
            }}
            className="p-2 sm:p-3 hover:bg-white/50 rounded-full transition-colors active:scale-95"
          >
            <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-7 h-7 sm:w-8 sm:h-8" /> : <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" />}
          </button>
          <button 
            onClick={() => {
              if (progress >= 95) {
                handleStoryComplete();
              } else {
                setCurrentTime(Math.min(720, currentTime + 10));
                setProgress(Math.min(100, progress + 10));
              }
            }}
            className="p-2 sm:p-3 hover:bg-white/50 rounded-full transition-colors active:scale-95"
          >
            <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-6">
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <div className="w-28 sm:w-32 bg-gray-300 rounded-full h-1.5 sm:h-2 cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const newVolume = Math.round((x / rect.width) * 100);
              setVolume(newVolume);
            }}
          >
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 sm:h-2 rounded-full transition-all"
              style={{ width: `${volume}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;

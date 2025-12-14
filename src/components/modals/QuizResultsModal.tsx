import React from 'react';
import { Trophy, Zap } from 'lucide-react';
import { DifficultyLevel, Screen } from '../../types';

interface QuizResultsModalProps {
  score: number;
  totalQuestions: number;
  selectedDifficulty: string | null;
  difficultyLevels: DifficultyLevel[];
  handleRestartQuiz: () => void;
  setShowQuizResults: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentScreen: (screen: Screen) => void;
}

const QuizResultsModal: React.FC<QuizResultsModalProps> = ({
  score,
  totalQuestions,
  selectedDifficulty,
  difficultyLevels,
  handleRestartQuiz,
  setShowQuizResults,
  setCurrentScreen
}) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Quiz Complete! 🎉</h2>
          <p className="text-gray-600 mb-6">Great job on completing the quiz!</p>
          
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-bold text-pink-600 mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600 text-sm">Correct Answers</p>
            <div className="mt-4 pt-4 border-t border-pink-200">
              <div className="flex items-center justify-center gap-2 text-yellow-600">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-lg">
                  +{difficultyLevels.find(d => d.id === selectedDifficulty)?.xp || 0} XP Earned!
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestartQuiz}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Try Another Quiz
            </button>
            <button
              onClick={() => {
                setShowQuizResults(false);
                setCurrentScreen('home');
                handleRestartQuiz();
              }}
              className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsModal;

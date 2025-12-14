import React from 'react';
import { Zap, Check, X } from 'lucide-react';
import { QuizTopic, DifficultyLevel, QuizQuestion } from '../types';
import { quizTopics } from '../data/quizTopics';
import { quizQuestions } from '../data/quizQuestions';

interface QuizScreenProps {
  quizGenerated: boolean;
  quizCompleted: boolean;
  selectedTopic: string | null;
  selectedDifficulty: string | null;
  currentQuestion: number;
  selectedAnswer: number | null;
  score: number;
  difficultyLevels: DifficultyLevel[];
  setSelectedTopic: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedDifficulty: React.Dispatch<React.SetStateAction<string | null>>;
  handleGenerateQuiz: () => void;
  handleAnswerSelect: (answerIndex: number) => void;
  handleNextQuestion: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  quizGenerated,
  quizCompleted,
  selectedTopic,
  selectedDifficulty,
  currentQuestion,
  selectedAnswer,
  score,
  difficultyLevels,
  setSelectedTopic,
  setSelectedDifficulty,
  handleGenerateQuiz,
  handleAnswerSelect,
  handleNextQuestion
}) => {
  if (quizGenerated && !quizCompleted) {
    const question = quizQuestions[currentQuestion];
    const selectedDifficultyData = difficultyLevels.find(d => d.id === selectedDifficulty);
    
    return (
      <div className="flex-1 overflow-y-auto pb-20 px-4 sm:px-6 py-6">
        {/* Quiz Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {quizQuestions.length}</p>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">{selectedTopic} Quiz</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Difficulty</p>
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs font-semibold">
                {selectedDifficultyData?.title}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-600 to-rose-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === question.correct;
              const showResult = selectedAnswer !== null;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : isSelected
                      ? 'border-pink-600 bg-pink-50'
                      : 'border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm sm:text-base text-gray-800">{option}</span>
                    {showResult && isCorrect && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {selectedAnswer !== null && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'} →
          </button>
        )}

        {/* Score Display */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Current Score: <span className="font-bold text-pink-600">{score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-600 to-rose-600 text-white p-4 sm:p-6 rounded-b-3xl mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Craft Your Quiz 🎯</h1>
        <p className="text-pink-100 text-xs sm:text-sm">Choose a topic and challenge level</p>
      </div>

      <div className="px-4 sm:px-6">
        {/* Step 1: Choose Topic */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">1</div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Choose a Topic</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {quizTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all transform hover:scale-105 ${
                  selectedTopic === topic.id
                    ? 'border-pink-600 bg-pink-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                }`}
              >

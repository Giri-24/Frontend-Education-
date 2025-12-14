// Replace everything from line 129 to the end with this:

                <div className="text-center">
                  <span className="block text-3xl mb-2">{topic.icon}</span>
                  <span className="font-semibold text-sm sm:text-base">{topic.title}</span>
                  <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Difficulty */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">2</div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">Choose Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {difficultyLevels.map(level => (
              <button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                disabled={!selectedTopic}
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all transform ${
                  selectedTopic ? 'hover:scale-[1.02]' : ''
                } ${
                  selectedDifficulty === level.id
                    ? 'border-pink-600 bg-pink-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white'
                } ${!selectedTopic ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg">{level.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{level.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Zap className="w-4 h-4" />
                      <span className="font-bold">{level.xp} XP</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Quiz Button */}
        <button
          onClick={handleGenerateQuiz}
          disabled={!selectedTopic || !selectedDifficulty}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
            selectedTopic && selectedDifficulty
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Generate Quiz →
        </button>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>1. Choose any topic that interests you</li>
            <li>2. Select your challenge level</li>
            <li>3. Answer 5 questions to earn XP</li>
            <li>4. Get perfect score for bonus achievements!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;

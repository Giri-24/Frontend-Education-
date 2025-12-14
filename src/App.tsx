import React, { useState, useRef, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import PlayerScreen from './components/PlayerScreen';
import QuizScreen from './components/QuizScreen';
import ProfileScreen from './components/ProfileScreen';
import BottomNav from './components/BottomNav';
import EditProfileModal from './components/modals/EditProfileModal';
import NotificationsModal from './components/modals/NotificationsModal';
import QuizResultsModal from './components/modals/QuizResultsModal';
import AchievementsModal from './components/modals/AchievementsModal';
import { Screen, Story, DifficultyLevel, Achievement, NotificationSettings } from './types';
import { quizQuestions } from './data/quizQuestions';

const difficultyLevels: DifficultyLevel[] = [
  { id: 'easy', title: 'Beginner', description: 'Perfect for starting out', xp: 30 },
  { id: 'medium', title: 'Intermediate', description: 'Challenge yourself', xp: 60 },
  { id: 'hard', title: 'Advanced', description: 'Master level questions', xp: 100 }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userName, setUserName] = useState('Student Name');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dailyReminders: true,
    achievementAlerts: true,
    weeklyReport: false
  });
  const [userLevel, setUserLevel] = useState(12);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [totalStories, setTotalStories] = useState(24);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: 'First Steps', desc: 'Completed first story', icon: '🎯', color: 'bg-blue-50 border-blue-200', unlocked: true },
    { id: 2, title: 'Week Warrior', desc: '7 day learning streak', icon: '🔥', color: 'bg-orange-50 border-orange-200', unlocked: true },
    { id: 3, title: 'Quiz Master', desc: 'Perfect score on quiz', icon: '⭐', color: 'bg-yellow-50 border-yellow-200', unlocked: false },
    { id: 4, title: 'Speed Reader', desc: 'Complete 10 stories', icon: '📚', color: 'bg-green-50 border-green-200', unlocked: false },
    { id: 5, title: 'Night Owl', desc: 'Study after 10 PM', icon: '🦉', color: 'bg-purple-50 border-purple-200', unlocked: false }
  ]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [volume, setVolume] = useState(75);
  const [userXP, setUserXP] = useState(2450);
  const nextLevelXP = 3000;
  const xpProgress = (userXP / nextLevelXP) * 100;
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
        setCurrentTime(prev => prev + 0.3);
      }, 300);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setCurrentScreen('player');
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleGenerateQuiz = () => {
    if (selectedTopic && selectedDifficulty) {
      setQuizGenerated(true);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete();
    }
  };

  const handleRestartQuiz = () => {
    setQuizGenerated(false);
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowQuizResults(false);
  };

  const handleStoryComplete = () => {
    const earnedXP = selectedStory?.xp || 0;
    setUserXP(prev => prev + earnedXP);
    setTotalStories(prev => prev + 1);
    
    if (totalStories + 1 >= 10 && !achievements.find(a => a.id === 4)?.unlocked) {
      unlockAchievement(4);
    }
    
    setIsPlaying(false);
    setProgress(100);
    alert(`Story completed! You earned ${earnedXP} XP! 🎉`);
  };

  const unlockAchievement = (id: number) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id ? { ...achievement, unlocked: true } : achievement
      )
    );
  };

  const handleQuizComplete = () => {
    const earnedXP = difficultyLevels.find(d => d.id === selectedDifficulty)?.xp || 0;
    setUserXP(prev => prev + earnedXP);
    
    if (score === quizQuestions.length && !achievements.find(a => a.id === 3)?.unlocked) {
      unlockAchievement(3);
    }
    
    setQuizCompleted(true);
    setShowQuizResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden h-screen sm:h-[812px] flex flex-col relative">
        {currentScreen === 'home' && (
          <HomeScreen
            userXP={userXP}
            nextLevelXP={nextLevelXP}
            xpProgress={xpProgress}
            userLevel={userLevel}
            setCurrentScreen={setCurrentScreen}
            handleStoryClick={handleStoryClick}
            setDailyStreak={setDailyStreak}
            setUserXP={setUserXP}
            setShowAchievements={setShowAchievements}
          />
        )}
        {currentScreen === 'player' && (
          <PlayerScreen
            selectedStory={selectedStory}
            isPlaying={isPlaying}
            progress={progress}
            currentTime={currentTime}
            volume={volume}
            setIsPlaying={setIsPlaying}
            setCurrentTime={setCurrentTime}
            setProgress={setProgress}
            setVolume={setVolume}
            handleStoryComplete={handleStoryComplete}
            formatTime={formatTime}
          />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen
            quizGenerated={quizGenerated}
            quizCompleted={quizCompleted}
            selectedTopic={selectedTopic}
            selectedDifficulty={selectedDifficulty}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            score={score}
            difficultyLevels={difficultyLevels}
            setSelectedTopic={setSelectedTopic}
            setSelectedDifficulty={setSelectedDifficulty}
            handleGenerateQuiz={handleGenerateQuiz}
            handleAnswerSelect={handleAnswerSelect}
            handleNextQuestion={handleNextQuestion}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen
            userName={userName}
            userLevel={userLevel}
            userXP={userXP}
            dailyStreak={dailyStreak}
            totalStories={totalStories}
            achievements={achievements}
            setShowEditProfile={setShowEditProfile}
            setShowNotifications={setShowNotifications}
            setShowAchievements={setShowAchievements}
          />
        )}
        <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

        {showEditProfile && (
          <EditProfileModal
            userName={userName}
            setUserName={setUserName}
            setShowEditProfile={setShowEditProfile}
          />
        )}

        {showNotifications && (
          <NotificationsModal
            notificationSettings={notificationSettings}
            setNotificationSettings={setNotificationSettings}
            setShowNotifications={setShowNotifications}
          />
        )}

        {showQuizResults && (
          <QuizResultsModal
            score={score}
            totalQuestions={quizQuestions.length}
            selectedDifficulty={selectedDifficulty}
            difficultyLevels={difficultyLevels}
            handleRestartQuiz={handleRestartQuiz}
            setShowQuizResults={setShowQuizResults}
            setCurrentScreen={setCurrentScreen}
          />
        )}

        {showAchievements && (
          <AchievementsModal
            achievements={achievements}
            setShowAchievements={setShowAchievements}
          />
        )}
      </div>
    </div>
  );
};

export default App;

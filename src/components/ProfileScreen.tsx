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
          <p className="text-indigo-100 te

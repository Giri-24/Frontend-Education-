import React from 'react';
import { X, Check } from 'lucide-react';
import { NotificationSettings } from '../../types';

interface NotificationsModalProps {
  notificationSettings: NotificationSettings;
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notificationSettings,
  setNotificationSettings,
  setShowNotifications
}) => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Notifications</h2>
          <button 
            onClick={() => setShowNotifications(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { key: 'dailyReminders', label: 'Daily Reminders', desc: 'Get reminded to practice daily' },
            { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Notify when you earn badges' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Summary of your progress' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{setting.label}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{setting.desc}</p>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({
                  ...prev,
                  [setting.key]: !prev[setting.key as keyof typeof prev]
                }))}
                className={`ml-3 w-12 h-6 rounded-full transition-all ${
                  notificationSettings[setting.key as keyof typeof notificationSettings]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  notificationSettings[setting.key as keyof typeof notificationSettings]
                    ? 'translate-x-6'
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              setShowNotifications(false);
              alert('Notification settings saved!');
            }}
            className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Save Settings
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;

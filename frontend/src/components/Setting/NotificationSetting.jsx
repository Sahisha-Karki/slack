import React, { useState } from 'react';
import '../../Styles/Setting/NotificationSettings.css';
import ToggleButton from './ToggleButton'; // Import the ToggleButton component

const NotificationSettings = () => {
    const [settings, setSettings] = useState({
      desktopNotifications: true,
      unreadBadge: false,
      notifyAbout: 'all',
      notifySessionStart: true,
      notifyReplies: false,
      muteAllSounds: false,
      sounds: {
        messages: true,
        sessions: true,
        joinSession: true,
        disconnected: true,
        mute: true
      },
      emailNotifications: 'never'
    });
  
    const [notificationSchedule, setNotificationSchedule] = useState({
      allowDays: 'Everyday',
      startTime: '08:00 AM',
      endTime: '08:00 PM',
      reminderTime: '09:00 AM',
      customSchedule: {
        Monday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Tuesday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Wednesday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Thursday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Friday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Saturday: { startTime: '08:00 AM', endTime: '08:00 PM' },
        Sunday: { startTime: '08:00 AM', endTime: '08:00 PM' }
      }
    });
  
    const handleToggle = (key) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };
  
    const handleSoundToggle = (key) => {
      setSettings(prev => ({
        ...prev,
        sounds: { ...prev.sounds, [key]: !prev.sounds[key] }
      }));
    };
  
    const handleScheduleChange = (field, value) => {
      setNotificationSchedule(prev => ({ ...prev, [field]: value }));
    };

    const handleCustomScheduleChange = (day, field, value) => {
      setNotificationSchedule(prev => ({
        ...prev,
        customSchedule: {
          ...prev.customSchedule,
          [day]: { ...prev.customSchedule[day], [field]: value }
        }
      }));
    };

    const handleDayChange = (day) => {
      setNotificationSchedule(prev => ({
        ...prev,
        customDays: { ...prev.customDays, [day]: !prev.customDays[day] }
      }));
    };

    const generateTimeOptions = () => {
      const times = [];
      for (let i = 0; i < 24; i++) {
        const hour = i % 12 || 12;
        const period = i < 12 ? 'AM' : 'PM';
        times.push(`${hour}:00 ${period}`);
        times.push(`${hour}:30 ${period}`);
      }
      return times.map(time => (
        <option key={time} value={time}>{time}</option>
      ));
    };

    return (
        <div className="notification-settings">
            {/* Desktop Notifications */}
            <div className="setting-card">
                <div className="setting-header">
                    <h3>Enable Desktop Notifications</h3>
                    <ToggleButton 
                        isOn={settings.desktopNotifications} 
                        onClick={() => handleToggle('desktopNotifications')}
                    />
                </div>
                <p className="setting-description">
                    If you're looking for per-channel or per-member notifications, right-click on the desired icon and select Notification settings.
                </p>
            </div>

            {/* Unread Message Badge */}
            <div className="setting-card">
                <div className="setting-header">
                    <h3>Enable Unread Message Badge</h3>
                    <ToggleButton 
                        isOn={settings.unreadBadge} 
                        onClick={() => handleToggle('unreadBadge')}
                    />
                </div>
                <p className="setting-description">
                    Show a highlighted color on the channels or DMs icon when you have unread messages.
                </p>
            </div>

            {/* Notify Me About */}
            <div className="setting-card">
                <h3>Notify me about</h3>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            checked={settings.notifyAbout === 'all'}
                            onChange={() => setSettings(prev => ({ ...prev, notifyAbout: 'all' }))}
                        />
                        All new messages
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={settings.notifyAbout === 'direct'}
                            onChange={() => setSettings(prev => ({ ...prev, notifyAbout: 'direct' }))}
                        />
                        Direct messages & Mentions
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={settings.notifyAbout === 'nothing'}
                            onChange={() => setSettings(prev => ({ ...prev, notifyAbout: 'nothing' }))}
                        />
                        Nothing
                    </label>
                </div>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={settings.notifySessionStart}
                        onChange={() => handleToggle('notifySessionStart')}
                    />
                    Notify me when a session starts in one of my channels
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={settings.notifyReplies}
                        onChange={() => handleToggle('notifyReplies')}
                    />
                    Notify me about replies and replies in threads I'm following
                </label>
            </div>

            {/* Notification Schedule */}
            <div className="setting-card">
                <h3>Notification schedule</h3>
                <p className="setting-description">
                    You only receive notifications in the hours you choose. Outside of those times,
                    notifications will be paused. <a href="#" className="learn-more">Learn more</a>
                </p>
                
                <h4>Allow notifications on</h4>
                <div className="schedule-selectors">
                    <select 
                        value={notificationSchedule.allowDays} 
                        onChange={(e) => handleScheduleChange('allowDays', e.target.value)}
                    >
                        <option>Everyday</option>
                        <option>Weekly</option>
                        <option>Custom</option>
                    </select>
                    
                    {notificationSchedule.allowDays === 'Custom' && (
                        <div className="custom-schedule">
                            {Object.keys(notificationSchedule.customSchedule).map(day => (
                                <div key={day} className="custom-day">
                                    <span>{day}</span>
                                    <select
                                        value={notificationSchedule.customSchedule[day].startTime}
                                        onChange={(e) => handleCustomScheduleChange(day, 'startTime', e.target.value)}
                                    >
                                        {generateTimeOptions()}
                                    </select>
                                    <span class='to'>to</span>
                                    <select
                                        value={notificationSchedule.customSchedule[day].endTime}
                                        onChange={(e) => handleCustomScheduleChange(day, 'endTime', e.target.value)}
                                    >
                                        {generateTimeOptions()}
                                    </select>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {notificationSchedule.allowDays !== 'Custom' && (
                        <div className="schedule-content">
                            <div className="time-range">
                                <span>From:</span>
                                <select
                                    value={notificationSchedule.startTime}
                                    onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                                >
                                    {generateTimeOptions()}
                                </select>
                                <span>To:</span>
                                <select
                                    value={notificationSchedule.endTime}
                                    onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                                >
                                    {generateTimeOptions()}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
                <div id="remind">
                <h4>Set a default time for reminder notifications:</h4>
                <select 
                    value={notificationSchedule.reminderTime} 
                    onChange={(e) => handleScheduleChange('reminderTime', e.target.value)}
                >
                    {generateTimeOptions()}
                </select>
                </div>
                <p className="setting-description">
                    Reminders you set for a specific day, like "Tomorrow," will be sent at the time you select.
                </p>
            </div>

            {/* Notification Sounds */}
            <div className="setting-card">
                <h3>Notification sounds</h3>
                <p className="setting-description">Choose how notifications sound and behave.</p>
                
                <div className="sound-settings">
                    <div className="sound-setting-item">
                        <span>Mute all sounds from Slack</span>
                        <ToggleButton 
                            isOn={settings.muteAllSounds} 
                            onClick={() => handleToggle('muteAllSounds')}
                        />
                    </div>
                    {Object.entries(settings.sounds).map(([key, value]) => (
                        <div key={key} className="sound-setting-item">
                            <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                            <ToggleButton 
                                isOn={value} 
                                onClick={() => handleSoundToggle(key)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Email Notifications */}
            <div className="setting-card">
                <h3>Email Notifications</h3>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            checked={settings.emailNotifications === 'never'}
                            onChange={() => setSettings(prev => ({ ...prev, emailNotifications: 'never' }))}
                        />
                        Never
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={settings.emailNotifications === 'daily'}
                            onChange={() => setSettings(prev => ({ ...prev, emailNotifications: 'daily' }))}
                        />
                        Daily
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={settings.emailNotifications === 'weekly'}
                            onChange={() => setSettings(prev => ({ ...prev, emailNotifications: 'weekly' }))}
                        />
                        Weekly
                    </label>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;

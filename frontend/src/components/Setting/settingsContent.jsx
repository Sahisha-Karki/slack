import React from 'react';
import '../../../src/Styles/Setting/settingsContent.css';
import ProfileSection from './ProfileSection';
import PasswordChange from './PasswordChangeForm ';
import TwoFactorAuth from './twoFactorAuth';
import LanguageSelection from './language';
import TimeZoneSettings from './timeZone';
import AccessibilitySettings from './AccessibilitySettings';
import ThemesContent from './theme';
import MessagesMedia from './messageMedia';
import LanguageAndRegionSettings from './language_region';
import PrivacyAndSafetySettings from './privacy';
import AdvancedSettings from './AdvancedSettings';
import NotificationSettings from './NotificationSetting';
import AudioVideoSettings from './AudioVideoSettings';
import '@fortawesome/fontawesome-free/css/all.min.css';

function SettingsContent({ section }) {

  const renderContent = () => {
    if (section === 'Account') {
      return (
        <>
          <ProfileSection />
          <PasswordChange />
          <TwoFactorAuth />
          <LanguageSelection />
          <TimeZoneSettings />


<div className="sign-out-section">
  <h3>Sign out from all the Devices Logged In</h3>
  <p>Lost your device? Left yourself logged in on a public computer? Need a way to sign out everywhere except your current browser? This is for you.</p>
  <button className="sign-out-button">
    <i className="fas fa-sign-out-alt"></i> Sign out all other sessions
  </button>
</div>

<div className="settings-box">
  <h3>Deactivate account</h3>
  <p>If you no longer need your account on the Your Company workspace, you can deactivate your account. Any other Slack Workspaces you belong to will not be affected.</p>
  <button className="deactivate-button">
    <i className="fas fa-user-slash"></i> Deactivate your account
  </button>
</div>

        </>
      );
    }
    return <p>Select a section to view settings</p>;
  };

  if (section === 'Accessibility') {
    return <AccessibilitySettings />;
  }
  
  if (section === 'Themes') {
    return <ThemesContent />;
  }

  if (section === 'Messages & media') {
    return <MessagesMedia />;
  }

  if (section === 'Language & Region') {
    return <LanguageAndRegionSettings />;
  }

  if (section === 'Privacy & Safety') {
    return <PrivacyAndSafetySettings />;
  }

  if (section === 'Notifications') {
    return <NotificationSettings />;
  }

  if (section === 'Audio & Video') {
    return <AudioVideoSettings />;
  }

  if (section === 'Advanced') {
    return <AdvancedSettings />; // Render the AdvancedSettings component
  }

  return (
    <div className="settings-content">
      {renderContent()}
    </div>
  );
}

export default SettingsContent;

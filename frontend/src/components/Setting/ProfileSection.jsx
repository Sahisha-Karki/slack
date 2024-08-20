import React, { useState } from 'react';
import '../../../src/Styles/Setting/ProfileSection.css';
import { FaChevronUp } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Developer',
    username: 'John doe',
    displayname:'John',
    email: 'johndoe@gmail.com',
    phoneNumber: '+977-9123456780',
    profilePicture: 'path_to_profile_image.jpg'  // Add initial profile picture path
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePicture: imageUrl });
    }
  };

  const handleSave = () => {
    alert('Profile saved!');
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleStartRecording = async () => {
    console.log('Start Recording clicked'); // Debugging statement
  
    try {
      // Request audio stream from the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted'); // Debugging statement
  
      const newMediaRecorder = new MediaRecorder(stream);
  
      newMediaRecorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };
  
      newMediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioChunks([]); // Reset chunks
      };
  
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
      console.log('Recording started'); // Debugging statement
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Failed to access microphone. Please check permissions and device availability.');
    }
  };

  const handleStopRecording = () => {
    console.log('Stop Recording clicked'); // Debugging statement

    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      console.log('Recording stopped'); // Debugging statement
    } else {
      console.log('No active recorder'); // Debugging statement
    }
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  return (
    <div className="settings-profile-section">
      <div className="settings-profile-header">
        <h2>Profile</h2>
        <button 
          className={`settings-profile-edit-button ${isEditing ? 'settings-profile-edit-button-hidden' : ''}`} 
          onClick={handleEdit}
        >
          {isEditing ? <FaChevronUp className="settings-profile-edit-icon rotate" /> : 'Edit'}
        </button>
      </div>
      {isEditing && (
        <div className="settings-profile-edit">
          <div className="settings-profile-image-container">
            <input
              type="file"
              accept="image/*"
              id="profilePictureUpload"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="profilePictureUpload">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="settings-profile-image"
              />
            </label>
            <div className="settings-profile-name-role">
              <h3>{profile.name}</h3>
              <p>{profile.title}</p>
            </div>
          </div>
          <div className="settings-profile-fields">
            <label>Username</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
            <label>Email</label>
            <div className="settings-profile-input-container">
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>
            <label>Display Name</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="displayname"
                value={profile.displayname}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>

            <label>Name recording</label>
            <div className="settings-profile-input-container">
              <button 
                className="settings-profile-voice-button" 
                onClick={handleVoiceButtonClick}
              >
                <FontAwesomeIcon className="settings-profile-microphone" icon={faMicrophone} />
                {isRecording ? 'Stop Recording' : 'Record audio clip'}
              </button>
              {audioUrl && (
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>

            <label>Title</label>
            <div className="settings-profile-input-container">
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>

            <label>Phone Number</label>
            <div className="settings-profile-input-container">
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />
              <span className="settings-profile-edit-icon">✎</span>
            </div>

            <label>Joined Date</label>
            <div className="settings-profile-input-container">
              <input
                type="date"
                name="date"
                value={profile.date || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="settings-profile-save-button" onClick={handleSave}>Save</button>
          <button className="settings-profile-cancel-button" onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;

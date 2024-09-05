import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faTrash, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../../../Styles/MessageInput/Icon/VoiceRecorder.css';

const VoiceRecorder = ({ onAudioInsert }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [audioDuration, setAudioDuration] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);

      const chunks = [];
      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        clearInterval(timerRef.current);
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioURL(url);

        const audio = new Audio(url);
        audio.onloadedmetadata = () => {
          const duration = formatTime(audio.duration);
          setAudioDuration(duration);
        };

        if (onAudioInsert) {
          onAudioInsert(url);
        }
      };
    });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleDelete = () => {
    setAudioBlob(null);
    setAudioURL('');
    setAudioDuration('');
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='container'>
      {!audioBlob ? (
        <div className='recordContainer'>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className='recordButton'
          >
            {isRecording ? (
              <FontAwesomeIcon icon={faStop} />
            ) : (
              <FontAwesomeIcon icon={faMicrophone} />
            )}
          </button>
          <div className='timeIndicator'>
            {isRecording && `Recording... ${formatTime(recordingTime)}`}
          </div>
        </div>
      ) : (
        <div className='audioContainer'>
          <audio controls src={audioURL} className='audioElement' />
          <div className='duration'>{audioDuration}</div>
          <button onClick={handleDelete} className='deleteButton'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
import React, { useEffect, useState } from 'react';
import './NoInternetPage.css';
import TicTacToe from './TicTacToe';

const NoInternetPage = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOffline(false);
    }
  };

  const handleShowGame = () => {
    setShowGame(true);
  };

  if (!isOffline) return null;

  return (
    <div className="no-internet-container">
      <div className="no-internet-content">
      <img src="./images/no-internet.png" alt="No Internet Connection" className="no-internet-img" />
        <h1 className='no-internet-h1' >Whoops! Looks like you lost your connection.</h1>
        <p className='no-internet-p' >No worries, try reconnecting or enjoy a quick game while you wait!</p>
        {!showGame ? (
          <>
            <button onClick={handleShowGame} className="fun-button">
              Let's Play
            </button>
            <button onClick={handleRetry} className="retry-button">
              Retry
            </button>
          </>
        ) : (
          <>
            <h2 className='no-internet-h2'>Game On! 🎉</h2>
            <TicTacToe />
            <button onClick={handleRetry} className="retry-button">
              Retry Connection
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoInternetPage;

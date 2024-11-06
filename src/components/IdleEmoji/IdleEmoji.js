import React, { useState, useEffect } from 'react';
import './IdleEmoji.css';
import meowSound from '../../Assets/sounds/meow.mp3';

function IdleEmoji() {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [audio] = useState(new Audio(meowSound));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 30000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const handleClick = () => {
    setClicked(true);
    
    try {
      audio.currentTime = 0; // Reset audio to start
      audio.play()
        .then(() => {
          setTimeout(() => {
            sessionStorage.setItem('fromCatEmoji', 'true');
            window.open('/secrets', '_blank');
          }, 300); // Increased delay to ensure meow plays
        })
        .catch(error => {
          console.log("Audio play failed:", error);
          sessionStorage.setItem('fromCatEmoji', 'true');
          window.open('/secrets', '_blank');
        });
    } catch (error) {
      console.log("Audio play failed:", error);
      sessionStorage.setItem('fromCatEmoji', 'true');
      window.open('/secrets', '_blank');
    }
  };

  return (
    <div 
      className={`idle-emoji ${show ? 'show' : ''} ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label="Easter egg"
    >
      🐈
    </div>
  );
}

export default IdleEmoji; 
import React, { useState, useEffect, useCallback } from "react";
import "./IdleEmoji.css";
import meowSound from "../../Assets/sounds/meow.mp3";

interface AudioState {
  audio: HTMLAudioElement | null;
  isLoaded: boolean;
}

const IdleEmoji: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [audioState, setAudioState] = useState<AudioState>({
    audio: null,
    isLoaded: false,
  });

  // Initialize audio with proper error handling
  useEffect(() => {
    const audioElement = new Audio(meowSound);
    
    audioElement.addEventListener("canplaythrough", () => {
      setAudioState({
        audio: audioElement,
        isLoaded: true,
      });
    });

    audioElement.addEventListener("error", (e) => {
      console.error("Audio loading error:", e);
      setAudioState((prev) => ({ ...prev, isLoaded: false }));
    });

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
        audioElement.remove();
      }
    };
  }, []);

  // Show emoji after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = useCallback(async () => {
    setClicked(true);

    try {
      if (!audioState.audio || !audioState.isLoaded) {
        throw new Error("Audio not properly initialized");
      }

      audioState.audio.currentTime = 0;
      await audioState.audio.play();
      
      // Wait for meow sound before proceeding
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      sessionStorage.setItem("fromCatEmoji", "true");
      window.open("/secrets", "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Easter egg activation failed:", error);
      // Fallback behavior - proceed without sound
      sessionStorage.setItem("fromCatEmoji", "true");
      window.open("/secrets", "_blank", "noopener,noreferrer");
    }
  }, [audioState]);

  return (
    <div
      className={`idle-emoji ${show ? "show" : ""} ${clicked ? "clicked" : ""}`}
      onClick={handleClick}
      role="button"
      aria-label="Easter egg"
      onKeyPress={(e) => e.key === "Enter" && handleClick()}
      tabIndex={0}
    >
      🐈
    </div>
  );
};

export default IdleEmoji; 
'use client'
import { useState, useEffect, useRef } from 'react';

interface TimerProps {
  isRecording: boolean;
  stopRecording: () => void;
}

const Timer = ({ isRecording, stopRecording }: TimerProps) => {
  const [displayTime, setDisplayTime] = useState<string>('4:59');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    if (isRecording) {
      // Set end time to 5 minutes from now
      const now = new Date();
      endTimeRef.current = new Date(now.getTime() + (5 * 60 * 1000) -1);
      
      // Clear any existing interval
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      // Update timer immediately
      updateTimer();
      
      // Set up interval
      intervalRef.current = setInterval(updateTimer, 1000);
    } else {
      // Reset timer when not recording
      setDisplayTime('4:59');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      endTimeRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const updateTimer = () => {
    if (!endTimeRef.current) return;
    
    const now = new Date();
    const diff = endTimeRef.current.getTime() - now.getTime();
    
    if (diff <= 0) {
      // Time's up
      setDisplayTime('0:00');
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopRecording();
      return;
    }
    
    // Calculate minutes and seconds
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format display
    setDisplayTime(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
  };

  return <div>{displayTime}</div>;
};

export default Timer;
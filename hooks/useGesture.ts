
import { useState, useEffect, useCallback } from 'react';
import { Gesture } from '../types';

export const useGesture = (onGesture: (gesture: Gesture) => void) => {
  const [lastGesture, setLastGesture] = useState<Gesture>('NONE');

  const handleGesture = useCallback((gesture: Gesture) => {
    setLastGesture(gesture);
    onGesture(gesture);
    // Auto-clear gesture visual feedback after a brief moment
    setTimeout(() => setLastGesture('NONE'), 800);
  }, [onGesture]);

  useEffect(() => {
    // 1. KEYBOARD FALLBACK (For testing)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'n') handleGesture('NEXT');
      if (e.key === 'Enter' || e.key === 's') handleGesture('SELECT');
      if (e.key === 'Escape' || e.key === 'b') handleGesture('STOP');
    };

    window.addEventListener('keydown', handleKeyDown);

    // 2. WEBSOCKET CONNECTION (Example)
    /*
    const ws = new WebSocket('ws://localhost:8000/gestures');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (['NEXT', 'SELECT', 'STOP'].includes(data.gesture)) {
        handleGesture(data.gesture);
      }
    };
    */

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // ws.close();
    };
  }, [handleGesture]);

  return { lastGesture, triggerMock: handleGesture };
};

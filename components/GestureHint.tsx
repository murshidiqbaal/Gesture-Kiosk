
import React from 'react';
import { Gesture } from '../types';

interface GestureHintProps {
  activeGesture: Gesture;
}

export const GestureHint: React.FC<GestureHintProps> = ({ activeGesture }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-8 px-16 flex justify-between items-center z-50 pointer-events-none">
      <div className="flex items-center gap-4 transition-all duration-500">
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl transition-all duration-300 ${activeGesture === 'STOP' ? 'bg-white text-black border-white scale-110' : 'bg-transparent border-white/10 text-white/30'}`}>
          ✋
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeGesture === 'STOP' ? 'text-white' : 'text-white/20'}`}>Back</span>
          <span className={`text-[9px] font-light tracking-[0.1em] transition-colors ${activeGesture === 'STOP' ? 'text-white/60' : 'text-white/10'}`}>Gesture STOP</span>
        </div>
      </div>

      <div className="flex items-center gap-4 transition-all duration-500">
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl transition-all duration-300 ${activeGesture === 'SELECT' ? 'bg-white text-black border-white scale-110' : 'bg-transparent border-white/10 text-white/30'}`}>
          👌
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeGesture === 'SELECT' ? 'text-white' : 'text-white/20'}`}>Confirm</span>
          <span className={`text-[9px] font-light tracking-[0.1em] transition-colors ${activeGesture === 'SELECT' ? 'text-white/60' : 'text-white/10'}`}>Gesture SELECT</span>
        </div>
      </div>

      <div className="flex items-center gap-4 transition-all duration-500">
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-xl transition-all duration-300 ${activeGesture === 'NEXT' ? 'bg-white text-black border-white scale-110' : 'bg-transparent border-white/10 text-white/30'}`}>
          👉
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${activeGesture === 'NEXT' ? 'text-white' : 'text-white/20'}`}>Navigate</span>
          <span className={`text-[9px] font-light tracking-[0.1em] transition-colors ${activeGesture === 'NEXT' ? 'text-white/60' : 'text-white/10'}`}>Gesture NEXT</span>
        </div>
      </div>
    </div>
  );
};

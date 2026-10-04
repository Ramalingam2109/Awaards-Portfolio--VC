import React, { useState, useEffect } from 'react';
import { ArrowUp, FileSpreadsheet } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface Props {
  onOpenExcelManager: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenExcelManager }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-white/10 bg-[#08080a] relative text-white/50 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Chennai, India • {time ? time + ' IST' : 'Local Time'}</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenExcelManager();
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="flex items-center gap-1.5 text-lime-400 hover:text-lime-300 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel Synced Portfolio</span>
          </button>
          <span>•</span>
          <span>Designed & Engineered for Ramalingam</span>
        </div>

        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundFX.playHover()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all group"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};

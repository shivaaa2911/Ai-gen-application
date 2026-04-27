import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Radio, Activity, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "CONVERGENCE_01",
    artist: "NEURAL_SYNTH",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "bg-[#00f2ff]"
  },
  {
    id: 2,
    title: "CYBER_PULSE_99",
    artist: "NEON_VIVID",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "bg-[#ff00ff]"
  },
  {
    id: 3,
    title: "VAPOR_STATIC",
    artist: "VCR_COLLECTIVE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "bg-white"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const skip = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-72 p-4 bg-black border-2 border-[#ff00ff] shadow-[0_0_20px_#ff00ff22] flex flex-col gap-4 relative">
      <div className="absolute inset-0 noise-bg opacity-10 pointer-events-none" />
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={() => skip('next')}
      />
      
      {/* Header Stat */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[#ff00ff] uppercase tracking-widest border-b border-[#ff00ff33] pb-2">
         <span className="flex items-center gap-2"><Radio className="w-3 h-3" /> AUDIO_LINK: OK</span>
         <span className="animate-pulse">STREAMING...</span>
      </div>

      {/* Visualizer Block */}
      <div className="h-40 bg-zinc-900 border border-[#ff00ff33] flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#ff00ff]/5 group-hover:bg-[#ff00ff]/10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="z-10 flex flex-col items-center"
          >
             <Music className="w-12 h-12 text-[#ff00ff] mb-2" />
             <div className="flex gap-1 h-8 items-end">
                {[1,2,3,4,5,6].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: isPlaying ? [4, 24, 8, 32, 12] : 4 }}
                    transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                    className={`w-2 ${currentTrack.color} opacity-80`}
                  />
                ))}
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Meta */}
      <div className="font-mono space-y-1">
        <h3 className="text-lg font-black text-[#ff00ff] leading-none tracking-tighter uppercase italic glitch-text">
          {currentTrack.title}
        </h3>
        <p className="text-[10px] text-[#00f2ff] tracking-[0.2em] font-bold">
          &gt; BY: {currentTrack.artist}
        </p>
      </div>

      {/* Progress Bar (Blocky) */}
      <div className="space-y-1">
        <div className="h-4 w-full bg-zinc-900 border border-[#ff00ff33] p-0.5">
          <motion.div 
            className={`h-full ${currentTrack.color} opacity-60`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[8px] font-mono text-[#00f2ff]/60 tracking-widest uppercase">
          <span>{Math.floor(progress).toString().padStart(3, '0')}%</span>
          <span>SYS_AUDIO_LEN: 225S</span>
        </div>
      </div>

      {/* Controls (Brutalist) */}
      <div className="flex justify-between items-center bg-zinc-950 p-2 border border-[#ff00ff33]">
        <button onClick={() => skip('prev')} className="p-2 text-[#00f2ff] hover:bg-[#00f2ff]/10 transition-colors">
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        
        <button 
          onClick={togglePlay}
          className={`px-6 py-2 border-2 ${isPlaying ? 'bg-[#ff00ff] text-black border-[#ff00ff]' : 'border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/10'} font-black italic tracking-widest transition-all`}
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>

        <button onClick={() => skip('next')} className="p-2 text-[#00f2ff] hover:bg-[#00f2ff]/10 transition-colors">
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Footer Details */}
      <div className="flex justify-between items-center text-[8px] font-mono text-[#ff00ff]/30 uppercase tracking-[0.3em]">
         <div className="flex items-center gap-1"><Activity className="w-3 h-3" /> BUFFER_SYNC</div>
         <span>LOAD_ID: 0xFD9</span>
      </div>
    </div>
  );
}

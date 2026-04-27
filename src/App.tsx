import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Database, ShieldAlert, Cpu, Network } from 'lucide-react';

export default function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-black selection:bg-[#ff00ff] selection:text-black">
      {/* Glitch Infrastructure */}
      <div className="crt-overlay" />
      <div className="scanline" />
      <div className="noise-bg" />
      <div className="fixed inset-0 grid-bg-retro pointer-events-none opacity-20" />
      
      {/* HUD Frame Elements (Cryptic UI) */}
      <div className="fixed inset-0 p-8 flex flex-col justify-between pointer-events-none z-40 font-mono">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-[#ff00ff]">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-black tracking-[0.2em] glitch-text italic">UNAUTHORIZED_ACCESS_DETECTED</span>
            </div>
            <div className="text-[10px] text-[#00f2ff] opacity-40 tracking-[0.3em]">
              ADDR: 192.168.0.X | PORT: 8080 | PROTOCOL: AIS_V3
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 px-3 py-1 border border-[#00f2ff] bg-[#00f2ff]/5 text-[#00f2ff] text-[10px] font-bold tracking-widest">
              <Network className="w-3 h-3" /> UPLINK_ESTABLISHED
            </div>
            <div className="text-[8px] text-[#ff00ff] opacity-30 tracking-[0.4em] uppercase">
              Sig_Strength: 0x4F2A
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-4">
             <div className="flex items-center gap-4 group">
                <div className="w-2 h-12 bg-[#00f2ff] opacity-20 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-1">
                   <div className="text-[10px] text-[#00f2ff] opacity-60 flex items-center gap-2">
                      <Cpu className="w-3 h-3" /> SYS_CORE_LOAD
                   </div>
                   <div className="w-32 h-1 bg-zinc-900 overflow-hidden">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full bg-[#ff00ff]/40" 
                      />
                   </div>
                </div>
             </div>
             <div className="text-[8px] text-[#00f2ff]/20 tracking-[0.6em] rotate-90 origin-bottom-left absolute bottom-32 left-8">
               RE_FUTURISM_EXTRACTED
             </div>
          </div>

          <div className="text-right space-y-1">
             <div className="text-xs text-[#ff00ff] font-bold glitch-text">AIS_BUILD_TERMINAL</div>
             <div className="text-[10px] text-[#00f2ff]/40 tracking-widest uppercase">
               (C) 2026_NEURAL_OPERATOR
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-50 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Decorative Grid Marker */}
        <div className="hidden 2xl:block absolute -left-40 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[#00f2ff]/10 text-9xl font-black pointer-events-none">
          SYSTEM_01
        </div>

        {/* Music Player: Left Wing */}
        <motion.div
          initial={{ x: -100, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 lg:order-1 relative"
        >
          {/* Subtle glow behind */}
          <div className="absolute -inset-4 bg-[#ff00ff]/5 blur-3xl rounded-full" />
          <div className="relative group cursor-crosshair">
            <div className="absolute -inset-1 border border-[#ff00ff]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MusicPlayer />
          </div>
        </motion.div>

        {/* Snake Game: Central Core */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 1.05 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="order-1 lg:order-2 relative"
        >
          <div className="absolute -inset-20 bg-[#00f2ff]/3 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative group cursor-none">
            <div className="absolute -inset-4 border-2 border-[#00f2ff]/10 pointer-events-none group-hover:border-[#00f2ff]/30 transition-all duration-500 scale-110 group-hover:scale-100" />
            <div className="absolute -inset-8 border border-[#ff00ff]/5 pointer-events-none group-hover:border-[#ff00ff]/20 transition-all duration-700 scale-90 group-hover:scale-100" />
            <SnakeGame />
          </div>
        </motion.div>

        {/* Console Log: Right Wing */}
        <motion.div
           initial={{ x: 100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
           className="hidden xl:flex flex-col gap-6 w-64 order-3 font-mono"
        >
           <div className="space-y-4 bg-zinc-950 p-4 border border-[#ff00ff]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff00ff]" />
              <h4 className="text-[10px] text-[#ff00ff] font-black tracking-widest flex items-center gap-2">
                 <Terminal className="w-3 h-3" /> CONSOLE_LOG.BIN
              </h4>
              <div className="space-y-3 text-[9px] text-[#00f2ff]/60 uppercase leading-none">
                 <p className="flex justify-between"><span>&gt; BOOT_INIT:</span> <span className="text-green-500">COMPLETE</span></p>
                 <p className="flex justify-between"><span>&gt; MEM_SYNC:</span> <span className="text-green-500">OK</span></p>
                 <p className="flex justify-between"><span>&gt; AUDIO_DRV:</span> <span className="text-yellow-500">PATCHED</span></p>
                 <p className="flex justify-between"><span>&gt; AI_NEURAL:</span> <span className="text-blue-500">READY</span></p>
                 <div className="h-px bg-white/5 my-2" />
                 <p className="text-[8px] opacity-40 leading-tight">
                   SYS_WARN: UNSTABLE_GRID_DETECTED. PROCEED_WITH_CAUTION.
                 </p>
              </div>
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-2 bg-[#ff00ff]/10"
              />
           </div>

           <div className="bg-[#00f2ff]/5 p-4 border border-[#00f2ff]/20 flex items-center gap-4">
              <Database className="w-6 h-6 text-[#00f2ff]" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-[#00f2ff] tracking-tighter">DATAHUB_ACCESS</span>
                 <span className="text-[8px] text-[#00f2ff]/40">UID: AES_256_ACTIVE</span>
              </div>
           </div>
        </motion.div>
      </main>

      {/* Global Background Elements */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#00f2ff]/20 tracking-[1em] uppercase pointer-events-none uppercase">
        &gt;&gt; Neural Rhythm Intersect &lt;&lt;
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Radio, Fingerprint } from 'lucide-react';
import { useScifiSound } from '@/hooks/useScifiSound';

const BOOT_LOGS = [
  "bios: checking memory... OK",
  "kernel: arch_init... OK",
  "drives: mounting talos_fs... OK",
  "net: link_up | 1000Gbps | encrypted",
  "security: verifying signature... TRUSTED",
  "user: auth_token detected...",
  "system: starting visual interface..."
];

export default function BootSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const { playClick, playConfirm, playHover } = useScifiSound();

  useEffect(() => {
    // Check if we've already booted in this session
    const hasBooted = sessionStorage.getItem('talos_boot_complete');
    if (hasBooted) {
      setIsVisible(false);
      return;
    }

    let isMounted = true;

    const runBootSequence = async () => {
      // 1. Progress Bar starts
      const timer = setInterval(() => {
         if (!isMounted) return;
         setProgress(prev => {
           if (prev >= 100) {
             clearInterval(timer);
             return 100;
           }
           // Random increments for realism
           return Math.min(prev + Math.random() * 15, 100);
         });
      }, 150);

      // 2. Logs typing effect
      for (let i = 0; i < BOOT_LOGS.length; i++) {
        if (!isMounted) break;
        await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
        setLogs(prev => [...prev, BOOT_LOGS[i]]);
        playClick(); // simulated typo sound / disk tick
      }
      
      // 3. Wait a bit at 100%
      await new Promise(r => setTimeout(r, 600));
      
      if (isMounted) {
          playConfirm();
          // Finish
          sessionStorage.setItem('talos_boot_complete', 'true');
          // Add a small exit delay for the fade out animation
          setTimeout(() => setIsVisible(false), 500);
      }
    };

    runBootSequence();

    return () => { isMounted = false; };
  }, [playClick, playConfirm]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-talos-yellow font-mono p-6 overflow-hidden select-none"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 grid-bg opacity-20"></div>

          <div className="max-w-xl w-full relative z-10">
             {/* Header Info */}
             <div className="flex justify-between items-end border-b border-talos-yellow/30 pb-2 mb-8">
                 <div className="flex flex-col">
                     <span className="text-xs text-gray-500">BOOT_LOADER v2.4.1</span>
                     <span className="text-xl font-bold tracking-widest">TALOS // OS</span>
                 </div>
                 <div className="flex gap-4 text-xs">
                     <div className="flex items-center gap-1 opacity-50"><Cpu size={14}/> 128 CORE</div>
                     <div className="flex items-center gap-1 opacity-50"><Radio size={14}/> ONLINE</div>
                 </div>
             </div>

             {/* Center Logo */}
             <div className="flex justify-center mb-12 relative">
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 flex items-center justify-center opacity-10"
                >
                    <div className="w-64 h-64 border border-dashed border-talos-yellow rounded-full"></div>
                </motion.div>
                <div className="flex flex-col items-center gap-4">
                     <Fingerprint size={64} className="animate-pulse" />
                     <div className="text-sm tracking-[0.5em] text-center">BIOMETRIC SCANNING</div>
                </div>
             </div>

             {/* Progress Bar */}
             <div className="mb-8">
                <div className="flex justify-between text-xs mb-1">
                    <span>SYSTEM_CHECK</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-talos-yellow"
                      style={{ width: `${progress}%` }}
                    />
                </div>
             </div>

             {/* Console Logs */}
             <div className="h-40 font-mono text-xs text-talos-yellow/70 space-y-1 overflow-hidden flex flex-col justify-end">
                {logs.map((log, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="flex items-center gap-2"
                    >
                        <span>&gt;</span>
                        <span>{log}</span>
                    </motion.div>
                ))}
                <motion.div 
                   animate={{ opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="w-2 h-4 bg-talos-yellow"
                />
             </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full text-center text-[10px] text-gray-600">
             SECURE CONNECTION ESTABLISHED // ENCRYPTION: AES-4096
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

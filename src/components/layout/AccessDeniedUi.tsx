'use client';

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/TranslationContext";
import { useScifiSound } from "@/hooks/useScifiSound";
import Link from "next/link";

export default function AccessDeniedScreen() {
  const { t } = useTranslation();
  const { playDenied, playHover, playClick } = useScifiSound();

  useEffect(() => {
    // Play denied sound on mount
    const timer = setTimeout(() => {
        playDenied();
    }, 500);
    return () => clearTimeout(timer);
  }, [playDenied]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        {/* Background Pulse */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[500px] h-[500px] bg-red-900/10 rounded-full animate-pulse blur-3xl"></div>
        </div>

        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.3 }}
           className="scifi-box border-red-500/50 bg-black/80 p-12 text-center max-w-lg w-full relative group"
        >
            {/* Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>

            <div className="mb-6 flex justify-center text-red-500">
                <ShieldAlert size={80} strokeWidth={1} className="animate-pulse" />
            </div>

            <h1 className="text-3xl font-bold text-red-500 tracking-widest mb-2 font-mono">
                {t.access_denied.warning}
            </h1>
            
            <div className="w-full h-px bg-red-900/50 my-4"></div>

            <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed">
                {t.access_denied.message}
                <br/>
                <span className="text-red-800 text-xs mt-2 block">{t.access_denied.error_code}</span>
            </p>

            <Link href="/" onClick={playClick}>
                <button 
                  onMouseEnter={playHover}
                  className="px-8 py-3 border border-red-500/30 text-red-400 font-mono text-xs hover:bg-red-900/20 hover:text-white hover:border-red-500 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                    <ArrowLeft size={16} /> {t.access_denied.return}
                </button>
            </Link>
        </motion.div>

        {/* Diagonal Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-2 w-full animate-scan pointer-events-none"></div>
    </div>
  );
}

'use client';

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Hexagon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/TranslationContext";
import TerrainBackground from "@/components/visuals/TerrainBackground";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <TerrainBackground />
      {/* Central Hero Concept */}
      <div className="relative max-w-4xl w-full">
        
        {/* Floating Decoration Elements */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -top-20 -left-10 text-white/10 hidden md:block"
        >
             <Hexagon size={200} strokeWidth={0.5} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 scifi-box p-8 md:p-16 scifi-corner text-center overflow-hidden"
        >
          {/* Scanning Line Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-talos-yellow/20 shadow-[0_0_15px_rgba(255,215,0,0.5)] animate-scan"></div>
          
          <div className="font-mono text-talos-yellow text-sm mb-4 tracking-widest border border-talos-yellow/30 inline-block px-3 py-1 rounded-sm bg-talos-yellow/5">
            {t.home.system_notification}
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter uppercase">
            {t.home.welcome_title} <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">{t.home.talos_sector}</span>
          </h2>

          <p className="text-gray-400 font-mono max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
            {t.home.init_text_1} <br/>
            {t.home.init_text_2} <br/>
            {t.home.content_text}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/operatives" className="group relative px-6 py-3 bg-talos-yellow text-black font-bold font-mono uppercase text-sm hover:bg-white transition-colors duration-300 inline-block">
               <span className="absolute inset-0 border border-talos-yellow transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></span>
               <span className="flex items-center gap-2">
                 {t.home.enter_archives} <ArrowRight size={16} />
               </span>
            </Link>
            
            <button className="px-6 py-3 border border-white/20 text-white font-mono uppercase text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
               <Terminal size={16} />
               {t.home.system_logs}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid Numbers */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-8 font-mono text-[10px] text-white/20">
         <div>01</div>
         <div className="w-px h-16 bg-white/20 mx-auto"></div>
         <div>02</div>
         <div className="w-px h-16 bg-white/20 mx-auto"></div>
         <div>03</div>
      </div>
    </div>
  );
}

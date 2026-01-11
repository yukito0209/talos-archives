'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/TranslationContext";
import { Download, Mail, Copy, Check, Github, Linkedin, Box, Radio } from "lucide-react";

export default function LogisticsPage() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Email Copy Function
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("wjw20020209@outlook.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-12 pb-20 max-w-5xl mx-auto">
        
      {/* Header Section */}
      <div className="mb-16 border-l-4 border-talos-yellow pl-6 relative">
         <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            {t.logistics.title}
         </h1>
         <div className="font-mono text-talos-yellow/60 tracking-[0.2em] uppercase">
            // {t.logistics.subtitle}
         </div>
         {/* Decorative scanning line */}
         <div className="absolute top-0 right-0 w-32 h-1 bg-talos-yellow/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Col: Supply Drop (Resume) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="scifi-box p-8 relative flex flex-col items-center justify-center text-center gap-6 group"
        >
            <div className="absolute top-0 left-0 bg-talos-yellow text-black text-[10px] font-bold px-2 py-0.5 transform -translate-y-1/2 ml-4">
                SUPPLY_DROP_01
            </div>

            <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center group-hover:border-talos-yellow transition-colors duration-500 relative">
                <Box size={40} className="text-gray-400 group-hover:text-talos-yellow transition-colors" />
                <div className="absolute inset-0 border border-talos-yellow rounded-full scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.logistics.supply_drop}</h2>
                <div className="flex flex-col gap-3 mt-4 w-full md:w-64">
                    <button className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 hover:bg-talos-yellow hover:text-black hover:border-talos-yellow transition-all duration-300 group/btn">
                        <span className="font-mono text-xs font-bold">{t.logistics.download_zh}</span>
                        <Download size={16} />
                    </button>
                    <button className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 hover:bg-talos-yellow hover:text-black hover:border-talos-yellow transition-all duration-300 group/btn">
                        <span className="font-mono text-xs font-bold">{t.logistics.download_en}</span>
                        <Download size={16} />
                    </button>
                </div>
            </div>
        </motion.div>

        {/* Right Col: Communication */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
            {/* Direct Transmission */}
            <div className="scifi-box p-6 border-talos-yellow/30 bg-talos-yellow/5">
                <div className="flex items-center gap-3 mb-4 text-talos-yellow">
                    <Radio className="animate-pulse" size={20} />
                    <span className="font-bold tracking-wider">{t.logistics.transmission}</span>
                </div>
                <p className="text-xs text-talos-yellow/60 mb-6 font-mono">
                    {t.logistics.contact_text}
                </p>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-500 font-mono pl-1">{t.logistics.email_label}</label>
                    <div className="relative">
                        <input 
                           type="text" 
                           readOnly 
                           value="wjw20020209@outlook.com" 
                           className="w-full bg-black/50 border border-white/10 text-white font-mono p-3 pr-12 focus:outline-none focus:border-talos-yellow/50 transition-colors"
                        />
                        <button 
                            onClick={handleCopyEmail}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                    </div>
                    {copied && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] text-green-500 font-mono text-right"
                        >
                            {t.logistics.copy_success}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Signal Bands */}
            <div className="scifi-box p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-4 bg-gray-500"></div>
                    {t.logistics.social_signals}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <a href="https://github.com/yukito0209" target="_blank" className="flex items-center gap-3 p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
                        <Github size={20} className="text-gray-400 group-hover:text-white" />
                        <span className="text-xs text-gray-400 group-hover:text-talos-yellow font-mono">GITHUB</span>
                    </a>
                    <a href="https://space.bilibili.com/13845177" target="_blank" className="flex items-center gap-3 p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-[#00AEEC] transition-colors">
                            <path d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.37-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373" />
                        </svg>
                        <span className="text-xs text-gray-400 group-hover:text-talos-yellow font-mono">BILIBILI</span>
                    </a>
                    {/* Placeholder for LinkedIn or others */}
                </div>
            </div>

        </motion.div>
      </div>

    </div>
  );
}

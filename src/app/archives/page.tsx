'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/TranslationContext";
import { Code, Gamepad2, ExternalLink, Database, Music, Image, BarChart3 } from "lucide-react";

type Category = 'all' | 'web' | 'game' | 'data';

export default function ArchivesPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category>('all');

  const PROJECTS = [
    {
      id: "P-001",
      title: "LUCIS",
      category: "web",
      tech: ["Electron", "React", "TypeScript", "Canvas API"],
      status: "ONLINE",
      icon: Image,
      desc: "A modern photo watermarking tool with glassmorphism design and real-time preview, built with Electron + React.",
      url: "https://github.com/yukito0209/lucis",
    },
    {
      id: "P-002",
      title: "OP_SIGHT",
      category: "data",
      tech: ["FastAPI", "PyTorch", "RoBERTa", "React"],
      status: "DEPLOYED",
      icon: BarChart3,
      desc: "Sentiment analysis system for Chinese player comments in anime game communities, with sarcasm detection and weak supervision training.",
      url: "https://github.com/yukito0209/op-sight",
    },
    {
      id: "P-003",
      title: "PYGAME_MINESWEEPER",
      category: "game",
      tech: ["Python", "Pygame"],
      status: "ONLINE",
      icon: Gamepad2,
      desc: "Classic Minesweeper game with three difficulty levels, full mouse/keyboard support, optimized for MacBook.",
      url: "https://github.com/yukito0209/pygame-learning",
    },
    {
      id: "P-004",
      title: "TAPTAP_SENTIMENT",
      category: "data",
      tech: ["Python", "scikit-learn", "XGBoost", "PyTorch"],
      status: "DEPLOYED",
      icon: Database,
      desc: "ML project analyzing sentiment in TapTap game reviews, comparing traditional ML to deep learning with 86% accuracy via stacked ensemble.",
      url: "https://github.com/yukito0209/sentiment-analysis-of-taptap-game-user-reviews",
    },
    {
      id: "P-005",
      title: "GODOT_GAME_DEMO",
      category: "game",
      tech: ["Godot", "GDScript"],
      status: "PROTOTYPE",
      icon: Gamepad2,
      desc: "A simple 2D pixel game demo built with Godot Engine, exploring game development fundamentals.",
      url: "https://github.com/yukito0209/my-first-godot-game-demo",
    },
    {
      id: "P-006",
      title: "YAHEE_MUSIC_PLAYER",
      category: "web",
      tech: ["Electron", "TypeScript", "CSS"],
      status: "ONLINE",
      icon: Music,
      desc: "A local music player built with Electron featuring glassmorphism UI, playlist management, and multi-format support.",
      url: "https://github.com/yukito0209/yahee-music-player",
    },
    {
      id: "P-007",
      title: "ANIME_RECOMMENDATION",
      category: "data",
      tech: ["Python", "PyTorch", "BERT", "Plotly"],
      status: "DEPLOYED",
      icon: GraphIcon,
      desc: "Hybrid anime recommendation system combining BERT embeddings with content-based and demographic filtering.",
      url: "https://github.com/yukito0209/anime-recommendation",
    },
  ];

  const filteredProjects = (projects: typeof PROJECTS) => {
     if (filter === 'all') return projects;
     return projects.filter(p => p.category === filter);
  };

  return (
    <div className="pt-12 pb-20 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="mb-12 border-l-4 border-talos-yellow pl-6 relative">
         <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            {t.archives_page.title}
         </h1>
         <div className="font-mono text-talos-yellow/60 tracking-[0.2em] uppercase">
            // {t.archives_page.subtitle}
         </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-10">
         {[
           { key: 'all', label: t.archives_page.filter.all },
           { key: 'web', label: t.archives_page.filter.web },
           { key: 'game', label: t.archives_page.filter.game },
           { key: 'data', label: t.archives_page.filter.data },
         ].map((item) => (
           <button
             key={item.key}
             onClick={() => setFilter(item.key as Category)}
             className={`px-4 py-2 text-xs font-mono font-bold tracking-wider border transition-all duration-300 ${
                filter === item.key 
                ? 'bg-talos-yellow text-black border-talos-yellow' 
                : 'bg-black/40 text-gray-400 border-white/20 hover:border-white/50 hover:text-white'
             }`}
           >
             {item.label}
           </button>
         ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
           {filteredProjects(PROJECTS).map((project) => (
             <motion.div
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.3 }}
               key={project.id}
               className="group scifi-box bg-talos-dark/80 hover:bg-white/5 transition-colors duration-300 flex flex-col h-full"
             >
                {/* Card Header */}
                <div className="p-1 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-gray-500 pl-2">{project.id}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-talos-yellow/20"></div>
                        <div className="w-2 h-2 rounded-full bg-talos-yellow/20"></div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
                    {/* Background Icon Watermark */}
                    <div className="absolute -right-4 -bottom-4 text-white/5 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                        <project.icon size={100} />
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-talos-yellow">
                        <project.icon size={24} />
                        <span className="font-bold tracking-wider text-sm border border-talos-yellow/20 px-2 py-0.5 rounded-full bg-talos-yellow/5">
                            {project.category.toUpperCase()}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-talos-yellow transition-colors truncate">
                        {project.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
                        {project.desc}
                    </p>

                    <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map(t => (
                                <span key={t} className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.5">
                                    {t}
                                </span>
                            ))}
                        </div>
                        
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full py-2 border border-white/20 text-xs font-mono uppercase hover:bg-talos-yellow hover:text-black hover:border-talos-yellow transition-all duration-300 flex items-center justify-center gap-2">
                            {t.archives_page.view_project} <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
                
                {/* Decoration Lines */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </motion.div>
           ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Custom Icon for Data
function GraphIcon({size}: {size?:number}) {
    return (
        <svg width={size||24} height={size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
    );
}


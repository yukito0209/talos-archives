'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/TranslationContext";
import { Code, Gamepad2, PenTool, ExternalLink, ShieldCheck, Database } from "lucide-react";

type Category = 'all' | 'web' | 'game' | 'design';

export default function ArchivesPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Category>('all');

  // Placeholder Data - Static for now, could be moved to i18n if descriptions need trans
  const PROJECTS = [
    {
      id: "P-001",
      title: "TALOS_ARCHIVES",
      category: "web",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      status: "ONLINE",
      icon: Code,
      desc: "Personal portfolio system with localized database and industrial UI.",
    },
    {
      id: "P-002",
      title: "FARLIGHT_84_OPS",
      category: "game",
      tech: ["Data Analysis", "Python", "Tableau"],
      status: "DEPLOYED",
      icon: GraphIcon, 
      desc: "Operational data pipeline and event tracking for battle royale title.",
    },
    {
      id: "P-003",
      title: "NEURAL_CLOUD_SIM",
      category: "game",
      tech: ["Unity", "C#", "Shader Graph"],
      status: "PROTOTYPE",
      icon: Gamepad2,
      desc: "Roguelike strategy prototype featuring procedural level generation.",
    },
    {
      id: "P-004",
      title: "ENDFIELD_PROTOCOL",
      category: "design",
      tech: ["Figma", "After Effects"],
      status: "CONCEPT",
      icon: PenTool,
      desc: "UI/UX design system concept for sci-fi tactical dashboard.",
    },
    {
      id: "P-005",
      title: "AGGREGATE_DB",
      category: "web",
      tech: ["React", "Node.js", "PostgreSQL"],
      status: "OFFLINE",
      icon: Database,
      desc: "Internal tool for aggregating player feedback and bug reports.",
    }
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
           { key: 'design', label: t.archives_page.filter.design },
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
                        
                        <button className="w-full py-2 border border-white/20 text-xs font-mono uppercase hover:bg-talos-yellow hover:text-black hover:border-talos-yellow transition-all duration-300 flex items-center justify-center gap-2">
                            {t.archives_page.view_project} <ExternalLink size={12} />
                        </button>
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


'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, GraduationCap, FileText, ChevronRight, Activity, Cpu } from "lucide-react";
import clsx from "clsx";
import { useTranslation, Language } from "@/lib/i18n/TranslationContext";
import { useScifiSound } from "@/hooks/useScifiSound";

// --- Types ---
type TabType = 'info' | 'experience' | 'works';

// --- Data ---
const OPERATOR_DATA = {
  en: {
    codename: "Lily Mio", 
    class: "STRATEGIST / DEVELOPER",
    rarity: 6,
    tags: ["GAME_DEV", "GAME_OPS", "DATA_ANALYSIS"],
    stats: {
      coding: 85,
      design: 70,
      operations: 60,
      writing: 80,
      logic: 90,
      creativity: 75
    },
    basic_info: {
      real_name: "JINGWEN WANG",
      gender: "MALE",
      hometown: "YANCHENG, JIANGSU, CHINA",
      specialty: "DATA OPERATIONS"
    },
    experience: [
      {
        id: 1,
        org: "LILITH GAMES",
        role: "OPERATIONS INTERN, FARLIGHT 84",
        period: "2025.08 - 2026.01",
        desc: [
          "Designed, configured, and maintained game data tracking points; collaborated with designers, developers, and QAs to ensure successful implementation.",
          "Built and maintained monetization dashboards; analyzed weekly statistics and event data to support operational decision-making.",
          "Managed configuration and acceptance of hard-surface assets, ensuring visual quality and interactive performance met expectations in-game.",
          "Responded to ad-hoc data requests from cross-functional teams, resolving business issues and optimizing internal data query efficiency."
        ]
      },
    ],
    education: [
      {
        id: 1,
        school: "CITY UNIVERSITY OF HONG KONG, DONGGUAN",
        degree: "MASTER OF SCIENCE, BUSINESS INFORMATION SYSTEMS",
        period: "2024 - 2026",
      },
      {
        id: 2,
        school: "NANJING UNIVERSITY OF INFORMATION SCIENCE AND TECHNOLOGY",
        degree: "BACHELOR OF ENGINEERING, COMPUTER SCIENCE AND TECHNOLOGY",
        period: "2020 - 2024",
      }
    ],
    works: [
      {
        id: 1,
        title: "EVENT_ANALYSIS_LOG_01",
        category: "DOCUMENTATION",
        desc: "Comprehensive breakdown of seasonal event mechanics and user engagement loops.",
        status: "CLASSIFIED"
      },
      {
        id: 2,
        title: "OPS_PLAN_DELTA",
        category: "PLANNING",
        desc: "Proposal for a new community engagement campaign targeting returning players.",
        status: "PUBLIC"
      },
      {
          id: 3,
          title: "TALOS_ARCHIVES_SITE",
          category: "DEVELOPMENT",
          desc: "Personal portfolio website built with Next.js and Tailwind CSS with industrial sci-fi aesthetics.",
          status: "ONLINE"
        }
    ]
  },
  'zh-cn': {
    codename: "Lily Mio", 
    class: "策略 / 开发",
    rarity: 6,
    tags: ["游戏开发", "游戏运营", "数据分析"],
    stats: {
      coding: 85,
      design: 70,
      operations: 60,
      writing: 80,
      logic: 90,
      creativity: 75
    },
    basic_info: {
      real_name: "王敬文",
      gender: "男",
      hometown: "中国，江苏省，盐城市",
      specialty: "数据运营"
    },
    experience: [
      {
        id: 1,
        org: "莉莉丝游戏",
        role: "运营实习生, FARLIGHT 84",
        period: "2025.08 - 2026.01",
        desc: [
          "负责游戏数据埋点的设计、配置、验收、维护，与策划、程序和QA同学合作跟进埋点方案的落地。",
          "搭建并维护游戏商业化数据看板，收集、整理、分析游戏每周日常统计和活动数据，为运营决策提供数据支持。",
          "负责游戏内硬表面资产的配置与验收，确保各资产在局内、局外的显示效果和交互表现符合预期。",
          "快速响应客服、策划及运营同学的临时取数需求，协助解决业务难题，确保组内数据查询效率。"
        ]
      },
    ],
    education: [
      {
        id: 1,
        school: "香港城市大学 (东莞)",
        degree: "理学硕士 - 商务资讯系统",
        period: "2024 - 2026",
      },
      {
        id: 2,
        school: "南京信息工程大学",
        degree: "工学学士 - 计算机科学与技术",
        period: "2020 - 2024",
      }
    ],
    works: [
      {
        id: 1,
        title: "活动分析日志_01",
        category: "文档",
        desc: "季节性活动机制和用户参与循环的综合拆解。",
        status: "机密"
      },
      {
        id: 2,
        title: "运营计划_DELTA",
        category: "策划",
        desc: "针对回流玩家的新社区参与活动提案。",
        status: "公开"
      },
      {
          id: 3,
          title: "TALOS_ARCHIVES 网站",
          category: "开发",
          desc: "使用 Next.js 和 Tailwind CSS 构建的工业科幻风格个人作品集网站。",
          status: "在线"
        }
    ]
  },
  'zh-tw': {
    codename: "Lily Mio", 
    class: "策略 / 開發",
    rarity: 6,
    tags: ["遊戲開發", "遊戲營運", "數據分析"],
    stats: {
      coding: 85,
      design: 70,
      operations: 60,
      writing: 80,
      logic: 90,
      creativity: 75
    },
    basic_info: {
      real_name: "王敬文",
      gender: "男",
      hometown: "中國，江蘇省，鹽城市",
      specialty: "數據營運"
    },
    experience: [
      {
        id: 1,
        org: "莉莉絲遊戲",
        role: "營運實習生, FARLIGHT 84",
        period: "2025.08 - 2026.01",
        desc: [
          "負責遊戲數據埋點的設計、配置、驗收、維護，與策劃、開發和QA同學合作跟進埋點方案的落地。",
          "搭建並維護遊戲商業化數據儀表板，收集、整理、分析遊戲每週日常統計和活動數據，為營運決策提供數據支持。",
          "負責遊戲內硬表面資產的配置與驗收，確保各資產在局內、局外的顯示效果和交互表現符合預期。",
          "快速響應客服、策劃及營運同學的臨時取數需求，協助解決業務難題，確保組內數據查詢效率。"
        ]
      },
    ],
    education: [
      {
        id: 1,
        school: "香港城市大學 (東莞)",
        degree: "理學碩士 - 商務資訊系統",
        period: "2024 - 2026",
      },
      {
        id: 2,
        school: "南京信息工程大學",
        degree: "工學學士 - 計算機科學與技術",
        period: "2020 - 2024",
      }
    ],
    works: [
      {
        id: 1,
        title: "活動分析日誌_01",
        category: "文檔",
        desc: "季節性活動機制和用戶參與循環的綜合拆解。",
        status: "機密"
      },
      {
        id: 2,
        title: "營運計畫_DELTA",
        category: "策劃",
        desc: "針對回流玩家的新社區參與活動提案。",
        status: "公開"
      },
      {
          id: 3,
          title: "TALOS_ARCHIVES 網站",
          category: "開發",
          desc: "使用 Next.js 和 Tailwind CSS 構建的工業科幻風格個人作品集網站。",
          status: "在線"
        }
    ]
  }
};

// --- Components ---

const RadarChart = ({ stats }: { stats: typeof OPERATOR_DATA.en.stats }) => {
  // Simple SVG Radar Chart
  const size = 200;
  const center = size / 2;
  const scale = 0.8; 
  const keys = Object.keys(stats);
  const total = keys.length;
  
  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const r = (value / 100) * (size / 2) * scale;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const polyPoints = keys.map((key, i) => getPoint(stats[key as keyof typeof stats], i)).join(" ");
  const borderPoints = keys.map((_, i) => getPoint(100, i)).join(" ");

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Background Grid */}
      <svg width={size} height={size} className="overflow-visible">
          <polygon points={borderPoints} fill="none" stroke="#333" strokeWidth="1" />
          <polygon points={keys.map((_, i) => getPoint(66, i)).join(" ")} fill="none" stroke="#222" strokeWidth="1" />
          <polygon points={keys.map((_, i) => getPoint(33, i)).join(" ")} fill="none" stroke="#222" strokeWidth="1" />
          
          {/* Data Shape */}
          <polygon points={polyPoints} fill="rgba(255, 215, 0, 0.2)" stroke="#FFD700" strokeWidth="2" />
          
          {/* Labels */}
          {keys.map((key, i) => {
             const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
             const r = (size / 2) * 1.1; // Push labels out slightly
             const x = center + r * Math.cos(angle);
             const y = center + r * Math.sin(angle);
             return (
               <text 
                 key={key} 
                 x={x} 
                 y={y} 
                 fill="#666" 
                 fontSize="10" 
                 fontFamily="monospace" 
                 textAnchor="middle" 
                 alignmentBaseline="middle"
               >
                 {key.toUpperCase()}
               </text>
             );
          })}
      </svg>
      {/* Overlay Scan Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default function OperativesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const { t, language } = useTranslation();
  const { playHover, playClick } = useScifiSound();
  
  // Select data based on current language
  const data = OPERATOR_DATA[language as keyof typeof OPERATOR_DATA] || OPERATOR_DATA['en'];

  return (
    <div className="h-full w-full py-8 md:py-12 flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      
      {/* Left Column: Profile Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[350px] flex-shrink-0 flex flex-col gap-4"
      >
         <div className="scifi-box scifi-corner p-1">
            <div className="bg-black/40 p-6 flex flex-col items-center relative overflow-hidden">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 p-2 opacity-20">
                    <Activity size={100} />
                </div>

                {/* Avatar Placeholder */}
                <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900 border-2 border-talos-yellow/50 rounded-sm mb-6 flex items-center justify-center relative group">
                    <User size={48} className="text-gray-600 group-hover:text-talos-yellow transition-colors" />
                    {/* Animated Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-talos-yellow"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-talos-yellow"></div>
                </div>

                <h2 className="text-3xl font-bold tracking-widest text-white mb-1">{data.codename}</h2>
                <div className="text-talos-yellow font-mono text-xs tracking-wider mb-6 border px-2 py-0.5 border-talos-yellow/30 bg-talos-yellow/10">
                    {data.class}
                </div>

                <div className="w-full h-px bg-white/10 mb-6"></div>

                <RadarChart stats={data.stats} />

                <div className="w-full mt-4 flex justify-between font-mono text-[10px] text-gray-500">
                    <span>{t.operatives.id}: 9982-311</span>
                    <span>{t.operatives.loc}: SHANGHAI</span>
                </div>
            </div>
         </div>
         
         {/* Status Blocks */}
         <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 border border-white/10 p-3">
                <div className="text-[10px] text-gray-500 mb-1">{t.operatives.status}</div>
                <div className="text-green-500 font-bold text-sm tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    {t.operatives.active}
                </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-3">
                <div className="text-[10px] text-gray-500 mb-1">{t.operatives.clearance}</div>
                <div className="text-talos-yellow font-bold text-sm tracking-wider">{t.operatives.level} 4</div>
            </div>
         </div>
      </motion.div>


      {/* Right Column: Details Dossier */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 min-w-0"
      >
        {/* Tabs System */}
        <div className="flex gap-1 mb-0 ml-4 overflow-x-auto no-scrollbar">
            {[
                { id: 'info', label: t.operatives.tabs.info, icon: Cpu },
                { id: 'experience', label: t.operatives.tabs.experience, icon: Briefcase },
                { id: 'works', label: t.operatives.tabs.works, icon: FileText },
            ].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as TabType); playClick(); }}
                    onMouseEnter={() => playHover()}
                    className={clsx(
                        "px-6 py-3 font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all duration-300 border-t border-l border-r",
                        activeTab === tab.id 
                            ? "bg-talos-dark border-talos-yellow text-talos-yellow translate-y-[1px] z-10" 
                            : "bg-black/40 border-white/10 text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    )}
                >
                    <tab.icon size={14} />
                    {tab.label}
                </button>
            ))}
            <div className="flex-1 border-b border-white/10"></div>
        </div>

        {/* Content Area */}
        <div className="scifi-box min-h-[500px] p-6 md:p-10 border-t-0 relative bg-talos-dark">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-talos-yellow z-20"></div>
            
            <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                    <motion.div 
                        key="info"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                         <h3 className="section-header">{t.operatives.basic_info}</h3>
                         <div className="grid md:grid-cols-2 gap-8 text-sm">
                             <div className="space-y-4">
                                 <InfoItem label={t.operatives.fields.real_name} value={data.basic_info.real_name} />
                                 <InfoItem label={t.operatives.fields.gender} value={data.basic_info.gender} />
                                 <InfoItem label={t.operatives.fields.hometown} value={data.basic_info.hometown} />
                             </div>
                             <div className="space-y-4">
                                 <InfoItem label={t.operatives.fields.email} value="wjw20020209@outlook.com" />
                                 <InfoItem label={t.operatives.fields.github} value="github.com/yukito0209" />
                                 <InfoItem label={t.operatives.fields.specialty} value={data.basic_info.specialty} />
                             </div>
                         </div>
                         
                         <div className="w-full h-px bg-white/10"></div>

                         <h3 className="section-header">{t.operatives.education_history}</h3>
                         <div className="space-y-4">
                             {data.education.map((edu) => (
                                 <div key={edu.id} className="bg-white/5 p-4 border border-white/5 hover:border-white/20 transition-colors flex items-start gap-4">
                                     <div className="p-2 bg-black border border-white/10 rounded">
                                         <GraduationCap size={20} className="text-talos-yellow" />
                                     </div>
                                     <div>
                                         <div className="text-white font-bold">{edu.school}</div>
                                         <div className="text-talos-yellow/80 text-xs font-mono mb-1">{edu.degree}</div>
                                         <div className="text-gray-500 text-xs">{edu.period}</div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </motion.div>
                )}

                {activeTab === 'experience' && (
                    <motion.div 
                        key="experience"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <h3 className="section-header">{t.operatives.combat_records}</h3>
                        <div className="relative border-l border-white/10 ml-3 pl-8 space-y-12 py-2">
                             {data.experience.map((exp) => (
                                 <div key={exp.id} className="relative group">
                                     {/* Timeline Dot */}
                                     <div className="absolute -left-[38px] top-1 w-3 h-3 bg-talos-dark border-2 border-talos-yellow rounded-full group-hover:bg-talos-yellow transition-colors"></div>
                                     
                                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                         <h4 className="text-xl font-bold text-white">{exp.org}</h4>
                                         <span className="font-mono text-xs text-talos-yellow border border-talos-yellow/30 px-2 py-1 bg-talos-yellow/5">
                                            {exp.period}
                                         </span>
                                     </div>
                                     <div className="text-sm font-mono text-gray-400 mb-4">{exp.role}</div>
                                     <ul className="space-y-2 text-gray-300 text-sm list-none">
                                         {exp.desc.map((d, i) => (
                                             <li key={i} className="flex items-start gap-2">
                                                 <span className="text-talos-yellow mt-1">›</span>
                                                 {d}
                                             </li>
                                         ))}
                                     </ul>
                                 </div>
                             ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'works' && (
                    <motion.div 
                        key="works"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {data.works.map((work) => (
                            <div key={work.id} className="group border border-white/10 bg-black/40 p-5 hover:border-talos-yellow/50 transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText size={40} />
                                </div>
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-mono text-talos-yellow border border-talos-yellow/30 px-1">
                                        {work.category}
                                    </span>
                                    {work.status === 'CLASSIFIED' && <span className="text-[10px] text-red-500 font-bold border border-red-900 bg-red-900/20 px-1">{t.operatives.works.confidential}</span>}
                                </div>
                                <h4 className="font-bold text-lg text-white mb-2 group-hover:text-talos-yellow transition-colors">{work.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                    {work.desc}
                                </p>
                                <button className="text-xs font-mono text-gray-500 hover:text-white flex items-center gap-1 group-hover:underline">
                                    {t.operatives.works.access_file} <ChevronRight size={12} />
                                </button>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}

// Subcomponent for Info
const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col">
        <span className="text-[10px] text-talos-yellow/60 font-mono tracking-widest mb-1">{label}</span>
        <span className="text-white font-bold tracking-wide border-b border-white/10 pb-1">{value}</span>
    </div>
);

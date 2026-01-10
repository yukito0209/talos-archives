'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, HardDrive, Users, 
  Database, Eye, Box, Megaphone, 
  Settings, Power, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const MENU_ITEMS = [
  { id: 'home', label: 'DASHBOARD', icon: Home, href: '/' },
  { id: 'personnel', label: 'OPERATIVES', icon: Users, href: '/operatives' },
  { id: 'archives', label: 'DATA_ARCHIVES', icon: Database, href: '/archives' },
  { id: 'visuals', label: 'SURVEILLANCE', icon: Eye, href: '/visuals' },
  { id: 'logistics', label: 'LOGISTICS', icon: Box, href: '/logistics' },
  { id: 'system', label: 'SYSTEM_LOGS', icon: HardDrive, href: '/logs' },
  { id: 'broadcast', label: 'BROADCAST', icon: Megaphone, href: '/news' },
];

export default function NavigationSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full h-16 border-b border-white/10 z-40 flex items-center justify-between px-6 md:px-8 backdrop-blur-md bg-black/40">
        <div className="flex items-center gap-6">
          {/* Menu Trigger */}
          <button 
            onClick={() => setIsOpen(true)}
            className="text-white/70 hover:text-talos-yellow transition-colors p-2 -ml-2 hover:bg-white/5"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-2 h-8 bg-talos-yellow animate-pulse group-hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] transition-shadow"></div>
            <h1 className="font-bold text-xl md:text-2xl tracking-[0.2em] text-white">
              TALOS <span className="text-talos-yellow">//</span> ARCHIVES
            </h1>
          </Link>
        </div>

        {/* Right Side Indicators */}
        <div className="hidden md:flex items-center gap-4 font-mono text-xs text-white/40">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>SERVER_ONLINE</span>
           </div>
           <div>:: 24.331 ::</div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Sidebar Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[300px] md:w-[360px] bg-[#0F0F0F] border-r border-white/10 z-50 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
            >
              {/* Sidebar Header */}
              <div className="h-24 border-b border-white/10 flex items-center justify-between px-8 bg-white/5">
                 <div className="font-bold text-3xl tracking-tighter text-white">
                    MENU //
                 </div>
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-talos-yellow hover:text-black hover:border-talos-yellow transition-all duration-300"
                 >
                   <X size={20} />
                 </button>
              </div>

              {/* Decorative Lines */}
              <div className="h-1 w-full bg-gradient-to-r from-talos-yellow to-transparent opacity-50"></div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-2 no-scrollbar">
                <div className="font-mono text-xs text-talos-yellow/50 mb-4 px-4 tracking-widest">
                  NAVIGATION PROTOCOLS
                </div>
                
                {MENU_ITEMS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.id} 
                      href={item.href}
                      className="block group"
                    >
                      <div className={clsx(
                        "relative flex items-center gap-4 px-4 py-4 border border-transparent transition-all duration-300",
                        "hover:bg-white/5 hover:border-white/10",
                        index === 0 ? "bg-white/5 border-white/10" : "" // Active state simulation for demo
                      )}>
                        {/* Hover Highlight Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-talos-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
                        
                        <Icon className={clsx(
                          "w-5 h-5 transition-colors duration-300",
                          "text-gray-400 group-hover:text-talos-yellow"
                        )} />
                        
                        <div className="flex flex-col">
                          <span className={clsx(
                            "font-bold tracking-wider text-sm transition-colors duration-300",
                            "text-gray-200 group-hover:text-white"
                          )}>
                            {item.label}
                          </span>
                          <span className="text-[10px] font-mono text-gray-600 group-hover:text-gray-400">
                             // 00{index + 1}_ACCESS
                          </span>
                        </div>

                        <ChevronRight className="ml-auto w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-talos-yellow" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-white/10 bg-black/20">
                 {/* User Profile Dummy */}
                 <div className="flex items-center gap-4 mb-6 p-4 border border-white/10 bg-white/5">
                    <div className="w-10 h-10 bg-gray-700 flex items-center justify-center text-white/50">
                        <Users size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 font-mono">CURRENT USER</div>
                        <div className="text-sm font-bold text-white">GUEST_COMMANDER</div>
                    </div>
                    <div className="w-2 h-2 bg-talos-yellow rounded-full animate-ping"></div>
                 </div>

                 {/* Action Buttons */}
                 <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 border border-white/10 text-xs font-mono text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                        <Settings size={14} /> SETTINGS
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-red-900/20 border border-red-500/20 text-xs font-mono text-red-400 hover:bg-red-900/40 transition-colors">
                        <Power size={14} /> DISCONNECT
                    </button>
                 </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

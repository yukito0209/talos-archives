'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScifiSound } from '@/hooks/useScifiSound';
import { useTranslation } from "@/lib/i18n/TranslationContext";

const ROUTES = [
  '/',
  '/operatives',
  '/archives',
  '/visuals',
  '/logistics',
  '/logs',
  '/news'
];

export default function ScrollNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const lastScrollTime = useRef(0);
  const { playHover, playClick } = useScifiSound();
  const { t } = useTranslation();

  const LABELS: Record<string, string> = {
    '/': t.nav.dashboard,
    '/operatives': t.nav.operatives,
    '/archives': t.nav.archives,
    '/visuals': t.nav.surveillance,
    '/logistics': t.nav.logistics,
    '/logs': t.nav.system_logs,
    '/news': t.nav.broadcast
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 1. Safety check: debounce to prevent rapid-fire navigation
      const now = Date.now();
      if (isNavigating || now - lastScrollTime.current < 800) return;

      const currentIdx = ROUTES.indexOf(pathname);
      
      // If current page isn't in our list (e.g. 404 or sub-page), do nothing
      if (currentIdx === -1) return;

      // 2. Logic for Scrolling DOWN -> Next Page
      if (e.deltaY > 0) {
        // Calculate if we are at the bottom of the page
        // window.innerHeight + window.scrollY should interact with document.body.offsetHeight
        // We add a small buffer (10px) to account for browser fractional pixels
        const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
        
        if (isBottom) {
           if (currentIdx < ROUTES.length - 1) {
              // Proceed to next page
              lastScrollTime.current = now;
              setIsNavigating(true);
              router.push(ROUTES[currentIdx + 1]);
           }
        }
      } 
      // 3. Logic for Scrolling UP -> Previous Page
      else if (e.deltaY < 0) {
        // Check if we are at the top
        const isTop = window.scrollY <= 10;
        
        if (isTop) {
           if (currentIdx > 0) {
              // Proceed to previous page
              lastScrollTime.current = now;
              setIsNavigating(true);
              router.push(ROUTES[currentIdx - 1]);
           }
        }
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [pathname, isNavigating, router]);

  // Reset navigating block when the path actually changes
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  // Don't show on 404/unknown routes
  if (!ROUTES.includes(pathname)) return null;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {ROUTES.map((route, index) => {
        const isActive = pathname === route;
        
        return (
          <div 
            key={route}
            className="group relative flex items-center justify-end"
          >
            {/* Label (Tooltip) */}
            <div className={`
              absolute right-8 py-1 px-2 border bg-black/80 backdrop-blur-sm transition-all duration-300 pointer-events-none
              font-mono text-[10px] tracking-widest uppercase whitespace-nowrap
              ${isActive 
                ? 'opacity-100 border-talos-yellow text-talos-yellow translate-x-0' 
                : 'opacity-0 border-white/20 text-gray-400 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }
            `}>
              {LABELS[route as keyof typeof LABELS] || route}
            </div>

            {/* Dot Indicator */}
            <button
              onClick={() => {
                if (route !== pathname) {
                  playClick();
                  router.push(route);
                }
              }}
              onMouseEnter={() => !isActive && playHover()}
              className={`
                w-2 h-2 transition-all duration-300 relative
                ${isActive ? 'bg-talos-yellow scale-125' : 'bg-gray-600 hover:bg-white'}
              `}
              aria-label={`Navigate to ${route}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-glow"
                  className="absolute inset-0 bg-talos-yellow blur-sm"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
            
            {/* Connecting Line (Visual only) */}
            {index < ROUTES.length - 1 && (
               <div className="absolute top-2 right-[3px] w-px h-4 bg-gray-800 -z-10 group-hover:bg-gray-700 transition-colors"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

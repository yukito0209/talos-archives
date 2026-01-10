'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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

  return null; // This component has no UI, just behavior
}

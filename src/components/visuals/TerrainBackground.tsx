'use client';

import { useEffect, useRef } from 'react';

export default function TerrainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Configuration
    const lines = 40; // Number of horizontal lines
    const speed = 0.002; // Speed of the flow
    const amplitude = 30; // Height of the peaks
    const wavelength = 0.003; // Smoothness of the curves (lower is smoother)
    
    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Simple pseudo-noise function using sine wave superposition
    // This creates a "terrain" like look without heavy Perlin noise libraries
    const getElevation = (x: number, z: number, t: number) => {
      return (
        Math.sin(x * wavelength + t) * amplitude +
        Math.sin(x * wavelength * 2 + t * 1.5 + z * 0.01) * (amplitude / 2) +
        Math.cos(z * 0.05 + t * 0.5) * (amplitude * 0.5)
      );
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear with very slight fade for trail effect (optional, here we clear fully)
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Full clear
      
      // We want lines to look like a perspective grid or a top-down scan
      // Let's do a "tilted plane" effect or just 2D topographic map. 
      // User asked for "flowing contour map", so 2D stacked lines works well.
      
      const gap = canvas.height / lines;
      
      ctx.lineWidth = 1;
      
      // Talos Yellow with low opacity
      // Gradient for depth
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 215, 0, 0)');
      gradient.addColorStop(0.2, 'rgba(255, 215, 0, 0.1)');
      gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
      gradient.addColorStop(0.8, 'rgba(255, 215, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.strokeStyle = gradient;

      for (let i = 0; i < lines; i++) {
        const yBase = i * gap * 1.5 - (canvas.height * 0.2); // Spread them out, start higher
        
        ctx.beginPath();
        
        // Draw one horizontal line with noise
        for (let x = 0; x <= canvas.width; x += 10) { // Step of 10px for performance
          const z = i * 50; // "Depth" coordinate
          
          // Current Elevation
          const yOffset = getElevation(x, z, time);
          
          // 3D-ish perspective factor (optional) - let's keep it strictly 2D flowing map for cleaner look
          // or add a slight perspective multiplier
          
          ctx.lineTo(x, yBase + yOffset);
        }
        
        ctx.stroke();
      }

      // Add some "scanning" particles
      /*
      ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
      for(let k=0; k<5; k++) {
         const px = (Math.sin(time * 0.5 + k) * 0.5 + 0.5) * canvas.width;
         const py = (Math.cos(time * 0.3 + k) * 0.5 + 0.5) * canvas.height;
         ctx.fillRect(px, py, 2, 2);
      }
      */

      time += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20 opacity-40 mix-blend-screen"
    />
  );
}

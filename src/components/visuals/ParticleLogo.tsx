'use client';

import { useEffect, useRef, useState } from 'react';
import { useScifiSound } from '@/hooks/useScifiSound';

// --- 配置参数 (Configuration) ---
// 下面的参数决定了粒子特效的视觉风格和交互手感，请随意调整实验

// 1. 内容配置
const DEFAULT_TEXT_MAIN = "TALOS";    // [默认主标题]：对应 text 参数
const DEFAULT_TEXT_SUB = "ARCHIVES";  // [默认副标题]：对应 subtext 参数

// 2. 颜色配置 (Color Config)
const COLOR_TEXT_MAIN = '#FFD700';    // [主标题颜色]：默认金色
const COLOR_TEXT_SUB = '#FFFFFF';     // [副标题颜色]：默认白色

// 3. 粒子参数
const GAP = 3;              // [采样间隔]：此值越大，粒子越稀疏，性能越好；此值越小，图像越精细，但更吃性能。建议 1-3。
const RADIUS = 1;           // [粒子半径]：单个粒子方块的大小（像素）。

// 3. 字体与布局配置 (Font & Layout Config)
const FONT_SIZE_MAIN = 120;  // [主标题字号]：单位 px
const FONT_SIZE_SUB = 40;   // [副标题字号]：单位 px
const OFFSET_MAIN_Y = -10;  // [主标题垂直偏移]：相对于中心点，负数向上，正数向下
const OFFSET_SUB_Y = 70;    // [副标题垂直偏移]：相对于中心点，负数向上，正数向下（以此控制行距）

// 4. 物理交互配置
const MOUSE_RADIUS = 10;    // [交互半径]：鼠标周围多大范围内的粒子会受到影响。
const MOUSE_FORCE = 0.5;    // [斥力强度]：鼠标推开粒子的力量。正值为排斥，负值为吸引。
const RETURN_SPEED = 0.01;   // [复位速度]：粒子回到原位的速度 (0.01 - 1.0)。值越大，回弹越快越僵硬；值越小，回弹越慢越平滑。
const FRICTION = 0.8;       // [摩擦力]：粒子运动的阻力 (0.0 - 1.0)。防止粒子像在冰面上一样无限滑动。

interface ParticleLogoProps {
  text?: string;
  subtext?: string;
  className?: string;
}

export default function ParticleLogo({ text = DEFAULT_TEXT_MAIN, subtext = DEFAULT_TEXT_SUB, className }: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { playHover } = useScifiSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Float32Array; // [x, y, originX, originY, vx, vy, colorInt]
    const PARTICLE_SIZE = 7; // stride
    let particleCount = 0;
    let mainParticleCount = 0; // Number of particles belonging to main text
    
    let mouseX = -1000;
    let mouseY = -1000;
    
    // 配置参数已移至文件顶部

    const initParticles = () => {
      if (!canvas || !containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Need higher dpi for crisp text
      const dpr = window.devicePixelRatio || 1;
      // Ensure integer dimensions for canvas buffer to avoid subpixel artifact issues
      const canvasWidth = Math.floor(width * dpr);
      const canvasHeight = Math.floor(height * dpr);

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // 1. Draw Text to Canvas (Two Passes for Color Separation)
      
      const step = Math.max(1, Math.floor(GAP * dpr));
      const tempParticles = [];

      // --- Pass 1: Main Title ---
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = COLOR_TEXT_MAIN; 
      ctx.font = `bold ${FONT_SIZE_MAIN}px "Rajdhani", sans-serif`; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.fillText(text, centerX, centerY + OFFSET_MAIN_Y);
      
      // Scan Main Title
      let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      let data = imageData.data;
      
      for (let y = 0; y < canvasHeight; y += step) {
        for (let x = 0; x < canvasWidth; x += step) {
          const index = (y * canvasWidth + x) * 4;
          if (index < 0 || index >= data.length) continue;
          if (data[index + 3] > 128) {
             tempParticles.push({ x: x / dpr, y: y / dpr });
          }
        }
      }
      
      mainParticleCount = tempParticles.length;

      // --- Pass 2: Sub Title ---
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.font = `${FONT_SIZE_SUB}px "JetBrains Mono", monospace`; 
      ctx.fillStyle = COLOR_TEXT_SUB;
      ctx.fillText(`// ${subtext}`, centerX, centerY + OFFSET_SUB_Y);

      // Scan Sub Title
      imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      data = imageData.data;

      for (let y = 0; y < canvasHeight; y += step) {
        for (let x = 0; x < canvasWidth; x += step) {
          const index = (y * canvasWidth + x) * 4;
          if (index < 0 || index >= data.length) continue;
          if (data[index + 3] > 128) {
             tempParticles.push({ x: x / dpr, y: y / dpr });
          }
        }
      }

      // 3. Create Typed Array

      // 3. Create Typed Array
      particleCount = tempParticles.length;
      particles = new Float32Array(particleCount * PARTICLE_SIZE);
      
      for(let i=0; i<particleCount; i++) {
         const p = tempParticles[i];
         const idx = i * PARTICLE_SIZE;
         particles[idx] = p.x;     // current x
         particles[idx+1] = p.y;   // current y
         particles[idx+2] = p.x;   // origin x
         particles[idx+3] = p.y;   // origin y
         particles[idx+4] = 0;     // vx
         particles[idx+5] = 0;     // vy
         // Color is handled simply by assuming main yellow for now for perf
         // or we can store color index if needed.
      }
    };

    const animate = () => {
       // Clear
       ctx.clearRect(0, 0, canvas.width, canvas.height);

       const updateAndDrawBatch = (startIndex: number, endIndex: number, color: string) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          
          for(let i = startIndex; i < endIndex; i++) {
            const idx = i * PARTICLE_SIZE;
            let x = particles[idx];
            let y = particles[idx+1];
            const ox = particles[idx+2];
            const oy = particles[idx+3];
            let vx = particles[idx+4];
            let vy = particles[idx+5];

            // Physics: Mouse Interaction
            const dx = mouseX - x;
            const dy = mouseY - y;
            const distSq = dx*dx + dy*dy;
            const spreadSq = MOUSE_RADIUS * MOUSE_RADIUS;

            if (distSq < spreadSq) {
                const angle = Math.atan2(dy, dx);
                const force = (spreadSq - distSq) / spreadSq;
                vx -= Math.cos(angle) * force * MOUSE_FORCE;
                vy -= Math.sin(angle) * force * MOUSE_FORCE;
            }

            // Physics: Return to Origin
            vx += (ox - x) * RETURN_SPEED;
            vy += (oy - y) * RETURN_SPEED;

            // Friction
            vx *= FRICTION;
            vy *= FRICTION;

            // Update Position
            x += vx;
            y += vy;

            // Write back
            particles[idx] = x;
            particles[idx+1] = y;
            particles[idx+4] = vx;
            particles[idx+5] = vy;

            // Draw
            ctx.rect(x, y, RADIUS, RADIUS);
          }
          ctx.fill();
       };

       // Draw Main Text particles
       updateAndDrawBatch(0, mainParticleCount, COLOR_TEXT_MAIN);
       
       // Draw Sub Text particles
       updateAndDrawBatch(mainParticleCount, particleCount, COLOR_TEXT_SUB);
       
       animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
       if (!containerRef.current) return;
       const rect = containerRef.current.getBoundingClientRect();
       mouseX = e.clientX - rect.left;
       mouseY = e.clientY - rect.top;
       setIsHovering(true);
    };

    const handleMouseLeave = () => {
       mouseX = -1000;
       mouseY = -1000;
       setIsHovering(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', initParticles);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initParticles);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [text, subtext]);

  // Sound effect trigger
  useEffect(() => {
    if (isHovering) {
        // Optional: Play a low hum or sound when interacting
        // playHover(); 
    }
  }, [isHovering, playHover]);

  return (
    <div ref={containerRef} className={`relative w-full h-[300px] flex items-center justify-center cursor-crosshair overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
}

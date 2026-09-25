'use client';

import React, { useEffect, useRef } from 'react';

export const HeroNetworkVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Node items representing marketplace participants
    const nodeCount = 28;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      label?: string;
    }[] = [];

    const colors = ['#10b981', '#34d399', '#059669', '#f59e0b', '#06b6d4'];
    const roles = ['AC Tech', 'Plumber', 'Electrician', 'Web Pro', 'Cleaner', 'Mechanic', 'Customer'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 3.5 + 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        label: i < 6 ? roles[i] : undefined,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nodes within threshold distance
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Mouse connection
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const alpha = (1 - mdist / 140) * 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Move node
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        if (nodes[i].x < 0 || nodes[i].x > width) nodes[i].vx *= -1;
        if (nodes[i].y < 0 || nodes[i].y > height) nodes[i].vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = nodes[i].color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = nodes[i].color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Optional label
        if (nodes[i].label) {
          ctx.font = '10px sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fillText(nodes[i].label!, nodes[i].x + 8, nodes[i].y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border border-emerald-500/20 shadow-2xl p-4 flex flex-col justify-between">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Overlay stats badges */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Live Match Network
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 text-[11px] text-slate-300 font-medium">
          40+ Countries Connected
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 mt-auto pointer-events-none pt-24">
        <div className="p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-emerald-500/20">
          <div className="text-[10px] text-slate-400 font-medium">Average Response</div>
          <div className="text-lg font-extrabold text-white mt-0.5">&lt; 18 mins</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/85 backdrop-blur-md border border-emerald-500/20">
          <div className="text-[10px] text-slate-400 font-medium">Verified Rating</div>
          <div className="text-lg font-extrabold text-amber-400 mt-0.5">4.92 ★★★★★</div>
        </div>
      </div>
    </div>
  );
};

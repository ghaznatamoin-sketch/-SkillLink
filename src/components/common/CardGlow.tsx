'use client';

import React, { useRef, useState } from 'react';

interface CardGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string; // e.g. "rgba(16, 185, 129, 0.15)" or hex
  className?: string;
}

export const CardGlow: React.FC<CardGlowProps> = ({
  children,
  glowColor = 'rgba(16, 185, 129, 0.18)',
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden transition-all duration-200 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Glow Layer */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

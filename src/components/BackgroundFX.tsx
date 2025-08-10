"use client";
import React from "react";

// Lightweight animated background (pure CSS animations for performance)
// Layers: gradient wash, aurora blobs, subtle particles.
export const BackgroundFX: React.FC = () => {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Animated multi‑stop soft gradient */}
      <div className="absolute inset-0 bg-gradient-anim opacity-[0.65]" />
      {/* Aurora / flowing blobs */}
      <div className="absolute inset-0">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
        <span className="aurora aurora-c" />
      </div>
      {/* Particle twinkles */}
      <div className="absolute inset-0 particle-layer">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className="particle" style={{
            '--x': `${Math.random()*100}%`,
            '--y': `${Math.random()*100}%`,
            '--d': `${6 + Math.random()*10}s`,
            '--del': `${Math.random()*6}s`,
            '--s': `${0.6 + Math.random()*1.4}`
          } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
};

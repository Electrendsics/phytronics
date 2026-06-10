import React from 'react';

export default function PhytronicsLogo({ size = 48, showText = false, className = "" }) {
  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Background Glow */}
          <circle cx="50" cy="50" r="40" fill="url(#logo-glow)" opacity="0.15" />
          
          {/* Physics: Atom Ellipses (Animated) */}
          <g className="animate-spin-slow transform-origin-center origin-center">
            <ellipse 
              cx="50" 
              cy="50" 
              rx="44" 
              ry="16" 
              stroke="url(#cyan-grad)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeOpacity="0.8"
            />
          </g>
          <g className="animate-spin-slow-reverse transform-origin-center origin-center" style={{ transform: 'rotate(60deg)' }}>
            <ellipse 
              cx="50" 
              cy="50" 
              rx="44" 
              ry="16" 
              stroke="url(#emerald-grad)" 
              strokeWidth="2.5" 
              fill="none" 
              strokeOpacity="0.8"
            />
          </g>
          
          {/* Electronics: Circuit Trace & Nodes */}
          <path 
            d="M 12 50 L 32 50 L 40 32 L 60 68 L 68 50 L 88 50" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-foreground transition-colors duration-300"
          />
          
          <circle cx="12" cy="50" r="4" fill="url(#cyan-grad)" />
          <circle cx="88" cy="50" r="4" fill="url(#emerald-grad)" />
          
          {/* Core IC Chip */}
          <rect 
            x="42" 
            y="42" 
            width="16" 
            height="16" 
            rx="3" 
            fill="currentColor"
            className="text-foreground transition-colors duration-300"
          />
          <circle cx="50" cy="50" r="3" fill="url(#emerald-grad)" />

          <defs>
            <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(188 95% 42%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(188 95% 42%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cyan-grad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="hsl(188 95% 42%)" />
              <stop offset="100%" stopColor="hsl(160 84% 39%)" />
            </linearGradient>
            <linearGradient id="emerald-grad" x1="100" y1="0" x2="0" y2="100">
              <stop offset="0%" stopColor="hsl(160 84% 39%)" />
              <stop offset="100%" stopColor="hsl(188 95% 42%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Phytronics
        </span>
      )}
    </div>
  );
}
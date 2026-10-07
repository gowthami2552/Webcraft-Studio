import React from 'react';

export default function AboutVectorScene() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        height: 380,
        margin: '0 auto',
      }}
    >
      <svg
        viewBox="0 0 460 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="about-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F4EEDF" />
          </linearGradient>

          <filter id="about-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#11120D" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Ambient background vector circle */}
        <circle cx="230" cy="180" r="140" fill="#F4EEDF" fillOpacity="0.45" />
        <circle cx="230" cy="180" r="160" stroke="#8A7361" strokeWidth="1.2" strokeDasharray="4 6" fill="none" strokeOpacity="0.35" className="v-spin-slow" />

        {/* Central Agency Workspace Display */}
        <g filter="url(#about-shadow)" transform="translate(90, 70)">
          {/* Main Monitor */}
          <rect width="280" height="190" rx="14" fill="url(#about-grad)" stroke="#D8CFBC" strokeWidth="2" />
          {/* Top bezel */}
          <rect width="280" height="28" rx="14" fill="#11120D" />
          <path d="M 0 18 H 280 V 28 H 0 Z" fill="#11120D" />
          <circle cx="20" cy="14" r="4" fill="#EF4444" />
          <circle cx="34" cy="14" r="4" fill="#F59E0B" />
          <circle cx="48" cy="14" r="4" fill="#10B981" />
          <text x="140" y="18" fill="#FFFFFF" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">
            WebCraft Studio Engine
          </text>

          {/* Screen Content: Live Interactive Studio UI */}
          {/* Left panel: Code preview */}
          <g transform="translate(14, 38)">
            <rect width="115" height="138" rx="8" fill="#1B1C17" />
            <rect x="10" y="14" width="40" height="5" rx="2.5" fill="#A855F7" />
            <rect x="10" y="24" width="75" height="5" rx="2.5" fill="#38BDF8" />
            <rect x="10" y="34" width="60" height="5" rx="2.5" fill="#F59E0B" />
            <rect x="10" y="44" width="45" height="5" rx="2.5" fill="#10B981" />
            <rect x="10" y="54" width="70" height="5" rx="2.5" fill="#E8DFC8" opacity="0.6" />

            {/* Live animated cursor */}
            <g transform="translate(10, 68)">
              <rect width="55" height="6" rx="3" fill="#38BDF8" />
              <rect x="58" y="-1" width="2.5" height="8" fill="#FFFFFF" className="v-pulse" />
            </g>

            {/* Matrix status line */}
            <rect x="10" y="88" width="95" height="38" rx="6" fill="#11120D" stroke="#33342D" strokeWidth="1" />
            <circle cx="22" cy="107" r="4" fill="#10B981" className="v-pulse" />
            <text x="32" y="110" fontSize="8" fill="#10B981" fontWeight="700">SYSTEM 100% ONLINE</text>
          </g>

          {/* Right panel: Vector Design & Geometry canvas */}
          <g transform="translate(138, 38)">
            <rect width="128" height="138" rx="8" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1" />
            {/* Bezier spline */}
            <path d="M 12 70 C 35 20, 80 110, 116 40" stroke="#11120D" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="70" r="3" fill="#A855F7" />
            <circle cx="116" cy="40" r="3" fill="#10B981" />

            {/* Color swatches */}
            <circle cx="24" cy="116" r="8" fill="#11120D" />
            <circle cx="46" cy="116" r="8" fill="#8A7361" />
            <circle cx="68" cy="116" r="8" fill="#D8CFBC" />
            <circle cx="90" cy="116" r="8" fill="#F59E0B" />
          </g>

          {/* Monitor Stand */}
          <g transform="translate(118, 190)">
            <path d="M 16 0 L 28 34 L 16 34 Z" fill="#D8CFBC" />
            <rect x="0" y="32" width="44" height="6" rx="3" fill="#11120D" />
          </g>
        </g>

        {/* ── SATELLITE BADGE 1: 100% Client Satisfaction (Top-Right) ── */}
        <g filter="url(#about-shadow)" transform="translate(340, 24)" className="v-float-med">
          <rect width="105" height="70" rx="14" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          <text x="14" y="28" fontSize="20" fontWeight="900" fill="#11120D" fontFamily="sans-serif">100%</text>
          <text x="14" y="44" fontSize="9.5" fontWeight="600" fill="#898675">Client Trust</text>
          <circle cx="86" cy="24" r="10" fill="#10B981" fillOpacity="0.15" />
          <path d="M 82 24 L 85 27 L 91 21" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── SATELLITE BADGE 2: 24/7 Global Support (Bottom-Left) ── */}
        <g filter="url(#about-shadow)" transform="translate(15, 250)" className="v-float-reverse">
          <rect width="115" height="74" rx="14" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          <text x="16" y="30" fontSize="20" fontWeight="900" fill="#10B981" fontFamily="sans-serif">24/7</text>
          <text x="16" y="46" fontSize="9.5" fontWeight="600" fill="#898675">Dedicated Support</text>
          <circle cx="96" cy="26" r="4" fill="#10B981" className="v-pulse" />
        </g>

        {/* ── SATELLITE 3: Vector Coffee Mug with Steam (Bottom-Right) ── */}
        <g filter="url(#about-shadow)" transform="translate(350, 260)" className="v-float-slow">
          <rect width="64" height="64" rx="14" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          {/* Coffee Mug */}
          <g transform="translate(18, 22)">
            <rect x="2" y="8" width="18" height="20" rx="4" fill="#11120D" />
            <path d="M 20 12 C 24 12, 25 18, 20 20" stroke="#11120D" strokeWidth="2.5" fill="none" />
            {/* Animated Steam */}
            <path d="M 6 3 C 6 -2, 9 -2, 9 -6" stroke="#8A7361" strokeWidth="1.5" strokeLinecap="round" fill="none" className="v-dash-flow" />
            <path d="M 12 4 C 12 -1, 15 -1, 15 -5" stroke="#8A7361" strokeWidth="1.5" strokeLinecap="round" fill="none" className="v-dash-flow-rev" />
          </g>
        </g>

        {/* Floating Sparkles */}
        <g transform="translate(60, 40)" className="v-sparkle">
          <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="#F59E0B" />
        </g>
      </svg>
    </div>
  );
}

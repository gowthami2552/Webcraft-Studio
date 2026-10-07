import React, { useState, useRef } from 'react';

export default function HeroVectorWorkspace() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 580,
        height: 500,
        margin: '0 auto',
        perspective: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 600 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="hero-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4EEDF" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="hero-accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#11120D" />
              <stop offset="100%" stopColor="#565449" />
            </linearGradient>

            <linearGradient id="hero-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <linearGradient id="hero-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="hero-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>

            <filter id="hero-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#11120D" floodOpacity="0.16" />
            </filter>

            <filter id="hero-card-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#11120D" floodOpacity="0.12" />
            </filter>

            <filter id="hero-glow-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient vector connection circuit trails */}
          <g>
            <path
              d="M 120 180 Q 240 100 380 150 T 520 220"
              stroke="#8A7361"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="none"
              strokeDasharray="5 7"
              className="v-dash-flow"
            />
            <path
              d="M 90 320 C 180 400 320 440 480 370"
              stroke="#565449"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              fill="none"
              strokeDasharray="6 6"
              className="v-dash-flow-rev"
            />
          </g>

          {/* ── MAIN WORKSPACE CANVAS WINDOW ── */}
          <g filter="url(#hero-shadow)" transform="translate(60, 60)">
            {/* Window frame */}
            <rect
              width="440"
              height="330"
              rx="18"
              fill="url(#hero-bg-grad)"
              stroke="#D8CFBC"
              strokeWidth="2"
            />

            {/* Window title bar */}
            <rect width="440" height="42" rx="18" fill="#F4EEDF" />
            <path d="M 0 30 H 440 V 42 H 0 Z" fill="#F4EEDF" />
            <line x1="0" y1="42" x2="440" y2="42" stroke="#D8CFBC" strokeWidth="1" />

            {/* Mac-style action dots */}
            <circle cx="26" cy="21" r="5.5" fill="#EF4444" />
            <circle cx="44" cy="21" r="5.5" fill="#F59E0B" />
            <circle cx="62" cy="21" r="5.5" fill="#10B981" />

            {/* Address bar mockup */}
            <rect x="90" y="11" width="220" height="20" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1" />
            <circle cx="104" cy="21" r="3" fill="#10B981" />
            <text x="116" y="25" fontSize="10" fill="#565449" fontFamily="monospace" fontWeight="600">
              webcraftstudio.com
            </text>

            {/* Window Tab Badges */}
            <rect x="325" y="12" width="95" height="18" rx="6" fill="#11120D" />
            <text x="340" y="25" fontSize="9.5" fill="#FFFBF4" fontFamily="sans-serif" fontWeight="700">
              LIVE PREVIEW
            </text>

            {/* Workspace Inner Grid */}
            {/* Left Column: Animated Code Terminal */}
            <g transform="translate(20, 58)">
              <rect width="180" height="250" rx="12" fill="#11120D" />
              {/* Code window header */}
              <rect width="180" height="24" rx="12" fill="#1B1C17" />
              <text x="14" y="16" fontSize="9" fill="#898675" fontFamily="monospace">App.jsx</text>
              <circle cx="164" cy="12" r="3" fill="#10B981" className="v-pulse" />

              {/* Animated Syntax code lines */}
              <g transform="translate(14, 38)">
                {/* import React */}
                <rect x="0" y="0" width="38" height="6" rx="3" fill="#A855F7" />
                <rect x="44" y="0" width="46" height="6" rx="3" fill="#38BDF8" />

                {/* export default function */}
                <rect x="0" y="14" width="75" height="6" rx="3" fill="#EF4444" opacity="0.85" />
                <rect x="80" y="14" width="48" height="6" rx="3" fill="#F59E0B" />

                {/* return ( */}
                <rect x="0" y="28" width="42" height="6" rx="3" fill="#10B981" />

                {/* JSX tree */}
                <rect x="12" y="42" width="24" height="6" rx="3" fill="#38BDF8" />
                <rect x="40" y="42" width="70" height="6" rx="3" fill="#E8DFC8" opacity="0.7" />

                <rect x="22" y="56" width="55" height="6" rx="3" fill="#A855F7" />
                <rect x="82" y="56" width="40" height="6" rx="3" fill="#38BDF8" />

                {/* Interactive cursor line */}
                <g transform="translate(22, 70)">
                  <rect x="0" y="0" width="70" height="7" rx="3.5" fill="#F59E0B" opacity="0.9" />
                  <rect x="74" y="-1" width="3" height="9" fill="#FFFFFF" className="v-pulse" />
                </g>

                <rect x="22" y="84" width="85" height="6" rx="3" fill="#10B981" opacity="0.8" />
                <rect x="12" y="98" width="30" height="6" rx="3" fill="#38BDF8" />

                {/* Interactive syntax pulse box */}
                <g transform="translate(0, 120)">
                  <rect width="152" height="58" rx="8" fill="#1F201B" stroke="#33342D" strokeWidth="1" />
                  <circle cx="16" cy="18" r="5" fill="#10B981" />
                  <text x="28" y="21" fontSize="9" fill="#FFFFFF" fontWeight="700" fontFamily="sans-serif">Speed: 99.8ms</text>
                  <text x="28" y="34" fontSize="8" fill="#898675" fontFamily="monospace">Bundle: 0.28 KB (optimized)</text>
                  <path d="M 16 45 L 35 40 L 60 46 L 85 36 L 115 42 L 140 33" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </g>
              </g>
            </g>

            {/* Right Column: Dynamic Web Application Mockup */}
            <g transform="translate(216, 58)">
              {/* Header hero banner */}
              <rect width="204" height="70" rx="10" fill="#EFE8D8" stroke="#D8CFBC" strokeWidth="1" />
              <circle cx="24" cy="24" r="10" fill="#11120D" />
              <rect x="42" y="16" width="65" height="7" rx="3.5" fill="#11120D" />
              <rect x="42" y="27" width="95" height="5" rx="2.5" fill="#898675" />
              <rect x="14" y="44" width="55" height="16" rx="8" fill="#11120D" />
              <text x="25" y="55" fontSize="7.5" fill="#FFFFFF" fontWeight="700">Explore</text>

              {/* 2 Animated Feature Cards */}
              <g transform="translate(0, 80)">
                <rect width="97" height="85" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1" />
                <circle cx="20" cy="22" r="8" fill="#F59E0B" fillOpacity="0.2" />
                <path d="M 17 22 L 23 22 M 20 19 L 20 25" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                <rect x="12" y="38" width="50" height="6" rx="3" fill="#11120D" />
                <rect x="12" y="49" width="70" height="4" rx="2" fill="#898675" />
                <rect x="12" y="57" width="45" height="4" rx="2" fill="#898675" />
                <circle cx="80" cy="72" r="4" fill="#10B981" />
              </g>

              <g transform="translate(107, 80)">
                <rect width="97" height="85" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1" />
                <circle cx="20" cy="22" r="8" fill="#3B82F6" fillOpacity="0.2" />
                <path d="M 16 22 L 24 22" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                <rect x="12" y="38" width="60" height="6" rx="3" fill="#11120D" />
                <rect x="12" y="49" width="65" height="4" rx="2" fill="#898675" />
                <rect x="12" y="57" width="50" height="4" rx="2" fill="#898675" />
                <circle cx="80" cy="72" r="4" fill="#3B82F6" />
              </g>

              {/* Bottom Stat Gauge */}
              <g transform="translate(0, 174)">
                <rect width="204" height="74" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1" />
                <text x="14" y="24" fontSize="11" fill="#11120D" fontWeight="700">Performance Index</text>
                <text x="14" y="38" fontSize="9" fill="#898675">Optimal SEO & Core Web Vitals</text>

                {/* Progress bar */}
                <rect x="14" y="48" width="176" height="8" rx="4" fill="#F4EEDF" />
                <rect x="14" y="48" width="168" height="8" rx="4" fill="url(#hero-accent-grad)" />
                <circle cx="182" cy="52" r="5" fill="#10B981" className="v-pulse" />
              </g>
            </g>
          </g>

          {/* ── FLOATING SATELLITE VECTOR 1: ORBITING REACT ATOM (Top-Left) ── */}
          <g filter="url(#hero-card-shadow)" transform="translate(25, 20)" className="v-float-slow">
            <rect width="76" height="76" rx="18" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
            <g transform="translate(38, 38)">
              {/* Ellipse orbits */}
              <ellipse rx="22" ry="8" fill="none" stroke="#38BDF8" strokeWidth="1.6" transform="rotate(0)" className="v-spin-slow" />
              <ellipse rx="22" ry="8" fill="none" stroke="#38BDF8" strokeWidth="1.6" transform="rotate(60)" className="v-spin-slow" />
              <ellipse rx="22" ry="8" fill="none" stroke="#38BDF8" strokeWidth="1.6" transform="rotate(120)" className="v-spin-slow" />
              <circle cx="0" cy="0" r="4.5" fill="#38BDF8" className="v-pulse" />
            </g>
            <circle cx="62" cy="14" r="4" fill="#10B981" />
          </g>

          {/* ── FLOATING SATELLITE VECTOR 2: VECTOR PEN TOOL & BEZIER (Top-Right) ── */}
          <g filter="url(#hero-card-shadow)" transform="translate(470, 15)" className="v-float-med">
            <rect width="90" height="90" rx="20" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
            <g transform="translate(15, 15)">
              {/* Animated Bezier spline */}
              <path
                d="M 6 48 C 14 10, 46 60, 54 18"
                fill="none"
                stroke="#A855F7"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="v-dash-flow"
              />
              {/* Handle controls */}
              <line x1="6" y1="48" x2="16" y2="28" stroke="#D8CFBC" strokeWidth="1.5" />
              <circle cx="16" cy="28" r="3" fill="#A855F7" />
              <circle cx="6" cy="48" r="3.5" fill="#11120D" />
              <circle cx="54" cy="18" r="3.5" fill="#11120D" />

              {/* Vector Pen nib */}
              <g transform="translate(34, 18) rotate(-35)">
                <path d="M 0 0 L 10 -18 L 18 -10 L 0 0 Z" fill="#11120D" />
                <path d="M 0 0 L 4 -7" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="0" cy="0" r="1.5" fill="#F59E0B" />
              </g>
            </g>
          </g>

          {/* ── FLOATING SATELLITE VECTOR 3: SPEEDOMETER / CORE VITALS (Bottom-Left) ── */}
          <g filter="url(#hero-card-shadow)" transform="translate(15, 380)" className="v-float-reverse">
            <rect width="115" height="95" rx="18" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
            <g transform="translate(57, 52)">
              {/* Gauge arc */}
              <path
                d="M -30 0 A 30 30 0 1 1 30 0"
                fill="none"
                stroke="#F4EEDF"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M -30 0 A 30 30 0 1 1 24 -18"
                fill="none"
                stroke="#10B981"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Needle oscillating */}
              <g className="v-needle">
                <line x1="0" y1="2" x2="0" y2="-22" stroke="#11120D" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="0" r="4" fill="#11120D" />
              </g>
            </g>
            <text x="32" y="82" fontSize="11" fill="#10B981" fontWeight="800" fontFamily="sans-serif">
              100/100
            </text>
            <text x="75" y="82" fontSize="9" fill="#898675" fontWeight="600">
              FAST
            </text>
          </g>

          {/* ── FLOATING SATELLITE VECTOR 4: ROCKET LAUNCH WITH EXHAUST FLAME (Bottom-Right) ── */}
          <g filter="url(#hero-card-shadow)" transform="translate(460, 360)" className="v-float-slow">
            <rect width="105" height="110" rx="20" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
            <g transform="translate(52, 46)">
              {/* Star sparkles */}
              <g transform="translate(-32, -24)" className="v-sparkle">
                <path d="M0 -5 Q0 0 5 0 Q0 0 0 5 Q0 0 -5 0 Q0 0 0 -5 Z" fill="#F59E0B" />
              </g>
              <g transform="translate(28, -20)" className="v-sparkle" style={{ animationDelay: '0.8s' }}>
                <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="#8A7361" />
              </g>

              {/* Rocket Body */}
              <g transform="translate(0, -6)">
                {/* Wings */}
                <path d="M -15 14 L -22 24 L -12 22 Z" fill="#EF4444" />
                <path d="M 15 14 L 22 24 L 12 22 Z" fill="#EF4444" />
                {/* Fuselage */}
                <path d="M 0 -24 C 12 -12, 14 16, 12 22 L -12 22 C -14 16, -12 -12, 0 -24 Z" fill="#11120D" />
                {/* Nose Cone */}
                <path d="M 0 -24 C 5 -18, 7 -14, 7 -10 L -7 -10 C -7 -14, -5 -18, 0 -24 Z" fill="#EF4444" />
                {/* Porthole */}
                <circle cx="0" cy="0" r="5.5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="2" cy="-2" r="1.5" fill="#FFFFFF" />

                {/* Animated exhaust flame */}
                <g transform="translate(0, 22)" className="v-flame">
                  <path d="M -6 0 C -8 14, 0 24, 0 24 C 0 24, 8 14, 6 0 Z" fill="#F59E0B" />
                  <path d="M -3 0 C -4 8, 0 16, 0 16 C 0 16, 4 8, 3 0 Z" fill="#EF4444" />
                </g>
              </g>
            </g>
            <text x="30" y="98" fontSize="10" fill="#11120D" fontWeight="700" fontFamily="sans-serif">
              Ready to Go Live
            </text>
          </g>

          {/* Floating vector sparkles & geometric nodes */}
          <g transform="translate(240, 35)" className="v-sparkle">
            <path d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8 Z" fill="#8A7361" />
          </g>
          <g transform="translate(420, 480)" className="v-sparkle" style={{ animationDelay: '1.4s' }}>
            <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="#565449" />
          </g>
        </svg>
      </div>
    </div>
  );
}

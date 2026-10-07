import React from 'react';

export default function VectorBackground({ density = 'normal', style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="vb-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A7361" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#565449" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#11120D" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="vb-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A7361" stopOpacity="0" />
            <stop offset="30%" stopColor="#8A7361" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#565449" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8A7361" stopOpacity="0" />
          </linearGradient>

          <pattern id="vb-grid-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="1.2" fill="#565449" fillOpacity="0.22" />
          </pattern>

          <filter id="vb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Subtle dot matrix background */}
        <rect width="100%" height="100%" fill="url(#vb-grid-dots)" />

        {/* Ambient curving dynamic vector ribbons */}
        <g className="v-float-slow">
          <path
            d="M -100 250 C 300 120, 600 420, 1100 200 C 1300 110, 1500 280, 1600 350"
            stroke="url(#vb-line-grad)"
            strokeWidth="2"
            fill="none"
            className="v-dash-flow"
          />
          <path
            d="M -80 320 C 320 180, 650 480, 1150 260 C 1340 180, 1520 340, 1620 400"
            stroke="url(#vb-line-grad)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            fill="none"
          />
        </g>

        <g className="v-float-reverse">
          <path
            d="M -50 680 C 400 790, 800 520, 1200 690 C 1400 770, 1550 620, 1650 710"
            stroke="url(#vb-line-grad)"
            strokeWidth="1.8"
            fill="none"
            className="v-dash-flow-rev"
          />
        </g>

        {/* Floating Geometric Vector Glyphs */}
        {/* Diamond 1 */}
        <g transform="translate(180, 140)" className="v-spin-slow">
          <rect x="-14" y="-14" width="28" height="28" fill="none" stroke="#8A7361" strokeWidth="1.5" strokeOpacity="0.4" transform="rotate(45)" />
          <circle cx="0" cy="0" r="3" fill="#8A7361" fillOpacity="0.6" />
        </g>

        {/* Concentric rings with orbiting node */}
        <g transform="translate(1260, 190)" className="v-float-med">
          <circle cx="0" cy="0" r="42" stroke="#565449" strokeWidth="1" strokeDasharray="3 5" fill="none" strokeOpacity="0.35" className="v-spin-reverse-slow" />
          <circle cx="0" cy="0" r="24" stroke="#8A7361" strokeWidth="1.2" fill="none" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="4" fill="#8A7361" fillOpacity="0.8" />
          <circle cx="24" cy="0" r="3" fill="#11120D" fillOpacity="0.7" className="v-spin-slow" />
        </g>

        {/* Hexagon wireframe */}
        <g transform="translate(1100, 720)" className="v-spin-slow">
          <polygon
            points="0,-24 20,-12 20,12 0,24 -20,12 -20,-12"
            fill="none"
            stroke="#8A7361"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />
          <circle cx="0" cy="0" r="2.5" fill="#8A7361" fillOpacity="0.5" />
        </g>

        {/* Vector Crosshair 1 */}
        <g transform="translate(140, 680)" className="v-float-med">
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#565449" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#565449" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="0" cy="0" r="7" stroke="#8A7361" strokeWidth="1" strokeOpacity="0.35" fill="none" />
        </g>

        {/* Sparkle glyphs */}
        <g transform="translate(680, 120)" className="v-sparkle">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" fill="#8A7361" fillOpacity="0.4" />
        </g>
        <g transform="translate(820, 780)" className="v-sparkle" style={{ animationDelay: '1.2s' }}>
          <path d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8 Z" fill="#565449" fillOpacity="0.35" />
        </g>
      </svg>
    </div>
  );
}

import React from 'react';

export default function ContactVectorScene() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        height: 260,
        margin: '0 auto 24px',
      }}
    >
      <svg
        viewBox="0 0 420 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <filter id="contact-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#11120D" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient Radar / Signal rings */}
        <g transform="translate(110, 160)">
          <circle cx="0" cy="0" r="28" stroke="#8A7361" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.35" className="v-spin-slow" />
          <circle cx="0" cy="0" r="50" stroke="#565449" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.25" className="v-spin-reverse-slow" />
          <circle cx="0" cy="0" r="14" fill="#10B981" fillOpacity="0.15" />
          <circle cx="0" cy="0" r="5" fill="#10B981" className="v-pulse" />
        </g>

        {/* Dynamic Bezier Flight Path for Paper Airplane */}
        <path
          d="M 60 180 C 120 70, 240 230, 320 80"
          stroke="#8A7361"
          strokeWidth="2"
          strokeDasharray="6 6"
          strokeLinecap="round"
          fill="none"
          className="v-dash-flow"
        />

        {/* Floating Mail Envelope (Lower Left) */}
        <g filter="url(#contact-shadow)" transform="translate(70, 115)" className="v-float-med">
          <rect width="84" height="60" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          {/* Envelope fold flap */}
          <path d="M 0 0 L 42 32 L 84 0" stroke="#D8CFBC" strokeWidth="1.5" fill="#F4EEDF" />
          {/* Golden seal */}
          <circle cx="42" cy="30" r="7" fill="#F59E0B" />
          <circle cx="42" cy="30" r="3.5" fill="#FFFFFF" />
        </g>

        {/* Soaring Vector Paper Airplane (Top Right) */}
        <g filter="url(#contact-shadow)" transform="translate(290, 60)" className="v-float-slow">
          <g transform="rotate(22)">
            {/* Paper plane body */}
            <path d="M 0 0 L 50 -18 L 18 24 Z" fill="#11120D" />
            <path d="M 18 24 L 28 8 L 50 -18 Z" fill="#565449" />
            <path d="M 18 24 L 18 10 L 28 8 Z" fill="#8A7361" />
          </g>
        </g>

        {/* Message dispatch status badge */}
        <g filter="url(#contact-shadow)" transform="translate(250, 155)" className="v-float-reverse">
          <rect width="130" height="42" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          <circle cx="22" cy="21" r="5" fill="#10B981" className="v-pulse" />
          <text x="36" y="25" fontSize="11" fontWeight="700" fill="#11120D" fontFamily="sans-serif">
            Fast 24h Reply
          </text>
        </g>

        {/* Ambient sparkles */}
        <g transform="translate(40, 60)" className="v-sparkle">
          <path d="M0 -5 Q0 0 5 0 Q0 0 0 5 Q0 0 -5 0 Q0 0 0 -5 Z" fill="#F59E0B" />
        </g>
        <g transform="translate(370, 120)" className="v-sparkle" style={{ animationDelay: '1s' }}>
          <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="#8A7361" />
        </g>
      </svg>
    </div>
  );
}

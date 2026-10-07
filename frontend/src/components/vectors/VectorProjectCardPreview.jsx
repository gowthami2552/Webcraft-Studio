import React from 'react';

export default function VectorProjectCardPreview({ category = 'Portfolio', color = '#8A7361' }) {
  const cat = String(category).toLowerCase();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 280 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '85%', height: '85%' }}
      >
        <defs>
          <filter id={`v-proj-shadow-${color.replace('#', '')}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#11120D" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Ambient background vector nodes */}
        <circle cx="230" cy="35" r="28" stroke={color} strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.3" className="v-spin-slow" />
        <circle cx="45" cy="125" r="20" stroke={color} strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.25" className="v-spin-reverse-slow" />

        {/* Browser Frame */}
        <g filter={`url(#v-proj-shadow-${color.replace('#', '')})`} transform="translate(30, 20)">
          <rect width="220" height="120" rx="10" fill="#FFFFFF" stroke="#D8CFBC" strokeWidth="1.5" />
          {/* Header */}
          <rect width="220" height="20" rx="10" fill="#F4EEDF" />
          <path d="M 0 12 H 220 V 20 H 0 Z" fill="#F4EEDF" />
          <circle cx="12" cy="10" r="2.5" fill="#EF4444" />
          <circle cx="20" cy="10" r="2.5" fill="#F59E0B" />
          <circle cx="28" cy="10" r="2.5" fill="#10B981" />
          <rect x="42" y="5" width="110" height="10" rx="5" fill="#FFFFFF" />

          {/* Dynamic Category-Specific Vector Graphics */}
          {cat.includes('ai') ? (
            /* AI / Neural layout */
            <g transform="translate(15, 32)">
              <rect width="80" height="74" rx="6" fill="#11120D" />
              <circle cx="40" cy="37" r="12" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" className="v-spin-slow" fill="none" />
              <circle cx="40" cy="37" r="5" fill="#38BDF8" className="v-pulse" />
              <path d="M 22 37 L 58 37 M 40 19 L 40 55" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

              <rect x="95" y="6" width="90" height="8" rx="4" fill={color} />
              <rect x="95" y="20" width="75" height="5" rx="2.5" fill="#D8CFBC" />
              <rect x="95" y="30" width="85" height="5" rx="2.5" fill="#D8CFBC" />
              <rect x="95" y="44" width="60" height="20" rx="6" fill="#11120D" />
              <text x="110" y="58" fontSize="8" fill="#FFFFFF" fontWeight="700">Explore</text>
            </g>
          ) : cat.includes('e-com') || cat.includes('shop') ? (
            /* E-commerce preview */
            <g transform="translate(15, 32)">
              <rect width="85" height="74" rx="6" fill="#F4EEDF" stroke="#D8CFBC" strokeWidth="1" />
              {/* Product item with bouncing bag */}
              <g transform="translate(42, 34)" className="v-float-med">
                <rect x="-14" y="-14" width="28" height="28" rx="5" fill={color} />
                <path d="M -6 -14 C -6 -19, 6 -19, 6 -14" stroke="#FFFFFF" strokeWidth="2" fill="none" />
              </g>
              <rect x="100" y="8" width="85" height="8" rx="4" fill="#11120D" />
              <rect x="100" y="22" width="55" height="6" rx="3" fill="#10B981" />
              <rect x="100" y="36" width="75" height="4" rx="2" fill="#D8CFBC" />
              <rect x="100" y="46" width="65" height="4" rx="2" fill="#D8CFBC" />
              <circle cx="170" cy="58" r="8" fill="#F59E0B" className="v-pulse" />
            </g>
          ) : (
            /* Modern Portfolio / Business site layout */
            <g transform="translate(15, 30)">
              <rect x="0" y="5" width="90" height="10" rx="5" fill={color} />
              <rect x="0" y="20" width="120" height="5" rx="2.5" fill="#D8CFBC" />
              <rect x="0" y="29" width="100" height="5" rx="2.5" fill="#D8CFBC" />

              {/* Vector graph or mock cards */}
              <g transform="translate(0, 42)">
                <rect width="60" height="34" rx="6" fill="#F4EEDF" />
                <path d="M 6 24 L 20 14 L 35 18 L 52 8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="52" cy="8" r="2.5" fill={color} className="v-pulse" />
              </g>

              <g transform="translate(68, 42)">
                <rect width="55" height="34" rx="6" fill="#F4EEDF" />
                <circle cx="27" cy="17" r="9" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" fill="none" className="v-spin-slow" />
                <circle cx="27" cy="17" r="3.5" fill="#11120D" />
              </g>

              <g transform="translate(131, 10)">
                <rect width="54" height="66" rx="6" fill="#11120D" />
                <circle cx="27" cy="25" r="10" fill={color} fillOpacity="0.4" />
                <rect x="10" y="44" width="34" height="4" rx="2" fill="#FFFFFF" />
                <rect x="14" y="52" width="26" height="3" rx="1.5" fill="#898675" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

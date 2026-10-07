import React, { useState } from 'react';

export default function VectorLogo({ size = 36 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: size,
        height: size,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        <rect
          width="40"
          height="40"
          rx="10"
          fill="#11120D"
        />
        
        {/* Animated subtle border ring on hover */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="9"
          stroke={hovered ? '#F59E0B' : '#565449'}
          strokeWidth="1.5"
          strokeDasharray={hovered ? '4 4' : 'none'}
          className={hovered ? 'v-spin-slow' : ''}
          strokeOpacity={hovered ? 0.9 : 0.4}
        />

        {/* Dynamic Vector 'W' monogram with animated bezier strokes */}
        <path
          d="M 9 12 L 14 28 L 20 16 L 26 28 L 31 12"
          stroke="#FFFBF4"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic accent node */}
        <circle
          cx="20"
          cy="16"
          r="2.4"
          fill={hovered ? '#10B981' : '#F59E0B'}
          className={hovered ? 'v-pulse' : ''}
        />
      </svg>
    </div>
  );
}

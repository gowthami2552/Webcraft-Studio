import React from 'react';

export default function VectorWaveDivider({ flip = false, color = 'var(--bg2)', opacity = 1 }) {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'rotate(180deg)' : 'none',
        opacity: opacity,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'relative',
          display: 'block',
          width: 'calc(150% + 1.3px)',
          height: '48px',
          animation: 'vectorWaveShift 18s linear infinite',
        }}
      >
        <path
          d="M 0,0 C 150,90 350,-40 500,45 C 650,130 900,-10 1200,40 L 1200,120 L 0,120 Z"
          fill={color}
        />
        <path
          d="M 0,20 C 200,80 400,-10 600,60 C 800,120 1000,10 1200,50 L 1200,120 L 0,120 Z"
          fill={color}
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
}

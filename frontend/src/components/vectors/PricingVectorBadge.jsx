import React from 'react';

export default function PricingVectorBadge({ planName, size = 56 }) {
  const name = String(planName).toLowerCase();

  if (name.includes('landing')) {
    // Crown / Trophy with sparkling orbit
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="24" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 4" strokeOpacity="0.5" className="v-spin-slow" />
        <circle cx="28" cy="28" r="18" fill="#F4EEDF" />
        {/* Crown */}
        <path
          d="M 17 33 L 15 21 L 22 26 L 28 17 L 34 26 L 41 21 L 39 33 Z"
          fill="#F59E0B"
          stroke="#11120D"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="17" r="2.5" fill="#EF4444" />
        <circle cx="15" cy="21" r="2" fill="#3B82F6" />
        <circle cx="41" cy="21" r="2" fill="#10B981" />
        <g transform="translate(42, 12)" className="v-sparkle">
          <path d="M0 -3 Q0 0 3 0 Q0 0 0 3 Q0 0 -3 0 Q0 0 0 -3 Z" fill="#F59E0B" />
        </g>
      </svg>
    );
  }

  if (name.includes('commerce') || name.includes('store')) {
    // Diamond Gemstone with reflective facets
    return (
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="24" stroke="#8A7361" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.4" className="v-spin-reverse-slow" />
        <circle cx="28" cy="28" r="18" fill="#F4EEDF" />
        {/* Gemstone */}
        <polygon points="20,22 36,22 42,28 28,38 14,28" fill="#11120D" />
        <polygon points="20,22 36,22 33,28 23,28" fill="#565449" />
        <polygon points="23,28 33,28 28,38" fill="#8A7361" />
        <polygon points="14,28 23,28 28,38" fill="#3D3B33" />
        <polygon points="36,22 42,28 33,28" fill="#8A7361" />
        <circle cx="38" cy="16" r="3" fill="#10B981" className="v-pulse" />
      </svg>
    );
  }

  // Portfolio / Starter: Creative Spark compass
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" stroke="#D8CFBC" strokeWidth="1.5" strokeDasharray="3 4" className="v-spin-slow" />
      <circle cx="28" cy="28" r="16" fill="#F4EEDF" />
      {/* 4-point star spark */}
      <g transform="translate(28, 28)" className="v-sparkle">
        <path d="M0 -12 Q0 0 12 0 Q0 0 0 12 Q0 0 -12 0 Q0 0 0 -12 Z" fill="#11120D" />
        <circle cx="0" cy="0" r="3" fill="#F59E0B" />
      </g>
    </svg>
  );
}

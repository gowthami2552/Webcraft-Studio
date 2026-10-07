import React from 'react';

export default function ServiceVectorIcon({ type = 'code', size = 48, className = '' }) {
  const normType = String(type).toLowerCase().replace(/[-_]/g, '');

  // Render dedicated animated vector icon based on service category
  if (normType.includes('port') || normType === 'user') {
    // Portfolio: Canvas, profile badge, sparkle
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="10" width="32" height="28" rx="8" fill="#F4EEDF" stroke="#11120D" strokeWidth="2" />
        <circle cx="24" cy="20" r="5" fill="#11120D" />
        <path d="M 16 32 C 16 27, 20 27, 24 27 C 28 27, 32 27, 32 32" stroke="#11120D" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(34, 10)" className="v-sparkle">
          <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="#F59E0B" />
        </g>
        <circle cx="36" cy="34" r="3" fill="#10B981" className="v-pulse" />
      </svg>
    );
  }

  if (normType.includes('business') || normType.includes('briefcase')) {
    // Business: Geometric structure with rising growth trajectory line
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="14" width="32" height="24" rx="6" fill="#F4EEDF" stroke="#11120D" strokeWidth="2" />
        <path d="M 18 14 V 10 C 18 8.8, 19 8, 20.2 8 H 27.8 C 29 8, 30 8.8, 30 10 V 14" stroke="#11120D" strokeWidth="2" />
        {/* Animated rising trend line */}
        <path d="M 14 30 L 22 24 L 28 27 L 34 19" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="19" r="3" fill="#10B981" className="v-pulse" />
      </svg>
    );
  }

  if (normType.includes('landing') || normType.includes('monitor') || normType.includes('layout')) {
    // Landing Page: Screen with high-converting target arrow & radar ping
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="6" y="8" width="36" height="26" rx="6" fill="#F4EEDF" stroke="#11120D" strokeWidth="2" />
        <line x1="6" y1="16" x2="42" y2="16" stroke="#D8CFBC" strokeWidth="1.5" />
        <circle cx="11" cy="12" r="2" fill="#EF4444" />
        <circle cx="16" cy="12" r="2" fill="#F59E0B" />
        <circle cx="21" cy="12" r="2" fill="#10B981" />
        {/* Target radar */}
        <circle cx="24" cy="24" r="5" stroke="#F59E0B" strokeWidth="1.5" fill="none" className="v-pulse" />
        <path d="M 24 34 V 40 M 16 40 H 32" stroke="#11120D" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (normType.includes('ecom') || normType.includes('shop') || normType.includes('cart')) {
    // E-commerce: Animated cart with floating package
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M 8 10 H 13 L 18 28 H 34 L 38 14 H 14" stroke="#11120D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="36" r="3" fill="#11120D" />
        <circle cx="32" cy="36" r="3" fill="#11120D" />
        {/* Floating parcel with shadow */}
        <g transform="translate(26, 12)" className="v-float-med">
          <rect x="-6" y="-6" width="12" height="12" rx="3" fill="#F59E0B" stroke="#11120D" strokeWidth="1.5" />
          <line x1="0" y1="-6" x2="0" y2="6" stroke="#11120D" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  if (normType.includes('ui') || normType.includes('ux') || normType.includes('design') || normType.includes('palette') || normType.includes('pentool')) {
    // UI/UX: Interactive vector bezier curve and pen tool
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M 8 36 C 14 14, 34 38, 40 16" stroke="#A855F7" strokeWidth="2" fill="none" strokeLinecap="round" className="v-dash-flow" />
        <circle cx="8" cy="36" r="3" fill="#11120D" />
        <circle cx="40" cy="16" r="3" fill="#11120D" />
        {/* Pen tool nib */}
        <g transform="translate(24, 22) rotate(-45)">
          <path d="M 0 0 L 8 -12 L 14 -6 L 0 0 Z" fill="#11120D" />
          <circle cx="0" cy="0" r="1.5" fill="#F59E0B" />
        </g>
        <circle cx="34" cy="36" r="4" fill="#38BDF8" className="v-pulse" />
      </svg>
    );
  }

  if (normType.includes('ai') || normType.includes('brain') || normType.includes('cpu')) {
    // AI & Intelligent Systems: Neural node constellation with pulsing synapses
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Central Core */}
        <circle cx="24" cy="24" r="6" fill="#11120D" />
        <circle cx="24" cy="24" r="14" stroke="#8A7361" strokeWidth="1" strokeDasharray="3 3" fill="none" className="v-spin-slow" />
        {/* Synapse connections */}
        <line x1="24" y1="24" x2="10" y2="14" stroke="#A855F7" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="24" x2="38" y2="14" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="24" x2="14" y2="38" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="24" x2="36" y2="36" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        {/* Nodes */}
        <circle cx="10" cy="14" r="3.5" fill="#A855F7" className="v-pulse" />
        <circle cx="38" cy="14" r="3.5" fill="#38BDF8" className="v-pulse" />
        <circle cx="14" cy="38" r="3.5" fill="#10B981" className="v-pulse" />
        <circle cx="36" cy="36" r="3.5" fill="#F59E0B" className="v-pulse" />
      </svg>
    );
  }

  // Default: Code / Web Development with spinning micro-gear
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M 14 18 L 6 24 L 14 30" stroke="#11120D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 34 18 L 42 24 L 34 30" stroke="#11120D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="34" x2="28" y2="14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="v-pulse" />
      <circle cx="24" cy="8" r="2.5" fill="#10B981" />
    </svg>
  );
}

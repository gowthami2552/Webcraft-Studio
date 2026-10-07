import React from 'react';

export default function ProcessStepVector({ stepNumber, size = 64 }) {
  const num = parseInt(stepNumber, 10);

  switch (num) {
    case 1:
      // 01: Idea & Discovery - Pulsing filament, resonant thought waves, spark stars
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Radiating resonant pulse rings */}
          <circle cx="32" cy="28" r="24" stroke="#8A7361" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.4" className="v-spin-slow" />
          <circle cx="32" cy="28" r="19" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.3" className="v-pulse" />

          {/* Lightbulb glass */}
          <path
            d="M 22 28 C 22 22.5, 26.5 18, 32 18 C 37.5 18, 42 22.5, 42 28 C 42 32, 39 34.5, 38 38 L 26 38 C 25 34.5, 22 32, 22 28 Z"
            fill="#FFFBF4"
            stroke="#11120D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Glowing filament */}
          <path
            d="M 28 32 L 30 25 L 34 25 L 36 32"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="v-pulse"
          />

          {/* Base screw and contact */}
          <path d="M 26 38 H 38 M 27 42 H 37 M 29 46 H 35" stroke="#11120D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 30 46 C 30 48, 34 48, 34 46" stroke="#11120D" strokeWidth="2" strokeLinecap="round" />

          {/* Idea sparkles */}
          <g transform="translate(14, 14)" className="v-sparkle">
            <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="#F59E0B" />
          </g>
          <g transform="translate(50, 16)" className="v-sparkle" style={{ animationDelay: '0.7s' }}>
            <path d="M0 -3.5 Q0 0 3.5 0 Q0 0 0 3.5 Q0 0 -3.5 0 Q0 0 0 -3.5 Z" fill="#8A7361" />
          </g>
        </svg>
      );

    case 2:
      // 02: Plan & Design - Compass drafting tool, bezier curves, blueprint grid
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blueprint arc */}
          <path
            d="M 12 48 A 24 24 0 0 1 52 48"
            stroke="#8A7361"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="v-dash-flow"
          />

          {/* Active Bezier curve */}
          <path
            d="M 16 38 C 24 16, 40 46, 48 24"
            stroke="#A855F7"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="16" cy="38" r="3" fill="#11120D" />
          <circle cx="48" cy="24" r="3" fill="#11120D" />

          {/* Compass / drafting tool */}
          <g transform="translate(32, 14)">
            <circle cx="0" cy="0" r="3.5" fill="#11120D" />
            {/* Left arm */}
            <line x1="0" y1="0" x2="-14" y2="34" stroke="#11120D" strokeWidth="2.2" strokeLinecap="round" />
            {/* Right arm with pencil nib */}
            <line x1="0" y1="0" x2="14" y2="34" stroke="#11120D" strokeWidth="2.2" strokeLinecap="round" />
            {/* Crossbar */}
            <line x1="-7" y1="17" x2="7" y2="17" stroke="#8A7361" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 3:
      // 03: Build & Develop - Intermeshed rotating vector gears & glowing code brackets
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rotating Vector Gear */}
          <g transform="translate(32, 32)">
            <g className="v-spin-slow">
              <circle cx="0" cy="0" r="16" stroke="#D8CFBC" strokeWidth="4" strokeDasharray="6 6" fill="none" />
              <circle cx="0" cy="0" r="12" fill="#F4EEDF" stroke="#11120D" strokeWidth="1.5" />
            </g>
          </g>

          {/* Code brackets < / > */}
          <g transform="translate(32, 32)">
            <path
              d="M -16 -8 L -23 0 L -16 8"
              stroke="#11120D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 16 -8 L 23 0 L 16 8"
              stroke="#11120D"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="-3"
              y1="10"
              x2="3"
              y2="-10"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="v-pulse"
            />
          </g>

          {/* Micro dots */}
          <circle cx="14" cy="14" r="2.5" fill="#10B981" />
          <circle cx="50" cy="50" r="2" fill="#38BDF8" />
        </svg>
      );

    case 4:
      // 04: Test & Refine - Quality dial with oscillating needle and check badge
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Speed / quality arc */}
          <path
            d="M 16 42 A 20 20 0 1 1 48 42"
            fill="none"
            stroke="#D8CFBC"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 16 42 A 20 20 0 1 1 44 26"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Oscillating needle */}
          <g transform="translate(32, 36)" className="v-needle">
            <line x1="0" y1="2" x2="0" y2="-16" stroke="#11120D" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="0" cy="0" r="3.5" fill="#11120D" />
          </g>

          {/* Green checkmark validation seal */}
          <g transform="translate(42, 42)">
            <circle cx="8" cy="8" r="9" fill="#10B981" />
            <path
              d="M 4 8 L 7 11 L 12 5"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case 5:
    default:
      // 05: Launch - Vector Rocket lifting off with animated exhaust plume & orbital clouds
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Orbit trail */}
          <ellipse
            cx="32"
            cy="46"
            rx="22"
            ry="7"
            stroke="#8A7361"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            className="v-spin-slow"
          />

          {/* Rocket */}
          <g transform="translate(32, 24)" className="v-float-med">
            {/* Wings */}
            <path d="M -11 11 L -17 19 L -9 17 Z" fill="#EF4444" />
            <path d="M 11 11 L 17 19 L 9 17 Z" fill="#EF4444" />

            {/* Hull */}
            <path
              d="M 0 -19 C 9 -9, 10 12, 9 17 L -9 17 C -10 12, -9 -9, 0 -19 Z"
              fill="#11120D"
            />

            {/* Nose */}
            <path d="M 0 -19 C 4 -14, 5 -11, 5 -8 L -5 -8 C -5 -11, -4 -14, 0 -19 Z" fill="#EF4444" />

            {/* Porthole */}
            <circle cx="0" cy="0" r="4" fill="#38BDF8" stroke="#FFFBF4" strokeWidth="1.2" />

            {/* Thruster Flame */}
            <g transform="translate(0, 17)" className="v-flame">
              <path d="M -4 0 C -6 10, 0 17, 0 17 C 0 17, 6 10, 4 0 Z" fill="#F59E0B" />
              <path d="M -2 0 C -3 6, 0 11, 0 11 C 0 11, 3 6, 2 0 Z" fill="#EF4444" />
            </g>
          </g>

          {/* Sparkling stars */}
          <g transform="translate(12, 16)" className="v-sparkle">
            <path d="M0 -3 Q0 0 3 0 Q0 0 0 3 Q0 0 -3 0 Q0 0 0 -3 Z" fill="#F59E0B" />
          </g>
          <g transform="translate(52, 14)" className="v-sparkle" style={{ animationDelay: '0.9s' }}>
            <path d="M0 -3 Q0 0 3 0 Q0 0 0 3 Q0 0 -3 0 Q0 0 0 -3 Z" fill="#8A7361" />
          </g>
        </svg>
      );
  }
}

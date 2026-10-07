import { useEffect, useState } from 'react';

export default function CursorPuppy() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [flipped, setFlipped] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let moveTimeout;

    const onMouseMove = (e) => {
      // Determine direction for flipping the puppy
      if (e.clientX < currentX - 2) {
        setFlipped(true);
      } else if (e.clientX > currentX + 2) {
        setFlipped(false);
      }
      
      targetX = e.clientX;
      targetY = e.clientY;
      setIsMoving(true);
      
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      // Calculate distance
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      
      // Smooth spring physics follow
      currentX += dx * 0.08;
      currentY += dy * 0.08;
      
      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  // Hide cursor on touch devices where it doesn't make sense
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate(${position.x + 20}px, ${position.y + 20}px) scaleX(${flipped ? -1 : 1})`,
        fontSize: '28px',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
        // Bounce animation when moving
        animation: isMoving ? 'puppyBounce 0.3s infinite alternate' : 'none',
      }}
    >
      <style>{`
        @keyframes puppyBounce {
          from { margin-top: 0; }
          to { margin-top: -6px; }
        }
      `}</style>
      🐕
    </div>
  );
}

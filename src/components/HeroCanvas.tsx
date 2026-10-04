import React, { useEffect, useRef } from 'react';

/**
 * HeroCanvas — Full-screen subtle animated mesh gradient background.
 * Renders soft blobs of warm grays/creams that drift slowly,
 * creating a living, breathing ambient backdrop that never
 * competes with the typography above it.
 */
export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let H = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Soft blob orbs — warm off-white / light stone tones
    const orbs = [
      { x: 0.25, y: 0.30, r: 0.50, color: [218, 213, 205], speed: 0.00018, phase: 0.0 },
      { x: 0.75, y: 0.60, r: 0.55, color: [210, 206, 198], speed: 0.00014, phase: 1.2 },
      { x: 0.50, y: 0.85, r: 0.45, color: [225, 221, 215], speed: 0.00022, phase: 2.5 },
      { x: 0.10, y: 0.70, r: 0.40, color: [230, 226, 220], speed: 0.00016, phase: 3.8 },
      { x: 0.85, y: 0.15, r: 0.42, color: [222, 218, 210], speed: 0.00020, phase: 0.7 },
    ];

    let t = 0;

    const draw = () => {
      t++;

      // Base warm off-white fill
      ctx.fillStyle = '#F5F3EF';
      ctx.fillRect(0, 0, W, H);

      // Draw each drifting orb as a radial gradient
      for (const orb of orbs) {
        const angle = t * orb.speed * Math.PI * 2;
        const cx = (orb.x + Math.sin(angle + orb.phase) * 0.12) * W;
        const cy = (orb.y + Math.cos(angle + orb.phase * 0.7) * 0.10) * H;
        const radius = orb.r * Math.max(W, H);

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, gr, b] = orb.color;
        g.addColorStop(0,   `rgba(${r},${gr},${b},0.55)`);
        g.addColorStop(0.5, `rgba(${r},${gr},${b},0.20)`);
        g.addColorStop(1,   `rgba(${r},${gr},${b},0.00)`);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // Very subtle fine diagonal line texture for paper feel
      ctx.save();
      ctx.globalAlpha = 0.022;
      ctx.strokeStyle = '#7a7060';
      ctx.lineWidth = 0.5;
      const spacing = 42;
      for (let i = -H; i < W + H; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + H, H);
        ctx.stroke();
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

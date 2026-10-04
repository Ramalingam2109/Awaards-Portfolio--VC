import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking with smooth damping
    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.5;
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = width * 0.5;
      targetMouseY = height * 0.5;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', handleMouseMove);
    parent?.addEventListener('mouseleave', handleMouseLeave);

    // 3D Interactive Wave Topology Grid Parameters
    const cols = 45;
    const rows = 28;
    let time = 0;

    const render = () => {
      time += 0.018;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient glowing gradient following cursor
      const radialGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.min(width, height) * 0.65
      );
      radialGradient.addColorStop(0, 'rgba(230, 226, 218, 0.5)');
      radialGradient.addColorStop(0.5, 'rgba(242, 239, 233, 0.25)');
      radialGradient.addColorStop(1, 'rgba(250, 250, 250, 0)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Compute 3D Perspective Wave Grid Points
      const points: Array<Array<{ x: number; y: number; z: number; depthAlpha: number }>> = [];
      const horizonY = height * 0.22;
      const fov = 340;

      for (let r = 0; r < rows; r++) {
        const rowPoints: Array<{ x: number; y: number; z: number; depthAlpha: number }> = [];
        const zNorm = r / rows; // 0 (near horizon) to 1 (close to bottom)
        const z3D = (1 - zNorm) * 550 + 80;

        for (let c = 0; c < cols; c++) {
          const xNorm = (c - cols / 2) / (cols / 2); // -1 to 1
          const x3D = xNorm * (width * 0.75);

          // Wave height formula with multiple harmonics and mouse interaction
          const distFromMouse = Math.hypot(
            (c / cols) * width - mouseX,
            (r / rows) * height - mouseY
          );
          const mouseWave = Math.max(0, 1 - distFromMouse / 300) * 45 * Math.sin(time * 3 - distFromMouse * 0.02);

          const wave =
            Math.sin(c * 0.28 + time * 1.4) * 18 +
            Math.cos(r * 0.35 - time * 1.1) * 22 +
            Math.sin((c + r) * 0.18 + time) * 14 +
            mouseWave;

          const y3D = wave;

          // Project 3D -> 2D
          const scale = fov / (fov + z3D);
          const projX = width * 0.5 + x3D * scale;
          const projY = horizonY + (height * 0.75 - horizonY) * zNorm + y3D * scale * 1.8;

          const depthAlpha = Math.min(1, Math.max(0.04, zNorm * 0.85));

          rowPoints.push({ x: projX, y: projY, z: z3D, depthAlpha });
        }
        points.push(rowPoints);
      }

      // 3. Draw Grid Lines (Horizontal Waves)
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        const first = points[r][0];
        ctx.moveTo(first.x, first.y);

        for (let c = 1; c < cols; c++) {
          const pt = points[r][c];
          ctx.lineTo(pt.x, pt.y);
        }

        const alpha = points[r][Math.floor(cols / 2)].depthAlpha * 0.28;
        ctx.strokeStyle = `rgba(60, 55, 45, ${alpha})`;
        ctx.lineWidth = Math.max(0.6, (r / rows) * 1.4);
        ctx.stroke();
      }

      // 4. Draw Grid Lines (Vertical Perspective Lines)
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        ctx.moveTo(points[0][c].x, points[0][c].y);

        for (let r = 1; r < rows; r++) {
          const pt = points[r][c];
          ctx.lineTo(pt.x, pt.y);
        }

        const alpha = (c % 4 === 0 ? 0.2 : 0.1) * (1 - Math.abs(c - cols / 2) / (cols / 2));
        ctx.strokeStyle = `rgba(80, 75, 65, ${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // 5. Draw Glowing Floating Particle Intersections on Front Nodes
      for (let r = Math.floor(rows * 0.35); r < rows; r += 2) {
        for (let c = 0; c < cols; c += 3) {
          const pt = points[r][c];
          const distToMouse = Math.hypot(pt.x - mouseX, pt.y - mouseY);
          const isNearMouse = distToMouse < 160;

          ctx.beginPath();
          const nodeRadius = isNearMouse ? 2.5 : 1.2;
          ctx.arc(pt.x, pt.y, nodeRadius, 0, Math.PI * 2);

          if (isNearMouse) {
            ctx.fillStyle = 'rgba(17, 17, 17, 0.75)';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 6;
          } else {
            ctx.fillStyle = `rgba(120, 115, 105, ${pt.depthAlpha * 0.45})`;
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent?.removeEventListener('mousemove', handleMouseMove);
      parent?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

/* eslint-disable prefer-const */
import React, { useRef, useEffect } from 'react';

interface Mouse {
  x: number;
  y: number;
  active: boolean;
}

// --- Particle Class (Moved outside) ---
class Particle {
  x: number;
  y: number;
  speed: number;
  history: { x: number; y: number }[];
  timer: number;
  colorOffset: number;
  maxSpeed: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.maxSpeed = Math.random() * 2 + 1;
    this.speed = this.maxSpeed;
    this.history = [];
    this.timer = Math.random() * 100;
    this.colorOffset = Math.random() * 100;
  }

  update(width: number, height: number, gridSize: number, cols: number, rows: number, flowField: number[], mouse: Mouse) {
    this.timer++;
    let xGrid = Math.floor(this.x / gridSize);
    let yGrid = Math.floor(this.y / gridSize);
    xGrid = Math.max(0, Math.min(xGrid, cols - 1));
    yGrid = Math.max(0, Math.min(yGrid, rows - 1));
    
    const index = xGrid + yGrid * cols;
    let angle = flowField[index] || 0;
    
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150 && mouse.active) {
        const repelAngle = Math.atan2(dy, dx);
        const force = (150 - distance) / 150;
        angle = angle * (1 - force) + repelAngle * force;
        this.speed = this.maxSpeed + (force * 2);
    } else {
        this.speed = this.maxSpeed;
    }

    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;

    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.history = [];
    }

    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 10) this.history.shift();
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.history.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 1; i < this.history.length; i++) ctx.lineTo(this.history[i].x, this.history[i].y);
    const mix = (Math.sin(this.timer * 0.02 + this.colorOffset) + 1) / 2;
    const r = Math.floor(14 * (1 - mix) + 132 * mix);
    const g = Math.floor(165 * (1 - mix) + 204 * mix);
    const b = Math.floor(233 * (1 - mix) + 22 * mix);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + mix * 0.3})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

const FlowingField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const GRID_SIZE = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    const mouse = { x: -1000, y: -1000, active: false };
    let cols = Math.floor(width / GRID_SIZE);
    let rows = Math.floor(height / GRID_SIZE);
    let flowField = new Array(cols * rows);

    const particles = Array.from({ length: 300 }, () => new Particle(width, height));
    let time = 0;

    const animate = () => {
      time += 0.002;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          flowField[x + y * cols] = (Math.cos(x * 0.1 + time) + Math.sin(y * 0.1 + time)) * Math.PI;
        }
      }
      ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
      ctx.fillRect(0, 0, width, height);
      particles.forEach(p => {
        p.update(width, height, GRID_SIZE, cols, rows, flowField, mouse);
        p.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default FlowingField;
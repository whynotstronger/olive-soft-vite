import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

// --- Configuration Constants ---
const GLOBE_RADIUS_FACTOR = 0.40;
const DOT_RADIUS = 2;
const DOT_COUNT = 180;
const COLOR_PRIMARY = { r: 14, g: 165, b: 233 };   // Cyan
const COLOR_SECONDARY = { r: 132, g: 204, b: 22 }; // Lime

// --- 3D Point class (Moved outside) ---
class Point {
  x: number; y: number; z: number;
  theta: number; phi: number;
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
    this.theta = Math.random() * Math.PI * 2;
    this.phi = Math.acos((Math.random() * 2) - 1);
    this.x = 0; this.y = 0; this.z = 0;
    this.updateCoords();
  }

  updateCoords() {
    this.x = this.radius * Math.sin(this.phi) * Math.cos(this.theta);
    this.y = this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.z = this.radius * Math.cos(this.phi);
  }

  rotate(rotationX: number, rotationY: number) {
    // eslint-disable-next-line prefer-const
    let x1 = this.x * Math.cos(rotationY) - this.z * Math.sin(rotationY);
    // eslint-disable-next-line prefer-const
    let z1 = this.z * Math.cos(rotationY) + this.x * Math.sin(rotationY);
    // eslint-disable-next-line prefer-const
    let y1 = this.y * Math.cos(rotationX) - z1 * Math.sin(rotationX);
    // eslint-disable-next-line prefer-const
    let z2 = z1 * Math.cos(rotationX) + this.y * Math.sin(rotationX);
    this.x = x1; this.y = y1; this.z = z2;
  }

  draw(ctx: CanvasRenderingContext2D, center: {x: number, y: number}, radius: number) {
    const scale = (radius * 2) / ((radius * 2) - this.z);
    const x2d = this.x * scale + center.x;
    const y2d = this.y * scale + center.y;
    const size = Math.max(0.1, scale * DOT_RADIUS);
    const alpha = Math.max(0.05, (this.z + radius) / (radius * 2));
    const mix = (this.x / radius + 1) / 2;
    const r = COLOR_PRIMARY.r * (1 - mix) + COLOR_SECONDARY.r * mix;
    const g = COLOR_PRIMARY.g * (1 - mix) + COLOR_SECONDARY.g * mix;
    const b = COLOR_PRIMARY.b * (1 - mix) + COLOR_SECONDARY.b * mix;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
    ctx.fill();
    return { x: x2d, y: y2d, scale };
  }
}

const NeuralGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    let globeRadius = Math.min(width, height) * GLOBE_RADIUS_FACTOR;
    const connectionDistance = globeRadius * 0.25;

    const points = Array.from({ length: DOT_COUNT }, () => new Point(globeRadius));
    let rotationX = 0.001; 
    let rotationY = 0.002;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      if (canvas.parentElement && (canvas.width !== canvas.parentElement.clientWidth || canvas.height !== canvas.parentElement.clientHeight)) {
          width = canvas.width = canvas.parentElement.clientWidth;
          height = canvas.height = canvas.parentElement.clientHeight;
          globeRadius = Math.min(width, height) * GLOBE_RADIUS_FACTOR;
      }

      const center = { x: width / 2, y: height / 2 };
      const projectedPoints = points.map(p => {
        p.rotate(rotationX, rotationY);
        return p.draw(ctx, center, globeRadius);
      });

      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2) + Math.pow(points[i].z - points[j].z, 2));
          if (d < connectionDistance) {
            const p1 = projectedPoints[i];
            const p2 = projectedPoints[j];
            const alpha = (1 - d / connectionDistance) * 0.3 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    animate();
    const handleMouseMove = (e: MouseEvent) => {
      rotationY = (e.clientX / window.innerWidth - 0.5) * 0.01;
      rotationX = (e.clientY / window.innerHeight - 0.5) * 0.01;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const DreamInput: React.FC = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [text, setText] = useState('');
  
  const phrases = ["a Mobile App for Fintech", "an AI Customer Support Agent", "a SaaS Platform for Real Estate", "a Modern E-Commerce Store"];
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];
      setPlaceholder(isDeleting ? fullText.substring(0, placeholder.length - 1) : fullText.substring(0, placeholder.length + 1));

      if (!isDeleting && placeholder === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && placeholder === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else {
        timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
      }
    };
    timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum]);

  return (
    <form className="w-full max-w-lg mt-12">
      <div className="relative group">
        <div className="absolute -inset-1 bg-brand-gradient rounded-xl blur opacity-25 group-hover:opacity-50 transition"></div>
        <div className="relative flex items-center bg-white/90 backdrop-blur-xl rounded-xl border p-1.5">
           <div className="pl-4 pr-2"><Sparkles size={18} className="text-brand-secondary" /></div>
           <input type="text" className="w-full bg-transparent outline-none p-2" placeholder={placeholder} value={text} onChange={(e) => setText(e.target.value)} />
           <button className="bg-slate-900 text-white p-3 rounded-lg"><ArrowRight size={20} /></button>
        </div>
      </div>
    </form>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 z-0"><NeuralGlobe /></div>
      <div className="relative z-20 max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-6">
              Turning ideas into <span className="text-transparent bg-clip-text bg-brand-gradient">Digital Reality.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">Olivesoft is your partner for custom software development. We build scalable web and mobile projects.</p>
            <div className="flex gap-4"><DreamInput /></div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
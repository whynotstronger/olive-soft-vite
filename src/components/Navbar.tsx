import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Globe, Facebook, Linkedin } from 'lucide-react';

const Logo: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Side - Tech Brain (Cyan/Teal) */}
    <path d="M50 10 C 30 10, 10 30, 10 50 C 10 70, 25 85, 45 90" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
    <circle cx="30" cy="35" r="4" fill="#0ea5e9" />
    <circle cx="20" cy="55" r="4" fill="#0ea5e9" />
    <circle cx="35" cy="70" r="4" fill="#0ea5e9" />
    <path d="M30 35 L 45 45 M 20 55 L 40 55 M 35 70 L 48 60" stroke="#0ea5e9" strokeWidth="2" />
    
    {/* Right Side - Organic Leaf (Green) */}
    <path d="M55 90 C 75 85, 90 70, 90 50 C 90 30, 70 10, 50 10" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" />
    <path d="M50 10 Q 50 90 50 90" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" />
    <path d="M50 30 L 70 20 M 50 50 L 75 45 M 50 70 L 70 80" stroke="#84cc16" strokeWidth="3" strokeLinecap="round" />
    
    <defs>
      <linearGradient id="gradient" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ea5e9" />
        <stop offset="1" stopColor="#84cc16" />
      </linearGradient>
    </defs>
  </svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Case Studies', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed w-full z-50 flex flex-col">
      {/* Top Bar - "The Touch to Bring the Client" */}
      <div className={`w-full bg-slate-950 text-slate-400 text-xs py-2 px-4 transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
           {/* Locations */}
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                 <Globe size={12} className="text-brand-primary" />
                 <span>Paris, France</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                 <Globe size={12} className="text-brand-secondary" />
                 <span>Sfax, Tunisie</span>
              </div>
              <span className="hidden md:inline text-slate-700">|</span>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                 <Globe size={12} className="text-brand-accent" />
                 <span>Dubai, UAE</span>
              </div>
           </div>

           {/* Contact & Socials */}
           <div className="flex items-center gap-6">
              <a href="mailto:contact@olivesoft.fr" className="flex items-center gap-1.5 hover:text-brand-primary transition-colors">
                <Mail size={12} />
                <span>contact@olivesoft.fr</span>
              </a>
              <a href="tel:+33177627043" className="flex items-center gap-1.5 hover:text-brand-secondary transition-colors">
                <Phone size={12} />
                <span>(+33) 1 77 62 70 43</span>
              </a>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-800 ml-2">
                 <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={12} /></a>
                 <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={12} /></a>
              </div>
           </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg">
              <Logo />
            </div>
            <span className={`font-bold text-2xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Olivesoft<span className="text-brand-secondary">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 hover:text-transparent hover:bg-clip-text hover:bg-brand-gradient transition-all"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-brand-gradient transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-brand-primary/40 transform hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-700 hover:text-brand-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-6 border-t border-slate-100 animate-fade-in-down">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium text-slate-800 hover:text-brand-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Top Bar Info duplicated here for visibility */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Globe size={16} className="text-brand-primary" /> Paris • Sfax • Dubai
              </div>
              <a href="mailto:contact@olivesoft.fr" className="flex items-center gap-2 text-slate-600 text-sm">
                <Mail size={16} /> contact@olivesoft.fr
              </a>
               <a href="tel:+33177627043" className="flex items-center gap-2 text-slate-600 text-sm">
                <Phone size={16} /> (+33) 1 77 62 70 43
              </a>
            </div>

            <a 
              href="#contact" 
              className="w-full text-center py-4 bg-brand-gradient text-white rounded-xl font-bold text-lg shadow-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Project
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
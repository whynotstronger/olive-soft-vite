import React from 'react';
import { Globe, Mail, Phone, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Locations */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Globe className="text-brand-primary" size={20} /> Global Presence
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 group-hover:scale-125 transition-transform"></span>
                <span className="group-hover:text-white transition-colors">Paris - France</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary mt-2 group-hover:scale-125 transition-transform"></span>
                <span className="group-hover:text-white transition-colors">Sfax, Tunis - Tunisie</span>
              </li>
              <li className="flex items-start gap-3 group">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 group-hover:scale-125 transition-transform"></span>
                <span className="group-hover:text-white transition-colors">Dubai - Emirates Arabes Unis</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <div className="flex flex-col gap-6">
              <a href="mailto:contact@olivesoft.fr" className="flex items-center gap-4 group p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 transition-all border border-slate-800 hover:border-brand-primary/30">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:bg-white transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Email</div>
                  <div className="text-white font-medium group-hover:text-brand-primary transition-colors">contact@olivesoft.fr</div>
                </div>
              </a>

              <a href="tel:+33177627043" className="flex items-center gap-4 group p-4 rounded-xl bg-slate-900/50 hover:bg-slate-800 transition-all border border-slate-800 hover:border-brand-secondary/30">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-secondary group-hover:bg-white transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</div>
                  <div className="text-white font-medium group-hover:text-brand-secondary transition-colors">(+33) 1 77 62 70 43</div>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Socials & Branding */}
          <div className="space-y-4">
             <h4 className="text-white font-bold text-lg mb-6">Connect</h4>
             <div className="flex gap-4 mb-8">
                <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20">
                  <Facebook size={20} /> Facebook
                </a>
                <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[#0A66C2] hover:bg-[#095eb3] text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20">
                  <Linkedin size={20} /> LinkedIn
                </a>
             </div>
             <p className="text-slate-500 leading-relaxed">
               Follow our journey as we build the future of digital solutions.
             </p>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-bold text-white">
            Olivesoft<span className="text-brand-secondary">.</span>
          </div>
          <div className="text-slate-500">
            &copy; {new Date().getFullYear()} Olivesoft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
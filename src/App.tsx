import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Surprise from './components/Surprise';
import SuccessStories from './components/SuccessStories';
import FlowingField from './components/FlowingField';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SuccessStories />
        
        {/* Process / Why Us Section - Now with Flowing Field Animation */}
        <section id="process" className="relative py-32 bg-slate-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
             <FlowingField />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              Our Methodology
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-16">
              How We Cultivate <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Success</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Audit", desc: "We analyze your needs and technical constraints." },
                { step: "02", title: "Design", desc: "We craft intuitive UI/UX focused on conversion." },
                { step: "03", title: "Develop", desc: "We build with clean, scalable, and secure code." },
                { step: "04", title: "Scale", desc: "We deploy and optimize for growth." }
              ].map((item, i) => (
                <div key={i} className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/20">
                  <div className="text-6xl font-black text-white/5 absolute -top-4 -right-4 z-0 group-hover:text-white/10 transition-colors duration-500 scale-150">{item.step}</div>
                  <div className="relative z-10">
                    <div className="w-12 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mb-6 rounded-full"></div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-200 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <Surprise />
    </div>
  );
};

export default App;

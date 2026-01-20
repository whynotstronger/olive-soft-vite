import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
          {/* Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            
            <div className="text-white">
              <span className="text-brand-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Contact Us</span>
              <h2 className="text-4xl font-extrabold mb-6">Let's build something <br/>extraordinary.</h2>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                Ready to transform your business? Whether you have a detailed specification or just a rough idea, we're here to help you define and execute your vision.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Headquarters</h4>
                    <p className="text-slate-400">12 Avenue des Champs-Élysées, Paris</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Email Us</h4>
                    <p className="text-slate-400">contact@olivesoft.fr</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Call Us</h4>
                    <p className="text-slate-400">+33 1 23 45 67 89</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Start a conversation</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Project Details</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your goals..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-brand-gradient transition-all shadow-lg hover:shadow-brand-primary/30 flex items-center justify-center gap-2"
                >
                  Send Request <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
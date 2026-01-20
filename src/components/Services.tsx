import React from 'react';
import { Smartphone, Globe, Cpu, Cloud, Code, ShieldCheck } from 'lucide-react';

const services = [
  {
    id: 'web',
    title: 'Web Platforms',
    description: 'Scalable, high-performance web applications built for growth and conversion.',
    icon: Globe,
    features: ['Next.js & React Architecture', 'SEO-First Development', 'Progressive Web Apps (PWA)'],
    theme: 'cyan',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    dotColor: 'bg-cyan-500',
    borderColor: 'group-hover:border-cyan-400',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'mobile',
    title: 'Mobile Ecosystems',
    description: 'Native-feel applications that engage users and dominate app stores.',
    icon: Smartphone,
    features: ['React Native Cross-Platform', 'iOS & Android Deployment', 'Offline-First Architecture'],
    theme: 'lime',
    iconBg: 'bg-lime-50',
    iconColor: 'text-lime-600',
    dotColor: 'bg-lime-500',
    borderColor: 'group-hover:border-lime-400',
    gradient: 'from-lime-400 to-green-500'
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Integrate Gemini and LLMs to automate workflows, analyze data, and create smart interfaces.',
    icon: Cpu,
    features: ['Chatbots & Intelligent Agents', 'Predictive Analytics', 'Process Automation'],
    theme: 'purple',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    dotColor: 'bg-purple-500',
    borderColor: 'group-hover:border-purple-400',
    gradient: 'from-purple-400 to-fuchsia-500'
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Resilient infrastructure designed to scale with your business needs.',
    icon: Cloud,
    features: ['AWS / GCP / Azure', 'CI/CD Pipelines', 'Kubernetes Orchestration'],
    theme: 'sky',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    dotColor: 'bg-sky-500',
    borderColor: 'group-hover:border-sky-400',
    gradient: 'from-sky-400 to-indigo-500'
  },
  {
    id: 'api',
    title: 'Custom APIs',
    description: 'Robust backends connecting your data, services, and third-party tools.',
    icon: Code,
    features: ['GraphQL & REST', 'Microservices Architecture', 'Secure Data Handling'],
    theme: 'indigo',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    dotColor: 'bg-indigo-500',
    borderColor: 'group-hover:border-indigo-400',
    gradient: 'from-indigo-400 to-violet-500'
  },
  {
    id: 'audit',
    title: 'Tech Audit',
    description: 'Deep-dive analysis to secure, optimize, and future-proof your stack.',
    icon: ShieldCheck,
    features: ['Security Assessment', 'Performance Optimization', 'Scalability Roadmap'],
    theme: 'rose',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    dotColor: 'bg-rose-500',
    borderColor: 'group-hover:border-rose-400',
    gradient: 'from-rose-400 to-red-500'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Engineered for <span className="text-transparent bg-clip-text bg-brand-gradient">Impact.</span>
          </h2>
          <p className="text-xl text-slate-600">
            We don't just deliver code; we deliver competitive advantages. Select a domain to see how we can elevate your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`group relative bg-white rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-[3px] border-transparent ${service.borderColor} flex flex-col h-full overflow-hidden`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${service.iconBg}`}>
                <service.icon size={32} className={service.iconColor} />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              
              {/* Description */}
              <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${service.dotColor}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bottom Gradient Bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-auto">
                <div className={`h-full w-full bg-gradient-to-r ${service.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out`}></div>
              </div>
              
              {/* Subtle Background Glow on Hover */}
              <div className={`absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500 pointer-events-none rounded-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

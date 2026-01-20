import React, { useState } from 'react';
import { Calculator, X, Check, DollarSign, Clock } from 'lucide-react';

const Surprise: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-open logic (optional, currently manual trigger)
  // React.useEffect(() => { setTimeout(() => setIsOpen(true), 8000); }, []);

  const handleSelect = (value: string) => {
    setSelections([...selections, value]);
    setIsAnimating(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsAnimating(false);
    }, 400);
  };

  const steps = [
    {
      question: "What type of project is this?",
      options: [
        { label: "Web Platform", icon: "🌐" },
        { label: "Mobile App", icon: "📱" },
        { label: "AI Integration", icon: "🤖" },
        { label: "Something else", icon: "✨" }
      ]
    },
    {
      question: "What is your main goal?",
      options: [
        { label: "Launch MVP", icon: "🚀" },
        { label: "Scale Up", icon: "📈" },
        { label: "Modernize", icon: "🛠️" },
        { label: "Automate", icon: "⚡" }
      ]
    },
    {
      question: "What's your timeline?",
      options: [
        { label: "ASAP (< 1 mo)", icon: "🔥" },
        { label: "1-3 Months", icon: "📅" },
        { label: "3-6 Months", icon: "🗓️" },
        { label: "Flexible", icon: "⏳" }
      ]
    }
  ];

  if (!isOpen) return (
    <button 
      onClick={() => { setIsOpen(true); setStep(0); setSelections([]); }}
      className="fixed bottom-6 left-6 z-40 bg-white text-slate-900 p-2 pr-4 rounded-full shadow-xl hover:scale-105 transition-transform animate-bounce-slow flex items-center gap-3 group border border-slate-100"
    >
      <div className="bg-brand-gradient text-white rounded-full p-2.5 shadow-lg">
        <Calculator size={20} />
      </div>
      <div className="text-left">
        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Curious?</span>
        <span className="block text-sm font-bold text-slate-900">Estimate Project</span>
      </div>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator size={18} className="text-brand-primary" /> 
              Project Estimator
            </h3>
            <p className="text-xs text-slate-500">Get a rough idea in 30 seconds</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 3 && (
          <div className="w-full h-1 bg-slate-100">
            <div 
              className="h-full bg-brand-gradient transition-all duration-500 ease-out" 
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Content */}
        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {step < 3 ? (
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
              <h4 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                {steps[step].question}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group"
                  >
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{opt.icon}</span>
                    <span className="font-bold text-slate-700 group-hover:text-brand-primary">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Check size={40} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Estimate Ready!</h4>
              <p className="text-slate-600 mb-8">Based on your needs ({selections[0]}, {selections[1]}), we've prepared a preliminary plan.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <DollarSign className="w-6 h-6 text-brand-primary mx-auto mb-2" />
                  <div className="text-sm text-slate-500">Est. Budget</div>
                  <div className="font-bold text-slate-900">Custom Quote</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <Clock className="w-6 h-6 text-brand-secondary mx-auto mb-2" />
                  <div className="text-sm text-slate-500">Est. Timeline</div>
                  <div className="font-bold text-slate-900">{selections[2]}</div>
                </div>
              </div>

              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-brand-gradient transition-all shadow-lg hover:shadow-brand-primary/30"
              >
                Book Free Consultation to View Details
              </a>
              <p className="text-xs text-slate-400 mt-4">
                *This is a rough estimate. Final terms require a detailed audit.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Surprise;

import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    category: "CENTRALIZED FASHION CRM",
    title: "Turning Data Overload into Clear Customer Insights",
    description: "How we turned scattered data into clear insights, creating a unified CRM for smarter decisions and growth.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop", // Dark tech dashboard vibe
    color: "bg-slate-900"
  },
  {
    id: 2,
    category: "RETAIL ANALYTICS",
    title: "From Fragmented Data To Growth: Empowering Sales With Data",
    description: "How We Helped a Retail & E-Commerce Brand Unlock the Power of Unified Customer Intelligence.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop", // Light illustration/people vibe
    color: "bg-white"
  },
  {
    id: 3,
    category: "AI FORECASTING",
    title: "Transforming Forecasting with AI-powered Dashboards",
    description: "How we transformed raw data into predictive insights reshaping forecasting and decision-making.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop", // Teal data vibe
    color: "bg-teal-900"
  }
];

const SuccessStories: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn more about the projects that Olivesoft delivered, the technical assistance and business objectives achieved.
          </p>
        </div>

        {/* Carousel / Grid */}
        <div className="relative">
          
          {/* Decorative Navigation Arrows (Visual only for this demo) */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-brand-primary hidden lg:block transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-slate-400 hover:text-brand-primary hidden lg:block transition-colors">
            <ChevronRight size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <div key={story.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col h-full">
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden">
                  <div className={`absolute inset-0 ${story.color} mix-blend-multiply opacity-60 z-10 group-hover:opacity-40 transition-opacity`}></div>
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 right-6 z-20">
                    <span className="inline-block text-xs font-bold text-white/90 uppercase tracking-widest mb-1 shadow-black/50 drop-shadow-md">
                      {story.category}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight shadow-black/50 drop-shadow-md line-clamp-2">
                      {story.title}
                    </h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-brand-primary transition-colors">
                    {story.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-end mt-auto">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-brand-primary transition-colors flex items-center gap-2 cursor-pointer">
                      Read More <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

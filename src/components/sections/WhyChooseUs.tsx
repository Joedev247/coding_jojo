'use client';
import React from 'react';
import { CheckCircle, Star, Award, Zap, Users, Clock, Shield, BookOpen, Sparkles } from 'lucide-react';

export function WhyChooseUsSection() {
  const features = [
    {
      icon: <Star className="h-6 w-6 text-white" />,
      title: "Personalized Learning Path",
      description: "AI-driven curriculum tailored to your skill level, learning style, and career goals.",
      color: "#FF6B6B",
      secondaryColor: "#FFA500"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Learn From Industry Experts",
      description: "Get mentored by professionals with real-world experience in top tech companies.",
      color: "#FFA500",
      secondaryColor: "#FF6B6B"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Project-Based Learning",
      description: "Apply knowledge through practical projects that build your portfolio for employers.",
      color: "#9C27B0",
      secondaryColor: "#FF6B6B"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Learn at Your Pace",
      description: "Flexible scheduling to fit your lifestyle with 24/7 access to course materials.",
      color: "#FF6B6B",
      secondaryColor: "#9C27B0"
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Intelligent Feedback System",
      description: "Receive immediate, constructive feedback on your code with personalized suggestions.",
      color: "#FFA500",
      secondaryColor: "#9C27B0"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Job-Ready Certification",
      description: "Earn recognized credentials that verify your skills to potential employers.",
      color: "#9C27B0",
      secondaryColor: "#FFA500"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 font-['Montserrat',sans-serif]">
      {/* Background Pattern and Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ff6b6b' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-sm font-medium border border-[#FF6B6B]/20 mb-4">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
              Why Choose Coding Jojo
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 mb-6">
            The <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">Smart Way</span> to Master Coding
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our innovative approach combines cutting-edge AI technology with expert instruction to create a 
            personalized learning experience that adapts to your unique needs and goals.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              {/* Card with gradient border */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
                {/* Feature Icon */}
                <div 
                  className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to right, ${feature.color}, ${feature.secondaryColor})`
                  }}
                >
                  {feature.icon}
                </div>
                
                {/* Feature Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                
                {/* Feature Description */}
                <p className="text-gray-600">{feature.description}</p>
                
                {/* Gradient Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${feature.color}, ${feature.secondaryColor})`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-lg font-medium border border-[#FF6B6B]/20">
            <Award className="h-5 w-5 text-[#FF6B6B]" />
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
              Join over 10,000+ learners who've advanced their coding careers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


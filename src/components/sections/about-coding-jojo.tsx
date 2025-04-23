'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Globe, Code, BookOpen } from 'lucide-react';

export function AboutCodingJojo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with subtle accent */}
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-gradient-to-r from-rose-50 to-amber-50 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              The Visionary
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Meet Our Founder</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo Grid - Left Side */}
          <div className={`space-y-6 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'} transition-all duration-1000`}>
            {/* Main photo with overlapping grid */}
            <div className="relative">
              {/* Main photo with gradient border */}
              <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-1 z-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-80 mix-blend-multiply"></div>
                <img 
                  src="/joe.jpg" 
                  alt="Joseph Jose Oribaloye - CEO of Coding Jojo" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Small supporting photos */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-lg overflow-hidden shadow-lg border-4 border-white z-10 transform -rotate-3">
                <img 
                  src="/joe.jpg" 
                  alt="Coding Jojo workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-lg overflow-hidden shadow-lg border-4 border-white z-10 transform rotate-6">
                <img 
                  src="/joe.jpg" 
                  alt="Joseph teaching code" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
                    <Code className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Experience</div>
                    <div className="text-xl font-bold text-gray-800">10+ Years</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Students</div>
                    <div className="text-xl font-bold text-gray-800">10,000+</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center mt-6 gap-4">
              {[
                { icon: <Github className="w-5 h-5" />, color: "#333" },
                { icon: <Linkedin className="w-5 h-5" />, color: "#0077B5" },
                { icon: <Twitter className="w-5 h-5" />, color: "#1DA1F2" },
                { icon: <Globe className="w-5 h-5" />, color: "#F43F5E" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm" 
                  style={{ backgroundColor: `${social.color}15`, color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Content Column - Right Side */}
          <div className={`space-y-6 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'} transition-all duration-1000 delay-300`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Joseph Jose Oribaloye</h2>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"></div>
                <h3 className="text-lg font-medium text-gray-600">Founder & CEO, Coding Jojo</h3>
              </div>
            </div>
            
            <div className="space-y-5 text-gray-600 text-lg">
              <p className="leading-relaxed">
                As a self-taught developer who navigated the challenging landscape of learning to code without proper guidance, Joseph founded Coding Jojo with a profound purpose: to create the learning platform he wished he had when starting his own journey.
              </p>
              
              <div className="pl-4 border-l-4 border-rose-200 italic">
                "I remember the countless late nights, the frustration of hitting roadblocks with no one to turn to, and the overwhelming feeling of not knowing what to learn next. Those experiences shaped my vision for Coding Jojo — to create a learning environment where no aspiring developer would have to face those same obstacles alone."
              </div>
              
              <p className="leading-relaxed">
                With over a decade of experience in full-stack development and a passion for education, Joseph combined his technical expertise with cutting-edge AI technology to revolutionize how coding is taught and learned.
              </p>
            </div>
            
            {/* Featured quote with decorative elements */}
            <div className="relative bg-gradient-to-r from-rose-50 to-amber-50 p-8 rounded-2xl mt-8">
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-rose-400 opacity-20 text-6xl font-serif">"</div>
              <p className="relative z-10 italic text-gray-700 text-lg font-medium">
                Technology has the power to transform lives, but only if people have equal access to learning it. At Coding Jojo, we're not just teaching code – we're unlocking potential and opening doors to tomorrow's opportunities.
              </p>
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-amber-400 opacity-20 text-6xl font-serif">"</div>
              
              <div className="mt-4 flex items-center">
                <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Joseph Jose Oribaloye</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
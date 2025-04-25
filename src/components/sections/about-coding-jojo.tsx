'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Globe, Code, BookOpen, Users, Award, Mail, ArrowRight, Calendar, Bookmark } from 'lucide-react';

export function AboutCodingJojo() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'vision' | 'journey' | 'philosophy'>('vision');
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

  // Custom animation for counting up numbers
  const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * end));
        
        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);
    
    return <>{prefix}{count.toLocaleString()}{suffix}</>;
  };

  const achievements = [
    { icon: <Code className="w-6 h-6 text-[#FF6B6B]" />, label: "Experience", value: <CountUp end={10} suffix="+" />, bg: "bg-red-50" },
    { icon: <Users className="w-6 h-6 text-[#FF8E53]" />, label: "Students", value: <CountUp end={10000} suffix="+" />, bg: "bg-orange-50" },
    { icon: <Award className="w-6 h-6 text-[#FFA500]" />, label: "Awards", value: <CountUp end={15} />, bg: "bg-amber-50" },
    { icon: <Calendar className="w-6 h-6 text-[#FF6B6B]" />, label: "Countries", value: <CountUp end={42} />, bg: "bg-red-50" }
  ];

  const tabContent = {
    vision: (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Bookmark className="w-5 h-5 mr-2 text-[#FF6B6B]" /> The Vision
        </h3>
        <p className="text-gray-600 leading-relaxed">
          As a self-taught developer who navigated the challenging landscape of learning to code without proper guidance, Joseph founded Coding Jojo with a profound purpose: to create the learning platform he wished he had when starting his own journey.
        </p>
        
        <div className="pl-4 border-l-4 border-[#FF8E53] italic">
          "I remember the countless late nights, the frustration of hitting roadblocks with no one to turn to, and the overwhelming feeling of not knowing what to learn next. Those experiences shaped my vision for Coding Jojo — to create a learning environment where no aspiring developer would have to face those same obstacles alone."
        </div>
      </div>
    ),
    journey: (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Bookmark className="w-5 h-5 mr-2 text-[#FF8E53]" /> The Journey
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Joseph's journey began in a small town with limited resources but unlimited curiosity. From building his first website at 14 to leading engineering teams at Fortune 500 companies, his path has been defined by persistence and continuous learning.
        </p>
        <p className="text-gray-600 leading-relaxed">
          After mentoring hundreds of developers informally, Joseph recognized the need for a structured yet personalized approach to coding education that adapts to each learner's unique needs and goals.
        </p>
      </div>
    ),
    philosophy: (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Bookmark className="w-5 h-5 mr-2 text-[#FFA500]" /> Teaching Philosophy
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Joseph believes coding education should be accessible, practical, and directly applicable to real-world scenarios. His teaching methodology combines fundamental concepts with project-based learning, reinforced by AI-powered personalized feedback.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { title: 'Learn by doing', desc: 'Hands-on projects from day one' },
            { title: 'Personalized paths', desc: 'Adapt to your learning style' },
            { title: 'Community support', desc: 'Never code alone again' },
            { title: 'Industry relevance', desc: 'Build real-world skills' }
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]"></div>
                <span className="text-gray-800 font-medium">{item.title}</span>
              </div>
              <p className="text-gray-600 text-sm pl-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated header with accent */}
        <div className="text-center mb-16">
          <div className={`inline-block rounded-full bg-gradient-to-r from-red-50 to-orange-50 px-5 py-1.5 mb-4 ${isVisible ? 'animate-fade-in transform translate-y-0 opacity-100' : 'transform -translate-y-4 opacity-0'} transition-all duration-700`}>
            <span className="text-sm font-medium bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
              Visionary Leadership
            </span>
          </div>
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent mb-4 ${isVisible ? 'animate-fade-in transform translate-y-0 opacity-100' : 'transform -translate-y-4 opacity-0'} transition-all duration-700 delay-100`}>
            Meet Our Founder
          </h1>
          <p className={`max-w-2xl mx-auto text-gray-500 text-lg ${isVisible ? 'animate-fade-in transform translate-y-0 opacity-100' : 'transform -translate-y-4 opacity-0'} transition-all duration-700 delay-200`}>
            The driving force behind Coding Jojo's mission to democratize coding education worldwide
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Photo Grid and Stats - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <div className={`space-y-10 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-8'} transition-all duration-1000`}>
              {/* Photo composition with modern layout */}
              <div className="relative h-96">
                {/* Main photo */}
                <div className="absolute left-0 top-0 w-4/5 h-4/5 shadow-2xl rounded-2xl overflow-hidden border-4 border-white z-30">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] to-[#FFA500] opacity-30 mix-blend-multiply z-10"></div>
                  <img 
                    src="/joe.jpg" 
                    alt="Joseph Jose Oribaloye - CEO of Coding Jojo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Background design elements */}
                <div className="absolute top-10 -left-5 w-20 h-20 rounded-full bg-red-50 z-0"></div>
                <div className="absolute bottom-20 -right-5 w-12 h-12 rounded-full bg-orange-50 z-0"></div>
                
                {/* Supporting photo 1 */}
                <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20 transform rotate-3">
                  <img 
                    src="/joe-teaching.jpg" 
                    alt="Joseph teaching at a workshop" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] to-[#FFA500] opacity-20 mix-blend-multiply"></div>
                </div>
                
                {/* Design accent */}
                <div className="absolute -bottom-3 left-1/4 h-6 w-32 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-full z-40"></div>
              </div>
              
              {/* Name and title with elegant typography */}
              <div className="text-center lg:text-left mt-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Joseph Jose Oribaloye</h2>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="h-1 w-10 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-600">Founder & CEO, Coding Jojo</h3>
                </div>
              </div>
              
              {/* Social Links with hover effects */}
              <div className="flex justify-center lg:justify-start mt-6 gap-4">
                {[
                  { icon: <Github className="w-5 h-5" />, color: "#333", label: "GitHub" },
                  { icon: <Linkedin className="w-5 h-5" />, color: "#0077B5", label: "LinkedIn" },
                  { icon: <Twitter className="w-5 h-5" />, color: "#1DA1F2", label: "Twitter" },
                  { icon: <Mail className="w-5 h-5" />, color: "#FF6B6B", label: "Email" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg" 
                    style={{ backgroundColor: `${social.color}15`, color: social.color }}
                    aria-label={`Connect with Joseph on ${social.label}`}
                  >
                    {social.icon}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
              
              {/* Achievement stats with animations */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`bg-white rounded-xl shadow-md p-4 border border-gray-100 transform transition-all duration-700 delay-${index * 100} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${achievement.bg} flex items-center justify-center`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{achievement.label}</div>
                        <div className="text-xl font-bold text-gray-800">{achievement.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Column - Right Side (3 columns) */}
          <div className={`lg:col-span-3 space-y-8 ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8'} transition-all duration-1000 delay-300`}>
            {/* Tab navigation - improved styling */}
            <div className="flex border-b border-gray-200 relative">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100"></div>
              {['vision', 'journey', 'philosophy'].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 px-6 font-medium transition-colors relative ${activeTab === tab ? 'text-[#FF6B6B]' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab(tab as 'vision' | 'journey' | 'philosophy')}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] z-10"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab content with animation */}
            <div className="min-h-[220px] bg-white p-6 rounded-lg shadow-sm">
              {tabContent[activeTab]}
            </div>
            
            {/* Featured quote with elegant design */}
            <div className="relative bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 p-8 rounded-2xl mt-12 shadow-md">
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-[#FF6B6B] opacity-20 text-8xl font-serif">"</div>
              <p className="relative z-10 italic text-gray-700 text-xl font-medium leading-relaxed">
                Technology has the power to transform lives, but only if people have equal access to learning it. At Coding Jojo, we're not just teaching code – we're unlocking potential and opening doors to tomorrow's opportunities.
              </p>
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-[#FFA500] opacity-20 text-8xl font-serif">"</div>
              
              <div className="mt-6 flex items-center">
                <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-600">Joseph Jose Oribaloye</span>
              </div>
            </div>
            
            {/* Improved CTA Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-12 border border-gray-100 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-r from-red-50 to-orange-50 opacity-70"></div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 opacity-70"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="md:max-w-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Want to learn more?</h3>
                  <p className="text-gray-600">Read Joseph's full story or book him for speaking engagements and workshops at your organization.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <a 
                    href="#" 
                    className="px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
                  >
                    <span>Full Story</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center w-full sm:w-auto"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
            
            {/* Added testimonial for more credibility */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] flex items-center justify-center text-white font-bold text-lg">
                  TM
                </div>
                <div>
                  <p className="text-gray-600 italic">"Joseph's approach to teaching programming transformed our entire engineering team. His workshops are the perfect blend of theory and practical application."</p>
                  <div className="mt-3">
                    <p className="font-medium text-gray-800">Thomas Mitchell</p>
                    <p className="text-sm text-gray-500">CTO, TechInnovate Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
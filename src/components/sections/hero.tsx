'use client';

import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Brain, BookOpen, Code, Bot, TrendingUp, CheckCircle, Users, Laptop, Database, Cloud } from 'lucide-react';

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      title: "AI-Powered Learning",
      description: "Smart, personalized pathway to master coding",
      icon: <Brain className="h-8 w-8 text-white" />,
      color: "#FF6B6B",
      secondaryColor: "#FFA500",
      visual: "ai-learning"
    },
    {
      title: "Interactive Coding",
      description: "Real-time feedback as you code and learn",
      icon: <Code className="h-8 w-8 text-white" />,
      color: "#9C27B0",
      secondaryColor: "#FF6B6B",
      visual: "code-editor"
    },
    {
      title: "Smart Mentor",
      description: "24/7 guidance from our intelligent assistant",
      icon: <Bot className="h-8 w-8 text-white" />,
      color: "#FFA500",
      secondaryColor: "#FF6B6B",
      visual: "ai-assistant"
    }
  ];

  // Auto-change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // For slide indicators
  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className="relative bg-white overflow-hidden font-['Montserrat',sans-serif] py-16 md:py-24">
      {/* Improved Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ff6b6b' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Gradient Orbs - Enhanced */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-[120px] opacity-15 animate-[blob_7s_infinite]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FFA500] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-[blob_8s_infinite_1s]" />
      <div className="absolute -bottom-64 left-1/3 w-[500px] h-[500px] bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-[blob_9s_infinite_2s]" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Enhanced */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-sm font-medium border border-[#FF6B6B]/20">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Welcome to Coding Jojo
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight">
                <span className="bg-gradient-to-r from-[#FF6B6B] via-[#FFA500] to-[#FF6B6B] bg-clip-text text-transparent">
                  Level Up Your
                </span>
                <br />
                <span className="text-gray-800">Coding Journey</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Master programming through <span className="text-[#FF6B6B] font-medium">AI-powered</span> interactive lessons, real-world projects, and <span className="text-[#FFA500] font-medium">intelligent</span> mentor guidance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] px-8 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300">
                <span className="relative z-10">Start Learning Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group flex items-center gap-3 rounded-lg border-2 border-[#FF6B6B]/30 bg-white px-6 py-3 text-lg font-medium text-[#FF6B6B] shadow-md hover:border-[#FF6B6B] transition-all duration-300">
                <div className="h-8 w-8 rounded-full bg-[#FF6B6B]/10 flex items-center justify-center group-hover:bg-[#FF6B6B]/20 transition-all duration-300">
                  <Play className="w-4 h-4 text-[#FF6B6B]" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img 
                    key={i} 
                    src={`https://i.pravatar.cc/100?img=${i+10}`}
                    alt={`Student ${i}`}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg"
                  />
                ))}
                <div className="w-12 h-12 rounded-full bg-[#FFA500] border-2 border-white flex items-center justify-center text-white font-bold shadow-lg">
                  +1k
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  10K+ <TrendingUp className="h-5 w-5 text-[#FF6B6B]" />
                </div>
                <div className="text-sm text-gray-500 font-medium">Active Learners Worldwide</div>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Brain className="h-4 w-4" />, text: "AI-Powered" },
                { icon: <CheckCircle className="h-4 w-4" />, text: "Certified Courses" },
                { icon: <Bot className="h-4 w-4" />, text: "Smart Assistant" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Open Design with Smooth Right-to-Left Animation */}
          <div className="relative overflow-hidden h-[550px]">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeSlide === index 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                {/* Feature Badge */}
                <div 
                  className="absolute top-0 right-0 z-10 rounded-lg px-4 py-2 flex items-center gap-2 animate-fade-in"
                  style={{
                    backgroundColor: `${slide.color}10`,
                    borderColor: `${slide.color}30`,
                    borderWidth: '1px'
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                    }}
                  >
                    {slide.icon}
                  </div>
                  <span 
                    className="font-medium"
                    style={{
                      color: slide.color
                    }}
                  >
                    {slide.title}
                  </span>
                </div>

                {/* Main Visual Based on Slide Type */}
                {slide.visual === "ai-learning" && (
                  <div className="relative w-full h-full">
                    {/* Top Floating Element */}
                    <div className="absolute left-10 top-16 z-10 p-4 bg-white rounded-xl shadow-xl border border-gray-100 w-64 animate-slide-up-fade transition-all duration-700 ease-out delay-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{
                            background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                          }}
                        >
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Your Learning Path</div>
                          <div className="text-lg font-bold text-gray-800">JavaScript Master</div>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`,
                            width: '65%'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-gray-500">Progress: 65%</span>
                        <span className="font-medium text-gray-700">23/35 Lessons</span>
                      </div>
                    </div>

                    {/* Main Element - Learning Path */}
                    <div className="absolute right-0 top-40 max-w-md bg-white rounded-l-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-left transition-all duration-700 ease-out">
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">AI Learning Path</h3>
                        <p className="text-gray-600 text-sm mb-4">Personalized for your skill level and goals</p>
                        
                        <div className="space-y-4">
                          {[
                            {
                              title: "JavaScript Fundamentals",
                              desc: "Variables, functions, and objects",
                              icon: <Code />,
                              progress: 100,
                              color: slide.color
                            },
                            {
                              title: "DOM Manipulation",
                              desc: "Selecting and modifying HTML elements",
                              icon: <Laptop />,
                              progress: 72,
                              color: slide.color
                            },
                            {
                              title: "Async JavaScript",
                              desc: "Promises, async/await, and fetch API",
                              icon: <Cloud />,
                              progress: 24,
                              color: slide.color
                            },
                            {
                              title: "React Fundamentals",
                              desc: "Components, props, and state",
                              icon: <Database />,
                              progress: 0,
                              color: slide.color
                            }
                          ].map((module, i) => (
                            <div key={i} className="relative">
                              <div className="flex items-start gap-3">
                                <div 
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    module.progress === 100 
                                      ? 'bg-green-500' 
                                      : module.progress > 0 
                                        ? `bg-opacity-20`
                                        : 'bg-gray-200'
                                  }`}
                                  style={{
                                    backgroundColor: module.progress > 0 && module.progress < 100 
                                      ? slide.color 
                                      : module.progress === 0 
                                        ? '#e5e7eb' 
                                        : '#22c55e'
                                  }}
                                >
                                  <div className="w-5 h-5 text-white">
                                    {module.progress === 100 ? <CheckCircle /> : module.icon}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-800">{module.title}</h4>
                                    <span className="text-xs font-medium">{module.progress}%</span>
                                  </div>
                                  <p className="text-xs text-gray-500 mb-1.5">{module.desc}</p>
                                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${module.progress}%`,
                                        backgroundColor: module.progress === 100 
                                          ? '#22c55e' 
                                          : slide.color
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              {i < 3 && <div className="absolute left-5 top-12 w-px h-6 bg-gray-200"></div>}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">Estimated completion: 4 weeks</div>
                        <button 
                          className="text-sm font-medium rounded-lg px-4 py-2 text-white"
                          style={{
                            background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                          }}
                        >
                          Continue Learning
                        </button>
                      </div>
                    </div>

                    {/* Bottom Floating Element - Stats */}
                    <div className="absolute bottom-10 left-0 animate-slide-up transition-all duration-700 ease-out delay-300">
                      <div 
                        className="p-4 rounded-r-xl shadow-lg"
                        style={{
                          background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`,
                        }}
                      >
                        <div className="flex items-center gap-3 text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white/80">Your Learning Speed</div>
                            <div className="text-2xl font-bold">+27% faster</div>
                            <div className="text-xs text-white/80">than average learner</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {slide.visual === "code-editor" && (
                  <div className="relative w-full h-full">
                    {/* Floating Code Editor */}
                    <div className="absolute right-0 top-16 max-w-lg bg-gray-900 rounded-l-xl shadow-2xl overflow-hidden animate-slide-left transition-all duration-700 ease-out">
                      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-sm text-gray-400">script.js</div>
                        <div></div>
                      </div>
                      <div className="p-4 font-mono text-sm">
                        <pre className="text-gray-300">
                          <span className="text-blue-400">function</span> <span className="text-green-400">calculateTotal</span><span className="text-yellow-500">(</span>items<span className="text-yellow-500">)</span> <span className="text-yellow-500">{'{'}</span>
                          <br />  <span className="text-blue-400">return</span> items.<span className="text-green-400">reduce</span><span className="text-yellow-500">((</span>total, item<span className="text-yellow-500">)</span> <span className="text-blue-400">={'>'}</span> <span className="text-yellow-500">{'{'}</span>
                          <br />    <span className="text-blue-400">return</span> total + item.price * item.quantity;
                          <br />  <span className="text-yellow-500">{'}'}</span>, <span className="text-purple-400">0</span><span className="text-yellow-500">)</span>;
                          <br /><span className="text-yellow-500">{'}'}</span>
                          <br />
                          <br /><span className="text-blue-400">const</span> shoppingCart = <span className="text-yellow-500">[</span>
                          <br />  <span className="text-yellow-500">{'{'}</span> name: <span className="text-green-400">"Laptop"</span>, price: <span className="text-purple-400">999</span>, quantity: <span className="text-purple-400">1</span> <span className="text-yellow-500">{'}'}</span>,
                          <br />  <span className="text-yellow-500">{'{'}</span> name: <span className="text-green-400">"Headphones"</span>, price: <span className="text-purple-400">99</span>, quantity: <span className="text-purple-400">2</span> <span className="text-yellow-500">{'}'}</span>,
                          <br />  <span className="text-yellow-500">{'{'}</span> name: <span className="text-green-400">"Mouse"</span>, price: <span className="text-purple-400">29</span>, quantity: <span className="text-purple-400">1</span> <span className="text-yellow-500">{'}'}</span>
                          <br /><span className="text-yellow-500">]</span>;
                          <br />
                          <br /><span className="text-blue-400">const</span> total = <span className="text-green-400">calculateTotal</span><span className="text-yellow-500">(</span>shoppingCart<span className="text-yellow-500">)</span>;
                          <br /><span className="text-green-400">console</span>.<span className="text-blue-400">log</span><span className="text-yellow-500">(</span><span className="text-green-400">`Total: $${'{'}total{'}'}`</span><span className="text-yellow-500">)</span>;
                        </pre>
                      </div>
                    </div>

                    {/* AI Feedback Card */}
                    <div className="absolute left-10 top-52 bg-white rounded-lg shadow-xl border border-gray-100 max-w-xs animate-slide-up transition-all duration-700 ease-out delay-200">
                      <div 
                        className="h-2 rounded-t-lg"
                        style={{
                          background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                        }}
                      ></div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                            }}
                          >
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-sm font-medium text-gray-800">Code Mentor AI</div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          Great job using reduce! One optimization: consider destructuring in the parameter:
                        </p>
                        
                        <div className="bg-gray-50 p-2 rounded text-xs font-mono text-gray-700 mb-3">
                          <span className="text-blue-600">({'{'}price, quantity{'}'})</span> =&gt; total + price * quantity
                        </div>
                        
                        <div className="flex justify-between">
                          <button className="text-xs text-gray-500">Dismiss</button>
                          <button 
                            className="text-xs font-medium"
                            style={{ color: slide.color }}
                          >
                            Apply Fix
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg animate-slide-up transition-all duration-700 ease-out delay-300">
                      <div className="grid grid-cols-3 divide-x divide-gray-100">
                        {[
                          { value: "21", label: "Challenges", icon: <Code className="w-4 h-4" /> },
                          { value: "93%", label: "Success", icon: <CheckCircle className="w-4 h-4" /> },
                          { value: "4", label: "Projects", icon: <Laptop className="w-4 h-4" /> }
                        ].map((stat, i) => (
<div key={i} className="px-4 py-3 flex flex-col items-center justify-center">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                              style={{
                                backgroundColor: `${slide.color}20`
                              }}
                            >
                              <div className="text-gray-100">{stat.icon}</div>
                            </div>
                            <div className="font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-300">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {slide.visual === "ai-assistant" && (
                  <div className="relative w-full h-full">
                    {/* Main AI Assistant Interface */}
                    <div className="absolute right-0 top-20 max-w-lg bg-white rounded-l-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-left transition-all duration-700 ease-out">
                      <div 
                        className="h-2"
                        style={{
                          background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                        }}
                      ></div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{
                                background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                              }}
                            >
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">AI Mentor</div>
                              <div className="text-xs text-gray-500">Always available to help</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs text-green-500">Online</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-5">
                          {/* AI Message */}
                          <div className="flex gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: `${slide.color}20`
                              }}
                            >
                              <Bot className="w-4 h-4" style={{ color: slide.color }} />
                            </div>
                            <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 max-w-xs">
                              How can I help with your debugging issue today?
                            </div>
                          </div>
                          
                          {/* User Message */}
                          <div className="flex gap-3 justify-end">
                            <div 
                              className="p-3 rounded-lg rounded-tr-none text-sm text-white max-w-xs"
                              style={{
                                background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                              }}
                            >
                              I'm getting an "Uncaught TypeError: Cannot read property 'value' of undefined" in my form submission.
                            </div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          
                          {/* AI Response */}
                          <div className="flex gap-3">
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: `${slide.color}20`
                              }}
                            >
                              <Bot className="w-4 h-4" style={{ color: slide.color }} />
                            </div>
                            <div className="space-y-3">
                              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 max-w-xs">
                                This typically happens when you're trying to access a property of an element that doesn't exist. Let me help you debug:
                              </div>
                              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 max-w-xs">
                                <div className="font-medium mb-1">Check these common issues:</div>
                                <ol className="list-decimal list-inside space-y-1 text-xs">
                                  <li>Element ID typo in your selector</li>
                                  <li>Form element doesn't exist when code runs</li>
                                  <li>Event listener timing issues</li>
                                </ol>
                              </div>
                              <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 text-sm font-mono text-gray-700 max-w-xs">
                                <div className="text-xs text-gray-500 mb-1">Try this safer approach:</div>
                                const form = document.getElementById('myForm');<br />
                                if (form && form.elements.myInput) {'{'}<br />
                                &nbsp;&nbsp;const value = form.elements.myInput.value;<br />
                                {'}'}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Input Area */}
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Ask your coding question..." 
                            className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300"
                          />
                          <button 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                            }}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="14" 
                              height="14" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="text-white"
                            >
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Bottom Stats */}
                      <div className="border-t border-gray-100 bg-gray-50 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Database className="w-3.5 h-3.5" />
                          <span>Connected to your repositories</span>
                        </div>
                        <div 
                          className="text-xs font-medium"
                          style={{
                            color: slide.color
                          }}
                        >
                          AI trained on your codebase
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Element - Quick Actions */}
                    <div className="absolute left-10 top-32 bg-white rounded-lg shadow-xl border border-gray-100 w-56 overflow-hidden animate-slide-up-fade transition-all duration-700 ease-out delay-200">
                      <div 
                        className="h-1 w-full"
                        style={{
                          background: `linear-gradient(to right, ${slide.color}, ${slide.secondaryColor})`
                        }}
                      ></div>
                      <div className="p-4">
                        <div className="text-sm font-medium text-gray-800 mb-3">Quick AI Support</div>
                        <div className="space-y-2">
                          {[
                            { text: "Debug my code", icon: <Code className="w-4 h-4" /> },
                            { text: "Optimize performance", icon: <TrendingUp className="w-4 h-4" /> },
                            { text: "Explain this concept", icon: <BookOpen className="w-4 h-4" /> }
                          ].map((action, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center"
                                style={{
                                  backgroundColor: `${slide.color}15`
                                }}
                              >
                                <div style={{ color: slide.color }}>{action.icon}</div>
                              </div>
                              <span className="text-sm text-gray-700">{action.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Floating Card - Stats */}
                    <div className="absolute bottom-10 left-10 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-slide-up transition-all duration-700 ease-out delay-300">
                      <div className="grid grid-cols-3 divide-x divide-gray-100">
                        {[
                          { value: "24/7", label: "Support" },
                          { value: "92%", label: "Accuracy" },
                          { value: "5s", label: "Avg. Response" }
                        ].map((stat, i) => (
                          <div key={i} className="px-4 py-3">
                            <div 
                              className="font-bold text-lg"
                              style={{ color: slide.color }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Slide Navigation */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6">
              <div className="flex gap-3">
                {slides.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSlideChange(idx)} 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx 
                        ? 'w-8 bg-[#FF6B6B]' 
                        : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};                            
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Code, Star, ArrowRight, Cpu, Globe, Database, BarChart } from 'lucide-react';

const TopicButton = ({ topic, icon }: { topic: string; icon?: React.ReactNode }) => (
  <button className="group min-w-fit px-8 py-4 bg-white rounded-lg border border-gray-200 hover:border-[#FF6B6B] hover:shadow-lg transition-all duration-300 whitespace-nowrap text-gray-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 relative overflow-hidden">
    {/* Gradient hover effect */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
    
    {/* Text content with optional icon */}
    <span className="relative z-10 group-hover:text-[#FF6B6B] transition-colors duration-300 flex items-center gap-2">
      {icon && <span className="text-[#FF6B6B]">{icon}</span>}
      {topic}
    </span>
  </button>
);

// Featured topic with different styling
const FeaturedTopicButton = ({ topic, icon }: { topic: string; icon?: React.ReactNode }) => (
  <button className="group min-w-fit px-8 py-4 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-lg border border-[#FF6B6B]/20 hover:shadow-lg transition-all duration-300 whitespace-nowrap text-[#FF6B6B] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 relative overflow-hidden">
    {/* Gradient hover effect */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FFA500]/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
    
    {/* Text content with optional icon */}
    <span className="relative z-10 group-hover:text-[#FF6B6B] transition-colors duration-300 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {topic}
      <Star className="w-3 h-3 fill-[#FFA500] text-[#FFA500]" />
    </span>
  </button>
);

// Carousel Row Component to handle each row's individual scrolling
const CarouselRow = ({ 
  topics, 
  rowIndex, 
  direction, 
  isPaused 
}: { 
  topics: { name: string; featured?: boolean; icon?: React.ReactNode }[]; 
  rowIndex: number;
  direction: 'left' | 'right';
  isPaused: boolean;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Clone topics for infinite effect
  const extendedTopics = [...topics, ...topics, ...topics]; // Triple content for seamless looping
  
  useEffect(() => {
    if (isPaused || !rowRef.current) return;
    
    let animationId: number;
    const scrollSpeed = 1; // pixels per frame
    const container = rowRef.current;
    
    // Animation function
    const animate = () => {
      if (!container) return;
      
      if (direction === 'left') {
        // Move left (negative increment)
        container.scrollLeft += scrollSpeed;
        
        // Reset when needed for infinite effect
        if (container.scrollLeft >= container.scrollWidth / 3 * 2) {
          container.scrollLeft = container.scrollWidth / 3;
        }
      } else {
        // Move right (positive increment)
        container.scrollLeft -= scrollSpeed;
        
        // Reset when needed for infinite effect
        if (container.scrollLeft <= container.scrollWidth / 3) {
          container.scrollLeft = container.scrollWidth / 3 * 2;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize scrollLeft position
    if (direction === 'left') {
      container.scrollLeft = container.scrollWidth / 3;
    } else {
      container.scrollLeft = container.scrollWidth / 3 * 2;
    }
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [direction, isPaused]);
  
  return (
    <div 
      className="overflow-x-scroll no-scrollbar flex gap-4 py-2"
      ref={rowRef}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {extendedTopics.map((topic, index) => (
        topic.featured ? 
          <FeaturedTopicButton 
            key={`row${rowIndex}-${index}`} 
            topic={topic.name} 
            icon={topic.icon}
          /> :
          <TopicButton 
            key={`row${rowIndex}-${index}`} 
            topic={topic.name}
            icon={topic.icon}
          />
      ))}
      
      {/* Add "More topics" button at the end of the third row */}
      {rowIndex === 2 && (
        <button className="group min-w-fit px-8 py-4 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-lg border-none hover:opacity-95 transition-all duration-300 whitespace-nowrap text-white font-medium text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 flex-shrink-0">
          <span className="flex items-center gap-2">
            All topics
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      )}
    </div>
  );
};

const PopularTopics = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Expanded topic list organized by categories
  const topicRows = [
    // Row 1: Web Development
    [
      { name: "React", featured: true, icon: <Code className="w-3.5 h-3.5" /> },
      { name: "Next.js", featured: true },
      { name: "JavaScript", featured: true },
      { name: "TypeScript" },
      { name: "Angular" },
      { name: "Vue.js" },
      { name: "Svelte" },
      { name: "HTML & CSS" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PHP" }
    ],
    // Row 2: Programming & Data
    [
      { name: "Python", featured: true },
      { name: "Java" },
      { name: "C#" },
      { name: "Rust", featured: true },
      { name: "Go" },
      { name: "Swift" },
      { name: "SQL", icon: <Database className="w-3.5 h-3.5" /> },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "Redis" },
      { name: "Firebase" }
    ],
    // Row 3: Cloud & DevOps + AI/ML
    [
      { name: "AI & ML", featured: true, icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "AWS", icon: <Globe className="w-3.5 h-3.5" /> },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "DevOps" },
      { name: "CI/CD" },
      { name: "Git" },
      { name: "TensorFlow", icon: <Cpu className="w-3.5 h-3.5" /> },
      { name: "PyTorch" },
      { name: "Data Science", icon: <BarChart className="w-3.5 h-3.5" /> },
      { name: "Blockchain" },
      { name: "Cybersecurity" }
    ]
  ];

  // Pause on mouse enter
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  // Resume on mouse leave
  const handleMouseLeave = () => {
    setIsPaused(false);
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
      
            {/* Background Elements - Matching Featured Courses Style */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FFA500] rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with enhanced styling */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-sm font-medium border border-[#FF6B6B]/20 mb-2">
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent text-xs">
              Most searched
            </span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Popular Topics
          </h2>
          <p className="text-gray-600 mt-1">Explore the most in-demand coding skills</p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative space-y-4 pb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Visual indicator that hovering pauses the carousel */}
          <div className={`absolute inset-0 bg-black/5 backdrop-blur-[1px] z-50 pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-300 ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg text-gray-700 font-medium">
              Paused - Move mouse away to resume
            </div>
          </div>
          
          {/* Each row has its own direction and scroll animation */}
          <CarouselRow 
            topics={topicRows[0]} 
            rowIndex={0} 
            direction="left" 
            isPaused={isPaused}
          />
          
          <CarouselRow 
            topics={topicRows[1]} 
            rowIndex={1} 
            direction="right" 
            isPaused={isPaused}
          />
          
          <CarouselRow 
            topics={topicRows[2]} 
            rowIndex={2} 
            direction="left" 
            isPaused={isPaused}
          />
        </div>
        
        {/* Category Quick Links */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Web Development", icon: <Code className="w-5 h-5" />, count: 4250 },
            { title: "Mobile Development", icon: <Globe className="w-5 h-5" />, count: 2180 },
            { title: "Data Science", icon: <Database className="w-5 h-5" />, count: 3120 },
            { title: "AI & ML", icon: <Cpu className="w-5 h-5" />, count: 1450 }
          ].map((category, index) => (
            <div 
              key={index}
              className="flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-[#FF6B6B]/20 hover:bg-gradient-to-r hover:from-[#FF6B6B]/5 hover:to-[#FFA500]/5 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="mr-4 p-2 rounded-lg bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 text-[#FF6B6B] group-hover:from-[#FF6B6B] group-hover:to-[#FFA500] group-hover:text-white transition-all duration-300">
                {category.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-[#FF6B6B] transition-colors">{category.title}</h3>
                <p className="text-xs text-gray-500">{category.count.toLocaleString()} courses</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularTopics;
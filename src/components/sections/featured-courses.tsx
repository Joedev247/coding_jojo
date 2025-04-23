'use client'

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Clock, Book, Users, Star, ChevronRight, X } from 'lucide-react';

// Custom Button component instead of importing from shadcn
const Button: React.FC<{ className?: string; onClick?: () => void; children?: React.ReactNode; href?: string }> = ({ 
  children, 
  className = '', 
  onClick = () => {},
  href
}) => {
  if (href) {
    return (
      <a 
        href={href}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  image: string;
  price: number;
  originalPrice: number;
  tag?: string;
  badges?: string[];
  details?: string[];
  totalHours?: string;
  level?: string;
  hasSubtitles?: boolean;
  updated?: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    description: 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
    instructor: 'Dr. Angela Yu, Developer and Lead...',
    rating: 4.7,
    reviewCount: 358678,
    image: '/api/placeholder/480/270?text=Python',
    price: 10.99,
    originalPrice: 74.99,
    tag: 'Bestseller',
    totalHours: '60.5',
    level: 'All Levels',
    hasSubtitles: true,
    details: [
      'Master Python by building real-world projects',
      'Learn automation, game, app and web development',
      'Learn data science and machine learning with Python',
      'Build a portfolio of 100 Python projects'
    ]
  },
  {
    id: '2',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    description: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps',
    instructor: 'Dr. Angela Yu, Developer and Lead...',
    rating: 4.7,
    reviewCount: 429852,
    image: '/api/placeholder/480/270?text=Full-Stack',
    price: 10.99,
    originalPrice: 74.99,
    tag: 'Bestseller',
    updated: 'February 2025',
    totalHours: '61.5',
    level: 'All Levels',
    hasSubtitles: true,
    details: [
      'Build 16 web development projects for your portfolio, ready to apply for junior developer jobs',
      'Learn the latest technologies, including Javascript, React, Node and even Web3 development',
      'After the course you will be able to build ANY website you want'
    ]
  },
  {
    id: '3',
    title: 'Ultimate AWS Certified Solutions Architect Associate 2025',
    description: 'Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03',
    instructor: 'Stephane Maarek | AWS Certified Cloud...',
    rating: 4.7,
    reviewCount: 252138,
    image: '/api/placeholder/480/270?text=AWS',
    price: 12.99,
    originalPrice: 84.99,
    tag: 'Bestseller',
    totalHours: '27.5',
    level: 'All Levels',
    hasSubtitles: true,
    updated: 'March 2025',
    details: [
      'FULLY UPDATED FOR SAA-C03: Pass the AWS Certified Solutions Architect Associate Certification',
      'Full Practice Exam with Explanations included!',
      'All 800+ slides available as downloadable PDF'
    ]
  },
  {
    id: '4',
    title: 'React - The Complete Guide 2025',
    description: 'Dive in and learn React.js from scratch!',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.6,
    reviewCount: 187452,
    image: '/api/placeholder/480/270?text=React',
    price: 11.99,
    originalPrice: 79.99,
    tag: 'Bestseller',
    totalHours: '48.5',
    level: 'All Levels',
    hasSubtitles: true,
    details: [
      'Learn React from the ground up',
      'Build powerful, fast, user-friendly applications',
      'Master modern React features like Hooks and Redux'
    ]
  },
  {
    id: '5',
    title: 'The Complete JavaScript Course 2025',
    description: 'Master JavaScript with projects, challenges and theory',
    instructor: 'Jonas Schmedtmann',
    rating: 4.7,
    reviewCount: 156230,
    image: '/api/placeholder/480/270?text=JavaScript',
    price: 10.99,
    originalPrice: 69.99,
    tag: 'Bestseller',
    totalHours: '69.0',
    level: 'All Levels',
    hasSubtitles: true,
    details: [
      'JavaScript fundamentals and advanced concepts',
      'Object-oriented programming and functional programming',
      'Build real-world projects including ES6+ features'
    ]
  },
  {
    id: '6',
    title: 'Machine Learning A-Z™: AI, Python & R',
    description: 'Learn Machine Learning techniques with practical exercises',
    instructor: 'Kirill Eremenko, Hadelin de Ponteves',
    rating: 4.5,
    reviewCount: 165892,
    image: '/api/placeholder/480/270?text=ML',
    price: 12.99,
    originalPrice: 89.99,
    tag: 'Bestseller',
    totalHours: '44.5',
    level: 'All Levels',
    hasSubtitles: true,
    details: [
      'Master Machine Learning algorithms',
      'Make accurate predictions and powerful analyses',
      'Create robust Machine Learning models'
    ]
  }
];

type CourseCategory = 'all' | 'python' | 'web' | 'aws' | 'data';

export default function FeaturedCoursesSection() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [activeDetailCard, setActiveDetailCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('all');
  const [detailCardPosition, setDetailCardPosition] = useState({ index: 0, rowStart: false });
  const [isDetailCardAnimating, setIsDetailCardAnimating] = useState(false);
  const [isDetailCardHovered, setIsDetailCardHovered] = useState(false);
  const [hoveredCourseRef, setHoveredCourseRef] = useState<HTMLElement | null>(null);
  const [hoveredCourseIndex, setHoveredCourseIndex] = useState<number | null>(null);
  
  const coursesContainerRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const courseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const visibleCourses = 4; // Number of courses visible at once
  const columnsPerRow = 4; // Number of columns in the grid
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'python', name: 'Python' },
    { id: 'web', name: 'Web Development' },
    { id: 'aws', name: 'AWS' },
    { id: 'data', name: 'Data Science' }
  ];
  
  // Smooth detail card handling
  useEffect(() => {
    if (activeDetailCard) {
      setIsDetailCardAnimating(true);
      const timer = setTimeout(() => {
        setIsDetailCardAnimating(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeDetailCard]);
  
  // Close detail card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailCardRef.current && 
        !detailCardRef.current.contains(event.target as Node) &&
        hoveredCourseRef && 
        !hoveredCourseRef.contains(event.target as Node)
      ) {
        setActiveDetailCard(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hoveredCourseRef]);

  // Handle navigation
  const goToPrevious = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    } else {
      // Loop back to the end
      setCurrentPosition(courses.length - visibleCourses);
    }
    
    // Close detail card when navigating
    setActiveDetailCard(null);
  };

  const goToNext = () => {
    if (currentPosition < courses.length - visibleCourses) {
      setCurrentPosition(currentPosition + 1);
    } else {
      // Loop back to the beginning
      setCurrentPosition(0);
    }
    
    // Close detail card when navigating
    setActiveDetailCard(null);
  };
  
  // Determine whether to position the detail card in the top half or bottom half of the course card
  const getVerticalPosition = (index: number) => {
    // For simplicity, we'll check if the course is in the top or bottom half of the viewport
    const courseEl = courseRefs.current[index];
    if (!courseEl) return 'top';
    
    const rect = courseEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const coursePosition = rect.top + rect.height / 2;
    
    // If the course is in the bottom half of the viewport, position the detail card above
    if (coursePosition > viewportHeight / 1.8) {
      return 'top';
    }
    
    return 'center';
  };
  
  // Enhanced hover detail handling with smart positioning
  const showDetailCard = (courseId: string, element: HTMLElement, index: number) => {
    // Store the hovered course element reference and index
    setHoveredCourseRef(element);
    setHoveredCourseIndex(index);
    
    // Determine if this is the last card in a row
    const isLastInRow = (index % columnsPerRow) === columnsPerRow - 1;
    
    // Set the detail card's position data
    setDetailCardPosition({
      index: index,
      rowStart: isLastInRow
    });
    
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    setActiveDetailCard(courseId);
  };
  
  // Handle mouse leaving course card
  const handleCourseMouseLeave = () => {
    // Only start the close timeout if the detail card itself isn't being hovered
    if (!isDetailCardHovered) {
      closeTimeoutRef.current = setTimeout(() => {
        setActiveDetailCard(null);
      }, 300);
    }
  };
  
  // Handle mouse entering/leaving detail card
  const handleDetailCardMouseEnter = () => {
    setIsDetailCardHovered(true);
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  
  const handleDetailCardMouseLeave = () => {
    setIsDetailCardHovered(false);
    // Start a close timeout when mouse leaves the detail card
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDetailCard(null);
    }, 300);
  };
  
  // Close detail card
  const closeDetailCard = () => {
    setActiveDetailCard(null);
    setIsDetailCardHovered(false);
    setHoveredCourseRef(null);
    setHoveredCourseIndex(null);
  };

  // Render star ratings with improved visuals
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= Math.floor(rating) 
                  ? "text-amber-400 fill-amber-400" 
                  : "text-gray-300 fill-gray-300"
              }`}
              strokeWidth={1}
            />
          ))}
        </div>
      </div>
    );
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
    
      {/* Background Elements - Matching Hero Style */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FFA500] rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header with enhanced styling */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-sm font-medium border border-[#FF6B6B]/20 mb-2">
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent text-xs">
                Top-rated courses
              </span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-gray-600 mt-1">Handpicked by our learning experts</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            {/* Category Tabs */}
            <div className="hidden md:flex space-x-1 border border-gray-200 rounded-lg p-1 bg-white shadow-sm">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as CourseCategory)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex ml-2">
              {/* Navigation arrows with improved styling */}
              <button
                onClick={goToPrevious}
                className="flex items-center justify-center w-9 h-9 rounded-l-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goToNext}
                className="flex items-center justify-center w-9 h-9 rounded-r-lg border border-l-0 border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
                aria-label="Next"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Course cards container with improved layout */}
        <div 
          ref={coursesContainerRef}
          className="relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
            {courses.slice(currentPosition, currentPosition + visibleCourses).map((course, index) => (
              <div 
                key={course.id}
                ref={el => { courseRefs.current[index] = el; }}
                className="relative"
                onMouseEnter={(e) => showDetailCard(course.id, e.currentTarget, index)}
                onMouseLeave={handleCourseMouseLeave}
              >
                {/* Enhanced Course Card */}
                <div className={`group h-full flex flex-col rounded-xl overflow-hidden bg-white border transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] ${
                  activeDetailCard === course.id 
                    ? 'border-[#FF6B6B] shadow-lg' 
                    : 'border-gray-200'
                }`}>
                  {/* Card Header/Image with gradient overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image || `/api/placeholder/480/270?text=${encodeURIComponent(course.title)}`}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                    
                    {/* Tag with improved styling */}
                    {course.tag && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white text-xs py-1 px-2 font-medium rounded-md">
                        {course.tag}
                      </div>
                    )}
                    
                    {/* Course level indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs py-0.5 px-2 rounded-full">
                      <Users className="w-3 h-3" />
                      <span>{course.level}</span>
                    </div>
                    
                    {/* Hours badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs py-0.5 px-2 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{course.totalHours}h</span>
                    </div>
                  </div>
                  
                  {/* Card Body with improved layout */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-800 mb-1.5 line-clamp-2 group-hover:text-[#FF6B6B] transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.instructor}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(course.rating)}
                      <span className="text-amber-700 font-bold text-xs ml-1">{course.rating}</span>
                      <span className="text-gray-500 text-xs">({course.reviewCount.toLocaleString()})</span>
                    </div>
                    
                    {/* Progress Bar for Demonstration */}
                    <div className="mt-auto">
                      <div className="mb-1.5 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-700">Course Progress</span>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]"
                          style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Price tag with improved styling */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="font-bold text-gray-900">${course.price.toFixed(2)}</span>
                        <span className="text-gray-500 text-xs line-through ml-1">${course.originalPrice.toFixed(2)}</span>
                      </div>
                      <span className="text-xs font-medium text-green-600">
                        {Math.round((1 - course.price/course.originalPrice) * 100)}% off
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <button className="w-full py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF6B6B] text-white font-medium rounded-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      Enroll Now
                    </button>
                  </div>
                </div>
                
                {/* Detail Card - With improved vertical positioning */}
                {activeDetailCard === course.id && (
                  <div 
                    ref={detailCardRef}
                    onMouseEnter={handleDetailCardMouseEnter}
                    onMouseLeave={handleDetailCardMouseLeave}
                    className={`absolute z-30 rounded-xl overflow-hidden shadow-2xl border border-[#FF6B6B] transition-all duration-300 bg-white ${
                      isDetailCardAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    style={{
                      width: '300px', 
                      // Smart vertical positioning to ensure detail card is visible within viewport
                      ...(getVerticalPosition(index) === 'top' 
                        ? { bottom: 0 } // Position from bottom if near viewport bottom
                        : { top: 0 }    // Position from top otherwise (default)
                      ),
                      // Horizontal positioning (left for last card in row, right for others)
                      ...(index % columnsPerRow === columnsPerRow - 1
                        ? { right: '100%', transform: 'translateX(-1rem)' } // Last card - show on left
                        : { left: '100%', transform: 'translateX(1rem)' }   // Other cards - show on right
                      ),
                      maxHeight: '80vh', // Limit maximum height to 80% of viewport
                      overflowY: 'auto', // Enable scrolling if needed
                      zIndex: 50
                    }}
                  >
                    {(() => {
                      const detailCourse = courses.find(c => c.id === activeDetailCard);
                      if (!detailCourse) return null;
                      
                      return (
                        <>
                          {/* Detail Card Header */}
                          <div className="relative h-44 overflow-hidden">
                            {/* Close button */}
                            <button 
                              onClick={closeDetailCard}
                              className="absolute top-3 right-3 z-10 bg-white/90 rounded-full p-1.5 text-gray-600 hover:text-gray-900 hover:bg-white transition-colors"
                              aria-label="Close details"
                            >
                              <X className="h-4 w-4" />
                            </button>
                  
                            <img
                              src={detailCourse.image || `/api/placeholder/480/270?text=${encodeURIComponent(detailCourse.title)}`}
                              alt={detailCourse.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <div className="flex gap-2 mb-1.5">
                                {detailCourse.tag && (
                                  <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white text-xs py-0.5 px-2 rounded">
                                    {detailCourse.tag}
                                  </span>
                                )}
                                {detailCourse.updated && (
                                  <span className="bg-white/90 text-gray-800 text-xs py-0.5 px-2 rounded">
                                    Updated {detailCourse.updated}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-bold text-base text-white">{detailCourse.title}</h3>
                            </div>
                          </div>
                          
                          {/* Detail Card Body */}
                          <div className="p-4">
                            {/* Course Stats */}
                            <div className="flex items-center justify-between mb-4 text-xs border-b border-gray-100 pb-3">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                                  <span className="text-gray-700">{detailCourse.totalHours} hours</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Book className="w-3.5 h-3.5 text-gray-500" />
                                  <span className="text-gray-700">{detailCourse.level}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {renderStars(detailCourse.rating)}
                                <span className="font-medium text-gray-800">{detailCourse.rating}</span>
                              </div>
                            </div>
                            
                            {/* Course Description */}
                            <div className="text-xs text-gray-700 mb-4">
                              {detailCourse.description}
                            </div>
                            
                            {/* Course Features */}
                            <div className="space-y-2 mb-5">
                              <h4 className="text-xs font-semibold text-gray-900">What you'll learn:</h4>
                              <ul className="space-y-2">
                                {detailCourse.details?.map((detail, index) => (
                                  <li key={index} className="flex text-xs">
<CheckCircle className="h-3.5 w-3.5 text-[#FF6B6B] mt-0 mr-2 shrink-0" />
                                    <span className="text-gray-700">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Price and CTA */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <span className="font-bold text-lg text-gray-900">${detailCourse.price.toFixed(2)}</span>
                                <span className="text-gray-500 text-xs line-through ml-1">${detailCourse.originalPrice.toFixed(2)}</span>
                              </div>
                              <span className="text-xs font-medium text-green-600">
                                {Math.round((1 - detailCourse.price/detailCourse.originalPrice) * 100)}% off
                              </span>
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="grid grid-cols-1 gap-2">
                              <button className="py-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF6B6B] text-white text-sm font-medium rounded-lg transition-colors">
                                Enroll Now
                              </button>
                              <button className="py-2 border border-[#FF6B6B] text-[#FF6B6B] text-sm font-medium rounded-lg hover:bg-[#FF6B6B]/5 transition-colors">
                                Add to Wishlist
                              </button>
                            </div>
                            
                            {/* Additional Information */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <h5 className="text-xs font-medium text-gray-700 mb-2">This course includes:</h5>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  <span>{detailCourse.totalHours} hours on-demand video</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Certificate of completion</span>
                                </div>
                                {detailCourse.hasSubtitles && (
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Closed captions</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Lifetime access</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* View All Courses CTA */}
        <div className="mt-10 text-center">
          <Button href="/courses" 
            className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] hover:from-[#FF6B6B]/90 hover:to-[#FFA500]/90 text-white px-8 py-3 rounded-lg font-medium"
          >
            Explore All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-gray-500 mt-2">Over 200,000 courses available</p>
        </div>
      </div>
    </section>
  );
}
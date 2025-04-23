'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ChevronDown, ShoppingCart, ChevronLeft, ChevronRight, Check, X, Sparkles } from 'lucide-react';
import { useTranslation, languageOptions } from '../contexts/LanguageContext';


// Time left interface
interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  // Access translation context
  const { language, setLanguage, t } = useTranslation();

  // State for announcement bar
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && event.target instanceof Node && !langDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };

    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  // Effect for countdown timer
  useEffect(() => {
    if (!showAnnouncement) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showAnnouncement]);

  // Scroll the secondary navbar
  const scrollMenu = (direction: 'left' | 'right'): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle language change with debug logging
  const handleLanguageChange = (langCode: string): void => {
    console.log(`Changing language to: ${langCode}`);
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  // Course list (we'll use a simple array since we can't dynamically import in client components)
  const courses = [
    "html", "css", "javascript", "sql", "python", "php", "bootstrap", 
    "jquery", "react", "nodejs", "java", "csharp", "cpp", "typescript", 
    "angular", "vue", "ruby", "django", "mongodb", "aws", "docker", 
    "kubernetes", "devops", "blockchain", "ai", "machinelearning", "datascience"
  ];

  return (
    <div className="sticky top-0 z-50 w-full font-['Montserrat',sans-serif]">
      {/* Announcement Bar with consistent max-width */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white py-2">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center bg-white text-xs font-bold px-2 py-1 rounded text-[#FF6B6B] animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                {t('announcement.new')}
              </span>
              <p className="text-sm font-medium">{t('announcement.text')}</p>
              <div className="flex items-center gap-1 ml-1">
                <div className="px-1 text-sm font-bold">
                  {timeLeft.hours}
                  <span className="text-xs ml-1 opacity-80">{t('announcement.hours')}</span>
                </div>
                <span>:</span>
                <div className="px-1 text-sm font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                  <span className="text-xs ml-1 opacity-80">{t('announcement.minutes')}</span>
                </div>
                <span>:</span>
                <div className="px-1 text-sm font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                  <span className="text-xs ml-1 opacity-80">{t('announcement.seconds')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white text-[#FF6B6B] text-xs font-bold px-4 py-1.5 rounded-md hover:shadow-lg transition-all duration-300 hover:brightness-105">
                {t('announcement.cta')}
              </button>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`relative w-full bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo with Link to Home */}
          <div className="flex items-center">
            <Link href="/" className="h-30 w-30 flex items-center">
              <Image
                src="/coding-jojo-preview.webp" 
                alt="Logo"
                width={150} 
                height={150} 
                className="object-contain" 
              />
            </Link>
          </div>

          {/* Centered Search Bar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right Menu Items */}
          <div className="flex items-center gap-4">
            {/* Shopping Cart */}
            <button className="relative text-gray-700 hover:text-[#FF6B6B] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>

            {/* Auth Buttons with Links */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-medium rounded-lg border-2 border-[#FF6B6B]/30 bg-white px-4 py-2 text-lg font-medium text-[#FF6B6B] shadow-md hover:border-[#FF6B6B] transition-all duration-300"
              >
                {t('login')}
              </Link>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                {t('signup')}
              </Link>
            </div>

            {/* Language Selector - Debug version with logging */}
            <div className="relative" ref={langDropdownRef}>
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-[#FF6B6B] transition-colors"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm hidden sm:inline">{language}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
                  <div className="py-1">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => {
                          console.log(`Clicked on language: ${lang.code}`);
                          handleLanguageChange(lang.code);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-xs font-medium">{lang.code}</span>
                          <span>{lang.name}</span>
                        </div>
                        {language === lang.code && <Check className="h-4 w-4 text-[#FF6B6B]" />}
                      </button>
                    ))}
                    <p className="text-xs text-gray-500 p-2 border-t">
                      Current language: {language}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navbar */}
      <nav className={`w-full bg-[#e9eef2] border-b border-gray-200 transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Left scroll button */}
          <button
            onClick={() => scrollMenu('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex items-center h-12 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-6 overflow-x-auto py-2 hide-scrollbar w-full px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Map through course links using translations */}
              {courses.map((key) => (
                <a 
                  key={key} 
                  href={`/courses/${key}`} 
                  className="whitespace-nowrap text-sm text-gray-700 hover:text-[#04AA6D] py-1"
                >
                  {t(`courses.${key}`)}
                </a>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scrollMenu('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center border border-gray-200 hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </nav>
    </div>
  );
}

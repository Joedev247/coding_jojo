'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle, ArrowRight, Github } from 'lucide-react';
import Head from 'next/head';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false
  });

  const [isAnimated, setIsAnimated] = useState(false);
  const [formFocus, setFormFocus] = useState({
    fullName: false,
    email: false,
    password: false
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const motivationalContent = [
    {
      title: "Start Your Coding Journey",
      description: "Join Coding Jojo and build amazing projects with fellow developers",
      stats: [
        { number: "10K+", label: "Developers" },
        { number: "500+", label: "Projects" }
      ]
    },
    {
      title: "Learn By Building",
      description: "Get hands-on experience with real-world projects and expert mentorship",
      stats: [
        { number: "200+", label: "Tutorials" },
        { number: "50+", label: "Courses" }
      ]
    },
    {
      title: "Join Our Community",
      description: "Connect with like-minded developers and grow your network",
      stats: [
        { number: "24/7", label: "Support" },
        { number: "Weekly", label: "Events" }
      ]
    }
  ];

  // Animation effect on component mount
  useEffect(() => {
    setIsAnimated(true);
    
    // Auto-carousel for motivational content
    const carouselInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % motivationalContent.length);
    }, 5000);
    
    return () => clearInterval(carouselInterval);
  }, []);
  
  const handleFocus = (field: string) => {
    setFormFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus(prev => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Check password strength when password field changes
    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        hasUppercase: /[A-Z]/.test(value)
      });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup data:', formData);
  };

  // Calculate overall password strength
  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length;
  const getPasswordStrengthLabel = () => {
    if (passwordStrengthScore === 0) return { text: 'Very Weak', color: 'bg-gray-200' };
    if (passwordStrengthScore === 1) return { text: 'Weak', color: 'bg-red-500' };
    if (passwordStrengthScore === 2) return { text: 'Fair', color: 'bg-yellow-500' };
    if (passwordStrengthScore === 3) return { text: 'Good', color: 'bg-blue-500' };
    return { text: 'Strong', color: 'bg-green-500' };
  };

  const strengthInfo = getPasswordStrengthLabel();

  return (
    <>
      <Head>
        <title>Join Coding Jojo | Create Your Account</title>
        <meta name="description" content="Join our coding community to enhance your skills and build amazing projects with fellow developers." />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center p-4 font-['Montserrat',sans-serif] bg-gradient-to-br from-gray-50 to-gray-100">
        <div className={`w-full max-w-4xl bg-white rounded-2xl shadow-xl p-4 md:p-6 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column: Brand imagery and message */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#FF6B6B] to-[#FFA500] rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(/code-pattern.png)' }}></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-md transform scale-110"></div>
                  <Image
                    src="/coding-jojo-preview.webp"
                    alt="Coding Jojo Logo"
                    width={80}
                    height={80}
                    className="object-contain relative z-10"
                  />
                </div>
                
                {/* Carousel for motivational content */}
                <div className="h-40 relative w-full">
                  {motivationalContent.map((content, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{content.title}</h2>
                      <div className="h-1 w-16 bg-white rounded-full mb-4 opacity-80"></div>
                      <p className="text-center text-sm mb-6">{content.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Slide indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {motivationalContent.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-2 ${index === currentSlide ? 'w-6' : 'w-2 opacity-50'} rounded-full bg-white transition-all duration-300`}
                      onClick={() => setCurrentSlide(index)}
                    ></div>
                  ))}
                </div>
                
                {/* Stats section */}
                <div className="mt-8 w-full grid grid-cols-2 gap-4">
                  {motivationalContent[currentSlide].stats.map((stat, index) => (
                    <div key={index} className="text-center bg-white bg-opacity-10 p-3 rounded-lg">
                      <p className="text-xl font-bold">{stat.number}</p>
                      <p className="text-xs opacity-90">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column: Form */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">Create Account</h1>
              <p className="text-gray-600 text-sm mb-6 text-center md:text-left">Join Coding Jojo and start your journey</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Input */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="block text-xs font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className={`relative transition-all duration-300 ${formFocus.fullName ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className={`h-4 w-4 transition-colors duration-300 ${formFocus.fullName ? 'text-[#FF6B6B]' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('fullName')}
                      onBlur={() => handleBlur('fullName')}
                      className={`block w-full pl-9 pr-3 py-2.5 border ${formFocus.fullName ? 'border-[#FF6B6B] bg-pink-50' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 text-sm`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className={`relative transition-all duration-300 ${formFocus.email ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-4 w-4 transition-colors duration-300 ${formFocus.email ? 'text-[#FF6B6B]' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      className={`block w-full pl-9 pr-3 py-2.5 border ${formFocus.email ? 'border-[#FF6B6B] bg-pink-50' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 text-sm`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                    Password
                  </label>
                  <div className={`relative transition-all duration-300 ${formFocus.password ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-4 w-4 transition-colors duration-300 ${formFocus.password ? 'text-[#FF6B6B]' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => handleFocus('password')}
                      onBlur={() => handleBlur('password')}
                      className={`block w-full pl-9 pr-10 py-2.5 border ${formFocus.password ? 'border-[#FF6B6B] bg-pink-50' : 'border-gray-300 bg-white'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent transition-all duration-300 text-sm`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                      >
                        {showPassword ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength and Requirements */}
                {formData.password && (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password Strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrengthScore === 4 ? 'text-green-500' : 
                        passwordStrengthScore === 3 ? 'text-blue-500' : 
                        passwordStrengthScore === 2 ? 'text-yellow-500' : 
                        passwordStrengthScore === 1 ? 'text-red-500' : 'text-gray-500'
                      }`}>{strengthInfo.text}</span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strengthInfo.color} transition-all duration-300 ease-out`}
                        style={{ width: `${(passwordStrengthScore / 4) * 100}%` }}
                      ></div>
                    </div>
                    
                    {/* Compact Password Requirements */}
                    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                      <div className="flex items-center group">
                        {passwordStrength.length ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                        }
                        <span className={`text-xs ${passwordStrength.length ? 'text-green-500' : 'text-gray-500'}`}>
                          8+ characters
                        </span>
                      </div>
                      <div className="flex items-center group">
                        {passwordStrength.hasNumber ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                        }
                        <span className={`text-xs ${passwordStrength.hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
                          1+ number
                        </span>
                      </div>
                      <div className="flex items-center group">
                        {passwordStrength.hasUppercase ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                        }
                        <span className={`text-xs ${passwordStrength.hasUppercase ? 'text-green-500' : 'text-gray-500'}`}>
                          1+ uppercase
                        </span>
                      </div>
                      <div className="flex items-center group">
                        {passwordStrength.hasSpecial ? 
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> : 
                          <XCircle className="h-3 w-3 text-gray-300 mr-1" />
                        }
                        <span className={`text-xs ${passwordStrength.hasSpecial ? 'text-green-500' : 'text-gray-500'}`}>
                          1+ special char
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Checkbox - Simplified */}
                <div className="flex items-start py-2">
                  <div className="flex items-center h-5">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      required
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#FF6B6B] border-gray-300 rounded focus:ring-[#FF6B6B] transition-all duration-200"
                    />
                  </div>
                  <div className="ml-2 text-xs">
                    <label htmlFor="acceptTerms" className="text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#FF6B6B] hover:text-[#FFA500] font-medium underline-offset-2 hover:underline transition-all duration-200">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#FF6B6B] hover:text-[#FFA500] font-medium underline-offset-2 hover:underline transition-all duration-200">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                {/* Sign Up Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] hover:from-[#FF5A5A] hover:to-[#FF9400] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-300 font-medium group"
                  >
                    <span className="text-sm">Create Account</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>
              
              {/* Social Signup Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-3 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-200 group">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="ml-1 text-gray-700 text-xs font-medium">Google</span>
                    </div>
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-3 border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-200 group">
                    <div className="flex items-center">
                      <Github className="h-4 w-4 text-[#24292F] transition-transform duration-300 group-hover:scale-110" />
                      <span className="ml-1 text-gray-700 text-xs font-medium">GitHub</span>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-[#FF6B6B] hover:text-[#FFA500] transition-colors duration-300 underline-offset-2 hover:underline">
                    Sign in now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Montserrat', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Signup;
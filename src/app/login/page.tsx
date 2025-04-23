'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';
import Head from 'next/head';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [isAnimated, setIsAnimated] = useState(false);
  const [formFocus, setFormFocus] = useState({
    email: false,
    password: false
  });

  // Animation effect on component mount
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  
  const handleFocus = (field: string) => {
    setFormFocus(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFormFocus(prev => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', formData);
  };

  return (
    <>
      <Head>
        <title>Login | Coding Jojo</title>
        <meta name="description" content="Sign in to your Coding Jojo account to continue your learning journey." />
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
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Welcome Back!</h2>
                <div className="h-1 w-16 bg-white rounded-full mb-4 opacity-80"></div>
                <p className="text-center text-sm mb-6">Continue your coding journey and connect with fellow developers.</p>
                
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
                  <div className="h-2 w-6 rounded-full bg-white"></div>
                  <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
                </div>
                
                {/* Stats section */}
                <div className="mt-8 w-full grid grid-cols-2 gap-4">
                  <div className="text-center bg-white bg-opacity-10 p-3 rounded-lg">
                    <p className="text-xl font-bold">10K+</p>
                    <p className="text-xs opacity-90">Developers</p>
                  </div>
                  <div className="text-center bg-white bg-opacity-10 p-3 rounded-lg">
                    <p className="text-xl font-bold">500+</p>
                    <p className="text-xs opacity-90">Projects</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Login Form */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">Sign In</h1>
              <p className="text-gray-600 text-sm mb-6 text-center md:text-left">Access your account to continue</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-xs font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs font-medium text-[#FF6B6B] hover:text-[#FFA500] transition-colors duration-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className={`relative transition-all duration-300 ${formFocus.password ? 'transform scale-[1.02]' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-4 w-4 transition-colors duration-300 ${formFocus.password ? 'text-[#FF6B6B]' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
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

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#FF6B6B] border-gray-300 rounded focus:ring-[#FF6B6B]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-700">
                    Remember me on this device
                  </label>
                </div>

                {/* Login Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] hover:from-[#FF5A5A] hover:to-[#FF9400] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B] transition-all duration-300 font-medium group"
                  >
                    <span className="text-sm">Sign In</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </form>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">Or sign in with</span>
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

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-medium text-[#FF6B6B] hover:text-[#FFA500] transition-colors duration-300 underline-offset-2 hover:underline">
                    Sign up for free
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

export default Login;
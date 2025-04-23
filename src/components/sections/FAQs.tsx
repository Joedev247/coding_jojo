"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export function FAQSection() {
    const faqs = [
      {
        question: "How does the AI-powered learning work?",
        answer: "Our AI system analyzes your coding style, learning pace, and strengths/weaknesses to create a personalized curriculum. It continuously adapts based on your progress, focusing more on areas where you need additional practice while accelerating through concepts you grasp quickly."
      },
      {
        question: "Do I need prior coding experience to get started?",
        answer: "Not at all! Coding Jojo offers courses for complete beginners as well as advanced developers. Our AI assessment will determine your current skill level and recommend the perfect starting point for your journey."
      },
      {
        question: "How does the Smart Mentor feature help me learn?",
        answer: "Our AI Smart Mentor is available 24/7 to answer questions, provide hints without giving away solutions, explain complex concepts in simple terms, and offer encouragement when you're stuck. It's like having a patient tutor by your side whenever you need help."
      },
      {
        question: "Are the certifications recognized by employers?",
        answer: "Yes! Our certificates are industry-recognized and valued by employers. They verify not just completion but actual skill mastery through practical assessments. Many of our corporate partners prioritize Coding Jojo graduates in their hiring process."
      },
      {
        question: "Can I learn at my own pace?",
        answer: "Absolutely! Our platform is designed for flexibility. Work through lessons at your own pace, pause and resume whenever you need, and set your own schedule. The AI system will adjust to your learning rhythm while still providing gentle nudges to keep you on track."
      },
      {
        question: "What if I get stuck on a concept or coding challenge?",
        answer: "Getting stuck is part of learning! Our AI mentor provides progressive hints that guide you toward the solution without revealing it outright. If you're still struggling, you can schedule a session with a human mentor or join community study groups for additional support."
      }
    ];
  
    const [openIndex, setOpenIndex] = useState<number | null>(0);
  
    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <section className="bg-gray-50 py-16 md:py-24 font-['Montserrat',sans-serif] relative overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-64 -right-40 w-[500px] h-[500px] bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-[blob_9s_infinite]" />
        <div className="absolute -bottom-64 -left-40 w-[500px] h-[500px] bg-[#FFA500] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-[blob_7s_infinite_1s]" />
        
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10 rounded-full text-sm font-medium border border-[#FF6B6B]/20 mb-4">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
              <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Got Questions?
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">Questions</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our platform, learning methodology, and how we help you achieve your coding goals.
            </p>
          </div>
          
          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0">
                  <button
                    className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-left font-medium text-lg text-gray-800">{faq.question}</span>
                    <div className="ml-4">
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-[#FF6B6B]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Can't find answer CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't find the answer you're looking for?</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-shadow duration-300">
              Contact Support
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    );
  }
import React from 'react';
import { ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Our platform was rated the most popular online course or certification program for learning how to code according to StackOverflow's 2023 Developer survey.",
      icon: "/images/stackoverflow-icon.png",
      iconAlt: "StackOverflow",
      stats: "37,076 responses collected",
      link: {
        text: "View Web Development courses",
        url: "/courses/web-development"
      }
    },
    {
      id: 2,
      quote: "Our platform was truly a game-changer and a great guide for me as we brought Dimensional to life.",
      author: {
        name: "Alvin Lim",
        role: "Technical Co-Founder, CTO at Dimensional",
        image: "/images/alvin-lim.png"
      },
      link: {
        text: "View this iOS & Swift course",
        url: "/courses/ios-swift"
      }
    },
    {
      id: 3,
      quote: "Our platform gives you the ability to be persistent. I learned exactly what I needed to know in the real world. It helped me sell myself to get a new role.",
      author: {
        name: "William A. Wachlin",
        role: "Partner Account Manager at Amazon Web Services",
        image: "/images/william-wachlin.png"
      },
      link: {
        text: "View this AWS course",
        url: "/courses/aws"
      }
    },
    {
      id: 4,
      quote: "With our Business plan, employees were able to marry the two together, technology and consultant soft skills... to help drive their careers forward.",
      author: {
        name: "Ian Stevens",
        role: "Head of Capability Development, North America at Publicis Sapient",
        image: "/images/ian-stevens.png"
      },
      link: {
        text: "Read full story",
        url: "/success-stories/publicis-sapient"
      }
    }
  ];

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
            {/* Background Design */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF6B6B] rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#FFA500] rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            See what others are achieving through learning
          </h2>
          <p className="text-gray-600 mt-2">Real stories from our learners and partners</p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#FF6B6B]" />
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 text-sm mb-6 flex-grow">
                {testimonial.quote}
              </p>

              {/* Author or Stats */}
              {testimonial.author ? (
                <div className="flex items-center mt-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.author.image} 
                      alt={testimonial.author.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{testimonial.author.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.author.role}</p>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  {testimonial.icon && (
                    <div className="flex items-center mb-2">
                      <img 
                        src={testimonial.icon} 
                        alt={testimonial.iconAlt} 
                        className="w-6 h-6 mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">{testimonial.iconAlt}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">{testimonial.stats}</p>
                </div>
              )}

              {/* Link */}
              <div className="mt-6">
                <Link 
                  href={testimonial.link.url}
                  className="text-sm font-medium text-[#FF6B6B] hover:text-[#FFA500] flex items-center transition-colors"
                >
                  {testimonial.link.text}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
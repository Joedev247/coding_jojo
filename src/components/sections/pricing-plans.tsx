import React from 'react';
import { Check, ArrowRight, Users } from 'lucide-react';

interface PricingPlan {
  title: string;
  forText: string;
  userCount: string;
  price?: string;
  period?: string;
  priceText?: string;
  billingInfo?: string;
  buttonText: string;
  features: string[];
}

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Card Header */}
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FFA500]/10">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{plan.title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">{plan.forText}</p>
          <div className="flex items-center bg-[#FF6B6B]/10 px-2 py-1 rounded-full">
            <Users className="w-4 h-4 text-[#FF6B6B] mr-1" />
            <span className="text-xs text-[#FF6B6B]">{plan.userCount}</span>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="p-8 text-center">
        {plan.price ? (
          <>
            <div className="flex justify-center items-baseline mb-2">
              <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
              <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
            </div>
            <p className="text-xs text-gray-500">{plan.billingInfo}</p>
          </>
        ) : (
          <div className="text-xl font-bold text-gray-800">{plan.priceText}</div>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-8 pb-8 text-center">
        <button className="w-full py-3.5 px-4 bg-[#FF6B6B] hover:bg-[#FFA500] text-white font-medium rounded-lg flex items-center justify-center transition-all duration-300 group">
          {plan.buttonText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features List */}
      <div className="px-8 py-6 bg-gray-50 flex-grow">
        <ul className="space-y-4">
          {plan.features.map((feature: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <li key={index} className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingPlans = () => {
  const plans = [
    {
      title: "Personal Plan",
      forText: "For you",
      userCount: "Individual",
      price: "$10.00",
      period: "per month",
      billingInfo: "Billed monthly or annually. Cancel anytime.",
      buttonText: "Try it free",
      features: [
        "Access to 12,000+ top courses",
        "Certification prep",
        "Goal-focused recommendations",
        "AI-powered coding exercises"
      ]
    },
    {
      title: "Team Plan",
      forText: "For your team",
      userCount: "2 to 20 people",
      price: "$30.00",
      period: "per user/month",
      billingInfo: "Billed annually. Cancel anytime.",
      buttonText: "Try it free",
      features: [
        "Access to 12,000+ top courses",
        "Certification prep",
        "Goal-focused recommendations",
        "AI-powered coding exercises",
        "Analytics and adoption reports"
      ]
    },
    {
      title: "Enterprise Plan",
      forText: "For your whole organization",
      userCount: "More than 20 people",
      priceText: "Contact sales for pricing",
      buttonText: "Request a demo",
      features: [
        "Access to 27,000+ top courses",
        "Certification prep",
        "Goal-focused recommendations",
        "AI-powered coding exercises",
        "Advanced analytics and insights",
        "Dedicated customer success team",
        "International course collection featuring 15 languages",
        "Customizable content",
        "Hands-on tech training with add-on",
        "Strategic implementation services with add-on"
      ]
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

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Accelerate growth — for you or your organization
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reach goals faster with one of our plans or programs. Try one free today or contact sales to learn more.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
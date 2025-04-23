import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', variant = 'primary' }) => {
  let buttonStyle = 'px-4 py-2 rounded';

  // Apply styles based on the variant prop
  switch (variant) {
    case 'primary':
      buttonStyle += ' bg-blue-500 text-white';
      break;
    case 'secondary':
      buttonStyle += ' bg-gray-300 text-black';
      break;
    case 'tertiary':
      buttonStyle += ' bg-transparent border border-gray-300 text-gray-300';
      break;
    default:
      break;
  }

  return (
    <button onClick={onClick} className={`${buttonStyle} ${className}`}>
      {children}
    </button>
  );
};

export default Button;

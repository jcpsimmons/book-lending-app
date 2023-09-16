import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: (e?: any) => void;
  className?: string;
};

const Button = ({ children, onClick, className }: Props) => {
  return (
    <button
      className={`border-4 py-1 px-4  hover:scale-105 transform transition-all cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

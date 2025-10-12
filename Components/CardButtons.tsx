import React from 'react';
import Link  from 'next/link';


type CardButtonProps = {
  bgColor: string;
  href: string;
  children: React.ReactNode;
};

const CardButton: React.FC<CardButtonProps> = ({ bgColor, href, children }) => {
  return (
    <Link href={href} className='focus: outline-none'>
      <div
        className={`
          ${bgColor} 
          w-70 h-100 rounded-2xl flex items-center justify-center 
          font-bold text-white text-2xl 
          cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg hover:brightness-70 
        `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CardButton;
import React from 'react'

type HeroProps = {
  title: string;
  subtitle: string;
};

const Hero : React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <main className='flex flex-col'>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#CC1B59] text-white">
            <h1 className='text-7xl font-bold text-white'>
                {title}
            </h1>
            <p className="mt-2 text-lg text--600">
                {subtitle}
            </p>
            <p className='mt-2 text-lg text-gray-500'>
                Find and Rate your favorite movies
            </p>
        </div>
    </main>
  )
}

export default Hero
import React from 'react'

const Hero = () => {
  return (
    <main className='flex flex-col'>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#CC1B59] text-white">
            <h1 className='text-7xl font-bold text-white'>
                Welcome to MovGeek
            </h1>
            <p className="mt-2 text-lg text--600">
                Your hub for everything movies 🎬
            </p>
            <p className='mt-2 text-lg text-gray-500'>
                Find and Rate your favorite movies
            </p>
        </div>
        <div className='flex items-center justify-center min-h-screen bg-[#CC8E1B] text-white'>
            <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-40'>
                <div className="w-40 h-40 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                    Movies
                </div>
                <div className="w-40 h-40 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    MyList
                </div>
                <div className="w-40 h-40 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                    Ratings
                </div>
            </section>
        </div>
    </main>
  )
}

export default Hero
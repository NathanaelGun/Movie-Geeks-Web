"use client"

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-white text-[#CC351B] px-6 py-4 shadow-md'>
        <div className='text-2xl font-bold'>
            <Link href={"/"}>MovGeek</Link>
        </div>


        <div className="flex gap-6">
            <Link href="/" className='hover:text-gray-400'>
                Movies
            </Link>
            <Link href="/" className='hover:text-gray-400'>
                MyList
            </Link>
            <Link href="/" className='hover:text-gray-400'>
                Profile
            </Link>
        </div>
    </nav>
  )
}

export default Navbar
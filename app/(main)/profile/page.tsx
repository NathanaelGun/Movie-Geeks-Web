import React from 'react';
import Hero from '@/Components/Hero';
import Image from 'next/image';

// In a real application, this data would be fetched from your database after a user logs in.
const mockUser = {
  name: 'Alex Mercer',
  email: 'alex.mercer@movgeek.com',
  joinDate: 'October 2025',
  avatarUrl: 'https://placehold.co/150x150/7B68EE/FFFFFF?text=A',
};

const ProfilePage = () => {
  return (
    <div>
      <Hero
        title="My Profile"
        subtitle="Manage your account settings and preferences."
      />

      <div className="container mx-auto p-8 max-w-4xl">
        <div className="bg-gray-800/50 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          
          <Image
            src={mockUser.avatarUrl}
            alt="User Avatar"
            width={150}
            height={150}
            className="rounded-full border-4 border-violet-400"
          />
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">{mockUser.name}</h2>
            <p className="text-violet-300">{mockUser.email}</p>
            <p className="text-gray-400 mt-2">Member since {mockUser.joinDate}</p>
            
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
                {/* These buttons are for UI purposes for now */}
                <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Edit Profile
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Logout
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
"use client";

import React, { useState, useEffect } from "react";
import { getWatchlist } from "@/lib/watchlist";

const mockUser = {
  name: "Alex Mercer",
  email: "alex.mercer@movgeek.com",
  joinDate: "October 2025",
  avatarUrl: "https://placehold.co/150x150/f2ca50/131313?text=AM",
};

const ProfilePage = () => {
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    const list = getWatchlist();
    setWatchlistCount(list.length);
  }, []);

  return (
    <div className="flex-grow pt-32 pb-16 px-6 md:px-16 max-w-[1280px] mx-auto w-full relative z-10 flex items-center justify-center min-h-[80vh]">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Profile Card */}
      <div className="glass-panel rounded-xl p-8 w-full max-w-2xl flex flex-col items-center text-center gap-6 relative overflow-hidden group bg-surface-container-lowest/80 border border-white/5 shadow-2xl">
        {/* Avatar */}
        <div className="relative mb-2">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-b from-primary/20 to-transparent shadow-2xl">
            <img
              src={mockUser.avatarUrl}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover bg-surface-container-high border-4 border-surface-container-lowest"
            />
          </div>
          {/* Status indicator */}
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-surface-container-lowest"></div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 items-center z-10">
          <h1 className="text-3xl font-bold text-on-surface tracking-tight">{mockUser.name}</h1>
          <p className="text-lg text-on-surface-variant">{mockUser.email}</p>
          <div className="mt-2 px-4 py-1.5 rounded-full bg-surface-container-high/60 border border-outline-variant/30 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary select-none">verified</span>
            <span className="text-xs font-medium text-on-surface-variant">Member since {mockUser.joinDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4 z-10">
          <button className="flex-1 bg-gradient-to-r from-primary-fixed-dim to-primary hover:opacity-90 text-on-primary font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(242,202,80,0.15)]">
            <span className="material-symbols-outlined text-[20px] select-none">edit</span>
            Edit Profile
          </button>
          <button className="flex-1 bg-transparent border border-outline-variant hover:border-outline hover:bg-surface-container-high/60 text-on-surface font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex justify-center items-center gap-2">
            <span className="material-symbols-outlined text-[20px] select-none">logout</span>
            Logout
          </button>
        </div>

        {/* Quick Stats Bento */}
        <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-outline-variant/20 z-10 bg-primary/5 rounded-xl py-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">{watchlistCount}</span>
            <span className="text-xs font-semibold text-on-surface-variant mt-1">Watched</span>
          </div>
          <div className="flex flex-col items-center border-x border-outline-variant/20">
            <span className="text-2xl font-bold text-primary">{watchlistCount}</span>
            <span className="text-xs font-semibold text-on-surface-variant mt-1">MyList</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">{watchlistCount}</span>
            <span className="text-xs font-semibold text-on-surface-variant mt-1">Rated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
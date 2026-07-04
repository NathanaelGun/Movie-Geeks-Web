import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex-grow pt-32 pb-12 px-6 md:px-16 max-w-[1280px] mx-auto w-full">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-on-background">
          Explore Categories
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Dive into the cinematic universe. Curated collections for the discerning viewer.
        </p>
      </header>

      {/* Bento Grid / Glassmorphic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Hero Card: Movies */}
        <Link
          href="/movies"
          className="glass-card rounded-xl overflow-hidden md:col-span-8 group relative min-h-[400px] flex flex-col justify-end transition-all duration-300"
        >
          <div className="absolute inset-0 bg-surface-container-high/40 transition-colors group-hover:bg-surface-container-high/60"></div>
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/15 transition-all duration-300 pointer-events-none"></div>

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-3xl select-none">movie</span>
              <h2 className="text-2xl md:text-3xl font-bold text-on-background m-0">Movies</h2>
            </div>
            <p className="text-base md:text-lg text-on-surface-variant mb-6 max-w-md leading-relaxed">
              Browse our extensive, high-end archive of cinematic masterpieces. From timeless classics to modern auteurs.
            </p>
            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary-fixed transition-colors">
              Explore Collection <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </span>
          </div>
        </Link>

        {/* Right Column Stack */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* MyList Card */}
          <Link
            href="/mylist"
            className="glass-card rounded-xl overflow-hidden flex-1 relative group p-6 flex flex-col justify-between transition-all duration-300 min-h-[188px]"
          >
            <div className="absolute inset-0 bg-surface-container-high/40 transition-colors group-hover:bg-surface-container-high/60"></div>
            
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="material-symbols-outlined text-secondary text-3xl select-none">bookmarks</span>
              <span className="bg-surface-bright/50 text-on-surface text-xs backdrop-blur-md px-3 py-1 rounded-full font-medium">
                Saved Watchlist
              </span>
            </div>
            <div className="relative z-10 mt-4">
              <h3 className="text-xl font-bold text-on-background">MyList</h3>
              <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Your personal screening queue.</p>
            </div>
          </Link>

          {/* Profile Card */}
          <Link
            href="/profile"
            className="glass-card rounded-xl overflow-hidden flex-1 relative group p-6 flex flex-col justify-between transition-all duration-300 min-h-[188px]"
          >
            <div className="absolute inset-0 bg-surface-container-high/40 transition-colors group-hover:bg-surface-container-high/60"></div>

            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary text-3xl select-none">person</span>
            </div>
            <div className="relative z-10 mt-4 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-bold text-on-background">Profile</h3>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Preferences & History</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors select-none">
                settings
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}


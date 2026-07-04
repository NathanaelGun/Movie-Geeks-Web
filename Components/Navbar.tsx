"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto bg-surface/80 backdrop-blur-xl transition-all duration-300 ease-in-out border-b border-white/5 md:border-none">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
          MovGeek
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 ml-8 font-body-md text-body-md">
          <Link
            href="/movies"
            className={`${
              isLinkActive("/movies")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-on-surface transition-colors"
            } pb-1 transition-opacity duration-200 hover:opacity-80`}
          >
            Movies
          </Link>
          <Link
            href="/mylist"
            className={`${
              isLinkActive("/mylist")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-on-surface transition-colors"
            } pb-1 transition-opacity duration-200 hover:opacity-80`}
          >
            MyList
          </Link>
          <Link
            href="/profile"
            className={`${
              isLinkActive("/profile")
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-on-surface transition-colors"
            } pb-1 transition-opacity duration-200 hover:opacity-80`}
          >
            Profile
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/movies"
          className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high"
          aria-label="Search"
        >
          <span className="material-symbols-outlined leading-none align-middle">search</span>
        </Link>
        <button
          className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-high"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined leading-none align-middle">notifications</span>
        </button>
        <Link
          href="/profile"
          className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 ml-2 hidden md:block"
        >
          <img
            src="https://placehold.co/150x150/f2ca50/131313?text=AM"
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
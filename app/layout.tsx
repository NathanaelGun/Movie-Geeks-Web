import "./globals.css";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from "@/Components/Navbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "MovGeek",
  description: "Place for your movie review",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* 2. Place Navbar here, outside of children */}
        {children}
      </body>
    </html>
  );
}
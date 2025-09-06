import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
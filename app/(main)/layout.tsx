import Navbar from '@/Components/Navbar'; // Adjust the import path if needed
import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
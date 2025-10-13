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
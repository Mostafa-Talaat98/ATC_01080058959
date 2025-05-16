import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin');
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {isAdminPanel ? (
          <div className="container py-6">{children}</div>
        ) : (
          <>{children}</>
        )}
      </main>
      <Footer />
    </div>
  );
};

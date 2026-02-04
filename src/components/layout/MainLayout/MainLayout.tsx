import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children?: React.ReactNode;
}

/**
 * MainLayout - Public layout with Header, Content, and Footer
 * Used for public pages like Home, About, Contact
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      <Header />

      <main className="flex-1 py-8">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, Home, Layers, Monitor, Scissors, Package } from 'lucide-react';
import { PageRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Beranda', route: PageRoute.HOME, icon: <Home size={18} /> },
    { label: 'Teknik Dasar', route: PageRoute.TECHNIQUE, icon: <Layers size={18} /> },
    { label: 'Hal 3', route: PageRoute.PAGE_3, icon: <Monitor size={18} /> },
    { label: 'Hal 4', route: PageRoute.PAGE_4, icon: <Scissors size={18} /> },
    { label: 'Hal 5', route: PageRoute.PAGE_5, icon: <Package size={18} /> },
    { label: 'Hal 6', route: PageRoute.PAGE_6, icon: <BookOpen size={18} /> },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick(PageRoute.HOME)}>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Teknik Grafika</h1>
                <p className="text-xs text-slate-500 font-medium">SMK Negeri 1 Kaligondang</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    location.pathname === item.route
                      ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 ${
                    location.pathname === item.route
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 flex justify-center items-center gap-2 text-slate-400">
             <div className="h-px w-12 bg-slate-700"></div>
             <span className="text-sm uppercase tracking-wider">SMK Negeri 1 Kaligondang</span>
             <div className="h-px w-12 bg-slate-700"></div>
          </div>
          <p className="text-slate-300 font-medium">
            Dibangun dengan dedikasi oleh: <span className="text-primary-400">Malabi Wibowo Susanto</span>
          </p>
          <p className="text-xs text-slate-500 mt-2">
            © {new Date().getFullYear()} Media Pembelajaran Teknik Grafika. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
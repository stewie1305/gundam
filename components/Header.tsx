
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, darkMode, onToggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card-light dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
      <div className="px-4 lg:px-8 py-3 mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="size-8 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">smart_toy</span>
              </div>
              <h1 className="font-display text-gray-900 dark:text-white text-xl lg:text-2xl font-bold tracking-tight">GundamBase</h1>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary font-display" 
                placeholder="Find your mobile suit..." 
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              <a className="text-sm font-bold font-display text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" href="#">New Arrivals</a>
              <a className="text-sm font-bold font-display text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" href="#">Exclusives</a>
              <a className="text-sm font-bold font-display text-gray-700 dark:text-gray-300 hover:text-primary transition-colors" href="#">Series</a>
              <a className="text-sm font-bold font-display text-red-500 hover:text-red-600 transition-colors" href="#">Sale</a>
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={onToggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
              </button>
              
              <button className="relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group">
                <span className="material-symbols-outlined group-hover:text-primary">shopping_cart</span>
                <span className="absolute top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-gray-900 ring-2 ring-white dark:ring-gray-900">2</span>
              </button>
              
              {user ? (
                <Link to={user.role === 'COMMANDER' ? '/admin' : '/'} className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white uppercase italic">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold dark:text-white hidden sm:block">{user.name}</span>
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group">
                  <span className="material-symbols-outlined group-hover:text-primary">account_circle</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

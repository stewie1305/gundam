import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";

interface HeaderProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  cartCount: number;
  onOpenCart?: () => void;
  onLogout?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  cartCount,
  onOpenCart,
  onLogout,
  searchQuery = "",
  onSearchChange,
}) => {
  const [animateCart, setAnimateCart] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-card-dark/80 border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors backdrop-blur-md">
      <div className="px-4 lg:px-8 py-3 mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="size-8 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">
                  smart_toy
                </span>
              </div>
              <h1 className="font-display text-gray-900 dark:text-white text-xl lg:text-2xl font-bold tracking-tight italic uppercase text-shadow-glow">
                GundamBase
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary font-display"
                placeholder="Find kits, tools, or paints..."
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className="text-xs font-bold font-display uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                Market
              </Link>
              <a
                className="text-xs font-bold font-display uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                href="#"
              >
                Exclusives
              </a>
              <a
                className="text-xs font-bold font-display uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                href="#"
              >
                Series
              </a>
              <a
                className="text-xs font-bold font-display uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                href="#"
              >
                Sale
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onToggleDarkMode}
                className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">
                  {darkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <button
                onClick={onOpenCart}
                className={`relative p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all group ${
                  animateCart ? "animate-cart-pulse scale-110" : ""
                }`}
              >
                <span
                  className={`material-symbols-outlined group-hover:text-primary ${
                    animateCart ? "scale-110 text-primary" : ""
                  } transition-transform`}
                >
                  shopping_cart
                </span>
                {cartCount > 0 && (
                  <span
                    className={`absolute top-1 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-gray-900 ring-2 ring-white dark:ring-gray-900 shadow-[0_0_10px_rgba(0,224,84,0.5)] ${
                      animateCart ? "animate-bounce" : ""
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="relative" ref={menuRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95 group"
                    >
                      <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-black uppercase italic shadow-sm overflow-hidden border border-primary/20">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <span className="text-xs font-bold dark:text-white hidden sm:block uppercase tracking-tighter">
                        {user.name}
                      </span>
                      <span
                        className={`material-symbols-outlined text-sm transition-transform duration-300 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {/* Pilot Menu Dropdown */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800 flex items-center gap-3">
                          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <span className="material-symbols-outlined">
                              person
                            </span>
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-black text-gray-900 dark:text-white truncate uppercase italic leading-none">
                              {user.name}
                            </span>
                            <span className="text-[10px] text-primary font-mono font-bold mt-1">
                              RANK: {user.role}
                            </span>
                          </div>
                        </div>

                        <div className="p-1">
                          {user.role !== "CUSTOMER" && (
                            <Link
                              to="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors group"
                            >
                              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                                admin_panel_settings
                              </span>
                              Commander Hangar
                            </Link>
                          )}
                          <Link
                            to="/order-history"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                              history
                            </span>
                            Deployment History
                          </Link>
                          <button
                            onClick={() => setIsUserMenuOpen(false)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                              package_2
                            </span>
                            Return Request
                          </button>
                          <Link
                            to="/pilot-settings"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                              settings
                            </span>
                            Pilot Settings
                          </Link>
                        </div>

                        <div className="p-1 border-t border-gray-100 dark:border-zinc-800">
                          <button
                            onClick={handleLogoutClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                              logout
                            </span>
                            Eject (Logout)
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                  >
                    <span className="material-symbols-outlined group-hover:text-primary">
                      account_circle
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

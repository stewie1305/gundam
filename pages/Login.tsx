import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User } from "../types";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: pilot login if email is pilot, commander if admin is in the string
    const role = email.toLowerCase().includes("admin") ? "COMMANDER" : "PILOT";
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0] || "Pilot",
      role: role,
    };
    onLogin(mockUser);
    navigate(role === "COMMANDER" ? "/admin" : "/");
  };

  const handleGoToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-jakarta text-zinc-900 min-h-screen">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-zinc-200 px-10 py-3 bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <Link
          to="/"
          className="flex items-center gap-4 text-zinc-900 dark:text-white"
        >
          <div className="size-8 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-[32px]">
              robot_2
            </span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            GundamBase
          </h2>
        </Link>
        <div className="flex gap-2">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>
          </button>
        </div>
      </header>

      <main className="flex justify-center py-10 px-4 md:px-10">
        <div className="w-full max-w-[1200px] bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-xl flex flex-col lg:flex-row min-h-[700px] border border-gray-100 dark:border-zinc-800">
          <div className="lg:w-1/2 relative bg-zinc-100 dark:bg-black flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdG1sZd7oCYuTgupVlm4K2M6dOSLSwdEyF2BuVw2pweCTgjqHWFeKGfgHI-s-OJOJsHluKHp1bAolWxLMGtg9o_n08_22yy5fOsMUjeqhFcNb5d7ZwCm9QJo7PikaTFDh_TIkThYCiWb9n-rx3vzftW-tExtvk1-wRwJOjVXyuBT9sNlH5B3N2S4MHced2pJvhypxRuMBzUVrwj51eMY_TNGGEmxj9sSXyUr003TlOJ-CBsrwgZLbo86msLU0d1UsGHAJ6t4tPMKc")',
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 w-full h-full flex flex-col justify-end text-white p-6">
              <div className="bg-primary/90 backdrop-blur-sm p-4 rounded-xl inline-block w-max mb-4 shadow-lg shadow-green-900/20">
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  New Arrival
                </span>
              </div>
              <h2 className="text-4xl font-extrabold mb-2">
                Build Your Legacy.
              </h2>
              <p className="text-lg opacity-90 font-medium max-w-md">
                Join the elite pilots and get early access to exclusive models
                and limited editions.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-zinc-900">
            <div className="max-w-[480px] mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-zinc-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-3">
                  Welcome Back, Pilot
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-base font-normal leading-normal">
                  Log in to access your hangar and track your orders.
                </p>
              </div>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-zinc-900 dark:text-white text-sm font-bold leading-normal"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500 material-symbols-outlined">
                      mail
                    </span>
                    <input
                      className="form-input w-full rounded-xl text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 text-base transition-all duration-200"
                      id="email"
                      placeholder="pilot@example.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label
                      className="text-zinc-900 dark:text-white text-sm font-bold leading-normal"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500 material-symbols-outlined">
                      lock
                    </span>
                    <input
                      className="form-input w-full rounded-xl text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 text-base transition-all duration-200"
                      id="password"
                      placeholder="••••••••"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <a
                      className="text-primary hover:text-green-600 text-sm font-bold transition-colors"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-primary hover:bg-green-600 text-black h-14 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Initiate Launch</span>
                  <span className="material-symbols-outlined text-sm">
                    rocket_launch
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleGoToAdmin}
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-black h-14 rounded-xl font-bold text-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Go to Admin Page</span>
                  <span className="material-symbols-outlined text-sm">
                    admin_panel_settings
                  </span>
                </button>

                <div className="text-center text-xs text-zinc-500 mt-2 font-mono italic">
                  Tip: Log in with an "admin" email to unlock the Commander
                  Panel.
                </div>
              </form>

              <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm font-medium">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-center gap-3 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium w-full">
                  <span className="material-symbols-outlined text-blue-500">
                    google
                  </span>
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

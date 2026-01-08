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
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate tactical authorization delay
    setTimeout(() => {
      // Demo account check
      if (email === "123@123" && password === "123@123") {
        const demoUser: User = {
          id: "DEMO-PILOT-001",
          name: "Demo Pilot",
          role: "CUSTOMER",
        };
        onLogin(demoUser);
        navigate("/select-role");
        return;
      }

      // Standard login logic
      const role = email.toLowerCase().includes("admin")
        ? "SYSTEM_ADMIN"
        : "CUSTOMER";
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0] || "Pilot",
        role: role as any,
      };
      onLogin(mockUser);
      navigate(role === "SYSTEM_ADMIN" ? "/admin" : "/");
      setIsLoading(false);
    }, 800);
  };

  const handleForgotPassword = () => {
    alert(
      "NEURAL RESET: A tactical recovery link has been dispatched to your registered comms channel."
    );
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const googleUser: User = {
        id: "GOOGLE-PILOT-" + Math.floor(Math.random() * 1000),
        name: "Google Pilot",
        role: "CUSTOMER",
      };
      onLogin(googleUser);
      navigate("/");
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-jakarta text-zinc-900 min-h-screen">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-zinc-200 px-6 md:px-10 py-3 bg-white dark:bg-zinc-900 dark:border-zinc-800 sticky top-0 z-50">
        <Link
          to="/"
          className="flex items-center gap-4 text-zinc-900 dark:text-white group"
        >
          <div className="size-8 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-[32px]">
              robot_2
            </span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] uppercase italic">
            GundamBase
          </h2>
        </Link>
      </header>

      <main className="flex justify-center py-6 md:py-10 px-4 md:px-10">
        <div className="w-full max-w-[1200px] bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[750px] border border-gray-100 dark:border-zinc-800">
          {/* Left Hero Section */}
          <div className="lg:w-1/2 relative bg-zinc-100 dark:bg-black flex items-center justify-center p-8 overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdG1sZd7oCYuTgupVlm4K2M6dOSLSwdEyF2BuVw2pweCTgjqHWFeKGfgHI-s-OJOJsHluKHp1bAolWxLMGtg9o_n08_22yy5fOsMUjeqhFcNb5d7ZwCm9QJo7PikaTFDh_TIkThYCiWb9n-rx3vzftW-tExtvk1-wRwJOjVXyuBT9sNlH5B3N2S4MHced2pJvhypxRuMBzUVrwj51eMY_TNGGEmxj9sSXyUr003TlOJ-CBsrwgZLbo86msLU0d1UsGHAJ6t4tPMKc")',
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full h-full flex flex-col justify-end text-white p-6 md:p-10">
              <div className="bg-primary/90 backdrop-blur-md p-4 rounded-xl inline-block w-max mb-6 shadow-lg shadow-green-900/40">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black">
                  Pilot Identity Verified
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter leading-none">
                Neural Link <br />
                <span className="text-primary">Initialized.</span>
              </h2>
              <p className="text-base md:text-lg opacity-80 font-medium max-w-md">
                Connect to the central mainframe to manage your deployments and
                resources.
              </p>
            </div>
          </div>

          {/* Right Login Section */}
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-zinc-900">
            <div className="max-w-[480px] mx-auto w-full space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-zinc-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-3 uppercase italic">
                  System Login
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  Enter credentials to unlock the role selection matrix.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest pl-1"
                    htmlFor="email"
                  >
                    Pilot Designation
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500 material-symbols-outlined">
                      badge
                    </span>
                    <input
                      className="form-input w-full rounded-2xl text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 text-sm font-medium transition-all duration-200"
                      id="email"
                      placeholder="Username or email"
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest pl-1"
                    htmlFor="password"
                  >
                    Security Code
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-zinc-500 material-symbols-outlined">
                      lock
                    </span>
                    <input
                      className="form-input w-full rounded-2xl text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 focus:border-primary focus:ring-1 focus:ring-primary h-14 pl-12 pr-4 text-sm font-medium transition-all duration-200"
                      id="password"
                      placeholder="Password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end px-1 mt-1">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-primary hover:text-primary-dark text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full bg-primary hover:bg-green-600 text-black h-16 rounded-2xl font-black text-lg uppercase italic tracking-tighter shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="material-symbols-outlined animate-spin">
                      refresh
                    </span>
                  ) : (
                    <>
                      <span>Log in</span>
                      <span className="material-symbols-outlined">
                        rocket_launch
                      </span>
                    </>
                  )}
                </button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
                  <span className="flex-shrink-0 mx-4 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    OR PROVIDE BIOMETRICS
                  </span>
                  <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <div className="text-center space-y-4 pt-4">
                  <p className="text-zinc-500 text-xs font-medium">
                    New Pilot in training?
                    <button
                      type="button"
                      className="ml-2 text-primary font-black uppercase italic hover:underline"
                    >
                      Apply for Certification
                    </button>
                  </p>

                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <p className="text-[10px] text-zinc-500 font-mono italic">
                      DEMO CREDENTIALS:{" "}
                      <span className="text-primary font-bold">123@123</span> /{" "}
                      <span className="text-primary font-bold">123@123</span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

import React from "react";

export const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-[1100px] bg-white dark:bg-card-dark rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[650px] border border-gray-100 dark:border-zinc-800">
        <div className="lg:w-1/2 relative bg-zinc-100 dark:bg-black flex items-center justify-center p-8 overflow-hidden group">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-center bg-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 dark:opacity-40"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdG1sZd7oCYuTgupVlm4K2M6dOSLSwdEyF2BuVw2pweCTgjqHWFeKGfgHI-s-OJOJsHluKHp1bAolWxLMGtg9o_n08_22yy5fOsMUjeqhFcNb5d7ZwCm9QJo7PikaTFDh_TIkThYCiWb9n-rx3vzftW-tExtvk1-wRwJOjVXyuBT9sNlH5B3N2S4MHced2pJvhypxRuMBzUVrwj51eMY_TNGGEmxj9sSXyUr003TlOJ-CBsrwgZLbo86msLU0d1UsGHAJ6t4tPMKc")',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full h-full flex flex-col justify-end text-white p-8">
            <div className="bg-primary/90 backdrop-blur-md p-3 rounded-lg inline-block w-max mb-6 shadow-xl shadow-primary/20">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                Authentication Required
              </span>
            </div>
            <h2 className="text-5xl font-black mb-4 italic tracking-tighter uppercase leading-none">
              Build Your <br />
              <span className="text-primary">Legacy.</span>
            </h2>
            <p className="text-lg text-zinc-300 font-medium max-w-md">
              Join the elite pilot community and gain access to Anaheim
              Electronics confidential releases.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[420px] mx-auto w-full">
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-zinc-900 dark:text-white text-4xl font-black italic uppercase tracking-tighter mb-4">
                Welcome Back
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                Initialize your pilot credentials to enter the hangar.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest pl-1"
                  htmlFor="email"
                >
                  Pilot ID / Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 material-symbols-outlined">
                    badge
                  </span>
                  <input
                    className="w-full h-14 rounded-2xl text-zinc-900 dark:text-white border-2 border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:border-primary focus:ring-0 pl-12 pr-4 transition-all duration-300 font-medium placeholder:text-zinc-600"
                    id="email"
                    placeholder="amuro.ray@ae.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="px-1">
                  <label
                    className="text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest"
                    htmlFor="password"
                  >
                    Encrypted Code
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 material-symbols-outlined">
                    encrypted
                  </span>
                  <input
                    className="w-full h-14 rounded-2xl text-zinc-900 dark:text-white border-2 border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 focus:border-primary focus:ring-0 pl-12 pr-4 transition-all duration-300 font-medium placeholder:text-zinc-600"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <div className="flex justify-end px-1">
                  <a
                    className="text-primary hover:text-primary-dark text-xs font-bold transition-colors"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-black h-16 rounded-2xl font-black text-lg uppercase italic tracking-tighter shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95">
                <span>Initiate Launch</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
                <span className="flex-shrink-0 mx-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                  Backup Auth
                </span>
                <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-bold text-xs uppercase tracking-tighter">
                  <span className="material-symbols-outlined !text-xl text-blue-500">
                    fingerprint
                  </span>
                  Login with Biometric
                </button>
              </div>
            </form>

            <div className="mt-12 text-center">
              <p className="text-zinc-500 text-sm font-medium">
                New pilot in training? <br />
                <a
                  className="text-primary font-black hover:underline decoration-2 underline-offset-4 uppercase tracking-tighter italic"
                  href="#"
                >
                  Apply for Certification
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

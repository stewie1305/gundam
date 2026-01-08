import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <span className="material-symbols-outlined text-3xl">
                smart_toy
              </span>
              <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                GundamBase
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              The ultimate destination for Gunpla builders and collectors
              worldwide. Powered by Haro AI.
            </p>
            <div className="flex gap-4">
              <a
                className="text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                className="text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a className="hover:text-primary" href="#">
                  New Arrivals
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Best Sellers
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Pre-orders
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a className="hover:text-primary" href="#">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-gray-900 dark:text-white mb-4">
              Join the Community
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe for updates on new drops and restocks.
            </p>
            <form className="flex gap-2">
              <input
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary dark:text-white"
                placeholder="Email address"
                type="email"
              />
              <button
                className="bg-primary text-gray-900 p-2 rounded-lg hover:bg-primary-dark transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} GundamBase. All rights reserved. Not
          affiliated with Bandai or Sunrise.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

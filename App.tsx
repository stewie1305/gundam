import React, { useState, useEffect, useCallback } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CartModal from "./components/CartModal";
import { User, Product, CartItem } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const showToast = useCallback(
    (message: string, type: "success" | "info" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} deployed to cart!`, "success");
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <HashRouter>
      <div className="relative">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
                onAddToCart={addToCart}
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route
            path="/admin"
            element={
              <Admin
                user={user}
                onLogout={() => setUser(null)}
                cartCount={cartCount}
              />
            }
          />
        </Routes>

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
        />

        {/* Toast Notification System */}
        {toast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 duration-300">
            <div
              className={`px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border ${
                toast.type === "success"
                  ? "bg-primary text-black border-primary-dark font-bold"
                  : "bg-zinc-800 text-white border-zinc-700"
              }`}
            >
              <span className="material-symbols-outlined">
                {toast.type === "success" ? "check_circle" : "info"}
              </span>
              <span className="uppercase text-xs tracking-widest italic">
                {toast.message}
              </span>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
};

export default App;

import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import RoleSelection from "./pages/RoleSelection";
import OrderHistory from "./pages/OrderHistory";
import PilotSettings from "./pages/PilotSettings";
import CartModal from "./components/CartModal";
import { User, Product, CartItem, Order, PilotProfile } from "./types";
import { PRODUCTS } from "./constants";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => [
    { ...PRODUCTS[0], quantity: 1 },
    { ...PRODUCTS[1], quantity: 1 },
  ]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [profiles, setProfiles] = useState<PilotProfile[]>([]);
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
      setTimeout(() => setToast(null), 2000);
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
    showToast(`${product.name.toUpperCase()} REQUISITIONED`, "success");
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const saveProfile = (profile: PilotProfile) => {
    setProfiles((prev) => {
      const exists = prev.find((p) => p.id === profile.id);
      if (exists) {
        return prev.map((p) => (p.id === profile.id ? profile : p));
      }
      return [...prev, profile];
    });
  };

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutNavigation = () => {
    setIsCartOpen(false);
    if (!user) {
      showToast("IDENTITY VERIFICATION REQUIRED", "info");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const handleLogout = () => {
    setUser(null);
    showToast("PILOT DISCONNECTED", "info");
    navigate("/login");
  };

  const handleUpdateRole = (role: User["role"]) => {
    if (user) {
      setUser({ ...user, role });
      showToast(`CLEARANCE: ${role.replace("_", " ")}`, "success");
    }
  };

  return (
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
              cartItems={cartItems}
              cartCount={cartCount}
              onOpenCart={() => setIsCartOpen(true)}
              onRemoveFromCart={removeFromCart}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/select-role"
          element={
            <RoleSelection user={user} onSelectRole={handleUpdateRole} />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin user={user} onLogout={handleLogout} cartCount={cartCount} />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              user={user}
              cartItems={cartItems}
              onClearCart={clearCart}
              onShowToast={showToast}
              onCompleteOrder={addOrder}
              profiles={profiles}
              onSaveProfile={saveProfile}
            />
          }
        />
        <Route
          path="/order-history"
          element={
            <OrderHistory
              user={user}
              orders={orders}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              cartCount={cartCount}
              onOpenCart={() => setIsCartOpen(true)}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/pilot-settings"
          element={
            <PilotSettings
              user={user}
              profiles={profiles}
              onSaveProfile={saveProfile}
              onDeleteProfile={deleteProfile}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              cartCount={cartCount}
              onOpenCart={() => setIsCartOpen(true)}
              onLogout={handleLogout}
            />
          }
        />
      </Routes>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={handleCheckoutNavigation}
      />

      {/* Tactical HUD Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-hud-in pointer-events-none">
          <div className="relative overflow-hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-[2px]">
            {/* HUD Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-full w-full opacity-30 pointer-events-none animate-[scanline_2s_linear_infinite]"></div>

            <div className="relative bg-zinc-950/40 px-8 py-4 flex items-center gap-5 border border-white/5">
              {/* Status Indicator */}
              <div className="relative size-8 shrink-0">
                <div
                  className={`absolute inset-0 rounded-full animate-ping opacity-40 ${
                    toast.type === "success" ? "bg-primary" : "bg-blue-400"
                  }`}
                ></div>
                <div
                  className={`relative size-full flex items-center justify-center rounded-sm ${
                    toast.type === "success" ? "text-primary" : "text-blue-400"
                  }`}
                >
                  <span className="material-symbols-outlined !text-2xl">
                    {toast.type === "success" ? "sensors" : "info"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 font-mono">
                  System Alert // Tactical Data
                </span>
                <span
                  className={`text-sm font-black tracking-widest uppercase italic font-display ${
                    toast.type === "success" ? "text-primary" : "text-white"
                  }`}
                >
                  {toast.message}
                </span>
              </div>

              {/* HUD Corner Decorators */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

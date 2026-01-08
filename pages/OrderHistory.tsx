import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, Order } from "../types";

interface OrderHistoryProps {
  user: User | null;
  orders: Order[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onLogout: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({
  user,
  orders,
  darkMode,
  onToggleDarkMode,
  cartCount,
  onOpenCart,
  onLogout,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-dark-bg transition-colors duration-200">
      <Header
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onLogout={onLogout}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
                Deployment Logs
              </h2>
              <p className="text-zinc-500 text-sm font-mono mt-1">
                Anaheim Electronics Tactical History // Pilot:{" "}
                {user?.name || "Amuro Ray"}
              </p>
            </div>
            <Link
              to="/"
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-black px-6 py-3 rounded-xl transition-all flex items-center gap-2 uppercase italic text-sm tracking-tighter"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              New Sortie
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white dark:bg-card-dark rounded-[40px] p-20 border border-gray-100 dark:border-zinc-800 text-center space-y-6 shadow-xl">
              <div className="size-24 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                <span className="material-symbols-outlined !text-6xl">
                  history
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
                  No Active Deployments
                </h3>
                <p className="text-zinc-500 max-w-sm mx-auto font-medium">
                  You haven't initialized any model kit deployments yet. Head to
                  the market to begin your mission.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex bg-primary text-black font-black px-10 py-4 rounded-2xl uppercase italic tracking-tighter shadow-lg shadow-primary/30"
              >
                Browse Hangar
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[32px] overflow-hidden shadow-xl transition-all hover:border-primary/40"
                >
                  <div className="p-6 md:p-8 bg-gray-50 dark:bg-black/40 border-b border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-primary uppercase tracking-widest font-mono">
                          {order.id}
                        </span>
                        <span className="text-zinc-400 text-xs">•</span>
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
                        Deployment Authorized
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          order.status === "PROCESSING"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : order.status === "DEPLOYED"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}
                      >
                        {order.status}
                      </span>
                      <div className="h-6 w-px bg-gray-200 dark:bg-zinc-800 hidden sm:block"></div>
                      <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Via {order.paymentMethod.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-8 space-y-6">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 md:gap-6 group">
                            <div className="size-20 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-2 border border-gray-100 dark:border-zinc-700 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mb-1">
                                    {item.grade} // {item.scale}
                                  </p>
                                  <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
                                    {item.name}
                                  </h4>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-black text-gray-900 dark:text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                  <p className="text-[10px] text-zinc-500 font-mono">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                            <span>Operational Total</span>
                            <span className="text-lg font-black text-primary italic font-display">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 leading-relaxed font-mono italic">
                            * This shipment is tracking under AE-LOGISTICS
                            protocol. Expected ETA is 3-5 standard deployment
                            days.
                          </p>
                        </div>
                        <button className="w-full mt-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-xs uppercase italic tracking-tighter hover:bg-primary hover:text-black transition-all">
                          View Detailed Tracking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;

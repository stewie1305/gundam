import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GeminiAssistant from "../components/GeminiAssistant";
import { User, Product } from "../types";
import { PRODUCTS } from "../constants";

interface HomeProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Home: React.FC<HomeProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  onAddToCart,
  cartCount,
  onOpenCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenProduct = (p: Product) => {
    setSelectedProduct(p);
  };

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
      <Header
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-16">
        {/* Hero Section */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-card-dark shadow-sm">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="flex-1 p-8 lg:p-16 flex flex-col gap-6 items-start z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-green-300 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">
                  new_releases
                </span>
                Just Dropped
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                The Witch from <span className="text-primary">Mercury</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                The new HG Aerial Rebuild is finally here. Experience the
                cutting-edge engineering of the Ad Stella timeline.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <button className="bg-primary hover:bg-primary-dark text-gray-900 px-8 py-3 rounded-lg font-bold font-display shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  Shop Now
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-64 sm:h-96 lg:h-[500px] relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-gray-900 flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 dark:opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#00e054 2px, transparent 2px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
              <div className="relative w-full h-full p-8 flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbDlWiaH3tYxJazGhUGfsURtqBsH0dy-k3LiOEXZ8mtHksDA9ikiUIHh1h-bdN44X-dcTqbGbOg3o75hh0UnxVo6pdmLdeLZYTOOC4HrSXpsVskwEBCGvmRPMDF847HxqtFm_WNtXa0QOkSu7pdWE7kS_6QkAzXOVJQK36U5scrb_mNev4VotER_Il9oko7V5gpYH3PVJx0O7KI6KGZNIHLFADQK_eY--NCiabovp6OjWqz7zxGIA3pr6A916lWixm-CpIkDbhDKk"
                  alt="HG Gundam Aerial"
                  className="max-h-full object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Gunpla
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                onClick={() => handleOpenProduct(p)}
                className="group cursor-pointer bg-white dark:bg-card-dark rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative aspect-square p-6 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                  <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                    {p.grade} {p.scale}
                  </span>
                  {p.hot && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">
                      HOT
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full object-contain transition-transform group-hover:scale-110 duration-500"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => handleAddToCart(e, p)}
                      className="h-10 w-10 bg-primary text-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors"
                      title="Add to Cart"
                    >
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                    <button className="h-10 w-10 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {p.series}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-display font-bold text-xl text-primary">
                      ${p.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-sm">
                        star
                      </span>
                      <span className="text-xs font-bold text-gray-500 pt-0.5">
                        {p.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined dark:text-white">
                close
              </span>
            </button>

            <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800/50 p-12 flex items-center justify-center relative">
              <img
                src={selectedProduct.image}
                className="max-h-full object-contain drop-shadow-2xl"
                alt={selectedProduct.name}
              />
            </div>

            <div className="md:w-1/2 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <p className="text-primary font-bold text-xs uppercase tracking-widest">
                  {selectedProduct.grade} {selectedProduct.scale}
                </p>
                <h2 className="text-3xl font-black font-display text-gray-900 dark:text-white leading-tight uppercase italic">
                  {selectedProduct.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedProduct.series}
                </p>
              </div>

              <div className="flex items-center gap-4 py-4 border-y border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    Requisition Price
                  </span>
                  <span className="text-3xl font-black font-display text-gray-900 dark:text-white italic">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                </div>
                <div className="ml-auto">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest ${
                      selectedProduct.stock > 0
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedProduct.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                  </span>
                </div>
              </div>

              <div className="py-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {selectedProduct.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-primary hover:bg-primary-dark text-black font-black py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 italic uppercase tracking-tighter text-lg hover:-translate-y-1 active:scale-95"
              >
                ADD TO HANGAR
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <GeminiAssistant />
    </div>
  );
};

export default Home;

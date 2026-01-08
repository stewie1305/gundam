
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GeminiAssistant from '../components/GeminiAssistant';
import { User, Product, CartItem } from '../types';
import { PRODUCTS } from '../constants';
import { analyzeKit } from '../services/geminiService';

interface HomeProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (id: string) => void;
  cartCount: number;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onLogout: () => void;
}

const GRADES = ['ALL', 'HG', 'RG', 'MG', 'PG', 'EG', 'TOOL', 'PAINT', 'SERVICE'];

const Home: React.FC<HomeProps> = ({ 
  user, 
  darkMode, 
  onToggleDarkMode, 
  onAddToCart, 
  onRemoveFromCart,
  cartCount, 
  cartItems,
  onOpenCart,
  onLogout
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGrade, setFilterGrade] = useState('ALL');

  const handleOpenProduct = async (p: Product) => {
    setSelectedProduct(p);
    setIsAnalyzing(true);
    const aiTips = await analyzeKit(p.name);
    setTips(aiTips);
    setIsAnalyzing(false);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.series.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGrade = filterGrade === 'ALL' || p.grade === filterGrade;
      return matchesSearch && matchesGrade;
    });
  }, [searchQuery, filterGrade]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
      <Header 
        user={user} 
        darkMode={darkMode} 
        onToggleDarkMode={onToggleDarkMode} 
        cartCount={cartCount} 
        onOpenCart={onOpenCart} 
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-12">
        
        {/* Hero Section */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="flex-1 p-8 lg:p-16 flex flex-col gap-6 items-start z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-green-300 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">new_releases</span>
                Just Dropped
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                The Witch from <span className="text-primary italic">Mercury</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                The new HG Aerial Rebuild is finally here. Experience the cutting-edge engineering of the Ad Stella timeline.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <button 
                  onClick={scrollToProducts}
                  className="bg-primary hover:bg-primary-dark text-gray-900 px-8 py-3 rounded-lg font-bold font-display shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Shop Now
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-64 sm:h-96 lg:h-[500px] relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-gray-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(#00e054 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
              <div className="relative w-full h-full p-8 flex items-center justify-center group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbDlWiaH3tYxJazGhUGfsURtqBsH0dy-k3LiOEXZ8mtHksDA9ikiUIHh1h-bdN44X-dcTqbGbOg3o75hh0UnxVo6pdmLdeLZYTOOC4HrSXpsVskwEBCGvmRPMDF847HxqtFm_WNtXa0QOkSu7pdWE7kS_6QkAzXOVJQK36U5scrb_mNev4VotER_Il9oko7V5gpYH3PVJx0O7KI6KGZNIHLFADQK_eY--NCiabovp6OjWqz7zxGIA3pr6A916lWixm-CpIkDbhDKk"
                  alt="HG Gundam Aerial"
                  className="max-h-full object-contain drop-shadow-2xl transition-transform group-hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search Stats */}
        <section id="products-section" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div className="flex flex-wrap items-center gap-2">
              {GRADES.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setFilterGrade(grade)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filterGrade === grade 
                      ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-white dark:bg-card-dark text-gray-500 hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 border border-gray-100 dark:border-gray-800'
                  }`}
                >
                  {grade === 'SERVICE' ? 'Custom' : grade}
                </button>
              ))}
            </div>
            
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Showing <span className="text-primary">{filteredProducts.length}</span> results
              {searchQuery && <span> for "<span className="text-white italic">{searchQuery}</span>"</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white italic uppercase tracking-tighter">
              {filterGrade === 'ALL' ? 'Operational Listing' : `${filterGrade} Catalog`}
            </h2>
            <div className="flex items-center gap-2">
               <span className="material-symbols-outlined text-gray-400 text-sm">tune</span>
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort: Popularity</span>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <span className="material-symbols-outlined !text-6xl text-gray-200 dark:text-gray-800">search_off</span>
              <p className="text-gray-500 font-medium">No units found matching your search parameters.</p>
              <button onClick={() => {setSearchQuery(''); setFilterGrade('ALL');}} className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => handleOpenProduct(p)}
                  className="group cursor-pointer bg-white dark:bg-card-dark rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
                >
                  <div className="relative aspect-square p-8 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-4 left-4 bg-zinc-900 dark:bg-zinc-100 dark:text-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider z-10 shadow-lg uppercase">
                      {p.grade}
                    </span>
                    {p.hot && (
                      <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest z-10 shadow-lg uppercase animate-pulse">
                        Hot
                      </span>
                    )}
                    <img 
                      src={p.image} 
                      alt={p.name}
                      className="max-h-full object-contain transition-transform group-hover:scale-110 duration-700"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="absolute bottom-4 right-4 h-12 w-12 bg-primary text-gray-900 rounded-2xl shadow-xl flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary-dark hover:scale-110 active:scale-95"
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-[0.1em] mb-2">{p.series}</p>
                    <h3 className="font-display font-black text-gray-900 dark:text-white text-lg leading-tight mb-4 line-clamp-2 uppercase group-hover:text-primary transition-colors italic transition-colors">
                      {p.name}
                    </h3>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 uppercase font-bold">Market Price</span>
                        <span className="font-display font-black text-2xl text-primary">${p.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-sm">star</span>
                        <span className="text-xs font-bold text-gray-500 pt-0.5">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
           <div className="relative w-full max-w-4xl bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined dark:text-white">close</span>
              </button>
              
              <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800/50 p-12 flex items-center justify-center relative">
                 <img src={selectedProduct.image} className="max-h-full object-contain drop-shadow-2xl" alt={selectedProduct.name} />
              </div>

              <div className="md:w-1/2 p-8 lg:p-12 space-y-6 overflow-y-auto max-h-[80vh]">
                 <div>
                   <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{selectedProduct.grade} {selectedProduct.scale}</p>
                   <h2 className="text-3xl font-black font-display text-gray-900 dark:text-white">{selectedProduct.name}</h2>
                   <p className="text-gray-500 dark:text-gray-400 mt-2">{selectedProduct.series}</p>
                 </div>

                 <div className="flex items-center gap-4">
                   <span className="text-3xl font-bold text-gray-900 dark:text-white">${selectedProduct.price.toFixed(2)}</span>
                   <span className={`px-2 py-1 rounded text-[10px] font-bold ${selectedProduct.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {selectedProduct.stock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                   </span>
                 </div>

                 <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      AI BUILD ANALYSIS
                    </h4>
                    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                      {isAnalyzing ? (
                        <div className="flex items-center gap-3">
                          <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm font-mono italic">Calculating build optimizations...</span>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {tips.map((t, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300">
                              <span className="text-primary font-bold">0{idx+1}</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                 </div>

                 <button 
                   onClick={() => {
                     onAddToCart(selectedProduct);
                     setSelectedProduct(null);
                   }}
                   className="w-full bg-primary hover:bg-primary-dark text-black font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 uppercase italic tracking-tighter"
                 >
                   DEPLOY TO CART
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


import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GeminiAssistant from '../components/GeminiAssistant';
import { User, Product } from '../types';
import { PRODUCTS, SERIES } from '../constants';
import { generateGundamArt, analyzeKit } from '../services/geminiService';

interface HomeProps {
  user: User | null;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Home: React.FC<HomeProps> = ({ user, darkMode, onToggleDarkMode }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI Design Lab States
  const [labPrompt, setLabPrompt] = useState('');
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenProduct = async (p: Product) => {
    setSelectedProduct(p);
    setIsAnalyzing(true);
    const aiTips = await analyzeKit(p.name);
    setTips(aiTips);
    setIsAnalyzing(false);
  };

  const handleGenerateArt = async () => {
    if (!labPrompt.trim()) return;
    setIsGenerating(true);
    const img = await generateGundamArt(labPrompt);
    setGeneratedImg(img);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark transition-colors duration-200">
      <Header user={user} darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-16">
        {/* Hero Section */}
        <section className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-card-dark shadow-sm">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="flex-1 p-8 lg:p-16 flex flex-col gap-6 items-start z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-green-300 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">new_releases</span>
                Just Dropped
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                The Witch from <span className="text-primary">Mercury</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">
                The new HG Aerial Rebuild is finally here. Experience the cutting-edge engineering of the Ad Stella timeline.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <button className="bg-primary hover:bg-primary-dark text-gray-900 px-8 py-3 rounded-lg font-bold font-display shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  Shop Now
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-64 sm:h-96 lg:h-[500px] relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-gray-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(#00e054 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
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

        {/* AI Design Lab Section */}
        <section className="bg-zinc-900 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative border border-zinc-800">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/30">
                  <span className="material-symbols-outlined text-xs">auto_awesome</span>
                  Anaheim AI Labs
                </div>
                <h2 className="text-4xl font-black font-display italic leading-none">CUSTOM BOX ART GENERATOR</h2>
                <p className="text-zinc-400 max-w-md">Visualize your dream mobile suit. Our advanced AI creates unique, cinematic renders of any Gundam concept you imagine.</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={labPrompt}
                    onChange={(e) => setLabPrompt(e.target.value)}
                    placeholder="e.g. Samurai Gundam in futuristic Neo-Tokyo"
                    className="flex-1 bg-zinc-800 border-zinc-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button 
                    onClick={handleGenerateArt}
                    disabled={isGenerating}
                    className="bg-primary hover:bg-primary-dark text-black font-bold px-6 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'CREATE'}
                    <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  </button>
                </div>
              </div>
              <div className="aspect-video bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 flex items-center justify-center relative group">
                {generatedImg ? (
                  <img src={generatedImg} className="w-full h-full object-cover" alt="Generated Gundam" />
                ) : (
                  <div className="text-center space-y-3 opacity-50">
                    <span className="material-symbols-outlined !text-6xl">image_search</span>
                    <p className="text-sm font-mono tracking-widest">AWAITING INPUT COMMAND...</p>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-4">
                      <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-mono text-xs tracking-widest animate-pulse">RENDER IN PROGRESS</span>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Featured Gunpla</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div 
                key={p.id} 
                onClick={() => handleOpenProduct(p)}
                className="group cursor-pointer bg-white dark:bg-card-dark rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative aspect-square p-6 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center">
                  <span className="absolute top-3 left-3 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">{p.grade} {p.scale}</span>
                  {p.hot && <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider">HOT</span>}
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="max-h-full object-contain transition-transform group-hover:scale-110 duration-500"
                  />
                  <button className="absolute bottom-3 right-3 h-10 w-10 bg-primary text-gray-900 rounded-full shadow-lg flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-dark">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-2">{p.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{p.series}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-display font-bold text-xl text-primary">${p.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 text-sm">star</span>
                      <span className="text-xs font-bold text-gray-500 pt-0.5">{p.rating}</span>
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
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
           <div className="relative w-full max-w-4xl bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
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
                    <h4 className="font-bold flex items-center gap-2 text-primary">
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

                 <button className="w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3">
                   ADD TO CART
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

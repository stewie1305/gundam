import React from "react";
import { SERIES, PRODUCTS } from "../constants";
import { ProductCard } from "../components/ProductCard";

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-zinc-800">
        <div className="flex flex-col-reverse lg:flex-row items-center">
          <div className="flex-1 p-8 lg:p-16 flex flex-col gap-6 items-start z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-green-300 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">
                new_releases
              </span>
              New Arrival Alert
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              The Witch from{" "}
              <span className="text-primary italic">Mercury</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md leading-relaxed">
              Experience the cutting-edge engineering of the Ad Stella timeline
              with the new HG Aerial Rebuild.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-primary hover:bg-primary-dark text-gray-900 px-10 py-4 rounded-xl font-bold font-display shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 flex items-center gap-2">
                Deploy Now
                <span className="material-symbols-outlined text-lg">
                  rocket_launch
                </span>
              </button>
              <button className="px-8 py-4 rounded-xl font-bold font-display text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors border border-gray-200 dark:border-zinc-700">
                View Series
              </button>
            </div>
          </div>
          <div className="flex-1 w-full h-64 sm:h-96 lg:h-[600px] relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-zinc-900/50 dark:to-black flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 dark:opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#00e054 2px, transparent 2px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
            <div className="relative w-full h-full p-8 flex items-center justify-center group">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbDlWiaH3tYxJazGhUGfsURtqBsH0dy-k3LiOEXZ8mtHksDA9ikiUIHh1h-bdN44X-dcTqbGbOg3o75hh0UnxVo6pdmLdeLZYTOOC4HrSXpsVskwEBCGvmRPMDF847HxqtFm_WNtXa0QOkSu7pdWE7kS_6QkAzXOVJQK36U5scrb_mNev4VotER_Il9oko7V5gpYH3PVJx0O7KI6KGZNIHLFADQK_eY--NCiabovp6OjWqz7zxGIA3pr6A916lWixm-CpIkDbhDKk')`,
                }}
              ></div>
              <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-primary/30 hidden md:block">
                <p className="text-primary text-[10px] font-mono">
                  AS-REF: XVX-016RN
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white italic tracking-tight uppercase">
              Operational Timelines
            </h2>
            <div className="h-1 w-20 bg-primary mt-1"></div>
          </div>
          <a
            href="#"
            className="text-primary font-bold text-sm hover:underline flex items-center gap-1 group"
          >
            Browse All{" "}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Changed CATEGORIES to SERIES and cat.sub to cat.timeline */}
          {SERIES.map((cat) => (
            <a
              key={cat.id}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark shadow-md hover:shadow-primary/10 transition-all border border-transparent hover:border-primary/50"
              href="#"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-80">
                    {cat.timeline}
                  </p>
                  <h3 className="text-white font-display font-black text-xl leading-tight uppercase italic">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white italic uppercase">
              New Deployments
            </h2>
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded animate-pulse uppercase tracking-widest">
              Live Now
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-white dark:bg-card-dark text-gray-400 hover:text-primary shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-2 rounded-lg bg-white dark:bg-card-dark text-gray-400 hover:text-primary shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* P-Bandai Promo */}
      <section className="rounded-3xl bg-gradient-to-br from-primary via-emerald-700 to-zinc-900 p-10 lg:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-primary opacity-20 rounded-full blur-[80px]"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
          }}
        ></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/30">
              <span className="material-symbols-outlined text-sm">diamond</span>
              Limited Selection
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-black mb-6 leading-tight italic uppercase tracking-tighter">
              Premium Bandai <br />
              <span className="text-black bg-primary px-2">Exclusives</span>
            </h2>
            <p className="text-emerald-50 text-xl mb-8 leading-relaxed max-w-lg opacity-90">
              Unlock access to Master Grade special coatings, metal build parts,
              and online-only releases.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-zinc-900 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold font-display shadow-xl transition-all hover:scale-105">
                Access Vault
              </button>
              <button className="bg-transparent border-2 border-white/50 hover:border-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold font-display transition-all">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-80 h-80 bg-white/10 backdrop-blur-lg rounded-[40px] border border-white/20 rotate-12 flex items-center justify-center p-8">
              <span className="material-symbols-outlined !text-[120px] text-white opacity-80">
                robot_2
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

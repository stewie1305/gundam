import React from "react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 dark:border-zinc-800">
      <div className="relative aspect-square p-8 bg-gray-50 dark:bg-zinc-900/50 flex items-center justify-center overflow-hidden">
        <span className="absolute top-4 left-4 bg-zinc-900 dark:bg-zinc-100 dark:text-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider z-10 shadow-lg uppercase">
          {product.grade}
        </span>
        {/* Fix: Property name is 'hot', not 'isHot' */}
        {product.hot && (
          <span className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest z-10 shadow-lg uppercase animate-pulse">
            Hot
          </span>
        )}
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform group-hover:scale-110 duration-700"
          style={{ backgroundImage: `url('${product.image}')` }}
        ></div>
        <button className="absolute bottom-4 right-4 h-12 w-12 bg-primary text-gray-900 rounded-2xl shadow-xl flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary-dark hover:scale-110 active:scale-95">
          <span className="material-symbols-outlined font-bold">
            add_shopping_cart
          </span>
        </button>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-[0.1em] mb-2">
          {product.series}
        </p>
        <h3 className="font-display font-black text-gray-900 dark:text-white text-lg leading-tight mb-4 line-clamp-2 uppercase group-hover:text-primary transition-colors italic">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">
              Market Price
            </span>
            <span className="font-display font-black text-2xl text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-xs ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-1"
                      : "text-zinc-300"
                  }`}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold text-zinc-500">
              {product.rating} Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

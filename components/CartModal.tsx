import React from "react";
import { CartItem } from "../types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
}) => {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-md h-full bg-white dark:bg-card-dark shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-black font-display italic uppercase tracking-tighter text-gray-900 dark:text-white">
            Your Hangar
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined dark:text-white">
              close
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <span className="material-symbols-outlined !text-6xl text-zinc-400">
                shopping_basket
              </span>
              <p className="text-zinc-500 font-medium">
                Your cargo bay is currently empty, pilot.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="size-20 bg-gray-50 dark:bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-zinc-800 p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    {item.grade}
                  </p>
                  <h4 className="font-bold text-gray-900 dark:text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm font-mono text-zinc-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-zinc-900/50 space-y-4">
            <div className="flex items-center justify-between text-zinc-500 text-sm font-bold uppercase tracking-widest">
              <span>Total Requisition</span>
              <span className="text-2xl font-black text-primary italic font-display">
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-black font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 italic uppercase tracking-tighter">
              Initiate Checkout
              <span className="material-symbols-outlined">rocket_launch</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;

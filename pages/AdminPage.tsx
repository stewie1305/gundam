import React from "react";
import { PRODUCTS } from "../constants";

export const AdminPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
            Hangar Control
          </h2>
          <p className="text-zinc-500 text-sm font-mono mt-1">
            Anaheim Electronics Central Intelligence // Management Interface
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-black font-black px-6 py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 italic uppercase text-sm tracking-tighter">
          <span className="material-symbols-outlined">add</span>
          Initialize New Unit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Units",
            value: "1,248",
            icon: "smart_toy",
            color: "primary",
          },
          {
            label: "Low Stocks",
            value: "12",
            icon: "warning",
            color: "yellow-500",
          },
          { label: "Damaged", value: "4", icon: "error", color: "red-500" },
          {
            label: "Deployments",
            value: "86",
            icon: "rocket",
            color: "blue-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-start justify-between group hover:border-primary/50 transition-colors"
          >
            <div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white italic">
                {stat.value}
              </h3>
            </div>
            <div
              className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-${stat.color} group-hover:bg-primary group-hover:text-black transition-all`}
            >
              <span className="material-symbols-outlined !text-3xl">
                {stat.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-card-dark rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              Active Inventory
            </span>
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded-md border border-primary/30">
              ONLINE
            </span>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-500 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Search Ref ID..."
                className="w-full h-10 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl text-xs pl-10 focus:ring-1 focus:ring-primary"
              />
            </div>
            <button className="px-4 py-2 border-2 border-gray-100 dark:border-zinc-800 rounded-xl text-xs font-bold uppercase hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-900/50 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-gray-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4">Mobile Suit Name</th>
                <th className="px-6 py-4">Deployment Area</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {PRODUCTS.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 bg-contain bg-center bg-no-repeat shadow-md"
                        style={{ backgroundImage: `url('${p.image}')` }}
                      ></div>
                      <div>
                        <p className="font-display font-black text-zinc-900 dark:text-white italic group-hover:text-primary transition-colors">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          AE-REF: #{p.id.padStart(4, "0")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                      {p.series}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-zinc-900 dark:text-zinc-100 font-bold text-xs uppercase">
                      {p.grade}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-zinc-900 dark:text-white font-bold">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          p.stock > 0
                            ? "bg-primary shadow-[0_0_8px_rgba(0,224,84,0.5)] animate-pulse"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-xs font-bold ${
                          p.stock > 0
                            ? "text-zinc-900 dark:text-zinc-100"
                            : "text-red-500 italic"
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} Units` : "Depleted"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-xl">
                          edit_square
                        </span>
                      </button>
                      <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

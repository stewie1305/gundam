import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { User, PilotProfile } from "../types";

interface PilotSettingsProps {
  user: User | null;
  profiles: PilotProfile[];
  onSaveProfile: (profile: PilotProfile) => void;
  onDeleteProfile: (id: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onLogout: () => void;
}

const PilotSettings: React.FC<PilotSettingsProps> = ({
  user,
  profiles,
  onSaveProfile,
  onDeleteProfile,
  darkMode,
  onToggleDarkMode,
  cartCount,
  onOpenCart,
  onLogout,
}) => {
  const [editingProfile, setEditingProfile] = useState<PilotProfile | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (p: PilotProfile) => {
    setEditingProfile(p);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProfile({
      id: Math.random().toString(36).substr(2, 9),
      label: "",
      fullName: "",
      phone: "",
      email: user?.id.includes("@") ? user.id : "",
      province: "",
      district: "",
      ward: "",
      address: "",
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingProfile) {
      onSaveProfile(editingProfile);
      setIsModalOpen(false);
      setEditingProfile(null);
    }
  };

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
                Pilot Settings
              </h2>
              <p className="text-zinc-500 text-sm font-mono mt-1">
                Manage deployment coordinates and contact protocols.
              </p>
            </div>
            <button
              onClick={handleAddNew}
              className="bg-primary text-black font-black px-6 py-3 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95 italic uppercase text-sm tracking-tighter"
            >
              <span className="material-symbols-outlined">add</span>
              Initialize Identity
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.length === 0 ? (
              <div className="col-span-full py-20 bg-white dark:bg-zinc-900 rounded-[32px] border border-dashed border-zinc-200 dark:border-zinc-800 text-center flex flex-col items-center justify-center space-y-4">
                <span className="material-symbols-outlined !text-6xl text-zinc-300 dark:text-zinc-700">
                  badge
                </span>
                <p className="text-zinc-500 font-medium">
                  No tactical identities configured.
                </p>
                <button
                  onClick={handleAddNew}
                  className="text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                >
                  Add first profile
                </button>
              </div>
            ) : (
              profiles.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                        {p.label || "DEPLOYMENT IDENT"}
                      </span>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white italic uppercase">
                        {p.fullName}
                      </h4>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 text-zinc-400 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => onDeleteProfile(p.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                      {p.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                      <span className="truncate">
                        {p.address}, {p.ward}, {p.district}, {p.province}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase">
                      REF: {p.id.slice(0, 8)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && editingProfile && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-white dark:bg-card-dark rounded-[40px] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter mb-8">
              Identity Protocol Configuration
            </h3>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="col-span-full flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  Identity Label (e.g. Home, Sector 7)
                </label>
                <input
                  required
                  className="w-full h-14 bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.label}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      label: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  Pilot Name
                </label>
                <input
                  required
                  className="w-full h-14 bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.fullName}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  Phone Link
                </label>
                <input
                  required
                  className="w-full h-14 bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.phone}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  Province / City
                </label>
                <input
                  required
                  className="w-full h-14 bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.province}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      province: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  District
                </label>
                <input
                  required
                  className="w-full h-14 bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.district}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      district: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-full flex flex-col gap-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">
                  Detailed Coordinates (Street Address)
                </label>
                <textarea
                  required
                  rows={2}
                  className="w-full bg-gray-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white px-6 py-4 focus:border-primary focus:ring-0 text-sm"
                  value={editingProfile.address}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-span-full pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-14 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 text-zinc-500 font-black uppercase italic tracking-tighter"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  className="flex-1 h-14 rounded-2xl bg-primary text-black font-black uppercase italic tracking-tighter shadow-lg shadow-primary/20"
                >
                  Save Identity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PilotSettings;

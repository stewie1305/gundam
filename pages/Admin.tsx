import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Product } from "../types";
import { PRODUCTS } from "../constants";
import { generateProductDescription } from "../services/geminiService";

interface AdminProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

type AdminSection =
  | "dashboard"
  | "inventory"
  | "orders"
  | "vouchers"
  | "staff"
  | "users";

interface Voucher {
  id: string;
  code: string;
  discount: string;
  type: "Percentage" | "Fixed";
  expiry: string;
  status: "Active" | "Expired";
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "Active" | "Offline" | "On Mission";
  lastActive: string;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: "PILOT" | "COMMANDER";
  joinedDate: string;
}

const Admin: React.FC<AdminProps> = ({ user, onLogout, cartCount }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>("inventory");
  const [inventory, setInventory] = useState<Product[]>(PRODUCTS);

  // Mock Data
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: "1",
      code: "NEWPILOT20",
      discount: "20%",
      type: "Percentage",
      expiry: "2025-12-31",
      status: "Active",
    },
    {
      id: "2",
      code: "ZEONOFFER50",
      discount: "$50.00",
      type: "Fixed",
      expiry: "2025-06-15",
      status: "Active",
    },
    {
      id: "3",
      code: "EFSF-SHIP-FREE",
      discount: "FREE",
      type: "Fixed",
      expiry: "2024-01-01",
      status: "Expired",
    },
  ]);

  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: "S-001",
      name: "Bright Noa",
      role: "Base Commander",
      status: "Active",
      lastActive: "2 mins ago",
    },
    {
      id: "S-002",
      name: "Sayla Mass",
      role: "Communications",
      status: "Active",
      lastActive: "Now",
    },
    {
      id: "S-003",
      name: "Amuro Ray",
      role: "Test Pilot",
      status: "On Mission",
      lastActive: "1 hour ago",
    },
    {
      id: "S-004",
      name: "Kai Shiden",
      role: "Technician",
      status: "Offline",
      lastActive: "Yesterday",
    },
  ]);

  const [usersList, setUsersList] = useState<SystemUser[]>([
    {
      id: "U-1024",
      name: "Banagher Links",
      email: "unicorn@ae.com",
      role: "PILOT",
      joinedDate: "2023-11-05",
    },
    {
      id: "U-2048",
      name: "Full Frontal",
      email: "red.comet@zeon.net",
      role: "COMMANDER",
      joinedDate: "2023-10-12",
    },
    {
      id: "U-3096",
      name: "Kamille Bidan",
      email: "zeta@ae.com",
      role: "PILOT",
      joinedDate: "2023-12-01",
    },
    {
      id: "U-4012",
      name: "Haman Karn",
      email: "axis@zeon.net",
      role: "COMMANDER",
      joinedDate: "2023-09-20",
    },
  ]);

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    grade: "HG" as Product["grade"],
    series: "",
    price: 0,
    stock: 0,
    description: "",
    image:
      "https://images.unsplash.com/photo-1534732803564-3b3c3bc64a3a?auto=format&fit=crop&q=80&w=400",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        grade: product.grade,
        series: product.series,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image: product.image,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        grade: "HG",
        series: "",
        price: 0,
        stock: 0,
        description: "",
        image:
          "https://images.unsplash.com/photo-1534732803564-3b3c3bc64a3a?auto=format&fit=crop&q=80&w=400",
      });
    }
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    if (editingId) {
      setInventory((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...formData } : p))
      );
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        scale:
          formData.grade === "PG"
            ? "1/60"
            : formData.grade === "MG"
            ? "1/100"
            : "1/144",
        rating: 5.0,
      };
      setInventory((prev) => [newProduct, ...prev]);
    }
    setShowModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Confirm decommissioning of this unit?")) {
      setInventory((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDeleteStaff = (id: string) => {
    if (
      window.confirm(
        "Confirm dishonorable discharge for this personnel member?"
      )
    ) {
      setStaff((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleAiDescription = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(
      formData.name,
      formData.grade
    );
    setFormData((prev) => ({ ...prev, description: desc || "" }));
    setIsGenerating(false);
  };

  const adminName = user?.name || "Commander";
  const adminId = user?.id || "SYS-ADMIN-N592";

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic text-shadow-glow">
          Strategic Command
        </h2>
        <p className="text-zinc-400 text-sm mt-1 font-mono">
          Overview of mobile suit deployment and logistical status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-surface border border-dark-border p-5 rounded-xl flex items-start justify-between group hover:border-primary/50 transition-colors shadow-lg shadow-black/50">
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Total Units
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {inventory.reduce((sum, p) => sum + p.stock, 0).toLocaleString()}
            </h3>
          </div>
          <div className="size-10 flex items-center justify-center bg-zinc-900 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">
            <span className="material-symbols-outlined">toys</span>
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border p-5 rounded-xl flex items-start justify-between group hover:border-yellow-500/50 transition-colors shadow-lg shadow-black/50">
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Low Stock
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {inventory.filter((p) => p.stock > 0 && p.stock < 10).length}
            </h3>
          </div>
          <div className="size-10 flex items-center justify-center bg-zinc-900 rounded-lg text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
            <span className="material-symbols-outlined">warning</span>
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border p-5 rounded-xl flex items-start justify-between group hover:border-red-500/50 transition-colors shadow-lg shadow-black/50">
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Depleted
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {inventory.filter((p) => p.stock === 0).length}
            </h3>
          </div>
          <div className="size-10 flex items-center justify-center bg-zinc-900 rounded-lg text-red-500 group-hover:bg-red-500 group-hover:text-black transition-all">
            <span className="material-symbols-outlined">block</span>
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border p-5 rounded-xl flex items-start justify-between group hover:border-blue-500/50 transition-colors shadow-lg shadow-black/50">
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-1">
              Series
            </p>
            <h3 className="text-3xl font-black text-white italic">
              {Array.from(new Set(inventory.map((p) => p.series))).length}
            </h3>
          </div>
          <div className="size-10 flex items-center justify-center bg-zinc-900 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
            <span className="material-symbols-outlined">category</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-surface border border-dark-border p-6 rounded-xl space-y-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest italic">
            Grade Distribution
          </h4>
          {[
            { label: "High Grade", value: 65, color: "bg-primary" },
            { label: "Real Grade", value: 45, color: "bg-blue-500" },
            { label: "Master Grade", value: 80, color: "bg-red-500" },
            { label: "Perfect Grade", value: 20, color: "bg-yellow-500" },
          ].map((bar, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono uppercase">
                <span>{bar.label}</span>
                <span className="text-white">{bar.value}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${bar.color} transition-all duration-1000`}
                  style={{ width: `${bar.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-dark-surface border border-dark-border p-6 rounded-xl space-y-4 flex flex-col">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest italic">
            Recent Strategic Alerts
          </h4>
          <div className="flex-1 space-y-3 font-mono text-[10px] overflow-hidden">
            <div className="flex items-start gap-3 text-primary/80 animate-pulse">
              <span className="material-symbols-outlined text-xs">radar</span>
              <span>
                [08:42] New prototype registered: XVX-016RN Aerial Rebuild
              </span>
            </div>
            <div className="flex items-start gap-3 text-yellow-500/80">
              <span className="material-symbols-outlined text-xs">warning</span>
              <span>
                [07:15] Supply chain disruption in Side 7; MG stocks low
              </span>
            </div>
            <div className="flex items-start gap-3 text-zinc-500">
              <span className="material-symbols-outlined text-xs">info</span>
              <span>[05:30] Logistical sync complete with Luna Two hangar</span>
            </div>
            <div className="flex items-start gap-3 text-zinc-500">
              <span className="material-symbols-outlined text-xs">info</span>
              <span>
                [03:21] Monthly maintenance cycle initiated for PG line
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Inventory Control
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono">
            Manage mobile suit deployment and stock levels.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(0,230,64,0.4)] transition-all flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
            add
          </span>
          INITIALIZE NEW UNIT
        </button>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-dark-border flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Active Listing
            </span>
            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30">
              LIVE
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border tracking-wider">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Series</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {inventory.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.image}
                        className="size-14 rounded-lg bg-zinc-800 object-contain border border-zinc-700 shadow-lg"
                        alt=""
                      />
                      <div>
                        <div className="font-bold text-white text-base group-hover:text-primary transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">
                          Ref: {p.grade}-{p.id.slice(0, 4)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase">
                    {p.series}
                  </td>
                  <td className="px-6 py-4 font-mono text-white font-bold">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          p.stock > 0
                            ? "bg-primary shadow-[0_0_8px_#00e640]"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`${
                          p.stock > 0 ? "text-white" : "text-red-500"
                        } font-medium ml-1`}
                      >
                        {p.stock > 0 ? `${p.stock} Units` : "Depleted"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(p)}
                        className="p-2 text-zinc-400 hover:text-black hover:bg-primary rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-red-600 rounded-lg transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">
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

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
          Logistics Command
        </h2>
        <p className="text-zinc-400 text-sm mt-1 font-mono">
          Monitoring current kit shipments and pilot requisitions.
        </p>
      </div>
      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Pilot</th>
                <th className="px-6 py-4">Requisition</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {[
                {
                  id: "ORD-771",
                  pilot: "Amuro Ray",
                  item: "RX-78-2 Unleashed",
                  status: "In Transit",
                  total: "$290.00",
                },
                {
                  id: "ORD-902",
                  pilot: "Char Aznable",
                  item: "Sazabi Ver. Ka",
                  status: "Processing",
                  total: "$98.00",
                },
                {
                  id: "ORD-105",
                  pilot: "Suletta Mercury",
                  item: "Gundam Aerial",
                  status: "Delivered",
                  total: "$22.00",
                },
              ].map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-primary">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {order.pilot}
                  </td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-900/40 text-green-400 border border-green-500/30"
                          : order.status === "In Transit"
                          ? "bg-blue-900/40 text-blue-400 border border-blue-500/30"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-white">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVouchers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Voucher Registry
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono">
            Manage promotional codes and tactical discounts.
          </p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <span className="material-symbols-outlined text-[20px]">
            add_card
          </span>
          GENERATE VOUCHER
        </button>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border tracking-wider">
              <tr>
                <th className="px-6 py-4">Promo Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Expires</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {vouchers.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-primary font-bold uppercase">
                    {v.code}
                  </td>
                  <td className="px-6 py-4 text-white font-black">
                    {v.discount}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                    {v.type.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-mono">{v.expiry}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        v.status === "Active"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-red-900/20 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {v.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-zinc-400 hover:text-white">
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
            Hangar Personnel
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono">
            Operations staff and maintenance technicians database.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-black font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group">
          <span className="material-symbols-outlined text-[20px]">
            person_add
          </span>
          ENLIST STAFF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-dark-surface border border-dark-border p-5 rounded-2xl group hover:border-primary/40 transition-all shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="size-12 rounded-xl bg-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined !text-3xl">
                  account_circle
                </span>
              </div>
            </div>
            <h4 className="text-white font-bold text-lg">{s.name}</h4>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-tighter mb-4">
              {s.role} // {s.id}
            </p>
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] text-zinc-600 font-mono italic">
                Activity: {s.lastActive}
              </span>
              <div className="flex gap-1">
                <button className="text-zinc-400 hover:text-white">
                  <span className="material-symbols-outlined text-lg">
                    settings
                  </span>
                </button>
                <button
                  onClick={() => handleDeleteStaff(s.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  title="Remove Personnel"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
            User Registry
          </h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono">
            Database of all registered pilots and commanders.
          </p>
        </div>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {usersList.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="size-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-primary italic border border-zinc-700">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold">{u.name}</div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        {u.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${
                        u.role === "COMMANDER"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-blue-900/20 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono">{u.joinedDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-white">
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const sidebarLinks = [
    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
    { id: "inventory", icon: "inventory_2", label: "Inventory" },
    { id: "orders", icon: "shopping_bag", label: "Orders" },
    { id: "vouchers", icon: "confirmation_number", label: "Vouchers" },
    { id: "users", icon: "group", label: "Users" },
    { id: "staff", icon: "engineering", label: "Staff" },
  ];

  return (
    <div className="bg-dark-bg text-zinc-100 font-jakarta antialiased h-screen flex overflow-hidden">
      <aside className="w-64 flex-shrink-0 border-r border-dark-border bg-dark-surface flex flex-col justify-between hidden md:flex z-30">
        <div>
          <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border">
            <div className="size-8 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,230,64,0.4)] rounded-full bg-primary/10">
              <span className="material-symbols-outlined !text-[24px]">
                robot_2
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white italic">
              GundamBase{" "}
              <span className="text-[10px] font-mono text-primary align-top border border-primary/30 px-1 rounded ml-1 uppercase">
                Admin
              </span>
            </h1>
          </div>
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id as AdminSection)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  activeSection === link.id
                    ? "text-black bg-primary shadow-[0_0_15px_rgba(0,230,64,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    activeSection === link.id
                      ? ""
                      : "text-zinc-500 group-hover:text-primary"
                  }`}
                >
                  {link.icon}
                </span>
                <span className="font-bold text-sm tracking-tighter uppercase">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-dark-border bg-black/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
          >
            <span className="material-symbols-outlined text-zinc-500 group-hover:text-red-500 transition-colors">
              logout
            </span>
            <span className="font-bold text-xs uppercase tracking-widest">
              Sign Out
            </span>
          </button>
          <div className="mt-4 px-4 flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-gray-900 uppercase italic">
              {adminName.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate italic">
                {adminName}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                RANK: CMD
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-dark-bg relative overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-6 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-20">
          <nav className="flex text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <span className="hover:text-zinc-300">AE // INTERNAL</span>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-primary font-bold">{activeSection}</span>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 text-zinc-400 hover:text-primary transition-colors bg-zinc-900 rounded-lg border border-transparent hover:border-primary/30"
              title="Back to Shop"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeSection === "dashboard" && renderDashboard()}
          {activeSection === "inventory" && renderInventory()}
          {activeSection === "orders" && renderOrders()}
          {activeSection === "vouchers" && renderVouchers()}
          {activeSection === "staff" && renderStaff()}
          {activeSection === "users" && renderUsers()}
        </div>
      </main>

      {/* Initialize / Edit Unit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative w-full max-w-2xl bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
              {editingId ? "Update Mobile Suit" : "Initialize New Unit"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Unit Designation
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Zeta Gundam"
                  className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Grade
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      grade: e.target.value as Product["grade"],
                    }))
                  }
                  className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                >
                  <option value="EG">Entry Grade (1/144)</option>
                  <option value="HG">High Grade (1/144)</option>
                  <option value="RG">Real Grade (1/144)</option>
                  <option value="MG">Master Grade (1/100)</option>
                  <option value="PG">Perfect Grade (1/60)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Series / Timeline
                </label>
                <input
                  type="text"
                  value={formData.series}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, series: e.target.value }))
                  }
                  placeholder="e.g. Universal Century"
                  className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        stock: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-500 uppercase">
                  Technical Description
                </label>
                <button
                  onClick={handleAiDescription}
                  disabled={isGenerating || !formData.name}
                  className="text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xs">
                    auto_awesome
                  </span>
                  {isGenerating ? "ANALYZING..." : "AI GENERATE"}
                </button>
              </div>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm min-h-[100px] focus:ring-1 focus:ring-primary"
                placeholder="Unit history and technical details..."
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-all uppercase tracking-tighter italic"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-primary hover:bg-primary-dark text-black font-black py-3 rounded-lg shadow-lg shadow-primary/20 transition-all uppercase tracking-tighter italic"
              >
                {editingId ? "Update Registry" : "Deploy Unit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Order, OrderStatus, Product } from "../types";
import { PRODUCTS } from "../constants";
import { generateProductDescription } from "../services/geminiService";

interface AdminProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

type AdminSection =
  | "inventory"
  | "logistics"
  | "workshop"
  | "warehouse"
  | "analytics"
  | "personnel"
  | "policies";
type LogisticsTab = "standard" | "custom" | "preorder" | "complaints";

interface Voucher {
  id: string;
  title: string;
  desc: string;
}

interface Personnel {
  name: string;
  role: string;
  status: string;
  kits: number;
}

const Admin: React.FC<AdminProps> = ({ user, onLogout, cartCount }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>("inventory");
  const [logisticsTab, setLogisticsTab] = useState<LogisticsTab>("standard");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for Dynamic Data
  const [inventoryList, setInventoryList] = useState<Product[]>(PRODUCTS);
  const [vouchersList, setVouchersList] = useState<Voucher[]>([
    {
      id: "1",
      title: "Standard Return Protocol",
      desc: "14-day window for unopened mobile suit manifests.",
    },
    {
      id: "2",
      title: "Workshop Warranty",
      desc: "90-day structural guarantee on assembly services.",
    },
    {
      id: "3",
      title: "Pre-order Mandate",
      desc: "30% deposit required for Grade-S requisitions.",
    },
  ]);
  const [personnelList, setPersonnelList] = useState<Personnel[]>([
    { name: "Amuro Ray", role: "SALES_SUPPORT", status: "ACTIVE", kits: 12 },
    {
      name: "Char Aznable",
      role: "OPERATIONS",
      status: "ON_MISSION",
      kits: 45,
    },
    { name: "Bright Noa", role: "MANAGER", status: "ACTIVE", kits: 0 },
    {
      name: "Kamille Bidan",
      role: "OPERATIONS",
      status: "IN_WORKSHOP",
      kits: 8,
    },
  ]);

  // States for adding/editing product
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("HG");
  const [newSeries, setNewSeries] = useState("");
  const [newPrice, setNewPrice] = useState("0");
  const [newDesc, setNewDesc] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // States for adding voucher
  const [newVoucherTitle, setNewVoucherTitle] = useState("");
  const [newVoucherDesc, setNewVoucherDesc] = useState("");

  useEffect(() => {
    if (user?.role === "SALES_SUPPORT") setActiveSection("logistics");
    else if (user?.role === "OPERATIONS") setActiveSection("workshop");
    else if (user?.role === "MANAGER") setActiveSection("analytics");
    else if (user?.role === "SYSTEM_ADMIN") setActiveSection("inventory");
    else if (!user) navigate("/login");
  }, [user]);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleAiDescription = async () => {
    if (!newName) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newName, newGrade);
    setNewDesc(desc || "");
    setIsGenerating(false);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id);
    setNewName(p.name);
    setNewGrade(p.grade);
    setNewSeries(p.series);
    setNewPrice(p.price.toString());
    setNewDesc(p.description);
    setShowAddModal(true);
  };

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setNewName("");
    setNewGrade("HG");
    setNewSeries("");
    setNewPrice("0");
    setNewDesc("");
    setShowAddModal(true);
  };

  const handleSaveProduct = () => {
    const productData: Product = {
      id: editingProductId || Math.random().toString(36).substr(2, 9),
      name: newName,
      series: newSeries,
      grade: newGrade as any,
      price: parseFloat(newPrice),
      description: newDesc,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB5-u6eaLEIBXWEajA_BPvyBHIqZNoUQwZWespc3-lPtqmx7FL1Q9p38O2kodSoAgntNWMkyruQDbgd-RIceDDA56lyt5Y_D8jr0N7AcBXCVi3-t6srHy6THwZr8xNMsdjFel-syYK33aryCvyU_hgjuhPt5ZpiikxEVpTUIbE0_MXGwiyNaBr-YEaL3LEzOOcfLtono8vEin_29dEwU6c2i7CQVZPLPx9um4LnhmvZkzknHOWBjJWCBSYPZ_73mOCnJahXKDsNmRQ",
      rating: 5.0,
      stock: 10,
      scale: "1/100",
    };

    if (editingProductId) {
      setInventoryList((prev) =>
        prev.map((p) => (p.id === editingProductId ? productData : p))
      );
    } else {
      setInventoryList((prev) => [productData, ...prev]);
    }
    setShowAddModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setInventoryList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoucherTitle || !newVoucherDesc) return;
    const newV: Voucher = {
      id: Math.random().toString(36).substr(2, 9),
      title: newVoucherTitle,
      desc: newVoucherDesc,
    };
    setVouchersList((prev) => [newV, ...prev]);
    setNewVoucherTitle("");
    setNewVoucherDesc("");
  };

  const handleDeleteVoucher = (id: string) => {
    setVouchersList((prev) => prev.filter((v) => v.id !== id));
  };

  const handleDeletePersonnel = (name: string) => {
    setPersonnelList((prev) => prev.filter((p) => p.name !== name));
  };

  const adminName = user?.name || "Commander";

  // --- RENDERERS ---

  const renderInventory = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
            Inventory & Attributes
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono">
            Manage unit variants, grade scales, and pricing structures.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAdd}
            className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(0,224,84,0.4)] transition-all flex items-center justify-center gap-2 group text-xs uppercase tracking-tighter"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
              add
            </span>
            New Entry
          </button>
        </div>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left text-sm text-zinc-400 min-w-[800px]">
            <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border">
              <tr>
                <th className="px-6 py-4">Unit Manifest</th>
                <th className="px-4 py-4">Grade / Scale</th>
                <th className="px-4 py-4">Market Price</th>
                <th className="px-4 py-4">Combos</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {inventoryList.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-zinc-800/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.image}
                        className="size-12 rounded-lg bg-zinc-800 object-contain border border-zinc-700"
                        alt=""
                      />
                      <div>
                        <div className="font-bold text-white text-sm group-hover:text-primary transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {p.series}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs">
                        {p.grade}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {p.scale}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-white font-bold">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 uppercase font-black">
                      {p.grade === "MG" ? "Pro Bundle Avail." : "Basic"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-2 text-zinc-400 hover:text-primary transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit_square
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">
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

  const renderLogistics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
          Logistics Command
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono italic">
          Sector: Sales Support & Customer Success
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: "standard", label: "Standard Orders", icon: "package_2" },
          { id: "custom", label: "Custom Projects", icon: "brush" },
          { id: "preorder", label: "Pre-order Desk", icon: "schedule" },
          { id: "complaints", label: "Claims & Returns", icon: "emergency" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setLogisticsTab(tab.id as LogisticsTab)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
              logisticsTab === tab.id
                ? "bg-primary text-black border-primary"
                : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-hide">
          {logisticsTab === "standard" && (
            <table className="w-full text-left text-sm text-zinc-400 min-w-[700px]">
              <thead className="bg-black/40 text-[10px] uppercase font-bold text-zinc-500 border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {[
                  {
                    id: "ORD-2901",
                    customer: "Heero Yuy",
                    total: "145.00",
                    status: "PROCESSING",
                  },
                  {
                    id: "ORD-2902",
                    customer: "Quatre Winner",
                    total: "65.00",
                    status: "PROCESSING",
                  },
                ].map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-800/30">
                    <td className="px-6 py-4 font-mono text-primary">{o.id}</td>
                    <td className="px-6 py-4 text-white font-bold">
                      {o.customer}
                    </td>
                    <td className="px-6 py-4 font-mono">${o.total}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/30 uppercase font-black">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-primary/10 text-primary border border-primary/30 px-3 py-1 rounded text-[10px] font-black uppercase hover:bg-primary hover:text-black">
                        Forward to Ops
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );

  const renderWorkshop = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
          Workshop Control
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono italic">
          Sector: Operations & Custom Modification
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            kit: "Wing Gundam Zero",
            task: "Weathering",
            progress: 75,
            status: "IN_PROGRESS",
          },
          {
            kit: "Sazabi Ver. Ka",
            task: "Painting",
            progress: 30,
            status: "IN_PROGRESS",
          },
          {
            kit: "God Gundam",
            task: "Panel Lining",
            progress: 100,
            status: "COMPLETED",
          },
          {
            kit: "Gundam Aerial",
            task: "LED Installation",
            progress: 10,
            status: "IN_PROGRESS",
          },
        ].map((job, i) => (
          <div
            key={i}
            className="bg-dark-surface border border-dark-border p-6 rounded-2xl group hover:border-primary/40 transition-colors"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-bold truncate pr-2">{job.kit}</h4>
              <span
                className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest shrink-0 ${
                  job.status === "COMPLETED"
                    ? "bg-primary/10 text-primary"
                    : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {job.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-4">
              {job.task}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    job.status === "COMPLETED" ? "bg-primary" : "bg-yellow-500"
                  } transition-all duration-1000`}
                  style={{ width: `${job.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWarehouse = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
          Warehouse Matrix
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono italic">
          Sector: Storage & Requisition
        </p>
      </div>
      <div className="bg-dark-surface border border-dark-border rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              label: "Storage Capacity",
              value: "82%",
              icon: "storage",
              color: "primary",
            },
            {
              label: "Pending Restock",
              value: "14 Units",
              icon: "reorder",
              color: "yellow-500",
            },
            {
              label: "Damaged Goods",
              value: "3 Units",
              icon: "heart_broken",
              color: "red-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className={`p-4 rounded-xl bg-zinc-800 text-${stat.color}`}>
                <span className="material-symbols-outlined !text-3xl">
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-white italic">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPersonnel = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
            Personnel Command
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono">
            Monitor and manage hangar staff clearance levels.
          </p>
        </div>
        <button className="bg-zinc-800 text-white font-bold py-3 px-6 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition-all text-xs uppercase tracking-tighter">
          Assign Credentials
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personnelList.map((staff, i) => (
          <div
            key={i}
            className="bg-dark-surface border border-dark-border p-6 rounded-2xl group hover:border-primary/40 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="size-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                    staff.status === "ACTIVE"
                      ? "bg-primary/10 text-primary"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {staff.status}
                </span>
                <button
                  onClick={() => handleDeletePersonnel(staff.name)}
                  className="p-1 text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </div>
            </div>
            <h4 className="text-white font-bold text-lg">{staff.name}</h4>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-4">
              {staff.role.replace("_", " ")}
            </p>
            <div className="flex justify-between items-center pt-4 border-t border-dark-border">
              <span className="text-[10px] text-zinc-600 font-black uppercase">
                Load: {staff.kits} Tasks
              </span>
              <button className="text-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">
                  settings_account_box
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
          Business Vouchers
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mt-1 font-mono">
          Define deployment regulations and financial mandates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              local_activity
            </span>
            Voucher Catalog
          </h3>
          <div className="space-y-3">
            {vouchersList.map((voucher) => (
              <div
                key={voucher.id}
                className="bg-dark-surface border border-dark-border p-5 rounded-2xl flex justify-between items-center group"
              >
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-sm uppercase italic">
                    {voucher.title}
                  </h4>
                  <p className="text-zinc-500 text-xs">{voucher.desc}</p>
                </div>
                <button
                  onClick={() => handleDeleteVoucher(voucher.id)}
                  className="text-zinc-600 group-hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              add_circle
            </span>
            Initialize New Voucher
          </h3>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <form onSubmit={handleAddVoucher} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase">
                  Voucher Title
                </label>
                <input
                  type="text"
                  value={newVoucherTitle}
                  onChange={(e) => setNewVoucherTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-xs"
                  placeholder="e.g. SUMMER24-SALE"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase">
                  Description
                </label>
                <input
                  type="text"
                  value={newVoucherDesc}
                  onChange={(e) => setNewVoucherDesc(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-xs"
                  placeholder="e.g. 20% discount on all HG kits"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-black font-black uppercase text-[10px] rounded-xl hover:bg-primary-hover transition-colors shadow-[0_0_15px_rgba(0,224,84,0.3)]"
              >
                Deploy Protocol
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">
            Workload Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-black px-4 py-2 rounded border border-zinc-700 uppercase tracking-tighter">
            Add gadget
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-black px-4 py-2 rounded border border-zinc-700 uppercase tracking-tighter">
            Edit layout
          </button>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded border border-zinc-700">
            <span className="material-symbols-outlined text-xs">
              more_horiz
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Repair Duration Chart */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase italic">
              Average Repair Duration (Days)
            </h4>
            <span className="material-symbols-outlined text-zinc-500 text-sm">
              more_horiz
            </span>
          </div>
          <div className="h-64 flex items-end justify-between px-6 border-l border-b border-zinc-800 relative pb-1">
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-500 py-1">
              <span>11</span>
              <span>9</span>
              <span>7</span>
              <span>5</span>
              <span>3</span>
              <span>1</span>
              <span>0</span>
            </div>
            {[4, 5, 6, 7, 7, 8, 9, 10, 10, 11].map((h, i) => (
              <div
                key={i}
                className="w-6 sm:w-8 bg-blue-500/80 hover:bg-primary transition-colors rounded-t-sm"
                style={{ height: `${(h / 11) * 100}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between px-6 text-[10px] font-mono text-zinc-500 pl-8">
            <span>8-Jun</span>
            <span>12-Jun</span>
            <span>18-Jun</span>
          </div>
          <p className="text-[10px] text-zinc-500 text-center italic mt-4">
            Analysis of the average duration (days) mobile suits remained in
            repair status.
            <br />
            Period: last 10 days (grouped Daily)
          </p>
        </div>

        {/* Heat Map Gadget */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase italic">
              Sector Heat Map
            </h4>
            <span className="material-symbols-outlined text-zinc-500 text-sm">
              more_horiz
            </span>
          </div>
          <div className="min-h-[160px] flex flex-wrap items-center justify-center gap-4 p-4 text-center">
            <span className="text-3xl font-black text-blue-500">
              Core Frame
            </span>
            <span className="text-sm font-bold text-zinc-500">Optics</span>
            <span className="text-lg font-black text-zinc-300">
              Armor Plate
            </span>
            <span className="text-base font-black text-blue-400">Weaponry</span>
            <span className="text-xs font-bold text-zinc-600">External</span>
            <span className="text-sm font-bold text-zinc-500">Software</span>
            <span className="text-xs font-bold text-zinc-600">Sensors</span>
            <span className="text-2xl font-black text-primary">Usability</span>
            <span className="text-xs font-bold text-zinc-600">Hydraulics</span>
          </div>
          <p className="text-[10px] text-zinc-500 text-center italic">
            There are <span className="text-white font-black">12</span> distinct
            'Maintenance' sectors across{" "}
            <span className="text-white font-black">28</span> Active Units.
          </p>
        </div>

        {/* Maintenance Assignees Pie Chart */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase italic">
              Maintenance Assignees
            </h4>
            <span className="material-symbols-outlined text-zinc-500 text-sm">
              more_horiz
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 py-4">
            {/* Simple Donut via CSS */}
            <div
              className="size-48 rounded-full relative flex items-center justify-center border-[20px] border-zinc-800"
              style={{
                background:
                  "conic-gradient(#3b82f6 0% 33%, #f97316 33% 60%, #eab308 60% 86%, #10b981 86% 100%)",
              }}
            >
              <div className="absolute inset-0 m-[20px] rounded-full bg-dark-surface"></div>
            </div>
            <div className="flex-1 space-y-2 w-full">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-1 mb-3">
                Assignee Load (Total: 15)
              </p>
              {[
                { name: "Amuro Ray", val: 5, color: "bg-blue-500" },
                { name: "Char Aznable", val: 4, color: "bg-orange-500" },
                { name: "Unassigned", val: 4, color: "bg-yellow-500" },
                { name: "Kamille Bidan", val: 2, color: "bg-green-500" },
              ].map((pilot, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className={`size-3 ${pilot.color}`}></div>
                    <span className="text-zinc-400 font-medium">
                      {pilot.name}
                    </span>
                  </div>
                  <span className="text-white font-mono">{pilot.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Velocity Line Chart */}
        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h4 className="text-sm font-bold text-white uppercase italic">
              Sortie Readiness Velocity
            </h4>
            <span className="material-symbols-outlined text-zinc-500 text-sm">
              more_horiz
            </span>
          </div>
          <div className="h-64 w-full relative pt-4 pr-4">
            <div className="absolute left-0 top-4 h-full flex flex-col justify-between text-[10px] font-mono text-zinc-500 py-1">
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>
            <div className="ml-8 h-full border-l border-b border-zinc-800 relative">
              {/* Simulated SVG Line */}
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 100 L 100 100 L 120 20 L 160 80 L 200 20 L 300 100"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="0" cy="100" r="3" fill="#f97316" />
                <circle cx="100" cy="100" r="3" fill="#f97316" />
                <circle cx="120" cy="20" r="3" fill="#f97316" />
                <circle cx="160" cy="80" r="3" fill="#f97316" />
                <circle cx="200" cy="20" r="3" fill="#f97316" />
              </svg>
            </div>
          </div>
          <div className="flex justify-between px-8 text-[10px] font-mono text-zinc-500 pl-12">
            <span>10-Jun</span>
            <span>12-Jun</span>
            <span>16-Jun</span>
          </div>
          <div className="flex justify-center items-center gap-2 pt-2">
            <div className="h-1 w-4 bg-orange-500"></div>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest italic">
              In Progress
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 text-center italic px-4">
            Analysis of the average number of times a unit has been in an active
            status over the past 10 deployment cycles.
          </p>
        </div>
      </div>
    </div>
  );

  const sidebarLinks = [
    {
      id: "analytics",
      icon: "analytics",
      label: "Dashboard",
      roles: ["SYSTEM_ADMIN", "MANAGER"],
    },
    {
      id: "inventory",
      icon: "inventory_2",
      label: "Inventory",
      roles: ["SYSTEM_ADMIN", "OPERATIONS", "MANAGER"],
    },
    {
      id: "logistics",
      icon: "shopping_bag",
      label: "Logistics",
      roles: ["SYSTEM_ADMIN", "SALES_SUPPORT", "MANAGER"],
    },
    {
      id: "workshop",
      icon: "brush",
      label: "Workshop",
      roles: ["SYSTEM_ADMIN", "OPERATIONS", "MANAGER"],
    },
    {
      id: "warehouse",
      icon: "warehouse",
      label: "Warehouse",
      roles: ["SYSTEM_ADMIN", "OPERATIONS", "MANAGER"],
    },
    {
      id: "personnel",
      icon: "badge",
      label: "Personnel",
      roles: ["SYSTEM_ADMIN", "MANAGER"],
    },
    {
      id: "policies",
      icon: "gavel",
      label: "Vouchers",
      roles: ["SYSTEM_ADMIN", "MANAGER"],
    },
  ];

  const allowedLinks = sidebarLinks.filter((link) =>
    link.roles.includes(user?.role || "")
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border">
          <div className="size-8 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,230,64,0.4)] rounded-full bg-primary/10">
            <span className="material-symbols-outlined !text-[24px]">
              robot_2
            </span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white italic">
            Command{" "}
            <span className="text-[10px] font-mono text-primary align-top border border-primary/30 px-1 rounded ml-1 uppercase">
              {user?.role.split("_")[0]}
            </span>
          </h1>
        </div>
        <nav className="p-4 space-y-1">
          {allowedLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveSection(link.id as AdminSection);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                activeSection === link.id
                  ? "text-black bg-primary shadow-[0_0_15px_rgba(0,224,84,0.3)]"
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
              <span className="font-bold text-sm">{link.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-dark-border bg-black/20">
        <Link
          to="/select-role"
          className="w-full flex items-center gap-3 px-4 py-3 text-primary hover:bg-primary/10 rounded-lg transition-colors group mb-1"
        >
          <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">
            swap_horiz
          </span>
          <span className="font-bold text-sm">Switch Role</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
        >
          <span className="material-symbols-outlined text-zinc-500 group-hover:text-red-500 transition-colors">
            logout
          </span>
          <span className="font-medium text-sm">Sign Out</span>
        </button>
        <div className="mt-4 px-4 flex items-center gap-3 border-t border-white/5 pt-4">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-gray-900 uppercase italic">
            {adminName.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate leading-tight">
              {adminName}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase">
              {user?.role.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-dark-bg text-zinc-100 font-jakarta antialiased h-screen flex overflow-hidden relative">
      <aside className="w-72 flex-shrink-0 border-r border-dark-border bg-dark-surface hidden lg:flex flex-col z-30">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-dark-surface border-r border-dark-border z-[100] transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-dark-bg relative overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 lg:hidden text-zinc-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <nav className="flex items-center text-xs font-black uppercase tracking-widest text-zinc-500">
              <span className="hidden sm:inline italic">Tactical Command</span>
              <span className="hidden sm:inline mx-2 text-zinc-700">/</span>
              <span className="text-primary italic">{activeSection}</span>
            </nav>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {activeSection === "inventory" && renderInventory()}
          {activeSection === "logistics" && renderLogistics()}
          {activeSection === "workshop" && renderWorkshop()}
          {activeSection === "warehouse" && renderWarehouse()}
          {activeSection === "analytics" && renderAnalytics()}
          {activeSection === "personnel" && renderPersonnel()}
          {activeSection === "policies" && renderPolicies()}
        </div>
      </main>

      {/* Modal for adding/updating product */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className="relative w-full max-w-lg bg-dark-surface border border-dark-border rounded-3xl p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
              {editingProductId
                ? "Update Unit Manifest"
                : "Initialize New Unit"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Unit Designation
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Zeta Gundam"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Grade
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  >
                    <option value="HG">HG</option>
                    <option value="RG">RG</option>
                    <option value="MG">MG</option>
                    <option value="PG">PG</option>
                    <option value="EG">EG</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Series Timeline
                  </label>
                  <input
                    type="text"
                    value={newSeries}
                    onChange={(e) => setNewSeries(e.target.value)}
                    placeholder="e.g. Universal Century"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Market Price ($)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAiDescription}
                  disabled={isGenerating || !newName}
                  className="w-full py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>
                  {isGenerating
                    ? "Analyzing Patterns..."
                    : "Auto-Generate Description"}
                </button>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white p-3 text-sm min-h-[100px]"
                  placeholder="Unit details..."
                ></textarea>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-zinc-800 text-white font-bold py-3 rounded-lg text-sm uppercase italic"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-primary text-black font-bold py-3 rounded-lg text-sm uppercase italic"
              >
                DEPLOY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

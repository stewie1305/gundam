
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';
import { PRODUCTS } from '../constants';
import { generateProductDescription } from '../services/geminiService';

interface AdminProps {
  user: User | null;
  onLogout: () => void;
}

type AdminSection = 'inventory' | 'orders' | 'users' | 'analytics';

const Admin: React.FC<AdminProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('HG');
  const [newDesc, setNewDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleAiDescription = async () => {
    if (!newName) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(newName, newGrade);
    setNewDesc(desc || '');
    setIsGenerating(false);
  };

  const adminName = user?.name || 'Commander';
  const adminId = user?.id || 'SYS-ADMIN-N592';

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Inventory Control</h2>
          <p className="text-zinc-400 text-sm mt-1 font-mono">Manage mobile suit deployment and stock levels.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(0,230,64,0.4)] transition-all flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">add</span>
          INITIALIZE NEW UNIT
        </button>
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-dark-border flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white uppercase tracking-wider">Active Listing</span>
            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30">LIVE</span>
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
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.image} className="size-14 rounded-lg bg-zinc-800 object-contain border border-zinc-700 shadow-lg" alt="" />
                      <div>
                        <div className="font-bold text-white text-base group-hover:text-primary transition-colors">{p.name}</div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">Ref: {p.grade}-{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase">{p.series}</td>
                  <td className="px-6 py-4 font-mono text-white font-bold">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${p.stock > 0 ? 'bg-primary shadow-[0_0_8px_#00e640]' : 'bg-red-500'}`}></div>
                      <span className={`${p.stock > 0 ? 'text-white' : 'text-red-500'} font-medium ml-1`}>
                        {p.stock > 0 ? `${p.stock} Units` : 'Depleted'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-black hover:bg-primary rounded-lg transition-all"><span className="material-symbols-outlined text-[20px]">edit</span></button>
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
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Logistics Command</h2>
        <p className="text-zinc-400 text-sm mt-1 font-mono">Monitoring current kit shipments and pilot requisitions.</p>
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
                { id: 'ORD-771', pilot: 'Amuro Ray', item: 'RX-78-2 Unleashed', status: 'In Transit', total: '$290.00' },
                { id: 'ORD-902', pilot: 'Char Aznable', item: 'Sazabi Ver. Ka', status: 'Processing', total: '$98.00' },
                { id: 'ORD-105', pilot: 'Suletta Mercury', item: 'Gundam Aerial', status: 'Delivered', total: '$22.00' }
              ].map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-primary">{order.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{order.pilot}</td>
                  <td className="px-6 py-4">{order.item}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      order.status === 'Delivered' ? 'bg-green-900/40 text-green-400 border border-green-500/30' : 
                      order.status === 'In Transit' ? 'bg-blue-900/40 text-blue-400 border border-blue-500/30' : 
                      'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-white">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Personnel Database</h2>
        <p className="text-zinc-400 text-sm mt-1 font-mono">List of all registered hangar pilots and command staff.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Bright Noa', rank: 'Captain', status: 'Active', color: 'primary' },
          { name: 'Kamille Bidan', rank: 'Pilot', status: 'Offline', color: 'zinc-500' },
          { name: 'Haman Karn', rank: 'Commander', status: 'Active', color: 'red-500' }
        ].map((u, i) => (
          <div key={i} className="bg-dark-surface border border-dark-border p-4 rounded-xl flex items-center gap-4">
            <div className={`size-12 rounded-full bg-${u.color}/20 flex items-center justify-center border border-${u.color}/30 text-${u.color}`}>
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <h4 className="font-bold text-white">{u.name}</h4>
              <p className="text-xs text-zinc-500 font-mono uppercase">{u.rank} // {u.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-800">
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Strategic Analytics</h2>
        <p className="text-zinc-400 text-sm mt-1 font-mono">Real-time performance metrics and deployment data.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-surface border border-dark-border p-6 rounded-xl space-y-4">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Grade Distribution</h4>
          {[
            { label: 'High Grade', value: 65, color: 'bg-primary' },
            { label: 'Real Grade', value: 45, color: 'bg-blue-500' },
            { label: 'Master Grade', value: 80, color: 'bg-red-500' },
            { label: 'Perfect Grade', value: 20, color: 'bg-yellow-500' }
          ].map((bar, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono uppercase">
                <span>{bar.label}</span>
                <span className="text-white">{bar.value}%</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full ${bar.color} transition-all duration-1000`} style={{ width: `${bar.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-dark-surface border border-dark-border p-6 rounded-xl flex flex-col justify-center items-center text-center space-y-2">
           <div className="size-32 rounded-full border-8 border-primary/20 border-t-primary animate-spin"></div>
           <p className="font-mono text-primary text-sm mt-4">SYNCING WITH ANAHEIM HUB...</p>
           <p className="text-xs text-zinc-500">Live deployment metrics are being updated from the moon base.</p>
        </div>
      </div>
    </div>
  );

  const sidebarLinks = [
    { id: 'inventory', icon: 'inventory_2', label: 'Inventory' },
    { id: 'orders', icon: 'shopping_bag', label: 'Orders' },
    { id: 'users', icon: 'group', label: 'Users' },
    { id: 'analytics', icon: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="bg-dark-bg text-zinc-100 font-jakarta antialiased h-screen flex overflow-hidden">
      <aside className="w-64 flex-shrink-0 border-r border-dark-border bg-dark-surface flex flex-col justify-between hidden md:flex z-30">
        <div>
          <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border">
            <div className="size-8 flex items-center justify-center text-primary shadow-[0_0_10px_rgba(0,230,64,0.4)] rounded-full bg-primary/10">
              <span className="material-symbols-outlined !text-[24px]">robot_2</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">GundamBase <span className="text-[10px] font-mono text-primary align-top border border-primary/30 px-1 rounded ml-1">ADMIN</span></h1>
          </div>
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => setActiveSection(link.id as AdminSection)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  activeSection === link.id 
                    ? 'text-black bg-primary shadow-[0_0_15px_rgba(0,230,64,0.3)]' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`material-symbols-outlined ${activeSection === link.id ? '' : 'text-zinc-500 group-hover:text-primary'}`}>
                  {link.icon}
                </span>
                <span className="font-bold text-sm">{link.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-dark-border bg-black/20">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
            <span className="material-symbols-outlined text-zinc-500 group-hover:text-red-500 transition-colors">logout</span>
            <span className="font-medium text-sm">Sign Out</span>
          </button>
          <div className="mt-4 px-4 flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-gray-900 uppercase italic">
              {adminName.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate">{adminName}</span>
              <span className="text-[10px] text-zinc-500 font-mono">ID: {adminId.slice(0, 6)}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-dark-bg relative overflow-y-auto">
        <header className="h-16 flex items-center justify-between px-6 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-20">
          <nav className="flex text-sm font-medium text-zinc-500">
            <span className="hover:text-zinc-300">Admin</span>
            <span className="mx-2 text-zinc-700">/</span>
            <span className="text-primary font-bold capitalize">{activeSection}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 material-symbols-outlined text-[20px]">search</span>
              <input className="bg-zinc-900 border border-zinc-700 text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block w-64 pl-10 p-2.5 text-white placeholder-zinc-600 transition-all" placeholder="Search database..." type="text"/>
            </div>
            <Link to="/" className="p-2 text-zinc-400 hover:text-primary transition-colors bg-zinc-900 rounded-lg border border-transparent hover:border-primary/30" title="Back to Shop">
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          {activeSection === 'inventory' && renderInventory()}
          {activeSection === 'orders' && renderOrders()}
          {activeSection === 'users' && renderUsers()}
          {activeSection === 'analytics' && renderAnalytics()}
        </div>
        
        <div className="mt-auto flex justify-center text-zinc-600 text-[10px] font-mono uppercase tracking-widest pb-4 opacity-50">
          <span>Sys.Admin.Ver.3.1</span>
          <span className="mx-2">//</span>
          <span>Anaheim Electronics Proprietary</span>
        </div>
      </main>

      {/* Add Product Modal (Shared for Inventory) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddModal(false)}></div>
           <div className="relative w-full max-w-lg bg-dark-surface border border-dark-border rounded-2xl p-8 space-y-6 shadow-2xl">
              <h2 className="text-2xl font-black italic tracking-tighter text-white">INITIALIZE NEW UNIT</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Unit Designation</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Zeta Gundam"
                    className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Grade</label>
                  <select 
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option>HG</option>
                    <option>RG</option>
                    <option>MG</option>
                    <option>PG</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Description</label>
                    <button 
                      onClick={handleAiDescription}
                      disabled={isGenerating || !newName}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:underline disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-xs">auto_awesome</span>
                      AI GENERATE
                    </button>
                  </div>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-zinc-900 border-zinc-700 rounded-lg text-white p-3 text-sm min-h-[100px] focus:ring-1 focus:ring-primary focus:border-primary"
                    placeholder={isGenerating ? "Analyzing patterns..." : "Unit history and details..."}
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    CANCEL
                  </button>
                  <button className="flex-1 bg-primary hover:bg-primary-dark text-black font-bold py-3 rounded-lg shadow-lg shadow-primary/20 transition-all">
                    DEPLOY UNIT
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

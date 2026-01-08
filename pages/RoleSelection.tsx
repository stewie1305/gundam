import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

interface RoleSelectionProps {
  user: User | null;
  onSelectRole: (role: User["role"]) => void;
}

const ROLES: {
  id: User["role"];
  title: string;
  desc: string;
  icon: string;
  color: string;
}[] = [
  {
    id: "CUSTOMER",
    title: "Pilot / Customer",
    desc: "Browse the market and deploy units to your personal hangar.",
    icon: "robot_2",
    color: "primary",
  },
  {
    id: "SALES_SUPPORT",
    title: "Logistics Staff",
    desc: "Manage order deployment and assist pilots with their requisitions.",
    icon: "support_agent",
    color: "blue-500",
  },
  {
    id: "OPERATIONS",
    title: "Ops Specialist",
    desc: "Control inventory stock levels and mobile suit maintenance.",
    icon: "settings_suggest",
    color: "yellow-500",
  },
  {
    id: "MANAGER",
    title: "Hangar Manager",
    desc: "Oversee strategic analytics and command center performance.",
    icon: "monitoring",
    color: "purple-500",
  },
  {
    id: "SYSTEM_ADMIN",
    title: "System Admin",
    desc: "Full access to core mainframe protocols and user clearance.",
    icon: "admin_panel_settings",
    color: "red-500",
  },
];

const RoleSelection: React.FC<RoleSelectionProps> = ({
  user,
  onSelectRole,
}) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: User["role"]) => {
    onSelectRole(role);
    if (role === "CUSTOMER") {
      navigate("/");
    } else {
      navigate("/admin");
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white font-jakarta flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden relative">
      {/* Background Decor */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#00e054 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="max-w-6xl w-full z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] italic animate-pulse">
            Access Level: Unrestricted
          </div>
          <h1 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter">
            Neural Link <span className="text-primary">Selection Matrix</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium">
            Clearance confirmed. Please select your operational role to enter
            the Anaheim Electronics Hangar environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => handleRoleSelect(r.id)}
              className="group relative bg-zinc-900/50 border border-zinc-800 p-8 rounded-[32px] text-left transition-all hover:bg-zinc-800 hover:border-primary/40 hover:-translate-y-2 overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-${r.color} opacity-20 group-hover:opacity-100 transition-opacity`}
              ></div>

              <div className="flex items-start justify-between mb-6">
                <div
                  className={`p-4 rounded-2xl bg-${r.color}/10 text-${r.color} border border-${r.color}/20 group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined !text-4xl">
                    {r.icon}
                  </span>
                </div>
                <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">
                  arrow_forward
                </span>
              </div>

              <h3 className="text-xl font-black uppercase italic mb-2 group-hover:text-white transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                {r.desc}
              </p>

              <div className="mt-8 flex items-center gap-2">
                <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${r.color} w-0 group-hover:w-full transition-all duration-700`}
                  ></div>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase">
                  Clearance: {r.id.split("_")[0]}
                </span>
              </div>
            </button>
          ))}

          {/* Decorative Stats Card */}
          <div className="hidden lg:flex bg-primary/5 border border-primary/10 p-8 rounded-[32px] flex-col justify-between italic">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                System Status
              </p>
              <h4 className="text-2xl font-black uppercase tracking-tighter">
                Mainframe Online
              </h4>
            </div>
            <div className="space-y-4 font-mono text-[10px] text-primary/60">
              <div className="flex justify-between">
                <span>LINK STRENGTH:</span>
                <span>98.2%</span>
              </div>
              <div className="flex justify-between">
                <span>ACTIVE CORES:</span>
                <span>12 / 12</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY LEVEL:</span>
                <span>S-CLASS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-20 opacity-30 flex items-center gap-3">
        <span className="material-symbols-outlined !text-xl">robot_2</span>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">
          Anaheim Electronics
        </span>
      </div>
    </div>
  );
};

export default RoleSelection;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, CartItem, Order, PilotProfile } from "../types";

interface CheckoutProps {
  user: User | null;
  cartItems: CartItem[];
  onClearCart: () => void;
  onShowToast: (message: string, type?: "success" | "info") => void;
  onCompleteOrder?: (order: Order) => void;
  profiles?: PilotProfile[];
  onSaveProfile?: (profile: PilotProfile) => void;
}

type PaymentMethod = "bank" | "cod";

const Checkout: React.FC<CheckoutProps> = ({
  user,
  cartItems,
  onClearCart,
  onShowToast,
  onCompleteOrder,
  profiles = [],
  onSaveProfile,
}) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [showQR, setShowQR] = useState(false);
  const [orderRef, setOrderRef] = useState(
    `ORDER-${Math.floor(Math.random() * 9000) + 1000}`
  );
  const [saveProfileCheckbox, setSaveProfileCheckbox] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 15.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSelectProfile = (p: PilotProfile) => {
    setFullName(p.fullName);
    setPhone(p.phone);
    setEmail(p.email);
    setProvince(p.province);
    setDistrict(p.district);
    setWard(p.ward);
    setAddress(p.address);
    onShowToast(`Identity "${p.label}" synchronized.`, "info");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Save profile if checked
    if (saveProfileCheckbox && onSaveProfile) {
      onSaveProfile({
        id: Math.random().toString(36).substr(2, 9),
        label: `Auto-Saved ${new Date().toLocaleDateString()}`,
        fullName,
        phone,
        email,
        province,
        district,
        ward,
        address,
      });
    }

    // Simulate API call to process order
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === "bank") {
        setShowQR(true);
      } else {
        if (onCompleteOrder) {
          onCompleteOrder({
            id: orderRef,
            date: new Date().toISOString(),
            items: [...cartItems],
            total: total,
            paymentMethod: "COD",
            status: "PROCESSING",
          });
        }
        onClearCart();
        onShowToast(
          "Deployment request received! Unit is scheduled for COD.",
          "success"
        );
        navigate("/order-history");
      }
    }, 1500);
  };

  const handleFinishPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (onCompleteOrder) {
        onCompleteOrder({
          id: orderRef,
          date: new Date().toISOString(),
          items: [...cartItems],
          total: total,
          paymentMethod: "BANK_TRANSFER",
          status: "DEPLOYED",
        });
      }
      onClearCart();
      onShowToast(
        "Transaction verified! Deployment sequence initiated.",
        "success"
      );
      navigate("/order-history");
    }, 1200);
  };

  if (cartItems.length === 0 && !isProcessing && !showQR) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="size-24 text-primary opacity-20 mb-6">
          <span className="material-symbols-outlined !text-8xl">
            shopping_cart_off
          </span>
        </div>
        <h2 className="text-3xl font-black text-white italic uppercase mb-2">
          Hangar is Empty
        </h2>
        <p className="text-zinc-500 mb-8 max-w-xs">
          No mobile suits are currently scheduled for deployment.
        </p>
        <Link
          to="/"
          className="bg-primary text-black font-black px-8 py-3 rounded-xl uppercase italic tracking-tighter"
        >
          Return to Market
        </Link>
      </div>
    );
  }

  if (showQR) {
    return (
      <div className="min-h-screen bg-dark-bg text-zinc-100 font-jakarta antialiased flex flex-col items-center justify-center p-6 lg:p-12 relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#00e054 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="max-w-2xl w-full bg-dark-surface border border-dark-border rounded-[40px] p-8 lg:p-12 shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col items-center text-center space-y-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_#00e054]"></div>

          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black italic uppercase tracking-tighter text-white">
              Neural Bank Transfer
            </h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Scanning Secure Payment Gateway // Sector-VN
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-all duration-500"></div>
            <div className="relative bg-white p-6 rounded-3xl shadow-2xl border-4 border-primary/30">
              <div className="size-56 md:size-64 bg-zinc-100 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=AnaheimElectronicsTransfer-${orderRef}`}
                  alt="Payment QR"
                  className="w-full h-full grayscale brightness-75 contrast-125"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-0.5 bg-primary/40 animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scan {
              0%, 100% { transform: translateY(-120px); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(120px); }
            }
          `}</style>

          <div className="w-full bg-zinc-900/50 border border-dark-border rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                Total Credits Due
              </span>
              <span className="text-2xl font-black text-primary font-display italic">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-[10px] font-mono text-left">
              <span className="text-zinc-600 uppercase">Beneficiary:</span>
              <span className="text-white text-right">
                Anaheim Electronics VN
              </span>
              <span className="text-zinc-600 uppercase">Bank:</span>
              <span className="text-white text-right">Vietcombank (VCB)</span>
              <span className="text-zinc-600 uppercase">Memo / Ref:</span>
              <span className="text-primary font-bold text-right italic">
                {orderRef}
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleFinishPayment}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary-dark text-black h-16 rounded-2xl font-black text-lg uppercase italic tracking-tighter shadow-[0_0_30px_rgba(0,224,84,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="material-symbols-outlined animate-spin">
                  refresh
                </span>
              ) : (
                <>
                  <span>Verify Transfer</span>
                  <span className="material-symbols-outlined">verified</span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowQR(false)}
              className="text-zinc-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Back to Logistics
            </button>
          </div>

          <p className="text-[10px] text-zinc-600 font-mono italic leading-relaxed">
            Deployment will commence immediately following confirmation of
            funds. <br />
            Neural link maintains active status for 15 minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-zinc-100 font-jakarta antialiased pb-20">
      <header className="h-20 border-b border-dark-border bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-10 flex items-center justify-center text-primary rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-[28px]">
              robot_2
            </span>
          </div>
          <h1 className="text-xl font-bold text-white italic uppercase tracking-tighter">
            Logistics <span className="text-primary">Hub</span>
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <span className="text-primary border border-primary/30 px-3 py-1 rounded-full bg-primary/5 italic">
            Deployment Active
          </span>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-12">
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded bg-primary text-black flex items-center justify-center font-black italic">
                    1
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                    Deployment Target (Vietnam Sector)
                  </h2>
                </div>
              </div>

              {profiles.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      bolt
                    </span>
                    Tactical Identities Detected
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {profiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProfile(p)}
                        className="flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-left hover:border-primary transition-all group min-w-[180px]"
                      >
                        <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                          {p.label}
                        </span>
                        <h4 className="text-sm font-bold text-white truncate mt-1">
                          {p.fullName}
                        </h4>
                        <p className="text-[10px] text-zinc-600 truncate mt-1">
                          {p.address}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Pilot Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Nguyen Van A"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Contact Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                    Contact Email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilot@gundambase.vn"
                    className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Province / City
                    </label>
                    <input
                      required
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="e.g. Ho Chi Minh City"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      District
                    </label>
                    <input
                      required
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. District 1"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Ward / Commune
                    </label>
                    <input
                      required
                      type="text"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      placeholder="e.g. Ben Nghe Ward"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Detailed Address (Street, House No.)
                    </label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 123 Le Loi Street"
                      className="w-full bg-zinc-900 border-2 border-dark-border rounded-xl text-white p-4 text-sm focus:border-primary focus:ring-0 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4">
                  <input
                    type="checkbox"
                    id="save-profile"
                    checked={saveProfileCheckbox}
                    onChange={(e) => setSaveProfileCheckbox(e.target.checked)}
                    className="size-4 rounded border-zinc-800 bg-zinc-900 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="save-profile"
                    className="text-xs font-bold text-zinc-400 uppercase tracking-widest cursor-pointer"
                  >
                    Synchronize coordinates to Pilot Settings
                  </label>
                </div>

                <div className="pt-8 border-t border-dark-border mt-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="size-8 rounded bg-primary text-black flex items-center justify-center font-black italic">
                      2
                    </div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center ${
                        paymentMethod === "bank"
                          ? "border-primary bg-primary/5 text-white"
                          : "border-dark-border bg-zinc-900 text-zinc-500 hover:border-zinc-700"
                      }`}
                    >
                      <span className="material-symbols-outlined !text-4xl">
                        account_balance
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm uppercase">
                          Bank Transfer
                        </span>
                        <span className="text-[10px] opacity-70">
                          QR Neural Scan
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all text-center ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5 text-white"
                          : "border-dark-border bg-zinc-900 text-zinc-500 hover:border-zinc-700"
                      }`}
                    >
                      <span className="material-symbols-outlined !text-4xl">
                        local_shipping
                      </span>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm uppercase">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] opacity-70">
                          Pay at Hangar
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full mt-10 h-16 rounded-2xl font-black text-xl uppercase italic tracking-tighter flex items-center justify-center gap-3 transition-all ${
                    isProcessing
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      : "bg-primary text-black hover:bg-primary-dark shadow-[0_0_30px_rgba(0,224,84,0.3)] hover:scale-[1.01]"
                  }`}
                >
                  {isProcessing ? (
                    <span className="material-symbols-outlined animate-spin">
                      refresh
                    </span>
                  ) : (
                    <>
                      Confirm Unit Deployment
                      <span className="material-symbols-outlined">
                        rocket_launch
                      </span>
                    </>
                  )}
                </button>
              </form>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-dark-surface border border-dark-border rounded-3xl p-6 sm:p-8 space-y-8 sticky top-28 shadow-2xl">
              <h3 className="text-lg font-black uppercase italic tracking-widest text-white border-b border-dark-border pb-4">
                Manifest Declaration
              </h3>

              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="size-16 bg-zinc-900 rounded-xl overflow-hidden flex-shrink-0 border border-dark-border p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        {item.grade} // {item.scale}
                      </p>
                      <h4 className="font-bold text-white truncate text-sm">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-zinc-500 font-mono">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-sm font-bold text-white font-mono">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-dark-border">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>Deployment Tax (8%)</span>
                  <span className="text-white font-mono">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>Transport Fee</span>
                  <span
                    className={`${
                      shipping === 0 ? "text-primary" : "text-white"
                    } font-mono`}
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-dark-border">
                  <span className="text-sm font-black uppercase italic text-white">
                    Total Credits
                  </span>
                  <span className="text-3xl font-black font-display text-primary italic leading-none">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

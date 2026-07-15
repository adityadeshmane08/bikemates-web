import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Wallet as WalletIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/site/Logo";
import { Icon } from "@/components/site/primitives";

const NAV = [
  { section: "Overview", items: [
    { to: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { to: "/app/panels", label: "Quick Panels", icon: "LayoutGrid" },
  ] },
  { section: "Ride & Rent", items: [
    { to: "/app/rent-bike", label: "Rent Bike", icon: "Bike" },
    { to: "/app/book-ride", label: "Book Ride", icon: "MapPinned" },
    { to: "/app/bookings", label: "My Bookings", icon: "CalendarCheck" },
  ]},
  { section: "Earn", items: [
    { to: "/app/list-bike", label: "List Bike for Rent", icon: "KeyRound" },
    { to: "/app/share-ride", label: "List Route / Share Ride", icon: "Users" },
    { to: "/app/my-bikes", label: "My Bikes", icon: "Bike" },
    { to: "/app/my-rides", label: "My Rides", icon: "Route" },
  ]},
  { section: "Account", items: [
    { to: "/app/wallet", label: "Wallet", icon: "Wallet" },
    { to: "/app/messages", label: "Messages", icon: "MessageSquare" },
    { to: "/app/notifications", label: "Notifications", icon: "Bell" },
    { to: "/app/profile", label: "Profile", icon: "User" },
    { to: "/app/settings", label: "Settings", icon: "Settings" },
  ]},
];

export const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const store = useStore();
  const nav = useNavigate();
  const { pathname } = useLocation();

  const doLogout = () => { logout(); toast.success("Logged out"); nav("/"); };
  const name = user?.name || "Student";

  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`;

  const renderSidebar = () => (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5"><Logo className="h-9" /></div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {NAV.map((g) => (
          <div key={g.section}>
            <p className="px-3.5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">{g.section}</p>
            <div className="space-y-1">
              {g.items.map((i) => (
                <NavLink key={i.to} to={i.to} className={linkCls} data-testid={`sidebar-${i.label.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`} onClick={() => setOpen(false)}>
                  <Icon name={i.icon} className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                  <span className="truncate">{i.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button onClick={doLogout} data-testid="app-logout" className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/10 bg-surface/60 backdrop-blur-xl lg:block">
        {renderSidebar()}
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-surface lg:hidden">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-5 text-white/60"><X className="h-5 w-5" /></button>
            {renderSidebar()}
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#050505]/80 px-5 py-4 backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="lg:hidden text-white" data-testid="app-menu-toggle"><Menu className="h-6 w-6" /></button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            <NavLink to="/app/wallet" className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-2 text-sm">
              <WalletIcon className="h-4 w-4 text-primary" />
              <span className="font-semibold">₹{store.wallet.toLocaleString("en-IN")}</span>
            </NavLink>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white capitalize">{name[0]}</span>
              <span className="hidden text-sm font-medium capitalize sm:block">{name}</span>
            </div>
          </div>
        </header>

        <main className="px-5 py-8 lg:px-10">
          <Outlet key={pathname} />
        </main>
      </div>
    </div>
  );
};

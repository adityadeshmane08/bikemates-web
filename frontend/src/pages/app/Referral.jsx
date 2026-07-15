import React from "react";
import { toast } from "sonner";
import { Copy, Users, Wallet, Share2 } from "lucide-react";
import { AppHeader, StatCard } from "@/components/app/ui";

const Referral = () => {
  const code = "ANANYA100";
  const copy = () => { navigator.clipboard?.writeText(code); toast.success("Referral code copied!"); };
  const share = () => {
    if (navigator.share) navigator.share({ title: "Bikemates", text: `Join Bikemates with my code ${code}`, url: window.location.origin });
    else toast.success("Share link copied!");
  };
  return (
    <div>
      <AppHeader title="Refer & Earn" subtitle="Give ₹100, get ₹100 for every friend who joins." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Friends invited" value="8" icon="Users" />
        <StatCard label="Signed up" value="5" icon="UserCheck" />
        <StatCard label="Total earned" value="₹500" icon="Wallet" hint="Added to wallet" />
      </div>

      <div className="mt-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-surface p-8 text-center">
        <p className="text-sm text-white/60">Your referral code</p>
        <p className="mt-2 font-mono text-3xl font-semibold tracking-[0.4em] text-primary">{code}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={copy} data-testid="referral-copy" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-95"><Copy className="h-4 w-4" />Copy code</button>
          <button onClick={share} data-testid="referral-share" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/5"><Share2 className="h-4 w-4" />Share</button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[[Share2, "Share your link", "Send your code to friends on campus."], [Users, "They join & verify", "Friend signs up and gets verified."], [Wallet, "You both earn ₹100", "Credited to your wallet after their first trip."]].map(([Ic, t, d], i) => (
          <div key={i} className="rounded-3xl border border-white/10 bg-surface p-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Ic className="h-6 w-6" /></span>
            <h3 className="mt-4 text-sm font-semibold">{t}</h3>
            <p className="mt-1.5 text-xs text-white/50">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referral;

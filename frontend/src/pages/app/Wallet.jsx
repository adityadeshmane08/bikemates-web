import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { AppHeader } from "@/components/app/ui";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AMOUNTS = [100, 500, 1000, 2000];

const Wallet = () => {
  const store = useStore();
  const [mode, setMode] = useState(null); // 'add' | 'withdraw'
  const [amount, setAmount] = useState(500);

  const confirm = () => {
    if (mode === "add") { store.topUp(Number(amount)); toast.success(`₹${amount} added to your wallet`); }
    else { store.withdraw(Number(amount)); toast.success(`₹${amount} withdrawal initiated`); }
    setMode(null);
  };

  return (
    <div>
      <AppHeader title="Wallet" subtitle="Manage your balance, top-ups and withdrawals." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 to-surface p-8 lg:col-span-1">
          <p className="text-sm text-white/60">Available balance</p>
          <p className="mt-2 text-4xl font-semibold font-display">₹{store.wallet.toLocaleString("en-IN")}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => { setMode("add"); setAmount(500); }} data-testid="wallet-add" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"><Plus className="h-4 w-4" />Add</button>
            <button onClick={() => { setMode("withdraw"); setAmount(500); }} data-testid="wallet-withdraw" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5">Withdraw</button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface p-6 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Transactions</h3>
          <div className="space-y-2">
            {store.transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-2xl px-3 py-3 transition-colors hover:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${t.amount > 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-white/60"}`}>
                    {t.amount > 0 ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-white/40">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${t.amount > 0 ? "text-emerald-400" : "text-white/70"}`}>{t.amount > 0 ? "+" : "-"}₹{Math.abs(t.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!mode} onOpenChange={(o) => !o && setMode(null)}>
        <DialogContent className="max-w-sm border-white/10 bg-surface text-white">
          <DialogHeader><DialogTitle>{mode === "add" ? "Add money" : "Withdraw earnings"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-4 gap-2">
            {AMOUNTS.map((a) => (
              <button key={a} onClick={() => setAmount(a)} className={`rounded-xl border py-2 text-sm font-medium transition-colors ${Number(amount) === a ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-white/60"}`}>₹{a}</button>
            ))}
          </div>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} data-testid="wallet-amount" className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm focus:border-primary focus:outline-none" />
          <button onClick={confirm} data-testid="wallet-confirm" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">{mode === "add" ? "Add to wallet" : "Withdraw"}</button>
          <p className="text-center text-[11px] text-white/40">Demo only — no real money moves.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;

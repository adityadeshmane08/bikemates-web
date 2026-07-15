import React, { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { AppHeader } from "@/components/app/ui";
import { Field } from "@/components/site/form";

const VERIFS = [
  { label: "College Email", status: "Verified" },
  { label: "Government ID (KYC)", status: "Verified" },
  { label: "Driving Licence", status: "Verified" },
  { label: "Phone Number", status: "Verified" },
];

const Profile = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ name: user?.name || "Student", email: user?.email || "student@college.edu", phone: "+91 98765 43210", college: "VIT Vellore" });
  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  const save = (e) => { e.preventDefault(); toast.success("Profile updated"); };

  return (
    <div>
      <AppHeader title="Profile" subtitle="Manage your account details and verification." />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-3xl border border-white/10 bg-surface p-6 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-white capitalize">{data.name[0]}</span>
            <h3 className="mt-4 text-lg font-semibold capitalize">{data.name}</h3>
            <p className="text-sm text-white/50">{data.college}</p>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400"><BadgeCheck className="h-3.5 w-3.5" /> Verified Student</div>
            <div className="mt-4 flex items-center justify-center gap-1 text-sm"><Star className="h-4 w-4 fill-primary text-primary" /><span className="font-semibold">4.9</span><span className="text-white/45">rating</span></div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-surface p-6">
            <h3 className="mb-4 font-semibold">Verification</h3>
            <div className="space-y-3">
              {VERIFS.map((v) => (
                <div key={v.label} className="flex items-center justify-between">
                  <span className="text-sm text-white/70">{v.label}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400"><BadgeCheck className="h-3.5 w-3.5" />{v.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={save} className="space-y-5 rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-2">
          <h3 className="font-semibold">Account details</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" value={data.name} onChange={onChange} testid="profile-name" />
            <Field label="Email" type="email" name="email" value={data.email} onChange={onChange} testid="profile-email" />
            <Field label="Phone" name="phone" value={data.phone} onChange={onChange} testid="profile-phone" />
            <Field label="College" name="college" value={data.college} onChange={onChange} testid="profile-college" />
          </div>
          <button type="submit" data-testid="profile-save" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Save changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

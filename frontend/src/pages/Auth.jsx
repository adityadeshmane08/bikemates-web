import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Field } from "@/components/site/form";
import { Logo } from "@/components/site/Logo";
import { IMAGES } from "@/lib/data";

const AuthShell = ({ title, sub, children, footer }) => (
  <div className="grid min-h-screen lg:grid-cols-2">
    <div className="relative hidden lg:block">
      <img src={IMAGES.hero} alt="Bikemates" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      <div className="absolute bottom-12 left-12 max-w-sm">
        <h2 className="text-3xl font-semibold leading-tight">Campus mobility made smarter.</h2>
        <p className="mt-3 text-white/60">Join 48,200+ verified students renting, sharing and earning on Bikemates.</p>
      </div>
    </div>
    <div className="flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Logo className="h-12" />
        <h1 className="mt-10 text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-white/55">{sub}</p>
        {children}
        {footer}
      </div>
    </div>
  </div>
);

export const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    login(data);
    toast.success("Welcome back!");
    nav("/dashboard");
  };
  return (
    <AuthShell title="Welcome back" sub="Log in to your verified student account."
      footer={<p className="mt-6 text-center text-sm text-white/50">New to Bikemates? <Link to="/signup" className="font-semibold text-primary hover:underline">Create account</Link></p>}>
      <form onSubmit={submit} data-testid="login-form" className="mt-8 space-y-5">
        <Field label="College email" type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="you@college.edu" testid="login-email" />
        <Field label="Password" type="password" name="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="••••••••" testid="login-password" />
        <button type="submit" data-testid="login-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Log in</button>
      </form>
    </AuthShell>
  );
};

export const Signup = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    login(data);
    toast.success("Account created! Complete verification to start riding.");
    nav("/dashboard");
  };
  return (
    <AuthShell title="Create your account" sub="Sign up with your college email to get verified."
      footer={<p className="mt-6 text-center text-sm text-white/50">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link></p>}>
      <form onSubmit={submit} data-testid="signup-form" className="mt-8 space-y-5">
        <Field label="Full name" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Ananya Sharma" testid="signup-name" />
        <Field label="College email" type="email" name="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="you@college.edu" testid="signup-email" />
        <Field label="Password" type="password" name="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Create a password" testid="signup-password" />
        <button type="submit" data-testid="signup-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Create account</button>
      </form>
    </AuthShell>
  );
};

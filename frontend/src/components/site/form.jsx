import React, { useState } from "react";
import { toast } from "sonner";

export const Field = ({ label, type = "text", name, value, onChange, placeholder, required = true, textarea, testid, options }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-white/70">{label}</span>
    {textarea ? (
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={5} data-testid={testid}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-primary focus:outline-none" />
    ) : options ? (
      <select name={name} value={value} onChange={onChange} required={required} data-testid={testid}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-primary focus:outline-none">
        <option value="" className="bg-surface">Select...</option>
        {options.map((o) => <option key={o} value={o} className="bg-surface">{o}</option>)}
      </select>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} data-testid={testid}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-primary focus:outline-none" />
    )}
  </label>
);

export const useForm = (initial, successMsg) => {
  const [data, setData] = useState(initial);
  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    toast.success(successMsg);
    setData(initial);
  };
  return { data, onChange, onSubmit };
};

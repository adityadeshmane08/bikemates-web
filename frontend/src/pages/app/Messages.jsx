import React, { useState } from "react";
import { Send } from "lucide-react";
import { AppHeader } from "@/components/app/ui";

const THREADS = [
  { id: "1", name: "Rohan Mehta", last: "Sure, meet at the main gate at 5:30?", time: "2m", msgs: [
    { me: false, t: "Hey! Saw you booked the Activa 👍" },
    { me: true, t: "Yes! What time works for pickup?" },
    { me: false, t: "Sure, meet at the main gate at 5:30?" },
  ]},
  { id: "2", name: "Ishita Verma", last: "Cool, I'll keep a seat for you.", time: "1h", msgs: [
    { me: true, t: "Is the 8:15 ride to Tech Park still on?" },
    { me: false, t: "Cool, I'll keep a seat for you." },
  ]},
  { id: "3", name: "Karan Singh", last: "The bike's fully fueled, enjoy!", time: "3h", msgs: [
    { me: false, t: "The bike's fully fueled, enjoy!" },
  ]},
];

const Messages = () => {
  const [active, setActive] = useState(THREADS[0]);
  const [msgs, setMsgs] = useState(THREADS[0].msgs);
  const [text, setText] = useState("");

  const openThread = (t) => { setActive(t); setMsgs(t.msgs); };
  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMsgs((m) => [...m, { me: true, t: text }]);
    setText("");
  };

  return (
    <div>
      <AppHeader title="Messages" subtitle="Chat with owners, riders and passengers." />
      <div className="grid gap-4 overflow-hidden rounded-3xl border border-white/10 bg-surface lg:grid-cols-3" style={{ height: "60vh" }}>
        <div className="border-white/10 lg:col-span-1 lg:border-r">
          {THREADS.map((t) => (
            <button key={t.id} onClick={() => openThread(t)} data-testid={`thread-${t.id}`} className={`flex w-full items-center gap-3 border-b border-white/5 px-4 py-4 text-left transition-colors ${active.id === t.id ? "bg-white/5" : "hover:bg-white/[0.03]"}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{t.name[0]}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between"><p className="text-sm font-medium">{t.name}</p><span className="text-[10px] text-white/40">{t.time}</span></div>
                <p className="truncate text-xs text-white/45">{t.last}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">{active.name[0]}</span>
            <p className="font-medium">{active.name}</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                <span className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "bg-primary text-white" : "bg-white/5 text-white/80"}`}>{m.t}</span>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
            <input value={text} onChange={(e) => setText(e.target.value)} data-testid="message-input" placeholder="Type a message..." className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
            <button type="submit" data-testid="message-send" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-transform active:scale-95"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

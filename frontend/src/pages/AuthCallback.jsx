import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bike } from "lucide-react";
import { useAuth, API } from "@/lib/auth";

// Handles the redirect back from Emergent Google Auth.
// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function AuthCallback() {
  const hasProcessed = useRef(false);
  const nav = useNavigate();
  const { setSessionUser } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const sessionId = params.get("session_id");

    (async () => {
      if (sessionId) {
        try {
          const res = await fetch(`${API}/auth/session`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId }),
          });
          if (res.ok) setSessionUser(await res.json());
        } catch (e) { /* ignore, redirect anyway */ }
      }
      window.history.replaceState(null, "", window.location.pathname);
      nav("/dashboard", { replace: true });
    })();
  }, [nav, setSessionUser]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050505] text-white/60">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary"><Bike className="h-6 w-6 text-white" /></span>
      <p className="text-sm">Signing you in…</p>
    </div>
  );
}

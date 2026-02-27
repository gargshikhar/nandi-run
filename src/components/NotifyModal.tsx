"use client";

import { useState, useRef } from "react";
import { X, Bell, CheckCircle, Loader2 } from "lucide-react";

interface NotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotifyModal({ isOpen, onClose }: NotifyModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
      setName("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to subscribe");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 w-full max-w-md bg-white border border-border p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-text-muted hover:text-text transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <CheckCircle size={48} className="mx-auto mb-4 text-primary" />
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text mb-2">
              You&apos;re on the list!
            </h3>
            <p className="text-sm text-text-muted mb-6">
              We&apos;ll notify you one day before registration opens. See you at Nandi Hills!
            </p>
            <button
              onClick={onClose}
              className="bg-primary px-6 py-2.5 text-sm font-bold text-navy-dark hover:bg-accent-dark transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center bg-primary/10">
                <Bell size={24} className="text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-text mb-1">
                Get Notified
              </h3>
              <p className="text-sm text-text-muted">
                Be the first to know when registration opens. We&apos;ll email you one day before.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="notify-name" className="block text-xs font-medium text-text-muted mb-1">
                  Name (optional)
                </label>
                <input
                  id="notify-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="notify-email" className="block text-xs font-medium text-text-muted mb-1">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="notify-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 bg-primary py-3 text-sm font-bold text-navy-dark transition-all hover:bg-accent-dark disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Bell size={16} />
                )}
                {status === "loading" ? "Subscribing..." : "Notify Me"}
              </button>

              <p className="text-[10px] text-center text-text-muted/60">
                We&apos;ll only email you about registration. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

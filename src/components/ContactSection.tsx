"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const text = `New message from portfolio\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`;

    try {
      await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
    } catch {
      // silently fail
    }

    setForm({ name: "", email: "", message: "" });
    setSending(false);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <section id="contact" className="py-16 lg:py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10 text-center"
        >
          <div>
            <h2 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Get in touch
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light">
              Have a project in mind or just want to say hello? Send me a message.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto text-left">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-[var(--text-muted)] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs text-[var(--text-muted)] mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-strong)] transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg)] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sending ? "Sending..." : "Send message"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-sm shadow-lg"
            >
              <p className="font-medium">Message sent!</p>
              <p className="text-xs opacity-70 mt-0.5">I&apos;ll get back to you soon</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

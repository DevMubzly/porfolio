"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">No code found in URL</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        <h1 className="text-lg font-light text-[var(--text-primary)] mb-4">Authorization Code</h1>
        <p className="text-sm text-[var(--text-muted)] mb-4">Copy this code and share it:</p>
        <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] break-all text-sm text-[var(--text-secondary)] select-all">
          {code}
        </div>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}

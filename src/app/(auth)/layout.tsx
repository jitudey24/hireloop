import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden bg-black px-4 py-14">
      {/* Background: soft top glow and bottom indigo bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-6rem] left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.35),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 sm:p-8">
        {children}
      </div>
    </main>
  );
}

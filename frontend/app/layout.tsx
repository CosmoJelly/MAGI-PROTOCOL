import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAGI-PROTOCOL",
  description: "Multi-agent AI debate system — MELCHIOR / BALTHASAR / CASPER",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flicker">
        <div className="h-screen flex flex-col overflow-hidden">

          {/* Header */}
          <header className="nerv-panel flex items-center relative px-6 py-3 shrink-0">
            <span className="text-xs text-[var(--nerv-subtext)] tracking-widest pl-4">
              NERV CENTRAL DOGMA |
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 glow text-sm font-bold tracking-widest">
              MAGI-PROTOCOL
            </span>
            <div className="ml-auto flex items-center gap-6 text-xs text-[var(--nerv-subtext)]">
              <span>MELCHIOR-1 <span className="text-[var(--nerv-green)]">●</span></span>
              <span>BALTHASAR-2 <span className="text-[var(--nerv-green)]">●</span></span>
              <span>CASPER-3 <span className="text-[var(--nerv-green)]">●</span></span>
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>

          {/* Footer */}
          <footer className="nerv-panel px-6 py-2 text-xs text-[var(--nerv-subtext)] flex justify-between shrink-0">
            <span>MAGI-PROTOCOL v0.1.0</span>
            <span>SYSTEM STATUS: NOMINAL</span>
          </footer>

        </div>
      </body>
    </html>
  );
}

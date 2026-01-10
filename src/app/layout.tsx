import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-rajdhani'
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: "TALOS ARCHIVES // TERMINAL",
  description: "Secure Data Access Point",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${mono.variable} font-sans min-h-screen flex flex-col`}>
        {/* Top Decorative Bar */}
        <header className="fixed top-0 left-0 w-full h-16 border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12 backdrop-blur-md bg-black/40">
            <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-talos-yellow animate-pulse"></div>
                <h1 className="font-bold text-2xl tracking-[0.2em] text-white">
                    TALOS <span className="text-talos-yellow">//</span> ARCHIVES
                </h1>
            </div>
            <nav className="hidden md:flex gap-8 font-mono text-xs text-gray-400">
                {['STATUS', 'LOGS', 'PROTOCOLS', 'CONTACT'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-talos-yellow hover:bg-white/5 px-2 py-1 transition-all duration-300 relative group">
                        <span className="opacity-0 group-hover:opacity-100 absolute -left-2 text-talos-yellow">&gt;</span>
                        [{item}]
                    </a>
                ))}
            </nav>
        </header>

        <main className="flex-grow pt-20 relative">
          <div className="absolute inset-0 grid-bg -z-10 pointer-events-none"></div>
          {children}
        </main>

        <footer className="h-12 border-t border-white/10 flex items-center justify-between px-8 font-mono text-[10px] text-white/30 bg-black/80 backdrop-blur">
             <span>SYS_READY...</span>
             <span>COPYRIGHT © 2026 TALOS INDUSTRIES</span>
        </footer>
      </body>
    </html>
  );
}

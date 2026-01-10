import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavigationSystem from "@/components/layout/NavigationSystem";
import ScrollNavigation from "@/components/layout/ScrollNavigation";
import { TranslationProvider } from "@/lib/i18n/TranslationContext";

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
        <TranslationProvider>
          <NavigationSystem />
          <ScrollNavigation />

          <main className="flex-grow pt-20 relative px-6">
            <div className="absolute inset-0 grid-bg -z-10 pointer-events-none"></div>
            {children}
          </main>

          <footer className="h-12 border-t border-white/10 flex items-center justify-between px-8 font-mono text-[10px] text-white/30 bg-black/80 backdrop-blur">
               <span>SYS_READY...</span>
               <span>COPYRIGHT © 2026 TALOS INDUSTRIES</span>
          </footer>
        </TranslationProvider>
      </body>
    </html>
  );
}

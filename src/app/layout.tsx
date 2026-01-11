import type { Metadata } from "next";
import { Rajdhani, JetBrains_Mono, Noto_Sans_SC, Chakra_Petch } from "next/font/google";
import "./globals.css";
import NavigationSystem from "@/components/layout/NavigationSystem";
import ScrollNavigation from "@/components/layout/ScrollNavigation";
import { TranslationProvider } from "@/lib/i18n/TranslationContext";
import { SoundProvider } from "@/lib/audio/SoundContext";
import BootSequence from "@/components/layout/BootSequence";

const rajdhani = Rajdhani({  
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-rajdhani'
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: '--font-noto-sans-sc'
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-chakra'
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
    <html lang="zh-CN">
      <body className={`${rajdhani.variable} ${mono.variable} ${notoSansSC.variable} ${chakra.variable} font-sans min-h-screen flex flex-col`}>
        <TranslationProvider>
          <SoundProvider>
            <BootSequence />
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
          </SoundProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}

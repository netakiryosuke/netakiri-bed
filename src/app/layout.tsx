import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Kaku_Gothic_New, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-en",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "netakiri-bed",
  description: "netakiri-bed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${zenKakuGothicNew.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[url('/background.png')] bg-cover bg-fixed bg-no-repeat bg-center text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

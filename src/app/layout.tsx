// layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/chatbot/ChatbotButton";
import { LanguageProvider } from '../contexts/LanguageContext';
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Coding Jojo",
  description: "Welcome to coding Jojo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}>
        <LanguageProvider>
          {/* Now Navbar is INSIDE the LanguageProvider */}
          <Navbar />
          {children}
          <Footer />
          <ChatbotButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
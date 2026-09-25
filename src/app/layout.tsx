import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { ToastProvider } from '@/context/ToastContext';
import { DemoRoleSwitcher } from '@/components/common/DemoRoleSwitcher';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'SkillLink — Worldwide Home & Professional Services Marketplace',
  description:
    'Connect with verified skilled tradespeople, technicians, cleaners, and professional service experts across 10 core categories worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <AuthProvider>
          <MarketplaceProvider>
            <ToastProvider>
              <DemoRoleSwitcher />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </ToastProvider>
          </MarketplaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

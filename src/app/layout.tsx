import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Black94 - Connect. Create. Earn.',
  description: 'Black94 is an all-in-one social media platform with E2EE chat, AI-powered CRM, creator monetization, and business advertising tools.',
  keywords: 'social media, messaging, creator monetization, business CRM, AI, Black94',
  authors: [{ name: 'Black94' }],
  openGraph: {
    title: 'Black94',
    description: 'Connect. Create. Earn.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

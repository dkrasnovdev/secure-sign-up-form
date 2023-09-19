import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secure Sign Up Form | dkrasnov.dev',
  description:
    'Learn how to build airtight registration forms using React, React Hook Form, Zod, and Next.js Server Actions. Enhance your web development skills and create robust, protected sign-up experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

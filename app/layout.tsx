import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'uglydogsarecute | Official Music & Merch Hub',
  description: 'Official personal artist portfolio, music releases, merchandise shop, and updates by uglydogsarecute.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800;900&family=Unbounded:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0c0a09] text-[#f5f3f0] antialiased selection:bg-[#f36c21] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}

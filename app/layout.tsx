import type { Metadata, Viewport } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TrailVault',
  description: 'Discover hidden UK gems for wild adventures.',
  manifest: '/manifest.webmanifest'
};

export const viewport: Viewport = {
  themeColor: '#1f3d33'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-black/5 bg-oat/95 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold tracking-tight text-pine">
              TrailVault
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/map">Map</Link>
              <Link href="/saved">Saved</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

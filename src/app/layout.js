import './globals.css';
import { Fraunces, Inter } from 'next/font/google';
import StickyBanner from '../components/StickyBanner';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Doug Charles for Windsong Ranch HOA',
  description: 'Your Voice. Your Vote. Our Windsong.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body text-charcoal bg-white">
        <StickyBanner />
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}

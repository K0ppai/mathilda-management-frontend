import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Context from './context/ClassContext';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mathilda Management',
  description: 'Technical assignment by mathilda',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main>
          <NavBar />
          <Context>{children}</Context>
        </main>
      </body>
    </html>
  );
}

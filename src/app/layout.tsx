import './globals.css';
import { Poppins, Fredoka } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const fredoka = Fredoka({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka-one',
});

export const metadata = {
  title: 'Pawfection Grooming & Spa - Premium Dog Grooming Services',
  description: 'Professional dog grooming and spa services that your furry friend deserves. Offering grooming packages, special treatments, and premium products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${fredoka.variable}`}>
      <body className="font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
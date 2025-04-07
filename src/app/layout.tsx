import './globals.css';
import { Poppins, Fredoka } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SizeProvider } from '@/context/SizeContext';

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
  metadataBase: new URL('https://pawfection-spa.com'),
  title: 'Pawfection Grooming & Spa - Premium Dog Grooming Services',
  description: 'Professional dog grooming and spa services that your furry friend deserves. Offering grooming packages, special treatments, and premium products.',
  keywords: 'dog grooming, pet spa, dog salon, pet grooming, dog care, pet care, dog services, pet services',
  authors: [{ name: 'Pawfection Grooming & Spa' }],
  creator: 'Pawfection Grooming & Spa',
  publisher: 'Pawfection Grooming & Spa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Pawfection Grooming & Spa - Premium Dog Grooming Services',
    description: 'Professional dog grooming and spa services that your furry friend deserves. Offering grooming packages, special treatments, and premium products.',
    url: '/',
    siteName: 'Pawfection Grooming & Spa',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pawfection Grooming & Spa - Premium Dog Grooming Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pawfection Grooming & Spa - Premium Dog Grooming Services',
    description: 'Professional dog grooming and spa services that your furry friend deserves.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${fredoka.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SizeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SizeProvider>
      </body>
    </html>
  );
}
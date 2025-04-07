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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://pawfection-spa.vercel.app'),
  title: 'Pawfection Grooming & Spa - Portfolio Project',
  description: 'A concept project showcasing a fictional dog grooming and spa service website built with Next.js and React.',
  keywords: 'portfolio, next.js, react, web development, frontend development, dog grooming website, pet spa UI',
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Name',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Pawfection Grooming & Spa - Portfolio Project',
    description: 'A portfolio project showcasing a fictional dog grooming and spa service website built with Next.js and React.',
    url: '/',
    siteName: 'Pawfection Spa - Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pawfection Spa - Portfolio Project Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pawfection Spa - Portfolio Project',
    description: 'Frontend development portfolio project showing UI/UX skills.',
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
    // Remove this if you don't need Google verification
    // google: 'your-google-site-verification',
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
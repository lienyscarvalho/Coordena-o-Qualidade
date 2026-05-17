import type {Metadata} from 'next';
import { Inter, PT_Serif } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Vivo Qualidade',
  description: 'App de Gestão de Indicadores de Qualidade - Vivo',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ptSerif.variable} font-sans bg-gray-50 text-gray-900`} suppressHydrationWarning>{children}</body>
    </html>
  );
}

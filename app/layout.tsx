import type { Metadata } from 'next';
import { Inter, PT_Serif } from 'next/font/google';
import './globals.css';
import { TopNav } from '@/components/top-nav';
import { ThemeProvider } from '@/components/theme-provider';

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
  title: 'Vivo - Coordenação de Qualidade',
  description: 'Painel de Indicadores',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body className={`${inter.variable} ${ptSerif.variable} font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 h-full flex flex-col`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TopNav />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

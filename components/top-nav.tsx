"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen, Wrench, Bot } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

const VivoLogo = () => (
  <div className="flex items-center space-x-2">
    <span className="text-white font-bold text-3xl tracking-tighter" style={{ fontFamily: 'sans-serif' }}>vivo</span>
    <div className="h-6 border-l border-white/30 ml-2 mr-2"></div>
    <span className="text-white/90 font-semibold tracking-wide uppercase text-sm">Coordenação de Qualidade</span>
  </div>
);

export function TopNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/manual', label: 'Manual', icon: BookOpen },
    { href: '/ferramentas', label: '7 Ferramentas', icon: Wrench },
    { href: '/ia', label: 'IA Analista', icon: Bot },
  ];

  return (
    <header className="h-16 bg-[#660099] flex items-center justify-between px-8 shrink-0 text-white shadow-sm sticky top-0 z-50">
      <Link href="/" className="flex items-center space-x-6 hover:opacity-80 transition-opacity">
        <VivoLogo />
      </Link>
      
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="w-px h-6 bg-white/20 mx-2"></div>
        <ThemeToggle />
      </div>
    </header>
  );
}

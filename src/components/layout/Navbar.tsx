'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页', en: 'HOME' },
    { href: '/works', label: '作品殿堂', en: 'WORKS' },
    { href: '/variety', label: '综艺', en: 'VARIETY' },
    { href: '/schedule', label: '行程日历', en: 'SCHEDULE' },
    { href: '/commercial', label: '商业价值', en: 'COMMERCIAL' },
    { href: '/profile', label: '荣誉资料', en: 'PROFILE' },
    { href: '/gallery', label: '杂志访谈', en: 'INTERVIEWS' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-nav py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Area */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-neon-purple rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-lg italic">Y</span>
                <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/20 to-transparent" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wider group-hover:text-glow transition-all">
                YANG ZI
              </span>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] group-hover:text-neon-purple transition-colors">
                UNIVERSE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 group overflow-hidden rounded-lg transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className={`absolute inset-0 bg-white/5 transform transition-transform duration-300 origin-bottom ${
                    isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                  }`} />
                  <div className="relative flex flex-col items-center">
                    <span className="text-sm font-medium tracking-wide">{link.label}</span>
                    <span className="text-[9px] font-light opacity-50 tracking-widest mt-0.5">
                      {link.en}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent shadow-[0_0_10px_var(--neon-purple)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-neon-purple transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '60px' }}
      >
        <div className="p-6 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-baseline justify-between border-b border-white/10 py-4 group-hover:border-neon-purple/50 transition-colors">
                <span className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors">
                  {link.label}
                </span>
                <span className="text-sm text-gray-600 font-mono group-hover:text-gray-400">
                  {link.en}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

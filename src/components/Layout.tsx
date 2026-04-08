import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and handle hash scroll on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const navLinks = [
    { path: '/message', jp: '未来に向けて' },
    { path: '/about', jp: '事業を知る' },
    { path: '/people', jp: '全農ひろしまで働く' },
    { path: '/recruit', jp: '採用について' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || location.pathname !== '/'
            ? 'bg-white shadow-md py-2'
            : 'bg-white/90 backdrop-blur-sm py-3'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/images/common/logo.png"
              alt="JA全農ひろしま"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.jp}
                to={link.path}
                className="group flex flex-col items-center"
              >
                <span className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {link.jp}
                </span>
              </Link>
            ))}
            <a
              href="https://www.zennoh.or.jp/hr/recruit/entry/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              ENTRY
              <ExternalLink className="w-4 h-4" />
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100">
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.jp}
                  to={link.path}
                  className="flex items-center justify-between py-4 border-b border-gray-100"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      {link.jp}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
              <a
                href="https://www.zennoh.or.jp/hr/recruit/entry/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-green-600 text-white px-4 py-4 rounded-lg font-bold text-center flex items-center justify-center gap-2"
              >
                ENTRY
                <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-[64px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/images/common/logo_footer.png" alt="JA全農ひろしま" className="h-12 w-auto brightness-200" />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                全国農業協同組合連合会 広島県本部<br />
                〒731-0124 広島市安佐南区大町東二丁目14番12号
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-green-400">CONTENTS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/message" className="hover:text-white transition-colors">未来に向けて (Message)</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">事業を知る (About)</Link></li>
                <li><Link to="/people" className="hover:text-white transition-colors">全農ひろしまで働く (People)</Link></li>
                <li><Link to="/recruit" className="hover:text-white transition-colors">採用について (Recruit)</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-green-400">LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="https://www.zennoh.or.jp/hr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    JA全農ひろしま 公式サイト <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.zennoh.or.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    JA全農 公式サイト <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} JA ZEN-NOH HIROSHIMA. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-300">プライバシーポリシー</a>
              <a href="#" className="hover:text-gray-300">サイトマップ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

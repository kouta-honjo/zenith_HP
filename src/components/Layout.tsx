import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  {
    label: '未来に向けて',
    children: [
      { path: '/vision', label: '全農の目指す姿' },
      { path: '/top-message', label: '全農トップメッセージ' },
    ],
  },
  {
    label: '事業を知る',
    children: [
      { path: '/business', label: 'JA全農ひろしまとは' },
      { path: '/3r', label: '3-R（さん・あーる）' },
      { path: '/projects', label: '各部署の事業内容' },
    ],
  },
  {
    label: '全農ひろしまで働く',
    children: [
      { path: '/staff', label: '先輩社員の1日' },
      { path: '/data', label: 'データで知る' },
    ],
  },
  {
    label: '採用について',
    children: [
      { path: '/recruit', label: '採用情報' },
      { path: '/benefits', label: '福利厚生' },
    ],
  },
];

function DesktopDropdown({ item }: { item: typeof navItems[number] }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const leave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-green-600 transition-colors py-2">
        {item.label}
        <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px]">
            {item.children.map((child) => (
              <span
                key={child.path}
                className="flex items-center gap-2 px-5 py-3 text-sm text-gray-400 cursor-default"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                {child.label}
                <span className="ml-auto text-[10px] text-gray-300">準備中</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    window.scrollTo(0, 0);
  }, [location]);

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
            <img src="/images/common/logo.png" alt="JA全農ひろしま" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="flex items-center justify-between w-full py-4"
                  >
                    <span className="font-bold text-gray-900">{item.label}</span>
                    <ChevronDown className={cn('w-5 h-5 text-gray-400 transition-transform', mobileExpanded === item.label && 'rotate-180')} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="pb-3 pl-4 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <span
                          key={child.path}
                          className="flex items-center gap-2 py-2.5 text-sm text-gray-400 cursor-default"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                          {child.label}
                          <span className="ml-auto text-[10px] text-gray-300">準備中</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
              <ul className="space-y-2 text-sm text-gray-500">
                {navItems.flatMap((item) =>
                  item.children.map((child) => (
                    <li key={child.path}>
                      <span className="cursor-default">{child.label}</span>
                    </li>
                  ))
                )}
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

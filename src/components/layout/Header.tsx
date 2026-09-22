import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Heart, Search, Phone, Building2 } from 'lucide-react';
import { navItems, siteConfig } from '@/config/siteConfig';
import { useFavorites } from '@/hooks/useFavorites';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { toPersianDigits } from '@/utils/formatPrice';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition(20);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-neutral-200/60 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-xl">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 text-white">
                <Building2 size={22} />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-bold transition-colors ${
                    scrolled ? 'text-neutral-900' : 'text-white'
                  }`}
                >
                  {siteConfig.brand}
                </span>
                <span
                  className={`text-2xs transition-colors ${
                    scrolled ? 'text-neutral-500' : 'text-white/70'
                  }`}
                >
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? scrolled
                          ? 'bg-primary-50 text-primary-700'
                          : 'bg-white/15 text-white'
                        : scrolled
                          ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/properties')}
                className={`hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:flex ${
                  scrolled
                    ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="جستجو"
              >
                <Search size={18} />
                <span className="hidden md:inline">جستجو</span>
              </button>

              <Link
                to="/properties?favorites=true"
                className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart size={18} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -left-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-500 px-1 text-2xs font-bold text-white">
                    {toPersianDigits(favorites.length)}
                  </span>
                )}
              </Link>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="hidden items-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-800 hover:shadow-lg hover:shadow-primary-700/20 xl:flex"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 lg:hidden"
                aria-label="منو"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-white shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-700 text-white">
                  <Building2 size={20} />
                </div>
                <span className="text-lg font-bold text-neutral-900">
                  {siteConfig.brand}
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                aria-label="بستن"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-neutral-100 p-4">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>
              <p className="mt-3 text-center text-xs text-neutral-500">
                {siteConfig.workingHours}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

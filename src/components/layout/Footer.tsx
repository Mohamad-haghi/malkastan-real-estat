import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send,
  Linkedin,
  Twitter,
  Heart,
} from 'lucide-react';
import { siteConfig, navItems } from '@/config/siteConfig';

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Main */}
      <div className="container-xl py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Building2 size={22} />
              </div>
              <span className="text-xl font-bold text-white">
                {siteConfig.brand}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="اینستاگرام"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="تلگرام"
              >
                <Send size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="لینکدین"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-colors hover:bg-primary-600 hover:text-white"
                aria-label="توییتر"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white">دسترسی سریع</h4>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-sm font-bold text-white">ملک‌ها</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/properties?transactionType=sale"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                >
                  خرید ملک
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?transactionType=rent"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                >
                  اجاره ملک
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?featured=true"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                >
                  ملک‌های ویژه
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                >
                  مقایسه ملک‌ها
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white">تماس با ما</h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary-400" />
                <span className="text-sm text-neutral-400">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary-400" />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                  dir="ltr"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary-400" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-neutral-400 transition-colors hover:text-primary-400"
                  dir="ltr"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary-400" />
                <span className="text-sm text-neutral-400">{siteConfig.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="container-xl py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} {siteConfig.brand}. تمام حقوق محفوظ است.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-neutral-500">
              ساخته‌شده با <Heart size={12} className="text-accent-500" /> در ایران
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

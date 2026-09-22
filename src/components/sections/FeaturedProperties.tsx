import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getFeaturedProperties } from '@/data/properties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Reveal } from '@/components/ui/Reveal';

export function FeaturedProperties() {
  const featured = getFeaturedProperties();
  const large = featured[0];
  const rest = featured.slice(1, 5);

  return (
    <section className="bg-neutral-50 py-16 lg:py-24">
      <div className="container-xl">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-medium text-primary-600">ملک‌های منتخب</span>
            <h2 className="mt-2 section-title">ملک‌های ویژه‌ی ملکستان</h2>
            <p className="section-subtitle">
              منتخب‌ترین ملک‌ها با بهترین موقعیت و کیفیت
            </p>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-900"
          >
            همه ملک‌ها
            <ArrowLeft size={16} />
          </Link>
        </Reveal>

        {/* Editorial layout */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Large featured */}
          {large && (
            <Reveal className="lg:col-span-2 lg:row-span-2" delay={100}>
              <Link
                to={`/properties/${large.id}`}
                className="group relative block h-full min-h-[400px] overflow-hidden rounded-3xl"
              >
                <img
                  src={large.images[0]}
                  alt={large.title}
                  loading="eager"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                    }
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-8">
                  <div className="flex gap-2">
                    <span className="badge bg-primary-600 text-white">ویژه</span>
                    <span className="badge bg-white/20 text-white backdrop-blur-md">
                      {large.neighborhood}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    {large.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 max-w-xl text-sm text-neutral-200">
                    {large.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-neutral-200">
                    <span>{toPersianDigitsSafe(large.area)} متر</span>
                    <span>•</span>
                    <span>{toPersianDigitsSafe(large.bedrooms)} خواب</span>
                    <span>•</span>
                    <span className="font-bold text-white">
                      {large.transactionType === 'sale'
                        ? 'خرید'
                        : 'اجاره'}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Smaller cards */}
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={200 + i * 100}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function toPersianDigitsSafe(n: number): string {
  return String(n).replace(/\d/g, (d) =>
    '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)],
  );
}

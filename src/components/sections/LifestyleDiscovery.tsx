import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { locations } from '@/data/locations';
import { toPersianDigits } from '@/utils/formatPrice';
import { Reveal } from '@/components/ui/Reveal';

export function LifestyleDiscovery() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-xl">
        <Reveal className="text-center">
          <span className="text-sm font-medium text-primary-600">سبک زندگی</span>
          <h2 className="mt-2 section-title">محله‌ها را کشف کنید</h2>
          <p className="section-subtitle mx-auto max-w-2xl">
            هر محله، یک تجربه‌ی متفاوت. سبک زندگی خود را پیدا کنید.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 100} variant="scale">
              <Link
                to={`/properties?neighborhood=${encodeURIComponent(loc.name)}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = '1';
                      img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-end p-6">
                  <span className="badge mb-3 w-fit bg-accent-500/90 text-white backdrop-blur-sm">
                    {loc.lifestyle}
                  </span>
                  <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <MapPin size={18} />
                    {loc.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-200">
                    {loc.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-300">
                      {toPersianDigits(loc.propertyCount)} ملک
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-white transition-all group-hover:gap-2">
                      مشاهده
                      <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

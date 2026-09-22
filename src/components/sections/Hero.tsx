import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { PropertySearch } from '@/components/search/PropertySearch';
import { usePropertySearch } from '@/hooks/usePropertySearch';
import { RequestModal } from '@/components/forms/RequestModal';
import { toPersianDigits } from '@/utils/formatPrice';

export function Hero() {
  const { filters, updateFilter, resetFilters } = usePropertySearch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-neutral-950">
        {/* Background video/image */}
        <div className="absolute inset-0">
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
              poster="https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
              className="h-full w-full object-cover"
            >
              <source src={siteConfig.heroVideo} type="video/mp4" />
            </video>
          )}
          {videoFailed && (
            <img
              src="https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&h=1080&w=1920"
              alt=""
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950/80" />
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-xl relative z-10 flex min-h-[92vh] flex-col justify-center py-20">
          <div className="max-w-3xl">
            <div className="inline-flex animate-fade-down items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <Play size={14} fill="currentColor" />
              تجربه‌ای شبیه دیدن خانه
            </div>

            <h1 className="mt-6 animate-fade-up text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              خانه‌ی بعدی شما،
              <br />
              <span className="bg-gradient-to-l from-primary-400 to-accent-400 bg-clip-text text-transparent">
                همین‌جا شروع می‌شود.
              </span>
            </h1>

            <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-neutral-200 animate-delay-200 sm:text-lg">
              ملک‌ها را کشف کنید، جزئیات را بررسی کنید و درخواست بازدید، خرید، اجاره یا
              مشاوره بدهید. همه‌چیز در یک تجربه‌ی ساده و حرفه‌ای.
            </p>

            <div className="mt-8 flex animate-fade-up flex-wrap gap-3 animate-delay-300">
              <Link to="/properties">
                <button className="btn btn-primary btn-lg">
                  مشاهده ملک‌ها
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <button
                onClick={() => setShowConsultation(true)}
                className="btn btn-lg border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <MessageCircle size={18} />
                درخواست مشاوره
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex animate-fade-up gap-8 animate-delay-500">
              <div>
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {toPersianDigits(siteConfig.demo.activeListings)}+
                </p>
                <p className="text-sm text-neutral-300">ملک فعال</p>
              </div>
              <div className="border-r border-white/20 pr-8">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {toPersianDigits(siteConfig.demo.completedTransactions)}+
                </p>
                <p className="text-sm text-neutral-300">معامله موفق</p>
              </div>
              <div className="border-r border-white/20 pr-8">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {toPersianDigits(siteConfig.demo.satisfaction)}٪
                </p>
                <p className="text-sm text-neutral-300">رضایت مشتری</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8">
          <div className="container-xl">
            <PropertySearch
              filters={filters}
              onFilterChange={updateFilter}
              onSearch={() => {}}
              onReset={resetFilters}
              variant="hero"
            />
          </div>
        </div>
      </section>

      <RequestModal
        open={showConsultation}
        onClose={() => setShowConsultation(false)}
        type="consultation"
      />
    </>
  );
}

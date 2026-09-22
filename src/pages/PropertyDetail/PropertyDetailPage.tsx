import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Maximize,
  BedDouble,
  Bath,
  Car,
  Layers,
  Calendar,
  Warehouse,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  Heart,
  GitCompare,
  Phone,
  Mail,
  Play,
  MapPin,
  ShoppingCart,
  Key,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Gallery } from '@/components/gallery/Gallery';
import { VideoTour } from '@/components/gallery/VideoTour';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { RequestModal } from '@/components/forms/RequestModal';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  getPropertyById,
  getRelatedProperties,
} from '@/data/properties';
import { getAgentById } from '@/data/agents';
import {
  getPropertyPriceText,
  getPropertyLocation,
  getPropertyTypeLabel,
  getTransactionTypeLabel,
  formatArea,
  formatPrice,
  toPersianDigits,
} from '@/utils/formatPrice';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { siteConfig } from '@/config/siteConfig';
import type { RequestType } from '@/types';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : undefined;
  const [requestType, setRequestType] = useState<RequestType | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, canAddMore } = useCompare();

  if (!property) {
    return (
      <div className="container-xl py-20">
        <EmptyState
          title="ملک یافت نشد"
          description="ملک موردنظر شما پیدا نشد. ممکن است حذف شده باشد یا آدرس اشتباه باشد."
          action={
            <Link to="/properties">
              <Button>
                <ArrowLeft size={18} />
                بازگشت به ملک‌ها
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const agent = getAgentById(property.agentId);
  const related = getRelatedProperties(property.id);
  const fav = isFavorite(property.id);
  const comparing = isComparing(property.id);

  const stats = [
    { icon: Maximize, label: 'متراژ', value: formatArea(property.area) },
    { icon: BedDouble, label: 'اتاق خواب', value: toPersianDigits(property.bedrooms) },
    { icon: Bath, label: 'حمام', value: toPersianDigits(property.bathrooms) },
    {
      icon: Layers,
      label: 'طبقه',
      value:
        property.totalFloors > 0
          ? `${toPersianDigits(property.floor)} از ${toPersianDigits(property.totalFloors)}`
          : '—',
    },
    { icon: Car, label: 'پارکینگ', value: property.parking ? 'دارد' : 'ندارد' },
    { icon: Warehouse, label: 'انباری', value: property.storage ? 'دارد' : 'ندارد' },
    {
      icon: ArrowUpRight,
      label: 'آسانسور',
      value: property.elevator ? 'دارد' : 'ندارد',
    },
    {
      icon: Calendar,
      label: 'سال ساخت',
      value: property.yearBuilt ? toPersianDigits(property.yearBuilt) : '—',
    },
  ];

  const requestActions: { type: RequestType; label: string; icon: typeof ShoppingCart; variant: 'primary' | 'accent' | 'outline' }[] =
    property.transactionType === 'sale'
      ? [
          { type: 'purchase', label: 'درخواست خرید', icon: ShoppingCart, variant: 'primary' },
          { type: 'viewing', label: 'درخواست بازدید', icon: Eye, variant: 'accent' },
          { type: 'consultation', label: 'مشاوره', icon: MessageCircle, variant: 'outline' },
        ]
      : [
          { type: 'rental', label: 'درخواست اجاره', icon: Key, variant: 'primary' },
          { type: 'viewing', label: 'درخواست بازدید', icon: Eye, variant: 'accent' },
          { type: 'consultation', label: 'مشاوره', icon: MessageCircle, variant: 'outline' },
        ];

  return (
    <>
      <Seo
        title={`${property.title} — ${siteConfig.brand}`}
        description={property.description.slice(0, 160)}
        image={property.images[0]}
        type="article"
      />

      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-white py-4">
        <div className="container-xl">
          <nav className="flex items-center gap-1 text-sm text-neutral-400">
            <Link to="/" className="hover:text-neutral-700">خانه</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-neutral-700">ملک‌ها</Link>
            <span>/</span>
            <span className="line-clamp-1 text-neutral-700">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-xl py-8 pb-24 lg:pb-8">
        {/* Title section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`badge ${
                  property.transactionType === 'sale' ? 'badge-sale' : 'badge-rent'
                }`}
              >
                {getTransactionTypeLabel(property.transactionType)}
              </span>
              <span className="badge bg-neutral-100 text-neutral-700">
                {getPropertyTypeLabel(property.type)}
              </span>
              {property.featured && (
                <span className="badge bg-neutral-900 text-white">ویژه</span>
              )}
            </div>
            <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl lg:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-neutral-500">
              <MapPin size={18} />
              {getPropertyLocation(property)} • {property.address}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleFavorite(property.id)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                fav
                  ? 'border-accent-200 bg-accent-50 text-accent-500'
                  : 'border-neutral-200 bg-white text-neutral-400 hover:text-accent-500'
              }`}
              aria-label="علاقه‌مندی"
            >
              <Heart size={20} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => toggleCompare(property.id)}
              disabled={!comparing && !canAddMore}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all disabled:opacity-30 ${
                comparing
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-400 hover:text-primary-700'
              }`}
              aria-label="مقایسه"
            >
              <GitCompare size={20} />
            </button>
          </div>
        </div>

        {/* Gallery + Price sidebar */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Gallery images={property.images} title={property.title} />

            {/* Video tour */}
            {property.video && showVideo && (
              <div className="mt-6">
                <VideoTour
                  src={property.video}
                  poster={property.images[0]}
                  title={property.title}
                />
              </div>
            )}
            {property.video && !showVideo && (
              <button
                onClick={() => setShowVideo(true)}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 py-6 text-neutral-500 transition-colors hover:border-primary-300 hover:bg-primary-50/30 hover:text-primary-700"
              >
                <Play size={24} fill="currentColor" />
                <span className="text-base font-medium">تور ویدئویی این ملک را ببینید</span>
              </button>
            )}
          </div>

          {/* Price / CTA sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                <p className="text-sm text-neutral-400">
                  {property.transactionType === 'sale' ? 'قیمت' : 'ودیعه و اجاره'}
                </p>
                {property.transactionType === 'sale' ? (
                  <p className="mt-1 text-2xl font-bold text-primary-700">
                    {formatPrice(property.price)}
                  </p>
                ) : (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">ودیعه:</span>
                      <span className="text-lg font-bold text-primary-700">
                        {formatPrice(property.deposit || 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">اجاره ماهانه:</span>
                      <span className="text-lg font-bold text-primary-700">
                        {formatPrice(property.rent || 0)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-5 space-y-2">
                  {requestActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.type}
                        variant={action.variant}
                        className="w-full"
                        onClick={() => setRequestType(action.type)}
                      >
                        <Icon size={18} />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Agent card */}
              {agent && (
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-neutral-400">کارشناس ملک</p>
                  <div className="mt-3 flex items-center gap-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="h-16 w-16 rounded-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = '1';
                          img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                        }
                      }}
                    />
                    <div>
                      <p className="font-bold text-neutral-900">{agent.name}</p>
                      <p className="text-xs text-neutral-500">{agent.title}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600 line-clamp-3">{agent.bio}</p>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`tel:${agent.phone.replace(/[\s-]/g, '')}`}
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-primary-50 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
                    >
                      <Phone size={16} />
                      تماس
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-100 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200"
                    >
                      <Mail size={16} />
                      ایمیل
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900">مشخصات کلیدی</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-xl border border-neutral-100 bg-white p-4 text-center"
                >
                  <Icon size={22} className="text-primary-600" />
                  <p className="mt-2 text-xs text-neutral-400">{s.label}</p>
                  <p className="mt-1 text-sm font-bold text-neutral-900">{s.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description + Why */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">درباره‌ی این ملک</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              {property.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900">چرا این ملک؟</h2>
            <ul className="mt-4 space-y-3">
              {property.whyThisProperty.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary-600" />
                  <span className="text-sm text-neutral-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900">امکانات و ویژگی‌ها</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {property.features.map((f, i) => (
              <span
                key={i}
                className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700"
              >
                <CheckCircle2 size={16} className="text-primary-500" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-neutral-900">موقعیت</h2>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-neutral-50 px-5 py-4 text-sm text-neutral-600">
            <MapPin size={18} className="text-primary-600" />
            {property.address}
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            موقعیت دقیق روی نقشه پس از درخواست بازدید به اشتراک گذاشته می‌شود.
          </p>
        </div>

        {/* Related properties */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-neutral-900">ملک‌های مشابه</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-100 bg-white p-3 shadow-lg lg:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0">
            <p className="text-2xs text-neutral-400">قیمت</p>
            <p className="text-sm font-bold text-primary-700">
              {getPropertyPriceText(property)}
            </p>
          </div>
          <Button
            className="flex-1"
            onClick={() =>
              setRequestType(
                property.transactionType === 'sale' ? 'purchase' : 'rental',
              )
            }
          >
            {property.transactionType === 'sale' ? 'درخواست خرید' : 'درخواست اجاره'}
          </Button>
        </div>
      </div>

      {/* Request modal */}
      {requestType && (
        <RequestModal
          open={true}
          onClose={() => setRequestType(null)}
          type={requestType}
          property={property}
        />
      )}
    </>
  );
}

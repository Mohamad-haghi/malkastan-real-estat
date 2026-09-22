import { Link } from 'react-router-dom';
import { X, GitCompare, ArrowLeft } from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCompare } from '@/hooks/useCompare';
import { getPropertyById } from '@/data/properties';
import {
  formatPrice,
  formatArea,
  toPersianDigits,
  getPropertyTypeLabel,
  getTransactionTypeLabel,
} from '@/utils/formatPrice';
import { siteConfig } from '@/config/siteConfig';
import {
  Maximize,
  BedDouble,
  Bath,
  Layers,
  Calendar,
  Car,
  Warehouse,
  ArrowUpRight,
  Check,
  MapPin,
} from 'lucide-react';

export function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const properties = compareList
    .map((id) => getPropertyById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPropertyById>>[];

  const compareFields = [
    { label: 'قیمت', get: (p: typeof properties[0]) => formatPrice(p.transactionType === 'rent' ? p.deposit || 0 : p.price) },
    { label: 'ودیعه', get: (p: typeof properties[0]) => p.deposit ? formatPrice(p.deposit) : '—' },
    { label: 'اجاره', get: (p: typeof properties[0]) => p.rent ? formatPrice(p.rent) : '—' },
    { label: 'متراژ', get: (p: typeof properties[0]) => formatArea(p.area) },
    { label: 'اتاق خواب', get: (p: typeof properties[0]) => toPersianDigits(p.bedrooms) },
    { label: 'حمام', get: (p: typeof properties[0]) => toPersianDigits(p.bathrooms) },
    { label: 'طبقه', get: (p: typeof properties[0]) => p.totalFloors > 0 ? `${toPersianDigits(p.floor)} از ${toPersianDigits(p.totalFloors)}` : '—' },
    { label: 'سال ساخت', get: (p: typeof properties[0]) => p.yearBuilt ? toPersianDigits(p.yearBuilt) : '—' },
    { label: 'پارکینگ', get: (p: typeof properties[0]) => p.parking ? 'دارد' : 'ندارد' },
    { label: 'انباری', get: (p: typeof properties[0]) => p.storage ? 'دارد' : 'ندارد' },
    { label: 'آسانسور', get: (p: typeof properties[0]) => p.elevator ? 'دارد' : 'ندارد' },
    { label: 'امکانات', get: (p: typeof properties[0]) => p.features.join('، ') },
  ];

  return (
    <>
      <Seo
        title={`مقایسه ملک‌ها — ${siteConfig.brand}`}
        description="ملک‌های موردنظر خود را کنار هم مقایسه کنید."
      />

      <div className="border-b border-neutral-100 bg-white pt-8 pb-6">
        <div className="container-xl">
          <nav className="text-sm text-neutral-400">
            <span>خانه</span> <span className="mx-1">/</span>{' '}
            <span className="text-neutral-700">مقایسه</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
            مقایسه ملک‌ها
          </h1>
          <p className="mt-2 text-neutral-500">
            تا ۳ ملک را کنار هم مقایسه کنید
          </p>
        </div>
      </div>

      <div className="container-xl py-8">
        {properties.length === 0 ? (
          <EmptyState
            icon={<GitCompare size={36} />}
            title="لیست مقایسه خالی است"
            description="از صفحه ملک‌ها، آیکن مقایسه را روی ملک‌های موردنظر بزنید تا اینجا اضافه شوند."
            action={
              <Link to="/properties">
                <Button>
                  <ArrowLeft size={18} />
                  رفتن به ملک‌ها
                </Button>
              </Link>
            }
          />
        ) : (
          <>
            {/* Clear button */}
            <div className="mb-6 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                <X size={16} />
                پاک کردن همه
              </Button>
            </div>

            {/* Comparison table - desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-neutral-100 lg:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50">
                    <th className="w-40 p-4 text-right text-sm font-medium text-neutral-500">
                      مشخصه
                    </th>
                    {properties.map((p) => (
                      <th key={p.id} className="p-4 text-right">
                        <div className="relative">
                          <button
                            onClick={() => removeFromCompare(p.id)}
                            className="absolute -top-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 transition-colors hover:bg-red-100 hover:text-red-600"
                            aria-label="حذف از مقایسه"
                          >
                            <X size={14} />
                          </button>
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-32 w-full rounded-xl object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (!img.dataset.fallback) {
                                img.dataset.fallback = '1';
                                img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                              }
                            }}
                          />
                          <Link
                            to={`/properties/${p.id}`}
                            className="mt-2 block line-clamp-2 text-sm font-bold text-neutral-900 hover:text-primary-700"
                          >
                            {p.title}
                          </Link>
                          <p className="mt-1 text-xs text-neutral-400">
                            {p.neighborhood}
                          </p>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 3 - properties.length }).map((_, i) => (
                      <th key={`empty-${i}`} className="p-4">
                        <Link
                          to="/properties"
                          className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 text-sm text-neutral-400 transition-colors hover:border-primary-300 hover:text-primary-600"
                        >
                          افزودن ملک
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareFields.map((field, rowIdx) => (
                    <tr
                      key={field.label}
                      className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}
                    >
                      <td className="p-4 text-sm font-medium text-neutral-500">
                        {field.label}
                      </td>
                      {properties.map((p) => (
                        <td key={p.id} className="p-4 text-sm text-neutral-800">
                          {field.get(p)}
                        </td>
                      ))}
                      {Array.from({ length: 3 - properties.length }).map((_, i) => (
                        <td key={`empty-${i}`} className="p-4" />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-6 lg:hidden">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-neutral-100 bg-white"
                >
                  <div className="relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.dataset.fallback) {
                          img.dataset.fallback = '1';
                          img.src = 'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
                        }
                      }}
                    />
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-600 backdrop-blur-md"
                      aria-label="حذف"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-4">
                    <Link
                      to={`/properties/${p.id}`}
                      className="font-bold text-neutral-900 hover:text-primary-700"
                    >
                      {p.title}
                    </Link>
                    <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                      <MapPin size={12} />
                      {p.neighborhood}
                    </p>
                    <dl className="mt-4 divide-y divide-neutral-100">
                      {compareFields.map((field) => (
                        <div
                          key={field.label}
                          className="flex items-center justify-between py-2.5"
                        >
                          <dt className="text-sm text-neutral-500">{field.label}</dt>
                          <dd className="text-sm font-medium text-neutral-900">
                            {field.get(p)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              ))}
              {properties.length < 3 && (
                <Link
                  to="/properties"
                  className="flex items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 py-8 text-sm font-medium text-neutral-400 transition-colors hover:border-primary-300 hover:text-primary-600"
                >
                  افزودن ملک دیگر
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

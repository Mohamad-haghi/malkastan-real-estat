import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { Seo } from '@/components/ui/Seo';
import { PropertySearch } from '@/components/search/PropertySearch';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { usePropertySearch } from '@/hooks/usePropertySearch';
import { useFavorites } from '@/hooks/useFavorites';
import { toPersianDigits } from '@/utils/formatPrice';
import { siteConfig } from '@/config/siteConfig';
import type { SortOption, ViewMode, TransactionType, PropertyType } from '@/types';

export function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, sort, results, updateFilter, setSort, resetFilters, hasActiveFilters } =
    usePropertySearch();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { favorites } = useFavorites();

  // Apply URL params on mount
  useEffect(() => {
    const tt = searchParams.get('transactionType');
    if (tt) updateFilter('transactionType', tt as TransactionType | 'all');
    const nb = searchParams.get('neighborhood');
    if (nb) updateFilter('neighborhood', nb);
    const pt = searchParams.get('propertyType');
    if (pt) updateFilter('propertyType', pt as PropertyType | 'all');
    const br = searchParams.get('bedrooms');
    if (br) updateFilter('bedrooms', Number(br));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showOnlyFavorites = searchParams.get('favorites') === 'true';

  const displayedResults = useMemo(() => {
    if (showOnlyFavorites) {
      return results.filter((p) => favorites.includes(p.id));
    }
    return results;
  }, [results, showOnlyFavorites, favorites]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.transactionType && filters.transactionType !== 'all') {
      params.set('transactionType', filters.transactionType);
    }
    if (filters.neighborhood && filters.neighborhood !== 'all') {
      params.set('neighborhood', filters.neighborhood);
    }
    if (filters.propertyType && filters.propertyType !== 'all') {
      params.set('propertyType', filters.propertyType);
    }
    if (filters.bedrooms) params.set('bedrooms', String(filters.bedrooms));
    setSearchParams(params);
  };

  const handleReset = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <>
      <Seo
        title={`ملک‌ها — ${siteConfig.brand}`}
        description="جستجو و بررسی آپارتمان، ویلا و پنت‌هاوس در تهران. فیلتر بر اساس قیمت، محله و نوع ملک."
      />

      {/* Page header */}
      <div className="border-b border-neutral-100 bg-white pt-8 pb-6">
        <div className="container-xl">
          <nav className="text-sm text-neutral-400">
            <span>خانه</span> <span className="mx-1">/</span>{' '}
            <span className="text-neutral-700">ملک‌ها</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
            {showOnlyFavorites ? 'علاقه‌مندی‌های شما' : 'همه‌ی ملک‌ها'}
          </h1>
          <p className="mt-2 text-neutral-500">
            {toPersianDigits(displayedResults.length)} ملک یافت شد
          </p>
        </div>
      </div>

      <div className="container-xl py-8">
        {/* Search panel */}
        <div className="mb-6">
          <PropertySearch
            filters={filters}
            onFilterChange={updateFilter}
            onSearch={handleSearch}
            onReset={handleReset}
            variant="panel"
          />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="min-w-[160px]"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
              <option value="area-desc">بزرگ‌ترین</option>
              <option value="featured">ویژه‌ها</option>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <X size={16} />
                پاک کردن فیلترها
              </Button>
            )}
          </div>

          {/* View toggle */}
          <div className="flex gap-1 rounded-lg bg-neutral-100 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
              aria-label="نمایش شبکه‌ای"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
              aria-label="نمایش لیستی"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Results */}
        {displayedResults.length === 0 ? (
          <EmptyState
            title={showOnlyFavorites ? 'علاقه‌مندی خالی است' : 'ملکی یافت نشد'}
            description={
              showOnlyFavorites
                ? 'برای ذخیره‌ی ملک‌ها، روی آیکن قلب در کارت ملک کلیک کنید.'
                : 'فیلترها را تغییر دهید یا همه‌ی ملک‌ها را ببینید.'
            }
            action={
              <Button onClick={handleReset} variant="outline">
                <SlidersHorizontal size={16} />
                پاک کردن فیلترها
              </Button>
            }
          />
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'flex flex-col gap-4'
            }
          >
            {displayedResults.map((p, i) => (
              <PropertyCard
                key={p.id}
                property={p}
                viewMode={viewMode}
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

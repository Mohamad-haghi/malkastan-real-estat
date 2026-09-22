import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, RotateCcw } from 'lucide-react';
import { Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { SearchFilters, TransactionType, PropertyType } from '@/types';
import {
  getUniqueCities,
  getUniqueNeighborhoods,
  getUniquePropertyTypes,
} from '@/utils/propertyHelpers';
import { propertyTypeLabels, transactionTypeLabels } from '@/config/siteConfig';
import { toPersianDigits } from '@/utils/formatPrice';

interface PropertySearchProps {
  filters: SearchFilters;
  onFilterChange: <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K],
  ) => void;
  onSearch: () => void;
  onReset: () => void;
  variant?: 'hero' | 'panel';
}

export function PropertySearch({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  variant = 'panel',
}: PropertySearchProps) {
  const navigate = useNavigate();
  const cities = getUniqueCities();
  const neighborhoods = getUniqueNeighborhoods();
  const propertyTypes = getUniquePropertyTypes();

  const handleSearch = () => {
    onSearch();
    const params = new URLSearchParams();
    if (filters.transactionType && filters.transactionType !== 'all') {
      params.set('transactionType', filters.transactionType);
    }
    if (filters.neighborhood) params.set('neighborhood', filters.neighborhood);
    if (filters.propertyType && filters.propertyType !== 'all') {
      params.set('propertyType', filters.propertyType);
    }
    if (filters.bedrooms) params.set('bedrooms', String(filters.bedrooms));
    navigate(`/properties?${params.toString()}`);
  };

  const isHero = variant === 'hero';

  return (
    <div
      className={`rounded-2xl ${
        isHero
          ? 'bg-white/95 backdrop-blur-md shadow-2xl shadow-neutral-900/10 p-4 sm:p-6'
          : 'bg-white border border-neutral-200 p-4 sm:p-5'
      }`}
    >
      {/* Transaction type tabs */}
      <div className="mb-4 flex gap-1 rounded-xl bg-neutral-100 p-1">
        {(['all', 'sale', 'rent'] as const).map((type) => (
          <button
            key={type}
            onClick={() => onFilterChange('transactionType', type as TransactionType | 'all')}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
              filters.transactionType === type
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {type === 'all' ? 'همه' : transactionTypeLabels[type]}
          </button>
        ))}
      </div>

      {/* Grid of selects */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          label="شهر"
          value={filters.city || 'all'}
          onChange={(e) => onFilterChange('city', e.target.value)}
        >
          <option value="all">همه شهرها</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <Select
          label="منطقه / محله"
          value={filters.neighborhood || 'all'}
          onChange={(e) => onFilterChange('neighborhood', e.target.value)}
        >
          <option value="all">همه محله‌ها</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>

        <Select
          label="نوع ملک"
          value={filters.propertyType || 'all'}
          onChange={(e) =>
            onFilterChange('propertyType', e.target.value as PropertyType | 'all')
          }
        >
          <option value="all">همه انواع</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {propertyTypeLabels[t]}
            </option>
          ))}
        </Select>

        <Select
          label="حداکثر قیمت (میلیون تومان)"
          value={filters.maxPrice ? String(filters.maxPrice / 1000000) : '0'}
          onChange={(e) =>
            onFilterChange('maxPrice', Number(e.target.value) * 1000000)
          }
        >
          <option value="0">بدون محدودیت</option>
          <option value="500">۵۰۰ میلیون</option>
          <option value="1000">۱ میلیارد</option>
          <option value="2000">۲ میلیارد</option>
          <option value="5000">۵ میلیارد</option>
          <option value="10000">۱۰ میلیارد</option>
          <option value="50000">۵۰ میلیارد</option>
          <option value="100000">۱۰۰ میلیارد</option>
        </Select>

        <Select
          label="تعداد اتاق خواب"
          value={String(filters.bedrooms || 0)}
          onChange={(e) => onFilterChange('bedrooms', Number(e.target.value))}
        >
          <option value="0">همه</option>
          <option value="1">۱ به بالا</option>
          <option value="2">۲ به بالا</option>
          <option value="3">۳ به بالا</option>
          <option value="4">۴ به بالا</option>
          <option value="5">۵ به بالا</option>
        </Select>

        <div className="flex items-end gap-2">
          <Button
            onClick={handleSearch}
            className="flex-1"
            size="md"
          >
            <SearchIcon size={18} />
            جستجو
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="shrink-0"
            aria-label="پاک کردن فیلترها"
          >
            <RotateCcw size={18} />
          </Button>
        </div>
      </div>

      {isHero && (
        <p className="mt-3 text-center text-xs text-neutral-400">
          بیش از {toPersianDigits(480)} ملک فعال در سراسر تهران
        </p>
      )}
    </div>
  );
}

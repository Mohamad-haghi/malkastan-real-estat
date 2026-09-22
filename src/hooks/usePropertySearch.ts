import { useMemo, useState } from 'react';
import type { SearchFilters, SortOption } from '@/types';
import { filterProperties } from '@/utils/propertyHelpers';
import { properties as allProperties } from '@/data/properties';

export function usePropertySearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: 'all',
    city: '',
    neighborhood: '',
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 0,
    bedrooms: 0,
  });
  const [sort, setSort] = useState<SortOption>('newest');

  const results = useMemo(
    () => filterProperties(filters, sort),
    [filters, sort],
  );

  const total = results.length;

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      transactionType: 'all',
      city: '',
      neighborhood: '',
      propertyType: 'all',
      minPrice: 0,
      maxPrice: 0,
      bedrooms: 0,
    });
    setSort('newest');
  };

  const hasActiveFilters = useMemo(() => {
    return (
      (filters.transactionType && filters.transactionType !== 'all') ||
      (filters.city && filters.city !== '' && filters.city !== 'all') ||
      (filters.neighborhood &&
        filters.neighborhood !== '' &&
        filters.neighborhood !== 'all') ||
      (filters.propertyType && filters.propertyType !== 'all') ||
      (filters.minPrice && filters.minPrice > 0) ||
      (filters.maxPrice && filters.maxPrice > 0) ||
      (filters.bedrooms && filters.bedrooms > 0)
    );
  }, [filters]);

  return {
    filters,
    sort,
    results,
    total,
    totalProperties: allProperties.length,
    updateFilter,
    setSort,
    resetFilters,
    hasActiveFilters,
  };
}

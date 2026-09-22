import type { Property, SearchFilters, SortOption } from '@/types';
import { properties as allProperties } from '@/data/properties';

export function filterProperties(
  filters: SearchFilters,
  sort: SortOption = 'newest',
): Property[] {
  let result = allProperties.filter((p) => {
    if (filters.transactionType && filters.transactionType !== 'all') {
      if (p.transactionType !== filters.transactionType) return false;
    }
    if (filters.city && filters.city !== 'all' && filters.city !== '') {
      if (p.city !== filters.city) return false;
    }
    if (
      filters.neighborhood &&
      filters.neighborhood !== 'all' &&
      filters.neighborhood !== ''
    ) {
      if (p.neighborhood !== filters.neighborhood) return false;
    }
    if (
      filters.propertyType &&
      filters.propertyType !== 'all'
    ) {
      if (p.type !== filters.propertyType) return false;
    }
    if (filters.minPrice && filters.minPrice > 0) {
      const price = p.transactionType === 'rent' ? p.deposit || 0 : p.price;
      if (price < filters.minPrice) return false;
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
      const price = p.transactionType === 'rent' ? p.deposit || 0 : p.price;
      if (price > filters.maxPrice) return false;
    }
    if (filters.bedrooms && filters.bedrooms > 0) {
      if (p.bedrooms < filters.bedrooms) return false;
    }
    return true;
  });

  result = sortProperties(result, sort);
  return result;
}

export function sortProperties(
  props: Property[],
  sort: SortOption,
): Property[] {
  const sorted = [...props];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const pa = a.transactionType === 'rent' ? a.deposit || 0 : a.price;
        const pb = b.transactionType === 'rent' ? b.deposit || 0 : b.price;
        return pa - pb;
      });
    case 'price-desc':
      return sorted.sort((a, b) => {
        const pa = a.transactionType === 'rent' ? a.deposit || 0 : a.price;
        const pb = b.transactionType === 'rent' ? b.deposit || 0 : b.price;
        return pb - pa;
      });
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area);
    case 'featured':
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      );
    case 'newest':
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}

export function getUniqueNeighborhoods(): string[] {
  return [...new Set(allProperties.map((p) => p.neighborhood))];
}

export function getUniqueCities(): string[] {
  return [...new Set(allProperties.map((p) => p.city))];
}

export function getUniquePropertyTypes(): string[] {
  return [...new Set(allProperties.map((p) => p.type))];
}

export function countByNeighborhood(neighborhood: string): number {
  return allProperties.filter((p) => p.neighborhood === neighborhood).length;
}

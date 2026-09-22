import { Link } from 'react-router-dom';
import {
  Heart,
  Maximize,
  BedDouble,
  Bath,
  Car,
  Layers,
  GitCompare,
  MapPin,
  Check,
} from 'lucide-react';
import type { Property } from '@/types';
import {
  getPropertyPriceText,
  getPropertyLocation,
  getPropertyTypeLabel,
  getTransactionTypeLabel,
  formatArea,
  toPersianDigits,
} from '@/utils/formatPrice';
import { useFavorites } from '@/hooks/useFavorites';
import { useCompare } from '@/hooks/useCompare';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
  priority?: boolean;
}

export function PropertyCard({ property, viewMode = 'grid', priority }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isComparing, toggleCompare, canAddMore } = useCompare();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fav = isFavorite(property.id);
  const comparing = isComparing(property.id);

  const fallbackImg = 'https://images.pexels.com/photos/31656167/pexels-photo-31656167.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(property.id);
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 sm:flex-row"
      >
        {/* Image */}
        <div className="relative h-56 shrink-0 overflow-hidden sm:h-auto sm:w-72 lg:w-80">
          {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-200" />}
          <img
            src={imgError ? fallbackImg : property.images[0]}
            alt={property.title}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true); }}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <span
              className={`badge ${
                property.transactionType === 'sale' ? 'badge-sale' : 'badge-rent'
              }`}
            >
              {getTransactionTypeLabel(property.transactionType)}
            </span>
            {property.featured && (
              <span className="badge bg-neutral-900 text-white">ویژه</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <span className="text-xs text-neutral-400">
                {getPropertyTypeLabel(property.type)}
              </span>
              <h3 className="mt-1 line-clamp-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
                {property.title}
              </h3>
              <p className="mt-1.5 flex items-center gap-1 text-sm text-neutral-500">
                <MapPin size={14} />
                {getPropertyLocation(property)}
              </p>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={handleFav}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
                  fav
                    ? 'bg-accent-50 text-accent-500'
                    : 'bg-neutral-100 text-neutral-400 hover:text-accent-500'
                }`}
                aria-label={fav ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
              >
                <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleCompare}
                disabled={!comparing && !canAddMore}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all disabled:opacity-30 ${
                  comparing
                    ? 'bg-primary-50 text-primary-700'
                    : 'bg-neutral-100 text-neutral-400 hover:text-primary-700'
                }`}
                aria-label="مقایسه"
              >
                {comparing ? <Check size={16} /> : <GitCompare size={16} />}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Maximize size={15} className="text-neutral-400" />
              {formatArea(property.area)}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble size={15} className="text-neutral-400" />
              {toPersianDigits(property.bedrooms)} خواب
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={15} className="text-neutral-400" />
              {toPersianDigits(property.bathrooms)} حمام
            </span>
            {property.parking && (
              <span className="flex items-center gap-1.5">
                <Car size={15} className="text-neutral-400" />
                پارکینگ
              </span>
            )}
            {property.totalFloors > 0 && (
              <span className="flex items-center gap-1.5">
                <Layers size={15} className="text-neutral-400" />
                طبقه {toPersianDigits(property.floor)} از {toPersianDigits(property.totalFloors)}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <p className="text-xs text-neutral-400">قیمت</p>
              <p className="text-lg font-bold text-primary-700">
                {getPropertyPriceText(property)}
              </p>
            </div>
            <span className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
              مشاهده جزئیات
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-200" />}
        <img
          src={imgError ? fallbackImg : property.images[0]}
          alt={property.title}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap gap-2">
          <span
            className={`badge ${
              property.transactionType === 'sale' ? 'badge-sale' : 'badge-rent'
            }`}
          >
            {getTransactionTypeLabel(property.transactionType)}
          </span>
          {property.featured && (
            <span className="badge bg-neutral-900/90 text-white backdrop-blur-sm">
              ویژه
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <button
            onClick={handleFav}
            className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all ${
              fav
                ? 'bg-accent-500 text-white'
                : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-accent-500'
            }`}
            aria-label={fav ? 'حذف از علاقه‌مندی' : 'افزودن به علاقه‌مندی'}
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleCompare}
            disabled={!comparing && !canAddMore}
            className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-all disabled:opacity-30 ${
              comparing
                ? 'bg-primary-700 text-white'
                : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-primary-700'
            }`}
            aria-label="مقایسه"
          >
            {comparing ? <Check size={15} /> : <GitCompare size={15} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs text-neutral-400">
          {getPropertyTypeLabel(property.type)}
        </span>
        <h3 className="mt-1 line-clamp-2 text-base font-bold text-neutral-900 transition-colors group-hover:text-primary-700">
          {property.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1 text-sm text-neutral-500">
          <MapPin size={14} />
          {getPropertyLocation(property)}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-600">
          <span className="flex items-center gap-1">
            <Maximize size={13} className="text-neutral-400" />
            {formatArea(property.area)}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={13} className="text-neutral-400" />
            {toPersianDigits(property.bedrooms)}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-neutral-400" />
            {toPersianDigits(property.bathrooms)}
          </span>
          {property.parking && (
            <span className="flex items-center gap-1">
              <Car size={13} className="text-neutral-400" />
              {toPersianDigits(1)}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-2xs text-neutral-400">قیمت</p>
            <p className="text-sm font-bold text-primary-700">
              {getPropertyPriceText(property)}
            </p>
          </div>
          <span className="rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-white">
            جزئیات
          </span>
        </div>
      </div>
    </Link>
  );
}

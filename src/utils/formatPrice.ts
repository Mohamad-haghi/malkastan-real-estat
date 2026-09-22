import {
  propertyTypeLabels,
  transactionTypeLabels,
} from '@/config/siteConfig';
import type { Property } from '@/types';

export function formatPrice(price: number): string {
  if (price === 0) return 'توافقی';
  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (price >= billion) {
    const b = price / billion;
    if (b % 1 === 0) {
      return `${toPersianDigits(b.toFixed(0))} میلیارد تومان`;
    }
    return `${toPersianDigits(b.toFixed(2))} میلیارد تومان`;
  }
  if (price >= million) {
    const m = price / million;
    if (m % 1 === 0) {
      return `${toPersianDigits(m.toFixed(0))} میلیون تومان`;
    }
    return `${toPersianDigits(m.toFixed(1))} میلیون تومان`;
  }
  if (price >= thousand) {
    const t = price / thousand;
    return `${toPersianDigits(t.toFixed(0))} هزار تومان`;
  }
  return `${toPersianDigits(price.toString())} تومان`;
}

export function formatDepositRent(deposit?: number, rent?: number): string {
  const parts: string[] = [];
  if (deposit) parts.push(`ودیعه: ${formatPrice(deposit)}`);
  if (rent) parts.push(`اجاره: ${formatPrice(rent)}/ماه`);
  return parts.join(' • ');
}

export function formatNumber(num: number): string {
  return toPersianDigits(num.toLocaleString('en-US'));
}

export function toPersianDigits(input: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

export function formatArea(area: number): string {
  return `${toPersianDigits(area)} متر`;
}

export function getPropertyTypeLabel(type: string): string {
  return propertyTypeLabels[type] || type;
}

export function getTransactionTypeLabel(type: string): string {
  return transactionTypeLabels[type] || type;
}

export function getPropertyPriceText(property: Property): string {
  if (property.transactionType === 'rent') {
    return formatDepositRent(property.deposit, property.rent);
  }
  return formatPrice(property.price);
}

export function getPropertyLocation(property: Property): string {
  return `${property.neighborhood}، ${property.city}`;
}

export function generateRequestId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `MK-${year}-${toPersianDigits(random)}`;
}

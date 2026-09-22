export type TransactionType = 'sale' | 'rent';

export type PropertyType =
  | 'apartment'
  | 'villa'
  | 'penthouse'
  | 'office'
  | 'shop'
  | 'land';

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  experience: number;
  deals: number;
  languages: string[];
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  transactionType: TransactionType;
  city: string;
  district: string;
  neighborhood: string;
  address: string;
  price: number;
  deposit?: number;
  rent?: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  parking: boolean;
  storage: boolean;
  elevator: boolean;
  features: string[];
  images: string[];
  video?: string;
  description: string;
  whyThisProperty: string[];
  agentId: string;
  coordinates: { lat: number; lng: number };
  featured: boolean;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  propertyCount: number;
  lifestyle: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface SearchResult {
  properties: Property[];
  total: number;
}

export type RequestType =
  | 'purchase'
  | 'rental'
  | 'viewing'
  | 'consultation';

export interface PropertyRequest {
  id: string;
  type: RequestType;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  phone: string;
  budget?: string;
  contactMethod?: string;
  preferredTime?: string;
  needType?: string;
  proposedDate?: string;
  proposedTime?: string;
  description: string;
  createdAt: string;
}

export type ViewMode = 'grid' | 'list';

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'area-desc'
  | 'featured';

export interface SearchFilters {
  transactionType?: TransactionType | 'all';
  city?: string;
  district?: string;
  neighborhood?: string;
  propertyType?: PropertyType | 'all';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
}

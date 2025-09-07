// types/trekking.ts
import { ObjectId } from 'mongodb';

export interface TrekkingRegion {
  _id?: ObjectId;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OverviewItem {
  heading: string;
  description: string;
}

export interface ItineraryItem {
  heading: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  minPersons: number;
  maxPersons: number;
  price: number;
}

export interface Trek {
  _id?: ObjectId;
  name: string;
  slug: string;
  regionSlug: string;
  siteTitle: string;
  backgroundImage: string;
  overview: {
    title: string;
    shortDescription: string;
    info: OverviewItem[];
  };
  itinerary: {
    title: string;
    shortDescription: string;
    items: ItineraryItem[];
  };
  includeExclude: {
    title: string;
    shortInfo: string;
    included: string[];
    excluded: string[];
  };
  gallery: {
    title: string;
    shortDescription: string;
    images: GalleryImage[];
  };
  faq: {
    title: string;
    shortDescription: string;
    items: FAQItem[];
  };
  pricing: PricingTier[];
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface RegionWithTrekCount extends TrekkingRegion {
  trekCount: number;
}
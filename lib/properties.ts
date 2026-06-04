import { supabase } from './supabase';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  formatted_price: string | null;
  beds: number;
  baths: number;
  area: number;
  image_url: string | null;
  tag: string | null;
  type: 'sale' | 'rent';
  featured: boolean;
  created_at: string;
}

export interface PaginatedProperties {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Fetches featured properties (no pagination).
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return (data as Property[]) ?? [];
}

/**
 * Fetches non-featured properties with server-side pagination.
 */
export async function getListingProperties(
  page: number,
  pageSize: number
): Promise<PaginatedProperties> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('featured', false)
    .order('created_at', { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  const total = count ?? 0;
  return {
    properties: (data as Property[]) ?? [],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

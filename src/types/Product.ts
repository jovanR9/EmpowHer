export interface Product {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  category: string | null;
  businesses: { name: string } | null; // Supabase join result
}
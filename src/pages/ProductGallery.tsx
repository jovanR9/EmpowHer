import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  category: string | null;
  business_id: string | null;
}

const ProductGallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        setProducts(data as Product[]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg mt-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-lg mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>Product Gallery</h1>
      {products.length === 0 ? (
        <p className="text-center text-lg" style={{ color: 'var(--text-secondary)' }}>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.svg'; // Fallback placeholder
                  }}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{product.name}</h2>
                {product.category && (
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Category: {product.category}</p>
                )}
                {product.price !== null && (
                  <p className="text-lg font-bold mb-2" style={{ color: 'var(--primary)' }}>${product.price.toFixed(2)}</p>
                )}
                {product.description && (
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;

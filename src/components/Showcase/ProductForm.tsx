import React, { useState, useEffect } from 'react';
import { X, Upload, Tag, DollarSign, Info } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Toast } from '../Common/Toast';
import { Product } from '../../types/Product';

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
  onSuccess: () => void;
}

export function ProductForm({ product, onCancel, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    image_url: product?.image_url || '',
    price: product?.price?.toString() || '',
    category: product?.category || '',
    business_id: product?.businesses?.name || '', // Assuming we'll select business by name for now
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [businesses, setBusinesses] = useState<{ id: string; name: string }[]>([]);
  const [loadingBusinesses, setLoadingBusinesses] = useState(true);

  // Fetch businesses for the dropdown
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('id, name')
          .order('name');

        if (error) {
          console.error('Error fetching businesses:', error);
          setToast({ message: 'Failed to load businesses for selection.', type: 'error' });
        } else {
          setBusinesses(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching businesses:', err);
        setToast({ message: 'An unexpected error occurred while loading businesses.', type: 'error' });
      } finally {
        setLoadingBusinesses(false);
      }
    };
    fetchBusinesses();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Product name must be at least 2 characters';
    }
    
    if (formData.description && formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters if provided';
    }
    
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid image URL';
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    if (!formData.business_id) {
      newErrors.business_id = 'Please select a business';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setToast(null); // Clear previous toasts
    
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim() || null,
      image_url: formData.image_url.trim() || null,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category.trim() || null,
      business_id: formData.business_id, // This will be the business ID from the dropdown
    };

    try {
      let response;
      if (product) {
        // Update existing product
        response = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
      } else {
        // Insert new product
        response = await supabase
          .from('products')
          .insert([productData]);
      }
      
      if (response.error) {
        console.error('Error saving product:', response.error);
        setToast({ message: `Error saving product: ${response.error.message}`, type: 'error' });
      } else {
        setToast({ message: 'Product saved successfully!', type: 'success' });
        setTimeout(() => onSuccess(), 1500); // Delay to show success message
      }
    } catch (err) {
      console.error('Unexpected error during product save:', err);
      setToast({ message: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Product category suggestions (can be expanded)
  const categoryOptions = [
    'Apparel', 'Electronics', 'Home Goods', 'Beauty', 'Food & Drink',
    'Services', 'Art', 'Jewelry', 'Books', 'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {product ? 'Edit Product' : 'Add Your Product'}
        </h1>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-opacity-10 rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <X className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Info className="h-4 w-4" />
            <span>Product Name *</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="input-field w-full"
            placeholder="Enter product name..."
            maxLength={100}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.name.length}/100 characters
          </p>
        </div>

        {/* Business Selection */}
        <div>
          <label htmlFor="business_id" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Tag className="h-4 w-4" />
            <span>Associated Business *</span>
          </label>
          <select
            id="business_id"
            value={formData.business_id}
            onChange={(e) => handleInputChange('business_id', e.target.value)}
            className="input-field w-full"
            disabled={loadingBusinesses}
          >
            <option value="">{loadingBusinesses ? 'Loading businesses...' : 'Select a business...'}</option>
            {businesses.map((business) => (
              <option key={business.id} value={business.id}>
                {business.name}
              </option>
            ))}
          </select>
          {errors.business_id && (
            <p className="text-red-500 text-sm mt-1">{errors.business_id}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Select the business this product belongs to
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Tag className="h-4 w-4" />
            <span>Category</span>
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="input-field w-full"
          >
            <option value="">Select a category...</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Choose the category that best describes your product
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Product Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="input-field w-full h-32 resize-y"
            placeholder="Describe your product, its features, benefits, etc...."
            maxLength={1000}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.description.length}/1000 characters (optional, but recommended)
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image_url" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Upload className="h-4 w-4" />
            <span>Image URL</span>
          </label>
          <input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => handleInputChange('image_url', e.target.value)}
            className="input-field w-full"
            placeholder="https://example.com/your-product-image.jpg"
          />
          {errors.image_url && (
            <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Add a URL to your product image
          </p>
          
          {formData.image_url && isValidUrl(formData.image_url) && (
            <div className="mt-2">
              <img
                src={formData.image_url}
                alt="Product Image Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                loading="lazy"
                style={{ borderColor: 'var(--border-color)' }}
              />
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <DollarSign className="h-4 w-4" />
            <span>Price</span>
          </label>
          <input
            id="price"
            type="text"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            className="input-field w-full"
            placeholder="e.g., 29.99"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Optional - Price of the product
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t"
             style={{ borderColor: 'var(--border-color)' }}>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border rounded-lg font-medium transition-colors"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary px-8 py-3 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
}

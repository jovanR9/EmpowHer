import React, { useState } from 'react';
import { X, Upload, Mail, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Toast } from '../components/Common/Toast';
import { useNavigate } from 'react-router-dom';

// Define the Business interface here as it's used in this component
interface Business {
  id: string;
  name: string;
  owner: string | null;
  description: string | null;
  category: string | null;
  logo: string | null;
  contact: string | null;
}

export function BusinessSubmit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    description: '',
    category: '',
    logo: '',
    contact: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Business name must be at least 2 characters';
    }
    
    if (formData.description && formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters if provided';
    }
    
    if (formData.logo && !isValidUrl(formData.logo)) {
      newErrors.logo = 'Please enter a valid logo URL';
    }
    
    if (formData.contact && !isValidContact(formData.contact)) {
      newErrors.contact = 'Please enter a valid email, phone number, or social media link';
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

  const isValidContact = (contact: string) => {
    // Check for email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check for phone pattern (flexible)
    const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
    // Check for URL pattern (social media links)
    const urlPattern = /^https?:\/\/.+/;
    
    return emailPattern.test(contact) || phonePattern.test(contact.replace(/[\s\-\(\)]/g, '')) || urlPattern.test(contact);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setToast(null); // Clear previous toasts
    
    const businessData = {
      name: formData.name.trim(),
      owner: formData.owner.trim() || null,
      description: formData.description.trim() || null,
      category: formData.category.trim() || null,
      logo: formData.logo.trim() || null,
      contact: formData.contact.trim() || null,
    };

    try {
      const response = await supabase
        .from('businesses')
        .insert([businessData]);
      
      if (response.error) {
        console.error('Error saving business:', response.error);
        setToast({ message: `Error saving business: ${response.error.message}`, type: 'error' });
      } else {
        setToast({ message: 'Business saved successfully!', type: 'success' });
        setTimeout(() => navigate('/showcase'), 1500); // Redirect to showcase after 1.5 seconds
      }
    } catch (err) {
      console.error('Unexpected error during business save:', err);
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

  const handleCancel = () => {
    navigate('/showcase'); // Redirect to showcase on cancel
  };

  // Business category suggestions
  const categoryOptions = [
    'Technology', 'Retail', 'Food & Beverage', 'Healthcare', 'Education',
    'Consulting', 'Finance', 'Real Estate', 'Creative Services', 'Manufacturing',
    'Beauty & Wellness', 'Professional Services', 'E-commerce', 'Non-profit', 'Other'
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
          Add Your Business
        </h1>
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-opacity-10 rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <X className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Briefcase className="h-4 w-4" />
            <span>Business Name *</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="input-field w-full"
            placeholder="Enter your business name..."
            maxLength={100}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.name.length}/100 characters
          </p>
        </div>

        {/* Owner */}
        <div>
          <label htmlFor="owner" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Briefcase className="h-4 w-4" />
            <span>Owner Name</span>
          </label>
          <input
            id="owner"
            type="text"
            value={formData.owner}
            onChange={(e) => handleInputChange('owner', e.target.value)}
            className="input-field w-full"
            placeholder="Enter the business owner's name..."
            maxLength={100}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Optional - Name of the business owner or founder
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Briefcase className="h-4 w-4" />
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
            Choose the category that best describes your business
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Business Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="input-field w-full h-32 resize-y"
            placeholder="Describe your business, what you do, your mission, and what makes you unique..."
            maxLength={1000}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.description.length}/1000 characters (optional, but recommended)
          </p>
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logo" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Upload className="h-4 w-4" />
            <span>Logo URL</span>
          </label>
          <input
            id="logo"
            type="url"
            value={formData.logo}
            onChange={(e) => handleInputChange('logo', e.target.value)}
            className="input-field w-full"
            placeholder="https://example.com/your-logo.jpg"
          />
          {errors.logo && (
            <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
          )}
          {formData.logo && isValidUrl(formData.logo) && (
            <div className="mt-2">
              <img
                src={formData.logo}
                alt="Logo Preview"
                className="w-32 h-32 object-cover rounded-lg border"
                loading="lazy"
                style={{ borderColor: 'var(--border-color)' }}
              />
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="contact" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Mail className="h-4 w-4" />
            <span>Contact Information</span>
          </label>
          <input
            id="contact"
            type="text"
            value={formData.contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            className="input-field w-full"
            placeholder="email@example.com, +1234567890, or https://linkedin.com/company/yourcompany"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Email, phone number, or social media link for contact
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t"
             style={{ borderColor: 'var(--border-color)' }}>
          <button
            type="button"
            onClick={handleCancel}
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
            {isSubmitting ? 'Saving...' : 'Add Business'}
          </button>
        </div>
      </form>
    </div>
  );
}
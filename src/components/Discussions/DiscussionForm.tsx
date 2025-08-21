// src/components/Discussions/DiscussionForm.tsx
import React, { useState } from 'react';
import { X, MessageSquareText, Tag, AlignLeft } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Toast } from '../Common/Toast';

interface DiscussionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export function DiscussionForm({ onCancel, onSuccess }: DiscussionFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Discussion title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Discussion description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const authorId = user?.id || null; // Get current user ID

      let authorName = 'Anonymous'; // Default to anonymous

      if (authorId) {
        // If user is logged in, try to fetch their name
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', authorId)
          .single();

        if (profileError || !profileData) {
          console.warn('Could not retrieve profile name for author_id:', authorId, profileError);
          // Fallback to Anonymous if profile fetch fails
        } else {
          authorName = profileData.name || 'Anonymous';
        }
      }

      const { error } = await supabase.from('forum_topics').insert([
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          author_id: authorId, // Will be null if not logged in
          author_name: authorName, // Will be 'Anonymous' if not logged in or name not found
        },
      ]);


      if (error) {
        console.error('Error creating discussion:', error);
        setToast({ message: `Error creating discussion: ${error.message}`, type: 'error' });
      } else {
        setToast({ message: 'Discussion created successfully!', type: 'success' });
        setFormData({ title: '', description: '', category: '' }); // Clear form
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      console.error('Unexpected error creating discussion:', err);
      setToast({ message: 'An unexpected error occurred.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const categoryOptions = [
    'General', 'Mentorship', 'Career Advice', 'Business & Entrepreneurship',
    'Tech & Development', 'Wellness', 'Life Skills', 'Community Support', 'Events'
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
          Start a New Discussion
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
        {/* Title */}
        <div>
          <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium mb-2"
                 style={{ color: 'var(--text-primary)' }}>
            <MessageSquareText className="h-4 w-4" />
            <span>Discussion Title *</span>
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input-field w-full"
            placeholder="Enter a concise title for your discussion..."
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="flex items-center space-x-2 text-sm font-medium mb-2"
                 style={{ color: 'var(--text-primary)' }}>
            <Tag className="h-4 w-4" />
            <span>Category *</span>
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
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Categorize your discussion to help others find it
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium mb-2"
                 style={{ color: 'var(--text-primary)' }}>
            <AlignLeft className="h-4 w-4" />
            <span>Discussion Details *</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="input-field w-full h-32 resize-y"
            placeholder="Share the details of your discussion, ask questions, or provide context..."
            maxLength={1000}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.description.length}/1000 characters
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
            {isSubmitting ? 'Posting...' : 'Start Discussion'}
          </button>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Upload, Tag } from 'lucide-react';
import { Story } from '../../data/mockData';

interface StoryFormProps {
  story?: Story;
  onSubmit: (story: Omit<Story, 'id' | 'createdAt' | 'likes'>) => void;
  onCancel: () => void;
}

export function StoryForm({ story, onSubmit, onCancel }: StoryFormProps) {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    excerpt: story?.excerpt || '',
    body: story?.body || '',
    author: story?.author || '',
    image: story?.image || '',
    tags: story?.tags.join(', ') || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length < 50) {
      newErrors.excerpt = 'Excerpt must be at least 50 characters';
    }
    
    if (!formData.body.trim()) {
      newErrors.body = 'Story content is required';
    } else if (formData.body.length < 200) {
      newErrors.body = 'Story must be at least 200 characters';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
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
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storyData = {
      title: formData.title.trim(),
      excerpt: formData.excerpt.trim(),
      body: formData.body.trim(),
      author: formData.author.trim(),
      image: formData.image.trim() || 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    };
    
    onSubmit(storyData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {story ? 'Edit Your Story' : 'Share Your Story'}
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
          <label htmlFor="title" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Story Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input-field w-full"
            placeholder="Enter a compelling title for your story..."
            maxLength={100}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.title.length}/100 characters
          </p>
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Your Name *
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className="input-field w-full"
            placeholder="Enter your name or how you'd like to be credited..."
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Story Excerpt *
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            className="input-field w-full h-24 resize-none"
            placeholder="Write a brief, engaging summary of your story..."
            maxLength={300}
          />
          {errors.excerpt && (
            <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.excerpt.length}/300 characters
          </p>
        </div>

        {/* Body */}
        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            Your Story *
          </label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
            className="input-field w-full h-64 resize-y"
            placeholder="Share your empowering story in detail. What challenges did you face? How did you overcome them? What advice would you give to others?"
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {formData.body.length} characters (minimum 200)
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Upload className="h-4 w-4" />
            <span>Image URL (optional)</span>
          </label>
          <input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            className="input-field w-full"
            placeholder="https://example.com/your-image.jpg"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Add an image URL to make your story more visually appealing
          </p>
          
          {formData.image && isValidUrl(formData.image) && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-24 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="flex items-center space-x-2 text-sm font-medium mb-2" 
                 style={{ color: 'var(--text-primary)' }}>
            <Tag className="h-4 w-4" />
            <span>Tags (optional)</span>
          </label>
          <input
            id="tags"
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            className="input-field w-full"
            placeholder="entrepreneurship, career-change, motherhood (separate with commas)"
          />
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Add relevant tags separated by commas to help others find your story
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
            {isSubmitting ? 'Saving...' : (story ? 'Update Story' : 'Publish Story')}
          </button>
        </div>
      </form>
    </div>
  );
}
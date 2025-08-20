import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, User, Tag, Edit, Trash2, Share2 } from 'lucide-react';
import { useStorage } from '../contexts/StorageContext';
import { Toast } from '../components/Common/Toast';
import { supabase } from '../lib/supabaseClient';

interface Story {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  image?: string;
  tags: string[];
  likes: number;
  published: boolean;
}

export function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userStories, deleteUserStory, isUserStory } = useStorage();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      let foundStory: Story | null = null;

      // Check if it's a user-created story (from local storage)
      if (id && id.startsWith('user-')) {
        const userStory = userStories.find(s => s.id === id);
        foundStory = userStory || null;
      } else if (id) {
        // Otherwise, try fetching from Supabase
        try {
          const { data, error } = await supabase
            .from('stories')
            .select('*')
            .eq('id', id)
            .single();

          if (error) {
            console.error('Error fetching story from Supabase:', error);
            foundStory = null;
          } else {
            foundStory = data as Story;
          }
        } catch (error) {
          console.error('Error fetching story:', error);
          foundStory = null;
        }
      }
      setStory(foundStory);
      setLoading(false);
    };

    fetchStory();
  }, [id, userStories]); // Re-fetch if ID or userStories change

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-secondary)' }}>Loading story...</p>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Story Not Found
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            The story you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/stories"
            className="btn-primary inline-flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Stories</span>
          </Link>
        </div>
      </div>
    );
  }

  const canEdit = isUserStory(story.id);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      if (isUserStory(story.id)) {
        deleteUserStory(story.id);
        setToast({ message: 'Story deleted successfully from local storage', type: 'success' });
        setTimeout(() => navigate('/stories'), 1500);
      } else {
        // Attempt to delete from Supabase
        try {
          const { error } = await supabase
            .from('stories')
            .delete()
            .eq('id', story.id);

          if (error) {
            console.error('Error deleting story from Supabase:', error);
            setToast({ message: 'Failed to delete story from Supabase', type: 'error' });
          } else {
            setToast({ message: 'Story deleted successfully from Supabase', type: 'success' });
            setTimeout(() => navigate('/stories'), 1500);
          }
        } catch (error) {
          console.error('Error deleting story:', error);
          setToast({ message: 'Failed to delete story', type: 'error' });
        }
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: story.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing or error occurred
        console.log('Sharing cancelled or failed:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToast({ message: 'Story link copied to clipboard!', type: 'success' });
      } catch (error) {
        setToast({ message: 'Failed to copy link', type: 'error' });
      }
    }
  };

  // Get related stories (same tags, excluding current)
  // This will now consider both mock stories and potentially other Supabase stories if fetched
  const allStories = [...userStories]; // Only user stories for now, Supabase stories are fetched individually
  const relatedStories = allStories
    .filter(s => s.id !== story.id && s.tags && story.tags && s.tags.some(tag => story.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/stories"
            className="inline-flex items-center space-x-2 text-lg font-medium transition-colors hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Stories</span>
          </Link>
        </div>

        {/* Hero Image */}
        {story.image && (
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        )}

        {/* Story Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 slide-up break-words"
              style={{ color: 'var(--text-primary)' }}>
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm"
               style={{ color: 'var(--text-secondary)' }}>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium break-words">{story.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(story.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>{story.likes} likes</span>
            </div>
          </div>

          {/* Tags */}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm break-words"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-primary)',
                    opacity: 0.8
                  }}
                >
                  <Tag className="h-3 w-3 flex-shrink-0" />
                  <span className="break-words">{tag}</span>
                </span>
              ))}
            </div>
          )}

          {/* Story Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>

            {canEdit && (
              <div className="flex items-center space-x-2">
                <Link
                  to={`/stories/edit/${story.id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{ 
                    backgroundColor: 'var(--tertiary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Story Content */}
        <div className="prose prose-lg max-w-none mb-12 fade-in"
             style={{ color: 'var(--text-primary)' }}>
          <div className="text-xl mb-6 font-medium leading-relaxed break-words"
               style={{ color: 'var(--text-secondary)' }}>
            {story.excerpt}
          </div>
          
          <div className="text-lg leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
            {story.body}
          </div>
        </div>

        {/* Author Call-to-Action */}
        <div className="bg-gradient-to-r p-8 rounded-lg mb-12 text-center"
             style={{ 
               background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
               color: 'var(--text-primary)'
             }}>
          <h3 className="text-2xl font-bold mb-4 break-words">Inspired by this story?</h3>
          <p className="text-lg mb-6 opacity-90 break-words">
            Share your own journey and inspire other women in our community.
          </p>
          <Link
            to="/stories/submit"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Share Your Story
          </Link>
        </div>
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8"
                 style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
              Related Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStories.map((relatedStory) => (
                <Link
                  key={relatedStory.id}
                  to={`/stories/${relatedStory.id}`}
                  className="card overflow-hidden group"
                >
                  {relatedStory.image && (
                    <img
                      src={relatedStory.image}
                      alt={relatedStory.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 break-words" 
                        style={{ color: 'var(--text-primary)' }}>
                      {relatedStory.title}
                    </h3>
                    <p className="text-sm line-clamp-2 break-words" 
                       style={{ color: 'var(--text-secondary)' }}>
                      {relatedStory.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
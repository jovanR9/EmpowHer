import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, User, Tag } from 'lucide-react';

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

interface StoryCardProps {
  story: Story;
}

// Helper function to truncate text by word count
const truncateByWords = (text: string, maxWords: number): string => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Helper function to truncate text by character count
const truncateByChars = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).trim() + '...';
};

export function StoryCard({ story }: StoryCardProps) {
  // Truncate different fields to maintain consistent card size
  const truncatedTitle = truncateByWords(story.title, 8); // Max 8 words
  const truncatedAuthor = truncateByChars(story.author, 20); // Max 20 characters
  const truncatedExcerpt = truncateByWords(story.excerpt, 25); // Max 25 words
  const maxVisibleTags = 3; // Show maximum 3 tags

  return (
    <article className="card p-0 overflow-hidden h-full flex flex-col">
      {/* Fixed height image container */}
      <div className="bg-gray-200 dark:bg-gray-700 flex items-center justify-center h-48 flex-shrink-0">
        {story.image ? (
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            No Image Available
          </div>
        )}
      </div>
      
      {/* Content area with flex-grow to fill remaining space */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta information - fixed height */}
        <div className="flex items-center justify-between text-xs mb-3 h-4" 
             style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center space-x-1 min-w-0 flex-1">
            <User className="h-3 w-3 flex-shrink-0" />
            <span className="truncate" title={story.author}>{truncatedAuthor}</span>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">{new Date(story.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span className="text-xs">{story.likes}</span>
            </div>
          </div>
        </div>
        
        {/* Title - fixed height with line clamping */}
        <h3 className="text-lg font-semibold mb-3 h-14 flex items-start leading-snug" 
            style={{ color: 'var(--text-primary)' }}>
          <Link 
            to={`/stories/${story.id}`} 
            className="hover:text-opacity-80 transition-colors line-clamp-2 break-words"
            style={{ color: 'var(--text-primary)' }}
            title={story.title}
          >
            {truncatedTitle}
          </Link>
        </h3>
        
        {/* Excerpt - fixed height with line clamping */}
        <p className="text-sm mb-4 h-16 overflow-hidden leading-relaxed" 
           style={{ color: 'var(--text-secondary)' }}
           title={story.excerpt}>
          <span className="line-clamp-3 break-words">
            {truncatedExcerpt}
          </span>
        </p>
        
        {/* Tags - fixed height container */}
        {story.tags && story.tags.length > 0 && (
          <div className="mb-4 h-8 flex items-start">
            <div className="flex flex-wrap gap-1 overflow-hidden">
              {story.tags.slice(0, maxVisibleTags).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs whitespace-nowrap"
                  style={{ 
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-primary)',
                    opacity: 0.8
                  }}
                  title={tag}
                >
                  <Tag className="h-2.5 w-2.5 flex-shrink-0" />
                  <span className="max-w-16 truncate">
                    {truncateByChars(tag, 10)}
                  </span>
                </span>
              ))}
              {story.tags.length > maxVisibleTags && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
                  style={{ 
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--text-secondary)',
                    opacity: 0.6
                  }}
                  title={`${story.tags.length - maxVisibleTags} more tags`}
                >
                  +{story.tags.length - maxVisibleTags}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Read More button - always at bottom */}
        <div className="mt-auto pt-2">
          <Link
            to={`/stories/${story.id}`}
            className="btn-primary w-full text-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:transform hover:-translate-y-0.5 block"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
}
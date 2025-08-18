import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, User, Tag } from 'lucide-react';
import { Story } from '../../data/mockData';

interface StoryCardProps {
  story: Story;
  showActions?: boolean;
  onEdit?: (story: Story) => void;
  onDelete?: (id: string) => void;
}

export function StoryCard({ story, showActions = false, onEdit, onDelete }: StoryCardProps) {
  return (
    <article className="card p-0 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm mb-3" 
             style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{story.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(story.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{story.likes}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 line-clamp-2" 
            style={{ color: 'var(--text-primary)' }}>
          <Link 
            to={`/stories/${story.id}`} 
            className="hover:text-opacity-80 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            {story.title}
          </Link>
        </h3>
        
        <p className="text-sm mb-4 line-clamp-3" 
           style={{ color: 'var(--text-secondary)' }}>
          {story.excerpt}
        </p>
        
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-primary)',
                  opacity: 0.8
                }}
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            to={`/stories/${story.id}`}
            className="btn-primary px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1"
          >
            Read More
          </Link>
          
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit?.(story)}
                className="px-3 py-1 text-sm rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(story.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
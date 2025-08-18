import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Filter, SortAsc } from 'lucide-react';
import { Hero } from '../components/Common/Hero';
import { SearchBar } from '../components/Common/SearchBar';
import { StoryCard } from '../components/Stories/StoryCard';
import { mockStories } from '../data/mockData';
import { useStorage } from '../contexts/StorageContext';

export function Stories() {
  const { userStories } = useStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'oldest'>('newest');

  // Combine mock stories with user stories
  const allStories = useMemo(() => {
    return [...userStories, ...mockStories];
  }, [userStories]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allStories.forEach(story => {
      story.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allStories]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let filtered = allStories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || story.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });

    // Sort stories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allStories, searchTerm, selectedTag, sortBy]);

  return (
    <div>
      <Hero
        title="Empowering Stories"
        subtitle="Discover inspiring journeys of women who've overcome challenges and achieved their dreams."
      >
        <Link
          to="/stories/submit"
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Share Your Story</span>
        </Link>
      </Hero>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search stories by title, author, or content..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Tag Filter */}
                <div className="relative">
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="input-field pl-10 pr-4 py-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                          style={{ color: 'var(--text-secondary)' }} />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'oldest')}
                    className="input-field pl-10 pr-4 py-3 rounded-lg appearance-none cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                           style={{ color: 'var(--text-secondary)' }} />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedTag) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="px-3 py-1 text-sm rounded-full"
                        style={{ 
                          backgroundColor: 'var(--primary)',
                          color: 'var(--text-primary)'
                        }}>
                    Search: "{searchTerm}"
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="ml-2 hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="px-3 py-1 text-sm rounded-full"
                        style={{ 
                          backgroundColor: 'var(--secondary)',
                          color: 'var(--text-primary)'
                        }}>
                    Tag: {selectedTag}
                    <button 
                      onClick={() => setSelectedTag('')}
                      className="ml-2 hover:opacity-70"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Found {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
              {selectedTag && ` in "${selectedTag}"`}
            </p>
          </div>

          {/* Stories Grid */}
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                     style={{ backgroundColor: 'var(--primary)', opacity: 0.2 }}>
                  <Plus className="h-12 w-12" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  No Stories Found
                </h3>
                <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {searchTerm || selectedTag 
                    ? 'Try adjusting your search or filters.'
                    : 'Be the first to share your inspiring story!'
                  }
                </p>
                <Link
                  to="/stories/submit"
                  className="btn-primary inline-flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg"
                >
                  <Plus className="h-5 w-5" />
                  <span>Share Your Story</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
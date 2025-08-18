import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Briefcase, TrendingUp } from 'lucide-react';
import { Hero } from '../components/Common/Hero';
import { StoryCard } from '../components/Stories/StoryCard';
import { mockGuides, mockBusinesses, Story } from '../data/mockData';
import { supabase } from '../lib/supabaseClient';

export function Home() {
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching featured stories:', error);
      } else {
        setFeaturedStories(data as Story[]);
      }
    };

    fetchFeaturedStories();
  }, []);

  const featuredGuides = mockGuides.slice(0, 3);
  const featuredBusinesses = mockBusinesses.slice(0, 3);

  const features = [
    {
      icon: Users,
      title: 'Connect & Network',
      description: 'Join a supportive community of women entrepreneurs, mentors, and professionals.',
      link: '/community'
    },
    {
      icon: BookOpen,
      title: 'Learn & Grow',
      description: 'Access financial literacy guides and legal resources to empower your journey.',
      link: '/guides'
    },
    {
      icon: Briefcase,
      title: 'Showcase & Discover',
      description: 'Promote your business and discover amazing products from fellow entrepreneurs.',
      link: '/showcase'
    },
    {
      icon: TrendingUp,
      title: 'Share Your Story',
      description: 'Inspire others by sharing your entrepreneurial journey and experiences.',
      link: '/stories/submit'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Empowering Women Through Stories & Community"
        subtitle="Join thousands of women sharing their journeys, building connections, and creating success together."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/stories"
            className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold rounded-lg"
          >
            <span>Explore Stories</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/stories/submit"
            className="px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-200 hover:transform hover:-translate-y-1 hero-cta-secondary"
          >
            Share Your Story
          </Link>
        </div>
      </Hero>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              From inspiring stories to practical resources, we're here to support your journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card p-6 text-center group slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200"
                     style={{ backgroundColor: 'var(--primary)' }}>
                  <feature.icon className="h-8 w-8" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Featured Stories
            </h2>
            <Link
              to="/stories"
              className="inline-flex items-center space-x-2 text-lg font-medium transition-colors"
              style={{ color: 'var(--primary)' }}
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Financial & Legal Resources
            </h2>
            <Link
              to="/guides"
              className="inline-flex items-center space-x-2 text-lg font-medium transition-colors"
              style={{ color: 'var(--primary)' }}
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGuides.map((guide) => (
              <div key={guide.id} className="card overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: 'var(--secondary)',
                            color: 'var(--text-primary)'
                          }}>
                      {guide.category}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {guide.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {guide.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {guide.excerpt}
                  </p>
                  <Link
                    to={`/guides/${guide.id}`}
                    className="btn-primary inline-block px-4 py-2 text-sm font-medium rounded-lg"
                  >
                    Read Guide
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Featured Businesses
            </h2>
            <Link
              to="/showcase"
              className="inline-flex items-center space-x-2 text-lg font-medium transition-colors"
              style={{ color: 'var(--primary)' }}
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <div key={business.id} className="card p-6 text-center">
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {business.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  by {business.owner}
                </p>
                <span className="px-3 py-1 text-xs rounded-full mb-3 inline-block"
                      style={{ 
                        backgroundColor: 'var(--tertiary)',
                        color: 'var(--text-primary)'
                      }}>
                  {business.category}
                </span>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {business.description}
                </p>
                <button className="btn-primary px-4 py-2 text-sm font-medium rounded-lg w-full">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Ready to Share Your Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Your journey can inspire and empower other women. Join our community and make a difference.
          </p>
          <Link
            to="/stories/submit"
            className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold rounded-lg"
          >
            <span>Share Your Story</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
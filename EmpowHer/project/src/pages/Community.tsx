import React, { useState, useMemo } from 'react';
import { MessageCircle, Users, Search, MapPin, Star, Clock, Send } from 'lucide-react';
import { Hero } from '../components/Common/Hero';
import { SearchBar } from '../components/Common/SearchBar';
import { Modal } from '../components/Common/Modal';
import { mockProfiles, mockForumTopics, Profile, ForumTopic } from '../data/mockData';

export function Community() {
  const [activeTab, setActiveTab] = useState<'profiles' | 'forums'>('profiles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'mentor' | 'mentee'>('all');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [newPost, setNewPost] = useState('');

  // Get unique locations for filter
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    mockProfiles.forEach(profile => {
      const city = profile.location.split(',')[0];
      locationSet.add(city);
    });
    return Array.from(locationSet).sort();
  }, []);

  // Filter profiles
  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === 'all' || profile.type === selectedType;
      const matchesLocation = !selectedLocation || profile.location.includes(selectedLocation);
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchTerm, selectedType, selectedLocation]);

  // Filter forum topics
  const filteredTopics = useMemo(() => {
    if (!searchTerm) return mockForumTopics;
    return mockForumTopics.filter(topic =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleConnect = (profile: Profile) => {
    // Mock connection - would integrate with backend
    alert(`Connection request sent to ${profile.name}!`);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() && selectedTopic) {
      // Mock post submission - would integrate with backend
      alert('Your reply has been posted!');
      setNewPost('');
    }
  };

  return (
    <div>
      <Hero
        title="Community & Networking"
        subtitle="Connect with inspiring women, find mentors, share experiences, and grow together."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'profiles' 
                ? 'btn-primary' 
                : 'border-2 hover:transform hover:-translate-y-1'
            }`}
            style={activeTab === 'profiles' ? {} : { 
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
          >
            <Users className="h-5 w-5 inline mr-2" />
            Find Mentors & Peers
          </button>
          <button
            onClick={() => setActiveTab('forums')}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'forums' 
                ? 'btn-primary' 
                : 'border-2 hover:transform hover:-translate-y-1'
            }`}
            style={activeTab === 'forums' ? {} : { 
              borderColor: 'var(--primary)',
              color: 'var(--primary)',
              backgroundColor: 'transparent'
            }}
          >
            <MessageCircle className="h-5 w-5 inline mr-2" />
            Discussion Forums
          </button>
        </div>
      </Hero>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={activeTab === 'profiles' ? 'Search by name, skills, or location...' : 'Search topics and discussions...'}
            />
            
            {activeTab === 'profiles' && (
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'mentor' | 'mentee')}
                  className="input-field px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="mentor">Mentors</option>
                  <option value="mentee">Mentees</option>
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="input-field px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Profiles Tab */}
          {activeTab === 'profiles' && (
            <div>
              <div className="mb-6">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Found {filteredProfiles.length} {filteredProfiles.length === 1 ? 'profile' : 'profiles'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="card p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-16 h-16 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {profile.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span 
                            className="px-3 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: profile.type === 'mentor' ? 'var(--secondary)' : 'var(--tertiary)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {profile.type === 'mentor' ? 'Mentor' : 'Mentee'}
                          </span>
                          <span 
                            className={`w-3 h-3 rounded-full ${profile.availability === 'available' ? 'bg-green-400' : 'bg-yellow-400'}`}
                            title={profile.availability === 'available' ? 'Available' : 'Busy'}
                          />
                        </div>
                        <div className="flex items-center text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {profile.bio}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: 'var(--primary)',
                              color: 'var(--text-primary)',
                              opacity: 0.8
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {profile.skills.length > 3 && (
                          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            +{profile.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleConnect(profile)}
                      className="btn-primary w-full py-2 font-medium rounded-lg"
                      disabled={profile.availability === 'busy'}
                    >
                      {profile.availability === 'available' ? 'Connect' : 'Currently Busy'}
                    </button>
                  </div>
                ))}
              </div>
              
              {filteredProfiles.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    No profiles found
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Forums Tab */}
          {activeTab === 'forums' && (
            <div>
              <div className="mb-6">
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  {filteredTopics.length} active discussions
                </p>
              </div>
              
              <div className="space-y-4">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="card p-6 cursor-pointer hover:scale-[1.01] transition-transform"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                          {topic.title}
                        </h3>
                        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                          {topic.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span>by {topic.author}</span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{topic.replies} replies</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{topic.lastActivity}</span>
                          </span>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 text-xs rounded-full whitespace-nowrap ml-4"
                        style={{ 
                          backgroundColor: 'var(--tertiary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {topic.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--text-secondary)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                    No discussions found
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Try a different search term.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Forum Topic Modal */}
      {selectedTopic && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTopic(null)}
          title={selectedTopic.title}
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                {selectedTopic.description}
              </p>
              <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>by {selectedTopic.author}</span>
                <span>{selectedTopic.replies} replies</span>
                <span>Last activity: {selectedTopic.lastActivity}</span>
              </div>
            </div>
            
            <div className="border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Recent Replies
              </h4>
              <div className="space-y-4 mb-6">
                {/* Mock replies */}
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      Sarah M.
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      2 hours ago
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    This is such an important topic! I've found that setting clear boundaries between work and family time has been key to maintaining balance.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500" />
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                      Jennifer K.
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      4 hours ago
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    I agree! Having a support system has been crucial for me. Don't be afraid to ask for help when you need it.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your thoughts and experiences..."
                  className="input-field w-full h-24 resize-none"
                  maxLength={500}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {newPost.length}/500 characters
                  </span>
                  <button
                    type="submit"
                    disabled={!newPost.trim()}
                    className="btn-primary inline-flex items-center space-x-2 px-4 py-2 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    <span>Post Reply</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
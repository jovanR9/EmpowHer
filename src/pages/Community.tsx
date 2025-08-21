import React, { useState, useEffect, useMemo } from "react";
import {
  MessageCircle,
  Users,
  Search,
  MapPin,
  Star,
  Clock,
  Send,
} from "lucide-react";
import { Hero } from "../components/Common/Hero";
import { SearchBar } from "../components/Common/SearchBar";
import { Modal } from "../components/Common/Modal";
import { mockForumTopics, ForumTopic } from "../data/mockData"; // Keep mockForumTopics
import { supabase } from "../lib/supabaseClient"; // Import supabase
import { DiscussionForm } from "../components/Discussions/DiscussionForm";

// Define the Profile interface as provided earlier
interface Profile {
  id: string;
  name: string;
  avatar: string;
  type: "mentor" | "mentee";
  availability: "available" | "busy";
  location: string;
  bio: string;
  skills: string[];
}

// Define the Discussion interface
interface Discussion {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author_name: string; // Assuming you'll join with profiles or store name directly
  created_at: string;
  category: string;
  replies_count: number; // To store the count of replies
}

interface Reply {
  id: string;
  content: string;
  author_id: string;
  author_name: string; // To display the author's name
  created_at: string;
  topic_id: string;
}

export function Community() {
  const [activeTab, setActiveTab] = useState<"profiles" | "forums">("profiles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "mentor" | "mentee">(
    "all"
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Discussion | null>(null);
  const [newPost, setNewPost] = useState("");

  // State for the new discussion modal
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);

  // State for fetched profiles
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for fetched discussions
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(false);
  const [discussionsError, setDiscussionsError] = useState<string | null>(null);

  // State for fetched replies
  const [replies, setReplies] = useState<Reply[]>([]);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [repliesError, setRepliesError] = useState<string | null>(null);

  // Fetch profiles from Supabase
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.from("profiles").select("*");

        if (error) {
          console.error("Error fetching profiles:", error);
          setError("Failed to load profiles from database");
          setProfiles([]);
        } else {
          // Basic validation and normalization for fetched data
          const validProfiles: Profile[] = (data || []).map((p) => ({
            id: p.id,
            name: p.name || "Unknown",
            avatar:
              p.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`, // Fallback to dicebear
            type:
              p.type === "mentor" || p.type === "mentee" ? p.type : "mentee",
            availability:
              p.availability === "available" || p.availability === "busy"
                ? p.availability
                : "busy",
            location: p.location || "",
            bio: p.bio || "",
            skills: Array.isArray(p.skills) ? p.skills : [],
          }));
          setProfiles(validProfiles);
        }
      } catch (err) {
        console.error("Unexpected error fetching profiles:", err);
        setError("An unexpected error occurred");
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Fetch discussions from Supabase
  useEffect(() => {
    if (activeTab === "forums") {
      const fetchDiscussions = async () => {
        try {
          setDiscussionsLoading(true);
          setDiscussionsError(null);

          const { data, error } = await supabase
            .from("forum_topics")
            .select(
              `
              id,
              title,
              description,
              created_at,
              category,
              author_id,
              profiles (name),
              forum_replies (count)
            `
            )
            .order("created_at", { ascending: false });

          if (error) {
            console.error("Error fetching discussions:", error);
            setDiscussionsError("Failed to load discussions from database");
            setDiscussions([]);
          } else {
            const formattedDiscussions: Discussion[] = (data || []).map(
              (d: any) => ({
                id: d.id,
                title: d.title,
                description: d.description,
                author_id: d.author_id,
                author_name: d.profiles ? d.profiles.name : "Unknown",
                created_at: new Date(d.created_at).toLocaleDateString(),
                category: d.category,
                replies_count: d.forum_replies ? d.forum_replies.length : 0,
              })
            );
            setDiscussions(formattedDiscussions);
          }
        } catch (err) {
          console.error("Unexpected error fetching discussions:", err);
          setDiscussionsError("An unexpected error occurred");
          setDiscussions([]);
        } finally {
          setDiscussionsLoading(false);
        }
      };

      fetchDiscussions();
    }
  }, [activeTab]);

  // Fetch replies for a selected topic
  useEffect(() => {
    if (selectedTopic) {
      const fetchReplies = async () => {
        try {
          setRepliesLoading(true);
          setRepliesError(null);

          const { data, error } = await supabase
            .from("forum_replies")
            .select(
              `
              id,
              content,
              created_at,
              author_id,
              author_name
            `
            )
            .eq("topic_id", selectedTopic.id)
            .order("created_at", { ascending: true });

          if (error) {
            console.error("Error fetching replies:", error);
            setRepliesError("Failed to load replies");
            setReplies([]);
          } else {
            const formattedReplies: Reply[] = (data || []).map((r: any) => ({
              id: r.id,
              content: r.content,
              author_id: r.author_id,
              author_name: r.author_name || "Anonymous", // Use r.author_name directly
              created_at: new Date(r.created_at).toLocaleString(),
              topic_id: selectedTopic.id,
            }));
            setReplies(formattedReplies);
          }
        } catch (err) {
          console.error("Unexpected error fetching replies:", err);
          setRepliesError("An unexpected error occurred");
          setReplies([]);
        } finally {
          setRepliesLoading(false);
        }
      };

      fetchReplies();
    } else {
      setReplies([]); // Clear replies when no topic is selected
    }
  }, [selectedTopic]);

  // Get unique locations for filter (now based on fetched profiles)
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    profiles.forEach((profile) => {
      // Use 'profiles' state here
      if (profile.location) {
        const city = profile.location.split(",")[0]?.trim();
        if (city) {
          locationSet.add(city);
        }
      }
    });
    return Array.from(locationSet).sort();
  }, [profiles]);

  // Filter profiles (now based on fetched profiles)
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      // Use 'profiles' state here
      const matchesSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesType =
        selectedType === "all" || profile.type === selectedType;
      const matchesLocation =
        !selectedLocation || profile.location.includes(selectedLocation);
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [profiles, searchTerm, selectedType, selectedLocation]);

  // Filter forum topics (now using fetched data)
  const filteredTopics = useMemo(() => {
    if (!searchTerm) return discussions;
    return discussions.filter(
      (topic) =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, discussions]);

  const handleConnect = (profile: Profile) => {
    // Mock connection - would integrate with backend
    alert(`Connection request sent to ${profile.name}!`);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() && selectedTopic) {
      try {
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id || null; // Get user ID if logged in

        const { error } = await supabase.from("forum_replies").insert({
          content: newPost.trim(),
          topic_id: selectedTopic.id,
          author_id: userId, // Use actual user ID or null for anonymous
        });

        if (error) {
          console.error("Error posting reply:", error);
          alert("Failed to post reply.");
        } else {
          alert("Your reply has been posted!");
          setNewPost("");
          // Re-fetch replies to show the new post
          if (selectedTopic) {
            // This will trigger the useEffect to re-fetch replies
            setSelectedTopic({ ...selectedTopic });
          }
        }
      } catch (err) {
        console.error("Unexpected error posting reply:", err);
        alert("An unexpected error occurred while posting reply.");
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Hero
          title="Connect with the Community"
          subtitle="Find mentors, mentees, and collaborators to grow together."
        />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Loading profiles...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="Community & Networking"
        subtitle="Connect with inspiring women, find mentors, share experiences, and grow together."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab("profiles")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 !text-[#3A3440] hover:!text-white ${
              activeTab === "profiles"
                ? "btn-primary"
                : "border-2 hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "profiles"
                ? {}
                : {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "transparent",
                  }
            }
          >
            <Users className="h-5 w-5 inline mr-2" />
            Find Mentors & Peers
          </button>
          <button
            onClick={() => setActiveTab("forums")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 !text-[#3A3440] hover:!text-white ${
              activeTab === "forums"
                ? "btn-primary"
                : "border-2 border-white hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "forums"
                ? {}
                : {
                    backgroundColor: "transparent",
                  }
            }
          >
            <MessageCircle className="h-5 w-5 inline mr-2" />
            Discussion Forums
          </button>
          {activeTab === "forums" && (
            <button
              onClick={() => setIsDiscussionModalOpen(true)}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 !text-[#3A3440] hover:!text-white btn-primary`}
              // Removed inline style to use btn-primary's default background
            >
              Start a Discussion
            </button>
          )}
        </div>
      </Hero>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={
                activeTab === "profiles"
                  ? "Search by name, skills, or location..."
                  : "Search topics and discussions..."
              }
            />

            {activeTab === "profiles" && (
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(
                      e.target.value as "all" | "mentor" | "mentee"
                    )
                  }
                  className="input-field px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
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
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg"
              style={{
                backgroundColor: "var(--error-bg, #fee2e2)",
                color: "var(--error-text, #dc2626)",
                border: "1px solid var(--error-border, #fecaca)",
              }}
            >
              {error}
            </div>
          )}

          {/* Profiles Tab */}
          {activeTab === "profiles" && (
            <div>
              <div className="mb-6">
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Found {filteredProfiles.length}{" "}
                  {filteredProfiles.length === 1 ? "profile" : "profiles"}
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
                        <h3
                          className="text-xl font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {profile.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className="px-3 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor:
                                profile.type === "mentor"
                                  ? "var(--secondary)"
                                  : "var(--tertiary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            {profile.type === "mentor" ? "Mentor" : "Mentee"}
                          </span>
                          <span
                            className={`w-3 h-3 rounded-full ${
                              profile.availability === "available"
                                ? "bg-green-400"
                                : "bg-yellow-400"
                            }`}
                            title={
                              profile.availability === "available"
                                ? "Available"
                                : "Busy"
                            }
                          />
                        </div>
                        <div
                          className="flex items-center text-sm mb-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          {profile.location}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-sm mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {profile.bio}
                    </p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: "var(--primary)",
                              color: "var(--text-primary)",
                              opacity: 0.8,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                        {profile.skills.length > 3 && (
                          <span
                            className="text-xs"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            +{profile.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleConnect(profile)}
                      className="btn-primary w-full py-2 font-medium rounded-lg"
                      disabled={profile.availability === "busy"}
                    >
                      {profile.availability === "available"
                        ? "Connect"
                        : "Currently Busy"}
                    </button>
                  </div>
                ))}
              </div>

              {filteredProfiles.length === 0 && (
                <div className="text-center py-12">
                  <Users
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No profiles found
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Forums Tab */}
          {activeTab === "forums" && (
            <div>
              <div className="mb-6">
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {discussionsLoading
                    ? "Loading discussions..."
                    : `${filteredTopics.length} active discussions`}
                </p>
              </div>

              {discussionsError && (
                <div
                  className="mb-6 p-4 rounded-lg"
                  style={{
                    backgroundColor: "var(--error-bg, #fee2e2)",
                    color: "var(--error-text, #dc2626)",
                    border: "1px solid var(--error-border, #fecaca)",
                  }}
                >
                  {discussionsError}
                </div>
              )}

              {!discussionsLoading &&
                !discussionsError &&
                filteredTopics.length > 0 && (
                  <div className="space-y-4">
                    {filteredTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="card p-6 cursor-pointer hover:scale-[1.01] transition-transform"
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3
                              className="text-xl font-semibold mb-2"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {topic.title}
                            </h3>
                            <p
                              className="text-sm mb-3"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {topic.description}
                            </p>
                            <div
                              className="flex items-center space-x-4 text-sm"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              <span>by {topic.author_name}</span>
                              <span className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{topic.replies_count} replies</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{topic.created_at}</span>
                              </span>
                            </div>
                          </div>
                          <span
                            className="px-3 py-1 text-xs rounded-full whitespace-nowrap ml-4"
                            style={{
                              backgroundColor: "var(--tertiary)",
                              color: "var(--text-primary)",
                            }}
                          >
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {!discussionsLoading &&
                !discussionsError &&
                filteredTopics.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle
                      className="h-16 w-16 mx-auto mb-4 opacity-50"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      No discussions found
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Try a different search term or start a new discussion!
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
              <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                {selectedTopic.description}
              </p>
              <div
                className="flex items-center space-x-4 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <span>by {selectedTopic.author_name}</span>
                <span>{selectedTopic.replies_count} replies</span>
                <span>Created: {selectedTopic.created_at}</span>
              </div>
            </div>

            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Recent Replies
              </h4>
              <div className="space-y-4 mb-6">
                {repliesLoading && (
                  <p style={{ color: "var(--text-secondary)" }}>
                    Loading replies...
                  </p>
                )}
                {repliesError && (
                  <p style={{ color: "var(--error-text)" }}>{repliesError}</p>
                )}
                {!repliesLoading && !repliesError && replies.length === 0 && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No replies yet. Be the first to comment!
                  </p>
                )}
                {!repliesLoading &&
                  !repliesError &&
                  replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: "var(--bg-secondary)" }}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />{" "}
                        {/* Placeholder avatar */}
                        <span
                          className="font-medium text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {reply.author_name}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {reply.created_at}
                        </span>
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {reply.content}
                      </p>
                    </div>
                  ))}
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
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
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

      {/* New Discussion Modal */}
      {isDiscussionModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsDiscussionModalOpen(false)}
          title="Start a New Discussion"
          size="lg"
        >
          <DiscussionForm
            onCancel={() => setIsDiscussionModalOpen(false)}
            onSuccess={() => {
              setIsDiscussionModalOpen(false);
              // Optionally, refresh discussions list after successful post
              // For now, relies on the activeTab === "forums" useEffect to re-fetch
            }}
          />
        </Modal>
      )}
    </div>
  );
}

import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, SortAsc } from "lucide-react";
import { Hero } from "../components/Common/Hero";
import { SearchBar } from "../components/Common/SearchBar";
import { StoryCard } from "../components/Stories/StoryCard";
import { supabase } from "../lib/supabaseClient";
import { useStorage } from "../contexts/StorageContext";

interface Story {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  profile_image_url?: string; // Add profile_image_url
  image?: string;
  tags: string[];
  likes: number;
  published: boolean;
}

// Helper function to validate story data
const isValidStory = (story: any): boolean => {
  const dateField = story.created_at || story.createdAt;
  return (
    story &&
    typeof story === "object" &&
    story.id &&
    story.title &&
    story.excerpt &&
    story.body &&
    story.author &&
    dateField &&
    !isNaN(new Date(dateField).getTime())
  );
};

// Helper function to normalize story data
const normalizeStory = (story: any): Story => {
  return {
    id: story.id,
    created_at: story.created_at || story.createdAt,
    title: story.title || "",
    excerpt: story.excerpt || "",
    body: story.body || "",
    author: story.author || "", // 'author' is directly from stories table
    profile_image_url: story.profile_image_url, // Assign profile_image_url directly
    image: story.image,
    tags: Array.isArray(story.tags) ? story.tags : [],
    likes: typeof story.likes === "number" ? story.likes : 0,
    published: story.published !== false, // Default to true if not specified
  };
};

export function Stories() {
  const { userStories } = useStorage();
  const [stories, setStories] = useState<Story[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "oldest">(
    "newest"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
        .from("stories")
        .select("*") // Simply select all columns from 'stories' table
        .eq("published", true);

      if (error) {
          console.error("Error fetching stories:", error);
          setError("Failed to load stories from database");
          setStories([]);
        } else {
          // Filter out any invalid stories from database
          const validStories = (data || []).filter(isValidStory);
          setStories(validStories);

          // Log if any stories were filtered out
          if (data && data.length !== validStories.length) {
            console.warn(
              `Filtered out ${
                data.length - validStories.length
              } invalid stories from database`
            );
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching stories:", err);
        setError("An unexpected error occurred");
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Combine user stories with fetched stories, filtering out invalid ones
  const allStories = useMemo(() => {
    // Filter user stories - only include complete stories
    const validUserStories = (userStories || [])
      .filter((story) => {
        const isValid = isValidStory(story);
        // Only log if it's a partial story (has some fields but not all)
        if (!isValid && story && story.id && Object.keys(story).length > 3) {
          console.warn(
            "Incomplete user story filtered out (missing required fields):",
            story
          );
        }
        return isValid;
      })
      .map(normalizeStory);

    // Normalize fetched stories (they should already be valid)
    const normalizedFetchedStories = stories.map(normalizeStory);

    // Combine all valid stories
    const combined = [...validUserStories, ...normalizedFetchedStories];

    // Remove duplicates based on ID
    const uniqueStories = combined.filter(
      (story, index, self) => index === self.findIndex((s) => s.id === story.id)
    );

    return uniqueStories;
  }, [userStories, stories]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allStories.forEach((story) => {
      if (story.tags && Array.isArray(story.tags)) {
        story.tags.forEach((tag) => {
          if (tag && typeof tag === "string") {
            tagSet.add(tag.trim());
          }
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [allStories]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let filtered = allStories.filter((story) => {
      // Ensure all required fields exist before filtering
      if (!story || !story.title || !story.excerpt || !story.author) {
        return false;
      }

      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag =
        !selectedTag || (story.tags && story.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });

    // Sort stories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "popular":
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allStories, searchTerm, selectedTag, sortBy]);

  // Show loading state
  if (loading) {
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
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                Loading stories...
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="Empowering Stories"
        subtitle="Discover inspiring journeys of women who've overcome challenges and achieved their dreams."
      >
        <Link
          to="/stories/submit"
          className="btn-primary inline-flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg hover:transform hover:-translate-y-1 !text-[#3A3440] hover:!text-white"
        >
          <Plus className="h-5 w-5" />
          <span>Share Your Story</span>
        </Link>
      </Hero>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 w-full">
              {/* Search */}
              <div className="flex-1">
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search stories by title, author, or content..."
                />
              </div>

              <div className="flex flex-row gap-4">
                {/* Filter */}
                <div
                  className="flex items-center rounded-lg px-3 cursor-pointer border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Filter
                    className="h-5 w-5 mr-2 shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                  />

                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="bg-transparent focus:outline-none appearance-none w-40 truncate"
                  >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="flex items-center rounded-lg px-3 cursor-pointer border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <SortAsc
                    className="h-5 w-5 mr-2 shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                  />

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "newest" | "popular" | "oldest"
                      )
                    }
                    className="py-3 pr-4 bg-transparent focus:outline-none appearance-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedTag) && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 hover:opacity-70"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span
                    className="px-3 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Tag: {selectedTag}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-2 hover:opacity-70"
                      aria-label="Clear tag filter"
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
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Found {filteredStories.length}{" "}
              {filteredStories.length === 1 ? "story" : "stories"}
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
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary)", opacity: 0.2 }}
                >
                  <Plus
                    className="h-12 w-12"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  No Stories Found
                </h3>
                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                  {searchTerm || selectedTag
                    ? "Try adjusting your search or filters."
                    : "Be the first to share your inspiring story!"}
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

import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  ExternalLink,
  Search,
  Filter,
  Clock,
  DollarSign,
  Scale,
  FileText,
} from "lucide-react";
import { Hero } from "../components/Common/Hero";
import { SearchBar } from "../components/Common/SearchBar";
import { Modal } from "../components/Common/Modal";
import { supabase } from "../lib/supabaseClient"; // Import supabase
import { mockSchemes, Scheme } from "../data/mockData"; // Keep mockSchemes for now

// Define the Guide interface based on the provided SQL schema
interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  read_time: number; // Changed from readTime to read_time to match SQL schema
}

export function Guides() {
  const [activeTab, setActiveTab] = useState<"guides" | "schemes">("guides");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // State for fetched guides
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch guides from Supabase
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.from("guides").select("*");

        if (error) {
          console.error("Error fetching guides:", error);
          setError("Failed to load guides from database");
          setGuides([]);
        } else {
          // Basic validation and normalization for fetched data
          const validGuides: Guide[] = (data || []).map((g) => ({
            id: g.id,
            title: g.title || "Untitled Guide",
            excerpt: g.excerpt || "",
            content: g.content || "",
            category: g.category || "General",
            image:
              g.image || "https://via.placeholder.com/400x200?text=No+Image",
            read_time: g.read_time || 0,
          }));
          setGuides(validGuides);
        }
      } catch (err) {
        console.error("Unexpected error fetching guides:", err);
        setError("An unexpected error occurred");
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Get unique categories for guides (now based on fetched guides)
  const guideCategories = useMemo(() => {
    const categorySet = new Set<string>();
    guides.forEach((guide) => categorySet.add(guide.category));
    return Array.from(categorySet).sort();
  }, [guides]);

  // Get unique categories for schemes
  const schemeCategories = useMemo(() => {
    const categorySet = new Set<string>();
    mockSchemes.forEach((scheme) => categorySet.add(scheme.category));
    return Array.from(categorySet).sort();
  }, []);

  // Filter guides (now based on fetched guides)
  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch =
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || guide.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [guides, searchTerm, selectedCategory]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return mockSchemes.filter((scheme) => {
      const matchesSearch =
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.eligibility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.benefit.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || scheme.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "financial":
        return DollarSign;
      case "legal":
        return Scale;
      case "business":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "financial":
        return "var(--secondary)";
      case "legal":
        return "var(--tertiary)";
      case "business":
        return "var(--primary)";
      default:
        return "var(--primary)";
    }
  };

  if (loading) {
    return (
      <div>
        <Hero
          title="Financial & Legal Literacy"
          subtitle="Access essential resources, guides, and government schemes to support your entrepreneurial journey."
        />
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Loading guides...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="Financial & Legal Literacy"
        subtitle="Access essential resources, guides, and government schemes to support your entrepreneurial journey."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab("guides")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 hover:transform hover:-translate-y-1 !text-[#3A3440] hover:!text-white ${
              activeTab === "guides"
                ? "btn-primary"
                : "border-2 hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "guides"
                ? {}
                : {
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                    backgroundColor: "transparent",
                  }
            }
          >
            <BookOpen className="h-5 w-5 inline mr-2" />
            Learning Guides
          </button>
          <button
            onClick={() => setActiveTab("schemes")}
            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200  !text-[#3A3440] hover:!text-white ${
              activeTab === "schemes"
                ? "btn-primary"
                : "border-2 border-white hover:transform hover:-translate-y-1"
            }`}
            style={
              activeTab === "schemes"
                ? {}
                : {
                    backgroundColor: "transparent",
                  }
            }
          >
            <ExternalLink className="h-5 w-5 inline mr-2" />
            Government Schemes
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
              placeholder={
                activeTab === "guides"
                  ? "Search guides by title or topic..."
                  : "Search schemes by name or benefit..."
              }
            />

            <div className="flex flex-wrap gap-4">
              {/* Filter with icon + select side by side */}
              <div
                className="flex items-center rounded-lg px-3 cursor-pointer border w-auto"
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent focus:outline-none appearance-none w-auto py-2"
                >
                  <option value="">All Categories</option>
                  {(activeTab === "guides"
                    ? guideCategories
                    : schemeCategories
                  ).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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

          {/* Guides Tab */}
          {activeTab === "guides" && (
            <div>
              <div className="mb-6">
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Found {filteredGuides.length}{" "}
                  {filteredGuides.length === 1 ? "guide" : "guides"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => {
                  const CategoryIcon = getCategoryIcon(guide.category);
                  return (
                    <div key={guide.id} className="card overflow-hidden">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon
                              className="h-4 w-4"
                              style={{
                                color: getCategoryColor(guide.category),
                              }}
                            />
                            <span
                              className="px-3 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: getCategoryColor(
                                  guide.category
                                ),
                                color: "var(--text-primary)",
                                opacity: 0.9,
                              }}
                            >
                              {guide.category}
                            </span>
                          </div>
                          <div
                            className="flex items-center space-x-1 text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <Clock className="h-4 w-4" />
                            <span>{guide.read_time} min</span>
                          </div>
                        </div>

                        <h3
                          className="text-xl font-semibold mb-3"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {guide.title}
                        </h3>

                        <p
                          className="text-sm mb-4 line-clamp-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {guide.excerpt}
                        </p>

                        <button
                          onClick={() => setSelectedGuide(guide)}
                          className="btn-primary w-full py-2 font-medium rounded-lg"
                        >
                          Read Guide
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No guides found
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Schemes Tab */}
          {activeTab === "schemes" && (
            <div>
              <div className="mb-6">
                <p
                  className="text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {filteredSchemes.length}{" "}
                  {filteredSchemes.length === 1 ? "scheme" : "schemes"}{" "}
                  available
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSchemes.map((scheme) => (
                  <div key={scheme.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3
                          className="text-xl font-semibold mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {scheme.name}
                        </h3>
                        <span
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: getCategoryColor(scheme.category),
                            color: "var(--text-primary)",
                            opacity: 0.9,
                          }}
                        >
                          {scheme.category}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4
                          className="font-medium text-sm mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Eligibility:
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {scheme.eligibility}
                        </p>
                      </div>

                      <div>
                        <h4
                          className="font-medium text-sm mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Benefits:
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {scheme.benefit}
                        </p>
                      </div>
                    </div>

                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center space-x-2 w-full justify-center py-2 font-medium rounded-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Learn More</span>
                    </a>
                  </div>
                ))}
              </div>

              {filteredSchemes.length === 0 && (
                <div className="text-center py-12">
                  <ExternalLink
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No schemes found
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedGuide(null)}
          title={selectedGuide.title}
          size="xl"
        >
          <div className="space-y-6">
            <img
              src={selectedGuide.image}
              alt={selectedGuide.title}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />

            <div className="flex items-center space-x-4">
              <span
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: getCategoryColor(selectedGuide.category),
                  color: "var(--text-primary)",
                }}
              >
                {selectedGuide.category}
              </span>
              <div
                className="flex items-center space-x-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <Clock className="h-4 w-4" />
                <span>{selectedGuide.read_time} min read</span>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none"
              style={{ color: "var(--text-primary)" }}
            >
              <p
                className="text-lg mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {selectedGuide.excerpt}
              </p>

              <div
                className="text-base leading-relaxed whitespace-pre-wrap"
                style={{ wordBreak: "break-all" }}
              >
                {selectedGuide.content}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

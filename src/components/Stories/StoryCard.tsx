import React from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, User, Tag } from "lucide-react";

interface Story {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  profile_image_url?: string; // Change from authorAvatar to profile_image_url
  image?: string;
  tags: string[];
  likes: number;
  published: boolean;
}

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: { story: Story }) => {
  return (
    <div className="story-card">
      <div className="story-card-img">
        <img src={story.image} alt={story.title} />
      </div>

      <div className="story-card-content">
        <div className="story-card-author">
          {story.profile_image_url ? ( // Conditionally render image if profile_image_url exists
            <img src={story.profile_image_url} alt={story.author} className="w-10 h-10 rounded-full mr-3 object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
              {story.author ? story.author.charAt(0).toUpperCase() : '?'}{" "}
            </div> // Placeholder if no image
          )}
          <div>
            <p className="font-medium" style={{ color: "var(--text-primary)" }}>
              {story.author}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {new Date(story.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h3 className="story-card-title">{story.title}</h3>
        <p className="story-card-excerpt">{story.excerpt}</p>

        <div className="story-card-footer">
          <div className="flex items-center">
            <Heart
              className="w-4 h-4 mr-1"
              style={{ color: "var(--main-color)" }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {story.likes}
            </span>
          </div>
          <Link to={`/stories/${story.id}`} className="story-card-btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

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
  authorAvatar: string;
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
          <img src={story.authorAvatar} alt={story.author} />
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

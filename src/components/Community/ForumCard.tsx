
import React from "react";
import { MessageCircle, Clock } from "lucide-react";

interface Discussion {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author_name: string;
  created_at: string;
  category: string;
  replies_count: number;
}

interface ForumCardProps {
  topic: Discussion;
  onClick: () => void;
}

export const ForumCard: React.FC<ForumCardProps> = ({ topic, onClick }) => {
  return (
    <div className="story-card" onClick={onClick}>
      <div className="story-card-content">
        <div className="story-card-author">
          <div className="story-card-author-avatar">
            {topic.author_name ? topic.author_name.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="story-card-author-info">
            <p className="font-medium" style={{ color: "var(--text-primary)" }}>
              {topic.author_name}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {topic.created_at}
            </p>
          </div>
        </div>

        <h3 className="story-card-title">{topic.title}</h3>
        <p className="story-card-excerpt">{topic.description}</p>

        <div className="story-card-footer">
          <div className="flex items-center">
            <MessageCircle
              className="w-4 h-4 mr-1"
              style={{ color: "var(--main-color)" }}
            />
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {topic.replies_count} replies
            </span>
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
    </div>
  );
};

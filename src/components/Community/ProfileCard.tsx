
import React from "react";
import { MapPin } from "lucide-react";

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

interface ProfileCardProps {
  profile: Profile;
  onConnect: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onConnect }) => {
  return (
    <div className="story-card">
      <div className="story-card-content">
        <div className="story-card-author">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded-full object-cover"
            loading="lazy"
          />
          <div className="story-card-author-info">
            <h3
              className="story-card-title"
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
          className="story-card-excerpt"
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

        <div className="story-card-footer">
            <button
                onClick={onConnect}
                className="story-card-btn w-full"
                disabled={profile.availability === "busy"}
            >
                {profile.availability === "available"
                ? "Connect"
                : "Currently Busy"}
            </button>
        </div>
      </div>
    </div>
  );
};

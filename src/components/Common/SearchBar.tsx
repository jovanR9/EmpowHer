import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`flex items-center rounded-lg border px-3 ${className}`}
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Search icon inline */}
      <Search
        className="h-5 w-5 mr-2"
        style={{ color: "var(--text-secondary)" }}
      />

      {/* Input field keeps its original size */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        // className="input-field flex-1 py-3 pr-4"
        className="flex-1 py-3 pr-4 bg-transparent focus:outline-none"
        style={{
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Story } from '../data/mockData';

interface StorageContextType {
  userStories: Story[];
  addUserStory: (story: Omit<Story, 'id' | 'createdAt' | 'likes'>) => void;
  updateUserStory: (id: string, story: Partial<Story>) => void;
  deleteUserStory: (id: string) => void;
  clearUserData: () => void;
  isUserStory: (storyId: string) => boolean;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

const STORAGE_KEY = 'empowher-user-stories';

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [userStories, setUserStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userStories));
  }, [userStories]);

  const addUserStory = (storyData: Omit<Story, 'id' | 'createdAt' | 'likes'>) => {
    const newStory: Story = {
      ...storyData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString().split('T')[0],
      likes: 0
    };
    setUserStories(prev => [newStory, ...prev]);
  };

  const updateUserStory = (id: string, updates: Partial<Story>) => {
    setUserStories(prev => prev.map(story => 
      story.id === id ? { ...story, ...updates } : story
    ));
  };

  const deleteUserStory = (id: string) => {
    setUserStories(prev => prev.filter(story => story.id !== id));
  };

  const clearUserData = () => {
    setUserStories([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const isUserStory = (storyId: string) => {
    return storyId.startsWith('user-');
  };

  return (
    <StorageContext.Provider value={{
      userStories,
      addUserStory,
      updateUserStory,
      deleteUserStory,
      clearUserData,
      isUserStory
    }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
}
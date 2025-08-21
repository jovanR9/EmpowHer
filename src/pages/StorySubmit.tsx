import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoryForm } from '../components/Stories/StoryForm';
import { useStorage } from '../contexts/StorageContext';
import { Toast } from '../components/Common/Toast';
import { mockStories } from '../data/mockData';

export function StorySubmit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addUserStory, updateUserStory, userStories, isUserStory } = useStorage();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Find existing story if editing
  const existingStory = id 
    ? userStories.find(s => s.id === id) || mockStories.find(s => s.id === id)
    : undefined;

  // Check if user can edit this story
  const canEdit = !existingStory || isUserStory(existingStory.id);

  if (id && existingStory && !canEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Access Denied
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            You can only edit stories that you've created.
          </p>
        </div>
      </div>
    );
  }

  if (id && !existingStory) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Story Not Found
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            The story you're trying to edit doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = (storyData: any) => {
    try {
      if (existingStory && canEdit) {
        // Update existing story
        updateUserStory(existingStory.id, storyData);
        setToast({ message: 'Story updated successfully!', type: 'success' });
      } else {
        // Create new story
        addUserStory(storyData);
        setToast({ message: 'Story published successfully!', type: 'success' });
      }

      // Navigate back to stories after a short delay
      setTimeout(() => {
        navigate('/stories');
      }, 2000);
    } catch (error) {
      setToast({ message: 'Failed to save story. Please try again.', type: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/stories');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="min-h-screen py-12">
        <StoryForm
          story={existingStory}
          onSuccess={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { StorageProvider } from './contexts/StorageContext';
import { Home } from './pages/Home';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { StorySubmit } from './pages/StorySubmit';
import { Community } from './pages/Community';
import { Guides } from './pages/Guides';
import { Showcase } from './pages/Showcase';

function App() {
  return (
    <ThemeProvider>
      <StorageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/stories/submit" element={<StorySubmit />} />
              <Route path="/stories/edit/:id" element={<StorySubmit />} />
              <Route path="/community" element={<Community />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/showcase" element={<Showcase />} />
            </Routes>
          </Layout>
        </Router>
      </StorageProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/stories', label: 'Stories' },
    { path: '/community', label: 'Community' },
    { path: '/guides', label: 'Guides' },
    { path: '/showcase', label: 'Showcase' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-opacity-95 backdrop-blur-md border-b" 
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)' 
            }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8" style={{ color: 'var(--primary)' }} />
            <span className="text-2xl font-bold text-gradient">EmpowHer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-opacity-20 text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
                style={isActive(item.path) ? { 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-primary)'
                } : {
                  color: 'var(--text-secondary)'
                }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
              style={{ backgroundColor: 'var(--primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Sun className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Sun className="h-5 w-5" style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-primary)' }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-opacity-20'
                    : 'hover:bg-opacity-10'
                }`}
                style={isActive(item.path) ? { 
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-primary)'
                } : {
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
import React from 'react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t mt-16" 
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)' 
            }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8" style={{ color: 'var(--primary)' }} />
              <span className="text-2xl font-bold text-gradient">EmpowHer</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Empowering women through stories, community, and resources for personal and professional growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {['Stories', 'Community', 'Guides', 'Showcase'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:underline transition-colors"
                     style={{ color: 'var(--text-secondary)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Resources
            </h3>
            <ul className="space-y-2">
              {['Financial Literacy', 'Legal Rights', 'Mentorship', 'Business Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:underline transition-colors"
                     style={{ color: 'var(--text-secondary)' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  hello@empowher.com
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  +91 9876543210
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Goa, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center"
             style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2025 EmpowHer. All rights reserved. Built with ❤️ for women everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
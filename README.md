# EmpowHer - Women's Empowerment Platform

https://github.com/user-attachments/assets/bb64192d-5273-4959-9583-301d59a158b6

A comprehensive React frontend application designed to empower women through stories, community connection, and access to essential resources.

🔗 **Check out the live platform here:** [Visit EmpowHer](https://the-empowher.vercel.app/) 

## 🌟 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: Toggle between themes with persistent localStorage preference
- **Client-Side Persistence**: User-generated content stored locally using localStorage
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support
- **Smooth Animations**: Micro-interactions and hover effects throughout

### Platform Sections

#### 1. Homepage
- Hero section with compelling call-to-action
- Featured content previews from all sections
- Quick navigation to all platform areas
- Clean, modern design with brand colors

#### 2. EmpowHer Stories
- **Story Listing**: Filterable and searchable grid of inspiring stories
- **Story Details**: Full story view with author info, tags, and sharing
- **Story Submission**: Complete form with validation and image support
- **Story Management**: Edit/delete functionality for user-created stories
- **Client Persistence**: All user stories saved to localStorage

#### 3. Community & Networking
- **Profile Directory**: Browse mentors and mentees with filtering
- **Forum Discussions**: Topic-based community discussions
- **Connection Features**: Mock connection and messaging system
- **Search & Filter**: By location, skills, availability, and topics

#### 4. Financial & Legal Literacy
- **Learning Guides**: Comprehensive guides on business and legal topics
- **Government Schemes**: Searchable directory of support programs
- **Categorized Content**: Financial, Legal, and Business resources
- **Modal Reading**: Full-screen guide reading experience

#### 5. Showcase & Marketplace
- **Business Directory**: Women-owned business listings with contact info
- **Product Gallery**: Visual showcase of products and services
- **Category Filtering**: Organized by business and product types
- **Modal Details**: Detailed business and product information

## 🎨 Design System

### Color Palette
- **Primary Accent**: #D8BFD8 (Thistle) - Main brand color
- **Secondary Accent**: #A3C1AD (Sage Green) - Supporting accent
- **Tertiary Accent**: #FFC0CB (Pink) - Highlight color
- **Neutral Dark**: #F7F4F9 (Off-white) - Light mode background
- **Neutral Light**: #2C2630 (Charcoal) - Dark mode background
- **Text Primary**: #3A3440 - Main text color
- **Text Secondary**: #7F7983 - Secondary text color

### Typography
- **Font Family**: Inter (Google Fonts) with system fallbacks
- **Hierarchy**: Clear heading structure with appropriate line heights
- **Responsive**: Scales appropriately across device sizes

### UI Elements
- **Cards**: 12px border radius with subtle shadows
- **Buttons**: Hover lift effects with smooth transitions
- **Forms**: Comprehensive validation with error states
- **Modals**: Overlay system with backdrop blur
- **Navigation**: Responsive header with mobile hamburger menu

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd empowher-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production
```bash
npm run build
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 💾 Data Persistence

### User Stories
- Stored in localStorage under key: `empowher-user-stories`
- Includes all story data with unique IDs
- Persists across browser sessions

### Theme Preference
- Stored in localStorage under key: `empowher-theme`
- Automatically applies on page load
- Toggles between 'light' and 'dark' modes

### Data Management
- **Clear Data**: Use browser DevTools > Application > Storage to clear
- **Import/Export**: Future feature for data portability
- **Backup**: Consider regular localStorage backups

## ♿ Accessibility Features

### WCAG 2.1 Compliance
- **AA Standard**: Meets accessibility guidelines
- **Color Contrast**: Sufficient ratios for all text
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators

### Keyboard Shortcuts
- **Tab**: Navigate interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate within components

## 🏗️ Component Architecture

### Layout Components
- `Layout/Header.tsx` - Navigation and theme toggle
- `Layout/Footer.tsx` - Site footer with links
- `Layout/Layout.tsx` - Main layout wrapper

### Common Components
- `Common/Hero.tsx` - Reusable hero sections
- `Common/SearchBar.tsx` - Search input component
- `Common/Modal.tsx` - Modal overlay system
- `Common/Toast.tsx` - Notification system

### Feature Components
- `Stories/StoryCard.tsx` - Story preview cards
- `Stories/StoryForm.tsx` - Story submission form

### Context Providers
- `ThemeContext.tsx` - Theme management
- `StorageContext.tsx` - Data persistence

## 📊 Mock Data

The application includes comprehensive mock data:
- **8 Inspiring Stories** - Diverse entrepreneurial journeys
- **6 Community Profiles** - Mix of mentors and mentees
- **9 Business Listings** - Various industry categories
- **12 Products** - Range of services and goods
- **9 Educational Guides** - Financial and legal resources
- **6 Government Schemes** - Support program information
- **6 Forum Topics** - Active community discussions

## 🔧 Technical Stack

### Frontend
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Performance Optimizations

- **Image Lazy Loading** - Deferred image loading
- **Component Code Splitting** - Reduced bundle sizes
- **CSS Custom Properties** - Efficient theme switching
- **Optimized Re-renders** - React.memo and useCallback usage
- **Responsive Images** - Appropriate sizing for devices

## 🔒 Security Considerations

- **Input Sanitization** - Form validation and sanitization
- **XSS Prevention** - Safe HTML rendering
- **Local Storage Security** - Appropriate data handling
- **No Sensitive Data** - Client-side storage awareness

## 📈 Future Enhancements

### Planned Features
- **User Authentication** - Account creation and login
- **Real-time Chat** - Direct messaging between users
- **File Upload** - Image and document uploads
- **Email Notifications** - Activity and connection alerts
- **Mobile App** - React Native version
- **Backend Integration** - API connectivity
- **Payment Processing** - E-commerce functionality
- **Analytics Dashboard** - User insights and metrics

### Technical Improvements
- **PWA Support** - Offline functionality
- **Performance Monitoring** - Real user metrics
- **Error Boundary** - Graceful error handling
- **Internationalization** - Multi-language support
- **Advanced Search** - Elasticsearch integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---


**Built with ❤️ for women everywhere by the ScriptSmiths team**

---

### 👨‍💻 Developers  

[![GitHub](https://img.shields.io/badge/Anuj_Gaude-000?style=flat&logo=github&logoColor=white)](https://github.com/anuj0629)  
[![GitHub](https://img.shields.io/badge/Ashden_Mascarenhas-000?style=flat&logo=github&logoColor=white)](https://github.com/706ash)  
[![GitHub](https://img.shields.io/badge/Lauren_Rodrigues-000?style=flat&logo=github&logoColor=white)](https://github.com/jovanR9) 


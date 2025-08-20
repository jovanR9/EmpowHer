export interface Business {
  id: string;
  name: string;
  owner: string;
  description: string;
  category: string;
  logo: string;
  contact: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  seller: string;
  category: string;
  image: string;
  price: string;
}

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: number;
}

export interface Scheme {
  id: string;
  name: string;
  eligibility: string;
  benefit: string;
  category: string;
  link: string;
}

export interface Story {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  image?: string;
  tags: string[];
  likes: number;
  published: boolean;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  type: 'mentor' | 'mentee';
  availability: 'available' | 'busy';
  location: string;
  bio: string;
  skills: string[];
}

export interface ForumTopic {
  id: string;
  title: string;
  description: string;
  author: string;
  replies: number;
  lastActivity: string;
  category: string;
}

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'EmpowerHer Designs',
    owner: 'Alice Smith',
    description: 'Creating beautiful and empowering graphic designs for women-owned businesses.',
    category: 'Graphic Design',
    logo: 'https://via.placeholder.com/150/FFC0CB/000000?text=EH',
    contact: 'alice@empowerherdesigns.com',
  },
  {
    id: '2',
    name: 'SheCodes Tech Solutions',
    owner: 'Brenda Lee',
    description: 'Innovative web development and software solutions with a focus on social impact.',
    category: 'Technology',
    logo: 'https://via.placeholder.com/150/ADD8E6/000000?text=SC',
    contact: 'brenda@shecodestech.com',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Empower Mug',
    description: 'A ceramic mug with an inspiring "Empower" print.',
    seller: 'EmpowerHer Designs',
    category: 'Home Goods',
    image: 'https://via.placeholder.com/300/FFD700/000000?text=Mug',
    price: '$15.00',
  },
  {
    id: 'p2',
    name: 'Coding for Beginners Ebook',
    description: 'An easy-to-follow guide to learn programming from scratch.',
    seller: 'SheCodes Tech Solutions',
    category: 'Education',
    image: 'https://via.placeholder.com/300/90EE90/000000?text=Ebook',
    price: '$29.99',
  },
];

export const mockGuides: Guide[] = [
  {
    id: 'g1',
    title: 'Starting Your Own Business: A Step-by-Step Guide',
    excerpt: 'Everything you need to know to launch your entrepreneurial journey.',
    content: `This guide covers legal structures, business plans, funding, and marketing strategies. 

Step 1: Develop a Business Plan. 
Step 2: Secure Funding. 
Step 3: Register Your Business. 
Step 4: Build Your Team. 
Step 5: Market Your Business.`,
    category: 'Business',
    image: 'https://via.placeholder.com/400/FFB6C1/000000?text=BusinessGuide',
    readTime: 10,
  },
  {
    id: 'g2',
    title: 'Understanding Personal Finance for Entrepreneurs',
    excerpt: 'Manage your money effectively as a business owner.',
    content: `Learn about budgeting, saving, investing, and tax planning for small business owners. 

Key areas include: 
- Separating personal and business finances. 
- Creating a realistic budget. 
- Understanding tax obligations. 
- Planning for retirement.`,
    category: 'Financial',
    image: 'https://via.placeholder.com/400/87CEEB/000000?text=FinanceGuide',
    readTime: 8,
  },
];

export const mockSchemes: Scheme[] = [
  {
    id: 's1',
    name: 'Women Entrepreneurship Platform (WEP)',
    eligibility: 'Any aspiring or existing woman entrepreneur in India.',
    benefit: 'Provides access to funding, mentorship, and market linkages.',
    category: 'Financial',
    link: 'https://wep.gov.in/',
  },
  {
    id: 's2',
    name: 'Mudra Yojana for Women',
    eligibility: 'Women entrepreneurs seeking loans for micro-enterprises.',
    benefit: 'Collateral-free loans up to INR 10 Lakhs.',
    category: 'Financial',
    link: 'https://www.mudra.org.in/',
  },
];

export const mockStories: Story[] = [
  {
    id: 'story1',
    created_at: '2024-01-15T10:00:00Z',
    title: 'My Journey from Idea to Thriving Business',
    excerpt: 'Discover how I turned a simple idea into a successful enterprise with perseverance and passion.',
    body: 'This is the full body of the first inspiring story. It details the challenges, triumphs, and lessons learned along the way. It emphasizes the importance of community and mentorship.',
    author: 'Priya Sharma',
    image: 'https://via.placeholder.com/600/FFDAB9/000000?text=Story1',
    tags: ['startup', 'entrepreneurship', 'success'],
    likes: 120,
    published: true,
  },
  {
    id: 'story2',
    created_at: '2024-02-20T14:30:00Z',
    title: 'Overcoming Adversity: A Story of Resilience',
    excerpt: 'Learn how I navigated significant challenges to build a resilient business and a stronger self.',
    body: 'The complete narrative of overcoming business and personal hurdles. This story highlights the power of resilience, adaptability, and seeking support from the community.',
    author: 'Anjali Singh',
    image: 'https://via.placeholder.com/600/E0FFFF/000000?text=Story2',
    tags: ['resilience', 'challenges', 'growth'],
    likes: 85,
    published: true,
  },
];

export const mockProfiles: Profile[] = [
  {
    id: 'p1',
    name: 'Rina Singh',
    avatar: 'https://via.placeholder.com/150/FFC0CB/000000?text=RS',
    type: 'mentor',
    availability: 'available',
    location: 'Mumbai, India',
    bio: 'Experienced entrepreneur and business consultant with a passion for guiding new ventures.',
    skills: ['Business Strategy', 'Marketing', 'Funding', 'Mentorship'],
  },
  {
    id: 'p2',
    name: 'Deepa Patel',
    avatar: 'https://via.placeholder.com/150/ADD8E6/000000?text=DP',
    type: 'mentee',
    availability: 'busy',
    location: 'Bangalore, India',
    bio: 'Aspiring tech entrepreneur seeking guidance on product development and scaling.',
    skills: ['Software Development', 'Product Management', 'UI/UX'],
  },
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: 'f1',
    title: 'Balancing Work and Family Life as an Entrepreneur',
    description: 'Share your tips and challenges on managing both your business and personal life.',
    author: 'Community Admin',
    replies: 25,
    lastActivity: '2 hours ago',
    category: 'Work-Life Balance',
  },
  {
    id: 'f2',
    title: 'Funding Opportunities for Women-Led Startups',
    description: 'Discuss various grants, loans, and investment options available.',
    author: 'Financial Expert',
    replies: 18,
    lastActivity: '1 day ago',
    category: 'Funding',
  },
];
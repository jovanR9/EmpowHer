export interface Story {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  image: string;
  tags: string[];
  createdAt: string;
  likes: number;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  type: 'mentor' | 'mentee';
  location: string;
  skills: string[];
  availability: 'available' | 'busy';
}

export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  image: string;
}

export interface Scheme {
  id: string;
  name: string;
  eligibility: string;
  benefit: string;
  link: string;
  category: string;
}

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
  price: string;
  image: string;
  category: string;
  seller: string;
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

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'From Corporate Executive to Tech Entrepreneur',
    excerpt: 'How I left my comfortable executive role to build a tech startup that empowers women in STEM.',
    body: 'After 15 years in corporate finance, I made the bold decision to leave my executive position and start my own tech company. The journey wasn\'t easy, but it was worth every challenge. I faced skepticism from investors, struggled with imposter syndrome, and had to learn entirely new skills. But with determination and the support of an incredible network of women entrepreneurs, I built a platform that now helps over 10,000 women enter STEM careers. The key lessons I learned: believe in your vision, build a strong support network, and never be afraid to ask for help.',
    author: 'Sarah Chen',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['entrepreneurship', 'tech', 'career-change'],
    createdAt: '2024-01-15',
    likes: 142
  },
  {
    id: '2',
    title: 'Breaking Barriers in Male-Dominated Industries',
    excerpt: 'My experience as one of the few women in construction management and how I paved the way for others.',
    body: 'When I started in construction management 20 years ago, I was often the only woman in the room. I faced challenges ranging from being overlooked in meetings to having my expertise questioned. But I persisted, built strong relationships, and proved my worth through exceptional work. Today, I lead a team of 50+ professionals, including 15 women, and have implemented mentorship programs that have helped dozens of women enter and thrive in construction. The industry is changing, and I\'m proud to be part of that transformation.',
    author: 'Maria Rodriguez',
    image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['construction', 'leadership', 'mentorship'],
    createdAt: '2024-01-12',
    likes: 89
  },
  {
    id: '3',
    title: 'Single Mother to Medical School Graduate',
    excerpt: 'Balancing motherhood while pursuing my dream of becoming a doctor seemed impossible, but I made it work.',
    body: 'Becoming a single mother at 25 could have derailed my dreams of medical school, but instead, it gave me the motivation to work harder than ever. I studied during nap times, brought my daughter to study groups, and relied on an incredible support system of family and friends. There were nights I cried from exhaustion and days I questioned if I could continue. But every time I looked at my daughter, I remembered why I was doing this - to show her that no dream is too big. Seven years later, I graduated summa cum laude and am now a pediatric resident, inspiring other mothers to pursue their dreams.',
    author: 'Dr. Aisha Patel',
    image: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['education', 'motherhood', 'medicine'],
    createdAt: '2024-01-10',
    likes: 203
  },
  {
    id: '4',
    title: 'From Financial Struggles to Business Success',
    excerpt: 'How I built a million-dollar business from my kitchen table while managing financial hardship.',
    body: 'Five years ago, I was struggling to make ends meet as a single parent. I had $200 to my name and a business idea that everyone said wouldn\'t work. I started baking custom cakes from my tiny kitchen, working late into the night after my day job. Social media became my marketing tool, and word-of-mouth my greatest asset. Within two years, I had outgrown my kitchen and rented a small commercial space. Today, my bakery employs 12 people and generates over a million dollars in annual revenue. The secret? Never give up on your dreams, no matter how impossible they seem.',
    author: 'Jessica Williams',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['business', 'entrepreneurship', 'food'],
    createdAt: '2024-01-08',
    likes: 156
  },
  {
    id: '5',
    title: 'Overcoming Imposter Syndrome in Tech',
    excerpt: 'My journey from self-doubt to becoming a confident software engineer and tech leader.',
    body: 'As a self-taught developer, I constantly battled imposter syndrome. Despite landing a job at a top tech company, I felt like a fraud. Every code review felt like a test I was bound to fail. I started documenting my achievements, seeking feedback regularly, and connecting with other women in tech who shared similar experiences. I realized that feeling like an imposter often means you\'re pushing yourself out of your comfort zone - and that\'s where growth happens. Now, as a senior engineer, I mentor other women and help them recognize their own worth and capabilities.',
    author: 'Emily Zhang',
    image: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['tech', 'mental-health', 'self-development'],
    createdAt: '2024-01-05',
    likes: 178
  },
  {
    id: '6',
    title: 'Building a Support Network in a New Country',
    excerpt: 'How I created a thriving community of immigrant women entrepreneurs in my adopted homeland.',
    body: 'Moving to a new country as an immigrant woman entrepreneur felt incredibly isolating. I had great business ideas but no network, no understanding of local customs, and limited resources. Instead of letting this discourage me, I decided to create the support system I wished existed. I started a monthly meetup for immigrant women entrepreneurs, which grew from 5 women in a coffee shop to over 200 members across three cities. Together, we\'ve launched dozens of businesses, shared resources, and created a powerful network of support. Sometimes the community you need doesn\'t exist yet - so you create it.',
    author: 'Priya Sharma',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['immigration', 'community', 'networking'],
    createdAt: '2024-01-03',
    likes: 134
  },
  {
    id: '7',
    title: 'Turning Passion into Purpose: My Nonprofit Journey',
    excerpt: 'How I transformed my personal struggles into a nonprofit that has helped thousands of women.',
    body: 'My experience with domestic violence could have broken me, but instead, it became the foundation for my life\'s work. After rebuilding my life, I felt called to help other women in similar situations. I started with a small support group in my living room and gradually expanded to create a nonprofit organization that provides housing, legal aid, and job training to survivors. We\'ve helped over 2,000 women rebuild their lives and become independent. The work is challenging, but knowing that we\'re breaking cycles of abuse and empowering women to create new futures makes every struggle worthwhile.',
    author: 'Rachel Thompson',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['nonprofit', 'advocacy', 'social-impact'],
    createdAt: '2024-01-01',
    likes: 267
  },
  {
    id: '8',
    title: 'Age is Just a Number: Starting Over at 50',
    excerpt: 'How I launched my dream career in photography after two decades in accounting.',
    body: 'At 50, after 20 years in accounting, I felt unfulfilled and trapped in a career that no longer brought me joy. Photography had always been my passion, but I convinced myself it was too late to start over. The pandemic gave me time to reflect, and I decided age shouldn\'t limit my dreams. I invested in equipment, took online courses, and started building a portfolio. The transition wasn\'t easy - I took a significant pay cut and faced skepticism from some who questioned my "midlife crisis." Two years later, my photography business is thriving, I\'ve exhibited in galleries, and I\'ve never been happier. It\'s never too late to pursue your passion.',
    author: 'Linda Martinez',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['career-change', 'photography', 'age-positivity'],
    createdAt: '2023-12-28',
    likes: 198
  }
];

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Tech entrepreneur and startup mentor. Passionate about helping women break into STEM.',
    type: 'mentor',
    location: 'San Francisco, CA',
    skills: ['Tech Leadership', 'Startup Strategy', 'Product Management'],
    availability: 'available'
  },
  {
    id: '2',
    name: 'Dr. Aisha Patel',
    avatar: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Pediatric resident and advocate for work-life balance in medicine.',
    type: 'mentor',
    location: 'Boston, MA',
    skills: ['Medical Career', 'Work-Life Balance', 'Single Parenting'],
    availability: 'busy'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Construction manager breaking barriers in male-dominated industries.',
    type: 'mentor',
    location: 'Austin, TX',
    skills: ['Construction Management', 'Leadership', 'Industry Navigation'],
    availability: 'available'
  },
  {
    id: '4',
    name: 'Amanda Foster',
    avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Aspiring entrepreneur looking for guidance in business development.',
    type: 'mentee',
    location: 'Denver, CO',
    skills: ['Marketing', 'Social Media', 'Business Planning'],
    availability: 'available'
  },
  {
    id: '5',
    name: 'Jennifer Kim',
    avatar: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Recent coding bootcamp graduate seeking mentorship in software development.',
    type: 'mentee',
    location: 'Seattle, WA',
    skills: ['JavaScript', 'React', 'Python'],
    availability: 'available'
  },
  {
    id: '6',
    name: 'Lisa Johnson',
    avatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Career changer looking to transition into healthcare management.',
    type: 'mentee',
    location: 'Chicago, IL',
    skills: ['Project Management', 'Healthcare Administration', 'Team Leadership'],
    availability: 'busy'
  }
];

export const mockGuides: Guide[] = [
  {
    id: '1',
    title: 'Financial Planning for Entrepreneurs',
    excerpt: 'Essential financial strategies for women starting their own businesses.',
    content: 'Starting a business requires careful financial planning. This comprehensive guide covers budgeting, cash flow management, funding options, and long-term financial strategies...',
    category: 'Financial',
    readTime: 8,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Understanding Your Legal Rights in the Workplace',
    excerpt: 'A comprehensive guide to workplace rights, discrimination laws, and legal protections.',
    content: 'Every woman should know her legal rights in the workplace. This guide covers harassment policies, discrimination laws, maternity rights, and how to seek legal help...',
    category: 'Legal',
    readTime: 12,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    title: 'Investment Basics for Beginners',
    excerpt: 'Learn the fundamentals of investing and building long-term wealth.',
    content: 'Investing can seem intimidating, but it\'s crucial for building long-term wealth. This guide breaks down investment basics, risk management, and portfolio building...',
    category: 'Financial',
    readTime: 10,
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Starting an LLC: A Step-by-Step Guide',
    excerpt: 'Everything you need to know about forming a Limited Liability Company.',
    content: 'Forming an LLC is one of the most popular business structures for entrepreneurs. This guide walks you through the entire process, from choosing a name to filing paperwork...',
    category: 'Legal',
    readTime: 15,
    image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    title: 'Retirement Planning for Women',
    excerpt: 'Addressing the unique retirement challenges women face and how to overcome them.',
    content: 'Women face unique challenges in retirement planning, including wage gaps and career breaks. This guide provides strategies for maximizing retirement savings and planning for the future...',
    category: 'Financial',
    readTime: 9,
    image: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Intellectual Property Protection',
    excerpt: 'Protecting your ideas, inventions, and creative works through IP law.',
    content: 'Understanding intellectual property is crucial for entrepreneurs and creators. This guide covers patents, trademarks, copyrights, and trade secrets...',
    category: 'Legal',
    readTime: 11,
    image: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    title: 'Budgeting and Expense Tracking',
    excerpt: 'Master your finances with effective budgeting and expense tracking strategies.',
    content: 'Creating and maintaining a budget is the foundation of financial health. This guide provides practical tools and strategies for tracking expenses and managing your money...',
    category: 'Financial',
    readTime: 7,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    title: 'Employment Contract Essentials',
    excerpt: 'What to look for and negotiate in employment contracts and agreements.',
    content: 'Understanding your employment contract is crucial for protecting your interests. This guide covers key terms, negotiation strategies, and red flags to watch for...',
    category: 'Legal',
    readTime: 13,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '9',
    title: 'Tax Planning for Small Business Owners',
    excerpt: 'Essential tax strategies and deductions for women entrepreneurs.',
    content: 'Proper tax planning can save your business thousands of dollars. This guide covers business deductions, quarterly payments, and year-end tax strategies...',
    category: 'Financial',
    readTime: 14,
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'Women Entrepreneur Development Program',
    eligibility: 'Women-owned businesses with <5 years operation',
    benefit: 'Up to $50,000 in grants + mentorship',
    link: 'https://example.gov/wedp',
    category: 'Business'
  },
  {
    id: '2',
    name: 'STEM Education Scholarships',
    eligibility: 'Women pursuing STEM degrees',
    benefit: 'Tuition coverage up to $25,000/year',
    link: 'https://example.gov/stem-scholarships',
    category: 'Education'
  },
  {
    id: '3',
    name: 'Small Business Administration Loans',
    eligibility: 'Small businesses with <500 employees',
    benefit: 'Low-interest loans up to $5M',
    link: 'https://sba.gov/loans',
    category: 'Finance'
  },
  {
    id: '4',
    name: 'Childcare Support for Working Mothers',
    eligibility: 'Working mothers with household income <$75K',
    benefit: 'Up to 75% childcare cost coverage',
    link: 'https://example.gov/childcare',
    category: 'Support'
  },
  {
    id: '5',
    name: 'Women in Technology Initiative',
    eligibility: 'Women in tech roles or training',
    benefit: 'Training programs + job placement assistance',
    link: 'https://example.gov/women-tech',
    category: 'Career'
  },
  {
    id: '6',
    name: 'Legal Aid for Domestic Violence Survivors',
    eligibility: 'Survivors of domestic violence',
    benefit: 'Free legal representation and counseling',
    link: 'https://example.gov/legal-aid',
    category: 'Legal'
  }
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'EcoBeauty Studio',
    owner: 'Sarah Green',
    description: 'Sustainable beauty salon using organic and eco-friendly products.',
    category: 'Beauty & Wellness',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'sarah@ecobeauty.com'
  },
  {
    id: '2',
    name: 'TechWomen Consulting',
    owner: 'Maria Rodriguez',
    description: 'IT consulting firm specializing in helping women-owned businesses with technology solutions.',
    category: 'Technology',
    logo: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'maria@techwomen.com'
  },
  {
    id: '3',
    name: 'Artisan Bakery Co.',
    owner: 'Jessica Williams',
    description: 'Specialty bakery creating custom cakes and pastries for all occasions.',
    category: 'Food & Beverage',
    logo: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'jessica@artisanbakery.com'
  },
  {
    id: '4',
    name: 'Wellness Warriors',
    owner: 'Dr. Aisha Patel',
    description: 'Holistic wellness center offering yoga, meditation, and nutrition counseling.',
    category: 'Health & Fitness',
    logo: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'aisha@wellnesswarriors.com'
  },
  {
    id: '5',
    name: 'Creative Kids Learning',
    owner: 'Linda Martinez',
    description: 'Educational services and tutoring with focus on creative learning methods.',
    category: 'Education',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'linda@creativekids.com'
  },
  {
    id: '6',
    name: 'Sustainable Fashion Studio',
    owner: 'Emma Chen',
    description: 'Fashion design studio creating eco-friendly and ethically made clothing.',
    category: 'Fashion',
    logo: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'emma@sustainablefashion.com'
  },
  {
    id: '7',
    name: 'Financial Freedom Advisors',
    owner: 'Priya Sharma',
    description: 'Financial planning services specifically designed for women entrepreneurs.',
    category: 'Financial Services',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'priya@financialfreedom.com'
  },
  {
    id: '8',
    name: 'Support Network Legal',
    owner: 'Rachel Thompson',
    description: 'Legal services focusing on family law, employment issues, and small business needs.',
    category: 'Legal Services',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'rachel@supportnetworklegal.com'
  },
  {
    id: '9',
    name: 'HomeSpace Design',
    owner: 'Jennifer Kim',
    description: 'Interior design studio creating beautiful and functional living spaces.',
    category: 'Design',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150',
    contact: 'jennifer@homespacedesign.com'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Organic Soaps',
    description: 'Natural soaps made with organic ingredients and essential oils.',
    price: '$12.99',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Beauty',
    seller: 'EcoBeauty Studio'
  },
  {
    id: '2',
    name: 'Custom Wedding Cakes',
    description: 'Beautifully designed custom cakes for your special day.',
    price: 'Starting at $299',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Food',
    seller: 'Artisan Bakery Co.'
  },
  {
    id: '3',
    name: 'Yoga Classes Package',
    description: '10-class yoga package for beginners and advanced practitioners.',
    price: '$150',
    image: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Wellness',
    seller: 'Wellness Warriors'
  },
  {
    id: '4',
    name: 'Sustainable Fashion Collection',
    description: 'Ethically made clothing using sustainable materials.',
    price: '$89 - $299',
    image: 'https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Fashion',
    seller: 'Sustainable Fashion Studio'
  },
  {
    id: '5',
    name: 'Financial Planning Consultation',
    description: 'Comprehensive financial planning session with certified advisor.',
    price: '$199',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Services',
    seller: 'Financial Freedom Advisors'
  },
  {
    id: '6',
    name: 'Home Interior Design Package',
    description: 'Complete room makeover including design consultation and shopping list.',
    price: '$899',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Design',
    seller: 'HomeSpace Design'
  },
  {
    id: '7',
    name: 'Technology Setup Service',
    description: 'Complete technology setup and training for small businesses.',
    price: '$299',
    image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Technology',
    seller: 'TechWomen Consulting'
  },
  {
    id: '8',
    name: 'Educational Tutoring Sessions',
    description: 'One-on-one tutoring sessions using creative learning methods.',
    price: '$75/hour',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Education',
    seller: 'Creative Kids Learning'
  },
  {
    id: '9',
    name: 'Legal Consultation Package',
    description: 'Initial legal consultation for small business or family matters.',
    price: '$250',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Legal',
    seller: 'Support Network Legal'
  },
  {
    id: '10',
    name: 'Wellness Retreat Weekend',
    description: 'Weekend retreat focusing on mindfulness, yoga, and self-care.',
    price: '$399',
    image: 'https://images.pexels.com/photos/5452270/pexels-photo-5452270.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Wellness',
    seller: 'Wellness Warriors'
  },
  {
    id: '11',
    name: 'Artisan Chocolate Collection',
    description: 'Premium handmade chocolates perfect for gifts or personal indulgence.',
    price: '$35',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Food',
    seller: 'Artisan Bakery Co.'
  },
  {
    id: '12',
    name: 'Natural Skincare Set',
    description: 'Complete skincare routine with organic and cruelty-free products.',
    price: '$89',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Beauty',
    seller: 'EcoBeauty Studio'
  }
];

export const mockForumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Balancing Work and Family Life',
    description: 'Tips and strategies for managing career aspirations while raising a family.',
    author: 'Sarah M.',
    replies: 24,
    lastActivity: '2 hours ago',
    category: 'Work-Life Balance'
  },
  {
    id: '2',
    title: 'Funding Options for Female Entrepreneurs',
    description: 'Discussion about grants, loans, and investment opportunities specifically for women.',
    author: 'Maria L.',
    replies: 18,
    lastActivity: '4 hours ago',
    category: 'Business'
  },
  {
    id: '3',
    title: 'Overcoming Imposter Syndrome',
    description: 'Sharing experiences and strategies for dealing with self-doubt in professional settings.',
    author: 'Jennifer K.',
    replies: 31,
    lastActivity: '6 hours ago',
    category: 'Personal Development'
  },
  {
    id: '4',
    title: 'Networking Events and Opportunities',
    description: 'Share information about upcoming networking events and professional meetups.',
    author: 'Lisa R.',
    replies: 12,
    lastActivity: '1 day ago',
    category: 'Networking'
  },
  {
    id: '5',
    title: 'Career Transition Success Stories',
    description: 'Share your career change journey and inspire others making similar transitions.',
    author: 'Amanda F.',
    replies: 27,
    lastActivity: '1 day ago',
    category: 'Career Change'
  },
  {
    id: '6',
    title: 'Building Confidence in Leadership Roles',
    description: 'Strategies for developing leadership skills and confidence in management positions.',
    author: 'Rachel T.',
    replies: 19,
    lastActivity: '2 days ago',
    category: 'Leadership'
  }
];
import React, { useState } from 'react';

interface ProjectsPageProps {
  openContactWindow?: () => void;
}

const PROJECTS = [
  {
    id: 'mindos',
    title: 'MindOS',
    subtitle: 'Personal AI Operating System',
    category: 'ai',
    image: '../images/mindos.png',
    tagline: 'A personal OS with 29 live MCP tools and Claude wired into your real data',
    technologies: ['Next.js 14','TypeScript','PostgreSQL','Supabase','Prisma','Claude API','MCP Server','Tailwind CSS','Recharts','Vercel'],
    description: 'A personal operating system consolidating tasks, learnings, logs, finances, and goals — with Claude connected via a live MCP integration giving context-aware AI advice across sessions.',
    features: [
      { title: 'Custom MCP Server', description: '29 live tools with real Postgres read/write access across a 17-table schema via JSON-RPC over SSE', icon: 'server', impact: 'Live AI context' },
      { title: 'Today Dashboard', description: 'Daily command center with Kanban, streak counters, and a 91-day contribution heatmap', icon: 'calendar', impact: 'At-a-glance clarity' },
      { title: 'AI Reflections', description: 'Evening journal with Claude reflections, auto-summaries for learning vault entries, and weekly progress summaries', icon: 'brain', impact: 'Persistent AI memory' },
      { title: 'Finance Tracker', description: 'Expense tracker with 6-month charts, RACI matrix, quick-capture bar, and drag-and-drop Kanban with WIP limits', icon: 'chart', impact: 'Full life OS' },
    ],
  },
  {
    id: 'ciphertrust',
    title: 'CipherTrust',
    subtitle: 'Secure Data Pipeline — CyberGuard UAV Shield',
    category: 'security',
    image: '../images/UAV.png',
    tagline: 'Military-grade multi-tenant encryption with sub-50ms real-time threat feeds',
    technologies: ['Go 1.21+','Gorilla Mux','Gorilla WebSocket','AES-256-GCM','JWT','PKI','React 18','Vite','Tailwind CSS'],
    description: 'Production-ready multi-tenant encryption and data protection system securing real-time drone threat data across military, civil aviation, and critical infrastructure domains.',
    features: [
      { title: 'AES-256-GCM Encryption', description: 'End-to-end encryption with automated key rotation and HSM-protected key management architecture', icon: 'encrypt', impact: 'Military-grade' },
      { title: 'Zero Trust PKI Auth', description: 'Zero Trust authentication with JWT, RBAC, and multi-tenant isolation using dedicated encryption keys per tenant', icon: 'shield', impact: 'Maximum security' },
      { title: 'Real-Time WebSocket', description: 'Sub-50ms WebSocket threat feeds with policy-based cross-tenant sharing and configurable PII anonymization', icon: 'radar', impact: 'Ultra-low latency' },
      { title: 'Compliance Ready', description: 'Immutable audit logging built to ITAR, NDAA, GDPR, SOC 2, and ISO 27001 constraints', icon: 'lock', impact: 'Enterprise compliant' },
    ],
  },
  {
    id: 'arla',
    title: 'ARLA',
    subtitle: 'Autonomous RL Agent for FPS Games',
    category: 'ai',
    image: '../images/arla.png',
    tagline: 'AI that learns to play DOOM through reinforcement learning from raw pixels',
    technologies: ['Python','PyTorch','Stable Baselines3','PPO','ViZDoom','OpenAI Gym','OpenCV','React.js','Flask','TensorBoard'],
    description: 'A self-learning RL agent that plays classic DOOM autonomously via PPO algorithm trained from raw pixel input, with a React dashboard for monitoring training sessions.',
    features: [
      { title: 'PPO from Raw Pixels', description: 'CNN-based feature extraction from stacked screen buffer frames with no hand-crafted state representation', icon: 'cpu', impact: 'True pixel learning' },
      { title: 'Custom Reward Shaping', description: 'Reward system across kills, health pickups, damage dealt, survival time, and idle penalties for adaptive learning', icon: 'bolt', impact: 'Adaptive learning' },
      { title: 'Custom DOOM Map', description: 'DoomBuilder environment with 8 multiplayer spawn points. Human vs Agent and Agent vs Bots modes', icon: 'grid', impact: 'Multiplayer AI' },
      { title: 'Live Dashboard', description: 'React + Flask dashboard with Train, Test, and Play tabs plus live TensorBoard integration for monitoring', icon: 'chart', impact: 'Real-time tracking' },
    ],
  },
  {
    id: 'accompany',
    title: 'AccompanyAI',
    subtitle: 'Mental Wellness Platform',
    category: 'ai',
    image: '../images/accompany.png',
    tagline: 'EEG mood prediction meets AI therapy with personality-driven companions',
    technologies: ['Scikit-learn','Random Forest','Gemini','Flask','Flask-SocketIO','MongoDB','JWT','React 18','Socket.IO','Spline'],
    description: 'A full stack mental health companion combining ML, generative AI, and real-time peer collaboration for personalized emotional support.',
    features: [
      { title: 'EEG Mood Prediction', description: 'Random Forest model trained on Alpha, Beta, Gamma, Delta brainwave band values for real-time mood classification', icon: 'brain', impact: 'Biometric detection' },
      { title: 'Multi-Persona AI Therapy', description: '5 personality-driven companions — Batman, Elsa, Guardian, Sibling, Friend — powered by Gemini', icon: 'persona', impact: 'Personalized support' },
      { title: 'Collaborative Growth', description: 'Real-time peer chat via Socket.IO with a shared virtual tree that grows as users achieve milestones', icon: 'sparkle', impact: 'Social wellness' },
      { title: 'Gratitude Journal', description: 'Daily gratitude journaling with streak tracking and Therapist Finder with Google Maps integration', icon: 'calendar', impact: 'Habit building' },
    ],
  },
  {
    id: 'anvaya',
    title: 'Anvaya',
    subtitle: '3D Virtual AYUSH Garden',
    category: 'fullstack',
    image: '../images/anvaya.png',
    tagline: 'Explorable 3D medicinal plant garden rooted in India"s AYUSH traditions',
    technologies: ['Three.js (r171)','GLTFLoader','RGBE HDR','Vite','React 18','Tailwind CSS','Node.js','Express','MongoDB','Leaflet.js','Cloudinary'],
    description: 'An interactive 3D web experience for exploring a virtual medicinal plant garden with third-person character movement and an animated Yoga character.',
    features: [
      { title: '3D Garden World', description: 'Fully explorable garden with third-person WASD + mouse orbit movement. Click any plant to get Ayurvedic uses', icon: 'grid', impact: 'Immersive exploration' },
      { title: 'Animated Yoga', description: 'Animated character with real-time Surya Namaskar playback using Three.js skeletal animation', icon: 'sparkle', impact: 'Cultural experience' },
      { title: 'Plant Catalog', description: 'Full CRUD catalog filterable by AYUSH system with JWT auth and protected routes', icon: 'layers', impact: 'Rich knowledge base' },
      { title: 'Spline Landing', description: 'Spline 3D landing page with graceful mobile fallback and Cloudinary-powered media storage', icon: 'palette', impact: 'Premium first impression' },
    ],
  },
  {
    id: 'waterquality',
    title: 'Water Quality AI',
    subtitle: 'Community Groundwater Assessor',
    category: 'ai',
    image: '../images/water.png',
    tagline: 'XGBoost-powered contamination classifier with real-time Leaflet heatmaps',
    technologies: ['XGBoost','Scikit-learn','PCA','StandardScaler','Flask','React 18','Recharts','Leaflet.js','SQLite'],
    description: 'A full stack web app for communities to submit groundwater samples, classify them via a trained XGBoost model, and visualize contamination risk on an interactive heatmap.',
    features: [
      { title: 'XGBoost Classifier', description: 'Classifies water into irrigation categories (C1S1 to C4S4) using 16 chemical parameters with PCA-reduced inference', icon: 'brain', impact: 'Accurate ML scoring' },
      { title: 'Live Heatmap', description: 'Leaflet.js contamination heatmap with real-time risk intensity overlay from submitted samples', icon: 'chart', impact: 'Visual risk mapping' },
      { title: 'Spread Estimator', description: 'Haversine-based contaminant spread estimator projecting contamination radius over 7 days', icon: 'radar', impact: 'Predictive safety' },
      { title: 'Admin Dashboard', description: 'Charts, trend analysis, and 3 years of real Tamil Nadu groundwater CSV data (2018–2020) as training source', icon: 'layers', impact: 'Data-driven insights' },
    ],
  },
  {
    id: 'eventhive',
    title: 'EventHive BLR',
    subtitle: 'Event Discovery & Ticketing App',
    category: 'fullstack',
    image: '../images/eventhive.png',
    tagline: 'Mobile-first event discovery with real-time Firestore ticketing and QR passes',
    technologies: ['React Native','Expo','TypeScript','Firebase Auth','Firestore','Leaflet.js','react-native-qrcode-svg','NativeWind'],
    description: 'A full stack mobile app for Bangaloreans to discover, RSVP, and get tickets to events across the city with an interactive dark mode map.',
    features: [
      { title: 'Interactive Map', description: 'Dark mode Leaflet map via WebView with bidirectional postMessage bridging for seamless native-web comms', icon: 'grid', impact: 'Spatial discovery' },
      { title: 'Real-Time Ticketing', description: 'Firestore ticketing with atomic increments to prevent race conditions during high-demand RSVPs', icon: 'bolt', impact: 'Race-condition safe' },
      { title: 'QR Code Passes', description: 'Auto-generated scannable QR code passes attached to each confirmed ticket and stored in profile history', icon: 'qr', impact: 'Seamless entry' },
      { title: 'Smart Search', description: 'Search and filter by category, title, and venue with full ticket history and stats in profile screen', icon: 'chart', impact: 'Fast discovery' },
    ],
  },
  {
    id: 'codeloom',
    title: 'CodeLoom',
    subtitle: 'Collaborative Project Management',
    category: 'fullstack',
    image: '../images/Loom.png',
    tagline: 'Git-based version control meets real-time IDE with pre-commit security scanning',
    technologies: ['Flask','Python','MongoDB','PyMongo','GridFS','React','VirusTotal API','RBAC','scrypt','pygit2'],
    description: 'A threat intelligence-driven collaborative coding platform combining Git-based version control, real-time IDE, and pre-commit security scanning.',
    features: [
      { title: 'Version Control', description: 'Git-based repository management: create, clone, branch, commit, and rollback. Merge request workflow with owner review', icon: 'branch', impact: 'Full Git workflow' },
      { title: 'Real-Time Collaboration', description: 'Multi-user collaborative coding with instant workspace sync powered by WebSocket communication', icon: 'code', impact: 'Live code sharing' },
      { title: 'Security Scanning', description: 'Pre-commit security checks via VirusTotal API — code cannot merge until it passes threat analysis', icon: 'shield', impact: 'Zero malicious merges' },
      { title: 'RBAC + GridFS', description: 'Owner vs Collaborator permission sets with MongoDB GridFS for file storage inside repositories', icon: 'lock', impact: 'Granular access control' },
    ],
  },
  {
    id: 'redgit',
    title: 'RedGit',
    subtitle: 'Git Implementation in Go',
    category: 'fullstack',
    image: '../images/redgit.png',
    tagline: 'Fully functional Git built in Go from scratch — no external libraries',
    technologies: ['Go','stdlib only','SHA-1','zlib compression','Content-Addressable Storage','Binary Index Format'],
    description: 'A fully functional Git implementation written in Go from scratch with no external Git libraries — covering objects, DAG commits, branching, and three-way merge.',
    features: [
      { title: 'Object Storage', description: 'Content-addressable blob, tree, and commit objects stored by SHA-1 hash with zlib compression', icon: 'layers', impact: 'True Git internals' },
      { title: 'DAG Commit Log', description: 'Directed acyclic graph of commits with log and log --oneline, branch create, checkout, and checkout -b', icon: 'git', impact: 'Full history traversal' },
      { title: 'Three-Way Merge', description: 'Three-way merge algorithm with conflict detection and conflict markers compatible with real Git', icon: 'branch', impact: 'Real merge semantics' },
      { title: 'Binary Index', description: 'Binary format staging index compatible with real Git, enabling real-world interoperability', icon: 'code', impact: 'Git-compatible format' },
    ],
  },
  {
    id: 'erp',
    title: 'College ERP',
    subtitle: 'Academic Management System',
    category: 'fullstack',
    image: '../images/ERP.png',
    tagline: 'Complete academic lifecycle management for students, teachers, and admins',
    technologies: ['Django','SQLite','Django AbstractUser','Django Admin','Djoser','Django Signals','Django Templates'],
    description: 'A full-featured college ERP handling the complete academic lifecycle with role-based views for students, teachers, and admins.',
    features: [
      { title: 'MVT Architecture', description: 'Django MVT with SQLite, AbstractUser roles, and Django Signals auto-creating marks and attendance slots on assignment', icon: 'layers', impact: 'Automated scaffolding' },
      { title: 'Attendance System', description: 'Daily per-class attendance marking with 75% threshold calculator and visual weekly timetable', icon: 'calendar', impact: 'Threshold tracking' },
      { title: 'Marks Management', description: 'Marks across 3 internal tests, 2 events, and semester end exam with auto-calculated CIE scores', icon: 'chart', impact: 'Auto-calculated grades' },
      { title: 'Admin Tools', description: 'Custom admin semester reset tool for bulk attendance regeneration and unit tests for models and views', icon: 'key', impact: 'Bulk operations' },
    ],
  },
  {
    id: 'movierec',
    title: 'Movie Recommender',
    subtitle: 'Content-Based + Sentiment Analysis',
    category: 'ai',
    image: '../images/movies.png',
    tagline: 'Cosine similarity recommendations with live IMDb sentiment classification',
    technologies: ['Python','Flask','Scikit-learn','CountVectorizer','cosine_similarity','TF-IDF','BeautifulSoup4','TMDB API','Bootstrap 5','jQuery','AJAX'],
    description: 'A content-based movie recommendation system that suggests similar films and classifies scraped IMDb reviews as positive or negative in real time.',
    features: [
      { title: 'Content-Based Filtering', description: 'CountVectorizer and cosine similarity across genres, cast, and director features with real-time autocomplete', icon: 'chart', impact: 'Accurate recommendations' },
      { title: 'TMDB Integration', description: 'TMDB API integration for posters, metadata, and cast information with no full-page reloads via AJAX', icon: 'sparkle', impact: 'Rich metadata' },
      { title: 'Sentiment Classifier', description: 'IMDb review scraping via BeautifulSoup4 with per-review sentiment classification using a pre-trained NLP model', icon: 'brain', impact: 'Live review scoring' },
      { title: 'AJAX-Powered UI', description: 'Dynamic results with jQuery AJAX — recommendations and sentiment load without page refresh', icon: 'bolt', impact: 'Snappy experience' },
    ],
  },
];

const CATEGORIES = [
  { id: 'all', label: 'ALL PROJECTS', count: PROJECTS.length },
  { id: 'fullstack', label: 'FULL STACK', count: PROJECTS.filter(p => p.category === 'fullstack').length },
  { id: 'ai', label: 'AI / ML', count: PROJECTS.filter(p => p.category === 'ai').length },
  { id: 'security', label: 'SECURITY', count: PROJECTS.filter(p => p.category === 'security').length },
];

// Premium SVG icons — no emoji, all inline SVG matching the theme
const FeatureIcon = ({ type, active }: { type: string; active: boolean }) => {
  const color = active ? '#000' : '#f0ce32';
  const dim = active ? 'rgba(0,0,0,0.25)' : 'rgba(240,206,50,0.25)';

  const icons: Record<string, React.ReactNode> = {
    branch: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="5" cy="4" r="2" stroke={color} strokeWidth="1.5"/>
        <circle cx="5" cy="16" r="2" stroke={color} strokeWidth="1.5"/>
        <circle cx="15" cy="8" r="2" stroke={color} strokeWidth="1.5"/>
        <path d="M5 6v8M5 6c0 3 10 2 10 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    code: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polyline points="7,5 2,10 7,15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="13,5 18,10 13,15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="11" y1="3" x2="9" y2="17" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    lock: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="9" width="12" height="9" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M7 9V6.5a3 3 0 016 0V9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="14" r="1.5" fill={color}/>
      </svg>
    ),
    snapshot: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5"/>
        <polyline points="10,6 10,10 13,13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 4l2 2M17 4l-2 2" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    cpu: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="6" y="6" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="8" y="8" width="4" height="4" fill={color} opacity="0.3"/>
        <path d="M8 6V3M12 6V3M8 17v-3M12 17v-3M6 8H3M6 12H3M17 8h-3M17 12h-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    grid: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" stroke={color} strokeWidth="1.5"/>
        <rect x="11" y="3" width="6" height="6" stroke={color} strokeWidth="1.5"/>
        <rect x="3" y="11" width="6" height="6" stroke={color} strokeWidth="1.5"/>
        <rect x="11" y="11" width="6" height="6" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polyline points="3,15 7,9 11,12 17,5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="3" y1="17" x2="17" y2="17" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="9" r="1.5" fill={color}/>
        <circle cx="11" cy="12" r="1.5" fill={color}/>
        <circle cx="17" cy="5" r="1.5" fill={color}/>
      </svg>
    ),
    bolt: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <polyline points="12,2 6,11 10,11 8,18 14,9 10,9 12,2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15"/>
      </svg>
    ),
    persona: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3.5" stroke={color} strokeWidth="1.5"/>
        <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 3.5c1.5.5 2.5 2 2.5 3.5" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    chat: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H7l-4 3V5a1 1 0 011-1z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="7" y1="8" x2="13" y2="8" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="11" x2="11" y2="11" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    brain: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4C10 4 7 3 5.5 5S4 9 5 10.5s3 2.5 5 2.5V4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 4c0 0 3-1 4.5 1S16 9 15 10.5s-3 2.5-5 2.5V4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 13v4M8 17h4" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="8" r="1" fill={color}/>
        <circle cx="13" cy="8" r="1" fill={color}/>
      </svg>
    ),
    sparkle: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4.93 4.93l2.83 2.83M12.24 12.24l2.83 2.83M4.93 15.07l2.83-2.83M12.24 7.76l2.83-2.83" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="2" fill={color} opacity="0.4"/>
      </svg>
    ),
    layers: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18 7l-8 5L2 7z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 12l8 5 8-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 9.5l8 5 8-5" stroke={dim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    calendar: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="14" rx="1" stroke={color} strokeWidth="1.5"/>
        <line x1="3" y1="8" x2="17" y2="8" stroke={color} strokeWidth="1.5"/>
        <line x1="7" y1="2" x2="7" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="2" x2="13" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="7" y="11" width="2" height="2" fill={dim}/>
        <rect x="11" y="11" width="2" height="2" fill={dim}/>
      </svg>
    ),
    key: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7.5" cy="8.5" r="4" stroke={color} strokeWidth="1.5"/>
        <path d="M11 10l6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M15 14l-1.5 1.5M13 16l-1.5 1.5" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    palette: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3a7 7 0 100 14c1.5 0 2-1 2-2s-1-1.5-1-2.5c0-2 3-2 3-4.5A5.5 5.5 0 0010 3z" stroke={color} strokeWidth="1.5"/>
        <circle cx="7" cy="9" r="1" fill={color}/>
        <circle cx="10" cy="6" r="1" fill={color}/>
        <circle cx="13" cy="9" r="1" fill={dim}/>
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 3 14 3 10V5l7-3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} fillOpacity="0.08"/>
        <polyline points="7,10 9,12 13,8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    cloud: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 14a4 4 0 010-8 5 5 0 019.9 1A3.5 3.5 0 0115 14H5z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 14v3M8 17h4" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    radar: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5" opacity="0.3"/>
        <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        <circle cx="10" cy="10" r="1.5" fill={color}/>
        <line x1="10" y1="10" x2="15" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <circle cx="14" cy="7" r="1" fill={color} opacity="0.6"/>
      </svg>
    ),
    encrypt: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="8" width="14" height="10" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M7 8V6a3 3 0 016 0v2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="13" r="2" stroke={color} strokeWidth="1.5"/>
        <line x1="10" y1="15" x2="10" y2="17" stroke={dim} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };

  return (
    <div className="w-10 h-10 border-[2px] flex items-center justify-center flex-shrink-0"
      style={{ borderColor: active ? 'rgba(0,0,0,0.2)' : 'rgba(240,206,50,0.2)', background: active ? 'rgba(0,0,0,0.06)' : 'rgba(240,206,50,0.05)' }}>
      {icons[type] ?? icons['code']}
    </div>
  );
};

export const ProjectsPage = ({ openContactWindow }: ProjectsPageProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selected, setSelected] = useState<string|null>(null);

  const filtered = activeCategory === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);
  const selectedProject = PROJECTS.find(p => p.id === selected);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fragment+Mono:ital@0;1&family=Lexend:wght@200;300;400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes panelIn { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);} }
        .pj-card { animation: fadeUp 0.4s ease both; }
        .pj-panel { animation: panelIn 0.35s ease both; }
        .pj-card:nth-child(1){animation-delay:0.05s}
        .pj-card:nth-child(2){animation-delay:0.1s}
        .pj-card:nth-child(3){animation-delay:0.15s}
        .pj-card:nth-child(4){animation-delay:0.2s}
        .pj-card:nth-child(5){animation-delay:0.25s}
        .scanline::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(transparent 50%,rgba(240,206,50,0.015) 50%);
          background-size:100% 4px;
          pointer-events:none;
        }
      `}</style>

      <div className="scanline min-h-screen bg-[#0d0d0d] flex flex-col relative" style={{fontFamily:"'Lexend',sans-serif"}}>

        {/* TOPBAR */}
        <div className="flex items-stretch h-[52px] border-b-[3px] border-[#f0ce32]/30 flex-shrink-0">
          <div className="px-6 border-r-[3px] border-[#f0ce32]/30 flex items-center bg-[#f0ce32]">
            <span className="text-black text-xl tracking-[0.12em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>OMM</span>
          </div>
          <div className="flex-1 flex items-center px-4 md:px-6 gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f0ce32] animate-pulse flex-shrink-0" />
          </div>
          <div className="px-4 md:px-6 border-l-[3px] border-[#f0ce32]/30 flex items-center">
            <span className="text-[11px] text-[#f0ce32]/40 tracking-[0.12em]" style={{fontFamily:"'Fragment Mono',monospace"}}>{PROJECTS.length} PROJECTS</span>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex border-b-[3px] border-[#f0ce32]/30 overflow-x-auto flex-shrink-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSelected(null); }}
              className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-4 border-r-[3px] border-[#f0ce32]/30 last:border-r-0 transition-all duration-200 flex-shrink-0 ${activeCategory===cat.id?'bg-[#f0ce32] text-black':'text-[#f0ce32]/50 hover:text-[#f0ce32] hover:bg-[#f0ce32]/5'}`}
              style={{fontFamily:"'Bebas Neue',sans-serif"}}
            >
              <span className="text-[14px] md:text-[16px] tracking-[0.15em]">{cat.label}</span>
              <span className={`text-[11px] px-2 py-0.5 border ${activeCategory===cat.id?'border-black/30 text-black/60':'border-[#f0ce32]/20 text-[#f0ce32]/30'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="flex-1 overflow-auto">

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div
                key={project.id}
                className={`pj-card group border-b-[3px] border-r-0 md:border-r-[3px] border-[#f0ce32]/20 cursor-pointer transition-all duration-200 relative overflow-hidden flex flex-col ${selected===project.id?'bg-[#f0ce32]':'hover:bg-[#f0ce32]/5'}`}
                onClick={() => setSelected(selected===project.id ? null : project.id)}
              >
                {/* LEFT ACCENT BAR */}
                <div className={`absolute top-0 left-0 w-1 h-full transition-all duration-200 z-10 ${selected===project.id?'bg-black':'bg-[#f0ce32]/0 group-hover:bg-[#f0ce32]/40'}`} />

                {/* COVER IMAGE — top 20% */}
                <div className="relative w-full overflow-hidden flex-shrink-0" style={{ height: '120px' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: selected===project.id ? 'grayscale(100%) contrast(1.1)' : 'grayscale(100%) brightness(0.55) contrast(1.1)' }}
                  />
                  {/* overlay tint */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ${selected===project.id ? 'bg-[#f0ce32]/30' : 'bg-[#0d0d0d]/40 group-hover:bg-[#f0ce32]/10'}`}
                  />
                  {/* category badge on image */}
                  <div className={`absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase px-2 py-1 border backdrop-blur-sm ${selected===project.id?'border-black/30 text-black/70 bg-black/10':'border-[#f0ce32]/30 text-[#f0ce32]/70 bg-black/40'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>
                    {project.category}
                  </div>
                </div>

                {/* CARD CONTENT — remaining 80% */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className={`text-[28px] md:text-[32px] leading-none tracking-[0.04em] mb-1 transition-colors ${selected===project.id?'text-black':'text-white group-hover:text-[#f0ce32]'}`} style={{fontFamily:"'Bebas Neue',sans-serif"}}>{project.title}</div>
                  <div className={`text-[11px] mb-3 transition-colors ${selected===project.id?'text-black/60':'text-white/30'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{project.subtitle}</div>
                  <p className={`text-[12px] font-light leading-[1.7] mb-4 transition-colors ${selected===project.id?'text-black/70':'text-white/40'}`}>{project.tagline}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map(tech => (
                      <span key={tech} className={`text-[9px] px-2 py-0.5 border tracking-[0.1em] transition-colors ${selected===project.id?'border-black/30 text-black/60':'border-white/10 text-white/25 group-hover:border-[#f0ce32]/20 group-hover:text-[#f0ce32]/40'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{tech}</span>
                    ))}
                  </div>
                  <div className={`mt-4 text-[12px] tracking-[0.1em] transition-all ${selected===project.id?'text-black opacity-100':'text-[#f0ce32]/0 group-hover:text-[#f0ce32]/50'}`} style={{fontFamily:"'Fragment Mono',monospace"}}>{selected===project.id?'▲ Details are available at the bottom of the page.':'▼ EXPAND'}</div>
                  
                </div>
              </div>
            ))}
          </div>

          {/* EXPANDED DETAIL PANEL */}
          {selectedProject && (
            <div className="pj-panel border-t-[3px] border-[#f0ce32] bg-[#111] p-6 md:p-10">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <div className="text-[9px] tracking-[0.25em] text-[#f0ce32]/50 mb-2" style={{fontFamily:"'Fragment Mono',monospace"}}>// {selectedProject.category} · DETAILS</div>
                    <div className="text-[40px] md:text-[52px] leading-none text-[#f0ce32] tracking-[0.03em]" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{selectedProject.title}</div>
                    <p className="text-[13px] text-white/50 font-light mt-2 max-w-md leading-[1.8]">{selectedProject.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="text-[10px] px-3 py-1 border border-[#f0ce32]/30 text-[#f0ce32]/70 tracking-[0.1em]" style={{fontFamily:"'Fragment Mono',monospace"}}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-[3px] border-[#f0ce32]/20">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="group p-6 border-r-[3px] border-b-[3px] md:border-b-0 border-[#f0ce32]/20 last:border-r-0 hover:bg-[#f0ce32] transition-colors duration-150 cursor-default">
                      <div className="mb-4">
                        <FeatureIcon type={f.icon} active={false} />
                      </div>
                      <div className="text-[16px] tracking-[0.06em] text-white group-hover:text-black mb-2 transition-colors" style={{fontFamily:"'Bebas Neue',sans-serif"}}>{f.title}</div>
                      <p className="text-[11px] text-white/40 group-hover:text-black/60 font-light leading-[1.7] mb-3 transition-colors">{f.description}</p>
                      <div className="text-[9px] tracking-[0.15em] text-[#f0ce32]/60 group-hover:text-black/50 uppercase transition-colors" style={{fontFamily:"'Fragment Mono',monospace"}}>↗ {f.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
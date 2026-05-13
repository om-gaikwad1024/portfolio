// src/data/content.ts
export const portfolioContent = {
  welcome: ` Om R Gaikwad - Software Engineer`,

  about: ` Hello, I'm Om R Gaikwad!

I'm a Full Stack Software Engineer with hands-on production experience across web, mobile, backend, and AI/ML integration, shipping complete applications end to end, from database schema and API design through frontend delivery and deployment.

Background:
- Freelance Full Stack & AI/ML Developer: shipped production-grade apps across Next.js 14, Go, React Native, Flask, and PostgreSQL, including MindOS (a personal AI OS with a custom MCP server exposing 29 live tools over a 17-table PostgreSQL schema), CipherTrust (a multi-tenant AES-256-GCM encrypted Go data pipeline with sub-50ms WebSocket latency built to ITAR, NDAA, GDPR, and SOC 2 constraints), and RedGit (a Git implementation in Go from scratch with no external libraries)
- React TypeScript and SharePoint Framework (SPFx) Developer at Cubiclogics: integrated Azure OpenAI into Microsoft 365 environments, delivering AI-powered PDF summarization inside live SharePoint tenants for enterprise clients
- Built a full CRM application with React and Java Spring Boot at Oneshell, collaborating in an Agile team on production-ready features
- 3x Hackathon Winner: 1st place at Hack for Hire among 200+ participants, earning a direct internship offer on the spot
- MCA in Data Analytics from PES University | BCA from NRI Institute, Bangalore
- Strong foundation in Next.js, Go, React, Python, TypeScript, and enterprise technologies

My passion lies in building things that are genuinely hard: autonomous AI agents, encrypted data pipelines, RL systems that play DOOM, and personal AI operating systems grounded in real user data.

Feel free to explore more using the 'projects', 'skills', 'experience', or 'contact' commands!`,

  projects: ` Projects:

1. MindOS — Personal Operating System
   A personal OS consolidating tasks, learnings, daily logs, projects, finances, and goals, with Claude connected via a live MCP integration giving context-aware AI advice across sessions
   Technologies: Next.js 14, TypeScript, PostgreSQL, Supabase, Prisma, Claude API (claude-opus-4-5), Custom MCP Server (JSON-RPC + SSE), Tailwind CSS, Recharts, Vercel
   Features: 29 MCP tools with real Postgres read/write access across a 17-table schema. Modules include Today (daily command center), Learn (knowledge vault with Claude auto-summaries), Logs (evening journal with Claude reflections), Progress (streak counter, skill charts, Claude weekly summaries), Kanban (drag-and-drop with WIP limits), Finance (expense tracker with 6-month charts), RACI Matrix, Captures (quick-capture bar), Memory (persistent cross-session AI context), and a 91-day contribution heatmap dashboard

2. CipherTrust — Secure Data Pipeline (CyberGuard UAV Shield)
   Production-ready multi-tenant encryption and data protection system securing real-time drone threat data across military, civil aviation, and critical infrastructure domains
   Technologies: Go 1.21+, Gorilla Mux, Gorilla WebSocket, AES-256-GCM, JWT, PKI, React 18, Vite, Tailwind CSS
   Features: AES-256-GCM end-to-end encryption with automated key rotation. Zero Trust PKI auth with JWT and RBAC. Multi-tenant isolation with dedicated encryption keys per tenant. HSM-protected key management architecture. Real-time WebSocket threat feeds at sub-50ms latency. Policy-based cross-tenant threat sharing with configurable PII anonymization. Immutable audit logging for ITAR, NDAA, GDPR, SOC 2, and ISO 27001 compliance

3. Autonomous RL Agent for FPS Games (ARLA)
   Self-learning RL agent that plays classic DOOM autonomously via PPO algorithm trained from raw pixel input, with a React dashboard for monitoring training sessions
   Technologies: Python, PyTorch, Stable Baselines3, PPO, ViZDoom API, OpenAI Gym, SLADE/DoomBuilder, OpenCV, React.js, Flask, TensorBoard
   Features: PPO agent trained from raw pixel input with CNN-based feature extraction from stacked screen buffer frames. Custom reward shaping across kills, health pickups, damage, survival time, and idle penalties. Custom DOOM map with 8 multiplayer spawn points. Two modes: Human vs Agent and Agent vs Bots. React + Flask dashboard with Train, Test, and Play tabs plus live TensorBoard integration

4. AccompanyAI — Mental Wellness Platform
   Full stack mental health companion app combining ML, generative AI, and real-time peer collaboration
   Technologies: Scikit-learn, Random Forest, Google Gemini Pro, Flask, Flask-SocketIO, MongoDB, JWT, React 18, Socket.IO, Spline
   Features: EEG-based mood prediction using a trained Random Forest model on Alpha, Beta, Gamma, Delta brainwave band values. AI therapy chat with 5 personality-driven companions (Batman, Elsa, Guardian, Sibling, Friend) via Gemini Pro. Collaborative growth system with a shared virtual tree. Real-time peer chat via Socket.IO. Daily gratitude journaling with streak tracking. Therapist Finder with Google Maps integration

5. Anvaya — 3D Virtual AYUSH Garden
   Interactive 3D web experience for exploring a virtual medicinal plant garden rooted in India's AYUSH traditions
   Technologies: Three.js (r171), GLTFLoader, RGBE HDR lighting, Vite, React 18, Tailwind CSS, Node.js, Express, MongoDB, Leaflet.js, Cloudinary
   Features: Fully explorable 3D garden with third-person character movement (WASD + mouse orbit). Click any plant to get Ayurvedic category and medicinal uses. Animated Yoga character with real-time Surya Namaskar playback. Full CRUD plant catalog filterable by AYUSH system. JWT auth with protected routes. Spline 3D landing page with mobile fallback

6. Community Water Quality Assessor
   Full stack web app for communities to submit groundwater samples, classify them via a trained XGBoost model, and visualize contamination risk on an interactive heatmap
   Technologies: XGBoost, Scikit-learn, PCA, StandardScaler, Flask, React 18, Recharts, Leaflet.js, SQLite
   Features: XGBoost model classifying water into irrigation categories (C1S1 to C4S4) using 16 chemical parameters. Leaflet.js contamination heatmap with real-time risk intensity overlay. Haversine-based contaminant spread estimator over 7 days. Admin dashboard with charts and trend analysis. Trained on 3 years of real Tamil Nadu groundwater CSV data (2018–2020)

7. EventHive BLR — Event Discovery & Ticketing App
   Full stack mobile app for Bangaloreans to discover, RSVP, and get tickets to events across the city
   Technologies: React Native, Expo, TypeScript, Firebase Auth, Firestore, Leaflet.js (WebView), react-native-qrcode-svg, NativeWind
   Features: Interactive dark mode Leaflet map via WebView with bidirectional postMessage bridging. Real-time Firestore ticketing with atomic increments to prevent race conditions. Auto-generated scannable QR code passes. Search and filter by category, title, and venue. Profile screen with full ticket history and stats

8. CodeLoom — Collaborative Project Management
   Threat intelligence-driven collaborative coding platform combining Git-based version control, real-time IDE, and pre-commit security scanning
   Technologies: Flask, Python, MongoDB, PyMongo, GridFS, React, VirusTotal API, RBAC, scrypt, pygit2
   Features: Real-time multi-user collaborative coding with instant workspace sync. Pre-commit security checks via VirusTotal API before code can be merged. Git-based repository management: create, clone, branch, commit, and rollback. Merge request workflow with owner review. RBAC with Owner vs Collaborator permission sets. MongoDB GridFS for file storage inside repositories

9. RedGit — Git Implementation in Go
   Fully functional Git implementation written in Go from scratch with no external Git libraries
   Technologies: Go, stdlib only, SHA-1, zlib compression, content-addressable storage, binary index format
   Features: Repository init, staging, and commits. Content-addressable object storage (blobs, trees, commits) by SHA-1 hash. DAG of commits with log and log --oneline. Branch management: create, checkout, checkout -b. Three-way merge with conflict detection and conflict markers. Binary format staging index compatible with real Git. Zlib compression on all stored objects

10. College ERP — Academic Management System
    Full-featured college ERP handling the complete academic lifecycle with role-based views for students, teachers, and admins
    Technologies: Django, SQLite, Django AbstractUser, Django Admin, Djoser, Django Signals, Django Templates
    Features: Attendance system with daily per-class marking and 75% threshold calculator. Marks management across 3 internal tests, 2 events, and semester end exam with auto-calculated CIE. Visual period-wise weekly timetable. Django Signals auto-create marks entries and attendance slots on assignment. Custom admin semester reset tool for bulk attendance regeneration. Unit tests for model creation and view-level pages

11. Movie Recommendation System with Sentiment Analysis
    Content-based movie recommendation system that suggests similar films and classifies IMDb reviews as positive or negative
    Technologies: Python, Flask, Scikit-learn, CountVectorizer, cosine_similarity, TF-IDF, BeautifulSoup4, TMDB API, Bootstrap 5, jQuery, AJAX
    Features: Content-based filtering using CountVectorizer and cosine similarity across genres, cast, and director features. Real-time autocomplete. TMDB API integration for metadata. IMDb review scraping with per-review sentiment classification using a pre-trained NLP model. AJAX-powered results with no full-page reloads
`,

  skills: ` Technical Skills:

Programming Languages:
- Python
- Go
- TypeScript / JavaScript
- Java
- C++
- SQL
- HTML / CSS

Frontend:
- React / Next.js 14
- React Native (Expo)
- Three.js
- Tailwind CSS / NativeWind / Bootstrap
- Recharts / Leaflet.js
- Spline
- Microsoft Fluent Design System

Backend:
- Flask / Django
- Node.js / Express
- Spring Boot
- Gorilla Mux / Gorilla WebSocket
- REST APIs / WebSockets / Socket.IO

Databases & ORMs:
- PostgreSQL / Supabase
- MongoDB / PyMongo / Mongoose / GridFS
- SQLite
- Firebase Firestore
- Prisma

AI & ML:
- Claude API / Azure OpenAI / Gemini API
- MCP Server (JSON-RPC over SSE)
- XGBoost / Random Forest / Scikit-learn
- Stable Baselines3 (PPO) / PyTorch
- TF-IDF / CountVectorizer / PCA / StandardScaler
- Prompt Engineering / System Prompt Design

Security & Infrastructure:
- AES-256-GCM / TLS 1.3 / PKI / JWT / RBAC
- Zero Trust Architecture
- VirusTotal API
- ITAR / NDAA / GDPR / SOC 2 compliance patterns

SharePoint & Microsoft 365:
- SharePoint Framework (SPFx)
- Microsoft Graph API
- Azure OpenAI integration
- Fluent Design System

Protocols & Concepts:
- REST / WebSocket / Socket.IO / JSON-RPC / SSE
- Agile / Scrum
- Content-Addressable Storage
- Haversine Geometry

Tools & Platforms:
- Git / GitHub / Vercel / Firebase / Cloudinary
- VS Code / IntelliJ / Figma / Spline
- TensorBoard / Jupyter Notebook / Postman / Unix Shell`,

  contact: ` Get In Touch:

Email      : om.gaikwad1024@gmail.com
Phone      : +91 6364416762
GitHub     : github.com/om-gaikwad1024
LinkedIn   : linkedin.com/in/om-gaikwad1024
Portfolio  : om-gaikwad-uni.vercel.app

Feel free to reach out!`,

  experience: ` Work Experience:

Freelance Full Stack & AI/ML Developer (Oct 2025 – Present)
Tech: Next.js 14, Go, React Native, Flask, PostgreSQL, Firebase, Claude API, MCP, Prisma, Supabase, TypeScript, Socket.IO, Expo, Leaflet, Tailwind CSS, XGBoost, Random Forest, Gemini

- Built and deployed production-grade full stack applications across web, mobile, and backend domains spanning Next.js 14, Go, React Native with Expo, and Flask, each with independently designed database schemas, auth systems, and deployment pipelines
- Architected a custom MCP server using JSON-RPC over SSE exposing 29 live tools that give Claude real-time read/write access to a production PostgreSQL database, enabling context-aware AI responses grounded in actual user data across a 17-table schema
- Engineered a multi-tenant encrypted data pipeline in Go with AES-256-GCM end-to-end encryption, Zero Trust PKI auth, RBAC, and real-time WebSocket threat feeds at sub-50ms latency, designed against ITAR, NDAA, GDPR, and SOC 2 compliance constraints
- Trained and deployed a Random Forest classifier on EEG brainwave band values to predict user mental state in real-time, and built an end-to-end XGBoost ML pipeline for groundwater quality classification across 16 chemical parameters with PCA-reduced inference
- Shipped multiple production applications across security, AI, mobile, 3D web, environmental intelligence, and productivity domains as a solo developer owning every layer from schema to deployment

Cubiclogics | On Campus Internship, React TypeScript, SPFx, Microsoft SharePoint (March 2025 – Aug 2025)

- Built file upload routes and React TypeScript frontend components integrated with Azure OpenAI APIs to deliver AI-powered PDF summarization within SharePoint Online for enterprise clients
- Developed SPFx web parts surfacing AI-generated document insights directly inside Microsoft 365 environments
- Implemented responsive UI components following Microsoft Fluent Design System principles across production SharePoint tenants

Oneshell | Off Campus Internship, React & Java Spring Boot (Jan 2025 – Feb 2025)

- Built a full CRM application with React and Java Spring Boot, developing RESTful APIs integrated with frontend components for real-time customer pipeline management
- Supported backend development using Spring Boot for REST API creation and maintenance across enterprise web applications
- Collaborated in an Agile team environment, participating in sprint planning and delivering production-ready features on schedule

Type 'projects' to see my projects or 'skills' to view my technical skills.`,

  education: ` Education & Learning:

   Master of Computer Applications (M.C.A)
   └── PES University • 2023 – 2025
   └── Specialization: Data Analytics
   └── Focus: Full Stack Development, Data Science, AI/ML
   └── Coursework: Machine Learning, Deep Learning, NLP, Probability & Statistics,
                   Linear Algebra, Optimization Techniques, Cloud Computing,
                   Data Structures & Algorithms, Operating Systems, ComputerNetworks

   Bachelor of Computer Applications (B.C.A)
   └── NRI Institute • 2020 – 2023
   └── Foundation in Computer Science and Programming

   Specialized Learning:
• Advanced Reinforcement Learning & Game AI (PPO, ViZDoom)
• AI/LLM Integration: Claude API, MCP Server architecture, Azure OpenAI
• Systems Programming: Git internals, Go, encrypted pipelines
• Mobile Development: React Native, Expo, Firebase
• Enterprise Application Development: SPFx, Microsoft 365`,

  leadership: ` Leadership & Innovation:

   Hackathon Leadership
   └── State level Winner, Anveshana Hack for Hire. Led solution development for my team, which won among 48 competing teams
   └── Champion of RRCE Web Designing competition
   └── Demonstrated ability to deliver under tight deadlines

   Independent Project Development
   └── Led development of complex AI/ML solutions independently
   └── Designed and implemented collaborative development platforms
   └── Created enterprise grade applications with modern architectures

   Innovation in AI/ML
   └── Developed autonomous gaming AI using advanced RL algorithms
   └── Created custom game environments for AI training
   └── Implemented real time AI decision-making systems

   Technical Impact:
• Developed production ready collaborative development tools
• Created innovative AI solutions for gaming environments
• Built enterprise applications used in real world scenarios
• Contributed to modern web development best practices

   Collaboration & Mentorship:
• Agile team collaboration in professional environments
• Knowledge sharing through project documentation
• Peer collaboration in academic and professional settings

   Philosophy:
"Great leaders don't create followers, they create more leaders.
I believe in empowering others through knowledge sharing and
collaborative problem solving."`,
};
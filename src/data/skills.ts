import { Skill } from '../types';

export const skillsData: Skill[] = [
  {
    name: 'C++',
    category: 'Core Languages',
    level: 92,
    experience: 'Advanced / DSA Core',
    description: 'High-performance systems programming, memory management, low-latency algorithms, and competitive data structures.',
    highlights: ['STL Containers & Algorithms', 'Pointers & Memory Optimization', 'Multi-threading & Concurrency', 'Competitive DSA (LeetCode/Codeforces)'],
    color: '#007ACC'
  },
  {
    name: 'Python',
    category: 'Core Languages',
    level: 95,
    experience: 'Production & Research',
    description: 'Primary weapon for AI model architecture, computer vision workflows, scientific computing, and backend microservices.',
    highlights: ['NumPy, SciPy & Pandas', 'Object-Oriented Design', 'Asynchronous APIs (FastAPI/AsyncIO)', 'Automated Scripting & Scraping'],
    color: '#3776AB'
  },
  {
    name: 'JavaScript',
    category: 'Core Languages',
    level: 90,
    experience: 'Modern ES6+',
    description: 'Dynamic frontend scripting, asynchronous event loops, DOM manipulation, and interactive web application backbones.',
    highlights: ['Async/Await & Promises', 'Event Loop & Closures', 'Modular ES6 Architecture', 'Browser APIs & Canvas'],
    color: '#F7DF1E'
  },
  {
    name: 'TypeScript',
    category: 'Core Languages',
    level: 92,
    experience: 'Strict Type Systems',
    description: 'Strict typing, robust generic abstractions, scalable refactoring, and enterprise frontend/backend codebases.',
    highlights: ['Advanced Generics & Utility Types', 'Strict Null Checking', 'Interface & Type Declarations', 'Full-Stack Shared Contracts'],
    color: '#3178C6'
  },
  {
    name: 'React',
    category: 'Web & Backend',
    level: 94,
    experience: 'Component Engineering',
    description: 'Reactive state management, performant component rendering, modern hooks, and rich interactive canvas integration.',
    highlights: ['Custom Hooks & Context API', 'React 18/19 Concurrency', 'Virtual DOM & Performance Profiling', 'Three.js & Motion Integration'],
    color: '#61DAFB'
  },
  {
    name: 'Node.js',
    category: 'Web & Backend',
    level: 88,
    experience: 'Scalable Services',
    description: 'High-concurrency server runtimes, event-driven REST and WebSocket architectures, middleware design, and streaming.',
    highlights: ['Express & Fastify APIs', 'Streams & Buffers', 'Authentication & JWT Workflows', 'Microservices Orchestration'],
    color: '#5FA04E'
  },
  {
    name: 'SQL',
    category: 'Databases & Tools',
    level: 90,
    experience: 'Relational Modeling',
    description: 'Complex relational database schema design, index optimization, query execution plan analysis, and stored procedures.',
    highlights: ['Complex JOINs & Aggregations', 'Index Optimization & EXPLAIN', 'ACID Transaction Guarantees', 'Window Functions & CTEs'],
    color: '#E38C00'
  },
  {
    name: 'PostgreSQL',
    category: 'Databases & Tools',
    level: 91,
    experience: 'Enterprise & PostGIS',
    description: 'Advanced relational persistence, JSONB querying, connection pooling, spatial extensions (PostGIS), and indexing.',
    highlights: ['PostGIS Spatial Queries', 'JSONB Document Storage', 'Connection Pooling & Sharding', 'Full-Text Search'],
    color: '#336791'
  },
  {
    name: 'Git',
    category: 'Databases & Tools',
    level: 92,
    experience: 'Version Control',
    description: 'Collaborative distributed version control, complex branch rebasing, conflict resolution, cherry-picking, and commit hygiene.',
    highlights: ['Interactive Rebase & Bisect', 'Git Hooks & Husky', 'Submodules & Worktrees', 'Trunk-Based Development'],
    color: '#F05032'
  },
  {
    name: 'GitHub',
    category: 'Databases & Tools',
    level: 93,
    experience: 'DevOps & Collaboration',
    description: 'CI/CD pipeline automation with GitHub Actions, pull request review workflows, release management, and open-source hygiene.',
    highlights: ['GitHub Actions CI/CD', 'Automated Testing Workflows', 'Project Boards & Milestones', 'Open Source Package Publishing'],
    color: '#FFFFFF'
  },
  {
    name: 'Machine Learning',
    category: 'AI & Machine Learning',
    level: 94,
    experience: 'Models & Mathematical Foundations',
    description: 'Supervised and unsupervised learning, mathematical optimization, feature engineering, loss formulation, and validation schemes.',
    highlights: ['Scikit-Learn & PyTorch', 'Gradient Descent & Convex Optimization', 'Cross-Validation & Hyperparameter Tuning', 'Ensemble Models (XGBoost/LightGBM)'],
    color: '#FF6F00'
  },
  {
    name: 'Computer Vision',
    category: 'AI & Machine Learning',
    level: 95,
    experience: 'State-of-the-art Spatial AI',
    description: 'Real-time object detection, facial recognition, pose estimation, image segmentation, and edge hardware deployment.',
    highlights: ['OpenCV & MediaPipe', 'YOLO Architectures (v5/v8)', 'FaceNet & Metric Learning', 'Edge Deployment (CUDA/TensorRT)'],
    color: '#00F0FF'
  },
  {
    name: 'Transformers',
    category: 'AI & Machine Learning',
    level: 91,
    experience: 'Attention & LLM Architectures',
    description: 'Self-attention mechanisms, transformer encoders/decoders, fine-tuning Hugging Face architectures, and prompt embeddings.',
    highlights: ['Multi-Head Attention & Positional Encoding', 'Hugging Face Transformers', 'Vision Transformers (ViT)', 'Clinical & Domain Adaptation'],
    color: '#8B5CF6'
  }
];

export const skillCategories = [
  'All',
  'Core Languages',
  'AI & Machine Learning',
  'Web & Backend',
  'Databases & Tools'
] as const;

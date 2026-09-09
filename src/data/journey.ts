import { TimelineItem } from '../types';

export const journeyData: TimelineItem[] = [
  {
    id: 'journey-edu',
    year: '2023 - Present',
    title: 'B.Tech in Artificial Intelligence & Computer Science',
    organization: 'Engineering University',
    category: 'Education',
    description: 'Pursuing undergraduate degree focused on core computer science foundations, algorithm analysis, mathematical optimization, deep neural networks, and distributed systems.',
    keyAchievements: [
      'Maintaining strong academic standing with focus on Data Structures & Algorithms and AI systems',
      'Coursework: Advanced DSA, Machine Learning, Computer Vision, Database Engineering, Operating Systems',
      'Active student mentor in technical programming clubs, conducting workshops on C++ and PyTorch'
    ],
    technologies: ['C++', 'Python', 'Algorithms', 'Linear Algebra', 'Operating Systems'],
    badge: 'Core Academic Track'
  },
  {
    id: 'journey-hackathons',
    year: '2024 - 2025',
    title: 'National & University Hackathon Finalist',
    organization: 'Smart City & AI Innovations Challenge',
    category: 'Hackathons',
    description: 'Spearheaded rapid development sprints building high-impact computer vision and geospatial civic-tech solutions within 36-hour intense hackathon constraints.',
    keyAchievements: [
      'Built and demonstrated the prototype for the Traffic Police Gesture Recognition system during live jury review',
      'Collaborated with interdisciplinary teams across embedded hardware, backend, and UI/UX design',
      'Recognized for exceptional engineering rigor, real-time edge performance, and practical civic utility'
    ],
    technologies: ['MediaPipe', 'PyTorch', 'FastAPI', 'React', 'Edge AI'],
    badge: 'Award Winner'
  },
  {
    id: 'journey-projects',
    year: '2024 - 2025',
    title: 'Architecting End-to-End Intelligent Systems',
    organization: 'Independent R&D & Engineering Initiatives',
    category: 'Projects',
    description: 'Conceived, architected, and shipped four comprehensive full-stack and machine learning platforms solving real-world challenges in civic governance, healthcare, and security.',
    keyAchievements: [
      'Deployed Land Governance GIS Platform capable of sub-meter cadastral resolution and topological checks',
      'Engineered HIPAA-compliant Medical Records platform with clinical transformer entity extraction',
      'Optimized attendance computer vision system processing 8 faces simultaneously in under 300ms'
    ],
    technologies: ['PostGIS', 'Docker', 'PostgreSQL', 'React Three Fiber', 'YOLOv8'],
    badge: 'Production Systems'
  },
  {
    id: 'journey-opensource',
    year: '2024 - Present',
    title: 'Open Source Contributor & Tooling Builder',
    organization: 'GitHub & Global Developer Community',
    category: 'Open Source',
    description: 'Active contributor to developer utilities, algorithmic repositories, and machine learning pipelines. Advocate for transparent, reproducible, and well-documented open-source software.',
    keyAchievements: [
      'Authored modular computer vision utilities and reusable benchmark notebooks for student developers',
      'Contributed documentation, bug fixes, and optimization patches to open-source developer tooling',
      'Maintained public repositories with comprehensive CI/CD, unit testing, and architecture diagrams'
    ],
    technologies: ['Git', 'GitHub Actions', 'Python', 'TypeScript', 'Markdown'],
    badge: 'Community Contributor'
  },
  {
    id: 'journey-learning',
    year: 'Continuous',
    title: 'Deep Exploration in Advanced AI & Accelerated Compute',
    organization: 'Autonomous Deep Learning Labs',
    category: 'Learning',
    description: 'Relentlessly pushing technical boundaries by dissecting foundational research papers, mastering transformer attention architectures, and profiling CUDA kernel performance.',
    keyAchievements: [
      'Explored self-attention scaling, Vision Transformers (ViT), and multi-modal embedding spaces',
      'Implemented custom CNN and ST-GCN layers from scratch in PyTorch to internalize gradient dynamics',
      'Deep dive into modern web graphics (WebGL, Three.js shaders, GLSL) for interactive visual storytelling'
    ],
    technologies: ['Transformers', 'PyTorch', 'GLSL', 'CUDA Basics', 'Graph Neural Networks'],
    badge: 'Continuous Mastery'
  }
];

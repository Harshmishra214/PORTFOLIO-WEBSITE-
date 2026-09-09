export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  architecture: string[];
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  iconName: string;
  accentColor: string;
  previewBadge: string;
}

export interface Skill {
  name: string;
  category: 'Core Languages' | 'AI & Machine Learning' | 'Web & Backend' | 'Databases & Tools';
  level: number; // 0-100
  experience: string;
  description: string;
  highlights: string[];
  color: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: 'Education' | 'Projects' | 'Hackathons' | 'Open Source' | 'Learning';
  description: string;
  keyAchievements: string[];
  technologies: string[];
  badge?: string;
}

export type CursorType = 'default' | 'hover' | 'project' | 'magnetic' | 'text';

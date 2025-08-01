import {
  Twitter,
  Mail,
  Github,
  BookOpen,
  FileDown,
  Linkedin,
} from 'lucide-react';

import { autominds } from './projects/autominds';
import { accufin } from './projects/accufin';
import { manishVaghasiya } from './projects/manish-vaghasiya';
import { pubSub } from './projects/pub-sub';
import { delfa } from './projects/delfa';
import { patternGenerator } from './projects/pattern-generator';
import { buffindia } from './projects/buffindia';
import { kubernetes } from './projects/kubernetes';
import { alias } from './projects/alias';
import { intentjsTwitter } from './projects/intentjs-twitter';
import { statushive } from './projects/statushive';
import { shyamahShringar } from './projects/shyamah-shrinagar';
import { cyroTechnologies } from './projects/cyro-technologies';
import { twilioCall } from './projects/twilio-call';
import { raycastWhatsapp } from './projects/raycast-whatsapp';
import { agencyPortfolio } from './projects/agency-portfolio';
import { helpbharat } from './projects/helpbharat';
import { visualizenbuildBugs } from './projects/visualizenbuild-bugs';
import { shuttle } from './projects/shuttle';

export type ProjectCategory = 'side-project' | 'internship' | 'freelance';

export interface Project {
  id: string;
  category: ProjectCategory;
  href?: string;
  github?: string;
  instagram?: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  features: string[];
  techStack: string[];
  date: string;
  views: number;
  repoCount?: number; // Number of repositories worked on (for internship/freelance projects)
  websites?: string[]; // Array of website URLs for the project
}

export const projects: Project[] = [
  shuttle,
  visualizenbuildBugs,
  helpbharat,
  agencyPortfolio,
  accufin,
  raycastWhatsapp,
  cyroTechnologies,
  twilioCall,
  shyamahShringar,
  autominds,
  statushive,
  kubernetes,
  alias,
  intentjsTwitter,
  manishVaghasiya,
  pubSub,
  delfa,
  patternGenerator,
  buffindia,
];

// Utility functions for project categories
export const getCategoryLabel = (category: ProjectCategory): string => {
  switch (category) {
    case 'side-project':
      return 'Side Projects';
    case 'internship':
      return 'Internship Work';
    case 'freelance':
      return 'Freelance Work';
    default:
      return 'Projects';
  }
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return projects.filter((project) => project.category === category);
};

export const getAllCategories = (): ProjectCategory[] => {
  return ['side-project', 'internship', 'freelance'];
};

export const getProjectCounts = () => {
  return {
    'side-project': getProjectsByCategory('side-project').length,
    internship: getProjectsByCategory('internship').length,
    freelance: getProjectsByCategory('freelance').length,
    total: projects.length,
  };
};

export const socialLinks = [
  {
    icon: Twitter,
    handle: '@DevItaliya22',
    label: 'Twitter',
    href: 'https://twitter.com/DevItaliya22',
  },
  {
    icon: BookOpen,
    handle: 'DevSphere',
    label: 'Medium',
    href: 'https://medium.com/@thrilled_bisque_gnu_255',
  },
  {
    icon: Github,
    handle: 'DevItaliya22',
    label: 'Github',
    href: 'https://github.com/DevItaliya22',
  },
  {
    icon: FileDown,
    handle: 'Resume',
    label: 'resume',
    href: 'https://drive.google.com/file/d/1GDTkwcA7HJlGgHMSo74U82w7AqIrJAvo/view',
  },
  {
    icon: Mail,
    handle: 'devitaliya.work',
    label: 'Email',
    href: 'mailto:devitaliya.work@gmail.com',
  },
  {
    icon: Linkedin,
    handle: 'Dev Italiya',
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/dev-italiya-0a3a2b273/',
  },
];

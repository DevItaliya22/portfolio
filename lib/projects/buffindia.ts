import { Project } from '../info';

export const buffindia: Project = {
  id: 'buffindia',
  category: 'internship',
  title: 'Buffindia - Cigarette Waste Management Platform',
  github: 'private',
  description:
    'Comprehensive cigarette waste management and recycling platform with 15+ crore INR valuation. Built 3 major and 5 minor full-stack applications during 4-month internship serving 50+ clients.',
  longDescription: `During my 4-month internship (Mar 1 - Jun 30, 2025), I developed and contributed to a comprehensive cigarette waste management ecosystem for Buffindia, a company focused on cigarette waste recycling and product creation.

## Project Scope & Scale:
- **Company Valuation**: 15+ crore INR
- **Projects Completed**: 3 major and 5 minor projects
- **Client Base**: 50+ active clients
- **Database**: 100+ tables, some with 50+ columns, 200+ relationships
- **Repositories**: 8 private repositories

## Key Platforms Developed:

### 1. Main Website (buffindia.com)
Public-facing website showcasing company services, eco-friendly solutions, and waste management initiatives.

### 2. Development Platform (dev.buffindia.com)
Updated version of the main website with enhanced features, currently in development phase with modern UI/UX improvements.

### 3. Admin Panel Suite:
- **Admin 2 (admin2.buffindia.com)**: Form response management system for main website inquiries
- **Admin 3 (admin3.buffindia.com)**: Role-based data management portal with complete CRUD operations and permission system
- **Admin 4 (admin4.buffindia.com)**: Employee attendance system with live map tracking for waste collectors

### 4. Dynamic Contact System (contact.buffindia.com)
SSO-integrated contact pages customized for multiple clients with direct link access.

### 5. Real-time Feedback Platform (feedback.buffindia.com)
Local-first synchronized frontend with:
- Dynamic form creation
- Real-time data synchronization using Docker Zero sync
- PostgreSQL backend with offline-first capabilities
- Auto-sync when users come online
- Live dashboard for admin responses

## Technical Architecture:
- **Frontend**: Next.js with Shadcn UI components
- **Backend**: Express.js with complex query optimization
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: SSO implementation across all platforms
- **Storage**: Azure Blob Storage for file management
- **Email**: Resend Email service integration
- **Deployment**: Azure VM, Docker containerization, Nginx
- **CI/CD**: GitHub Actions with Vercel deployment
- **Development**: Cursor IDE

## Business Impact:
Built scalable solutions managing waste collection operations, client relationships, and digital kiosk networks, contributing to environmental sustainability through innovative technology solutions.`,
  tags: [
    'Azure',
    'Real-time Sync',
    'SSO',
    'Role Management',
    'Map Tracking',
    'Local-first',
  ],
  features: [
    'Real-time waste collector tracking with live map updates',
    'Local-first sync engine with offline capabilities',
    'Dynamic form creation and management system',
    'SSO integration across multiple admin panels',
    'Role-based permission and access control',
    'Employee attendance with image capture',
    'Analytics dashboard with comprehensive reporting',
    'Event management with video upload functionality',
    'Digital kiosk content management',
    'Complex database query optimization for 100+ tables',
    'Multi-client contact system with custom branding',
    'Real-time form response handling and notifications',
  ],
  techStack: [
    'Next.js',
    'Express.js',
    'PostgreSQL',
    'Prisma ORM',
    'Docker',
    'Nginx',
    'Azure VM',
    'Azure Blob Storage',
    'GitHub CI/CD',
    'Vercel',
    'Shadcn UI',
    'Docker Zero Sync',
    'Resend Email',
    'SSO Authentication',
  ],
  date: 'Mar 1, 2025',
  views: 0,
  repoCount: 7,
  websites: [
    'https://buffindia.com/',
    'https://dev.buffindia.com/',
    'https://admin2.buffindia.com/signin',
    'https://admin3.buffindia.com/login',
    'https://admin4.buffindia.com/login',
    'https://feedback.buffindia.com',
    'https://contact.buffindia.com',
    'https://ecoart.buffindia.com',
  ],
};

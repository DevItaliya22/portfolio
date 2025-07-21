import { Project } from '../info';

export const accufin: Project = {
  id: 'accufin',
  category: 'freelance',
  title: 'Accufin - Financial Management Platform',
  href: 'https://accufin.vercel.app/',
  github: 'private',
  description:
    'Comprehensive financial management platform with dynamic form builder, S3 file management, and client portal. Features admin dashboard, Google OAuth, and secure client data isolation.',
  longDescription: `Accufin is a sophisticated financial management platform designed to streamline client interactions and data management for financial service providers.

## Project Overview:
**Accufin** combines a public-facing website with a powerful admin dashboard, offering comprehensive solutions for client onboarding, document management, and secure data handling in the financial sector.

## Core Features:

### Authentication & Security
- **Multi-Auth System**: Google OAuth integration alongside traditional email/password authentication
- **Password Recovery**: Complete forgot password workflow with email verification
- **Client Data Isolation**: Secure private spaces ensuring each client can only access their own data

### Dynamic Form Management
- **Drag-and-Drop Builder**: Intuitive form creation with dynamic input selectors
- **Flexible Input Types**: Support for various form field types with drag-and-drop functionality
- **Response Management**: Admin can view, edit, and manage all form submissions
- **Client Customization**: Forms tailored to specific client requirements and workflows

### File & Document Management
- **S3 Integration**: Robust cloud storage solution for secure file handling
- **Client Upload Portal**: Secure file upload system with admin-only visibility
- **Folder Organization**: Dynamic folder creation and file categorization
- **Document Corrections**: Admin workflow for file corrections and re-uploads
- **Archive System**: Comprehensive file archiving and retrieval system

### Content Management
- **Dynamic Blog System**: Full-featured blog with dynamic routing and tag management
- **SEO Optimization**: Proper linking structure and content organization
- **User Profiles**: Complete user profile management system

### Admin Dashboard
- **User Management**: Comprehensive user administration and oversight
- **Notification System**: Real-time notifications and communication tools
- **Analytics & Reporting**: Client interaction tracking and data insights
- **Response Editing**: Full CRUD operations on client form submissions

## Technical Architecture:
Built with modern web technologies to ensure scalability, security, and performance in handling sensitive financial data and client interactions.

## Client Impact:
Delivering a complete solution that streamlines financial service operations while maintaining the highest standards of data security and client privacy.`,
  tags: [
    'Financial Services',
    'Form Builder',
    'S3 Storage',
    'Admin Dashboard',
    'OAuth',
    'Document Management',
    'Freelance',
  ],
  features: [
    'Dynamic drag-and-drop form builder with custom input types',
    'Google OAuth and email/password authentication system',
    'S3-powered file management with folder organization',
    'Client-specific private data spaces with access isolation',
    'Admin dashboard with form response editing capabilities',
    'Blog system with dynamic links and tag management',
    'User management system with role-based permissions',
    'File upload portal with admin-only visibility controls',
    'Notification system for real-time client communication',
    'Document correction workflow with re-upload functionality',
  ],
  techStack: [
    'Next.js',
    'TypeScript',
    'AWS S3',
    'Google OAuth',
    'Database Management',
    'Authentication',
    'File Storage',
  ],
  views: 0,
  date: 'Jun 9, 2025',
  repoCount:1
};

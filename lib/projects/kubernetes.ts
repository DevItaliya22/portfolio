import { Project } from '../info';

export const kubernetes: Project = {
  id: 'kubernetes',
  category: 'side-project',
  title: 'Kubernetes Learning Journey',
  github: 'https://github.com/DevItaliya22/Kubernetes',
  description:
    'Basic Kubernetes learning notes and code examples covering deployments, HPA, volumes, and ConfigMaps. Personal documentation of K8s fundamentals.',
  longDescription: `A personal learning repository documenting my journey with **Kubernetes basics** through hands-on practice and detailed note-taking.

## What This Repository Contains:
Simple documentation and code examples of fundamental **Kubernetes** concepts that I learned and practiced.

## Basic Topics Covered:

### Core Kubernetes Concepts
- **Pods**: Basic pod creation and management
- **Deployments**: Simple deployment configurations
- **Services**: Exposing applications within the cluster

### Storage & Configuration Basics
- **Volumes**: Basic volume mounting and data persistence
- **ConfigMaps**: Managing application configuration
- **Secrets**: Handling sensitive data

### Scaling Basics
- **Horizontal Pod Autoscaler (HPA)**: Basic auto-scaling setup
- **Manual Scaling**: Simple scaling commands and configurations

### Learning Documentation
- **Deployment Screenshots**: Visual proof of successful deployments
- **YAML Examples**: Basic configuration files with comments
- **Learning Notes**: Personal notes on each concept

## Learning Approach:
This is a beginner-friendly documentation of my Kubernetes learning process. Each folder contains:
- Basic YAML configuration files
- Screenshots of working deployments  
- Personal notes and explanations
- Simple examples to understand core concepts

Perfect for anyone starting their Kubernetes journey or as a personal reference guide.`,
  tags: ['Kubernetes', 'Learning', 'Container Orchestration'],
  features: [
    'Basic Kubernetes pod and deployment examples',
    'Simple HPA configuration for auto-scaling',
    'Volume mounting and ConfigMaps examples',
    'Deployment screenshots and visual documentation',
    'Personal learning notes with explanations',
    'Basic YAML configuration files with comments',
  ],
  techStack: ['Kubernetes', 'Docker', 'YAML', 'kubectl'],
  views: 0,
  date: 'Sept 8, 2024',
  repoCount: 1,
};

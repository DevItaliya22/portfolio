import { Project } from '../info';

export const pubSub: Project = {
  id: 'pub-sub',
  category: 'side-project',
  title: 'Pub Sub Messaging System',
  github: 'https://github.com/DevItaliya22/PUB-SUB-2',
  description:
    'Scalable real-time messaging system built with WebSockets, Redis, and singleton pattern. Features room-based communication with persistent data storage.',
  longDescription: `A comprehensive **Pub-Sub messaging system** designed to handle high-scale real-time communication with robust architecture and efficient message handling.

## System Architecture:

### Core Messaging Features
- **Room Management**: Users can create or join chat rooms for organized communication
- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Clapper System**: Interactive engagement features for enhanced user experience

### Technical Implementation

#### Scalable Infrastructure
- **Singleton Pattern**: Implemented design pattern for efficient resource management
- **Redis Integration**: High-performance message queuing and caching layer
- **BullMQ Jobs**: Reliable background job processing for message handling

#### Real-time Communication
- **WebSocket Protocol**: Bidirectional communication for instant messaging
- **Multi-user Support**: Concurrent user handling with optimized connection management
- **Message Persistence**: Reliable message storage and retrieval

### DevOps & Deployment

#### Containerization
- **Docker Implementation**: Fully containerized application for consistent deployment
- **Persistent Volume**: Redis data persistence across container restarts
- **Scalable Container Architecture**: Easy horizontal scaling capabilities

#### Cloud Infrastructure
- **AWS EC2 Deployment**: Production deployment on cloud infrastructure
- **Cost Optimization**: Strategic resource management (temporarily offline for cost reduction)

## Learning Outcomes:
This project provided deep insights into **WebSocket architecture**, **Redis pub-sub patterns**, **message queue systems**, and **containerized deployment strategies**. The system successfully demonstrated scalability for multiple concurrent users with reliable message delivery.

## Technical Highlights:
Built with modern technologies and best practices, this messaging system showcases expertise in real-time communication protocols and scalable system design.`,
  tags: ['WebSockets', 'PubSub', 'Redis', 'Scaling', 'Real-time'],
  features: [
    'Highly scalable messaging infrastructure',
    'Pub-Sub system with singleton pattern implementation',
    'Real-time room-based collaboration',
    'Fully dockerized application with persistent storage',
    'Redis and BullMQ job queue integration',
    'WebSocket-based instant messaging',
  ],
  techStack: ['React', 'Node.js', 'Docker', 'BullMQ', 'WebSockets', 'Redis'],
  views: 0,
  date: 'Aug 12, 2024',
  repoCount: 1,
};

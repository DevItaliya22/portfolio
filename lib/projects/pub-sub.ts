import { Project } from '../info';

export const pubSub: Project = {
  id: 'pub-sub',
  category: 'side-project',
  title: 'Pub Sub Messaging System',
  github: 'https://github.com/DevItaliya22/PUB-SUB-2',
  description:
    'This was a project to build a pub sub messaging system using websockets and redis with singleton pattern.',
  longDescription:
    'This was a project to build a pub sub messaging system using websockets and redis with singleton pattern. The project was built to scale and handle multiple users at the same time. They can either create a room or join one and can send clappers. This was a fun project to work on and I learned a lot about websockets and redis and bullmq. <br/> The project was deployed on AWS ec2 but to reduce cost I had to shut it down.',
  tags: ['Websockets', 'PubSub', 'Redis', 'Scaling'],
  features: [
    'Highly scalable infrastructure',
    'Pub sub messaging system with singleton pattern',
    'Real-time collaboration',
    'Dockerized application',
    'Redis and bullmq jobs',
    'Docker persist volume for redis',
  ],
  techStack: ['React', 'Node.js', 'Docker', 'Bull MQ', 'Websockets', 'Redis'],
  views: 0,
  date: 'Aug 12, 2024',
};

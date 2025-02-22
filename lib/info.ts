
import {
  Twitter,
  Mail,
  Github,
  BookOpen,
  FileDown,
  Linkedin,
} from 'lucide-react';

export interface Project {
  id: string;
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
}

export const projects: Project[] = [
  {
    id: 'autominds',
    href: 'https://auto-minds-six.vercel.app/',
    github: 'https://github.com/DevItaliya22/AutoMinds',
    title: 'Autominds',
    description:
      'Automations with most known platforms. Secure, scalable, and easy to integrate.',
    longDescription:
      'AutoMinds is a completely open-source platform that allows you to connect multiple user applications (such as Google Drive, Google Docs, Google Sheets, GitHub, Gmail) and automates workflows between them. AutoMinds lets you set up triggers and actions to streamline and automate repetitive tasks across different platforms. It is a no-code automation platform that allows you to create complex workflows with simple drag-and-drop actions. <br/> This is one of the biggest and the most concise project I have ever worked on. It has a lot of features and is scalable. ',
    tags: ['API', 'Automations', 'SaaS'],
    features: [
      'User authentication and authorization with multiple providers',
      'Real-time analytics',
      'Easy integration with existing systems',
      'Scalable infrastructure',
      'Drag-and-drop workflow builder',
      'Acclerated prisma queries',
    ],
    techStack: [
      'Next js',
      'TypeScript',
      'Redis',
      'PostgreSQL',
      'prisma',
      'Shad CN',
    ],
    views: 0,
    date: 'Sept 27,2024',
  },
  {
    id: 'manish-vaghasiya',
    title: 'Manish Vaghasiya',
    href: 'https://manishvaghasiya.com/',
    github: 'private',
    instagram: 'https://www.instagram.com/manishvaghasiya01',
    description:
      '.A client project for a personal portfolio website. Designed and developed a responsive website with a focus on user experience.',
    longDescription:
      'Manish Vaghasiya is a motivational speaker in Gujarat , India . He is a very good speaker and has a lot of followers. He wanted a website to showcase his work and his thoughts. Built an end to end website with admin panel and push notifications on contact and bookings. Client was very happy with the work and the website is live and running and shipped what he wanted in matter of days ',
    tags: ['Frontend', 'Design', 'Development'],
    features: [
      'Admin panel for managing content',
      'Responsive design for mobile and desktop',
      'Deployment and hosting setup',
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Vercel', 'Prisma', 'PostgreSQL'],
    views:  0,
    date: 'Sept 15, 2024',
  },
  {
    id: 'pub-sub',
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
      'Dockersied application',
      'Redis and bullmq jobs',
      'Docker persist volume for redis',
    ],
    techStack: ['React', 'Node.js', 'Docker', 'Bull MQ', 'Websockets', 'Redis'],
    views:  0,
    date: 'Aug 12, 2024',
  },
  {
    id: 'delfa',
    title: 'Delfa Innovators',
    github: 'private',
    description:
      "This is my internship project where I made handeled many API's with frontend optimisation.",
    longDescription:
      "This was my intership project where I worked on many API's and made a dashboard for the company. The company was a startup and they wanted to have a dashboard where they can see all the data and the analytics of the company. I worked on the frontend optimisation and the backend API's. The project was built with react and nodejs and was deployed on AWS ec2. The project was a success and the company was happy with the work. <br/> Completed the project in 2 months and the project is live and running. <br/> Handled Frontend ,Backend ,Database everything along with another intern @Aviral.",
    tags: ['Analytics', 'Data', 'Internship', 'SaaS'],
    features: [
      'Highly optimised backend ',
      'Migrated some js code to ts',
      'Pdf and Xl handling on S3 and processing on server',
      'Real time analytics',
      'Deployment on AWS EC2',
    ],
    techStack: ['Next js', 'Node js', 'AWS EC2', 'S3', 'PostgreSQL'],
    views:  0,
    date: 'June 3, 2024',
  },
  {
    id: 'pattern-generator',
    title: 'Pattern Generator',
    github: 'private',
    description:
      'This is an AI start up where I managed frontend optimisation with S3.',
    longDescription:
      'This was a project where I worked on an AI startup. The startup was about generating patterns and designs with AI. I worked on the frontend optimisation. I had implemented a lot of features such as Zustand and react component management. Completed the project in 1 month and the project is live and running.',
    tags: ['SaaS', 'AI', 'Internship'],
    features: [
      'Highly optimised frontend',
      'Reduced cost and API by 70%',
      'Mostly worked with React and Zustand',
    ],
    techStack: ['Next js', 'S3', 'Zustand'],
    views:  0,
    date: 'July 23, 2024',
  },
];

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

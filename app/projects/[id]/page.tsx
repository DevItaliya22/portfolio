"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowBigRightDash,
  ArrowLeft,
  ArrowUpRight,
  Github,
  Instagram,
} from "lucide-react";
import ParticleEffect from "../../components/ParticleEffect";
import React from "react";

interface Project {
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
}

const projects: Project[] = [
  {
    id: "autominds",
    href: "https://auto-minds-six.vercel.app/",
    github: "https://github.com/DevItaliya22/AutoMinds",
    title: "Autominds",
    description:
      "API authentication and authorization for developers. Secure, scalable, and easy to integrate.",
    longDescription:
      "AutoMinds is a completely open-source platform that allows you to connect multiple user applications (such as Google Drive, Google Docs, Google Sheets, GitHub, Gmail) and automates workflows between them. AutoMinds lets you set up triggers and actions to streamline and automate repetitive tasks across different platforms. It is a no-code automation platform that allows you to create complex workflows with simple drag-and-drop actions. <br/> This is one of the biggest and the most concise project I have ever worked on. It has a lot of features and is scalable. ",
    tags: ["API", "Automations", "SaaS"],
    features: [
      "User authentication and authorization with multiple providers",
      "Real-time analytics",
      "Easy integration with existing systems",
      "Scalable infrastructure",
      "Drag-and-drop workflow builder",
      "Acclerated prisma queries",
    ],
    techStack: [
      "Next js",
      "TypeScript",
      "Redis",
      "PostgreSQL",
      "prisma",
      "Shad CN",
    ],
  },
  {
    id: "manish-vaghasiya",
    title: "Manish Vaghasiya",
    href: "https://manishvaghasiya.com/",
    github: "private",
    instagram: "https://www.instagram.com/manishvaghasiya01",
    description:
      "A cloud-native database solution designed for high performance and scalability.A client project for a personal portfolio website. Designed and developed a responsive website with a focus on user experience.",
    longDescription:
      "Manish Vaghasiya is a motivational speaker in Gujarat , India . He is a very good speaker and has a lot of followers. He wanted a website to showcase his work and his thoughts. Built an end to end website with admin panel and push notifications on contact and bookings. Client was very happy with the work and the website is live and running and shipped what he wanted in matter of days ",
    tags: ["Frontend", "Design", "Development"],
    features: [
      "Admin panel for managing content",
      "Responsive design for mobile and desktop",
      "Deployment and hosting setup",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Vercel", "Prisma", "PostgreSQL"],
  },
  {
    id: "pub-sub",
    title: "Pub Sub Messaging System",
    github: "https://github.com/DevItaliya22/PUB-SUB-2",
    description:
      "This was a project to build a pub sub messaging system using websockets and redis with singleton pattern.",
    longDescription:
      "This was a project to build a pub sub messaging system using websockets and redis with singleton pattern. The project was built to scale and handle multiple users at the same time. They can either create a room or join one and can send clappers. This was a fun project to work on and I learned a lot about websockets and redis and bullmq. <br/> The project was deployed on AWS ec2 but to reduce cost I had to shut it down.",
    tags: ["Websockets", "PubSub", "Redis", "Scaling"],
    features: [
      "Highly scalable infrastructure",
      "Pub sub messaging system with singleton pattern",
      "Real-time collaboration",
      "Dockersied application",
      "Redis and bullmq jobs",
      "Docker persist volume for redis",
    ],
    techStack: ["React", "Node.js", "Docker", "Bull MQ", "Websockets", "Redis"],
  },
  {
    id: "delfa",
    title: "Delfa Innovators",
    github: "private",
    description:
      "This is my internship project where I made handeled many API's with frontend optimisation.",
    longDescription:
      "This was my intership project where I worked on many API's and made a dashboard for the company. The company was a startup and they wanted to have a dashboard where they can see all the data and the analytics of the company. I worked on the frontend optimisation and the backend API's. The project was built with react and nodejs and was deployed on AWS ec2. The project was a success and the company was happy with the work. <br/> Completed the project in 2 months and the project is live and running. <br/> Handled Frontend ,Backend ,Database everything along with another intern @Aviral.",
    tags: ["Analytics", "Data", "Internship", "SaaS"],
    features: [
      "Highly optimised backend ",
      "Migrated some js code to ts",
      "Pdf and Xl handling on S3 and processing on server",
      "Real time analytics",
      "Deployment on AWS EC2",
    ],
    techStack: ["Next js", "Node js", "AWS EC2", "S3", "PostgreSQL"],
  },
  {
    id: "pattern-generator",
    title: "Pattern Generator",
    github: "private",
    description:
      "This is an AI start up where I managed frontend optimisation with S3.",
    longDescription:
      "This was a project where I worked on an AI startup. The startup was about generating patterns and designs with AI. I worked on the frontend optimisation. I had implemented a lot of features such as Zustand and react component management. Completed the project in 1 month and the project is live and running.",
    tags: ["SaaS", "AI", "Internship"],
    features: [
      "Highly optimised frontend",
      "Reduced cost and API by 70%",
      "Mostly worked with React and Zustand",
    ],
    techStack: ["Next js", "S3", "Zustand"],
  },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-between items-center p-6  z-10 relative">
        <Link
          href="/projects"
          className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-start justify-start gap-12 p-6 relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="w-full"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 ">
            {project.title}
          </h1>
          <div className="flex gap-2"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-neutral-400 mr-3 hover:text-white transition-colors ml-10 ${
                  project.github === "private" ? "pointer-events-none" : ""
                } }`}
              >
                {project.github === "private" ? (
                  "Private Repo"
                ) : (
                  <Github className="h-6 w-6" />
                )}
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowUpRight className="h-6 w-6" />
              </a>
            )}
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
          </div>
          <p className="text-neutral-400 text-lg mb-8">{project.description}</p>
          <p className="text-neutral-300">
            {project.longDescription
              .split("<br/>")
              .map((val: string, idx: number) => (
                <React.Fragment key={idx}>
                  {val.includes("@Aviral") ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: val.replace(
                          "@Aviral",
                          `<a href="https://github.com/AviralJ58" target="_blank" class="underline italic text-white font-700">@Aviral (Accenture)</a>`
                        ),
                      }}
                    />
                  ) : (
                    <span>{val}</span>
                  )}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-300">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}

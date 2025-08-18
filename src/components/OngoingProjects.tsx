import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Boxes, MapPin } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const projects = [
  {
    name: "Hyperdim-Innovation Official Website",
    description:
      "Developed a modern and responsive web portfolio for a company, showcasing their software solutions and services. The site is designed to provide an engaging user experience while reflecting the company’s professional brand identity.",
    progress: 75,
    icon: <Briefcase className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-cyan-500 to-blue-500",
    technologies: [
      "React",
      "Tailwind CSS",
      "Google Cloud",
      "AI Agent Integration",
    ],
    location: "Global",
  },

  {
    name: "Inventory and Sales Management System",
    description:
      "The Inventory and Sales Management System enables efficient tracking of sales and inventory, streamlining business operations. It provides real-time updates, sales insights, and inventory management for improved operational efficiency.",
    progress: 60,
    icon: <Boxes className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-emerald-500 to-teal-500",
    technologies: ["HTML", "CSS", "JS", "SQL"],
    location: "Piliyandala, Sri Lanka",
  },
  {
    name: "Business Website",
    description:
      "A Business Website serves as an online presence for a company, offering information about its products, services, and brand. It includes features such as contact forms, service descriptions, client testimonials, and e-commerce functionality, designed to engage customers and drive business growth.",
    progress: 80,
    icon: <Briefcase className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-emerald-500 to-teal-500",
    technologies: ["React", "Bootstrap", "AI Agent Integration"],
    location: "Colombo, Sri Lanka",
  },
];

const CircularProgress = ({
  progress,
  size = 120,
  strokeWidth = 8,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayProgress / 100) * circumference;

  useEffect(() => {
    const controls = animate(displayProgress, progress, {
      duration: 0.1,
      ease: "easeInOut",
      onUpdate: (latest) => setDisplayProgress(latest),
    });
    return () => controls.stop();
  }, [progress, displayProgress]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDashoffset: offset }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">
          {Math.round(displayProgress)}%
        </span>
      </div>
    </div>
  );
};

const OngoingProjects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ongoing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Projects
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A glimpse into the innovative solutions we are currently crafting
            for our clients.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={fadeInUp}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col transition-all hover:border-blue-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${project.color}`}>
                  {project.icon}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">{project.location}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-300 text-sm mb-6 flex-grow">
                {project.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-blue-900/50 text-blue-200 border-blue-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <CircularProgress progress={project.progress} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OngoingProjects;

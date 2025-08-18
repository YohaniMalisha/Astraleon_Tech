import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  HeartPulse,
  Ticket,
  ShoppingCart,
  Smartphone,
  User,
  CheckCircle,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const projects = [
  {
    name: "Online Nursery Plant Shopping Website",
    description:
      "Created a user-friendly and responsive online nursery plant shopping website, enabling customers to browse and purchase plants seamlessly. The site features intuitive navigation and an optimized checkout process for a smooth shopping experience.",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-green-500 to-emerald-500",
    technologies: [
      "Figma",
      "Next.js(React-based framework)",
      "Vercel",
      "Node.js",
    ],
    year: "2025",
  },
  {
    name: "Online movie ticket booking system",
    description:
      "Developed an Online Movie Ticket Booking System for university student, allowing users to browse, select, and book movie tickets seamlessly. The system features an easy-to-use interface and secure payment integration for a smooth booking experience.",
    icon: <Ticket className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-indigo-500 to-violet-500",
    technologies: ["HTML", "CSS", "JavaScript"],
    year: "2025",
  },
  {
    name: "Blood Donation Website",
    description:
      "Developed a blood donation website that allows users to easily find donation centers, schedule appointments, and track donation history. The site features a simple interface for users to access vital information and support the blood donation process.",
    icon: <HeartPulse className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-blue-500 to-sky-500",
    technologies: ["C#", "ASP.NET", "SQL Server"],
    year: "2024",
  },

  {
    name: "FitWave Fitness Mobile Application",
    description:
      "Designed a fitness mobile application, FitWave, that helps users track workouts, set fitness goals, and monitor progress. The app features an intuitive UI for a seamless user experience",
    icon: <Smartphone className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-orange-500 to-amber-500",
    technologies: ["Figma"],
    year: "2024",
  },
  {
    name: "Health Care Mobile Application",
    description:
      "Developed a Health Care Mobile Application focused on tracking health metrics and providing personalized health tips. The app, designed with Figma, ensures a user-friendly interface for efficient health management.",
    icon: <HeartPulse className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-rose-500 to-pink-500",
    technologies: ["Figma"],
    year: "2023",
  },
  {
    name: "Personal Portfolio",
    description:
      "A Personal Portfolio showcases an individual's skills, projects, and professional achievements. It serves as an online resume, highlighting expertise, work samples, and accomplishments, designed to present the individual’s qualifications and capabilities to potential employers or clients.",
    icon: <User className="w-8 h-8 text-white" />,
    color: "bg-gradient-to-tr from-rose-500 to-pink-500",
    technologies: ["HTML", "CSS"],
    year: "2021",
  },
];

const CompletedProjects = () => {
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
            Completed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Projects
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of our successfully delivered solutions and client
            successes.
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
                <div className="flex items-center gap-2 text-blue-400">
                  <CheckCircle size={18} />
                  <span className="text-sm font-semibold">
                    Completed: {project.year}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-300 text-sm mb-6 flex-grow">
                {project.description}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">
                  Technologies Used
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CompletedProjects;

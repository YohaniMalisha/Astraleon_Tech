import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, fadeIn } from '@/lib/animations';
import { Rocket, Zap, Palette, Code, Smartphone, Utensils } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern online store with advanced filtering and secure payment processing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "Stripe", "MongoDB"],
      category: "E-commerce",
      icon: <Zap className="text-blue-400" size={16} />
    },
    {
      title: "Corporate Website",
      description: "Professional business website with content management system",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
      category: "Corporate",
      icon: <Code className="text-blue-400" size={16} />
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      technologies: ["React", "D3.js", "Express", "PostgreSQL"],
      category: "SaaS",
      icon: <Palette className="text-blue-400" size={16} />
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio showcase with interactive animations",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      technologies: ["Next.js", "Framer Motion", "Sanity", "Vercel"],
      category: "Portfolio",
      icon: <Palette className="text-blue-400" size={16} />
    },
    {
      title: "Restaurant Website",
      description: "Modern restaurant site with online ordering system",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=600&h=400&fit=crop",
      technologies: ["React", "Firebase", "Stripe", "PWA"],
      category: "Restaurant",
      icon: <Utensils className="text-blue-400" size={16} />
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application for task management",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      technologies: ["React Native", "Redux", "Firebase", "Expo"],
      category: "Mobile",
      icon: <Smartphone className="text-blue-400" size={16} />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-black">
      {/* Decorative elements matching contact page */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <main className="flex-grow py-24 px-4 relative z-10">
        <div className="container mx-auto">
          {/* Updated Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium mb-6"
            >
              <Rocket className="mr-3" size={16} />
              <span className="text-white">OUR WORK</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our collection of digital masterpieces crafted with precision and passion.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all h-full group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      {project.icon}
                      {project.category}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs hover:bg-blue-800/70 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
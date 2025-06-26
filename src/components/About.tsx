import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  Code, Globe, Users, Shield,
  Zap, Palette, UsersIcon, ArrowRight,
  CircleDashed, PieChart, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer, fadeIn } from '@/lib/animations';

const About = () => {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  
  const stats = [
    { 
      value: '200+', 
      label: 'Projects',
      percentage: 95,
      icon: <Code className="text-purple-400" size={20} />,
      color: 'bg-purple-500'
    },
    { 
      value: '5+', 
      label: 'Years Exp',
      percentage: 85,
      icon: <Globe className="text-cyan-400" size={20} />,
      color: 'bg-cyan-500'
    },
    { 
      value: '98%', 
      label: 'Satisfaction',
      percentage: 98,
      icon: <Users className="text-emerald-400" size={20} />,
      color: 'bg-emerald-500'
    },
    { 
      value: '24/7', 
      label: 'Support',
      percentage: 100,
      icon: <Shield className="text-amber-400" size={20} />,
      color: 'bg-amber-500'
    }
  ];

  const teamMembers = [
    {
      name: "Yohani Wimalasena",
      role: "Founder & CEO",
      expertise: "Full-Stack Development",
      img: "/Team/Yohani.jpg",
      color: "from-purple-500 to-blue-500"
    },
    {
      name: "J K S Prabhash", 
      role: "Creative Director",
      expertise: "UI/UX Design",
      img: "/Team/Keshan.jpg",
      color: "from-cyan-500 to-emerald-500"
    }
  ];

  const coreValues = [
    {
      title: "Innovation",
      description: "Cutting-edge solutions that push boundaries",
      icon: <Zap className="text-purple-400" size={20} />,
      color: "purple"
    },
    {
      title: "Quality",
      description: "Excellence in every deliverable we create",
      icon: <Palette className="text-cyan-400" size={20} />,
      color: "cyan"
    },
    {
      title: "Collaboration",
      description: "Working together for shared success",
      icon: <UsersIcon className="text-emerald-400" size={20} />,
      color: "emerald"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(stats.map(stat => stat.percentage));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900"
    >
      {/* Colorful decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 md:mb-20 text-center"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium mb-4"
          >
            <Rocket className="mr-2" size={16} />
            OUR STORY
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Codentra</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            We combine cutting-edge technology with creative vision to deliver transformative digital experiences.
          </motion.p>
        </motion.section>

        {/* Stats Section with Circular Charts */}
        <motion.div 
          className="mb-20 md:mb-24"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex flex-col items-center"
              >
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="3"
                    />
                    <motion.path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className={`text-${stat.color.split('-')[1]}-400`}
                      initial={{ strokeDasharray: '0, 100' }}
                      animate={{ 
                        strokeDasharray: `${progress[index]}, ${100 - progress[index]}`,
                        transition: { duration: 1.5, ease: "easeOut" }
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`p-2 rounded-full mb-1 ${stat.color} bg-opacity-20`}>
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 text-center">
                  {stat.label}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Story + Values Section */}
        <motion.div 
          className="mb-20 md:mb-24 grid md:grid-cols-2 gap-8"
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
        >
          {/* Story */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
          >
            <div className="flex items-center mb-4">
              <CircleDashed className="text-purple-400 mr-3" size={24} />
              <h3 className="text-xl font-bold text-white">Our Journey</h3>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>Founded in 2018, Codentra began as a passionate team of developers with a vision to transform digital experiences.</p>
              <p>Today, we're a full-service digital agency serving global clients with award-winning solutions that drive real business results.</p>
              <p>Our story is one of continuous innovation, learning, and commitment to client success.</p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 1.0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
          >
            <div className="flex items-center mb-4">
              <PieChart className="text-cyan-400 mr-3" size={24} />
              <h3 className="text-xl font-bold text-white">Our Values</h3>
            </div>
            <div className="space-y-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900"
                >
                  <div className={`p-2 rounded-full mr-4 bg-${value.color}-500 bg-opacity-20`}>
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{value.title}</h4>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.section 
          className="mb-20 md:mb-24"
          variants={fadeInUp}
          transition={{ delay: 1.2 }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-purple-400 text-sm uppercase tracking-wider mb-3">Meet The Team</h3>
            <h2 className="text-3xl font-bold text-white">The Minds Behind The Magic</h2>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${member.color} rounded-xl overflow-hidden`}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm p-6 flex items-center h-full">
                  <div className="w-20 h-20 rounded-full overflow-hidden mr-6 border-4 border-white/10">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-white/80 text-sm mb-2">{member.role}</p>
                    <p className="text-white/60 text-xs">{member.expertise}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          variants={fadeInUp}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Let's create something extraordinary together.
            </p>
            <Link to="/contact"/>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Get Started <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </motion.section>
      </div>
    </motion.div>
    
  );
};

export default About;
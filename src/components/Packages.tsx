import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, ShoppingCart, BookOpen, Zap } from 'lucide-react';

const Packages = () => {
  const websiteTypes = [
    {
      title: "Portfolio Website",
      icon: <Layout className="text-purple-400" size={24} />,
      description: "Showcase your work and skills in a clean, professional design",
      path: "portfolio"
    },
    {
      title: "E-commerce Website",
      icon: <ShoppingCart className="text-blue-400" size={24} />,
      description: "Sell products or services online with secure shopping cart",
      path: "ecommerce"
    },
    {
      title: "Blog Website",
      icon: <BookOpen className="text-green-400" size={24} />,
      description: "Share articles and content with easy-to-navigate layout",
      path: "blog"
    },
    {
      title: "Custom Websites",
      icon: <Zap className="text-amber-400" size={24} />,
      description: "Tailored solutions for unique needs and requirements",
      path: "custom"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Website Type</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the category that best fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {websiteTypes.map((type, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 rounded-xl p-8 transition-all h-full"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    {type.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{type.title}</h2>
                </div>
                <p className="text-gray-400 mb-6 flex-grow">{type.description}</p>
                <Link 
                  to={`/packages/${type.path}`}
                  className="mt-auto inline-flex items-center justify-center py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all"
                >
                  View Packages
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
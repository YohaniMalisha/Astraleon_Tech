import { Layout, ShoppingCart, Search, Zap, Code, Rocket, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Services = () => {
  const services = [
    {
      title: "Web Design",
      icon: <Layout className="text-purple-400" size={20} />,
      description: "Beautiful, responsive designs that convert visitors to customers",
      features: ["Mobile-first design", "UI/UX focused", "Brand consistency"],
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "E-commerce",
      icon: <ShoppingCart className="text-cyan-400" size={20} />,
      description: "Complete online stores with secure checkout",
      features: ["Shopify/WooCommerce", "Payment gateways", "Inventory system"],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "SEO",
      icon: <Search className="text-amber-400" size={20} />,
      description: "Get found by your ideal customers",
      features: ["Keyword research", "Technical SEO", "Content strategy"],
      gradient: "from-amber-500 to-orange-500"
    },
    {
      title: "Web Apps",
      icon: <Code className="text-blue-400" size={20} />,
      description: "Custom applications for your business",
      features: ["React/Next.js", "Node.js backend", "Database integration"],
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Performance",
      icon: <Zap className="text-emerald-400" size={20} />,
      description: "Blazing fast website speeds",
      features: ["Speed optimization", "Image compression", "Caching"],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Marketing",
      icon: <Rocket className="text-pink-400" size={20} />,
      description: "Grow your online presence",
      features: ["Social media", "Email campaigns", "Analytics"],
      gradient: "from-pink-500 to-rose-500"
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
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium mb-6">
              <Rocket className="mr-3" size={16} />
              <span className="text-white">OUR SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Offer</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all h-full rounded-xl overflow-hidden p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${service.gradient}`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-5">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <Check className="w-4 h-4 mt-0.5 mr-3 text-blue-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Services;
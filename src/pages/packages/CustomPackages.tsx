import { motion } from 'framer-motion';
import { Check, ArrowRight, Plus, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomPackages = () => {
  const packages = [
    {
      name: "Starter Custom",
      price: "LKR 100,000+",
      description: "For small custom projects",
      features: [
        "Custom design consultation",
        "Up to 5 unique pages",
        "Basic functionality",
        "Responsive development",
        "1 revision round"
      ],
      popular: false
    },
    {
      name: "Business Custom",
      price: "LKR 250,000+",
      description: "Complete business solutions",
      features: [
        "Full custom design",
        "Advanced functionality",
        "Database integration",
        "User authentication",
        "3 revision rounds",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise Custom",
      price: "Custom Quote",
      description: "Large-scale applications",
      features: [
        "End-to-end development",
        "Scalable architecture",
        "API integrations",
        "Advanced security",
        "Unlimited revisions",
        "Dedicated project manager"
      ],
      popular: false
    }
  ];

  const services = [
    { name: "Web Applications", icon: "💻" },
    { name: "Mobile Responsive", icon: "📱" },
    { name: "CMS Development", icon: "🛠️" },
    { name: "E-commerce Solutions", icon: "🛒" },
    { name: "API Integration", icon: "🔌" },
    { name: "UI/UX Design", icon: "🎨" },
    { name: "Performance Optimization", icon: "⚡" },
    { name: "Ongoing Maintenance", icon: "🔄" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Solutions</span>
          </h1>
          <Link to="/packages" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
            <ArrowRight className="rotate-180 mr-2" /> Back to all packages
          </Link>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tailored web solutions designed specifically for your unique requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`flex flex-col h-full bg-gray-900/80 backdrop-blur-sm border rounded-xl p-8 transition-all relative overflow-hidden ${
                pkg.popular 
                  ? "border-purple-500 shadow-lg shadow-purple-500/20" 
                  : "border-gray-700 hover:border-blue-500"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="flex-grow">
                <div className="flex items-start mb-4">
                  <Wand2 className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                    <div className="text-3xl font-bold text-blue-400">{pkg.price}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                
                <div className="border-t border-gray-700 my-4"></div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all mt-auto">
                Get Custom Quote
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Our Custom Services
            </span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 border border-gray-700 hover:border-blue-400 rounded-xl p-6 transition-all text-center"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-white">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to build something unique?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us for a free consultation and custom quote tailored to your specific needs.
          </p>
          <Link to="/contact">
            <button className="inline-flex items-center justify-center py-3 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all">
              Request Consultation <ArrowRight className="ml-2" size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomPackages;
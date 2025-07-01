import { motion } from 'framer-motion';
import { Check, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPackages = () => {
  const packages = [
    {
      name: "Basic Portfolio",
      price: "LKR 30,000",
      pageLimit: "Up to 5 pages",
      features: [
        "Responsive design",
        "Basic contact form",
        "Mobile-friendly layout",
        "1-year free hosting"
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: false
    },
    {
      name: "Standard Portfolio",
      price: "LKR 50,000",
      pageLimit: "Up to 10 pages",
      features: [
        "Custom design",
        "Basic SEO optimization",
        "Social media integration",
        "CMS for easy updates",
        "Performance optimization"
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: true
    },
    {
      name: "Premium Portfolio",
      price: "LKR 70,000",
      pageLimit: "Up to 20 pages",
      features: [
        "Full custom branding",
        "Advanced SEO optimization",
        "CMS integration",
        "Advanced animations",
        "Priority support",
        "Monthly analytics reports"
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: false
    }
  ];

  const addOns = [
    { name: "SEO Optimization", price: "LKR 15,000", icon: "🔍" },
    { name: "SSL Certificate", price: "LKR 5,000", icon: "🔒" },
    { name: "Custom Logo Design", price: "LKR 10,000", icon: "🎨" },
    { name: "Content Writing", price: "LKR 5,000/page", icon: "✍️" },
    { name: "Monthly Maintenance", price: "LKR 10,000/mo", icon: "⚙️" },
    { name: "Domain Registration", price: "LKR 3,000/yr", icon: "🌐" },
    { name: "Hosting", price: "LKR 5,000/yr", icon: "🖥️" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Packages</span>
          </h1>
          <Link 
            to="/packages" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowRight className="rotate-180 mr-2" /> Back to all packages
          </Link>
        </div>

        {/* Packages Grid - Equal Height Cards */}
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
                <h2 className="text-2xl font-bold text-white mb-2">{pkg.name}</h2>
                <div className="text-3xl font-bold text-blue-400 mb-2">{pkg.price}</div>
                <p className="text-gray-400 text-sm mb-4">{pkg.pageLimit}</p>
                
                <div className="border-t border-gray-700 my-4"></div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-sm text-gray-400 mb-6">
                  <span className="font-medium">Additional pages:</span> {pkg.additionalPagePrice}
                </div>
              </div>
              
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all mt-auto">
                Select Package
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Add-Ons Section */}
<div className="mb-16">
  <h2 className="text-2xl font-bold text-white mb-8 text-center">
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
      Enhance Your Package
    </span>
  </h2>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {addOns.map((addon, index) => (
      <motion.div
        key={index}
        whileHover={{ y: -5 }}
        className="bg-gray-800/50 border border-gray-700 hover:border-blue-400 rounded-xl transition-all overflow-hidden"
      >
        <div className="p-5 flex flex-col h-full">
          <div className="text-3xl mb-3 text-center">{addon.icon}</div>
          <h3 className="font-bold text-white text-center mb-1">{addon.name}</h3>
          <p className="text-blue-300 text-lg font-medium text-center mb-4">{addon.price}</p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-auto w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg flex items-center justify-center transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </motion.button>
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default PortfolioPackages;
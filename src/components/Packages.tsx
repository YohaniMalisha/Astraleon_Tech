import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Layout, BookOpen, Zap, Check, ArrowRight } from 'lucide-react';

// Package Selection Page
const Packages = () => {
  const websiteTypes = [
    {
      title: "Portfolio Websites",
      icon: <Layout className="text-purple-400" size={24} />,
      description: "Showcase your work professionally",
      cta: "View Portfolio Packages"
    },
    {
      title: "E-commerce Websites",
      icon: <ShoppingCart className="text-blue-400" size={24} />,
      description: "Sell products online with ease",
      cta: "View E-commerce Packages"
    },
    {
      title: "Blog Websites",
      icon: <BookOpen className="text-green-400" size={24} />,
      description: "Share your ideas with the world",
      cta: "View Blog Packages"
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
            Select the category that best fits your needs to see available packages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {websiteTypes.map((type, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 rounded-xl p-8 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  {type.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{type.title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{type.description}</p>
              <Link 
                to={`/packages/${type.title.toLowerCase().replace(' ', '-')}`}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
              >
                {type.cta}
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Individual Package Type Page (e.g., Portfolio Packages)
const PortfolioPackages = () => {
  const packages = [
    {
      name: "Basic Portfolio",
      price: "LKR 30,000",
      features: [
        "1-5 pages",
        "Responsive design",
        "Basic contact form",
        "Free 1-year hosting"
      ],
      popular: false
    },
    {
      name: "Standard Portfolio",
      price: "LKR 50,000",
      features: [
        "6-10 pages",
        "Custom design",
        "Basic SEO",
        "Social media integration",
        "CMS for content updates"
      ],
      popular: true
    },
    {
      name: "Premium Portfolio",
      price: "LKR 70,000",
      features: [
        "10+ pages",
        "Custom branding",
        "Advanced animations",
        "Full SEO optimization",
        "Priority support",
        "Monthly analytics"
      ],
      popular: false
    }
  ];

  const addOns = [
    { name: "SEO Optimization", price: "LKR 15,000" },
    { name: "SSL Certificate", price: "LKR 5,000" },
    { name: "Custom Logo Design", price: "LKR 10,000" },
    { name: "Content Writing", price: "LKR 5,000/page" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Packages</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the package that fits your needs and budget
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`bg-gray-900/80 backdrop-blur-sm border rounded-xl p-8 transition-all relative overflow-hidden ${
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
              <h2 className="text-2xl font-bold text-white mb-2">{pkg.name}</h2>
              <div className="text-3xl font-bold text-blue-400 mb-6">{pkg.price}</div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all">
                Select Package
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 border border-gray-700 hover:border-blue-500 rounded-lg p-6 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">{addon.name}</h3>
                <div className="text-blue-400 font-medium mb-4">{addon.price}</div>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                  Add to Package
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Page
const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-white mb-8">Complete Your Order</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-white">Standard Portfolio Package</h3>
                  <span className="text-blue-400">LKR 50,000</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">SEO Optimization</span>
                  <span className="text-blue-400">LKR 15,000</span>
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                <div className="flex justify-between items-center font-bold text-white">
                  <span>Total</span>
                  <span>LKR 65,000</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Project Details</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all mt-6"
                >
                  Complete Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard Component (simplified)
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Codentra Pro Admin</h1>
          <nav className="flex space-x-6">
            <a href="#" className="hover:text-blue-400">Dashboard</a>
            <a href="#" className="hover:text-blue-400">Projects</a>
            <a href="#" className="hover:text-blue-400">Settings</a>
          </nav>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-800 mb-2">Active Projects</h3>
            <p className="text-3xl text-blue-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-800 mb-2">Pending Requests</h3>
            <p className="text-3xl text-yellow-600">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-800 mb-2">Completed</h3>
            <p className="text-3xl text-green-600">28</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-gray-800 mb-2">Revenue</h3>
            <p className="text-3xl text-purple-600">LKR 1,450,000</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Project</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Portfolio Website</td>
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Completed</span>
                  </td>
                  <td className="py-3 px-4">2023-10-15</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">E-commerce Store</td>
                  <td className="py-3 px-4">Jane Smith</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">In Progress</span>
                  </td>
                  <td className="py-3 px-4">2023-11-20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
import { motion } from 'framer-motion';
import { Check, ArrowRight, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePackage } from '@/context/PackageContext';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const BlogPackages = () => {
  const { user } = useAuth();
  const { 
    order, 
    selectPackage, 
    addAddOn, 
    removeAddOn 
  } = usePackage();

  const packages = [
    {
      id: 'blog-basic',
      name: "Basic Blog",
      price: "LKR 20,000",
      postLimit: "Up to 10 posts",
      features: [
        "Clean blog layout",
        "Basic contact form",
        "Category organization",
        "Mobile responsive",
        "1-year free hosting"
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: false
    },
    // ... other packages with ids
  ];

  const addOns = [
    {
      id: 'addon-seo',
      name: "SEO Optimization",
      price: "LKR 15,000",
      icon: "🔍"
    },
    // ... other addons with ids
  ];

  const handleAddAddOn = (addon: AddOn) => {
    if (!user) {
      toast.error('Please login to add services', {
        action: {
          label: 'Login',
          onClick: () => navigate('/login')
        }
      });
      return;
    }

    addAddOn(addon);
    toast.success(`${addon.name} added`, {
      position: 'top-center',
      duration: 2000,
      style: {
        background: '#1e293b',
        color: '#ffffff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem'
      },
      icon: <Plus className="text-blue-400" />,
    });
  };

  const handleRemoveAddOn = (addonId: string) => {
    removeAddOn(addonId);
    toast.error('Service removed', {
      position: 'top-center',
      duration: 2000,
      style: {
        background: '#1e293b',
        color: '#ffffff',
        border: '1px solid #ef4444',
        borderRadius: '0.5rem'
      },
      icon: <X className="text-red-400" />,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        {/* ... header remains the same ... */}

        {/* Current Selection Panel */}
        {(order.package || order.addOns.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-blue-500 rounded-xl p-6 mb-8 shadow-lg shadow-blue-500/20"
          >
            {/* ... selection panel content ... */}
          </motion.div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg}
              isSelected={order.package?.id === pkg.id}
              onSelect={() => selectPackage(pkg)}
            />
          ))}
        </div>

        {/* Add-Ons Section */}
        <AddOnsSection 
          addOns={addOns} 
          selectedAddOns={order.addOns}
          onAdd={handleAddAddOn}
          onRemove={handleRemoveAddOn}
        />
      </div>
    </div>
  );
};

// Extracted components for better readability
const PackageCard = ({ pkg, isSelected, onSelect }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`flex flex-col h-full bg-gray-900/80 backdrop-blur-sm border rounded-xl p-8 transition-all relative overflow-hidden ${
      pkg.popular ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-gray-700 hover:border-blue-500"
    } ${isSelected ? 'ring-2 ring-blue-400 scale-[1.02]' : ''}`}
  >
    {/* ... package card content ... */}
    <button
      onClick={onSelect}
      className={`w-full py-3 font-medium rounded-lg transition-all mt-auto ${
        isSelected
          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
      }`}
    >
      {isSelected ? '✓ Selected' : 'Select Package'}
    </button>
  </motion.div>
);

const AddOnsSection = ({ addOns, selectedAddOns, onAdd, onRemove }) => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold text-white mb-8 text-center">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Enhance Your Blog
      </span>
    </h2>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {addOns.map((addon) => (
        <AddOnCard 
          key={addon.id}
          addon={addon}
          isSelected={selectedAddOns.some(a => a.id === addon.id)}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  </div>
);

const AddOnCard = ({ addon, isSelected, onAdd, onRemove }) => (
  <motion.div
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
        onClick={() => isSelected ? onRemove(addon.id) : onAdd(addon)}
        className={`mt-auto w-full py-2 px-4 text-white font-medium rounded-lg flex items-center justify-center transition-all ${
          isSelected 
            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
        }`}
      >
        {isSelected ? (
          <>
            <X className="w-4 h-4 mr-2" />
            Remove
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </>
        )}
      </motion.button>
    </div>
  </motion.div>
);

export default BlogPackages;
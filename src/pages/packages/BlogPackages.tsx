import { motion } from "framer-motion";
import { Check, ArrowRight, Plus, X, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePackage } from "@/context/PackageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

interface Package {
  id: string;
  name: string;
  price: string;
  postLimit: string;
  features: string[];
  additionalPagePrice: string;
  popular: boolean;
}

interface AddOn {
  id: string;
  name: string;
  price: string;
  icon: string;
}

const BlogPackages = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { order, selectPackage, addAddOn, removeAddOn, clearOrder } = usePackage();

  const packages: Package[] = [
    {
      id: "blog-basic",
      name: "Basic Blog",
      price: "LKR 20,000",
      postLimit: "Up to 10 posts",
      features: [
        "Clean blog layout",
        "Basic contact form",
        "Category organization",
        "Mobile responsive",
        "1-year free hosting",
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: false,
    },
    {
      id: "blog-standard",
      name: "Standard Blog",
      price: "LKR 40,000",
      postLimit: "10-20 posts",
      features: [
        "Social media sharing",
        "Basic SEO optimization",
        "Email subscriptions",
        "Author profiles",
        "Search functionality",
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: true,
    },
    {
      id: "blog-premium",
      name: "Premium Blog",
      price: "LKR 60,000",
      postLimit: "Unlimited posts",
      features: [
        "Advanced SEO tools",
        "Comment moderation",
        "Newsletter integration",
        "User engagement features",
        "Custom analytics",
        "Priority support",
      ],
      additionalPagePrice: "LKR 5,000 per page",
      popular: false,
    },
  ];

  const addOns: AddOn[] = [
    {
      id: "addon-seo",
      name: "SEO Optimization",
      price: "LKR 15,000",
      icon: "🔍",
    },
    {
      id: "addon-content",
      name: "Content Writing",
      price: "LKR 5,000/post",
      icon: "✍️",
    },
    {
      id: "addon-social",
      name: "Social Media Setup",
      price: "LKR 10,000",
      icon: "📱",
    },
    {
      id: "addon-newsletter",
      name: "Newsletter Design",
      price: "LKR 12,000",
      icon: "📧",
    },
    {
      id: "addon-maintenance",
      name: "Monthly Maintenance",
      price: "LKR 8,000/mo",
      icon: "⚙️",
    },
    {
      id: "addon-graphics",
      name: "Custom Graphics",
      price: "LKR 7,000",
      icon: "🎨",
    },
    {
      id: "addon-video",
      name: "Video Integration",
      price: "LKR 15,000",
      icon: "🎥",
    },
  ];

 const showAuthToast = (action: string) => {
    toast(`🔒 ${action} Requires Login`, {
      description: "Please login to access this feature",
      action: {
        label: "Login Now",
        onClick: () => navigate("/login"),
      },
      position: "top-center",
      duration: 5000,
      style: {
        background: "linear-gradient(to right, #4f46e5, #9333ea)",
        color: "white",
        border: "none",
        fontSize: "1.05rem",
        padding: "1rem",
      },
      icon: <Lock className="text-yellow-300" size={20} />,
    });
  };

  const handleSelectPackage = (pkg: Package) => {
    if (!isAuthenticated) {
      showAuthToast("Package Selection");
      return;
    }
    selectPackage(pkg);
    showSuccessToast(`${pkg.name} package selected`);
  };

  const handleAddAddOn = (addon: AddOn) => {
    if (!isAuthenticated) {
      showAuthToast("Add-On Selection");
      return;
    }
    if (!order.package) {
      toast.error("Please select a package first", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "white",
          border: "1px solid #ef4444",
          borderRadius: "0.5rem",
          padding: "1rem",
        },
      });
      return;
    }
    addAddOn(addon);
    showSuccessToast(`${addon.name} added to your package`);
  };

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-center",
      duration: 3000,
      style: {
        background: "#1e293b",
        color: "white",
        border: "1px solid #10b981",
        borderRadius: "0.5rem",
        padding: "1rem",
      },
      icon: <Check className="text-green-400" size={18} />,
    });
  };


  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-center",
      duration: 2000,
      style: {
        background: "#1e293b",
        color: "#ffffff",
        border: "1px solid #ef4444",
        borderRadius: "0.5rem",
        padding: "0.75rem 1.25rem",
      },
      icon: <X className="text-red-400" size={18} />,
    });
  };

  // Clear order when leaving page
  useEffect(() => {
    return () => {
      if (window.location.pathname !== "/packages/blog/checkout") {
        clearOrder();
      }
    };
  }, [clearOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Packages
            </span>
          </h1>
          <Link
            to="/packages"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowRight className="rotate-180 mr-2" /> Back to all packages
          </Link>
        </div>

        {/* Current Selection Panel */}
        {(order.package || order.addOns.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-blue-500 rounded-xl p-6 mb-8 shadow-lg shadow-blue-500/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="bg-blue-500 w-3 h-3 rounded-full mr-2"></span>
              Your Current Selection
            </h2>

            {order.package && (
              <div className="mb-4 p-4 bg-gray-800/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-blue-400">
                      {order.package.name}
                    </h3>
                    <p className="text-white">{order.package.price}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {order.package.postLimit}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      clearOrder();
                      showErrorToast("Package selection cleared");
                    }}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            {order.addOns.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-300 mb-3">
                  Added Services:
                </h3>
                <div className="space-y-2">
                  {order.addOns.map((addon) => (
                    <motion.div
                      key={addon.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex justify-between items-center bg-gray-800/40 p-3 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{addon.icon}</span>
                        <div>
                          <p className="text-white">{addon.name}</p>
                          <p className="text-blue-300 text-sm">{addon.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveAddOn(addon.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {order.package && (
              <Link
                to="/packages/blog/checkout"
                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg flex items-center justify-center transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2" size={18} />
              </Link>
            )}
          </motion.div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -5 }}
              className={`flex flex-col h-full bg-gray-900/80 backdrop-blur-sm border rounded-xl p-8 transition-all relative overflow-hidden ${
                pkg.popular
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-gray-700 hover:border-blue-500"
              } ${
                order.package?.id === pkg.id
                  ? "ring-2 ring-blue-400 scale-[1.02]"
                  : ""
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h2>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {pkg.price}
                </div>
                <p className="text-gray-400 text-sm mb-4">{pkg.postLimit}</p>

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
                  <span className="font-medium">Additional pages:</span>{" "}
                  {pkg.additionalPagePrice}
                </div>
              </div>

              <button
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full py-3 font-medium rounded-lg transition-all mt-auto ${
                  order.package?.id === pkg.id
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                }`}
              >
                {order.package?.id === pkg.id ? "✓ Selected" : "Select Package"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Enhance Your Blog
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon) => (
              <motion.div
                key={addon.id}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 border border-gray-700 hover:border-blue-400 rounded-xl transition-all overflow-hidden"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="text-3xl mb-3 text-center">{addon.icon}</div>
                  <h3 className="font-bold text-white text-center mb-1">
                    {addon.name}
                  </h3>
                  <p className="text-blue-300 text-lg font-medium text-center mb-4">
                    {addon.price}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddAddOn(addon)}
                    disabled={order.addOns.some((a) => a.id === addon.id)}
                    className={`mt-auto w-full py-2 px-4 text-white font-medium rounded-lg flex items-center justify-center transition-all ${
                      order.addOns.some((a) => a.id === addon.id)
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    }`}
                  >
                    {order.addOns.some((a) => a.id === addon.id) ? (
                      "Added ✓"
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                      </>
                    )}
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

export default BlogPackages;
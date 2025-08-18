import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SERVICES", path: "/services" },
    { name: "ONGOING PROJECTS", path: "/ongoing-projects" },
    { name: "COMPLETED PROJECTS", path: "/completed-projects" },
    // { name: 'PACKAGES', path: '/packages' },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="fixed w-full z-50 bg-[#050a1a] backdrop-blur-md border-b border-blue-900/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-poppins uppercase tracking-wide hover:from-blue-300 hover:to-cyan-200 transition-all"
        >
          Astraleon Tech
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="relative px-4 py-2 uppercase text-sm font-medium tracking-wide transition-colors"
                >
                  <span
                    className={`relative z-10 ${
                      activeLink === link.path
                        ? "text-white"
                        : "text-blue-300/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>

                  {activeLink === link.path && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute inset-0 bg-blue-900/50 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-300 hover:text-white p-1 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[#050a1a] py-4 px-6 border-t border-blue-900/30 shadow-xl"
          >
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded-md transition-colors ${
                      activeLink === link.path
                        ? "bg-blue-900/50 text-white"
                        : "text-blue-300/90 hover:text-white hover:bg-blue-900/30"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center"
                    >
                      {activeLink === link.path && (
                        <motion.span
                          className="w-1 h-5 bg-blue-400 mr-2 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  );
}

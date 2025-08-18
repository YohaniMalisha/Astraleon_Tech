import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ArrowUp, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050a1a] border-t border-blue-900/30 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column - Left Aligned */}
          <div className="md:col-span-2 space-y-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase tracking-wide"
            >
              Astraleon Tech
            </motion.div>
            <p className="text-gray-400 text-base">
              Professional web development services delivered online.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <Facebook className="text-blue-300" size={20} />, label: "Facebook" },
                { icon: <Twitter className="text-blue-300" size={20} />, label: "Twitter" },
                { icon: <Linkedin className="text-blue-300" size={20} />, label: "LinkedIn" },
                { icon: <Instagram className="text-blue-300" size={20} />, label: "Instagram" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="p-2 bg-blue-900/30 rounded-full hover:bg-blue-800/50 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column - Left Aligned */}
          <div className="space-y-4">
            <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-2 flex items-center">
              <Rocket className="text-blue-400 mr-2" size={16} />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Ongoing Projects', path: '/ongoing-projects' },
                { name: 'Completed Projects', path: '/completed-projects' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-blue-300 transition-colors text-base block text-left"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Column - Left Aligned */}
          <div className="space-y-4">
            <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-2 flex items-center">
              <Rocket className="text-blue-400 mr-2" size={16} />
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' },
                { name: 'Cookie Policy', path: '#' }
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={link.path}
                    className="text-gray-400 hover:text-blue-300 transition-colors text-base block text-left"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Maintained Alignment */}
        <div className="border-t border-blue-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm md:text-left">
            © {currentYear} Astraleon Tech. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            className="text-blue-300 hover:text-white flex items-center text-sm mt-4 md:mt-0"
          >
            Back to Top
            <ArrowUp className="ml-2" size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
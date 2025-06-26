import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import '../../src/components/css/Hero.css';
import { fadeInUp, staggerContainer, fadeIn } from '@/lib/animations';

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-black to-black min-h-screen">
      <ParticleBackground />

      {/* Hero Image with Gradient Overlay */}
      <div className="hero-image absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1920&h=1080&fit=crop"
          alt="Web Development Code"
          className="hero-image__img w-full h-full object-cover"
        />
        <div className="hero-image__gradient absolute inset-0 bg-gradient-to-t from-blue-900/80 via-black/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.h1 
            variants={fadeInUp}
            className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Transform Your Business with Stunning Websites
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="hero-paragraph text-xl text-gray-300 mb-6"
          >
            Professional web development that drives results. We create modern, responsive websites
            that captivate your audience and grow your business.
          </motion.p>

          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="hero-description text-lg text-gray-400 mb-8 max-w-3xl mx-auto"
          >
            From concept to launch, we deliver exceptional digital experiences that set you apart
            from the competition. Join hundreds of satisfied clients worldwide.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
            className="cta-buttons flex justify-center gap-4 mb-16"
          >
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="cta-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  Get Your Free Quote
                </Button>
              </motion.div>
            </Link>
            <Link to="/portfolio">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="cta-button border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  View Our Work
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 0.8 }}
            className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="contents"
            >
              {[{ 
                icon: "⚡", 
                title: "Fast Delivery", 
                description: "Get your website live in just 7-14 days" 
              },
              { 
                icon: "💎", 
                title: "Premium Quality", 
                description: "Modern designs that convert visitors to customers" 
              },
              { 
                icon: "🌍", 
                title: "Global Reach", 
                description: "Serving clients worldwide with 24/7 support" 
              }].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <Card className="feature-card bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500 transition-all h-full">
                    <CardContent className="p-6">
                      <div className="feature-card__icon text-3xl mb-3">{feature.icon}</div>
                      <h3 className="feature-card__title text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="feature-card__description text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 1.6 }}
            className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="contents"
            >
              {[ 
                { number: "200+", text: "Websites Delivered" },
                { number: "99%", text: "Client Satisfaction" },
                { number: "24/7", text: "Online Support" },
                { number: "5★", text: "Average Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="stat-card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
                >
                  <div className="stat-card__number text-3xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="stat-card__text text-gray-300">{stat.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ParticleBackground = () => {
  const particles = Array(30).fill(0);

  return (
    <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500"
          style={{
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 40],
            y: [0, (Math.random() - 0.5) * 40],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Hero;
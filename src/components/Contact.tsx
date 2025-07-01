import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Phone, MessageSquare, Clock, 
  Zap, Shield, Palette, Send, Rocket, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/animations";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "🚀 Message Sent Successfully!",
        description: "Astraleon Tech team will contact you within 24 hours.",
        style: {
          backgroundColor: '#1e3a8a',
          color: 'white',
          border: 'none'
        }
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly at astraleontech@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: "website-design", label: "Website Design", icon: <Palette className="text-primary" size={16} /> },
    { value: "ecommerce", label: "E-commerce", icon: <Zap className="text-primary" size={16} /> },
    { value: "seo", label: "SEO Optimization", icon: <Shield className="text-primary" size={16} /> },
    { value: "maintenance", label: "Website Maintenance", icon: <Clock className="text-primary" size={16} /> },
  ];

  const faqs = [
    {
      question: "How does the online process work?",
      answer: "We handle everything remotely through video calls, emails, and project management tools. You'll have full visibility into the development process.",
      icon: <MessageSquare className="text-primary" size={20} />
    },
    {
      question: "What's the typical project timeline?",
      answer: "Most websites are completed within 2-4 weeks, depending on complexity. We'll provide a detailed timeline during our initial consultation.",
      icon: <Clock className="text-primary" size={20} />
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive maintenance packages to keep your website updated, secure, and performing optimally.",
      icon: <Shield className="text-primary" size={20} />
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-black to-black">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <main className="flex-grow py-24 px-4 relative z-10">
        <div className="container mx-auto">
          {/* Header Section - Removed animation from CONTACT ASTRALEON TECH */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-sm font-medium mb-6">
              <Rocket className="mr-3" size={16} />
              <span className="text-white">CONTACT ASTRALEON TECH</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Together</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have a project in mind? Reach out and let's discuss how we can bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold flex items-center gap-3 text-white">
                    <MessageSquare className="text-blue-400" size={28} />
                    Contact Our Team
                  </CardTitle>
                  <p className="text-gray-400 text-lg">
                    We'll respond within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <input type="hidden" name="contact_number" value={Date.now()} />
                    <input type="hidden" name="to_email" value="astraleontech@gmail.com" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Full Name *
                        </label>
                        <Input
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-blue-400"
                          placeholder="" // Removed placeholder text
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Email Address *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-blue-400"
                          placeholder="" // Removed placeholder text
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-blue-400"
                          placeholder="" // Removed placeholder text
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Service Needed *
                        </label>
                        <select
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        >
                          <option value="" className="text-gray-500">Select a service</option>
                          {services.map((service) => (
                            <option key={service.value} value={service.value} className="bg-gray-800">
                              {service.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Project Details *
                      </label>
                      <Textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-blue-400"
                        placeholder="" // Removed placeholder text
                      />
                    </div>

                    {/* Modified Send Button - Smaller and rounded edges */}
                    <motion.button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-lg font-bold relative overflow-hidden group rounded-full" // Changed py-6 to py-4 and added rounded-full
                    >
                      <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 ${isSubmitting ? 'opacity-80' : 'group-hover:from-blue-700 group-hover:to-blue-800'} transition-all duration-300 rounded-full`}></span>
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" /> {/* Adjusted size */}
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="mr-3 h-5 w-5" /> {/* Adjusted size */}
                            <span>Send Message</span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h3 className="text-4xl font-bold text-white mb-6 flex items-center justify-center lg:justify-start gap-3">
                  <Zap className="text-blue-400" size={28} />
                  Common Questions
                </h3>
                <p className="text-gray-400 text-lg mb-8">
                  Everything you need to know about working with Astraleon Tech
                </p>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-5">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                          {faq.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1,
      } 
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const socialLinks = [
    
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
    
    
  ];

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gray-900 text-gray-200 pt-16 pb-8"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div variants={childVariants} className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white">
              <Code size={24} className="text-primary-400" />
              <span>Little Friends Kids Society</span>
            </Link>
            <p className="text-gray-400 mt-2">
            Empowering the future through unity, compassion, and community-driven initiatives for the betterment of children
            </p>
          </motion.div>
          
          <motion.div variants={childVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/vision" className="text-gray-400 hover:text-primary-400 transition-colors">Vision & Mission</Link></li>
              <li><Link to="/founders" className="text-gray-400 hover:text-primary-400 transition-colors">Founders</Link></li>
              <li><Link to="/leadership" className="text-gray-400 hover:text-primary-400 transition-colors">Leadership</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={childVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Learning</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={childVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-gray-400 flex items-center gap-2">
              <Mail size={16} /> lfks.society@gmail.com
            </p>
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={childVariants}
          className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>&copy; {currentYear} Little Friends Kids Society. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Navigation structure with dropdowns
  const navLinks = [
    { text: 'Home', path: '/' },
    { 
      text: 'More', 
      path: '',
      dropdown: [
        { text: 'Vision & Mission', path: '/vision' },
        { text: 'Founders', path: '/founders' },
        { text: 'Members', path: '/leadership' }
        
        
      ]
    },
    { text: 'About', path: '/about' },
    { text: 'Projects', path: '/projects' },
    { text: 'Gallery', path: '/gallery' }
    
  ];

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const menuVariants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, staggerChildren: 0.05, delayChildren: 0.05 } }
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: -10, height: 0 },
    open: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.3 } }
  };

  const menuItemVariants = {
    closed: { y: 10, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? 'bg-white py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-10">
            <div className="relative">
              <motion.img
                src="/logo.png"
                alt="Little Friends Kids Society"
                className="w-10 h-10 object-contain relative z-10"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 359] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-primary-100"
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.7, 0.9, 0.7]
                }}
                style={{ translateX: "-50%", translateY: "-50%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 hidden sm:block">
                Little Friends <span className="text-primary-600">Kids Society</span>
              </span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">
                LFKS
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">Empowering Tomorrow's Leaders</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                {/* Main nav item */}
                {link.dropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(link.text)}
                    className={`px-4 py-2 rounded-md flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive(link.path) 
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.text}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${activeDropdown === link.text ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.text}
                  </Link>
                )}

                {/* Dropdown menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.text && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-1 mt-1 z-50"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              location.pathname === item.path
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                          >
                            {item.text}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none z-20"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 1 }
              }}
            >
              {isMenuOpen ? (
                <X size={26} className="text-gray-900" />
              ) : (
                <Menu size={26} className={isScrolled ? "text-gray-900" : "text-gray-900"} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 overflow-y-auto lg:hidden pt-24"
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="container mx-auto px-6 py-8 flex flex-col space-y-6"
            >
              {navLinks.map((link) => (
                <motion.div key={link.text} variants={menuItemVariants} className="border-b border-gray-100 pb-4">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(link.text)}
                        className="flex items-center justify-between w-full text-xl font-medium text-gray-900"
                      >
                        {link.text}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${activeDropdown === link.text ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === link.text && (
                          <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={dropdownVariants}
                            className="mt-4 ml-4 flex flex-col space-y-3"
                          >
                            {link.dropdown.map((item) => (
                              <motion.div key={item.path} variants={menuItemVariants}>
                                <Link
                                  to={item.path}
                                  className={`block text-lg transition-colors ${
                                    location.pathname === item.path
                                      ? 'text-primary-600 font-medium'
                                      : 'text-gray-700 hover:text-primary-600'
                                  }`}
                                >
                                  {item.text}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block text-xl font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-primary-600'
                          : 'text-gray-900 hover:text-primary-600'
                      }`}
                    >
                      {link.text}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.div variants={menuItemVariants} className="pt-4">
                <Link
                  to="/contact.tsx"
                  className="block w-full text-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors shadow-md"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
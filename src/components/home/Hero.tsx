import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WebGLBackground from './WebGLBackground';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handler functions for client-side navigation without page reload
  const navigateToMission = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use client-side routing - this approach works with React Router and most React frameworks
    window.history.pushState({}, "", "/vision");
    // Dispatch navigation event to trigger router updates
    window.dispatchEvent(new Event('popstate'));
  };
  
  const navigateToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, "", "/projects");
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div 
      ref={ref}
      className="relative h-screen flex items-center overflow-hidden"
    >
      <WebGLBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 z-10" />
      
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 md:px-6 relative z-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.2
            }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-block bg-primary-50 px-4 py-1.5 rounded-full text-primary-700 font-medium text-sm">
              Empowering the next generation
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.4
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight"
          >
            <span className="block"></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500">
              Little Friends Kids Society
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.6
            }}
            className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
          >
            The Society of Little Friends is building a compassionate community where charity inspires friendship, and members learn to work together as a team to create a positive impact.
          </motion.p>
          
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.8
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToMission}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-all duration-300"
            >
              Explore our mission <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToProjects}
              className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 border border-gray-200"
            >
              Learn more
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-gray-600 mb-2">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

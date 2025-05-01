import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800 opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-primary-400 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -30, 0],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-secondary-300 opacity-20 blur-3xl"
        />
      </div>
      
      
    </section>
  );
};

export default CTA;
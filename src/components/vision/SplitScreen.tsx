import { Target, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SplitScreen = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto pt-20 pb-12 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-700 to-accent-500 bg-clip-text text-transparent"
        >
          Our Vision & Mission
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          Working together to create a brighter future for all children
        </motion.p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="h-2 bg-gradient-to-r from-primary-600 to-primary-400"></div>
            <div className="bg-primary-900 text-white p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-primary-800 flex items-center justify-center mr-4">
                  <Target size={24} className="text-primary-300" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
              </div>
              
              <p className="text-xl text-primary-100 leading-relaxed mb-10">
                A future where all children thrive, with a focus on their rights, well-being, and opportunities.
                <br /><br />
                ඔවුන්ගේ අයිතිවාසිකම්, යහපැවැත්ම සහ අවස්ථාවන් කෙරෙහි අවධානය යොමු කරමින් සියලුම දරුවන් සමෘද්ධිමත් වන අනාගතයක්.
              </p>
          
              
            
            </div>
          </motion.div>
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="h-2 bg-gradient-to-r from-accent-500 to-accent-300"></div>
            <div className="bg-white text-gray-900 p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <Compass size={24} className="text-accent-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-10">
              Sailing for an unstoppable tomorrow.
              <br /><br />
               නැවැත්විය නොහැකි හෙටක් සඳහා යාත්‍රා කිරීම
              </p>
              
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplitScreen;
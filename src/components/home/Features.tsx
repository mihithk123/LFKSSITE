import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, BookOpen, Users, Award, Lightbulb, Globe, ArrowRight, Check } from 'lucide-react';

const BenefitsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-70"></div>
        <div className="absolute -right-40 top-20 opacity-10">
          <Code size={400} />
        </div>

        <div className="container relative mx-auto px-4 md:px-6 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >



            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20">
                <img
                  src="/222.jpg"
                  alt="What We Did"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">

                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">lfks.society@gmail.com</h3>
              <p className="text-gray-600">

              </p>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-3"
            >


            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenefitsPage;
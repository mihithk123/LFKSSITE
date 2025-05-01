import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CustomCursor from './components/shared/CustomCursor';
import PageTransition from './components/shared/PageTransition';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Vision from './pages/Vision';
import Founders from './pages/Founders';
import Leadership from './pages/Leadership';
import Gallery from './pages/Gallery';
import Projects from './pages/Projects';
import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulated loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);

    // Complete loading after progress reaches 100%
    const completeLoading = setTimeout(() => {
      if (loadingProgress === 100) {
        setLoading(false);
        clearInterval(interval);
      }
    }, 500);

    // Ensure loading completes even if progress simulation is slow
    const maxLoadingTime = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => setLoading(false), 500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(completeLoading);
      clearTimeout(maxLoadingTime);
    };
  }, [loadingProgress]);

  // Animated logo paths for loading screen
  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center z-50 overflow-hidden">
        {/* Background animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-primary-200 opacity-20"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, x: -50, y: -50 }}
              animate={{ 
                scale: [0, 1.2, 1],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse",
                delay: index * 0.5
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center z-10"
        >
          {/* Animated SVG logo */}
          <motion.div 
            className="w-32 h-32 mb-8"
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut",
              times: [0, 0.6, 0.8, 1]
            }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Circle background */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#4338ca"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1
                }}
                transition={{ 
                  delay: 0.2,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              />
              
              {/* Simple stylized child figure */}
              <motion.path
                d="M50 25 C60 25, 65 35, 65 45 C65 55, 60 60, 50 60 C40 60, 35 55, 35 45 C35 35, 40 25, 50 25"
                fill="none"
                stroke="#6366f1" 
                strokeWidth="3"
                strokeLinecap="round"
                variants={logoPathVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.5
                }}
              />
              
              {/* Head */}
              <motion.circle
                cx="50"
                cy="30"
                r="10"
                fill="#6366f1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
              
              {/* Arms */}
              <motion.path
                d="M35 40 L25 45 M65 40 L75 45"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                variants={logoPathVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 1.2
                }}
              />
              
              {/* Legs */}
              <motion.path
                d="M45 60 L40 75 M55 60 L60 75"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                variants={logoPathVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 1.4
                }}
              />
            </svg>
          </motion.div>
          
          <motion.h1 
            className="text-2xl font-bold text-primary-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Little Friends Kids Society
          </motion.h1>

          {/* Progress bar container */}
          <div className="w-64 h-2 bg-primary-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          
          {/* Loading text with dots animation */}
          <motion.p 
            className="mt-4 text-primary-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {loadingProgress < 100 ? (
              <span className="flex items-center">
                Loading
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >.</motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >.</motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >.</motion.span>
              </span>
            ) : (
              "Welcome!"
            )}
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-600 origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <CustomCursor />
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About />
                </PageTransition>
              } />
              <Route path="/vision" element={
                <PageTransition>
                  <Vision />
                </PageTransition>
              } />
              <Route path="/founders" element={
                <PageTransition>
                  <Founders />
                </PageTransition>
              } />
              <Route path="/leadership" element={
                <PageTransition>
                  <Leadership />
                </PageTransition>
              } />
              <Route path="/gallery" element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;
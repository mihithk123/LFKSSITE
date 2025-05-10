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
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // More realistic loading progress simulation with varying speeds
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = (100 - prev) * 0.15;
        const newProgress = prev + (increment > 0.5 ? increment : 0.5);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    // Complete loading after progress reaches 100%
    const completeLoading = setInterval(() => {
      if (loadingProgress >= 99.5) {
        setLoadingProgress(100);
        clearInterval(interval);
        // Set animation complete with slight delay for final effects
        setTimeout(() => {
          setAnimationComplete(true);
          // Give time for exit animations
          setTimeout(() => setLoading(false), 1000);
        }, 500);
      }
    }, 200);

    // Ensure loading completes even if progress simulation is slow
    const maxLoadingTime = setTimeout(() => {
      setLoadingProgress(100);
      setAnimationComplete(true);
      setTimeout(() => setLoading(false), 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(completeLoading);
      clearTimeout(maxLoadingTime);
    };
  }, [loadingProgress]);

  // Advanced animated logo paths and elements
  const logoPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0.2 },
        opacity: { duration: 0.5 }
      }
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Particle animation functions
  const generateRandomPosition = () => {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 200 + 100,
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 5
    };
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 overflow-hidden z-50"
      >
        {/* Dynamic gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100"
          animate={{ 
            background: animationComplete 
              ? [
                  "linear-gradient(to bottom right, #eef2ff, #e0e7ff)", 
                  "linear-gradient(to bottom right, #c7d2fe, #e0e7ff)"
                ]
              : [
                  "linear-gradient(to bottom right, #eef2ff, #e0e7ff)",
                  "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
                  "linear-gradient(to bottom right, #eef2ff, #ddd6fe)",
                  "linear-gradient(to bottom right, #eef2ff, #e0e7ff)"
                ],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />

        {/* Advanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Fixed position decorative gradient circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div
              className="absolute rounded-full w-96 h-96 bg-gradient-to-r from-primary-200 to-primary-300/30 blur-3xl"
              style={{ top: '15%', left: '10%' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute rounded-full w-96 h-96 bg-gradient-to-r from-secondary-200 to-primary-200/30 blur-3xl"
              style={{ top: '50%', right: '15%' }}
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
          </div>

          {/* Dynamic animated particles */}
          {Array.from({ length: 12 }).map((_, index) => {
            const { x, y, size, delay, duration } = generateRandomPosition();
            return (
              <motion.div
                key={index}
                className={`absolute rounded-full bg-white opacity-5`}
                style={{
                  width: size,
                  height: size,
                  left: x,
                  top: y,
                  filter: 'blur(40px)'
                }}
                initial={{ 
                  scale: 0, 
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100
                }}
                animate={{ 
                  scale: animationComplete ? 0 : [0, 1, 0.8],
                  rotate: [0, Math.random() * 360],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{ 
                  duration: duration, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}

          {/* Animated glowing lines */}
          {Array.from({ length: 5 }).map((_, index) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const angle = Math.random() * 360;
            
            return (
              <motion.div
                key={`line-${index}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"
                style={{
                  width: `${Math.random() * 30 + 20}%`,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center',
                  opacity: 0.3
                }}
                animate={{
                  opacity: animationComplete ? 0 : [0, 0.3, 0],
                  width: animationComplete ? "0%" : [`${Math.random() * 20 + 10}%`, `${Math.random() * 30 + 20}%`, `${Math.random() * 20 + 10}%`],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            );
          })}
        </div>

        {/* Central loading content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="flex flex-col items-center justify-center z-10"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
            }}
            initial="hidden"
            animate={animationComplete ? "exit" : "visible"}
            transition={{ duration: 0.8 }}
          >
            {/* Animated logo with enhanced effects */}
            <motion.div 
              className="w-40 h-40 mb-8 relative"
              animate={{ 
                scale: animationComplete ? [1, 1.2, 0] : [0.8, 1],
                rotate: animationComplete ? [0, 20] : [0, 5, -5, 0]
              }}
              transition={{ 
                scale: animationComplete 
                  ? { duration: 0.8, times: [0, 0.3, 1] } 
                  : { duration: 1.5, ease: "easeOut" },
                rotate: animationComplete
                  ? { duration: 0.8 }
                  : { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
              }}
            >
              {/* Glowing background effect for logo */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary-200/50 blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: animationComplete ? 0 : [0.8, 1.2, 0.8],
                  opacity: animationComplete ? 0 : [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
                {/* Animated circle background */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#4338ca"
                  strokeWidth="2"
                  strokeDasharray="283"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1 },
                    exit: { pathLength: 0, opacity: 0 }
                  }}
                  initial="hidden"
                  animate={animationComplete ? "exit" : "visible"}
                  transition={{ 
                    pathLength: { delay: 0.2, duration: 2, ease: "easeInOut" },
                    opacity: { delay: 0.2, duration: 0.4 }
                  }}
                />
                
                {/* Small decorative circles */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.circle
                    key={`circle-${i}`}
                    cx={50 + 45 * Math.cos(angle * Math.PI / 180)}
                    cy={50 + 45 * Math.sin(angle * Math.PI / 180)}
                    r="2"
                    fill="#6366f1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: animationComplete ? 0 : 1,
                      opacity: animationComplete ? 0 : 1
                    }}
                    transition={{ 
                      delay: 1 + (i * 0.1),
                      duration: 0.5,
                      exit: { duration: 0.3 }
                    }}
                  />
                ))}
                
                {/* Child figure with enhanced animation */}
                <motion.path
                  d="M50 25 C60 25, 65 35, 65 45 C65 55, 60 60, 50 60 C40 60, 35 55, 35 45 C35 35, 40 25, 50 25"
                  fill="none"
                  stroke="#6366f1" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={logoPathVariants}
                  initial="hidden"
                  animate={animationComplete ? "exit" : "visible"}
                  transition={{
                    delay: 0.5
                  }}
                />
                
                {/* Head with pulse effect */}
                <motion.circle
                  cx="50"
                  cy="30"
                  r="10"
                  fill="#6366f1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: animationComplete ? 0 : [1, 1.05, 1],
                    opacity: animationComplete ? 0 : 1
                  }}
                  transition={{ 
                    scale: { delay: 1, duration: 2, repeat: Infinity },
                    opacity: { delay: 1, duration: 0.5 }
                  }}
                />
                
                {/* Arms with wave effect */}
                <motion.path
                  d="M35 40 L25 45 M65 40 L75 45"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={logoPathVariants}
                  initial="hidden"
                  animate={animationComplete ? "exit" : "visible"}
                  transition={{ delay: 1.2 }}
                />
                
                {/* Legs with sequential animation */}
                <motion.path
                  d="M45 60 L40 75"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={logoPathVariants}
                  initial="hidden"
                  animate={animationComplete ? "exit" : "visible"}
                  transition={{ delay: 1.4 }}
                />
                <motion.path
                  d="M55 60 L60 75"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={logoPathVariants}
                  initial="hidden"
                  animate={animationComplete ? "exit" : "visible"}
                  transition={{ delay: 1.6 }}
                />
              </svg>
            </motion.div>
            
            {/* Enhanced title with text reveal and glow effect */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationComplete ? 0 : 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 blur-lg bg-primary-300/30 rounded-lg"
                animate={{
                  opacity: animationComplete ? 0 : [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.h1 
                className="text-3xl font-bold text-primary-800 relative z-10 px-6 py-2"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ 
                  clipPath: animationComplete 
                    ? "inset(0 100% 0 0)" 
                    : "inset(0 0% 0 0)"
                }}
                transition={{
                  duration: 1,
                  delay: 0.7,
                  ease: "easeInOut"
                }}
              >
                Little Friends Kids Society
              </motion.h1>
            </motion.div>

            {/* Advanced progress bar with glow effect */}
            <div className="relative w-72 h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Animated glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.5), transparent)",
                  backgroundSize: "200% 100%"
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  ease: "linear",
                  duration: 1.5,
                  repeat: Infinity
                }}
              />
              
              {/* Actual progress bar */}
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full relative z-10"
                style={{ 
                  width: `${loadingProgress}%`,
                  boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" 
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeOut" }}
              >
                {/* Loading sparkles */}
                {loadingProgress > 10 && (
                  <motion.div
                    className="absolute top-0 right-0 w-2 h-full bg-white"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </motion.div>
            </div>
            
            {/* Percentage counter */}
            <motion.p 
              className="mt-2 text-sm text-primary-700 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationComplete ? 0 : 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.round(loadingProgress)}%
            </motion.p>
            
            {/* Loading text with typewriter and dots animation */}
            <motion.div 
              className="mt-4 flex items-center justify-center h-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: animationComplete ? 0 : 1 }}
              transition={{ delay: 0.8 }}
            >
              {loadingProgress < 100 ? (
                <div className="flex items-center text-primary-700 font-medium">
                  <span>Loading</span>
                  <span className="flex ml-1 space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ 
                          opacity: [0, 1, 0],
                          y: [0, -3, 0]
                        }}
                        transition={{ 
                          duration: 0.6, 
                          repeat: Infinity, 
                          repeatType: "loop",
                          delay: i * 0.1 
                        }}
                        className="inline-block"
                      >
                        .
                      </motion.span>
                    ))}
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center text-primary-700 font-medium"
                >
                  <span className="text-primary-800 font-bold">Welcome!</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="ml-2 text-lg"
                  >
                    ✨
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Final exit transition overlay */}
        {animationComplete && (
          <motion.div 
            className="absolute inset-0 bg-white z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        )}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-500 origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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

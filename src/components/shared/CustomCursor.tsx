import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<'default' | 'hover'>('default');

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('a, button');
    const activateHover = () => setVariant('hover');
    const deactivateHover = () => setVariant('default');

    elements.forEach(el => {
      el.addEventListener('mouseenter', activateHover);
      el.addEventListener('mouseleave', deactivateHover);
    });

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', activateHover);
        el.removeEventListener('mouseleave', deactivateHover);
      });
    };
  }, []);

  const cursorVariants: Variants = {
    default: {
      x: position.x - 12.5,
      y: position.y - 12.5,
      width: 25,
      height: 25,
    },
    hover: {
      x: position.x - 20,
      y: position.y - 20,
      width: 40,
      height: 40,
      backgroundColor: 'rgba(216, 180, 254, 0.6)',
      mixBlendMode: 'difference',
    },
  };

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-black"
      variants={cursorVariants}
      animate={variant}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  );
};

export default CustomCursor;

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  organization?: string; // Added for the last line (e.g., "Good Shepherd Convent Kandy")
  index: number;
}

const FounderCard: React.FC<FounderCardProps> = ({ 
  name, 
  role, 
  bio, 
  image, 
  organization,
  index 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="h-[480px] w-full sm:w-80 cursor-pointer" // Increased height slightly
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl ${
          isFlipped ? 'hidden' : ''
        }`}>
          <div className="relative h-full w-full bg-white">
            <div className="h-72 overflow-hidden"> {/* Slightly reduced image height */}
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-primary-600 mb-2">{role}</p>
              {organization && (
                <p className="text-gray-700 mb-2">{organization}</p>
              )}
              <p className="text-gray-600 line-clamp-2 mb-2">{bio}</p>
              <p className="mt-2 text-sm text-primary-500">Click to read more</p>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl ${
          isFlipped ? '' : 'hidden'
        }`}>
          <div className="h-full w-full bg-primary-700 p-6 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-primary-200 mb-2">{role}</p>
            {organization && (
              <p className="text-primary-200 mb-3">{organization}</p>
            )}
            <p className="text-primary-100 flex-grow overflow-y-auto pr-2">{bio}</p>
            <div className="mt-4 pt-3 border-t border-primary-600">
              <button 
                className="text-white hover:text-primary-200 text-sm transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                Back to profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FounderCard;
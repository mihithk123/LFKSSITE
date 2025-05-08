import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ExternalLink, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import Masonry from 'react-masonry-css';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  category: string;
  date: string;
  featured?: boolean;
}

// Enhanced gallery items with more videos and better thumbnails
const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Cultural Celebrations',
    description: 'Capturing the vibrant essence of our community celebrations and cultural events.',
    media: {
      type: 'image',
      url: '/ga1.jpg'
    },
    category: 'Events',
    date: '2024-04-15',
    featured: true
  },
  {
    id: '2',
    title: 'Our Story',
    description: 'What we did!',
    media: {
      type: 'video',
      url: '/lfks.mp4',
      thumbnail: '/did.jpg'
    },
    category: '',
    date: '',
    featured: true
  },
  {
    id: '3',
    title: '',
    description: 'Exploring our rich cultural heritage through artful displays and interactive exhibits.',
    media: {
      type: 'image',
      url: '/172.jpeg'
    },
    category: '',
    date: ''
  },
  {
    id: '4',
    title: 'New Year Festivities',
    description: 'Highlights from our annual New Year celebrations featuring community performances and activities.',
    media: {
      type: 'image',
      url: '/222.jpg'
    },
    category: 'Events',
    date: '2024-01-01',
    featured: true
  },
  {
    id: '5',
    title: 'Sacred Places Documentary',
    description: 'A thoughtful exploration of sacred places and their significance in our cultural landscape.',
    media: {
      type: 'image',
      url: '/2025.jpg',
      thumbnail: ''
    },
    category: '',
    date: '2025-04-20'
  },
  {
    id: '6',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/2022.jpg',
      thumbnail: ''
    },
    category: '',
    date: ''
  },
  {
    id: '7',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/2023.jpg'
    },
    category: 'Community',
    date: ''
  },
  {
    id: '8',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/vp3.jpg',
      thumbnail: ''
    },
    category: 'Arts',
    date: '2024-02-28'
  },
  {
    id: '9',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/ny3.jpg'
    },
    category: 'Projects',
    date: '2024-04-05'
  },
  {
    id: '10',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/gal1.jpeg'
    },
    category: 'Projects',
    date: '2024-04-05'
  },
  {
    id: '11',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/21.jpg'
    },
    category: 'Projects',
    date: '2024-04-05'
  },
  {
    id: '12',
    title: '',
    description: '',
    media: {
      type: 'image',
      url: '/vp3.jpg'
    },
    category: 'Projects',
    date: '2024-04-05'
  }
];

// Expanded categories to better organize content
const categories = ['All', 'Events', 'Cultural', 'Education', 'Community', 'Projects', 'Documentation', 'Arts'];

const Gallery = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'featured'>('newest');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // References
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // Reset video state when closing lightbox
  useEffect(() => {
    if (!selectedItem) {
      setIsPlaying(false);
      setIsMuted(false);
    }
  }, [selectedItem]);
  
  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      
      if (e.key === 'Escape') {
        setSelectedItem(null);
      } else if (e.key === 'ArrowRight') {
        navigateGallery('next');
      } else if (e.key === 'ArrowLeft') {
        navigateGallery('prev');
      } else if (e.key === ' ') {
        if (selectedItem.media.type === 'video') {
          e.preventDefault();
          handleVideoPlay();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  // Control video playback when state changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Video playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
      
      videoRef.current.muted = isMuted;
    }
  }, [isPlaying, isMuted, selectedItem]);

  // Filter items based on category and search
  const filteredItems = galleryItems
    .filter(item => 
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
      
      // Handle empty date strings gracefully
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      
      return sortOrder === 'newest' ? 
        dateB.getTime() - dateA.getTime() : 
        dateA.getTime() - dateB.getTime();
    });

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleVideoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleItemSelect = (item: GalleryItem) => {
    setSelectedItem(item);
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    setIsPlaying(item.media.type === 'video');
  };

  const navigateGallery = (direction: 'prev' | 'next') => {
    if (filteredItems.length <= 1) return;
    
    let newIndex = currentIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
    setIsPlaying(filteredItems[newIndex].media.type === 'video');
  };

  // Featured items for the hero section - now ensures we always have at least 2 items
  const featuredItems = galleryItems.filter(item => item.featured).slice(0, 3);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Helper function to get thumbnail or use main URL as fallback
  const getThumbnail = (item: GalleryItem) => {
    if (item.media.type === 'video' && item.media.thumbnail) {
      return item.media.thumbnail;
    }
    return item.media.url;
  };

  return (
    <div className="mt-16 bg-white">
      {/* Hero Section with Featured Content */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: 'url("/texture-overlay.png")', 
          backgroundRepeat: 'repeat' 
        }}></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Visual Archives Collection
              </span>
            </h1>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of meaningful moments, cultural events, and community projects through high-quality visuals and video documentation.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              {featuredItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl group"
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={getThumbnail(item)}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                    {item.media.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/30 backdrop-blur-sm rounded-full p-4 transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full">Featured</span>
                    <h3 className="text-xl font-bold mt-2 text-white">{item.title}</h3>
                    <p className="text-blue-100 mt-2 line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Media Gallery
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              Browse our comprehensive collection of visual and video content documenting our journey, initiatives, and community impact.
            </motion.p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Sort by:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest' | 'featured')}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Gallery Items */}
          {filteredItems.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group bg-white"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={getThumbnail(item)}
                        alt={item.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/40 backdrop-blur-sm rounded-full p-3 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-200 text-sm">{item.category}</span>
                          <span className="text-gray-300 text-xs">{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                    {item.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                          Featured
                        </span>
                      </div>
                    )}
                    {item.media.type === 'video' && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <Play size={12} />
                          Video
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </Masonry>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <p className="text-xl text-gray-600">No items found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox with Navigation */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-95"
            onClick={() => setSelectedItem(null)}
            ref={lightboxRef}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                <X size={20} />
              </button>
              
              {/* Navigation buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateGallery('prev');
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateGallery('next');
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              {/* Media content */}
              <div className="aspect-w-16 aspect-h-9 bg-black">
                {selectedItem.media.type === 'image' ? (
                  <img
                    src={selectedItem.media.url}
                    alt={selectedItem.title}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={selectedItem.media.url}
                      poster={selectedItem.media.thumbnail}
                      className="w-full h-full object-contain"
                      controls={false}
                      autoPlay={isPlaying}
                      muted={isMuted}
                      loop
                      playsInline
                    />
                    <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
                      <button 
                        className="bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/60 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoPlay();
                        }}
                      >
                        {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                      </button>
                      <button 
                        className="bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/60 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMuteToggle();
                        }}
                      >
                        {isMuted ? <VolumeX size={24} className="text-white" /> : <Volume2 size={24} className="text-white" />}
                      </button>
                    </div>
                    
                    {/* Progress indicator for videos could be added here */}
                  </div>
                )}
              </div>
              
              {/* Content info panel */}
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                    {selectedItem.featured && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {selectedItem.category}
                    </span>
                    {selectedItem.date && (
                      <span className="text-sm text-gray-500">{formatDate(selectedItem.date)}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-5 leading-relaxed">{selectedItem.description}</p>
                
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Download size={18} />
                      <span className="font-medium">Download</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Share2 size={18} />
                      <span className="font-medium">Share</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <ExternalLink size={18} />
                      <span className="font-medium">View Full Size</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Info size={18} />
                      <span className="font-medium">Details</span>
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span>{`Item ${currentIndex + 1} of ${filteredItems.length}`}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
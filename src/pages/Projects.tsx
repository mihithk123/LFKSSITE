import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, FileText, Link as LinkIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  objectives: string[];
  startDate: string;
  endDate: string | null;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  images: string[]; // Changed from single image to images array
  impact: {
    numbers: string[];
    stories: string[];
  };
  team: {
    name: string;
    role: string;
    avatar?: string; // Added avatar for team members
  }[];
  downloads?: {
    title: string;
    url: string;
  }[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
  category: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: '2025 Vesak Project',
    summary: 'The 2025 Yogurt Dansala will offer 2000+ yogurt cups to pilgrims waiting under the sun at the Temple of the Tooth',
    description: '2025 Yogurt dansala This project highlights a charity initiative by our society aiming to distribute over 2000 cups of yogurt to pilgrims waiting in long queues to witness the Tooth Relic exposition on April 23 2025 The effort offers comfort and refreshment to devotees enduring long hours under the sun at Sri Lankas sacred Temple of the Tooth Relic',
    objectives: [
      ''
    ],
    startDate: '2025-4-20',
    endDate: '2024-4-20',
    location: 'Ampitya Road',
    status: 'Completed',
    images: [
      '/vp.jpg',
      '/vp1.jpg',
      '/vp2.jpg',
      '/vp3.jpg'
    ],
    impact: {
      numbers: [
        'Over 30 participants ',
        '99% satisfaction rate',
        '100% completion rate'
      ],
      stories: [
        ''
      ]
    },
    team: [
      { 
        name: 'Lawanya', 
        role: 'Lead ',
        avatar: '/lawa.jpg'
      },
      { 
        name: 'Chathuni', 
        role: 'Lead',
        avatar: 'chathuni.jpg'
      }
    ],
    downloads: [
      { title: 'Workshop Materials', url: '#' },
      { title: 'Course Syllabus', url: '#' }
    ],
    relatedLinks: [
      { title: 'Blog Post', url: '#' },
      { title: 'Video Series', url: '#' }
    ],
    category: 'Charity'
  },
  {
    id: '2',
    title: '2024 Vesak Project',
    summary: 'The 2024 Vesak festival featured lanterns, a Dhamma sermon, “LFKS” oil lamp display, and a heartfelt video presentation.',
    description: '2024 Vesak This year’s Vesak festival was held under the leadership of our new president, Tinura Wanasinghe, and secretary, Dilsanda Samarasinghe. The celebration included our traditional Dhamma sermon and beautifully decorated streets filled with Vesak lanterns. A special highlight was the display of the letters “LFKS” visualized with oil lamps. We also showcased a video of our journey, making it a proud and heartfelt moment to reflect on how far we’ve come.',
    objectives: [
      '',
    ],
    startDate: '2024-05-10',
    endDate: null,
    location: 'Village',
    status: 'Completed',
    images: [
      '/vesak.jpeg',
      '/ve2.jpg',
      '/ve3.jpg',
      '/v4.jpg',
    ],
    impact: {
      numbers: [
        
        'All he members',
        
      ],
      stories: [
        '',
        ''
      ]
    },
    team: [
      { 
        name: 'Lawanya', 
        role: 'Lead',
        avatar: 'lawa.jpg'
      },
      { 
        name: 'Manjitha', 
        role: 'Lead',
        avatar: '/man.jpg'
      }
    ],
    downloads: [
      { title: 'Research Paper', url: '#' },
      { title: 'Phots', url: '#' }
    ],
    category: ''
  },
  // Add one more example project
  {
    id: '3',
    title: '2023 New Year',
    summary: 'We celebrated with Kolam, traditional food, games, and natural decor, honoring culture and spreading joy',
    description: '**2023 Vesak:We lit handmade lanterns and built an oil lamp fence, creating a peaceful atmosphere through everyones heartfelt effort.*2023 New Year:**  We celebrated with Kolam art, traditional food, Awurudu games, and natural decorations, honoring culture and bringing joy to everyone..',
    objectives: [
      ''
    ],
    startDate: '2023-4-15',
    endDate: '2023-4-15',
    location: 'village',
    status: 'Completed',
    images: [
      '/ny1.jpg',
      '/ny2.jpg',
      '/ny3.jpg',
      
    ],
    impact: {
      numbers: [
        '',
       
      ],
      stories: [
        
      ]
    },
    team: [
      { 
        name: 'Manjitha', 
        role: 'Leadr',
        avatar: 'man.jpg'
      },
      { 
        name: 'Lawanya', 
        role: 'Lead',
        avatar: '/lawa.jpg'
      }
    ],
    downloads: [
      { title: '', url: '#' },
      { title: 'Project report', url: '#' }
    ],
    relatedLinks: [
      { title: '', url: '#' },
      { title: '', url: '#' }
    ],
    category: 'Community'
  },
  
 
  {
    id: '3',
    title: '2022 Projects',
    summary: 'In 2022, we supported families, hosted a star fruit Dansala, and celebrated Poson with Bakthi Geetha performances by children.',
    description: '2022 Little Hearts Project:Instead of partying, we supported needy families for Christmas by collecting and gifting essentials—making it our most meaningful celebration yet.2022 Dansala:We hosted our first Dansala, joyfully sharing freshly picked star fruit from our village with the community.2022 Poson:We celebrated Poson by performing 16 Bakthi Geetha songs, with 30 children and strong support from parents and villagers.',
    objectives: [
      ''
    ],
    startDate: '2022-01-01',
    endDate: '2023-12-30',
    location: 'village',
    status: 'Completed',
    images: [
      '/22.jpeg',
      '/221.jpg',
      '/222.jpg',
      
    ],
    impact: {
      numbers: [
        '',
       
      ],
      stories: [
        
      ]
    },
    team: [
      { 
        name: 'Manjitha', 
        role: 'Leadr',
        avatar: 'man.jpg'
      },
      { 
        name: 'Lawanya', 
        role: 'Lead',
        avatar: '/lawa.jpg'
      }
    ],
    downloads: [
      { title: '', url: '#' },
      { title: 'Project report', url: '#' }
    ],
    relatedLinks: [
      { title: '', url: '#' },
      { title: '', url: '#' }
    ],
    category: 'Community'
  },
  {
    id: '3',
    title: '2021 Projects',
    summary: 'In 2021, we celebrated Christmas, held virtual Vesak events despite Covid-19, and hosted an energetic New Year festival with games.',
    description: '2021 Christmas:We celebrated with food, games, singing, dancing, and ended the day joyfully with a movie.2021 Vesak:Despite Covid-19, we held an online Dhamma talk, arts competition, and a house decorating contest judged by public votes.2021 New Year:The “Punchi Ape Bakmaha Ulela” festival featured speeches, energetic games, and heartfelt thanks, making it a lively celebration.',
    objectives: [
      ''
    ],
    startDate: '2021-01-15',
    endDate: '2021-12-15',
    location: 'village',
    status: 'Completed',
    images: [
      '/211.png',
      '/21.jpg',
      '/212.jpeg',
      
    ],
    impact: {
      numbers: [
        '',
       
      ],
      stories: [
        
      ]
    },
    team: [
      { 
        name: 'Manjitha', 
        role: 'Leadr',
        avatar: 'man.jpg'
      },
      { 
        name: 'lawanaya', 
        role: 'Lead',
        avatar: '/lawa.jpg'
      }
    ],
    downloads: [
      { title: '', url: '#' },
      { title: 'Project report', url: '#' }
    ],
    relatedLinks: [
      { title: '', url: '#' },
      { title: '', url: '#' }
    ],
    category: 'Community'
  },
  {
    id: '3',
    title: '2017 Projects',
    summary: 'In May 2017, we celebrated Vesak with decorated streets, a Dhamma sermon, fireworks, a tea party, and lamp-lighting.',
    description: 'In May 2017, we celebrated the Vesak festival. We prepared  fences of lamps beside the streets in our neighborhood, with the help of parents. We decorated the premises and We welcomed Batagalle Gunananda Thero by a procession. The invitation card was prepared by miss Lawanya and miss Manjitha.  At 4.30pm there was a Dhamma Serman. After the sermon there was fireworks and a tea party. Finally, we lit the lamps and illuminated the path.',
    objectives: [
      ''
    ],
    startDate: '2017-4-15',
    endDate: '2017-12-15',
    location: 'village',
    status: 'Completed',
    images: [
      '/171.jpg',
      '/17.jpg',
      '/172.jpeg',
      
    ],
    impact: {
      numbers: [
        '',
       
      ],
      stories: [
        
      ]
    },
    team: [
      { 
        name: 'Manjitha', 
        role: 'Leadr',
        avatar: 'man.jpg'
      },
      { 
        name: 'Lawanya', 
        role: 'Lead',
        avatar: '/lawa.jpg'
      }
    ],
    downloads: [
      { title: '', url: '#' },
      { title: 'Project report', url: '#' }
    ],
    relatedLinks: [
      { title: '', url: '#' },
      { title: '', url: '#' }
    ],
    category: 'Community'
  },
  

  
];

const categories = ['All', 'Education', '', 'Community', ''];
const statuses = ['All', 'ongoing', 'completed', 'upcoming'];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((currentImageIndex + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((currentImageIndex - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-16">
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Our Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
              Discover our initiatives and their impact on the programming community.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {statuses.map(status => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedStatus === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Project Cards */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openProject(project)}
                >
                  {/* Main Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium shadow-md ${getStatusColor(project.status)}`}>
                      {project.status}
                    </div>
                  </div>

                  {/* Image Preview Gallery */}
                  <div className="flex gap-1 p-2 bg-gray-50">
                    {project.images.slice(0, 4).map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`w-1/4 h-16 rounded overflow-hidden ${idx === 0 ? 'ring-2 ring-primary-500' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openProject(project);
                          setCurrentImageIndex(idx);
                        }}
                      >
                        <img src={img} alt={`${project.title} preview ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.summary}</p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{project.team.length}Organizers</span>
                      </div>
                    </div>

                    <button
                      className="mt-6 text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700 transition-colors"
                      onClick={() => openProject(project)}
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No projects found with the selected filters.</p>
              <button 
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal with Image Gallery */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors"
                onClick={closeProject}
              >
                <X size={24} className="text-gray-800" />
              </button>

              {/* Image Gallery */}
              <div className="relative h-80 md:h-96">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    className="bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button 
                    className="bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                    onClick={nextImage}
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {selectedProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                    />
                  ))}
                </div>

                {/* Project Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="p-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4 text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(selectedProject.startDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {selectedProject.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Project Overview */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Objectives */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Objectives</h3>
                  <ul className="space-y-3 text-gray-700">
                    {selectedProject.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 min-w-4 h-4 rounded-full bg-primary-600"></div>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h4 className="text-lg font-medium mb-3 text-gray-900">By the Numbers</h4>
                      <ul className="space-y-3 text-gray-700">
                        {selectedProject.impact.numbers.map((number, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 min-w-4 h-4 rounded-full bg-blue-500"></div>
                            <span>{number}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h4 className="text-lg font-medium mb-3 text-gray-900">Success Stories</h4>
                      <ul className="space-y-3 text-gray-700">
                        {selectedProject.impact.stories.map((story, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 min-w-4 h-4 rounded-full bg-green-500"></div>
                            <span>{story}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Team</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                        {member.avatar ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-3">
                            <span className="text-xl font-semibold text-primary-600">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-gray-600 text-sm">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Downloads */}
                  {selectedProject.downloads && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Downloads</h3>
                      <div className="flex flex-col gap-3">
                        {selectedProject.downloads.map((download, index) => (
                          <a
                            key={index}
                            href={download.url}
                            className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                          >
                            <FileText size={20} className="text-primary-600" />
                            <span className="font-medium text-gray-800">{download.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Links */}
                  {selectedProject.relatedLinks && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Related Links</h3>
                      <div className="flex flex-col gap-3">
                        {selectedProject.relatedLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                          >
                            <LinkIcon size={20} className="text-primary-600" />
                            <span className="font-medium text-gray-800">{link.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
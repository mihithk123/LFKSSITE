import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineEvents = [
  {
    year: '2016',
    title: 'Founding',
    description: 'Founded on December 25, 2016. Miss Lawanya (President), Miss Manjitha (Secretary), and Master Mihith (Treasurer). Celebrated with Christmas fun and gifts.',
    image: '.jpg'
  },
  {
    year: '2017',
    title: 'First Avurudu Festival',
    description: 'A week prior, members gathered gifts and supplies. The venue was decorated the day before. On the day, we enjoyed traditional Awurudu games, and winners received gifts. The event ended joyfully.',
    image: '2017.jpg'
    
  },
  {
    year: '2018',
    title: 'Memorable Vesak & Trip',
    description: 'In 2018, we celebrated Vesak with lanterns and decorations, organized a memorable trip to New Saniro Park, and held a successful New Year festival, Sahas Ras, filled with games and community spirit.',
    image: '2018.jpg'
  },
  {
    year: '2019',
    title: 'Wesak Celebrations',
    description: 'Three weeks prior to the Wesak Festival, the LFKS community, along with parents, began preparing decorations. They crafted 30 lotus lanterns and 100 Wesak lanterns. On Wesak day, an oil lamp circle was arranged in the morning, and the lanterns and lamps were lit in the evening to mark the celebration.',
    image: '/api/placeholder/400/250'
  },
  {
    year: '2020',
    title: 'Writing Through the Pandemic',
    description: 'During the COVID-19 pandemic, we hosted a book writing competition to stay connected. Top entries were selected by judges and published.',
    image: '/api/placeholder/400/250'
  },
  {
    year: '2021',
    title: 'Unity Through Tradition and Innovation',
    description: 'In 2021, LFKS celebrated key cultural events with enthusiasm and adaptability—hosting a vibrant New Year festival, organizing virtual Vesak activities, and ending the year with a joyful Christmas celebration.',
    image: '/2021.jpg'
  },
  {
    year: '2022',
    title: 'LFKS 2022: A Year of Community, Culture, and Compassio',
    description: 'In 2022, LFKS embraced a spirit of community and compassion—celebrating festivals with elders and villagers, launching our first Poson and Dansala events, and ending the year with the heartwarming Little Hearts Project to support families in need',
    image: '/2022.jpg'
  },
  {
    year: '2023',
    title: 'A Graceful Blend of Tradition and Togethernes',
    description: 'In 2023, LFKS celebrated New Year with vibrant decorations, traditional food, games, and cultural elements like Kolam art. Vesak was marked with handmade lanterns and a serene display of oil lamps, reflecting unity and dedication.',
    image: '2023.jpg'
  },
  {
    year: '2024',
    title: 'A Year of Reflection, Celebration, and Reconnection',
    description: 'In 2024, LFKS marked Vesak with a meaningful Dhamma sermon, vibrant lantern displays, and a special oil lamp tribute to "LFKS." Christmas was celebrated with festive decorations, a joyful party, and a heartfelt reunion of friends.',
    image: '2024.jpg'
  },
  {
    year: '2025',
    title: 'A Vibrant Celebration of Tradition and Unit',
    description: 'In 2025, LFKS celebrated the New Year with a vibrant festival featuring a traditional Gami Gedara, handcrafted oil lamps, lively dances, and everyone dressed in sarongs and lungis, creating a memorable and colorful event.In 2025, LFKS organized a Yogurt Dansala to distribute over 2,000 cups of yogurt to pilgrims at the Temple of the Tooth Relic, providing comfort to those waiting in long queues',
    image: '2025.jpg'
  }
];

const Timeline = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start end", "end start"] 
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section ref={targetRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Our Journey</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">From our humble beginnings to our vibrant present, trace the path of growth and joy that defines the Little Friends Kids Society.</p>
          </div>
          
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-300 rounded"></div>
            
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center justify-between mb-20 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`mb-2 flex items-center ${isEven ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-sm font-bold text-white bg-primary-600 px-4 py-1 rounded-full shadow-md">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{event.title}</h3>
                    <p className="text-gray-700 mb-6">{event.description}</p>
                    
                    {/* Image with hover effect */}
                    <div className={`overflow-hidden rounded-lg shadow-lg ${isEven ? 'ml-auto' : 'mr-auto'}`} style={{ maxWidth: '350px' }}>
                      <img 
                        src={event.image} 
                        alt={`${event.year} - ${event.title}`} 
                        className="w-full transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  <div className="z-10">
                    <div className="w-16 h-16 rounded-full border-4 border-primary-200 bg-primary-500 flex items-center justify-center shadow-lg">
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div> {/* Empty space on the other side */}
                </motion.div>
              );
            })}
          </div>
          
          {/* Future direction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mt-16 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Continuing Our Story</h3>
            <p className="text-lg text-gray-700">
              As we look to the future, the Little Friends Kids Society remains committed to creating meaningful experiences, fostering friendships, and nurturing the potential of every child. Join us as we write the next chapters of our journey together.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg inline-flex items-center gap-2"
            >
              View Event Calendar
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
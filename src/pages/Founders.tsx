import { motion } from 'framer-motion';
import FounderCard from '../components/founders/FounderCard';

const founders = [
  {
    name: 'Lawanya Wanasinghe',
    role: 'Former Chairman and Founder of the Children Society',
    bio:' Good Shepherd Convent Kandy',
    image: '/lawa.jpg'
  },
  {
    name: 'Manjitha Rajakaruna',
    role: 'Former Secretary and Founder of the Children Society',
    bio: 'High School Kandy',
    image: 'man.jpg'
  },
  
];

const Founders = () => {
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
              Our Founders
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
            Inspired by a shared vision, our founders came together to create a community built on creativity, collaboration, and growth.
            </motion.p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {founders.map((founder, index) => (
              <FounderCard
                key={founder.name}
                name={founder.name}
                role={founder.role}
                bio={founder.bio}
                image={founder.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center"
            >
              Little Friends’ Kids Society (LFKS) Founding Story
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p>
              In the beginning, before 2016, life in our neighborhood was very different. People barely knew one another; they rarely met, seldom spoke, and lived in isolation, each attending only to their own affairs. There was little sense of unity or community.

              </p>
              
              <p>
              Recognizing the need for change, Miss Lawanya Wanasinghe dreamed of bringing people together. She wanted to create a space where friendships could bloom and neighbors could become family. As a first step, with the support of her best friend, Miss Manjitha Rajakaruna, she organized a small party at her home, inviting the children from the neighborhood.



              </p>
              
              <p>
              On that memorable day, about ten children attended. They played, laughed, and got to know each other — the first sparks of a new beginning. The gathering was such a resounding success that by the end of the day, everyone agreed to form a society. It was then that the name "Little Friends Kids Society" was chosen. At that founding event, Miss Lawanya Wanasinghe was elected as the president, Miss Manjitha Rajakaruna as the secretary, and Master Mihith Kodagoda as the treasurer

              </p>
              
              <p>
              Later, Master Methmika Bosara, Miss Chathuni Dewmini, Miss Isuri Nanayakkara, and Miss Chamodya Dissanayake joined the society. They quickly became key contributors to the growth and success of LFKS. With their dedication and fresh, innovative ideas, the Little Friends Kids Society embarked on a remarkable journey forward — one of continued success, strength, and unity.
              This small spark soon turned into a brilliant firework, forging a strong and lasting bond among our members — a true family, always there for one another through thick and thin. Through our journey together, we have not only built friendships but also grown as individuals. Our leadership and social skills have greatly improved, and personal challenges, such as stage fright and other fears, have gradually disappeared.
              </p>
              
              <p>
               The Little Friends Kids Society has become a nurturing ground for confidence, growth, and lifelong connection. This was the true purpose behind starting the society — and today, we are proud to say that every part of that dream has come true.From this humble beginning, a vibrant community was born — one that continues to grow and thrive today. One that still grows stronger with each passing day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Founders;
import { motion } from 'framer-motion';
import Timeline from '../components/about/Timeline';

const About = () => {
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
              Little Friends’ Kids Society (LFKS) About
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-gray-700 leading-relaxed"
            >
             Founded in December 2016 with just 10 members, Little Friend’s Kid Society has grown into a vibrant group of over 60 youth. Through nearly 30 projects, we've faced challenges together, evolving with each step. Thanks to the support of our parents and mentors, we continue to grow, improve, and make a meaningful impact.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                The Little Friends Kids Society (LFKS) was founded in 2016 by our former president (2016–2020), Miss Lawanya Wanasinghe. Together with her friend, Miss Manjitha Rajakaruna, who later became the first secretary (2016–2020), they organized a small party to meet and connect with children living in their neighborhood. This gathering marked the very first meeting and event of LFKS.
                At that memorable first event, the name “Little Friends Kids Society” was chosen for the new organization. Miss Lawanya Wanasinghe was elected as the president, Miss Manjitha Rajakaruna as the secretary, and Master Mihith Kodagoda as the treasurer. Although only 10 children attended the first meeting, we are proud to share that today LFKS has grown to 60 active members!
                </p>
                <p>
                With the strong leadership of Miss Lawanya and Miss Manjitha, LFKS celebrated several important milestones in its early years.
                In 2017, we organized our very first New Year Festival, Vesak Festival, and launched our inaugural talent show, "Sarigama." Building on this momentum, in 2018, LFKS hosted another New Year Festival, Vesak Festival, and a memorable Year-End Party. Additionally, we organized our first-ever group trip, which marked a new chapter of shared experiences for our members.
                </p>
                <p>
                As we continued to grow, LFKS embraced community service, with initiatives like the Little Hearts Project in 2022, where we supported families in need during Christmas, and our Yogurt Dansala in 2025, where we provided refreshments to pilgrims at the Tooth Relic exposition.

                Over the years, LFKS has become more than just a society—it’s a family. We remain committed to creating meaningful experiences, celebrating our culture, and making a positive impact in our community. Together, we look forward to continuing this journey of unity and service.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Our Values</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">1</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Social Connection & Friendship</h3>
                    <p className="text-gray-700">We believe kids thrive when they form meaningful friendships. Our society creates a space where bonds grow, teamwork blossoms, and social skills are nurtured</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">2</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2"> Life Skills Development</h3>
                    <p className="text-gray-700">By engaging in hands-on activities, kids learn planning, time management, collaboration, and other essential life skills that prepare them for future success.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">3</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Community & Kindness</h3>
                    <p className="text-gray-700">We instill empathy and social responsibility through community service projects, helping members grow into thoughtful, caring individuals in a supportive environment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">4</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">2. Confidence & Leadership</h3>
                    <p className="text-gray-700">Through speaking up in meetings, participating in events, and leading projects, members build confidence and gain experience in leadership and decision-making.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Timeline />
      
      
    </div>
  );
};

export default About;
import LeadershipGrid from '../components/leadership/LeadershipGrid';

const Leadership = () => {
  return (
    <div className="mt-16">
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Members
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
            Meet our passionate team of volunteers and experts who bring the Society of Little friends kids mission to life through impactful programs, charitable initiatives, and community celebrations throughout the year.
            </p>
          </div>
        </div>
      </section>
      
      <LeadershipGrid />
    </div>
  );
};

export default Leadership;
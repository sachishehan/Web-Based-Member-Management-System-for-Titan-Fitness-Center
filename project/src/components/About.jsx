import { FaDumbbell, FaUserGraduate, FaClipboardList } from 'react-icons/fa';

function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Gym Interior" 
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About Titan Fitness</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are committed to helping you reach your fitness goals with expert trainers, 
              modern equipment, and a supportive community.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <FaUserGraduate className="text-3xl text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Certified Trainers</h3>
                  <p className="text-gray-600">Expert guidance for your fitness journey</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaDumbbell className="text-3xl text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">State-of-the-Art Equipment</h3>
                  <p className="text-gray-600">Modern facilities for optimal training</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaClipboardList className="text-3xl text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Personalized Workout Plans</h3>
                  <p className="text-gray-600">Customized programs for your goals</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">Read More</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
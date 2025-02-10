/* eslint-disable react/prop-types */
function ClassCard({ title, image, description }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="w-full btn btn-primary">Join Class</button>
      </div>
    </div>
  );
}

function Classes() {
  const classes = [
    {
      title: "Yoga",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description: "Find balance and flexibility through expert-led yoga sessions."
    },
    {
      title: "Strength Training",
      image: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description: "Build muscle and strength with our comprehensive programs."
    },
    {
      title: "Cardio",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description: "Improve endurance and heart health with high-energy workouts."
    },
    {
      title: "CrossFit",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      description: "Challenge yourself with varied functional movement exercises."
    }
  ];

  return (
    <section id="classes" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Training Programs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((classItem, index) => (
            <ClassCard key={index} {...classItem} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Classes;
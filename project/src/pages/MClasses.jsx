function MClasses() {
  const availableClasses = [
    { name: 'Yoga Flow', trainer: 'Sarah Smith', time: '9:00 AM', duration: '60 min', spots: 5 },
    { name: 'HIIT Training', trainer: 'Mike Johnson', time: '10:30 AM', duration: '45 min', spots: 3 },
    { name: 'Strength Training', trainer: 'Lisa Brown', time: '2:00 PM', duration: '60 min', spots: 8 },
    { name: 'Spin Class', trainer: 'John Davis', time: '4:00 PM', duration: '45 min', spots: 2 }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Classes & Bookings</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableClasses.map((cls, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{cls.name}</h3>
                <span className="text-sm text-primary">{cls.spots} spots left</span>
              </div>
              <p className="text-gray-600">Trainer: {cls.trainer}</p>
              <p className="text-gray-600">{cls.time} • {cls.duration}</p>
              <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Book Class
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Upcoming Classes</h2>
        <p className="text-gray-500">No upcoming classes booked</p>
      </div>
    </div>
  )
}

export default MClasses
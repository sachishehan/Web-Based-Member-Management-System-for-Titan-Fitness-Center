import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user, updateProfileImage } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateProfileImage(user.memberId, reader.result)
      }
      reader.readAsDataURL(file)
      setSelectedFile(file)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back, {user.name}!
        </h1>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-image-upload"
          />
          <label
            htmlFor="profile-image-upload"
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Update Profile Picture
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Workouts This Month</h3>
          <p className="text-3xl font-bold text-primary">{user.stats.workoutsThisMonth}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Hours Spent</h3>
          <p className="text-3xl font-bold text-primary">{user.stats.hoursSpent}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Calories Burned</h3>
          <p className="text-3xl font-bold text-primary">{user.stats.caloriesBurned}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Workout Schedule</h2>
        <div className="space-y-4">
          {user.workoutSchedule.map((schedule, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{schedule.day}</h3>
                <p className="text-gray-600">{schedule.workout}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Trainer</p>
                <p className="text-gray-700">{schedule.trainer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
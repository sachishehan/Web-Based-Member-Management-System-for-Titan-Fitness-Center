import { useAuth } from '../context/AuthContext'

function WorkoutProgress() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Workout Progress</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Workout history graph will be displayed here</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Past Workouts</h2>
        <div className="space-y-4">
          {user.workoutSchedule.map((workout, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{workout.workout}</h3>
                  <p className="text-gray-600">{workout.day}</p>
                </div>
                <span className="text-primary">{workout.trainer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkoutProgress
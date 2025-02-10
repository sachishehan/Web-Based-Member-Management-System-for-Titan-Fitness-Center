import { useAuth } from '../contexts/AuthContext'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function WorkoutProgress() {
  const { user } = useAuth()

  // Sample workout data for the graph
  const workoutData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Workouts Completed',
        data: [3, 5, 4, 6],
        borderColor: '#007BFF',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Hours Spent',
        data: [4, 7, 5, 8],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Workout Progress'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Workout Progress</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Overview</h2>
        <div className="h-[400px] w-full">
          <Line data={workoutData} options={options} />
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
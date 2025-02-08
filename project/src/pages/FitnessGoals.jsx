function FitnessGoals() {
  const goals = [
    { type: 'Weight Goal', current: 75, target: 70, unit: 'kg' },
    { type: 'Weekly Workouts', current: 3, target: 5, unit: 'sessions' },
    { type: 'Running Distance', current: 15, target: 25, unit: 'km/week' }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fitness Goals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {goals.map((goal, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{goal.type}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Current:</span>
                <span className="font-semibold">{goal.current} {goal.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target:</span>
                <span className="font-semibold text-primary">{goal.target} {goal.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Set New Goal</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Type</label>
            <select className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
              <option>Weight Goal</option>
              <option>Weekly Workouts</option>
              <option>Running Distance</option>
              <option>Custom Goal</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
              <input type="number" className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
              <input type="number" className="w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Add Goal
          </button>
        </form>
      </div>
    </div>
  )
}

export default FitnessGoals
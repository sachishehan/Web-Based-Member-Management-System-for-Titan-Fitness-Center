import { useAuth } from '../context/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'

function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  const navItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/workout-progress', icon: 'fitness_center', label: 'Workout Progress' },
    { path: '/classes', icon: 'event', label: 'Classes & Bookings' },
    { path: '/fitness-goals', icon: 'track_changes', label: 'Fitness Goals' },
    { path: '/membership', icon: 'card_membership', label: 'Membership Details' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ]

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Titan Fitness</h1>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">ID: {user.memberId}</p>
          </div>
        </div>
      </div>

      <nav className="p-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-lg p-3 ${
                isActive
                  ? 'text-primary bg-blue-50'
                  : 'text-gray-700 hover:bg-blue-50'
              }`
            }
          >
            <span className="material-icons">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 rounded-lg p-3"
        >
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
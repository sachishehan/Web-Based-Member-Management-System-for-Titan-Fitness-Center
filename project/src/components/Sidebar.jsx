/* eslint-disable react/prop-types */
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'

function Sidebar({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  const navItems = [
    { path: '/member/dashboard',  label: 'Dashboard' },
    { path: '/member/workout-progress',  label: 'Workout Progress' },
    { path: '/member/classes',  label: 'Classes & Bookings' },
    { path: '/member/fitness-goals',  label: 'Fitness Goals' },
    { path: '/member/dMember', label: 'Membership Details' },
    { path: '/member/settings', label: 'Settings' }
  ]

  const handleNavClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
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

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
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

      <div className="p-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 rounded-lg p-3 w-full"
        >
          <span className="material-icons">logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
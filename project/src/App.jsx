import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import WorkoutProgress from './pages/WorkoutProgress'
import Classes from './pages/Classes'
import FitnessGoals from './pages/FitnessGoals'
import Membership from './pages/Membership'
import Settings from './pages/Settings'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workout-progress" element={<WorkoutProgress />} />
          <Route path="classes" element={<Classes />} />
          <Route path="fitness-goals" element={<FitnessGoals />} />
          <Route path="membership" element={<Membership />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
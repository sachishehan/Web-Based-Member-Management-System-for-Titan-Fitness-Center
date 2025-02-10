/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  return children
}

export default ProtectedRoute
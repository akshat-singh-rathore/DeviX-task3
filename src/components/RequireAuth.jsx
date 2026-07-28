import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

export function RequireAuth({ allowedRoles, children }) {
  const { user } = useAppContext()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }
  return children
}

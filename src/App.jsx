import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { FacultyDashboard } from './pages/FacultyDashboard'
import { StudentDashboard } from './pages/StudentDashboard'
import { NoticesPage } from './pages/NoticesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RequireAuth } from './components/RequireAuth'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/admin"
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/faculty"
            element={
              <RequireAuth allowedRoles={['faculty']}>
                <FacultyDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/student"
            element={
              <RequireAuth allowedRoles={['student']}>
                <StudentDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/notices"
            element={
              <RequireAuth allowedRoles={['admin', 'faculty', 'student']}>
                <NoticesPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App

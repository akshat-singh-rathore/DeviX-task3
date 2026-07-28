import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/useAppContext'

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'faculty', label: 'Faculty' },
  { value: 'student', label: 'Student' }
]

export function LoginPage() {
  const { login } = useAppContext()
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(role, identifier.trim(), password)
    if (!success) {
      setError('Invalid credentials. Please verify your role and details.')
      return
    }
    setError('')
    navigate(role === 'admin' ? '/admin' : role === 'faculty' ? '/faculty' : '/student')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">College Management System</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to your account</h1>
          <p className="mt-2 text-sm text-slate-500">Choose your role and continue to your dashboard.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          {roles.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRole(item.value)}
              className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${
                role === item.value
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email or Roll Number</label>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder={role === 'student' ? 'email or roll number' : 'email address'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New student?{' '}
          <Link to="/signup" className="font-semibold text-slate-900 hover:text-slate-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

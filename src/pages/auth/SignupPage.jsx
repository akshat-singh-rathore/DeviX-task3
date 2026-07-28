import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/useAppContext'

export function SignupPage() {
  const { departments, registerStudent } = useAppContext()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState(departments[0]?.name || '')
  const [year, setYear] = useState('First Year')
  const [roll, setRoll] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !email || !password || !department || !year || !roll) {
      setError('Please complete all fields before continuing.')
      return
    }
    registerStudent({ name, email, password, department, year, roll })
    navigate('/student')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Student Registration</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Create your student profile</h1>
          <p className="mt-2 text-sm text-slate-500">Sign up with your department, class year, and roll number.</p>
        </div>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Full name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder="Enter full name"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder="student@college.edu"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder="Create a password"
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Department
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                {departments.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Year
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Fourth Year</option>
              </select>
            </label>
          </div>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Roll number
            <input
              value={roll}
              onChange={(event) => setRoll(event.target.value)}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              placeholder="CS3002"
            />
          </label>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900 hover:text-slate-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

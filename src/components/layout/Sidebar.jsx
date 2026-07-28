import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/useAppContext'

const roleLinks = {
  admin: [
    { label: 'Admin Dashboard', to: '/admin' },
    { label: 'Notice Board', to: '/notices' }
  ],
  faculty: [
    { label: 'Faculty Dashboard', to: '/faculty' },
    { label: 'Notice Board', to: '/notices' }
  ],
  student: [
    { label: 'Student Dashboard', to: '/student' },
    { label: 'Notice Board', to: '/notices' }
  ]
}

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAppContext()
  const links = user ? roleLinks[user.role] || [] : []

  return (
    <aside className="bg-white border border-slate-200 rounded-3xl p-4 md:p-6 w-full md:w-72">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500">Logged in as</p>
          <p className="font-semibold text-slate-900">{user?.name}</p>
          <p className="text-xs text-slate-400">{user?.role?.toUpperCase()}</p>
        </div>
        <button
          type="button"
          className="md:hidden text-slate-500 hover:text-slate-900"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <nav className={`${open ? 'block' : 'hidden'} md:block space-y-2`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
            onClick={() => setOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={logout}
          className="w-full text-left rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Sign out
        </button>
      </nav>
    </aside>
  )
}

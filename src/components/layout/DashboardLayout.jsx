import { Sidebar } from './Sidebar'
import { useAppContext } from '../../context/useAppContext'

export function DashboardLayout({ title, children }) {
  const { user } = useAppContext()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[19rem_1fr]">
          <Sidebar />
          <section className="space-y-6">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Welcome back, {user?.name}</p>
                <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
              </div>
            </header>
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}

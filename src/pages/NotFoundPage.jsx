import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl border border-slate-200 text-center">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm text-slate-500">The page you are looking for does not exist or has moved.</p>
        <Link
          to="/login"
          className="mt-8 inline-flex rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Go back to login
        </Link>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useAppContext } from '../context/useAppContext'

const categories = ['All', 'Exam', 'Event', 'General']

export function NoticeBoard() {
  const { notices } = useAppContext()
  const [activeCategory, setActiveCategory] = useState('All')
  const filteredNotices =
    activeCategory === 'All'
      ? notices
      : notices.filter((notice) => notice.category === activeCategory)

  return (
    <section className="space-y-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Notice Board</h2>
          <p className="text-sm text-slate-500">Filter notices by category.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {filteredNotices.map((notice) => (
          <article key={notice.id} className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-900">{notice.title}</h3>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">
                {notice.category}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{notice.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

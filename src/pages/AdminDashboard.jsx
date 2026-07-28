import { useMemo, useState } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { NoticeBoard } from '../components/NoticeBoard'
import { useAppContext } from '../context/useAppContext'

function StatCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

export function AdminDashboard() {
  const {
    departments,
    subjects,
    announcements,
    calendar,
    students,
    faculty,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addSubject,
    updateSubject,
    deleteSubject,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addCalendarEntry,
    updateCalendarEntry,
    deleteCalendarEntry
  } = useAppContext()

  const [subjectName, setSubjectName] = useState('')
  const [subjectDepartment, setSubjectDepartment] = useState(departments[0]?.name || '')
  const [departmentName, setDepartmentName] = useState('')
  const [announcementTitle, setAnnouncementTitle] = useState('')
  const [announcementContent, setAnnouncementContent] = useState('')
  const [calendarTitle, setCalendarTitle] = useState('')
  const [calendarDate, setCalendarDate] = useState('')
  const [editSubject, setEditSubject] = useState(null)
  const [editDepartment, setEditDepartment] = useState(null)
  const [editAnnouncement, setEditAnnouncement] = useState(null)
  const [editCalendar, setEditCalendar] = useState(null)

  const stats = useMemo(
    () => [
      { label: 'Students', value: students.length },
      { label: 'Faculty', value: faculty.length },
      { label: 'Departments', value: departments.length },
      { label: 'Subjects', value: subjects.length }
    ],
    [students.length, faculty.length, departments.length, subjects.length]
  )

  const handleSubjectSubmit = (event) => {
    event.preventDefault()
    if (!subjectName.trim() || !subjectDepartment) return
    if (editSubject) {
      updateSubject(editSubject.id, subjectName.trim(), subjectDepartment)
      setEditSubject(null)
    } else {
      addSubject(subjectName.trim(), subjectDepartment)
    }
    setSubjectName('')
  }

  const handleDepartmentSubmit = (event) => {
    event.preventDefault()
    if (!departmentName.trim()) return
    if (editDepartment) {
      updateDepartment(editDepartment.id, departmentName.trim())
      setEditDepartment(null)
    } else {
      addDepartment(departmentName.trim())
    }
    setDepartmentName('')
  }

  const handleAnnouncementSubmit = (event) => {
    event.preventDefault()
    if (!announcementTitle.trim() || !announcementContent.trim()) return
    if (editAnnouncement) {
      updateAnnouncement(editAnnouncement.id, announcementTitle.trim(), announcementContent.trim())
      setEditAnnouncement(null)
    } else {
      addAnnouncement(announcementTitle.trim(), announcementContent.trim())
    }
    setAnnouncementTitle('')
    setAnnouncementContent('')
  }

  const handleCalendarSubmit = (event) => {
    event.preventDefault()
    if (!calendarTitle.trim() || !calendarDate) return
    if (editCalendar) {
      updateCalendarEntry(editCalendar.id, calendarTitle.trim(), calendarDate)
      setEditCalendar(null)
    } else {
      addCalendarEntry(calendarTitle.trim(), calendarDate)
    }
    setCalendarTitle('')
    setCalendarDate('')
  }

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Subjects</h2>
              <p className="text-sm text-slate-500">Add or edit the subject catalog.</p>
            </div>
          </div>
          <form className="grid gap-4" onSubmit={handleSubjectSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                placeholder="Subject name"
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              />
              <select
                value={subjectDepartment}
                onChange={(event) => setSubjectDepartment(event.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                {departments.map((department) => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              {editSubject ? 'Update subject' : 'Add subject'}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{subject.name}</p>
                  <p className="text-sm text-slate-500">{subject.department}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditSubject(subject)
                      setSubjectName(subject.name)
                      setSubjectDepartment(subject.department)
                    }}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSubject(subject.id)}
                    className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Departments</h2>
              <p className="text-sm text-slate-500">Manage academic departments.</p>
            </div>
          </div>
          <form className="grid gap-4" onSubmit={handleDepartmentSubmit}>
            <input
              value={departmentName}
              onChange={(event) => setDepartmentName(event.target.value)}
              placeholder="Department title"
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              {editDepartment ? 'Update department' : 'Add department'}
            </button>
          </form>
          <div className="mt-6 space-y-3">
            {departments.map((department) => (
              <div key={department.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-semibold text-slate-900">{department.name}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditDepartment(department)
                      setDepartmentName(department.name)
                    }}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteDepartment(department.id)}
                    className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Announcements</h2>
            <p className="text-sm text-slate-500">Share academic news with every role.</p>
          </div>
          <form className="grid gap-4" onSubmit={handleAnnouncementSubmit}>
            <input
              value={announcementTitle}
              onChange={(event) => setAnnouncementTitle(event.target.value)}
              placeholder="Announcement title"
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <textarea
              value={announcementContent}
              onChange={(event) => setAnnouncementContent(event.target.value)}
              rows={4}
              placeholder="Announcement details"
              className="min-h-[120px] rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              {editAnnouncement ? 'Update announcement' : 'Publish announcement'}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{announcement.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{announcement.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditAnnouncement(announcement)
                        setAnnouncementTitle(announcement.title)
                        setAnnouncementContent(announcement.content)
                      }}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAnnouncement(announcement.id)}
                      className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Academic Calendar</h2>
            <p className="text-sm text-slate-500">Manage key campus events and dates.</p>
          </div>
          <form className="grid gap-4" onSubmit={handleCalendarSubmit}>
            <input
              value={calendarTitle}
              onChange={(event) => setCalendarTitle(event.target.value)}
              placeholder="Calendar item"
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <input
              type="date"
              value={calendarDate}
              onChange={(event) => setCalendarDate(event.target.value)}
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
            />
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              {editCalendar ? 'Update event' : 'Add event'}
            </button>
          </form>
          <div className="mt-6 space-y-4">
            {calendar.map((entry) => (
              <div key={entry.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{entry.title}</p>
                    <p className="text-sm text-slate-500">{entry.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditCalendar(entry)
                        setCalendarTitle(entry.title)
                        setCalendarDate(entry.date)
                      }}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCalendarEntry(entry.id)}
                      className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <NoticeBoard />
    </DashboardLayout>
  )
}

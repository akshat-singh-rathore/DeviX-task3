import { useMemo } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { NoticeBoard } from '../components/NoticeBoard'
import { useAppContext } from '../context/useAppContext'

function createDownloadText(title, details) {
  return `${title}\n\n${details}`
}

function downloadFile(fileName, content) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function StudentDashboard() {
  const { user, students } = useAppContext()
  const student = students.find((item) => item.id === user?.id)

  const attendanceSummary = useMemo(() => {
    if (!student) return []
    return Object.entries(student.attendanceRecords || {}).map(([subject, record]) => {
      const percentage = record.total ? Math.round((record.present / record.total) * 100) : 0
      return { subject, percentage }
    })
  }, [student])

  const totalAttendance = useMemo(() => {
    if (!student) return 0
    const records = Object.values(student.attendanceRecords || {})
    if (!records.length) return 0
    const average = records.reduce((sum, record) => sum + (record.total ? (record.present / record.total) * 100 : 0), 0) / records.length
    return Math.round(average)
  }, [student])

  const selectedMarks = useMemo(() => {
    if (!student) return []
    return Object.entries(student.marks || {}).map(([subject, score]) => ({ subject, score }))
  }, [student])

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Student profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{student?.name}</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Department</p>
              <p className="mt-2 font-semibold text-slate-900">{student?.department}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Year</p>
              <p className="mt-2 font-semibold text-slate-900">{student?.year}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Roll number</p>
              <p className="mt-2 font-semibold text-slate-900">{student?.roll}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">CGPA</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{student?.cgpa || 0}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Attendance</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{totalAttendance}%</p>
              <p className="mt-2 text-sm text-slate-500">Overall attendance percentage</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Subjects</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{student?.assignedSubjects?.length || 0}</p>
              <p className="mt-2 text-sm text-slate-500">Courses assigned this semester</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Downloads</h2>
          <p className="mt-2 text-sm text-slate-500">Download student documents securely.</p>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() =>
                downloadFile(
                  'hall-ticket.txt',
                  createDownloadText('Hall Ticket', `Student: ${student?.name}\nRoll: ${student?.roll}\nDepartment: ${student?.department}`)
                )
              }
              className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-200"
            >
              Download hall ticket
            </button>
            <button
              type="button"
              onClick={() =>
                downloadFile(
                  'fee-receipt.txt',
                  createDownloadText('Fee Receipt', `Student: ${student?.name}\nRoll: ${student?.roll}\nAmount: ₹25,000`) 
                )
              }
              className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-200"
            >
              Download fee receipt
            </button>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Attendance details</h2>
          <div className="mt-5 grid gap-3">
            {attendanceSummary.map((item) => (
              <div key={item.subject} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <span className="font-medium text-slate-900">{item.subject}</span>
                <span className="text-sm font-semibold text-slate-700">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Marks summary</h2>
          <div className="mt-5 grid gap-3">
            {selectedMarks.map((mark) => (
              <div key={mark.subject} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                <span className="font-medium text-slate-900">{mark.subject}</span>
                <span className="text-sm font-semibold text-slate-700">{mark.score}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Timetable</h2>
          <div className="mt-5 grid gap-3">
            {student?.timetable?.map((item) => (
              <div key={`${item.day}-${item.subject}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{item.subject}</p>
                <p className="mt-1 text-sm text-slate-500">{item.day} • {item.time}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Exam schedule</h2>
          <div className="mt-5 grid gap-3">
            {student?.examSchedule?.map((exam) => (
              <div key={`${exam.date}-${exam.subject}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{exam.subject}</p>
                <p className="mt-1 text-sm text-slate-500">{exam.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <NoticeBoard />
    </DashboardLayout>
  )
}

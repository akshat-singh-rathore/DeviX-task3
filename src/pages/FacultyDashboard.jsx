import { useState } from 'react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { AttendanceChart } from '../components/charts/AttendanceChart'
import { ResultChart } from '../components/charts/ResultChart'
import { NoticeBoard } from '../components/NoticeBoard'
import { useAppContext } from '../context/useAppContext'

export function FacultyDashboard() {
  const { user, students, faculty, recordAttendance, updateStudentMarks } = useAppContext()

  const activeFaculty = faculty.find((member) => member.id === user?.id)
  const assignedSubjects = activeFaculty?.assignedSubjects || []
  const [subjectName, setSubjectName] = useState('')
  const [attendanceSelection, setAttendanceSelection] = useState({})
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [markValue, setMarkValue] = useState('')

  const classStudents = students.filter((student) => activeFaculty?.classStudents?.includes(student.id))
  const subjectNameValue = subjectName || assignedSubjects[0] || ''

  const initialAttendanceSelection = classStudents.reduce((accumulator, student) => {
    accumulator[student.id] = true
    return accumulator
  }, {})
  const attendanceState =
    Object.keys(attendanceSelection).length > 0 ? attendanceSelection : initialAttendanceSelection

  const handleAttendanceToggle = (studentId) => {
    setAttendanceSelection((current) => ({ ...current, [studentId]: !current[studentId] }))
  }

  const handleAttendanceSubmit = (event) => {
    event.preventDefault()
    const payload = classStudents.map((student) => ({
      studentId: student.id,
      present: Boolean(attendanceState[student.id])
    }))
    recordAttendance(subjectNameValue, payload)
  }

  const handleMarkSubmit = (event) => {
    event.preventDefault()
    if (!selectedStudentId || !subjectName || markValue === '') return
    updateStudentMarks(selectedStudentId, subjectName, markValue)
    setMarkValue('')
  }

  const attendanceChartData = classStudents.map((student) => {
    const record = student.attendanceRecords?.[subjectNameValue] || { present: 0, total: 0 }
    const percentage = record.total ? Math.round((record.present / record.total) * 100) : 0
    return { name: student.name, percentage }
  })

  const resultChartData = classStudents.map((student) => {
    const score = student.marks?.[subjectNameValue] || 0
    return { name: student.name, score }
  })

  return (
    <DashboardLayout title="Faculty Dashboard">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.95fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Assigned subjects</h2>
            <p className="text-sm text-slate-500">Review your teaching assignments and student groups.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {assignedSubjects.map((subject) => (
              <div
                key={subject}
                className={`rounded-3xl border px-4 py-4 text-sm font-medium ${
                  subject === subjectNameValue
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
                onClick={() => setSubjectName(subject)}
              >
                {subject}
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Class size</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{classStudents.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Subject focus</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{subjectNameValue || 'Select a subject'}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Student list</h2>
            <p className="text-sm text-slate-500">Track attendance and marks for your assigned students.</p>
          </div>
          <div className="space-y-4">
            {classStudents.map((student) => (
              <div key={student.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{student.name}</p>
                    <p className="text-sm text-slate-500">{student.department} • {student.year}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span>{student.roll}</span>
                    <span>CGPA: {student.cgpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Mark attendance</h2>
          <p className="mt-2 text-sm text-slate-500">Record attendance for the selected subject.</p>
          <form className="mt-6 space-y-4" onSubmit={handleAttendanceSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <select
                value={subjectNameValue}
                onChange={(event) => setSubjectName(event.target.value)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                {assignedSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              {classStudents.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm text-slate-900">{student.name}</span>
                  <input
                    type="checkbox"
                    checked={Boolean(attendanceState[student.id])}
                    onChange={() => handleAttendanceToggle(student.id)}
                    className="h-5 w-5 rounded border-slate-300 text-slate-900"
                  />
                </label>
              ))}
            </div>
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              Save attendance
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Update marks</h2>
          <p className="mt-2 text-sm text-slate-500">Assign or adjust marks for the current subject.</p>
          <form className="mt-6 space-y-4" onSubmit={handleMarkSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={selectedStudentId}
                onChange={(event) => setSelectedStudentId(event.target.value)}
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                <option value="">Select student</option>
                {classStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                max="100"
                value={markValue}
                onChange={(event) => setMarkValue(event.target.value)}
                placeholder="Marks"
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none"
              />
            </div>
            <button className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              Save marks
            </button>
          </form>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AttendanceChart data={attendanceChartData} />
        <ResultChart data={resultChartData} />
      </div>

      <NoticeBoard />
    </DashboardLayout>
  )
}

import { useEffect, useMemo, useState } from 'react'
import AppContext from './AppContextObject'
import { defaultData } from '../data/defaultData'
import { createResource, deleteResource, loadDatabase, updateResource } from '../services/apiService'

export function AppProvider({ children }) {
  const storedData = useMemo(
    () => JSON.parse(localStorage.getItem('devixtask3-app-data') || 'null') || {},
    []
  )
  const savedUser = useMemo(
    () => JSON.parse(localStorage.getItem('devixtask3-auth-user') || 'null'),
    []
  )

  const [user, setUser] = useState(savedUser || null)
  const [departments, setDepartments] = useState(storedData.departments || defaultData.departments)
  const [subjects, setSubjects] = useState(storedData.subjects || defaultData.subjects)
  const [notices, setNotices] = useState(storedData.notices || defaultData.notices)
  const [calendar, setCalendar] = useState(storedData.calendar || defaultData.calendar)
  const [announcements, setAnnouncements] = useState(storedData.announcements || defaultData.announcements)
  const [students, setStudents] = useState(storedData.students || defaultData.students)
  const [faculty, setFaculty] = useState(storedData.faculty || defaultData.faculty)
  const [staff, setStaff] = useState(storedData.staff || defaultData.staff)

  useEffect(() => {
    const loadRemoteData = async () => {
      try {
        const remoteData = await loadDatabase()
        if (Object.keys(remoteData).length) {
          if (remoteData.departments) setDepartments(remoteData.departments)
          if (remoteData.subjects) setSubjects(remoteData.subjects)
          if (remoteData.notices) setNotices(remoteData.notices)
          if (remoteData.calendar) setCalendar(remoteData.calendar)
          if (remoteData.announcements) setAnnouncements(remoteData.announcements)
          if (remoteData.students) setStudents(remoteData.students)
          if (remoteData.faculty) setFaculty(remoteData.faculty)
          if (remoteData.staff) setStaff(remoteData.staff)
        }
      } catch {
        // Fallback to default data when JSON server is unavailable.
      }
    }

    if (!Object.keys(storedData).length) {
      loadRemoteData()
    }
  }, [storedData])

  useEffect(() => {
    const payload = {
      departments,
      subjects,
      notices,
      calendar,
      announcements,
      students,
      faculty,
      staff
    }
    localStorage.setItem('devixtask3-app-data', JSON.stringify(payload))
  }, [departments, subjects, notices, calendar, announcements, students, faculty, staff])

  useEffect(() => {
    if (user) {
      localStorage.setItem('devixtask3-auth-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('devixtask3-auth-user')
    }
  }, [user])

  const login = (role, identifier, password) => {
    if (role === 'admin') {
      if (identifier === 'admin@college.edu' && password === 'admin123') {
        setUser({ id: 'admin', role: 'admin', name: 'Campus Admin', email: 'admin@college.edu' })
        return true
      }
      return false
    }

    if (role === 'faculty') {
      const found = faculty.find((item) => item.email === identifier && item.password === password)
      if (found) {
        setUser({ id: found.id, role: 'faculty', name: found.name, email: found.email, department: found.department })
        return true
      }
      return false
    }

    if (role === 'student') {
      const found = students.find(
        (item) => (item.email === identifier || item.roll === identifier) && item.password === password
      )
      if (found) {
        setUser({
          id: found.id,
          role: 'student',
          name: found.name,
          email: found.email,
          department: found.department,
          year: found.year,
          roll: found.roll,
          assignedSubjects: found.assignedSubjects
        })
        return true
      }
      return false
    }

    return false
  }

  const logout = () => {
    setUser(null)
  }

  const registerStudent = ({ name, email, password, department, year, roll }) => {
    const newStudent = {
      id: `s-${Date.now()}`,
      role: 'student',
      name,
      email,
      password,
      department,
      year,
      roll,
      assignedSubjects: subjects.filter((subject) => subject.department === department).map((subject) => subject.name),
      attendanceRecords: {},
      marks: {},
      cgpa: 0,
      timetable: [],
      examSchedule: []
    }
    setStudents((current) => [...current, newStudent])
    createResource('students', newStudent).catch(() => null)
    setUser({
      id: newStudent.id,
      role: 'student',
      name: newStudent.name,
      email: newStudent.email,
      department: newStudent.department,
      year: newStudent.year,
      roll: newStudent.roll,
      assignedSubjects: newStudent.assignedSubjects
    })
    return true
  }

  const addDepartment = (name) => {
    const newDepartment = { id: name.toLowerCase().replace(/\s+/g, '-'), name }
    setDepartments((current) => [...current, newDepartment])
    createResource('departments', newDepartment).catch(() => null)
  }

  const updateDepartment = (id, name) => {
    setDepartments((current) => current.map((department) => (department.id === id ? { ...department, name } : department)))
    updateResource('departments', id, { name }).catch(() => null)
  }

  const deleteDepartment = (id) => {
    setDepartments((current) => current.filter((department) => department.id !== id))
    deleteResource('departments', id).catch(() => null)
  }

  const addSubject = (name, department) => {
    const newSubject = { id: name.toLowerCase().replace(/\s+/g, '-'), name, department }
    setSubjects((current) => [...current, newSubject])
    createResource('subjects', newSubject).catch(() => null)
  }

  const updateSubject = (id, name, department) => {
    setSubjects((current) => current.map((subject) => (subject.id === id ? { ...subject, name, department } : subject)))
    updateResource('subjects', id, { name, department }).catch(() => null)
  }

  const deleteSubject = (id) => {
    setSubjects((current) => current.filter((subject) => subject.id !== id))
    deleteResource('subjects', id).catch(() => null)
  }

  const addAnnouncement = (title, content) => {
    const newAnnouncement = { id: `ann-${Date.now()}`, title, content }
    setAnnouncements((current) => [...current, newAnnouncement])
    createResource('announcements', newAnnouncement).catch(() => null)
  }

  const updateAnnouncement = (id, title, content) => {
    setAnnouncements((current) =>
      current.map((announcement) => (announcement.id === id ? { ...announcement, title, content } : announcement))
    )
    updateResource('announcements', id, { title, content }).catch(() => null)
  }

  const deleteAnnouncement = (id) => {
    setAnnouncements((current) => current.filter((announcement) => announcement.id !== id))
    deleteResource('announcements', id).catch(() => null)
  }

  const addCalendarEntry = (title, date) => {
    const newEntry = { id: `cal-${Date.now()}`, title, date }
    setCalendar((current) => [...current, newEntry])
    createResource('calendar', newEntry).catch(() => null)
  }

  const updateCalendarEntry = (id, title, date) => {
    setCalendar((current) => current.map((entry) => (entry.id === id ? { ...entry, title, date } : entry)))
    updateResource('calendar', id, { title, date }).catch(() => null)
  }

  const deleteCalendarEntry = (id) => {
    setCalendar((current) => current.filter((entry) => entry.id !== id))
    deleteResource('calendar', id).catch(() => null)
  }

  const recordAttendance = (subjectName, attendanceList) => {
    setStudents((current) =>
      current.map((student) => {
        const currentRecord = student.attendanceRecords?.[subjectName] || { present: 0, total: 0 }
        const entry = attendanceList.find((record) => record.studentId === student.id)
        if (!entry) {
          return student
        }

        const updatedAttendance = {
          present: currentRecord.present + (entry.present ? 1 : 0),
          total: currentRecord.total + 1
        }

        const updatedStudent = {
          ...student,
          attendanceRecords: {
            ...student.attendanceRecords,
            [subjectName]: updatedAttendance
          }
        }

        updateResource('students', student.id, {
          attendanceRecords: updatedStudent.attendanceRecords
        }).catch(() => null)

        return updatedStudent
      })
    )
  }

  const updateStudentMarks = (studentId, subjectName, marks) => {
    setStudents((current) =>
      current.map((student) => {
        if (student.id !== studentId) {
          return student
        }
        const updatedMarks = { ...student.marks, [subjectName]: Number(marks) }
        const average =
          Object.values(updatedMarks).reduce((sum, value) => sum + Number(value || 0), 0) /
          Math.max(Object.values(updatedMarks).length, 1)
        const updatedStudent = {
          ...student,
          marks: updatedMarks,
          cgpa: Number((average / 10).toFixed(2))
        }

        updateResource('students', student.id, {
          marks: updatedStudent.marks,
          cgpa: updatedStudent.cgpa
        }).catch(() => null)

        return updatedStudent
      })
    )
  }

  const value = {
    user,
    login,
    logout,
    registerStudent,
    departments,
    subjects,
    notices,
    calendar,
    announcements,
    students,
    faculty,
    staff,
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
    deleteCalendarEntry,
    recordAttendance,
    updateStudentMarks
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

# DeviX-task3: College Management Web Application

## Project Overview
This project is a fundamental and multi-role College Management Web Application developed as part of the DeviX Solutions Frontend Internship Program 2026. It features separate, protected dashboard experiences for Admins, Faculty, and Students to handle core academic operations. 

## Tech Stack
*   **Frontend Framework:** React JS
*   **Routing:** React Router v6
*   **State Management:** Context API
*   **Styling:** Tailwind CSS
*   **Backend/Database:** Firebase or JSON Server

## Core Features

### Authentication & Routing
*   Three distinct user roles: Admin, Faculty, and Student.
*   Role-based protected routing ensuring secure access control.
*   Sign-up flow for new students, assigning department, year, and roll number.

### Admin Dashboard
*   Manage users (Students, Faculty, Staff).
*   Display platform statistics (total users, departments).
*   Add, edit, or delete subjects, departments, announcements, and the academic calendar.

### Faculty Dashboard
*   View assigned subjects and corresponding student lists.
*   Mark daily attendance for respective classes.
*   Enter and update student academic marks and grades.
*   View performance analytics for the class.

### Student Dashboard
*   View personal profile information, attendance percentage, academic marks, and CGPA.
*   Download hall tickets and fee receipts.
*   View personal timetable and examination schedules.

### Shared Modules
*   Global Notice Board accessible to all roles with category filters (Exam, Event, General).
*   Responsive sidebar navigation featuring a mobile hamburger menu.
*   Graphical charts for visualizing attendance and academic results.

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (v16.x or higher)
*   npm (Node Package Manager)
*   Git

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/DeviX-task3.git](https://github.com/your-username/DeviX-task3.git)
   cd DeviX-task3

import { useState } from 'react'
import Home from './pages/Home'
import Schedule from './pages/Schedule'
import Register from './pages/Register'
import Course from './pages/Course'
import { Routes, Route } from 'react-router-dom'
import { CourseProvider } from './Context/CourseContext'

function App() {

  return (
    <CourseProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/*" element={<Course />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </CourseProvider>
  )
}

export default App

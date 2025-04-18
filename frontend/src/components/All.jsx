import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Card.css'
import Details from './Details'

const All = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/course')
        const data = response.data
        
        const courseArray = Array.isArray(data) ? data : 
                          Array.isArray(data.data) ? data.data :
                          Object.values(data)
        
        setCourses(courseArray)
      } catch (error) {
        console.error('Error fetching courses:', error)
        setCourses([])
      }
    }
    
    fetchCourses()
  }, [])

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setShowDetails(true)
  }

  const handleBack = () => {
    setShowDetails(false)
    setSelectedCourse(null)
  }

  return (
    <>
      <div className="tabs">
        <Link to="/course" className="tab active">ALL<div className="bar"></div></Link>
        <Link to="/course/lifestyle" className="tab">Lifestyle</Link>
        <Link to="/course/arts" className="tab">Arts</Link>
        <Link to="/course/sport" className="tab">Sport</Link>
        <Link to="/course/technical" className="tab">Technical</Link>
        <Link to="/course/miscellaneous" className="tab">Miscellaneous</Link>
      </div>

      {!showDetails ? (
        <div className="course-grid">
          {courses.map((course) => (
            <div
              key={course._id}
              className="course-card"
              style={{
                backgroundImage: `url(${course.image ? `../assets/images/${course.image}` : '../assets/images/default.jpg'})`,
                backgroundPosition: "center center",
                backgroundSize: "cover"
              }}
              onClick={() => handleCourseClick(course)}
            >
              <div className="card-overlay"></div>
              <div className="card-content">
                <h3>{course.id}. <br/> {course.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Details course={selectedCourse} onBack={handleBack} />
      )}
    </>
  )
}

export default All

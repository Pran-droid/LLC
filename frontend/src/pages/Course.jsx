import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import '../styles/Course.css'
import All from '../components/All'
import Lifestyle from '../components/Lifestyle'
import Arts from '../components/Arts'
import Sport from '../components/Sport'
import Technical from '../components/Technical'
import Miscellaneous from '../components/Miscellaneous'

const Course = () => {

    const styles = {
        position: "absolute",
        top: "245px",
        left: "3px",
        width: "100%",
    }
  
  return (
    <div className="app-container">
        <div className="side-bar">
            <div className="sidebar-menu">
                <div style={styles} className="select-bar">
                    <img src="../assets/images/bar.png" alt=""/>
                </div>
                <div className="logo">LLC</div>
                <ul>
                    <li >    
                        <img className="icon" src="../assets/icons/dashboard.png" alt=""/>
                        <Link to="/">Home</Link>
                    </li>
                    <li  className="active">
                        <img className="icon" src="../assets/active-icons/course.png" alt=""/>
                        <Link to="/course">Course</Link>
                    </li>
                    <li>
                        <img className="icon" src="../assets/icons/register.png" alt=""/>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <img className="icon" src="../assets/icons/shedule.png" alt=""/>
                        <Link to="/schedule">Schedule</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="main-content">
            <div className="dashboard-header">
                <h1>Course</h1>
                <h5>Available</h5>
            </div>
            <div className="course-type">
                <Routes>
                    <Route path="/" element={<All />} />
                    <Route path="/lifestyle" element={<Lifestyle />} />
                    <Route path="/arts" element={<Arts />} />
                    <Route path="/sport" element={<Sport />} />
                    <Route path="/technical" element={<Technical />} />
                    <Route path="/miscellaneous" element={<Miscellaneous />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Course

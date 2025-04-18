import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Register.css'
import axios from 'axios'
import { useSelectedCourses } from '../Context/CourseContext';

const Register = () => {

    const styles = {
        position: "absolute",
        top: "325px",
        left: "3px",
        width: "100%",
    }

    const [newRegister, setNewRegister] = useState({
        rollno:'',
        password:'',
        choice1:'',
        choice2:'',
        choice3:'',
        choice4:'',
    })

    // Add state for course data
    const [courses, setCourses] = useState([])

    // Fetch course data on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/course')
                console.log('API response:', response.data)
                
                // Handle different data structures that might be returned
                let courseArray = []
                
                if (Array.isArray(response.data)) {
                    // If response.data is already an array
                    courseArray = response.data
                } else if (response.data && typeof response.data === 'object') {
                    // If response.data is an object with a data property that's an array
                    if (Array.isArray(response.data.data)) {
                        courseArray = response.data.data
                    } else {
                        // Convert object to array if it's a collection of courses
                        courseArray = Object.values(response.data)
                    }
                }
                
                setCourses(courseArray)
                console.log('Processed courses:', courseArray)
            } catch (error) {
                console.error('Error fetching courses:', error)
                setCourses([]) // Set to empty array on error
            }
        }
        
        fetchCourses()
    }, [])

    const handleChanges = (e) => {
        setNewRegister({...newRegister, [e.target.name]: e.target.value})
    }

    // Reset form values function
    const resetValues = () => {
        setNewRegister({
            rollno:'',
            password:'',
            choice1:'',
            choice2:'',
            choice3:'',
            choice4:'',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/register', newRegister)
            console.log('Registration successful:', response.data)
            alert('Registration successful!')
            resetValues()
        } catch (error) {
            console.error('Registration error:', error)
            alert(error.response?.data?.message || 'Registration failed. Please try again.')
        }
    }

    const { selectedCourses, getPreferences } = useSelectedCourses();

    useEffect(() => {
        if (selectedCourses.length > 0) {
            const preferences = getPreferences();
            setNewRegister(prev => ({
                ...prev,
                ...preferences
            }));
        }
    }, [selectedCourses]);

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
                    <li>
                        <img className="icon" src="../assets/icons/course.png" alt=""/>
                        <Link to="/course">Course</Link>
                    </li>
                    <li className="active">
                        <img className="icon" src="../assets/active-icons/register.png" alt=""/>
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
                <h1>Register</h1>
                <h5>Choice</h5>
            </div>
            <div className="dashboard-description">
                <h5><i>*Course will be alloted based on majority.</i></h5>
            </div>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className="form-authenticate">
                    <div className="form-rollno">
                        <label htmlFor="rollno">Student Roll No.*</label>
                        <input 
                            type="text" 
                            placeholder='Your Roll no.' 
                            name='rollno' 
                            value={newRegister.rollno}
                            onChange={(e) => handleChanges(e)} required/>
                    </div>
                    <div className="form-password">
                        <label htmlFor="password">Password*</label>
                        <input 
                            type="password" // Changed from "text" for security
                            placeholder='Your Password' 
                            name='password' 
                            value={newRegister.password}
                            onChange={(e) => handleChanges(e)} 
                            required
                        />
                    </div>
                </div>
                <div className="form-preference">
                    <h2>Select Preferences</h2>
                    <h5>*Selected connot be changed later.</h5>
                    {selectedCourses.length > 0 && (
                        <p className="pre-selected-notice">
                            *{selectedCourses.length} courses pre-selected from Course page
                        </p>
                    )}
                    <div className="form-choice">
                        <div className="form-choice1">
                            <label htmlFor="choice1">1st Preference:</label>
                            <select 
                                name="choice1"
                                value={newRegister.choice1} 
                                onChange={(e) => handleChanges(e)}
                            >
                                <option value="">-- Your Choice --</option>
                                {Array.isArray(courses) && courses.map((course, index) => (
                                    <option key={course._id || index} value={course.id}>
                                        {course.id || course.courseId}. {course.name || course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-choice2">
                            <label htmlFor="choice2">2nd Preference:</label>
                            <select 
                                name="choice2"
                                value={newRegister.choice2}
                                onChange={(e) => handleChanges(e)}
                            >
                                <option value="">-- Your Choice --</option>
                                {Array.isArray(courses) && courses.map((course, index) => (
                                    <option key={course._id || index} value={course.id}>
                                        {course.id || course.courseId}. {course.name || course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-choice3">
                            <label htmlFor="choice3">3rd Preference:</label>
                            <select 
                                name="choice3"
                                value={newRegister.choice3}
                                onChange={(e) => handleChanges(e)}
                            >
                                <option value="">-- Your Choice --</option>
                                {Array.isArray(courses) && courses.map((course, index) => (
                                    <option key={course._id || index} value={course.id}>
                                        {course.id || course.courseId}. {course.name || course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-choice4">
                            <label htmlFor="choice4">4th Preference:</label>
                            <select 
                                name="choice4"
                                value={newRegister.choice4}
                                onChange={(e) => handleChanges(e)}
                            >
                                <option value="">-- Your Choice --</option>
                                {Array.isArray(courses) && courses.map((course, index) => (
                                    <option key={course._id || index} value={course.id}>
                                        {course.id || course.courseId}. {course.name || course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register
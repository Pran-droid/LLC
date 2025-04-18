import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {

    const styles = {
        position: "absolute",
        top: "165px",
        left: "3px",
        width: "100%",
    }

  // Add useEffect to handle the slider automation
  useEffect(() => {
    let counter = 1;
    // Set initial radio button state immediately
    document.getElementById('radio1').checked = true;
    
    const interval = setInterval(() => {
      counter++;
      if(counter > 6) {
        counter = 1;
      }
      document.getElementById('radio' + counter).checked = true;
    }, 4000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount
  
  return (
    <div className="app-container">
        <div className="side-bar">
            <div className="sidebar-menu">
                <div style={styles} className="select-bar">
                    <img src="../assets/images/bar.png" alt=""/>
                </div>
                <div className="logo">LLC</div>
                <ul>
                    <li className="active">    
                        <img className="icon" src="../assets/active-icons/dashboard.png" alt=""/>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <img className="icon" src="../assets/icons/course.png" alt=""/>
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
            <h1>Home</h1>
            <h5>Overview</h5>
        </div>
        <div className="dashboard-description">

            <h2>LIBERAL LEARNING COURSE</h2>
            <p>
                Government of Maharashtra has directed Autonomous Colleges to revise their curriculum in line with National Education Policy (NEP) 2020 through Government Resolution dated 4th July 2023. As per this Government Resolution, 04 (Credit) Co-curricular Courses (CC) courses should be offered such as Health and Wellness, Yoga education, sports and fitness, Cultural Activities, NSS/NCC and Fine/ Applied/ Visual/Performing Arts etc.
            </p> 
            {/* <span id="typer" style="color: rgb(0, 0, 0);"></span>    */}
        </div>
        <div className="slider">
            <div className="slides">
                <input type="radio" name="radio-btn" id="radio1"/>
                <input type="radio" name="radio-btn" id="radio2"/>
                <input type="radio" name="radio-btn" id="radio3"/>
                <input type="radio" name="radio-btn" id="radio4"/>
                <input type="radio" name="radio-btn" id="radio5"/>
                <input type="radio" name="radio-btn" id="radio6"/>

                <div className="slide first">
                    <img src="../assets/images/cooking.jpg" alt=""/>
                </div>
                <div className="slide">
                    <img src="../assets/images/cinema.jpg" alt=""/>
                </div>
                <div className="slide">
                    <img src="../assets/images/yog.jpg" alt=""/>
                </div>
                <div className="slide">
                    <img src="../assets/images/photo.jpg" alt=""/>
                </div>
                <div className="slide">
                    <img src="../assets/images/music.jpeg" alt=""/>
                </div>
                <div className="slide">
                    <img src="../assets/images/athletic.jpg" alt=""/>
                </div>

                <div className="navigation-auto">
                    <div className="auto-btn1"></div>
                    <div className="auto-btn2"></div>
                    <div className="auto-btn3"></div>
                    <div className="auto-btn4"></div>
                    <div className="auto-btn5"></div>
                    <div className="auto-btn6"></div>
                </div>

                <div className="navigation-manual">
                    <label htmlFor="radio1" className="manual-btn"></label>
                    <label htmlFor="radio2" className="manual-btn"></label>
                    <label htmlFor="radio3" className="manual-btn"></label>
                    <label htmlFor="radio4" className="manual-btn"></label>
                    <label htmlFor="radio5" className="manual-btn"></label>
                    <label htmlFor="radio6" className="manual-btn"></label>
                </div>
            </div>
        </div>
        <div className="syllabus">
            <a 
                href="/assets/Liberal_Leanring_Courses_LLC.pdf" 
                download="Liberal_Leanring_Courses_LLC.pdf"
                target="_blank"
            >
                    Download Syllabus
            </a>
        </div>
        </div>
    </div>
  )
}

export default Home
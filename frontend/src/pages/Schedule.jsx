import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Schedule.css'; // Make sure you have the corresponding CSS file
import axios from 'axios';

const Schedule = () => {

    const styles = {
        position: "absolute",
        top: "405px",
        left: "3px",
        width: "100%",
    }
    
  // State variables
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [eventsList, setEventsList] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  
  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventTimeFrom, setEventTimeFrom] = useState('');
  const [eventTimeTo, setEventTimeTo] = useState('');
  
  // Refs
  const daysContainerRef = useRef(null);

  // Constants
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Get events from API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/schedule');
            if (response.data.success) {
                setEventsList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            setEventsList([]);
        }
    };

    fetchEvents();
  }, []);

  // Get day name for the active day
  const getActiveDayName = () => {
    const day = new Date(currentYear, currentMonth, activeDay);
    return day.toString().split(" ")[0];
  };

  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle day click
  const handleDayClick = (day, isPrevMonth, isNextMonth) => {
    setActiveDay(day);
    
    if (isPrevMonth) {
      goToPrevMonth();
    } else if (isNextMonth) {
      goToNextMonth();
    }
  };

  // Check if a day has events
  const hasEvents = (day) => {
    return eventsList.some(event => 
      event.day === day && 
      event.month === currentMonth + 1 && 
      event.year === currentYear
    );
  };

  // Get events for the active day
  const getEventsForActiveDay = () => {
    const dayEvents = eventsList.find(event => 
      event.day === activeDay && 
      event.month === currentMonth + 1 && 
      event.year === currentYear
    );
    
    return dayEvents ? dayEvents.events : [];
  };

  // Add new event
  const addEvent = async () => {
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
      alert('Please fill all the fields');
      return;
    }

    // Validate time format
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');
    
    if (
      timeFromArr.length !== 2 ||
      timeToArr.length !== 2 ||
      parseInt(timeFromArr[0]) > 23 ||
      parseInt(timeFromArr[1]) > 59 ||
      parseInt(timeToArr[0]) > 23 ||
      parseInt(timeToArr[1]) > 59
    ) {
      alert('Invalid Time Format');
      return;
    }

    // Convert 24h format to 12h format
    const convertTime = (time) => {
      const [hours, minutes] = time.split(':');
      const hr = parseInt(hours) % 12 || 12;
      const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      return `${hr}:${minutes} ${ampm}`;
    };

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        day: activeDay,
        month: currentMonth + 1,
        year: currentYear,
        events: [{
            title: eventTitle,
            time: `${timeFrom} - ${timeTo}`
        }]
    };

    try {
        const response = await axios.post('http://localhost:5000/api/schedule', newEvent);
        if (response.data.success) {
            setEventsList(prevEvents => [...prevEvents, response.data.data]);
            setEventTitle('');
            setEventTimeFrom('');
            setEventTimeTo('');
            setShowAddEventModal(false);
        }
    } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
    }
  };

  // Delete event
  /* const deleteEvent = async (eventTitle) => {
    try {
        await axios.delete(`http://localhost:5000/api/schedule/${activeDay}/${currentMonth + 1}/${currentYear}/${eventTitle}`);
        setEventsList(prevEvents => {
            const newEvents = prevEvents.filter(event => 
                !(event.day === activeDay && 
                  event.month === currentMonth + 1 && 
                  event.year === currentYear && 
                  event.events.some(e => e.title === eventTitle))
            );
            return newEvents;
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
    }
  }; */

  // Handle time input formatting
  const handleTimeInput = (value, setter) => {
    const formatted = value.replace(/[^0-9:]/g, "");
    
    if (formatted.length === 2 && !formatted.includes(':')) {
      setter(formatted + ':');
    } else if (formatted.length > 5) {
      setter(formatted.slice(0, 5));
    } else {
      setter(formatted);
    }
  };

  // Generate calendar days
  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;
    
    let days = [];

    // Previous month's days
    for (let x = day; x > 0; x--) {
      const prevMonthDay = prevDays - x + 1;
      days.push(
        <div 
          key={`prev-${prevMonthDay}`} 
          className="day prev-date"
          onClick={() => handleDayClick(prevMonthDay, true, false)}
        >
          {prevMonthDay}
        </div>
      );
    }

    // Current month's days
    for (let i = 1; i <= lastDate; i++) {
      const isToday = 
        i === new Date().getDate() && 
        currentYear === new Date().getFullYear() && 
        currentMonth === new Date().getMonth();
        
      const isActive = i === activeDay;
      const hasEvent = hasEvents(i);
      
      let className = "day";
      if (isToday) className += " today";
      if (isActive) className += " active";
      if (hasEvent) className += " event";
      
      days.push(
        <div 
          key={`current-${i}`} 
          className={className}
          onClick={() => handleDayClick(i, false, false)}
        >
          {i}
        </div>
      );
    }

    // Next month's days
    for (let j = 1; j <= nextDays; j++) {
      days.push(
        <div 
          key={`next-${j}`} 
          className="day next-date"
          onClick={() => handleDayClick(j, false, true)}
        >
          {j}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="app-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="side-bar">
        <div className="sidebar-menu">
          <div className="logo">LLC</div>
          <div style={styles} className="select-bar">
            <img src="../assets/images/bar.png" alt="" />
          </div>
          <ul>
            <li>
              <img className="icon" src="../assets/icons/dashboard.png" alt="" />
              <Link to="/">Home</Link>
            </li>
            <li>
              <img className="icon" src="../assets/icons/course.png" alt="" />
              <Link to="/course">Course</Link>
            </li>
            <li>
              <img className="icon" src="../assets/icons/register.png" alt="" />
              <Link to="/register">Register</Link>
            </li>
            <li className="active">
              <img className="icon" src="../assets/active-icons/schedule.png" alt="" />
              <Link to="/schedule">Schedule</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Schedule</h1>
          <h5>Timetable</h5>
        </div>
        <div className="dashboard-description">
          <h5><i>*LLC are only scheduled on Friday & Saturday</i></h5>
        </div>
        
        <div className="container">
          <div className="left">
            <div className="calendar">
              <div className="month">
                <i className="fas fa-angle-left prev" onClick={goToPrevMonth}></i>
                <div className="date">{months[currentMonth]} {currentYear}</div>
                <i className="fas fa-angle-right next" onClick={goToNextMonth}></i>
              </div>
              <div className="weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="days" ref={daysContainerRef}>
                {renderCalendar()}
              </div>
            </div>
          </div>
          
          <div className="right">
            <div className="today-date">
              <div className="event-day">{getActiveDayName()}</div>
              <div className="event-date">{activeDay} {months[currentMonth]} {currentYear}</div>
            </div>
            
            <div className="events">
              {getEventsForActiveDay().length > 0 ? (
                getEventsForActiveDay().map((event, index) => (
                  <div key={index} className="event" onClick={() => deleteEvent(event.title)}>
                    <div className="title">
                      <i className="fas fa-circle"></i>
                      <h3 className="event-title">{event.title}</h3>
                    </div>
                    <div className="event-time">
                      <span className="event-time">{event.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-event">
                  <h3>No LLC</h3>
                </div>
              )}
            </div>
            
            {/* Add Event Modal */}
            <div className={`add-event-wrapper ${showAddEventModal ? 'active' : ''}`}>
              <div className="add-event-header">
                <div className="title">Add Event</div>
                <i className="fas fa-times close" onClick={() => setShowAddEventModal(false)}></i>
              </div>
              <div className="add-event-body">
                <div className="add-event-input">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="event-name"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value.slice(0, 60))}
                  />
                </div>
                <div className="add-event-input">
                  <input
                    type="text"
                    placeholder="Event Time From"
                    className="event-time-from"
                    value={eventTimeFrom}
                    onChange={(e) => handleTimeInput(e.target.value, setEventTimeFrom)}
                  />
                </div>
                <div className="add-event-input">
                  <input
                    type="text"
                    placeholder="Event Time To"
                    className="event-time-to"
                    value={eventTimeTo}
                    onChange={(e) => handleTimeInput(e.target.value, setEventTimeTo)}
                  />
                </div>
              </div>
              <div className="add-event-footer">
                <button className="add-event-btn" onClick={addEvent}>Add Event</button>
              </div>
            </div>
          </div>
          
          {/* Add event button */}
          {/* <button className="add-event" onClick={() => setShowAddEventModal(true)}>
            <i className="fas fa-plus"></i>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export function CourseProvider({ children }) {
    const [selectedCourses, setSelectedCourses] = useState([]);

    const addCourse = (course) => {
        if (selectedCourses.length < 4 && !selectedCourses.find(c => c.id === course.id)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const removeCourse = (courseId) => {
        setSelectedCourses(selectedCourses.filter(course => course.id !== courseId));
    };

    const getPreferences = () => {
        return {
            choice1: selectedCourses[0]?.id || '',
            choice2: selectedCourses[1]?.id || '',
            choice3: selectedCourses[2]?.id || '',
            choice4: selectedCourses[3]?.id || ''
        };
    };

    const clearSelections = () => {
        setSelectedCourses([]);
    };

    return (
        <CourseContext.Provider value={{ 
            selectedCourses, 
            addCourse, 
            removeCourse,
            getPreferences,
            clearSelections
        }}>
            {children}
        </CourseContext.Provider>
    );
}

export const useSelectedCourses = () => useContext(CourseContext);
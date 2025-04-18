import React from 'react'
import { useSelectedCourses } from '../Context/CourseContext'
import './Details.css'

const Details = ({ course, onBack }) => {
    const { selectedCourses, addCourse, removeCourse } = useSelectedCourses();
    const isSelected = selectedCourses.some(c => c.id === course.id);
    const isMaxSelected = selectedCourses.length >= 4;

    return (
        <div className="course-details">
            <button className="back-button" onClick={onBack}>
                <i className="fas fa-arrow-left"></i> Back to Courses
            </button>

            <div className="detail-content">
                <div className="detail-header">
                    <img
                        src={`../assets/images/${course.image || 'default.jpg'}`}
                        alt={course.name}
                    />
                    <div className="header-content">
                        <div className="header-top">
                            <div>
                                <h2>{course.id}. <br /> {course.name}</h2>
                                <p className="category">{course.category}</p>
                                <p className="faculty">Faculty - Dr. Roshni Padate</p>
                                <button
                                    className={`select-button ${isSelected ? 'selected' : ''} ${isMaxSelected && !isSelected ? 'disabled' : ''}`}
                                    onClick={() => isSelected ? removeCourse(course.id) : addCourse(course)}
                                    disabled={isMaxSelected && !isSelected}
                                >
                                    {isSelected ? 'Selected' : 'Select'}
                                </button>
                            </div>
                    <div className="selected-courses">
                        <h4>Selected Choice ({selectedCourses.length}/4):</h4>
                        <ul>
                            {selectedCourses.map((selected, index) => (
                                <li key={selected.id}>
                                    {index + 1}. {selected.name}
                                    <button onClick={() => removeCourse(selected.id)}>×</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                        </div>
                    </div>
                </div>

                <div className="detail-body">
                    <p className="description">{course.description}</p>
                    <table>
                        <thead>
                            <tr>
                                <th class="topic-number">S.N.</th>
                                <th>Topics</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="topic-number">1</td>
                                <td>
                                    <strong>Introduction to Culinary Arts</strong>
                                    <ul>
                                        <li>Overview of the culinary industry and career paths</li>
                                        <li>Kitchen safety and sanitation</li>
                                        <li>Basic knife skills: mincing, dicing, julienne, zips, and basic cuts</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">2</td>
                                <td>
                                    <strong>Cooking Method: Dry Heat</strong>
                                    <ul>
                                        <li>Sautéing, pan-frying and stir-frying</li>
                                        <li>Grilling and broiling</li>
                                        <li>Roasting and baking</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">3</td>
                                <td>
                                    <strong>Cooking Method: Moist Heat</strong>
                                    <ul>
                                        <li>Boiling, simmering, and poaching</li>
                                        <li>Steaming and blanching</li>
                                        <li>Braising and stewing</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">4</td>
                                <td>
                                    <strong>Stocks, Sauces, and Soups</strong>
                                    <ul>
                                        <li>Principles of stock making</li>
                                        <li>Mother sauces and their derivatives</li>
                                        <li>Basic soup techniques and recipes</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">5</td>
                                <td>
                                    <strong>Culinary Techniques: Mise en Place and Flavor Development</strong>
                                    <ul>
                                        <li>Importance of preparation, organization and preparation</li>
                                        <li>Building flavor profiles: seasoning, layering flavors, and balancing taste</li>
                                        <li>Deglazing, emulsifying, and other culinary techniques</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">6</td>
                                <td>
                                    <strong>Culinary Staples: Grains, Legumes, and Pasta</strong>
                                    <ul>
                                        <li>Cooking techniques for grains (rice, quinoa, couscous)</li>
                                        <li>Preparation and cooking methods for legumes (beans, lentils)</li>
                                        <li>Selecting, preparing and cooking dried pasta</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">7</td>
                                <td>
                                    <strong>Vegetable Cookery</strong>
                                    <ul>
                                        <li>Selection, storage, and preparation of vegetables</li>
                                        <li>Smoking, steaming, roasting, and grilling vegetables</li>
                                        <li>Creative vegetable dishes and garnishes</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="topic-number">8</td>
                                <td>
                                    <strong>Protein Cookery: Meat, Poultry, and Seafood</strong>
                                    <ul>
                                        <li>Selecting and handling meat, poultry, and seafood</li>
                                        <li>Cooking methods for various cuts and types of protein</li>
                                        <li>Temperature control and food safety considerations</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="assessment">
                        <h2>Assessment:</h2>
                        <ul>
                            <li>Assessment by Mentor: 20 Marks</li>
                            <li>Attendance: 10 Marks</li>
                            <li>Active Participation in activities/Conversation: 25 Marks</li>
                            <li>Weekly reflections on concept papers and practical experiences uploaded on the blog/portal created for the course: 45 Marks</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details

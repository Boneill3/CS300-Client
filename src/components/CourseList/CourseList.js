import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

const CourseList = ({ location }) => {
    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name);

        async function getCourses() {
            const response = await fetch('http://' + ENDPOINT + '/course');
            const resCourses = await response.json();
            setCourses(resCourses);
        }

        getCourses();


    }, [ENDPOINT, location.search]);

    return (
        <div>
            <div>
                <h2>Summer 2020 Online Class List</h2>
                {courses.map((course, i) => 
                    <div key={i}>
                        <Link to={`/chat?name=${name}&room=${course._id}`}>{course.Name}</Link>
                        <Link to={`/course/${course._id}/edit?name=${name}`}>Edit</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseList
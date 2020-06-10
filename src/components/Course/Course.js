import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link, useParams, useHistory } from 'react-router-dom';

const Course = ({ location }) => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [currentStudents, setCurrentStudents] = useState([]);
    const [addedStudents, setAddedStudents] = useState([]);
    const [removedStudents, setRemovedStudents] = useState([]);
    const [otherStudents, setOtherStudents] = useState([]);
    const ENDPOINT = 'localhost:5000';
    const history = useHistory();
    let { id } = useParams();
    const selectedAdd = -1;
    const selectedRemove = -1;

    useEffect(() => {
        const { name } = queryString.parse(location.search);
        setName(name);

        async function getData() {
            const response = await fetch('http://' + ENDPOINT + '/course/' + id);
            const course = await response.json();
            setCourse(course);
            console.log("COURSE", course);

            const students = await (await fetch('http://' + ENDPOINT + '/student')).json();
            const currentStudents = [];
            const otherStudents = [];
            students.forEach((student) => {
                if (student.courses.includes(course._id))
                    currentStudents.push(student);
                else
                    otherStudents.push(student);
            });

            setCurrentStudents(currentStudents);
            setOtherStudents(otherStudents);

            setStudents(students);
        }

        getData();


    }, [ENDPOINT, location.search, id]);

    function addStudent(event) {
        let index = event.target.value;
        if (index === -1)
            return;

        let removedIndex = removedStudents.indexOf(otherStudents[index]);
        let addedIndex = addedStudents.indexOf(otherStudents[index]);
        if(removedIndex !== -1)
            removedStudents.splice(removedIndex, 1);
        else if(addedIndex === -1)
            setAddedStudents(...addedStudents, otherStudents[index]);

        setCurrentStudents([...currentStudents, otherStudents[index]]);
        course.Students.push(otherStudents[index]._id);
        course.students.push(otherStudents[index]);
        otherStudents.splice(index, 1);
    }

    function removeStudent(event) {
        let index = event.target.value;
        if (index === -1)
            return;

        let removedIndex = removedStudents.indexOf(currentStudents[index]);
        let addedIndex = addedStudents.indexOf(currentStudents[index]);
        if(addedIndex !== -1)
            addedStudents.splice(addedIndex, 1);
        else if(removedIndex === -1)
            setRemovedStudents(...removedStudents, currentStudents[index]);

        setOtherStudents([...otherStudents, currentStudents[index]]);
        course.Students.splice(course.Students.indexOf(currentStudents[index]._id), 1);
        course.students.splice(course.students.indexOf(currentStudents[index]), 1);
        currentStudents.splice(index, 1);
    }

    async function saveCourse(event) {
        delete course.students;
        const response = await fetch('http://' + ENDPOINT + '/course/' + id, { method: "put", headers: { "Content-type": "application/json" }, body: JSON.stringify(course) });
    }

    return (
        <div>
            <div>
                <h2>{course._id}</h2>
                <form>
                    <label>Name:
                    <input
                            type="text"
                            placeholder="Software Engineering"
                            value={course.Name || ''}
                            onChange={(event) => setCourse({ ...course, Name: event.target.value })}
                        />
                    </label>

                    <div>Students:</div>
                    <div>
                        {course.students ? course.students.map((student, i) =>
                            <div key={i}>
                                <label>Name:
                                <div>{student.name}</div>
                                </label>
                            </div>
                        )
                            : null}
                    </div>
                    <div>
                        <b>Add Student:</b>
                        <select name="addStudent" onChange={addStudent} value={selectedAdd}>
                            <option key="-1" value="-1"></option>
                            {
                                otherStudents ? otherStudents.map((student, i) =>
                                    <option key={i} value={i}>{student.name}</option>
                                )
                                    : null
                            }
                        </select>
                    </div>
                    <div>
                        <b>Remove Student</b>
                        <select name="removeStudent" onChange={removeStudent} value={selectedRemove}>
                            <option key="-1" value="-1"></option>
                            {
                                currentStudents ? currentStudents.map((student, i) =>
                                    <option key={i} value={i}>{student.name}</option>
                                )
                                    : null
                            }
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <button type="button" onClick={saveCourse}>Save</button>
                        <Link to="/courseList">Back</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Course
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import CourseList from './components/CourseList/CourseList';
import Course from './components/Course/Course';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/courseList" exact component={CourseList} />
        <Route path="/course/:id/edit" exact component={Course} />
    </Router>
);

export default App;
import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import CourseList from './components/CourseList/CourseList';

const App = () => (
    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/courseList" exact component={CourseList} />
    </Router>
);

export default App;
/**
 * Created by kirannme
 * Kiran Pariyar krianpariyar@lftechnology.com>
 * on 5/5/16.
 */

// ...
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import HomePage from './components/HomePage';
import StudentPageManager from './components/student/StudentFormManager';
import StudentList from './components/student/StudentList';

render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage}/>
        <Route path="/addStudent" component={StudentPageManager}/>
        <Route path="/editStudent/:schoolId&&:studentId" component={StudentPageManager}/>
    </Router>
), document.getElementById('app'));
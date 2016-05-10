/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/8/16.
 */

//React and React DOM
import ReactDOM from 'react-dom';
import React from 'react';
import Header from './common/Header';
import StudentPage from './student/StudentPage';

class HomePage extends React.Component{
    render() {
        return (
            <div>
                <Header />
                <StudentPage />
                <a href="/#addStudent" className="btn btn-primary">add student</a>
            </div>
        );
    }
}

export default HomePage;
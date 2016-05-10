/**
 * Created by kirannme
 * Kiran Pariyar krianpariyar@lftechnology.com>
 * on 5/5/16.
 */

"use strict";

var React = require('react');

class Header extends React.Component{
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <h1>Student Management System</h1>
                </div>
            </nav>
        )
    }
}

export default Header;
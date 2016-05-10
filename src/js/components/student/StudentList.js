/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/6/16.
 */

import React from 'react';
import Request from 'superagent';

class StudentList extends React.Component {

    constructor() {
        super();
    }

    createStudentRow(student) {
        return (
            <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                    <a href={"/#editStudent/" + this.props.schoolId + '&&' + student.id} className="btn btn-default">Edit</a>
                    <button className="btn btn-default" onClick={this.props.onDelete.bind(null,student.id)}>Delete
                    </button>
                </td>
            </tr>
        )
    }

    render() {

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                        {this.props.students.map((student)=>this.createStudentRow(student))}
                    </tbody>
                </table>
            </div>
        );
    }
}

StudentList.propTypes = {
    students : React.PropTypes.array.isRequired,
    onDelete : React.PropTypes.func
};

export default StudentList;


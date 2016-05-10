/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/6/16.
 */

import React from 'react';
import Request from 'superagent';
import StudentList from './StudentList';

class StudentPage extends React.Component{

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.state = {
            schoolId : 1,
            students : []
        };
    }

    setSelectValue(event) {
        let schoolId =  event.target.value;
        this.setState({ schoolId : schoolId});
        this.getStudents(schoolId);
    }

    getStudents(id) {
        Request
            .get('http://localhost:3005/schools/' + id)
            .end((err, res)=>{
                if(err || !res){
                    alert(' Error ');
                } else{
                    let students = res.body.students;
                    this.setState({ students : students});
                }
            });
    }

    componentWillMount() {
        this.getStudents(this.state.schoolId);
    }

    deleteStudent(studentTd) {
        event.preventDefault();
        if (confirm()) {
            let schoolId = this.state.schoolId;
            let schoolName = 'school' + schoolId;
            this.state.students.forEach((value, index)=> {
                if (value.id == studentTd) {
                    console.log(this.state.students);
                    this.state.students.splice(index, 1);
                }
            });
            this.setState({students:this.state.students})
            let remainingStudents = {id: schoolId, name: schoolName, students: this.state.students};
            this.deleteStudentList(schoolId, remainingStudents);
        }
    }

    deleteStudentList(schoolId, data) {
        Request
            .put('http://localhost:3005/schools/' + schoolId)
            .send(data)
            .end()
    }

    render() {
        return (
            <div>
                <select onChange={(event)=>this.setSelectValue(event)}>
                    <option value="1">school1</option>
                    <option value="2">school2</option>
                    <option value="3">school3</option>
                </select>
                <StudentList schoolId={this.state.schoolId} students={this.state.students} onDelete={this.deleteStudent}/>
            </div>
        );
    }
}

export default StudentPage;


/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/8/16.
 */

//React and React DOM
import ReactDOM from 'react-dom';
import React from 'react';
import Request from 'superagent';
import Header from '../common/Header';
import StudentForm from './StudentForm';

class StudentPageManager extends React.Component{

    constructor(props) {
        super(props);
        this.saveStudent = this.saveStudent.bind(this);
        this.state = {
            schoolId : 1,
            student : { id : 0, name : ''},
            students : []
        };
    }

    setSchoolId(event) {
        let schoolId = event.target.value;
        this.setState({schoolId : schoolId});
        this.getStudents(schoolId);
    }

    setStudentState(event) {
        let field = event.target.name;
        this.state.student[field] = event.target.value;
        this.setState({student : this.state.student});
    }

    saveStudent() {
        let schoolId = this.props.params.schoolId;
        let studentId = this.props.params.studentId;

        if( schoolId != undefined && studentId != undefined){
            let schoolName = 'school' + schoolId;
            this.state.students.forEach((value, index)=> {
                if (value.id == studentId) {
                    this.state.students[index] = this.state.student;
                }
            });
            console.log(this.state.student);
            let newSchoolObject = { id: schoolId, name : schoolName, students : this.state.students };
            Request
                .put('http://localhost:3005/schools/' + schoolId)
                .send(newSchoolObject)
                .end()
        } else{
            schoolId = this.state.schoolId;
            let schoolName = 'school' + schoolId;
            let students =  this.state.students;
            let lastStudentId = students[students.length-1].id;
            this.state.student.id = lastStudentId + 1;
            students.push(this.state.student);
            let newSchoolObject = { id: schoolId, name : schoolName, students : students };
            Request
                .put('http://localhost:3005/schools/' + schoolId)
                .send(newSchoolObject)
                .end()
        }
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

    getStudentById(schoolId,studentId) {
        Request
            .get('http://localhost:3005/schools/' + schoolId)
            .end((err, res)=>{
                if(err || !res){
                    alert(' Error ');
                } else{
                    let students = res.body.students;
                    students.forEach((value) => {
                        if(value.id == studentId) {
                            this.setState({ student : value});
                        }
                    })
                }
            });
    }

    componentWillMount() {
        let schoolId = this.props.params.schoolId;
        let studentId = this.props.params.studentId;
        if( schoolId != undefined && studentId != undefined){
            this.getStudentById(schoolId,studentId);
        }
        this.getStudents(this.state.schoolId);
    }

    render() {
        return(
            <div>
                <Header />
                <StudentForm schoolId={this.state.schoolId}
                             student={this.state.student}
                             onChangeInputValue={(event)=>this.setStudentState(event)}
                             onChangeSelectValue={(event)=>this.setSchoolId(event)}
                             onSave={this.saveStudent}/>
            </div>
        );
    }
}

export default StudentPageManager;
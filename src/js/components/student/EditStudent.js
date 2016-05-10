/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/10/16.
 */

//React and React DOM
import ReactDOM from 'react-dom';
import React from 'react';
import Request from 'superagent';
import Header from '../common/Header';
import StudentForm from './StudentForm';

class EditStudent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            schoolId : 1,
            student : { id : 0, name : ''},
            students : []
        }
    }

    componentWillMount() {
        this.getStudent(this.props.params.schoolId, this.props.params.studentId);
    }

    getStudent(schoolId,studentId) {
        Request
            .get('http://localhost:3005/schools/' + schoolId)
            .end((err, res)=>{
                if(err || !res){
                    alert(' Error ');
                } else{
                    let students = res.body.students;
                    students.forEach((value,index) => {
                        if(value.id == studentId) {
                            this.setState({ student : value});
                        }
                    })
                    console.log(this.state.student);
                    console.log(this.state.schoolId);
                }
            });
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

export default EditStudent;
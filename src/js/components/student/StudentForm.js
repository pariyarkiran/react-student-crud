/**
 * Created by kiran
 * Kiran Pariyar <kiranpariyar@lftechnology.com>
 * on 5/8/16.
 */

import React from 'react';

class StudentForm extends React.Component{

    render() {
        return (
            <div>
                <label>Select School</label>
                <select onChange={this.props.onChangeSelectValue}>
                    <option value="1">school1</option>
                    <option value="2">school2</option>
                    <option value="3">school3</option>
                </select>

                <form>
                    <div className="form-group">
                        <label>Student Name</label>
                        <input type="text" name="name" className="form-control" value={this.props.student.name} onChange={this.props.onChangeInputValue} />
                    </div>
                    <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
                </form>
            </div>
        );
    }
}

StudentForm.propTypes = {
    student : React.PropTypes.object.isRequired,
    onSave : React.PropTypes.func,
    onChangeInputValue : React.PropTypes.func,
    onChangeSelectValue : React.PropTypes.func
};

export default StudentForm;
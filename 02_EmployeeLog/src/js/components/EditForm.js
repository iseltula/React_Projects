var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var EditForm = React.createClass({
	render: function(){
		return(
      <div>
        <h3>Edit Employee</h3>
        <form className="form-horizontal" name="LogForm">
          <div className= "form-group">
            <label className="control-label col-md-4">Employee Number</label>
            <div className="col-md-5">
              <input type="text" ref="empNumber" className ="form-control" onChange = {this.handleChange.bind(this, 'empNumber')} value={this.props.membersToEdit.empNumber}/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">First Name</label>
            <div className="col-md-5">
              <input type="text" ref="firstName" className = "form-control" onChange = {this.handleChange.bind(this, 'firstName')} value={this.props.membersToEdit.firstName}/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">Last Name</label>
            <div className="col-md-5">
              <input type="text" ref="lastName" className = "form-control" onChange = {this.handleChange.bind(this, 'lastName')} value={this.props.membersToEdit.lastName}/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4 ">Middle Name</label>
            <div className="col-md-5">
              <input type="text" ref="middleName" className = "form-control" onChange = {this.handleChange.bind(this, 'middleName')} value={this.props.membersToEdit.middleName}/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">Age</label>
            <div className="col-md-5">
              <input type="text" ref="age" className ="form-control" onChange = {this.handleChange.bind(this, 'age')} value={this.props.membersToEdit.age}/>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-md-4">Designation</label>
              <div className="col-md-5">
                <select className="form-control" ref="designation" onChange = {this.handleChange.bind(this, 'designation')} value={this.props.membersToEdit.designation}>
                  <option>Senior Manager</option>
                  <option>Manager</option>
                  <option>Assistant Manager</option>
                  <option>Lead</option>
                  <option>Senior Consultant</option>
                  <option>Consultant</option>
                </select>
              </div>
         </div>

          <div className= "form-group">
            <label className="control-label col-md-4">Salary</label>
            <div className="col-md-5">
              <input type="text" ref="salary" className = "form-control" onChange = {this.handleChange.bind(this, 'salary')} value={this.props.membersToEdit.salary}/>
            </div>
          </div>
            <a className= "btn btn-success btn-md" onClick={this.handleSubmit}> Update</a>
						<a className="btn btn-md danger" onClick={this.handleRemove} >Remove</a>
        </form>
      </div>
		);
	},
	handleRemove: function(){
			AppActions.removeMember(this.props.membersToEdit.id);
	},
	handleChange: function(fieldName, event){
    var newState = event.target.value;
    var selected = this.state.selected;
    selected.name = newState;
    this.setState({selected: selected});
  },
  handleSubmit:function(e){
    e.preventDefault();
    var member = {
			id: this.props.membersToEdit.id,
      empNumber: this.refs.empNumber.value.trim(),
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim(),
      middleName: this.refs.middleName.value.trim(),
      age: this.refs.age.value.trim(),
      designation: this.refs.designation.value.trim(),
      salary: this.refs.salary.value.trim()
    }
    AppActions.updateMember(member);
		
  }
});

module.exports = EditForm;

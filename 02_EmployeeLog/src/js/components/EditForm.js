var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var message ="";

var EditForm = React.createClass({
	render: function(){
		return(
      <div>
        <h3>Edit Employee</h3>
					<p className="alert alert-danger" role="alert">
					{this.props.message}
					</p>
        <form className="form-horizontal" name="LogForm">
          <div className= "form-group">
            <label className="control-label col-md-4">Employee Number</label>
            <div className="col-md-5">
              <input type="number" ref="empNumber" className ="form-control" onChange = {this.handleChange.bind(this, 'empNumber')} value={this.props.membersToEdit.empNumber}/>
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
              <input type="number" ref="age" className ="form-control" onChange = {this.handleChange.bind(this, 'age')} value={this.props.membersToEdit.age}/>
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
              <input type="number" ref="salary" className = "form-control" onChange = {this.handleChange.bind(this, 'salary')} value={this.props.membersToEdit.salary}/>
            </div>
          </div>
            <a className= "btn btn-success btn-md" onClick={this.handleSubmit}> Update  <i className="fa fa-pencil"></i></a>
						<a className="btn btn-md btn-danger" onClick={this.handleRemove} >Remove <i className="fa fa-trash"></i></a>
						<a className="btn btn-md btn-primary" onClick={this.handleCancel} >Cancel <i className="fa fa-times"></i></a>
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
    this.validationForm(member);
  },
	handleCancel: function(){
		message= "";
		AppActions.cancelEdit(message);
	},
	validationForm : function(member){
		var letters = /^[A-Za-z]+$/;
		var verify = "";
		if(member.empNumber!=="" && member.firstName!=="" && member.lastName!=="" && member.age!=="" && member.salary!==""){
			if(member.age >"0"){
				if(member.middleName.match(letters) && member.firstName.match(letters) && member.lastName.match(letters)){
							if (member.designation == "Senior Manager") {
								if( member.salary < "100000" || member.salary > "130000"){
									message="Senior Manager Salary must be between $100,000 and $130,000";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							} else if (member.designation == "Manager") {
								if(member.salary < "90000" || member.salary > "99999"){
									message="Manager Salary must be between $90,000 and $99,999";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							} else if (member.designation == "Assistant Manager") {
								if(member.salary < "80000" || member.salary > "89999"){
									message="Assistant Manager Salary must be between $80,000 and $89,999";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							} else if (member.designation == "Lead") {
								if(member.salary < "60000" || member.salary > "79999"){
									message="Lead  Salary must be between $60,000 and $79,999";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							} else if (member.designation == "Senior Consultant") {
								if(member.salary < "50000" || member.salary > "59000"){
									message="Senior Consultant Salary must be between $50,000 and $59,999";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							} else if (member.designation == "Consultant") {
								if(member.salary < "40000" || member.salary > "49000"){
									message="Consultant Salary must be between $40,000 and $49,999";
									verify = "nonPass";
								}else{
									verify = "pass";
								}
							}

							if(verify == "pass"){
								message="Employee Updated";
								AppActions.updateMember(member, message);
								this.refs.empNumber.value="";
								this.refs.firstName.value="";
								this.refs.lastName.value="";
								this.refs.middleName.value="";
								this.refs.age.value="";
								this.refs.salary.value="";
							}
							else if(verify == "nonPass"){
									 AppActions.cancelEdit(message);
									}
							}

				else{
					message = "There is a number in a text field";
					AppActions.cancelEdit(message);
				}
			}
			else{
				message="Your age and salary are wrong";
				AppActions.cancelEdit(message);
			}
		}
		else{
			message= "You are missing some fields";
			AppActions.cancelEdit(message);

		}
	}
});

module.exports = EditForm;

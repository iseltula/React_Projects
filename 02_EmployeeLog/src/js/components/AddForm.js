var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var message="";

var AddForm = React.createClass({
	render: function(){
		return(
      <div>
        <h3>Add Employee</h3>
					<p className="alert alert-success" role="alert">
					{message}
				</p>
        <form className="form-horizontal" name="LogForm">
          <div className= "form-group">
            <label className="control-label col-md-4">Employee Number</label>
            <div className="col-md-5">
              <input type="number" ref="empNumber" className ="form-control"/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">First Name</label>
            <div className="col-md-5">
              <input type="text" ref="firstName" className = "form-control"/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">Last Name</label>
            <div className="col-md-5">
              <input type="text" ref="lastName" className = "form-control"/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4 ">Middle Name</label>
            <div className="col-md-5">
              <input type="text" ref="middleName" className = "form-control"/>
            </div>
          </div>

          <div className= "form-group ">
            <label className="control-label col-md-4">Age</label>
            <div className="col-md-5">
              <input type="number" ref="age" className ="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label className="control-label col-md-4">Designation</label>
              <div className="col-md-5">
                <select className="form-control" ref="designation">
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
              <input type="number" ref="salary" className = "form-control"/>
            </div>
          </div>
          <a className= "btn btn-success btn-md" onClick={this.handleSubmit}> Submit <i className="fa fa-plus" aria-hidden="true"></i></a>
        </form>
      </div>
		);
	},
  handleSubmit:function(e){
    e.preventDefault();
    var member = {
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
	validationForm : function(member){
		var letters = /^[A-Za-z]+$/;
		if(member.empNumber!=="" && member.firstName!=="" && member.lastName!=="" && member.age!=="" && member.salary!==""){
			if(member.age >"0"){
				if(member.middleName.match(letters) && member.firstName.match(letters) && member.lastName.match(letters)){
							if (member.designation == "Senior Manager" && member.salary < "100000" || member.salary > "130000") {
								AppActions.cancelEdit();
				 				message="Senior Manager Salary must be between $100,000 and $130,000";
							}
							if (member.designation == "Manager" && member.salary < "90000" || member.salary > "99999") {
								AppActions.cancelEdit();
								message="Manager Salary must be between $90,000 and $99,999";
							}
							if (member.designation == "Assistant Manager" && member.salary < "80000" || member.salary > '89999') {
								AppActions.cancelEdit();
								message="Assistant Manager Salary must be between $80,000 and $89,999";
							}
							if (member.designation == "Lead" && (member.salary < "60000" || member.salary > "79999")) {
								AppActions.cancelEdit();
								message="Lead  Salary must be between $60,000 and $79,999";
							}
							if (member.designation == "Senior Consultant" && (member.salary < "50000" || member.salary > "59000")) {
								AppActions.cancelEdit();
								message="Senior Consultant Salary must be between $50,000 and $59,999";
							}
							if (member.designation == "Consultant" && (member.salary < "40000" && member.salary > "49000")) {
								AppActions.cancelEdit();
								message="Consultant Salary must be between $40,000 and $49,999";
							}  else {
								message = "New Employee Added";
								AppActions.saveMember(member);

								  		}
									}
				else{
					AppActions.cancelEdit();
					message = "There is a number in a text field";
				}
			}
			else{
				AppActions.cancelEdit();
				message="Your age and salary are wrong";
			}
		}
		else{
			AppActions.cancelEdit();
			message= "You are missing some fields";

		}
	}
});

module.exports = AddForm;

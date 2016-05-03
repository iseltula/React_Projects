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
          <a className= "btn btn-success btn-md" onClick={this.handleSubmit}> Submit</a>
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
		if(member.empNumber==""){
			message="Great";
		}
		else{
			AppActions.saveMember(member);
		}
	}
});

module.exports = AddForm;

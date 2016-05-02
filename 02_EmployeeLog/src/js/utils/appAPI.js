var Firebase = require('firebase');
var AppActions = require('../actions/AppActions');

module.exports = {
	saveEmployee: function(employee){
		this.firebaseRef = new Firebase('https://employeelistfire.firebaseio.com/employee');
		this.firebaseRef.push({
			employee: employee
		});
	},
	getEmployees: function(){
		this.firebaseRef = new Firebase('https://employeelistfire.firebaseio.com/employee');
		this.firebaseRef.once("value", function(snapshot){
			var employees =[];
			snapshot.forEach(function(childSnapshot){
				var employee = {
					id: childSnapshot.key(),
					empNumber: childSnapshot.val().employee.empNumber,
					firstName: childSnapshot.val().employee.firstName,
					lastName: childSnapshot.val().employee.lastName,
					middleName: childSnapshot.val().employee.middleName,
					age: childSnapshot.val().employee.age,
					designation: childSnapshot.val().employee.designation,
					salary: childSnapshot.val().employee.salary
				}
				employees.push(employee);
				AppActions.receiveEmployee(employee);
			});
		});
	}
}

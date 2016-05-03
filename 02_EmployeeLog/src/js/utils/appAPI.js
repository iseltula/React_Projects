var Firebase = require('firebase');
var AppActions = require('../actions/AppActions');

module.exports = {
	saveMember: function(member){
		this.firebaseRef = new Firebase('https://member-log.firebaseio.com/members');
		this.firebaseRef.push({
			member: member
		});
	},
	getMembers: function(){
		this.firebaseRef = new Firebase('https://member-log.firebaseio.com/members');
		this.firebaseRef.once("value", function(snapshot){
			var members =[];
			snapshot.forEach(function(childSnapshot){
				var member = {
					id: childSnapshot.key(),
					empNumber: childSnapshot.val().member.empNumber,
					firstName: childSnapshot.val().member.firstName,
					lastName: childSnapshot.val().member.lastName,
					middleName: childSnapshot.val().member.middleName,
					age: childSnapshot.val().member.age,
					salary: childSnapshot.val().member.salary,
					designation: childSnapshot.val().member.designation
				}
				members.push(member);
				AppActions.receiveMembers(members);
			});
		});
	},
	removeMember: function(memberId){
		console.log(memberId);
		this.firebaseRef = new Firebase('https://member-log.firebaseio.com/members/'+ memberId);
		this.firebaseRef.remove();
	},
	updateMember: function(member){
		var id = member.id;
		var updatedMember = {
			empNumber: member.empNumber,
			firstName: member.firstName,
			lastName: member.lastName,
			middleName: member.middleName,
			age: member.age,
			salary: member.salary,
			designation: member.designation
		}
		this.firebaseRef = new Firebase('https://member-log.firebaseio.com/members/'+ member.id +'/member');
		this.firebaseRef.update(updatedMember);
	}
}

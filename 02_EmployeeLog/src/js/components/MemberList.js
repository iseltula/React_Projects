var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Member = require('./Member.js');


var MemberList = React.createClass({
	render: function(){
		return(
			<div className="container">
				<h3>Employee Log</h3>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Employee Number</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Middle Name</th>
							<th> Age</th>
							<th>Designation</th>
							<th>Salary</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.members.map(function(member, index){
								return(
									<Member member = {member} key={index} />
								)
							})
						}
					</tbody>
				</table>				
	</div>
);
}
});

module.exports = MemberList;

var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');



var Member = React.createClass({
	render: function(){
		return(
      <tr onClick={this.handleEdit.bind(this, this.props.member)}>
          <td>{this.props.member.empNumber}</td>
          <td>{this.props.member.firstName}</td>
          <td>{this.props.member.lastName}</td>
          <td>{this.props.member.middleName}</td>
          <td>{this.props.member.age}</td>
          <td>{this.props.member.designation}</td>
          <td>{this.props.member.salary}</td>					
      </tr>
		);
	},
	handleEdit: function(i,j){
		AppActions.editMember(i);
	}
});

module.exports = Member;

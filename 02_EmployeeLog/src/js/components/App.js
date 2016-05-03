var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');
var MemberList= require('./MemberList.js');
var EditForm = require('./EditForm.js');

function getAppState(){
	return {
			members: AppStore.getMembers(),
			membersToEdit: AppStore.getMemberToEdit()
	}
}

var App = React.createClass({
	getInitialState: function(){
		return getAppState();
	},

	componentDidMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	componentUnmount: function(){
		AppStore.removeChangeListener(this._onChange);
	},

	render: function(){
		if(this.state.membersToEdit == ''){
			var form = <AddForm/>
		}
		else{
			var form = <EditForm membersToEdit= {this.state.membersToEdit}/>
		}
		return(
			<div>
				<section id="employeeLog" className="container">
						<MemberList members= {this.state.members} />
				</section>
				<section id="AddSection">
					{form}
				</section>

			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;

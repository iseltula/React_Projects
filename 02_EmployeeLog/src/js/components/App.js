var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');

function getAppState(){
	return {
			members: AppStore.getMembers()
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
		console.log(this.state.members);
		return(
			<div>
				<AddForm/>
			</div>
		);
	},

	// Update view state when change is received
	_onChange: function(){
		this.setState(getAppState());
	}
});

module.exports = App;

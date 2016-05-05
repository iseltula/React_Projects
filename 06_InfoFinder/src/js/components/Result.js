var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var Result = React.createClass({
	render: function(){

		return(
			<div>
        <p className="content lead" dangerouslySetInnerHTML={{__html:this.props.result.Result }}></p>
			</div>
		);
	},
});

module.exports = Result;

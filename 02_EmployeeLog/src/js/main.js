var App = require('./components/App');
var React = require('react');
var ReactDOM = require('react-dom');
var AppAPI = require('./utils/appAPI.js');

AppAPI.getMembers();

ReactDOM.render(
	<App />,
	document.getElementById('app')
);

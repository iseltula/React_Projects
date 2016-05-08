var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AddForm = require('./AddForm.js');
var MemberList= require('./MemberList.js');
var EditForm = require('./EditForm.js');
colorValidate = {};

function getAppState(){
	return {
			members: AppStore.getMembers(),
			membersToEdit: AppStore.getMemberToEdit(),
			message: AppStore.getMessage(),
			showAddForm: false,
			showEditForm: false,
			showAddButton: true,
			showEditButton: true
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
		if(this.state.membersToEdit == '' && this.state.showAddForm==true){
			var form = <AddForm message={this.state.message} />
		}
		else if(this.state.membersToEdit != '') {
			this.state.showAddButton=false;
			if(this.state.showEditForm==true){
			var form = <EditForm membersToEdit= {this.state.membersToEdit} message={this.state.message}/>
			}
		}
		if(this.state.message=="New Employee Saved" || this.state.message=="Employee Updated"){
			colorValidate= {
				color:'#01CF24'
			};
		}
		else{
			colorValidate= {
				color:'#AB0303'
			};
		}
		if(this.state.showAddButton==true){
			var AddButton= <a className="btn btn-md btn-default" onClick={this.changeAddShow}>Add <i class="fa fa-plus" aria-hidden="true"></i></a>
		}
		if(this.state.showEditButton==true){
			var EditButton= <a className="btn btn-md btn-default" onClick={this.changeEditShow}>Edit <i class="fa fa-pencil" aria-hidden="true"></i></a>

		}

		return(
			<div>
				<div>
					<section id="employeeLog">
							<MemberList members= {this.state.members} />
					</section>
				</div>
				<div id="selectionButton">
					{AddButton}
					{EditButton}
					</div>
				<div>
					<section id="AddSection">
						<p className="alert" role="alert" style={colorValidate}>
							{this.state.message}
						</p>
						{form}
					</section>
				</div>
			</div>

		);
	},
	_onChange: function(){
		this.setState(getAppState());
	},
	changeAddShow: function(){
		this.setState({showAddForm: true, showEditForm: false, showEditButton:false});

	},
	changeEditShow: function(){
		this.setState({showEditForm: true});
		if(this.state.membersToEdit != ''){
			this.setState({showAddButton:false});
		}
	}
});

module.exports = App;

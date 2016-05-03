var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	saveMember: function(member){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SAVE_MEMBER,
			member:member
		});
	},
	receiveMembers: function(members){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_MEMBERS,
			members:members
		});
	}
}

module.exports = AppActions;

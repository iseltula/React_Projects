var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	saveMember: function(member, message){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.SAVE_MEMBER,
			member:member,
			message: message
		});
	},
	receiveMembers: function(members){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_MEMBERS,
			members:members
		});
	},
	removeMember:function(memberId){
			AppDispatcher.handleViewAction({
				actionType: AppConstants.REMOVE_MEMBER,
				memberId: memberId
			});
		},
	editMember:function(member){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.EDIT_MEMBER,
			member: member
		});
	},
	updateMember:function(member, message){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.UPDATE_MEMBER,
			member: member,
			message: message
		});
	},
	cancelEdit:function(message){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.CANCEL_EDIT,
			message: message
		});
	}
}

module.exports = AppActions;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _members = [];
var _member_to_edit = '';
var _message ='';

var AppStore = assign({}, EventEmitter.prototype, {
	saveMember: function(member, message){
		_members.push(member);
		_message= message;
	},
	getMembers: function(){
		return _members;
	},
	setMembers: function(members){
		_members = members
	},
	removeMember: function(memberId){
		var index = _members.findIndex(x=> x.id === memberId);
		_members.splice(index, 1);
		_member_to_edit='';
	},
	setMemberToEdit: function(member){
		_member_to_edit = member;
		_message ='';
	},
	getMemberToEdit: function(){
		return _member_to_edit;

	},
	updateMember : function(member, message){
		for(i=0; i <_members.length; i++){
			if(_members[i].id == member.id){
				_members.splice(i,1);
				_members.push(member);
			}
		}
		_member_to_edit='';
		_message =message;
	},
	cancelEdit : function(message){
		_member_to_edit='';
		_message= message;
	},
	getMessage : function(){
		return _message;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change', callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change', callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
			case AppConstants.SAVE_MEMBER:
				console.log("Saving Member");

				//Store save
				AppStore.saveMember(action.member, action.message);

				//Save API
				AppAPI.saveMember(action.member);

				//Emit change
				AppStore.emitChange();
				break;
		case AppConstants.RECEIVE_MEMBERS:
			console.log("Receiving Member");

			//Store save
			AppStore.setMembers(action.members);

			//Emit change
			AppStore.emitChange();
			break;
		case AppConstants.REMOVE_MEMBER:
			console.log('Removing Member...');

			//Store Remove
			AppStore.removeMember(action.memberId);

			//API Remove
			AppAPI.removeMember(action.memberId);

			//Emit change
			AppStore.emitChange();
			break;

	case AppConstants.EDIT_MEMBER:
			//Store Remove
			AppStore.setMemberToEdit(action.member);

			//Emit change
			AppStore.emitChange();
			break;
	case AppConstants.UPDATE_MEMBER:
			console.log('Updating Member...');

			//Store Update
			AppStore.updateMember(action.member, action.message);

			//API Update
			AppAPI.updateMember(action.member);

			//Emit change
			AppStore.emitChange();
			break;
	case AppConstants.CANCEL_EDIT:
			console.log('Cancel Action...' + action.message);

			//Cancel Action
			AppStore.cancelEdit(action.message);

			//Emit change
			AppStore.emitChange();
			break;
	}

	return true;
});

module.exports = AppStore;

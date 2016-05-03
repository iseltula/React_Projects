var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _members = [];

var AppStore = assign({}, EventEmitter.prototype, {
	saveMember: function(member){
		_members.push(member);
	},
	getMembers: function(){
	return _members;
	},	
	setMembers: function(members){
		_members = members
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
				AppStore.saveMember(action.member);

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
	}

	return true;
});

module.exports = AppStore;

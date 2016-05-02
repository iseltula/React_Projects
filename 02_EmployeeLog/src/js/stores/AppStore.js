var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _employees = [];

var AppStore = assign({}, EventEmitter.prototype, {
	saveEmployee: function(employee){
		_employees.push(employee);
	},
	getEmployee: function(employee){
	return _employees;
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
		case AppConstants.SAVE_EMPLOYEE:
			console.log('Saving Employee');

			//Store SAVE_EMPLOYEE
			AppStore.saveEmployee(action.employee);

			//Save AppAPI
			AppAPI.saveEmployee(action.employee);
			//Emit change
			AppStore.emitChange();
	}

	return true;
});

module.exports = AppStore;

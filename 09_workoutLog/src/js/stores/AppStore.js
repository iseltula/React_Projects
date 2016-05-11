var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _workouts = [];
var _showForm = false;

var AppStore = assign({}, EventEmitter.prototype, {
	showForm: function(){
		_showForm = true;
	},
	getShowForm: function(){
		return _showForm;
	},
	addWorkout: function(workout){
		_workouts.push(workout);
	},
	getWorkouts: function(){
		return _workouts;
	},
	receiveWorkouts: function(workouts){
		_workouts = workouts;
	},
	removeWorkout: function(workoutId){
		var index = _workouts.findIndex(x=>x.id ===workoutId);
		_workouts.splice(index, 1);
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
		case AppConstants.SHOW_FORM:
		console.log('Showing Form...');
		AppStore.showForm();
		//Emit change
		AppStore.emitChange();
		break;

		case AppConstants.ADD_WORKOUT:
		console.log('Adding ...');
		//Store
		AppStore.addWorkout(action.workout);

		//AppAPI
		AppAPI.addWorkout(action.workout);

		//Emit change
		AppStore.emitChange();
		break;

		case AppConstants.RECEIVE_WORKOUTS:
		console.log('Receiving ...');
		//Store
		AppStore.receiveWorkouts(action.workouts);

		//Emit change
		AppStore.emitChange();
		break;

		case AppConstants.REMOVE_WORKOUT:
		console.log('Removing ...');
		//Store
		AppStore.removeWorkout(action.workoutId);

		//AppAPI
		AppAPI.removeWorkout(action.workoutId);

		//Emit change
		AppStore.emitChange();
		break;


	}

	return true;
});

module.exports = AppStore;

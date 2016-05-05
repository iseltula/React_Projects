var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _results = [];
var _searchText='';

var AppStore = assign({}, EventEmitter.prototype, {
	setSearchText: function(search){
		_searchText= search.text;
	},
	getSearchText: function(){
		return _searchText;
	},
	setResults: function(results){
		_results= results;
	},
	getResults: function(){
		return _results;
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
		case AppConstants.SEARCH_TEXT:
		//API SEARCH
			AppAPI.searchText(action.search);

		//APP store search
			AppStore.setSearchText(action.search);

		//Change Emmit
			AppStore.emitChange();
			break;
		case AppConstants.RECEIVE_RESULTS:
		//APP store search
			AppStore.setResults(action.results);

		//Change Emmit
			AppStore.emitChange();
			break;
	}

	return true;
});

module.exports = AppStore;

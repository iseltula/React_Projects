var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
	searchText: function(search){
			AppDispatcher.handleViewAction({
				actionType: AppConstants.SEARCH_TEXT,
				search: search
			})
	},
	receiveResults: function(results){
		AppDispatcher.handleViewAction({
			actionType: AppConstants.RECEIVE_RESULTS,
			results: results
		})
	}
}

module.exports = AppActions;

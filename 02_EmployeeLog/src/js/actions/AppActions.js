var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    saveEmployee: function(employee){
      AppDispatcher.handleViewAction({
        actionType: AppConstants.SAVE_EMPLOYEE,
        employee:employee
      });
    }
}

module.exports = AppActions;

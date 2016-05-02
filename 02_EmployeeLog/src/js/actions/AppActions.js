var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    saveEmployee: function(employee){
      AppDispatcher.handleViewAction({
        actionType: AppConstants.SAVE_EMPLOYEE,
        employee:employee
      });
    },
    receiveEmployee: function(employees){
      AppDispatcher.handleViewAction({
        actionType: AppConstants.RECEIVE_EMPLOYEE,
        employees:employees
      });
    }
}

module.exports = AppActions;

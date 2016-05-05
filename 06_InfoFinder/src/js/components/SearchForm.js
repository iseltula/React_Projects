var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

var SearchForm = React.createClass({
render: function(){
		return(
			<div>
				<form onSubmit= {this.searchText} className="well">
          <div className="form-group">
            <label> Search Something...</label>
            <input type="text" className="form-control" ref="text"/>
          </div>
        </form>
			</div>
		);
	},
  searchText: function(e){
    e.preventDefault();
    var search = {
      text: this.refs.text.value.trim()
    }
    AppActions.searchText(search);
  }
});
module.exports = SearchForm;

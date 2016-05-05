var AppActions = require('../actions/AppActions');

module.exports = {
	searchText: function(search){
		console.log("API searching for " +search.text);
		var url = 'http://api.duckduckgo.com/?q='+search.text+'&format=json&pretty=1';
		$.ajax({
			url:url,
			dataType:'jsonp',
			cache: false,
			success: function(data){
				AppActions.receiveResults(data.RelatedTopics);
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}.bind(this)
		});
	}
}

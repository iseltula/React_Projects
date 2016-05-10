var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Video = require('./Video');

var VideoList = React.createClass({
	render: function(){
		return(
			<div className= "row">
        {
          this.props.videos.map(function(video, index){
            return(
              <Video video={video} key={index}/>
            )
          })
        }
			</div>
		);
	}
});

module.exports = VideoList;

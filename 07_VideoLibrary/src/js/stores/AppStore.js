var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppAPI = require('../utils/AppAPI.js');

var CHANGE_EVENT = 'change';

var _videos = [];

var AppStore = assign({}, EventEmitter.prototype, {
	saveVideo: function(video){
		_videos.push(video);
	},
	getVideos: function(){
		return _videos;
	},
	setVideos : function(videos){
		_videos = videos;
	},
	removeVideo : function(videoId){
		var index = _videos.findIndex(x => x.id ===videoId);
		_videos.splice(index, 1);
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
		case AppConstants.SAVE_VIDEO:
				console.log('Saving video');

				//Store Video
				AppStore.saveVideo(action.video);

				//API save
				AppAPI.saveVideo(action.video);

				//emitChange
				AppStore.emitChange();
				break;

				case AppConstants.RECEIVE_VIDEOS:
						console.log('Receiving video');

						//Set Video
						AppStore.setVideos(action.videos);

						//emitChange
						AppStore.emitChange();
						break;

						case AppConstants.REMOVE_VIDEO:
								console.log('Removing  video');

								//remove Video
								AppStore.removeVideo(action.videoId);

								//API remove
								AppAPI.removeVideo(action.videoId);

								//emitChange
								AppStore.emitChange();
								break;
	}

	return true;
});

module.exports = AppStore;

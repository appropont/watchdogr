'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	settingsActions = require('../actions/settings');

var settingsStore = Reflux.createStore({

	settings : {},

	init : function() {
		this.listenTo(settingsActions.updateSettings, this.output);
	},

	output : function(settings) {

		//add site to array
		this.settings = settings;

		//save settings to localForage

		//return the array
		return this.settings;
		
	}

})

module.exports = settingsStore;
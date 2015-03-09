'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	SettingsActions = require('../actions/settings'),
	localForage = require('localforage');

var SettingsStore = Reflux.createStore({

	settings : {},

	init : function() {
		this.listenTo(SettingsActions.updateSettings, this.updateSettings);
		this.listenTo(SettingsActions.loadSettings, this.loadSettings);		
	},

	updateSettings : function(settings) {

		//save settings to property
		this.settings = settings;

		//save settings to localForage
		localForage.setItem('settings', this.settings, function(value) {
			console.log('update settings value: ', value);
		});

		//return the array
		this.trigger(this.settings);
	},

	loadSettings : function() {
		var self = this;
		//load settings here in init instead of a custom loadSettings action
		localForage.getItem('settings', function(err, value) {
			if(err) {
				console.log('load settings err: ', err);
			} else {
				console.log('load settings value: ', value);
				if(value) {
					self.settings = value;
				}
			}
			self.trigger(self.settings);
		});
	}

})

module.exports = SettingsStore;
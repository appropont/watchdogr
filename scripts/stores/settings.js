'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	SettingsActions = require('../actions/settings'),
	localForage = require('localforage'),
	request = require('superagent');

var SettingsStore = Reflux.createStore({

	settings : {},

	init : function() {
		this.listenTo(SettingsActions.updateSettings, this.updateSettings);
		this.listenTo(SettingsActions.loadSettings, this.loadSettings);		
		this.listenTo(SettingsActions.sendEmailAlert, this.sendEmailAlert);
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
	},

	//This doesn't really seem to belong here 
		//but it makes sense for it to live in the same place that the settings are defined
	sendEmailAlert : function(site) {
		console.log('sendEmailAlert this.settings:', this.settings);

		if(!this.settings.key || this.settings.key === '' || !this.settings.email || this.settings.email === '') {
			console.log('no mailer settings. aborting sendEmailAlert');
			return;
		}

		var requestData = {
            "key": this.settings.key,
            "message": {
                "html": "<p>Site Down: "+ site.url +"</p>",
                "subject": "Alert: Site Down",
                "from_email": "no-reply@watchdogr.com",
                "from_name": "Watchdogr",
                "to": [
                    {
                        "email": this.settings.email,
                        "type": "to"
                    }
                ],
                "headers": {
                    "Reply-To": "no-reply@watchdogr.com"
                }
            }
        };

        request('POST','https://mandrillapp.com/api/1.0/messages/send.json')
        	.send(requestData)
        	.end(function(result) {
        		console.log('sendEmailAlert result: ', result);
        	});
	}

})

module.exports = SettingsStore;
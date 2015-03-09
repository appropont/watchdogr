'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	siteActions = require('../actions/sites'),
	localForage = require('localforage');

var siteStore = Reflux.createStore({

	//default value
	sites : [{url: 'https://api.github.com/', timer: "4"}],

	init : function() {
		this.listenTo(siteActions.addSite, this.addSite);
		this.listenTo(siteActions.removeSite, this.removeSite);
		this.listenTo(siteActions.loadSites, this.loadSites);
	},

	addSite : function(site) {
		console.log('adding site:', site);
		//add site to array
		this.sites.push(site);

		//save array to localForage
		localForage.setItem('sites', this.sites, function(value) {
			console.log('after Addsite local save: ', value);
		});

		//return the array
		this.trigger(this.sites);
		
	},

	removeSite : function(url) {
		console.log('store: removeSite fired');
		var siteIndex = -1;
		for(var i = 0; i < this.sites.length; i++) {
			if(this.sites[i].url === url) {
				siteIndex = i;
				break;
			}
		}

		if(siteIndex === -1) {
			console.log('removeSite: Error: no site found matching url');
		} else {
			var sites = this.sites;
			sites.splice(siteIndex, 1);
			this.sites = sites;
			localForage.setItem('sites', this.sites, function(value) {
				console.log('after removeSite local save: ', value);
			});
		}

		this.trigger(this.sites);
	},

	loadSites : function() {
		var self = this;
		localForage.getItem('sites', function(err, value) {

			if(err) {
				console.log('loadSites error after load: ', err);
			} else {
				console.log('loadSites after load: ', value);
				if(value) {
					self.sites = value;	
				}
			}
			self.trigger(self.sites);
		});
	}

})

module.exports = siteStore;
'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	siteActions = require('../actions/sites');

var siteStore = Reflux.createStore({

	//sites : [],
	sites : [{url: 'http://chrisgriffing.com', timer: "4"}],

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
		//do I even need to await response?

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
		}

		this.trigger(this.sites);
	},

	loadSites : function() {
		console.log('loading sites');
		this.trigger(this.sites);
	}

})

module.exports = siteStore;
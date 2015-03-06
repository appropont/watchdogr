'use strict';

var React = require('react'),
	Reflux = require('reflux'),
	siteActions = require('../actions/sites');

var siteStore = Reflux.createStore({

	//sites : [],
	sites : [{url: 'http://chrisgriffing.com', status: 'DOWN'}],

	init : function() {
		this.listenTo(siteActions.addSite, this.addSite);
		this.listenTo(siteActions.loadSites, this.loadSites);
	},

	addSite : function(site) {

		//add site to array
		this.sites.push(site);

		//save array to localForage
		//do I even need to await response?

		//return the array
		this.trigger(this.sites);
		
	},

	loadSites : function() {
		console.log('loading sites');
		this.trigger(this.sites);
	}

})

module.exports = siteStore;
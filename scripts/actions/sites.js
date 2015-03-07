'use strict';

var React = require('react'),
	Reflux = require('reflux');

var siteActions = Reflux.createActions([
	'addSite',
	'saveSites',
	'loadSites',
	'removeSite'
]);

module.exports = siteActions;
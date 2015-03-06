'use strict';

var React = require('react'),
	Reflux = require('reflux');

var siteActions = Reflux.createActions([
	'updateSettings',
	'saveSettings'
]);

module.exports = siteActions;
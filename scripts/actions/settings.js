'use strict';

var React = require('react'),
	Reflux = require('reflux');

var siteActions = Reflux.createActions([
	'updateSettings',
	'loadSettings',
	'sendEmailAlert'
]);

module.exports = siteActions;
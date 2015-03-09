'use strict';

var React = require('react'),
    Router = require('react-router'),
	Link = Router.Link,
    SettingsStore = require('../stores/settings'),
    SettingsActions = require('../actions/settings'),
    validator = require('validator'),


    Settings = React.createClass({

    	getInitialState : function() {
    		return {
                key: '',
                email: ''
            };
    	},

        componentDidMount: function() {
            this.unsubscribe = SettingsStore.listen(this.onSettingsChange);
            SettingsActions.loadSettings();
        },

        componentWillUnmount: function() {
            this.unsubscribe();
        },

        onSettingsChange: function(settings) {
            console.log('settings change: ', settings);
            this.setState(settings);
        },

    	saveSettings : function() {

            //validate fields
            var key = this.state.key;
            if(key && key !== '' && !validator.isAlphanumeric(key)) {
                console.log('key fails validation');
                alert('API Key fails validation');
                return;
            }

            var email = this.state.email;
            if(key && key !== '' && email && email !== '' && !validator.isEmail(email)) {
                console.log('email fails validation');
                alert('Email fails validation');
                return;
            }

            var settings = {
                key: this.state.key,
                email: this.state.email
            };

            SettingsActions.updateSettings(settings);

            //transition to SiteList
            Router.HashLocation.push('/');
    	},

    	handleChange : function(event) {
    		var changeObject = {};
            changeObject[event.target.id] = event.target.value;
            this.setState(changeObject, function() {
                console.log(this.state);
            });
    	},

        render: function() {

            return (
            	<div className="panel panel-default settings">
                    <div className="panel-heading list-group-item">
                        <div>
                            <h2><i className="fa fa-cogs"></i> Settings</h2>
                        </div>
                    </div>
                    <div className="panel-body">
                    	<legend><i className="fa fa-envelope"></i> Mailer Settings</legend>
                        <div className="form-group">
                            <label htmlFor="key">Mandrill API Key</label>
                            <input id="key" className="form-control" type="text" onChange={this.handleChange} value={this.state.key} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Recipient Email Address</label>
                            <input id="email" className="form-control" type="email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="form-group">
                            <a className="btn btn-success" role="button" onClick={this.saveSettings}>Save</a>
                            <Link to="app" className="btn btn-danger">Cancel</Link>
                        </div>
                    </div>
                </div>
            )
        }
    });

module.exports = Settings;

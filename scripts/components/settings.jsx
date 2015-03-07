'use strict';

var React = require('react'),
	Link = require('react-router').Link,

    Settings = React.createClass({

    	getInitialState : function() {
    		return {

    		}
    	},

    	saveSettings : function() {
    		console.log('saveSettings fired');
    	},

    	handleChange : function(event) {
    		//console.log('handling change');
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
                            <input id="key" className="form-control" type="text" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Recipient Email Address</label>
                            <input id="email" className="form-control" type="email" onChange={this.handleChange} />
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

'use strict';

var React = require('react'),
    SiteActions = require('../actions/sites'),
    Router = require('react-router'),
    Link = Router.Link,
    validator = require('validator'),

    AddSite = React.createClass({

        getInitialState : function() {
            return {
                url : '',
                timer : 4
            };
        },

        handleChange : function(event) {
            var changeObject = {};
            changeObject[event.target.id] = event.target.value;
            this.setState(changeObject, function() {
                console.log(this.state);
            });
        },

        addSite : function() {
            console.log('add site clicked');

            //Validate state
            var url = this.state.url;
            if(!validator.isURL(url)) {
                alert('Error: url fails validation');
                return;
            }
            if(url.indexOf("http://") === -1 || url.indexOf("https://") === -1) {
                url = 'http://' + url;
            }

            var timer = this.state.timer;
            if(!validator.isNumeric(timer)) {
                alert('Error: timer fails validation');
                return;
            }
            timer = parseInt(timer);
            if(timer < 1 || timer > 24) {
                alert('Error: timer is out of range (1-24)');
                return
            }

            //trigger action
            SiteActions.addSite({url, timer});

            //transition to SiteList
            Router.HashLocation.push('/');
        },

        render: function() {
            return (
            	<div className="panel panel-default add-site">
                    <div className="panel-heading list-group-item">
                        <div>
                            <h2><i className="fa fa-plus-circle"></i> Add Site</h2>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="url">Site URL</label>
                            <input id="url" className="form-control" type="text" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timer">Timer Length (hours)</label>
                            <input id="timer" className="form-control" type="number" onChange={this.handleChange} defaultValue={this.state.timer} />
                        </div>
                        <div className="form-group">
                            <a className="btn btn-success" role="button" onClick={this.addSite}>Add Site</a>
                            <Link to="app" className="btn btn-danger">Cancel</Link>
                        </div>
                    </div>
                </div>
            )
        }
    });

module.exports = AddSite;

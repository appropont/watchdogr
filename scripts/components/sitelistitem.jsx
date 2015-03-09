'use strict';

var React = require('react'),
    constants = { 
        status: require('../constants/status')
    },
    SiteActions = require('../actions/sites'),
    SettingsActions = require('../actions/settings'),
    Promise = require('bluebird'),
    request = require('superagent'),
    moment = require('moment'),


SiteListItem = React.createClass({

    getInitialState: function() {
        return {
            status: 'OK',
            lastChecked: 'N/A'
        }
    },

    componentDidMount : function() {
        //check the status of the site
        this.updateStatus();
    },

    updateStatus : function() {
        var self = this;
        self.setState({status: 'UPDATING'});
        request('GET', self.props.url)
            .end(function(result) {

                //initiate new timeout
                var timerMS = self.props.timer * 1000 * 60 * 60;
                setTimeout(self.updateStatus, timerMS);

                //validate status
                if(!result.status) {
                    console.log('Error: request did not return status');
                    return;
                }

                //change state
                var lastChecked = new Date().toISOString();
                console.log('lastChecked: ', lastChecked);
                var newState = {lastChecked: lastChecked};
                if(result.status === 200) {
                    newState.status = 'OK';
                } else if(result.status >= 400 && result.status <= 600) {
                    newState.status = 'DOWN';
                    self.sendEmailAlert();
                } else {
                    newState.status = 'ERROR';
                }
                self.setState(newState);
            });
    },

    sendEmailAlert : function() {
        SettingsActions.sendEmailAlert({
            url: this.props.url
        });
    },

    handleDelete : function() {
        console.log('handleDelete fired');
        SiteActions.removeSite(this.props.url);
    },

    render: function() {

        var favicon = 'http://google.com/s2/favicons?domain=' + this.props.url;

        var statusIconClasses = 'fa';

        switch(this.state.status) {

            case constants.status.UPDATING:
                statusIconClasses += ' text-primary fa-refresh site-updating-icon';
                break;
            case constants.status.OK:
                statusIconClasses += ' text-success fa-circle';
                break;
            case constants.status.DOWN:
                statusIconClasses += ' text-danger fa-warning';
                break;
            case constants.status.ERROR:
                statusIconClasses += ' text-warning fa-times-circle';
                break;
        }

        var timeago = moment(this.state.lastChecked).format('h:mma M/D/YY');


        return (
            <div className="list-group-item site clearfix">
                <div className="col-xs-1 status-icon-wrapper">
                    <div className="site-status-icon"><i className={statusIconClasses}></i></div> 
                </div>
                <div className="col-xs-10 details">
                    <div className="full-width clearfix">
                        <img src={favicon} className="favicon" />
                        <h3 className="url">{this.props.url}</h3>
                    </div>
                    <div className="full-width">
                        <div className="detail">Status: {this.state.status}</div> 
                        <div className="detail">Last checked: {timeago}</div>
                    </div>
                </div>
                <div className="col-xs-1 delete">
                    <a href="#" role="button" onClick={this.handleDelete}><i className="fa fa-trash fa-2x text-danger"></i></a>
                </div>
            </div>
        )
    }
});

module.exports = SiteListItem;

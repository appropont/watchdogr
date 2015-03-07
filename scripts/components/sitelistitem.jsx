'use strict';

var React = require('react'),
    constants = { 
        status: require('../constants/status')
    },
    SiteActions = require('../actions/sites'),

SiteListItem = React.createClass({

    getInitialState: function() {
        return {
            status: 'OK',
            lastChecked: 'N/A'
        }
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


        return (
            <div className="list-group-item site clearfix">
                <div className="col-xs-1 status-icon-wrapper">
                    <div className="site-status-icon"><i className={statusIconClasses}></i></div> 
                </div>
                <div className="col-xs-10 details">
                    <div className="full-width clearfix">
                        <img src={favicon} className="pull-left favicon" />
                        <h3 className="pull-left">{this.props.url}</h3>
                    </div>
                    <div className="full-width">
                        <div className="detail">Status: {this.state.status}</div> 
                        <div className="detail">Last checked: {this.state.lastChecked}</div>
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

'use strict';

var React = require('react'),
    SiteListItem = require('./sitelistitem.jsx'),
    siteStore = require('../stores/sites'),
    SiteActions = require('../actions/sites'),
    SettingsActions = require('../actions/settings'),
    Link = require('react-router').Link,

SiteList = React.createClass({
    getInitialState: function() {
        return {sites: []};
    },
    onSitesChange : function(sites) {
        this.setState({
            sites: sites
        });
    },
    componentDidMount: function() {
        this.unsubscribe = siteStore.listen(this.onSitesChange);
        SiteActions.loadSites();
        SettingsActions.loadSettings();

    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    render: function() {
        //var sites = [{key: 'http://chrisgriffing.com', url: 'http://chrisgriffing.com', status: 'DOWN'}];
        var listItems = [];

        //Create list items for sites
        for(var i = 0; i < this.state.sites.length; i++) {
            var site = this.state.sites[i];
            listItems.push(
                <SiteListItem key={site.url} url={site.url} timer={site.timer} lastChecked={site.lastChecked} />
            );
        }

        //Add Error list item if no sites found
        if(listItems.length === 0) {
            listItems.push(
                <div className="list-group-item error">
                    <h3>No sites found. Add one.</h3>
                </div>
            );
        }

        return (
            <div className="panel panel-default list-group site-list">
                <div className="panel-heading list-group-item">
                    <div>
                        <h2 className="pull-left"><i className="fa fa-server"></i> Sites</h2>
                        <Link to="add" className="btn btn-default">
                            <i className="fa fa-plus"></i> Add
                        </Link>
                        <Link to="settings" className="btn btn-default pull-right">
                            <i className="fa fa-cog"></i> Settings
                        </Link>
                    </div>

                </div>
                {listItems}
            </div>
        )
    }
});

module.exports = SiteList;

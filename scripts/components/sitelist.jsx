'use strict';

var React = require('react'),
    SiteListItem = require('./sitelistitem.jsx'),

SiteList = React.createClass({
    render: function() {
        var sites = [{url: 'something'}];
        var listItems = [];

        //Create list items for sites
        for(var i = 0; i < sites.length; i++) {
            var site = sites[i];
            listItems.push(
                <SiteListItem url={site.url} />
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
                        <a href="#" className="btn btn-default">
                            <i className="fa fa-plus"></i> Add
                        </a>
                        <a href="#" className="btn btn-default pull-right">
                            <i className="fa fa-cog"></i> Settings
                        </a>
                    </div>

                </div>
                {listItems}
            </div>
        )
    }
});

module.exports = SiteList;

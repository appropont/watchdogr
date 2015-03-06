'use strict';

var React = require('react'),
    SiteList = require('./sitelist.jsx'),

    Index = React.createClass({
        render: function() {

            return (
                <div>
                    <div className="header">
                        <h1>Watchdogr</h1>
                        <p>A simple tool to monitor the status of web servers.</p>
                    </div>
                    <SiteList />
                </div>
            )
        }
    });

module.exports = Index;

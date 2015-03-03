'use strict';

var React = require('react'),
    SiteList = require('./sitelist.jsx'),

    Watchdogr = React.createClass({
        render: function() {

            return (
                <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <div className="header">
                        <h1>Watchdogr</h1>
                        <p>A simple tool to monitor the status of web servers.</p>
                    </div>
                    <SiteList />
                </div>
            )
        }
    });

module.exports = Watchdogr;

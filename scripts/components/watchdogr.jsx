'use strict';

var React = require('react'),
    pack = require('../../package.json'),

    Watchdogr = React.createClass({
      render: function() {

        return (
          <div>
            <h1>Watchdogr</h1>
            <p>A simple tool to monitor the status of web servers.</p>
          </div>
        )
      }
    });

module.exports = Watchdogr;

'use strict';

var React = require('react'),

SiteListItem = React.createClass({
    render: function() {
        return (
            <div className="list-group-item site">
                <h3>{this.props.url}</h3>
            </div>
        )
    }
});

module.exports = SiteListItem;

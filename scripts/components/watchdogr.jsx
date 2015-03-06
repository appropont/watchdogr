'use strict';

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Index = require('./index.jsx'),
    AddSite = require('./addsite.jsx'),
    Settings = require('./settings.jsx');


var React = require('react'),

    Watchdogr = React.createClass({
        render: function() {

            return (
                <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <RouteHandler/>
                </div>
            )
        }
    });

var routes = (
  <Route name="app" path="/" handler={Watchdogr}>
    <Route name="add" handler={AddSite}/>
    <Route name="settings" handler={Settings}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content') );
});

module.exports = Watchdogr;

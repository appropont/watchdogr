import './SiteList.scss';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Component from 'react-pure-render/component';
import { connect } from 'react-redux';
import { Map } from 'immutable';
//import cx from 'classnames';

import SiteActions, { setTimestamp, updateSite, removeSite, saveSites, loadSites } from '../../common/sites/actions';
import SettingsActions from '../../common/settings/actions';

import Site from '../sites/Site.react';

// Presentational component.
class SiteList extends Component {

  // Lifecycle methods

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadSites());
    //SettingsActions.loadSettings();
  }

  componentWillUnmount() {
    //this.unsubscribe();
  }

  render() {
    //var sites = [{key: 'http://chrisgriffing.com', url: 'http://chrisgriffing.com', status: 'DOWN'}];
    var listItems = [];

    const sites = this.props.sites.toJS();

    console.log("sites in render: ", sites)

    const boundSetTimestamp = function(url, timestamp) {
      this.props.dispatch(setTimestamp(url, timestamp));
      this.props.dispatch(saveSites(this.props.sites));
    }.bind(this);

    const boundUpdateSite = function(id, status) {
      this.props.dispatch(updateSite(id, status));
      this.props.dispatch(saveSites(this.props.sites));
    }.bind(this);

    const boundRemoveSite = function(id, status) {
      this.props.dispatch(removeSite(id, status));
      this.props.dispatch(saveSites(this.props.sites));
    }.bind(this);

    // Create list items for sites
    for(const siteId in sites) {
      let site;
      if(sites.hasOwnProperty(siteId)) {
        site = sites[siteId];
      }
      if(site && site.id) {
        console.log('site: ', site);
        const props = {
          key: site.id,
          id: site.id,
          url: site.url,
          timer: site.timerHours,
          lastChecked: site.lastChecked,
          status: site.status,
          setTimestamp: boundSetTimestamp,
          updateStatus: boundUpdateSite,
          removeSite: boundRemoveSite
        };
        listItems.push(
          <Site {...props}  />
        );
      }
    }



    // Add Error list item if no sites found
    if(listItems.length === 0) {
      listItems.push(
        <div key="error" className="list-group-item error">
          <h3>No sites found. Add one.</h3>
        </div>
      );
    }

    return (
      <div className="panel panel-default list-group site-list">
        <div className="panel-heading list-group-item">
          <div>
            <h2 className="pull-left"><i className="fa fa-server list-icon"></i> Sites</h2>
            <Link to="add" className="btn btn-default">
              <i className="fa fa-plus"></i> Add
            </Link>
            <Link to="settings" className="btn btn-default pull-right settings-button">
              <i className="fa fa-cog fa-2x"></i> <span className="sr-only">Settings</span>
            </Link>
          </div>
        </div>
        {listItems}
      </div>
    )
  }

}


export default connect(state => ({
  sites: state.sites.map
}), SiteActions)(SiteList);

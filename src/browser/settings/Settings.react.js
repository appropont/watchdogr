import './Settings.scss';

import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router'
import Component from 'react-pure-render/component';
//import cx from 'classnames';

import StatusConstants from '../../common/constants/status';

import SettingsActions from '../../common/settings/actions';

// Presentational component.
export default class Settings extends Component {

  // Lifecycle methods

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      email: ''
    };
    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    SettingsActions.loadSettings();
  }

  // Instance methods
  saveSettings() {

    //validate fields
    var key = this.state.key;
    if(key && key !== '' && !validator.isAscii(key)) {
      console.log('key fails validation');
      alert('API Key fails validation');
      return;
    }

    var email = this.state.email;
    if(key && key !== '' && email && email !== '' && !validator.isEmail(email)) {
      console.log('email fails validation');
      alert('Email fails validation');
      return;
    }

    var settings = {
      key: this.state.key,
      email: this.state.email
    };

    SettingsActions.updateSettings(settings);

    //transition to SiteList
    browserHistory.push('/')

  }

  render() {
    return (
      <div className="panel panel-default settings">
        <div className="panel-heading list-group-item">
          <div>
            <h2><i className="fa fa-cogs"></i> Settings</h2>
          </div>
        </div>
        <div className="panel-body">
          <legend><i className="fa fa-envelope"></i> Mailer Settings</legend>
          <div className="form-group">
            <label htmlFor="key">Mandrill API Key</label>
            <input id="key" className="form-control" type="text" onChange={this.handleChange} value={this.state.key} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Recipient Email Address</label>
            <input id="email" className="form-control" type="email" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div className="form-group">
            <a className="btn btn-success" role="button" onClick={this.saveSettings}>Save</a>
            <Link to="app" className="btn btn-danger">Cancel</Link>
          </div>
        </div>
      </div>
    )
  }

}

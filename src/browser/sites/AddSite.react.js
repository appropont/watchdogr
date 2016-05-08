import './AddSite.scss';

import React, { PropTypes } from 'react';
import { browserHistory, Link } from 'react-router'
import Component from 'react-pure-render/component';
import validator from "validator";
import { fields } from '../../common/lib/redux-fields';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
//import cx from 'classnames';

import StatusConstants from '../../common/constants/status';

import SiteActions, { addSite } from '../../common/sites/actions';

// Presentational component.
class AddSite extends Component {

  // static propTypes = {
  //   addSite: PropTypes.func.isRequired
  // };

  // Lifecycle methods

  constructor(props) {
    super(props);
    this.state = {
      url : '',
      timer : 4
    };
    this.addSite = this.addSite.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Instance methods
  addSite() {

    console.log('add site clicked');
    console.log('url: ', this.state.url);
    console.log('timer: ', this.state.timer);

    //Validate state
    var url = this.state.url;
    if(!validator.isURL(url)) {
      alert('Error: url fails validation');
      return;
    }
    if(url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
      url = 'http://' + url;
    }

    // this to and fro conversion seems weird
    var timer = this.state.timer + '';
    if(!validator.isNumeric(timer)) {
      alert('Error: timer fails validation');
      return;
    }
    timer = parseInt(timer);
    if(timer < 1 || timer > 24) {
      alert('Error: timer is out of range (1-24)');
      return;
    }
    console.log('this.props: ', this.props);
    //trigger action
    this.props.dispatch(addSite(url, timer));

    //transition to SiteList
    browserHistory.push('/')

  }


  handleChange(event) {
    var changeObject = {};
    changeObject[event.target.id] = event.target.value;
    this.setState(changeObject, function() {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="panel panel-default add-site">
        <div className="panel-heading list-group-item">
          <div>
            <h2><i className="fa fa-plus-circle"></i> Add Site</h2>
          </div>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <label htmlFor="url">Site URL</label>
            <input id="url" className="form-control" type="text" onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="timer">Timer Length (hours)</label>
            <input id="timer" className="form-control" type="number" onChange={this.handleChange} defaultValue={this.state.timer} />
          </div>
          <div className="form-group">
            <a className="btn btn-success" role="button" onClick={this.addSite}>Add Site</a>
            <Link to="app" className="btn btn-danger">Cancel</Link>
          </div>
        </div>
      </div>
    )
  }

}

AddSite = fields(AddSite, {
  path: 'addSite',
  fields: ['url', 'timer']
});

AddSite = injectIntl(AddSite);

export default connect(null, SiteActions)(AddSite);
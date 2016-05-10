import './Site.scss';

import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Moment from 'moment';
import Request from 'superagent';
//import cx from 'classnames';

import SiteActions, { setTimestamp } from '../../common/sites/actions';
import SettingsActions from '../../common/settings/actions';

import StatusConstants from '../../common/constants/status';
import StatusService from '../../common/sites/statusService';

const constants = {
  status: StatusConstants
};

// Presentational component.
export default class Site extends Component {

  static propTypes = {
    //removeSite: PropTypes.func.isRequired,
    //site: PropTypes.object.isRequired,
    setTimestamp: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
    removeSite: PropTypes.func.isRequired
  };

  // Lifecycle methods

  constructor(props) {
    super(props);
    //this.state = { status: constants.status.OK };
    this.updateStatus = this.updateStatus.bind(this);
    this.sendEmailAlert = this.sendEmailAlert.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updateStatus();
  }

  componentWillUnmount() {
    console.log('clearing timeout');
    StatusService.clearTimeout(this.props.url);
  }

  // Instance methods
  updateStatus() {
    console.log('updating status');
    StatusService.getStatus(this.props, (status) => {
      if(status) {
        this.props.updateStatus(this.props.id, status);
      }
    });
  }

  sendEmailAlert() {
    console.log('sending email alert');
  }

  handleDelete() {
    console.log('handling delete');
    this.props.removeSite(this.props.id);
  }

  render() {
    var favicon = 'http://www.google.com/s2/favicons?domain=' + this.props.url;

    var statusIconClasses = 'fa';

    switch(this.props.status) {

      case constants.status.UPDATING:
        statusIconClasses += ' text-primary fa-refresh site-updating-icon';
        break;
      case constants.status.OK:
        statusIconClasses += ' text-success fa-circle';
        break;
      case constants.status.DOWN:
        statusIconClasses += ' text-danger fa-warning';
        break;
      case constants.status.ERROR:
        statusIconClasses += ' text-warning fa-times-circle';
        break;
      default:
        statusIconClasses += ' fa-circle-o';
    }

    var timeago = 'N/A';
    if(this.props.lastChecked) {
        var dateFromTimestamp = new Date(this.props.lastChecked);
        timeago = Moment(dateFromTimestamp).format('h:mma M/D/YY');
    }


    return (
      <div className="list-group-item site clearfix">
        <div className="col-xs-1 status-icon-wrapper">
          <div className="site-status-icon"><i className={statusIconClasses}></i></div> 
        </div>
        <div className="col-xs-10 details">
          <div className="full-width clearfix">
            <img src={favicon} className="favicon" />
            <h3 className="url">{this.props.url}</h3>
          </div>
          <div className="full-width">
            <div className="detail">Status: {this.props.status}</div> 
            <div className="detail">Last checked: {timeago}</div>
          </div>
        </div>
        <div className="col-xs-1 actions">
          <div className="action update">
            <a href="#" role="button" onClick={this.updateStatus}><i className="fa fa-refresh fa-2x text-primary"></i></a>
          </div>
          <div className="action remove">
            <a href="#" role="button" onClick={this.handleDelete}><i className="fa fa-trash fa-2x text-danger"></i></a>
          </div>
        </div>
      </div>
    )
  }



}

import './Site.scss';

import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import Moment from 'moment';
import Request from 'superagent';
//import cx from 'classnames';

import SiteActions, { setTimestamp } from '../../common/sites/actions';
import SettingsActions from '../../common/settings/actions';

import StatusConstants from '../../common/constants/status';

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
    //check if the last time checked is longer than timer
    var now = Date.now();
    var timerMS = this.props.timer * 1000 * 60 * 60;
    var timeSinceChecked = now - this.props.lastChecked;

    if(timeSinceChecked >= timerMS) {
      this.updateStatus();
    } else {
      var partialTimerDuration = timerMS - timeSinceChecked;
      this.timeout = setTimeout(this.updateStatus, partialTimerDuration);
    }
  }

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  // Instance methods
  updateStatus() {
    console.log('updating status')
    var self = this;
    self.setState({status: 'UPDATING'});
      Request('HEAD', self.props.url)
        .end(function(err, result) {

          //initiate new timeout
          const timerMS = self.props.timer * 1000 * 60 * 60;
          const now = Date.now();
          let timeout = setTimeout(self.updateStatus, timerMS);
          self.setState({
            timeout: timeout
          });

          //change state
          console.log('props in updateStatus: ', self.props);

          //validate status
          if(!result || !result.status) {
            console.log('Error: request did not return status');
            self.props.updateStatus(self.props.id, constants.status.ERROR);
            return Error('Error: request did not return status');
          }

          console.log('result: ', result);

          var newState = {};
          if(result.statusCode >= 200 && result.statusCode < 300) {
            newState.status = constants.status.OK;
          } else if(result.statusCode >= 400 && result.statusCode < 600) {
            newState.status = constants.status.DOWN;
            self.sendEmailAlert();
          } else {
            newState.status = constants.status.ERROR;
          }
          self.props.updateStatus(self.props.id, newState.status);
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
        <div className="col-xs-1 delete">
          <a href="#" role="button" onClick={this.updateStatus}><i className="fa fa-refresh fa-2x text-primary"></i></a>
          <a href="#" role="button" onClick={this.handleDelete}><i className="fa fa-trash fa-2x text-danger"></i></a>
        </div>
      </div>
    )
  }



}

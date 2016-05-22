import Component from 'react-pure-render/component';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react-native';
import Moment from 'moment';

import StatusConstants from '../../common/constants/status';
import StatusService from '../../common/sites/statusService';

const constants = {
  status: StatusConstants
};

const {
  Image, PropTypes, StyleSheet, Text, TextInput, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    color: '#7C7C7C',
    flex: 1,
    fontSize: 16,
    paddingRight: 20
  },
  checkbox: {
    height: 30,
    marginLeft: 20,
    marginRight: 20,
    width: 30
  }
});

export default class Site extends Component {

  static propTypes = {
    site: PropTypes.object.isRequired,
    updateStatus: PropTypes.func.isRequired,
    removeSite: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.updateStatus();
  }

  componentWillUnmount() {
    console.log('clearing timeout');
    StatusService.clearTimeout(this.props.url);
  }

  updateStatus(e) {
    const { site, updateStatus } = this.props;
    const forceRefresh = (e) ? true : false;

    //set updating status
    updateStatus(site.id, constants.status.UPDATING);

    // fetch status
    StatusService.getStatus(site, (status) => {
      if(status) {
        updateStatus(site.id, status);
      }
    }, forceRefresh);
  }

  removeSite() {
    const { site, removeSite } = this.props;
    removeSite(site);
  }

  render() {
    const { site } = this.props;

    const statusIconProps = {};
    switch(site.status) {
      case constants.status.UPDATING:
        statusIconProps.name = 'refresh';
        statusIconProps.color = '#0ABEFA';
        break;
      case constants.status.OK:
        statusIconProps.name = 'circle';
        statusIconProps.color = '#16FA0A';
        break;
      case constants.status.DOWN:
        statusIconProps.name = 'warning';
        statusIconProps.color = '#FA160A';
        break;
      case constants.status.ERROR:
        statusIconProps.name = 'times-circle';
        statusIconProps.color = '#FAE60A';
        break;
      default:
        statusIconProps.name = ' circle-o';
        statusIconProps.color = '#333333';
    }

    var timeago = 'N/A';
    if(site.lastChecked) {
        var dateFromTimestamp = new Date(site.lastChecked);
        timeago = Moment(dateFromTimestamp).format('h:mma M/D/YY');
    }

    return (
      <View style={styles.container}>
        <Icon {...statusIconProps}></Icon>
        <Text>{site.url}</Text>
        <Text>Last checked: {timeago}</Text>
        <Icon.Button name="refresh" ></Icon.Button>
        <Icon.Button name="trash" ></Icon.Button>
      </View>
    );
  }

}

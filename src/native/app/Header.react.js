import Component from 'react-pure-render/component';
import React from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FirstMate from '../services/FirstMate';

const {
  Image, PropTypes, StyleSheet, Text, TouchableOpacity, View
} = React;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#31AACC',
    borderBottomColor: '#73CEE7',
    borderBottomWidth: 2,
    height: 70,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 30,
    position: 'relative'
  },
  header: {
    color: '#fff',
    fontSize: 20
  },
  addSiteIcon: {
    backgroundColor: 'transparent',
    height: 44,
    width: 44,
    color: '#FFFFFF',
    fontSize: 20
  },
  addSiteLink: {
    backgroundColor: 'transparent',
    height: 44,
    left: 8,
    opacity: 0.9,
    padding: 10,
    position: 'absolute',
    top: 25,
    width: 44
  },
  leftButton: {
    backgroundColor: 'transparent',
    height: 44,
    left: 8,
    opacity: 0.9,
    padding: 10,
    position: 'absolute',
    top: 25,
    width: 44
  },
  rightButton: {
    backgroundColor: 'transparent',
    height: 44,
    right: 0,
    opacity: 0.9,
    padding: 10,
    position: 'absolute',
    top: 25,
    width: 44
  },
  buttonIcon: {
    backgroundColor: 'transparent',
    height: 44,
    width: 44,
    color: '#FFFFFF',
    fontSize: 20
  },
  buttonText: {
    backgroundColor: 'transparent',
    height: 44,
    width: 44,
    color: '#FFFFFF',
    fontSize: 16
  }
});

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.gotoSettings = this.gotoSettings.bind(this);
    this.gotoAddSite = this.gotoAddSite.bind(this);
  }

  gotoSettings() {
    FirstMate.goto('settings');
  }

  gotoAddSite() {
    FirstMate.goto('addSite');
  }

  goBack() {
    FirstMate.back();
  }

  render() {
    const { title, toggleSideMenu } = this.props;

    console.log('props inside header, ', this.props);

    const addButton = (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={this.gotoAddSite}
        style={styles.rightButton}>
        <Icon name="plus" style={styles.buttonIcon}></Icon>
      </TouchableOpacity>
    );
    const backButton = (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={this.goBack}
        style={styles.leftButton}>
        <Text name="plus" style={styles.buttonText}>back</Text>
      </TouchableOpacity>
    );
    const settingsButton = (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={this.gotoSettings}
        style={styles.leftButton}>
        <Icon name="cog" style={styles.buttonIcon}></Icon>
      </TouchableOpacity>
    );

    let leftButton;
    let rightButton;

    const currentRoute = FirstMate.getCurrentRoute();
    console.log('currentRoute: ', currentRoute);
    switch(currentRoute) {
      case 'addSite':
      case 'settings': {
        leftButton = backButton;
        break;
      }
      default: {
        leftButton = settingsButton;
        rightButton = addButton;
      }
    }

    return (
      <View style={styles.container}>
        {leftButton}
        <Text style={styles.header}>{title}</Text>
        {rightButton}
      </View>
    );
  }

}

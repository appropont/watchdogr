import * as uiActions from '../../common/ui/actions';
import Component from 'react-pure-render/component';
import Header from './Header.react';
import Menu from './Menu.react';
import React, { Navigator, PropTypes, StatusBar, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import linksMessages from '../../common/app/linksMessages';
import routes from '../routes';
import styles from './styles';
import start from '../../common/app/start';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import FirstMate from '../services/FirstMate';

class AppPage extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  };

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  constructor(props) {
    super(props);
    this.onNavigatorRef = this.onNavigatorRef.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onNavigatorRef(component) {
    this.navigator = component;

    console.log('Wiring up FirstMate');
    // wire up FirstMate to allow child routes some access to Navigator without having to pass it everywhere. This might not be a very React-y pattern
    FirstMate.setGotoCallback((route) => {
      console.log('gotoCallback fired from AppPage reference with route: ', route);
      this.navigator.push(routes[route]);
    });
    FirstMate.setBackCallback(() => {
      console.log('backCallback fired from AppPage reference with route');
      this.navigator.pop();
    });
    FirstMate.setGetCurrentRouteCallback(() => {
      console.log('getCurrentRouteCallback fired from AppPage reference with routes: ', this.navigator.getCurrentRoutes());
      const routes = this.navigator.getCurrentRoutes();
      const currentRoute = routes[routes.length - 1];
      if(currentRoute) {
        return currentRoute.name;
      } else {
        return '';
      }
    });
  }

  getTitle(route) {
    // const { intl } = this.props;
    // switch (route) {
    //   case routes.home: return intl.formatMessage(linksMessages.home);
    //   case routes.intl: return intl.formatMessage(linksMessages.intl);
    //   case routes.todos: return intl.formatMessage(linksMessages.todos);
    // }
    switch (route) {
      case routes.sites: return 'Watchdogr';
      case routes.addSite: return 'Add Site';
      case routes.settings: return 'Settings';
    }
    throw new Error('Route not found.');
  }

  renderScene(route) {
    return (
      <View style={[styles.sceneView, route.style]}>
        <StatusBar barStyle="light-content" />
        <Header
          title={this.getTitle(route)}
          route={route}
        />
        <route.Page dispatch={this.props.dispatch} />
      </View>
    );
  }

  render() {
    console.log('this.props in app render', this.props);
    return (
      <Navigator
        configureScene={AppPage.configureScene}
        initialRoute={routes.sites}
        ref={this.onNavigatorRef}
        renderScene={this.renderScene}
        style={styles.container}
      />
    );
  }

}

AppPage = injectIntl(AppPage);

AppPage = connect(state => ({
  device: state.device,
  ui: state.ui
}), uiActions)(AppPage);

export default start(AppPage);

import Component from 'react-pure-render/component';
import React, { View } from 'react-native';
import Sites from './Sites.react';
import appStyles from '../app/styles';

export default class SitesPage extends Component {

  render() {

  	console.log('this.props in sites page: ', this.props);

    return (
      <View style={[appStyles.container]}>
        <Sites navigator={this.navigator} />
      </View>
    );
  }

}

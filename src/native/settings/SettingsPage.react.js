import Component from 'react-pure-render/component';
import React, { View, Text } from 'react-native';
import appStyles from '../app/styles';

export default class SettingsPage extends Component {

  render() {
    return (
      <View style={[appStyles.container]}>
        <Text style={[appStyles.centered, appStyles.paragraph]}>Settings Page</Text>
      </View>
    );
  }

}

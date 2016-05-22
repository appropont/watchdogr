import Component from 'react-pure-render/component';
import React, { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import appStyles from '../app/styles';

import MK, { MKButton, MKColor, MKSlider, MKTextField, mdl } from 'react-native-material-kit';

import SiteActions, { addSite } from '../../common/sites/actions';

export default class AddSitePage extends Component {
  
  constructor(props) {
    super(props);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onHoursChange = this.onHoursChange.bind(this);
    this.onSaveSite = this.onSaveSite.bind(this);
    this.state = {
      hours: 4,
      url: ""
    };
  }

  onUrlChange(url) {
    console.log('url changed: ', url);
    this.setState({url: url});
  }

  onHoursChange(hours) {
    console.log('hours changed: ', hours);
    this.setState({hours: hours});
  }

  onSaveSite() {
    console.log('saving site');
    const {url, hours} = this.state;
    if(url && url !== '') {
      this.props.dispatch(addSite(url, Math.floor(hours)));
    } else {
      console.log('url is invalid or empty');
    }
  }

  render() {

    console.log('this.props in render: ', this.props);

    const {hours, url} = this.state;

    const SaveSiteButton = MKButton.button()
      .withText('Save Site')
      .withOnPress(this.onSaveSite)
      .build();

    return (
      <ScrollView style={{paddingRight:10, paddingLeft: 10}}>
        <View key="siteUrl">
          <View style={appStyles.formRow}>
            <View style={appStyles.label}>
              <Text style={[appStyles.labelText, {paddingTop: 5}]}>Url</Text>
            </View>
            <TextInput
              style={appStyles.textInput}
              onChangeText={this.onUrlChange}
              value={this.state.url}
              placeholder="https://google.com"
              autoCorrect={false}
              autoCaptitalize={false}
              autoFocus={true}
            />
          </View>
        </View>
        <View key="siteTimer">
          <View style={appStyles.formRow}>
            <View style={appStyles.label}>
              <Text style={appStyles.labelText}>Timer</Text>
              <Text>{Math.floor(hours)} hours</Text>
            </View>
            <MKSlider
              min={1}
              max={24}
              style={appStyles.slider}
              value={hours}
              onChange={this.onHoursChange}
            />
          </View>
        </View>
        <View key="actions">
          <View style={appStyles.formRow}>
            <SaveSiteButton />
          </View>
        </View>
      </ScrollView>
    );
  }

}

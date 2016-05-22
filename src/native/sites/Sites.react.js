import Component from 'react-pure-render/component';
import React from 'react-native';
import { connect } from 'react-redux';

import SiteActions, { setTimestamp, updateSite, removeSite, saveSites, loadSites } from '../../common/sites/actions';

import Site from './Site.react';

const {
  Image, PropTypes, ScrollView, StyleSheet, Text, View
} = React;

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  empty: {
    color: '#aaa',
    fontSize: 20
  },
  icon: {
    height: 70,
    marginBottom: 10,
    width: 70
  },
  row: {
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    height: 63
  }
});

class Sites extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadSites());
    //this.props.dispatch(loadSettings());
  }

  render() {

    const sites = this.props.sites.toJS();

    console.log("sites in render: ", sites);
    console.log('props inside sitesList, ', this.props);

    const boundUpdateSite = function(id, status) {
      this.props.dispatch(updateSite(id, status));
      this.props.dispatch(saveSites(this.props.sites));
    }.bind(this);

    const boundRemoveSite = function(id, status) {
      this.props.dispatch(removeSite(id, status));
      this.props.dispatch(saveSites(this.props.sites));
    }.bind(this);

    // Create list items for sites
    let listItems = [];
    for(const siteId in sites) {
      let site;
      if(sites.hasOwnProperty(siteId)) {
        site = sites[siteId];
      }
      if(site && site.id) {
        console.log('site: ', site);
        const props = {
          site: site,
          updateStatus: boundUpdateSite,
          removeSite: boundRemoveSite
        };
        listItems.push(
          <View key={site.id} style={styles.row}>
            <Site {...props} />
          </View>
        );
      }
    }

    // Add Error list item if no sites found
    if(listItems.length === 0) {
      listItems.push(
        <View key="error" style={styles.row}>
          <View style={styles.container}>
            <Text>No sites found. Add one.</Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        {listItems}
      </ScrollView>
    );
  }

}

export default connect(state => ({
  sites: state.sites.map
}), SiteActions)(Sites);

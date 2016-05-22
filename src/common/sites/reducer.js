import * as actions from './actions';
import Site from './site';
import { Map, Record } from 'immutable';

import Storage from '../storage/storage';

const InitialState = Record({
  map: Map()
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ map }) => initialState.merge({
  map: Map(map).map(site => new Site(site))
});

const reviveSites = (sitesArray) => {
  let map = Map();
  for(let i = 0; i < sitesArray.length; i++) {
    let site = sitesArray[i];
    map = map.set(site.id, new Site(site));
  }
  return initialState.merge({
    map: map
  });
};

export default function sitesReducer(state = initialState, action) {
  
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {

    case actions.ADD_SITE: {
      const site = new Site(action.payload);
      return state
        .update('map', map => map.set(site.id, site));
    }

    case actions.REMOVE_SITE: {
      const { id } = action.payload;
      return state.update('map', map => map.delete(id));
    }

    case actions.SAVE_SITES: {
      console.log('payload passed into save sites: ', action.payload);
      const map = action.payload.sites.map(site => {
        return site.toJS();
      });
      console.log('map of raw sites: ', map);
      const array = map.toArray();
      //Storage.sites = JSON.stringify(array);
      Storage.setItem('sites', JSON.stringify(array));
      return state;
    }

    case actions.LOAD_SITES: {
      console.log('loading sites');
      try {
        const loadedSites = Storage.getItem(sites);
        console.log('loadedSites: ', loadedSites);
        const sites = reviveSites(JSON.parse(loadedSites));
        console.log('sites in load sites: ', sites);
        return state.merge(sites);
      } catch(e) {
        console.log('loading sites failed');
        return state;
      }
    }

    case actions.SET_TIMESTAMP: {
      const id = action.payload.site;
      return state
        .updateIn(['map', id, 'lastChecked'], lastChecked => Date.now());
    }

    case actions.UPDATE_SITE: {
      const { id, status } = action.payload;
      return state
        .updateIn(['map', id], record => record.merge({lastChecked: Date.now(), status: status}));
    }

  }

  return state;

}

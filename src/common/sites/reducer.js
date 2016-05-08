import * as actions from './actions';
import Site from './site';
import { Map, Record } from 'immutable';

const InitialState = Record({
  map: Map()
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ map }) => initialState.merge({
  map: Map(map).map(site => new Site(site))
});

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
      localStorage.sites = JSON.stringify(action.payload);
      const sites = revive(action.payload);
      return state.update('map', map => map.merge(sites));
    }

    case actions.LOAD_SITES: {
      // load sites from local storage
      const loadedSites = localStorage.sites;
      if(sites) {
        const sites = revive(JSON.parse(loadedSites));
        return state.update('map', map => map.merge(sites));
      } else {
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

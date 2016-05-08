import { Range } from 'immutable';

export const ADD_SITE = 'ADD_SITE';
export const REMOVE_SITE = 'REMOVE_SITE';
export const SAVE_SITES = 'SAVE_SITES';
export const LOAD_SITES = 'LOAD_SITES';
export const SET_TIMESTAMP = 'SET_TIMESTAMP';
export const UPDATE_SITE = 'UPDATE_SITE';


export function addSite(url, timerHours) {
  return ({ getUid }) => ({
    type: ADD_SITE,
    payload: {
      id: getUid(),
      url: url,
      lastChecked: 0,
      timerHours: timerHours,
      status: "UPDATING"
    }
  });
}

export function removeSite(id) {
  return {
    type: REMOVE_SITE,
    payload: { id }
  };
}

export function saveSites(sites) {
  return {
    type: SAVE_SITES,
    payload: { sites }
  };
}

export function loadSites() {
  return {
    type: LOAD_SITES,
    payload: {}
  };
}

export function setTimestamp(site) {
  return {
    type: SET_TIMESTAMP,
    payload: { site }
  };
}

export function updateSite(id, status) {
  return {
    type: UPDATE_SITE,
    payload: { 
      id: id,
      status: status
    }
  };
}

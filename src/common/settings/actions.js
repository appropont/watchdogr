import { Range } from 'immutable';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SEND_EMAIL_ALERT = 'SEND_EMAIL_ALERT';


export function updateSettings(key, email) {
  return {
    type: UPDATE_SETTINGS,
    payload: {
      key: key.trim(),
      email: email.trim()
    }
  };
}

export function loadSettings() {
  return {
    type: LOAD_SETTINGS,
    payload: {}
  };
}

export function sendEmailAlert(site) {
  return {
    type: SEND_EMAIL_ALERT,
    payload: { site }
  };
}

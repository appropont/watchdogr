import * as actions from './actions';
import { Record } from 'immutable';

const InitialState = Record({
  key: '',
  email: ''
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.UPDATE_SETTINGS: {
      return state.merge(action.payload);
    }

    case actions.LOAD_SETTINGS: {
      const loadedSettings = localStorage.settings;
      if(loadedSettings) {
        const settings = JSON.parse(loadedSettings);
        return state.merge(settings);
      } else {
        return state;
      }
    }

    case actions.SEND_EMAIL_ALERT: {
      // execute sending of email

      console.log('sending email alert to ', action.payload.email);

      return state;
    }
  }

  return state;
}

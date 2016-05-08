import { Record } from 'immutable';

const Site = Record({
  id: '',
  url: '',
  timerHours: 4,
  lastChecked: 0,
  status: ''
});

export default Site;

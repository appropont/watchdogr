import Request from 'superagent';

import StatusConstants from '../constants/status';

const constants = {
  status: StatusConstants
};

class StatusService {

  timeouts = {}

  // Using a callback instead of a more advanced solution because this method will keep firing responses
  getStatus(site, callback) {
    console.log('getting status: ', site, callback);

    const now = Date.now();
    const timerMS = site.timer * 1000 * 60 * 60; 

    // clear any existing timeout
    this.clearTimeout(site.url);

    // check if it is time for a new request
    const nextUpdate = site.lastChecked + timerMS;

    // if not time for new request, create timeout for remaining time
    if(nextUpdate > now) {
      console.log('creating timeout for remaining time');
      const timeRemaining = nextUpdate - now;
      this.timeouts[site.url] = setTimeout(() => {
        this.getStatus(site, callback);
      }, timeRemaining);
      callback(false);
    } else {
      Request('HEAD', site.url)
        .end((err, result) => {
          //initiate new timeout
          console.log('creating new timeout');
          this.timeouts[site.url] = setTimeout(() => {
            this.getStatus(site, callback);
          }, timerMS);
          console.log('response error', err,  result)
          //validate status
          if(!result || !result.statusCode) {
            console.log('Error: request did not return status');
            callback(constants.status.ERROR);
          } else {
            console.log('result: ', result);
            if(result.statusCode >= 200 && result.statusCode < 300) {
              callback(constants.status.OK);
            } else if(result.statusCode >= 400 && result.statusCode < 600) {
              callback(constants.status.DOWN);
            } else {
              callback(constants.status.ERROR);
            }
          }
      });
    }
    console.log('timeouts in service: ', this.timeouts);
  }

  clearTimeout(url) {
    if(this.timeouts[url] !== false) {
      clearTimeout(this.timeouts[url]);
      this.timeouts[url] = false;
    }
  }

};

export default new StatusService();
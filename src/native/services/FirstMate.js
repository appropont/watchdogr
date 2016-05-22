// TODO: Should probably refactor this into a class at some point and then export an instance of it.
// TODO: Wiring this up into the whole action/reducer pattern would be a good idea.
const FirstMate = function() {

  // private 
  let gotoCallback = function() {
    console.log('gotoCallback not wired up');
    throw new Error('gotoCallback not wired up. You must wire up a callback from a parent component that has access to the navigator.');
  };
  let backCallback = function() {
    console.log('backCallback not wired up');
    throw new Error('backCallback not wired up. You must wire up a callback from a parent component that has access to the navigator.');
  };
  let getCurrentRouteCallback = function() {
    console.log('getCurrentRouteCallback not wired up');
    //throw new Error('getCurrentRouteCallback not wired up. You must wire up a callback from a parent component that has access to the navigator.');
    return '';
  };


  // public
  return {
    setGotoCallback: function(callback) {
      gotoCallback = callback;
    },
    setBackCallback: function(callback) {
      backCallback = callback;
    },
    setGetCurrentRouteCallback: function(callback) {
      getCurrentRouteCallback = callback;
    },
    goto: function(route) {
      gotoCallback(route);
    },
    back: function() {
      backCallback();
    },
    getCurrentRoute: function() {
      return getCurrentRouteCallback();
    }
  };
}();

export default FirstMate;
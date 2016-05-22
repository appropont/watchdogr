const Storage = function() {

  let storage;

  return {
    getItem: async function(key) {
      if(!storage) {
        const errorMessage = 'Storage.getItem Failed: Storage has not been set up yet.'
        console.log(errorMessage);
        throw new Error(errorMessage);
      } else {
        const result = await storage.getItem(key);
        return result;
      }
    },
    setItem: async function(key, value) {
      if(!storage) {
        const errorMessage = 'Storage.setItem Failed: Storage has not been set up yet.'
        console.log(errorMessage);
        throw new Error(errorMessage);
      } else {
        const result = await storage.setItem(key, value);
        return result;
      }
    },
    setStorage: function(store){
      storage = store;
    }
  }
}();

export default Storage;
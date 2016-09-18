import { AsyncStorage } from 'react-native';

export default class StorageUnit {
  constructor(storage_key_array, updateStorage_function) {
    this.storage_key_array = storage_key_array;
    this.updateStorage_function = updateStorage_function;
    this.initialized = false;
    this.storage = {};

    const self = this;

    // fetchData promise will make sure the async
    this.fetchData = new Promise((resolve, reject) => {
      // init storage when launching
      // *call get from storage function
      self.count = 0;
      for (let i = 0; i < self.storage_key_array.length; i++) {
        self.getFromAsyncStorage(self.storage_key_array[i]).done((response) => {
          self.storage[self.storage_key_array[i]] = {
            storageKey: self.storage_key_array[i],
            content: response
          };
          self.count++;
          if (i === self.storage_key_array.length - 1) {
            self.initialized = true;
            resolve(self.storage);
          }
        });
      }
    });
    // 
    // this.fetchData.then((storage) => {
    //   this.updateStorage_function(storage);
    // });
  }

  getItem(storage_key) {
    if (this.initialized === true) {
      for (let i = 0; i < this.storage_key_array.length; i++) {
        if (this.storage[storage_key]) {
          console.log('StorageUnit: get item success');
          return this.storage[storage_key].content;
        }
      }
    }
    return;
  }

  async getFromAsyncStorage(storage_key) {
    try {
      let value = await AsyncStorage.getItem(storage_key);
      if (value !== null){
        const response = JSON.parse(value);
        return response;
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async saveToAsyncStorage(storage_key, obj) {
    try {
      AsyncStorage.setItem(storage_key, obj);
      console.log('Saved selection to disk: ' + obj);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  saveItem(storage_key, item) {
    // save to async
    // add to storage cache
    this.saveToAsyncStorage(storage_key, item).done(() => {
      this.getFromAsyncStorage(storage_key).done((response) => {
        // update this.storage
        this.storage[storage_key] = {
          storageKey: storage_key,
          content: response
        };
        this.updateStorage_function(this.storage);
        console.log('StorageUnit: save item success');
      });
    });
  }

  addItem(storage_key, item) {
    this.getFromAsyncStorage(storage_key).done((response) => {
      const entry = Object.assign({}, response);
      entry.content.push(item);
      this.storage[storage_key] = entry;
      this.saveToStorage(storage_key, item);
    });
  }

  // deleteItem(storage_key, item) {
  //   delete item from async storage
  //   update storage cache
  // }
}

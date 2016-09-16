import { AsyncStorage } from 'react-native';

export default class StorageUnit {
  constructor(storage_key_array) {
    this.storage_key_array = storage_key_array;
    this.initialized = false;

    this.storage = [];
    this.initialize();
  }

  initialize() {
    // init storage when launching
    // *call get from storage function

    for (let i = 0; i < this.storage_key_array.length; i++) {
      this.getFromAsyncStorage(this.storage_key_array[i]).done((response) => {
        this.storage.push({
          storageKey: this.storage_key_array[i],
          content: response
        });
        this.initialized = true;
      })
    }

    // console.log(this.storage);
  }

  getItem(storage_key) {
    if (this.initialized === true) {
      for (let i = 0; i < this.storage_key_array.length; i++) {
        if (this.storage[i].storageKey === storage_key) {
          console.log(this.storage[i].content);
          return this.storage[i].content;
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
        // delete entry from this.storage, with save storage key
        // push it to this.storage
        let oldEntry;
        for (let i = 0; i < this.storage_key_array.length; i++) {
          if (this.storage[i].storageKey === storage_key) {
            oldEntry = this.storage[i];
          }
        }

        this.storage.splice(oldEntry, 1);

        this.storage.push({
          storageKey: storage_key,
          content: response
        });
      });
    });
  }

  // deleteItem(storage_key, item) {
  //   delete item from async storage
  //   update storage cache
  // }
}

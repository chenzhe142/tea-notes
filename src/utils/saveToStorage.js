import { AsyncStorage } from 'react-native';

export default function saveToStorage(storage_key, obj) {
  try {
    AsyncStorage.setItem(storage_key, obj);
    console.log('Saved selection to disk: ' + obj);
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }
}

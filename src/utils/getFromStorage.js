import { AsyncStorage } from 'react-native';

export default async function getFromStorage(storage_key, res) {
  try {
    let value = await AsyncStorage.getItem(storage_key);
    if (value !== null){
      // We have data!!
      // console.log(value);
      // console.log(typeof(value));
      return value;
    }
  } catch (error) {
    console.log('AsyncStorage error: ' + error.message);
  }

}

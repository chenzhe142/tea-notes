import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const COVERIMAGE_HEIGHT = SCREEN_WIDTH / 3 * 2;
export const CARD_OFFSET = 20;

export const CUSTOMIZED_TEA_LIST_STORAGE_KEY = '@TeaArrayStorageKey';
// {
//   'customizedTeaList': [],
// }

export const DEFAULT_TEA_LIST = [{
  name: 'Matcha Green Tea',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  }
}, {
  name: 'Pu-er Tea',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  }
}, {
  name: 'jin jun mei black tea',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  }
}, {
  name: 'tie guan yin',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  }
}];

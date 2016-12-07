import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const COVERIMAGE_HEIGHT = SCREEN_WIDTH / 3 * 2;
export const CARD_OFFSET = 20;
export const STATUS_BAR_HEIGHT_IOS = 20;
export const CARD_BETWEEN_DISTANCE = 7;

export const SYMBOL_CELSIUS = '℃';
export const SYMBOL_FAHRENHEIT = '℉';
export const SYMBOL_SECOND = 'Sec';
export const SYMBOL_MINUTE = 'Min';

export const SCENE_TRANSITION_FLOAT_RIGHT = ['TeaSelection', 'TeaDetail'];
export const SCENE_TRANSITION_FLOAT_LEFT = ['CreateTea'];

export const CUSTOMIZED_SETTINGS_STORAGE_KEY = '@SettingsStorageKey';
export const DEFAULT_SETTINGS = {
  temperatureOptions: [{
    id: 0,
    text: 'celsius',
    isSelected: true
  }, {
    id: 1,
    text: 'fahrenheit',
    isSelected: false
  }],
  timeOptions: [{
    id: 0,
    text: 'second',
    isSelected: true,
  }, {
    id: 1,
    text: 'minute',
    isSelected: false,
  }]
};

export const CUSTOMIZED_TEA_LIST_STORAGE_KEY = '@TeaArrayStorageKey';

// default
//   temperature: celsius
//   time: second
export const DEFAULT_TEA_LIST = [{
  name: 'Matcha Green Tea',
  temperature: 95,
  time: 3,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  },
  isLiked: false
}, {
  name: 'Pu-er Tea',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  },
  isLiked: false
}, {
  name: 'jin jun mei black tea',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  },
  isLiked: false
}, {
  name: 'tie guan yin',
  temperature: 95,
  time: 180,
  coverImageUrl: {
    uri: 'https://facebook.github.io/react/img/logo_og.png'
  },
  isLiked: false
}];

export const DEFAULT_TEA_TYPES = [
  "green",
  "black",
  "white",
  "oolong",
  "herbal",
  "fruity",
  "iced",
];

export const DEFAULT_TEA_FLAVORS = [
  "pure-traditional",
  "blooming",
  "mint",
  "light",
  "mild",
  "rich",
  "fruity",
  "berry",
  "chai"
];

export const DEFAULT_TEA_CAFFEINE_LEVEL = [
  "caffeine free",
  "low",
  "medium",
  "high",
  "highest"
];

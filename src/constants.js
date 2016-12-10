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
  }],
  teaListOptions: [{
    id: 0,
    text: 'show',
    isSelected: true,
  }, {
    id: 1,
    text: 'hide',
    isSelected: false,
  }],
};

export const CUSTOMIZED_TEA_LIST_STORAGE_KEY = '@TeaArrayStorageKey';
export const DEFAULT_TEA_LIST_STORAGE_KEY = '@DefaultTeaArrayStorageKey';

export const DEFAULT_TEA_LIST = [{
  name: 'Pu-erh Tea (raw)',
  temperature: 100,
  time: 180,
  teaType: 'black tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'medium',
  coverImageUrl: {
    uri: 'placeholder'
  },
  brewSteps: '*Teapot is recommended for Pu-erh preparation.\n\n1. Preheat the teapot/cup with hot water.\n2. Put 1 teaspoon (5 gram) raw Pu-erh tea chuck into teapot.\n3. Pour in boiling water and quickly dispose tea water. It helps to get better tea flavor and taste.\n4. Fill the container with boiling water.\n5. Let it infuse for 1 minute.\n6. For best flavor, enjoy Pu-erh tea when hot .\n\nTaste & Aroma:\n- Strong, bitter taste.\n- Rich and sweet after taste.\n\nTea liquid color: bright yellow\n\nOrigin: Yunnan Province, China.',
  staffPick: true,
}, {
  name: 'Tie guan yin',
  temperature: 95,
  time: 120,
  teaType: 'oolong tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'medium',
  coverImageUrl: {
    uri: 'tie-guan-yin',
    isStatic: true,
  },
  brewSteps: '1. Preheat the teapot/cup with hot water. \n2. Put 2 teaspoons of tea leaves into the teapot/cup.\n3. Fill the container with 95ºC (205ºF) water.\n4. Let it infuse for 2 minutes (increase / decrease the time based on your preference).\n5. Enjoy!\n\nTaste & Aroma:\n- Flowery & warm taste.\n- Refreshing orchid aroma.\n\nTea liquid color: golden yellow, light brown.\n\nOrigin: Fujian Province, China.',
  staffPick: true,
},{
  name: 'Lapsang Souchong',
  temperature: 90,
  time: 120,
  teaType: 'black tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'high',
  coverImageUrl: {
    uri: 'placeholder',
    isStatic: true,
  },
  brewSteps: 'Lapsang Souchong is the arliest and one of the most expensive black tea in the world.\n\n1. Preheat the teapot/cup with hot water. \n2. Put 1 teaspoon (5 gram) of tea leaves into the teapot/cup.\n3. Fill the container with 90ºC (194ºF) water.\n4. Let it infuse for 30 seconds.\n5. First 4 infusions should last less than 45 seconds. Later, it can be extended to 60 seconds.\n\nTaste & Aroma:\n- Sweet, smooth and longan taste.\n- Smokey pine aroma.\n\nTea liquid color: light red & brown.\n\nOrigin: Fujian Province, China.',
  staffPick: true,
}, {
  name: 'Bi Luo Chun green tea',
  temperature: 80,
  time: 60,
  teaType: 'green tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'high',
  coverImageUrl: {
    uri: 'placeholder',
    isStatic: true,
  },
  brewSteps: '*Tall glass cups (7 oz) are recommended for preparing Bi Luo Chun.\n\n1. Preheat the glass with hot water. \n2. Fill the glass cup with 200 ml (6.5 oz), 80ºC (176ºF) water.\n2. Put 1 teaspoon (5 gram) tea leaves into water.\n3. Wait until see tea leaves floating to the bottom of cup.\n4. For best taste, have a sip when enjoying your tea.\n\nTaste & Aroma:\n- Sweet, smooth and mint-like taste.\n- Fruity & floral aroma.\n\nTea liquid color: clear, light yellow\n\nOrigin: Jiangsu Province, China.',
  staffPick: true,
}, {
  name: 'Dragon Well',
  temperature: 80,
  time: 45,
  teaType: 'green tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'medium',
  coverImageUrl: {
    uri: 'dragon-well',
    isStatic: true,
  },
  brewSteps: '*Tall glass cups (7 oz) are recommended for preparing Dragon Well.\n\n1. Fill the glass cup with 200 ml (6.5 oz), 80ºC (176ºF) water.\n2. Put 1 teaspoon (5 gram) tea leaves into water.\n3. Wait until you see tea leaves are extended, floating up and down in the water.\n5. No need to filter tea leaves out of the tea liquid.\n6. Remain tea leaves in the water. Enjoy your tea!\n\nTaste & Aroma:\n- Fresh, gentle, orchid and sweet taste\n\nTea liquid color: light and clear yellow.\n\nOrigin: Zhejiang Province, China.',
  staffPick: true,
}, {
  name: 'Baihao Silver Needle white tea',
  temperature: 95,
  time: 180,
  teaType: 'white tea',
  teaFlavor: 'pure',
  teaCaffeineLevel: 'medium',
  coverImageUrl: {
    uri: 'placeholder',
    isStatic: true,
  },
  brewSteps: '1. Preheat the teapot/cup with hot water. \n2. Put 1 teaspoon (5 gram) of tea leaves into the teapot/cup.\n3. Fill the container with 5 oz, 95ºC (205ºF) water.\n4. Let it infuse for 3 minutes (increase / decrease the time based on your preference).\n5. Enjoy!\n\nTaste & Aroma:\n- Fresh taste and aroma.\n\nTea liquid color: clear green, light yellow.\n\nOrigin: Fujian Province, China.',
  staffPick: true,
},];

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
  "smokey",
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

export const TEA_TYPE = [
  "black tea",
  "oolong tea",
  "green tea",
  "white tea",
  "pu-erh",
  "matcha",
  "chai",
  "rooibos",
  "yerba mate",
  "iced tea",
  "fruit",
  "other",
];

export const TEA_FLAVOR = [
  "pure",
  "berry",
  "fruity",
  "mint",
  "floral",
  "dessert",
  "other",
];

export const TEA_CAFFEINE_LEVEL = [
  "high",
  "medium",
  "low",
  "caffeine free",
];

import { StyleSheet } from 'react-native';
import { STATUS_BAR_HEIGHT_IOS } from '../constants';

const position = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT_IOS,
    left: 10,
    zIndex: 5,
  },
  topRight: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT_IOS,
    right: 10,
    zIndex: 5,
  }
});

export default position;

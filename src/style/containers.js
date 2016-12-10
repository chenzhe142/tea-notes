import { StyleSheet } from 'react-native';

const containers = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
  },
});

export default containers;

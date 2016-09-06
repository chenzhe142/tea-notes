/**
 * CreateTea.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
 Dimensions,
 Image,
 ImagePickerIOS,
 ListView,
 Platform,
 ScrollView,
 StatusBar,
 StyleSheet,
 Text,
 TextInput,
 TouchableOpacity,
 TouchableWithoutFeedback,
 View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Button from '../components/Button.js';
import WithLabel from '../components/WithLabel.js';
import ItemPicker from '../components/ItemPicker.js';

import text from '../style/text.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const COVERIMAGE_HEIGHT = SCREEN_WIDTH / 3 * 2;
const CARD_OFFSET = 20;

export default class CreateTea extends Component {
  constructor(props) {
    super(props);

    this._onBack = this._onBack.bind(this);
    this._coverPhotoOnClick = this._coverPhotoOnClick.bind(this);
    this._showTemperaturePicker = this._showTemperaturePicker.bind(this);
    this._showTimePicker = this._showTimePicker.bind(this);
    this._dismissPicker = this._dismissPicker.bind(this);

    this.state = {
      teaCoverPhoto: {
        isSelected: false,
        source: null,
      },
      name: 'Name of Tea',
      temperature: '95',
      time: '180',
      showTemperaturePicker: false,
      showTimePicker: false,
    }
  };

  _onBack() {
    this.props.navigator.pop();
  }

  _coverPhotoOnClick() {
    const options = {
      title: 'Select Tea photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        const teaCoverPhoto = Object.assign({}, this.state.teaCoverPhoto);
        teaCoverPhoto.isSelected = true;
        teaCoverPhoto.source = source;

        this.setState({ teaCoverPhoto });
      }
    });
  }

  _showTemperaturePicker() {
    this.setState({
      showTemperaturePicker: true,
      showTimePicker: false,
    });
  }

  _showTimePicker() {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: true,
    });
  }

  _dismissPicker() {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
    });
  }

  render() {
    let teaCoverPhoto;
    if (this.state.teaCoverPhoto.isSelected) {
      teaCoverPhoto = <Image source={this.state.teaCoverPhoto.source} style={styles.coverImage}/>;
    } else {
      teaCoverPhoto = <Image source={require('../../public/image/photo_placeholder.png')} style={styles.coverImage} />;
    }

    let footer;
    if (this.state.showTemperaturePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker values={['75','80','85','90','95']} dismissPicker={this._dismissPicker} textStyle={text.p} />
              </View>;
    } else if (this.state.showTimePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker values={['60','70','80','90','100', '110', '120', '130']} dismissPicker={this._dismissPicker} textStyle={text.p} />
              </View>;
    } else {
      footer = <View style={styles.stickyFooter}>
                <Button btnText="Save" style={{backgroundColor: 'rgb(148,235,95)'}} />
              </View>;
    }

    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.container, {backgroundColor: 'white', height: SCREEN_HEIGHT}]}>
            <View>
              <TouchableWithoutFeedback onPress={this._coverPhotoOnClick}>
                {teaCoverPhoto}
              </TouchableWithoutFeedback>

              <View style={[styles.backBtn, {backgroundColor: 'rgba(0,0,0,0)'}]}>
                <TouchableOpacity onPress={this._onBack}>
                  <Text style={text.p}>close</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.teaCard}>
                <View style={styles.teaCardContainer}>
                  <View>
                    <TextInput
                      value={this.state.name}
                      style={[text.title, styles.teaCard_title, styles.inputBox]}
                      onChangeText={(name) => this.setState({ name })}
                    />
                  </View>

                  <View>
                    <Text style={[text.p, color.gray]}>green tea - mild - low caffeine</Text>
                  </View>

                </View>
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 10 + CARD_OFFSET}}>
              <Text style={[text.p, color.gray]}>tap to see in different units of measurements</Text>
            </View>

            <View>
              <View style={[styles.row, {marginTop: 10, marginBottom: 10, backgroundColor: 'white'}]}>
                <View>
                  <WithLabel label="🎚" textStyle={text.p} showPicker={this._showTemperaturePicker}>
                    <Text
                      style={[text.number, styles.teaCard_data]}
                    >
                      {this.state.temperature}
                    </Text>
                  </WithLabel>
                </View>
                <View>
                  <WithLabel label="⏳" textStyle={text.p} showPicker={this._showTimePicker}>
                    <Text
                      style={[text.number, styles.teaCard_data]}
                    >
                      {this.state.time}
                    </Text>
                  </WithLabel>
                </View>
              </View>
            </View>
            <View style={[styles.container]}>
              <Text>How to brew</Text>
            </View>
          </View>
        </ScrollView>
        {footer}
      </View>
    );
  }
}

const color = StyleSheet.create({
  black: {
    color: 'black',
  },
  gray: {
    color: 'rgb(102,102,102)',
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backBtn: {
    left: 0,
    position: 'absolute',
    top: 0,
  },
  coverImage: {
    height: COVERIMAGE_HEIGHT,
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
  },
  teaCard: {
    position: 'absolute',
    bottom: -CARD_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  teaCardContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: COVERIMAGE_HEIGHT * 0.4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.5,
    borderRadius: 2,
  },
  teaCard_title: {
    width: SCREEN_WIDTH * 0.8,
    textAlign: 'center',

    // text input height
    height: 40,
  },
  teaCard_data: {
    textAlign: 'left',
    width: 50,
    textAlignVertical: 'center',
  },
  inputBox: {
    borderWidth: 0,
    textAlignVertical: 'center',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

const listBackgroundColors = {
  1: '#74B9FF',
  2: '#0A79DF',
  3: '#67E6DC',
  4: '#616C6F',
  5: '#4C4B4B',
  6: '#A4B0BD',
  7: '#2C3335',
  8: '#777E8B',
  9: '#535C68',
  10: '#E74292'
};

const soundList = {
  one: require('./assets/one.wav'),
  two: require('./assets/two.wav'),
  three: require('./assets/three.wav'),
  four: require('./assets/four.wav'),
  five: require('./assets/five.wav'),
  six: require('./assets/six.wav'),
  seven: require('./assets/seven.wav'),
  eight: require('./assets/eight.wav'),
  nine: require('./assets/nine.wav'),
  ten: require('./assets/ten.wav')
};

export default class App extends Component {
  // todo: funcation to play sound

  playSound = async number => {
    const soundObject = new Audio.Sound();

    try {
      let path = soundList[number];
      await soundObject.loadAsync(path);
      await soundObject
        .playAsync()
        .then(async playbackStatus => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                { backgroundColor: listBackgroundColors[1] },
                styles.item
              ]}
              onPress={() => {
                this.playSound('one');
              }}
            >
              <Text style={styles.itemText}>One</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridContainer: {
    flex: 1,
    margin: 5
  },
  logo: {
    alignSelf: 'center',
    marginTop: 15
  },
  rowContainer: {
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  },
  itemText: {
    color: '#FFF',
    fontSize: 20
  }
});

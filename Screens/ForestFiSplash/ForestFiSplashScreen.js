import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ForestFiSplashScreen = ({navigation}) => {
  const value = useState(
    new Animated.ValueXY({
      x: windowWidth / 2 - (windowHeight * 0.19) / 2,
      y: windowHeight,
    }),
  )[0];

  const valueFor = useState(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    }),
  )[0];

  const valueRat = useState(
    new Animated.ValueXY({
      x: 0,
      y: windowHeight,
    }),
  )[0];

  const [animate, setAnimate] = useState(false);
  function moveCircle() {
    Animated.timing(value, {
      toValue: {
        x: windowWidth / 2 - (windowHeight * 0.19) / 2,
        y: windowHeight / 2 - (windowHeight * 0.3) / 2,
      },
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function moveFor() {
    Animated.timing(valueFor, {
      toValue: {
        x: 0,
        y: -windowHeight,
      },
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function moveRat() {
    Animated.timing(valueRat, {
      toValue: {
        x: 0,
        y: 0,
      },
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setAnimate(true);
        moveCircle();
        moveFor();
        moveRat();
        setTimeout(() => {
          navigation.replace('LangSelection');
        }, 1000);
      }}>
      {/* Import image */}
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo/forestfi.png')}
          style={styles.image}
          resizeMode="contain"
        />
        {/* <Text style={styles.text}>ForestFi</Text> */}
        <Animated.View
          style={[
            {
              transform: valueFor.getTranslateTransform(),
            },
          ]}>
          <Text style={styles.text}>ForestFi</Text>
        </Animated.View>
        <Animated.View
          style={[styles.circle, {transform: value.getTranslateTransform()}]}
        />
        <Animated.View
          style={[
            {
              transform: valueRat.getTranslateTransform(),
            },
          ]}>
          <Text style={styles.textRat}>RatiFi</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForestFiSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7416',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.25,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
  },
  textRat: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
    marginTop: -windowHeight * 0.05,
  },
  circle: {
    width: windowHeight * 0.19,
    height: windowHeight * 0.19,
    borderRadius: (windowHeight * 0.19) / 2,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

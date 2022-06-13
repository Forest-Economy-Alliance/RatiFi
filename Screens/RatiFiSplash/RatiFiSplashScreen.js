import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const ForestFiSplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LangSelection');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      {/* Import image */}
      <Image
        source={require('../../assets/logo/ratifi.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>RatiFi</Text>
    </View>
  );
};

export default ForestFiSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '35%',
    height: '25%',
    // backgroundColor: '#000000',
  },
  text: {
    color: '#4F7416',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
  },
});

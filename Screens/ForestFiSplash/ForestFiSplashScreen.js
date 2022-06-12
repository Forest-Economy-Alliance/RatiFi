import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const ForestFiSplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigate to next screen
      navigation.navigate('RatiFiSplash');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      {/* Import image */}
      <Image
        source={require('../../assets/logo/forestfi.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>ForestFi</Text>
    </View>
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
    width: '25%',
    height: '25%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Roboto-Light',
  },
});

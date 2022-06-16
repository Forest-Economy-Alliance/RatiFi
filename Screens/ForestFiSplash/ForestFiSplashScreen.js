import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getDeviceHash} from '../../utils/DeviceUtil';

const ForestFiSplashScreen = ({navigation}) => {
  // const loading = useSelector(state => state);
  // console.log(loading);
  // console.log('LOADING', loading);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({type: 'DISABLE_LOADING'});
    const fetchDD = async () => {
      const DD = await getDeviceHash();
      console.log('HERE', typeof DD);
      // dispatch({type: 'SAVE_DD', payload: DD});
    };

    fetchDD();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      // navigate to next screen
      navigation.replace('RatiFiSplash');
    }, 1000);
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

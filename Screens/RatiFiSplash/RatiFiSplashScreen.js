import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const ForestFiSplashScreen = ({navigation}) => {
  const {registrationScreenCode, loading} = useSelector(
    state => state.entities.appUtil.appUtil,
  );
  // const {token} = useSelector(state => state.entities.auth.userInfo);

  useEffect(() => {
    setTimeout(() => {
      if (registrationScreenCode == 0) navigation.replace('LangSelection');
      else if (registrationScreenCode === 1) navigation.replace('NamePhone');
      else if (registrationScreenCode === 2) navigation.replace('Password');
      else if (registrationScreenCode === 3)
        navigation.replace('LocationInformation');
      else if (registrationScreenCode === 4)
        navigation.replace('RoleInformation');
      else if (registrationScreenCode === 5) {
        navigation.replace('DownloadPDF');
      }
    }, 1500);
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

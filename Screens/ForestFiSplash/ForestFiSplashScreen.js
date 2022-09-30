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
import { useDispatch, useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ForestFiSplashScreen = ({navigation}) => {
  const dispatch=useDispatch();
  dispatch({type: 'DISABLE_LOADING'});
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



  const {registrationScreenCode, loading} = useSelector(
    state => state.entities.appUtil.appUtil,
  );
  const {token} = useSelector(state => state.entities.auth.userInfo);
  
  useEffect(() => {
    
    setTimeout(() => {
      //assuiming if created user, then he will finish regiration completely
      //  without application break, more cases can be handled

      if (registrationScreenCode === 2 && !token) {
        return navigation.replace('Password', {
          login: false,
        });
      }

      if (token) {
        return navigation.replace('LoginPassword', {
          login: true,
        });
      }

      console.log("SEFSEDF",registrationScreenCode)
      if(!token && registrationScreenCode===5){
        navigation.replace("NamePhone")
        return ;
      }
     
      if (registrationScreenCode == 0) navigation.replace('LangSelection');
      else if (registrationScreenCode === 1) navigation.replace('NamePhone');
      else if (registrationScreenCode === 2) navigation.replace('Password');
      else if (registrationScreenCode === 3)
        navigation.replace('Location');
      else if (registrationScreenCode === 4)
        navigation.replace('Role');
      else if (registrationScreenCode === 5) {
        navigation.replace('DownloadPDF');
      }
    }, 1500);
  }, []);


  // React.useEffect(()=>{

  //       setTimeout(() => {
  //       setAnimate(true);
  //       moveCircle();
  //       moveFor();
  //       moveRat();


  //           // some logic here 

  //         navigation.replace('LangSelection');


  //       }, 1000);
  // },[])


  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo/forestfi.png')}
          style={styles.image}
          resizeMode="contain"
        />
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

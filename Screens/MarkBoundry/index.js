import React, { useEffect } from 'react';
import {Button, ImageBackground, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CustomButton from '../../components/CustomButton';
const BG_IMG_PATH = require('../../assets/images/background.png');

export const MarkBoundry = () => {


    // ask for geolocation 


    useEffect(()=>{

        // 




    },[])













  return(<ImageBackground
    source={BG_IMG_PATH}
    resizeMode="cover"
    blurRadius={10}
    style={{height: '100%', width: '100%'}}>
    <View style={{padding: 10}}>
      <MapView 
       provider={PROVIDER_GOOGLE}
       maxZoomLevel={14}
       showsMyLocationButton={true}
       initialRegion={{
        latitude: 17.4347,
        longitude: 78.3459,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation
      followsUserLocation
      style={{height: '90%', width: '100%'}} />
      <View style={{height: '5%'}}>
        <CustomButton
        
          text="Mark Boudnray"
          onPress={() => {}}
          style={{marginVertical: 10}}
        />
      </View>
    </View>
  </ImageBackground>)
};

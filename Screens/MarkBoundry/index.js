import React, {useEffect, useState} from 'react';
import {Button, Image, ImageBackground, Text, View} from 'react-native';
import MapView, {LocalTile, Marker, PROVIDER_GOOGLE, Polyline, UrlTile} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {patchClaimFieldsIFRHandler, patchTripArrayIFRHandler} from '../../services/claimService';
const BG_IMG_PATH = require('../../assets/images/background.png');

export const MarkBoundry = () => {
  const {profile} = useSelector(state => state.entities.auth.userInfo);

  const dispatch = useDispatch();
  // ask for geolocation
  const navigation = useNavigation();
  const [isTripStarted, setI] = useState(false);
  const [bit, setBit] = React.useState(false);

  const [userLocation, setUserLocation] = useState({
    latitude: 23.4243415,
    longitude: 85.3467311,
  });
  const [userPath, setUserPath] = useState([]);

  useEffect(() => {
    //
    if (isTripStarted) {
      const timer = setTimeout(() => {
        Geolocation.getCurrentPosition(info => {
          const lat = info?.coords?.latitude;
          const lng = info?.coords?.longitude;
          console.log('lat->', lat);
          console.log('lng->', lng);
          setUserLocation({
            latitude: lat,
            longitude: lng,
          });

          let prev = [...userPath];

          if (userPath?.length !== 0) {
            const lastCoordinateLat = prev[prev?.length - 1]?.latitude;
            const lastCoordinateLng = prev[prev?.length - 1]?.longitude;

            // if (lastCoordinateLat !== lat || lastCoordinateLng !== lng) {
              prev.push({latitude: lat, longitude: lng});
       
              console.log(userPath);
              setUserPath(prev);
            // }
          } else {
             console.log(prev);
             prev.push({latitude: lat, longitude: lng});

            setUserPath(prev);
          }

          setBit(e => !e);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [bit, isTripStarted]);


  useEffect(()=>{


    Geolocation.getCurrentPosition(info => {
      const lat = info?.coords?.latitude;
      const lng = info?.coords?.longitude;
      console.log('lat->', lat);
      console.log('lng->', lng);
      setUserLocation({
        latitude: lat,
        longitude: lng,
      });
    })


  },[])


  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={{height: '100%', width: '100%'}}>
      {userLocation?.latitude && (
        <View
          style={{
            padding: 10,
            borderWidth: 7,
            borderColor: isTripStarted ? 'blue' : 'transparent',
          }}>
         
          <MapView

          // cacheEnabled
            mapType='hybrid'
            provider={PROVIDER_GOOGLE}
            maxZoomLevel={28}
            minZoomLevel={12}
            // showsMyLocationButton={true}
            initialRegion={{
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // // showsUserLocation
            // followsUserLocation
            style={{
              height: '90%',
              width: '100%',
            }}
            >

              {/* <LocalTile

              />

              <UrlTile
    urlTemplate="https://api.mapbox.com/v4/mapbox.satellite/14/8919/5843@2x.jpg90?access_token=API_KEY"
    zIndex={-1}
    tileCachePath={'/data/user/0/com.awesomeProject/files/mapTiles'}
  /> */}
            <Marker coordinate={userLocation}></Marker>
            <Polyline
              strokeWidth={5}
              strokeColor="green"
              coordinates={userPath}
            />
          </MapView>

          <View style={{marginTop: '5%'}}>
            {!isTripStarted ? (
              <CustomButton
                onPress={() => {
                  setI(true);
                }}>
                <Text>प्रारंभ करें</Text>
              </CustomButton>
            ) : (
              <CustomButton
                onPress={() => {
                  console.log(userPath);

                  dispatch({type: 'ENABLE_LOADING'});
                  setI(false);

                  patchClaimFieldsIFRHandler({
                    boundary: userPath,
                    claimId: profile?.IFRclaims[profile?.IFRclaims?.length - 1],
                  })
                    .then(res => {
                      console.log('SUCCESS', res);
                      navigation.replace('PastRecordsIFR')
                    })
                    .catch(err => {
                      console.error('error', err);
                    })
                    .finally(f => {
                      dispatch({type: 'DISABLE_LOADING'});
                    });
                  // mark trip as complete
                  // update the data to server
                  // navigate to back screen with a button approval
                  // send the recipt
                  
                }}>
                <Text>सीमा पूर्ण</Text>
              </CustomButton>
            )}
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

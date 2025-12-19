import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  Text,
  View,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { DeviceEventEmitter } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const BG_IMG_PATH = require('../../assets/images/background.png');

export const APCFRMarkBoundry = () => {
  const { profile } = useSelector(state => state.entities.auth.userInfo);
  const route = useRoute();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [isTripStarted, setI] = useState(false);
  const [bit, setBit] = React.useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState(null);

  const { t } = useTranslation();
  const appTranslation = t('app');
  
  // Check if this is custom boundary mode from DownloadPDF
  const isCustomBoundaryMode = route.params?.mode === 'customBoundary';
  const returnScreen = route.params?.returnScreen;

  const [userLocation, setUserLocation] = useState({
    latitude: 23.4243415,
    longitude: 85.3467311,
  });
  const [userPath, setUserPath] = useState([]);

  useEffect(() => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>JharFRA</h2> <b style='color:red;'> कृपया लोकेशन बटन ऑन करे </b><br/><br/>",
      ok: 'YES',
      cancel: 'NO',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });

    DeviceEventEmitter.addListener(
      'locationProviderStatusChange',
      function (status) {
        // only trigger when "providerListener" is enabled
        console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
      },
    );
  }, []);

  useEffect(() => {
    if (isTripStarted) {
      const timer = setTimeout(() => {
        let prev = [...userPath];

        if (userPath?.length !== 0) {
          prev.push({
            latitude: userLocation?.latitude,
            longitude: userLocation.longitude,
          });

          console.log('userPath', userPath);
          console.log('prev--->', prev);
          setUserPath(prev);
        } else {
          console.log(prev);
          prev.push({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
          });

          setUserPath(prev);
        }

        setBit(e => !e);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [bit, isTripStarted]);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const lat = info?.coords?.latitude;
      const lng = info?.coords?.longitude;
      console.log('lat->', lat);
      console.log('lng->', lng);

      const REGION = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0042,
        longitudeDelta: 0.0021,
      };

      mapRef.current.animateToRegion(REGION, 2000);
      setUserLocation({
        latitude: lat,
        longitude: lng,
      });
    });
  }, []);

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={{ height: '100%', width: '100%' }}
    >
      {userLocation?.latitude && (
        <View
          style={{
            padding: 10,
            borderWidth: 7,
            borderColor: isTripStarted ? 'yellow' : 'transparent',
          }}
        >
          <MapView
            ref={mapRef}
            onUserLocationChange={event => {
              console.log(
                'Accuracy----->>>>>>>',
                event.nativeEvent.coordinate.accuracy,
              );
              setLocationAccuracy(event.nativeEvent.coordinate.accuracy);

              setUserLocation({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
            }}
              mapType="hybrid"
              provider={PROVIDER_GOOGLE}
              maxZoomLevel={20}
              minZoomLevel={10}
              zoomEnabled={true}
              zoomControlEnabled={true}
              scrollEnabled={true}
              pitchEnabled={true}
              rotateEnabled={true}
              initialRegion={{
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0021,
              }}
              showsUserLocation
              showsMyLocationButton
              followsUserLocation
              style={{
                height: '60%',
                width: '100%',
              }}
            >
              <Polyline
                strokeWidth={2}
                lineDashPhase={'round'}
                strokeColor="red"
                coordinates={userPath}
              />
            </MapView>

          {/* Controls Section */}
          <View style={{ height: '40%', paddingTop: 15 }}>
            {/* Status Card */}
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: 15,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 2,
                borderColor: isTripStarted ? '#FFC107' : '#4CAF50',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 8,
                }}
              >
                {isTripStarted ? `🟡 ${appTranslation.boundary_tracking_active}` : `🟢 ${appTranslation.ready_to_start}`}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  textAlign: 'center',
                }}
              >
                {appTranslation.gps_accuracy}: {Math.trunc(locationAccuracy || 0)} {appTranslation.meteres}
              </Text>
              {isTripStarted && (
                <Text
                  style={{
                    color: '#FFC107',
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: 5,
                    fontWeight: '600',
                  }}
                >
                  {appTranslation.points_recorded}: {userPath.length}
                </Text>
              )}
            </View>

            {/* Action Button */}
            {!isTripStarted ? (
              <CustomButton
                onPress={() => {
                  console.log('Starting boundary tracing...');
                  setUserPath([]); // Clear any previous path
                  setI(true);
                }}
                button={{
                  backgroundColor: '#4CAF50',
                  paddingVertical: 15,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  🚀 {appTranslation.start_tracking}
                </Text>
              </CustomButton>
            ) : (
              <CustomButton
                onPress={() => {
                  console.log('Boundary completed');
                  console.log('User traced path:', userPath);
                  console.log('Total points:', userPath.length);
                  
                  setI(false);
                  
                  // Navigate back to DownloadPDF with user coordinates
                  navigation.navigate('DownloadPDF', {
                    userCoords: userPath
                  });
                }}
                button={{
                  backgroundColor: '#2196F3',
                  paddingVertical: 15,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  ✅ {appTranslation.complete_and_return}
                </Text>
              </CustomButton>
            )}

            {/* Instructions */}
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: 12,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: '#333',
                  fontSize: 13,
                  textAlign: 'center',
                  lineHeight: 18,
                }}
              >
                {isTripStarted
                  ? `🚶‍♂️ ${appTranslation.walk_along_boundary}`
                  : `ℹ️ ${appTranslation.press_start_and_walk}`}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

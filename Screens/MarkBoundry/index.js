import React, {useEffect, useRef, useState} from 'react';
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
  LocalTile,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
  UrlTile,
} from 'react-native-maps';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';
import queue from 'react-native-job-queue';
import Geolocation from '@react-native-community/geolocation';
// import {isLocationEnabled, promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {Platform} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {useLinkTo, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  patchClaimFieldsIFRHandler,
  patchClaimHandlerIFR,
  patchTripArrayIFRHandler,
} from '../../services/claimService';

import {BackHandler, DeviceEventEmitter} from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {Queue} from 'react-native-job-queue';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useToast} from 'react-native-toast-notifications';
import {useTranslation} from 'react-i18next';
import {err} from 'react-native-svg/lib/typescript/xml';
import {VasernDB} from '../../vasern';

const BG_IMG_PATH = require('../../assets/images/background.png');

export const MarkBoundry = () => {
  const {IFRBoundaries} = VasernDB;
  const toast = useToast();
  const {t} = useTranslation();
  const {profile, claim} = useSelector(state => state.entities.auth.userInfo);

  const dispatch = useDispatch();
  // ask for geolocation
  const mapRef = useRef(null);
  const viewShotRef = useRef(null);
  const navigation = useNavigation();
  const [isTripStarted, setI] = useState(false);
  const [bit, setBit] = React.useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState(null);
  const [snappshot, setSnapshot] = useState(null);
  const [base64String, setBase64ImageString] = useState(null);
  const [finalState, setFinalState] = useState([]);

  // const calculateBoundingBox = coordinates => {
  //   if(coordinates?.length!==0){
  //   let minLat = coordinates[0]?.latitude || 0;
  //   let maxLat = coordinates[0]?.latitude || 0;
  //    let minLng = coordinates[0]?.longitude || 0;
  //    let maxLng = coordinates[0]?.longitude || 0;

  //    coordinates?.forEach(coord => {
  //      minLat = Math.min(minLat, coord.latitude);
  //      maxLat = Math.max(maxLat, coord.latitude);
  //      minLng = Math.min(minLng, coord.longitude);
  //      maxLng = Math.max(maxLng, coord.longitude);
  //    });
  //    return {
  //      latitude: (minLat + maxLat) / 2,
  //      longitude: (minLng + maxLng) / 2,
  //      latitudeDelta: maxLat - minLat + 0.001, // Add some padding to the region
  //      longitudeDelta: maxLng - minLng + 0.001,
  //    };
  //   }
  //   return {
  //     latitude:0,
  //     longitude:0,
  //     latitudeDelta:0,
  //     longitudeDelta:0
  //   }
  //  };
  // const polygonRegion = calculateBoundingBox(userPath);

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
    //
    if (isTripStarted) {
      const timer = setTimeout(() => {
        let prev = [...userPath];

        if (userPath?.length !== 0) {
          const lastCoordinateLat = prev[prev?.length - 1]?.latitude;
          const lastCoordinateLng = prev[prev?.length - 1]?.longitude;

          // if (lastCoordinateLat !== lat || lastCoordinateLng !== lng) {
          prev.push({
            latitude: userLocation?.latitude,
            longitude: userLocation.longitude,
          });

          console.log(userPath);
          setUserPath(prev);
          // }
        } else {
          console.log(prev);
          prev.push({
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
          });

          setUserPath(prev);
        }

        setBit(e => !e);
        // setBit(e => !e);
        // });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [bit, isTripStarted]);

  // const checkLocationPerm = async () => {
  //   if (Platform.OS === 'android') {
  //     const checkEnabled = await isLocationEnabled();
  //     console.log('checkEnabled', checkEnabled);
  //     if (checkEnabled === false) {
  //       try {
  //         const enableResult = await promptForEnableLocationIfNeeded();
  //         console.log('enableResult', enableResult);
  //       } catch (error) {
  //         console.error('ERR', error?.message);
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    // checkLocationPerm();

    Geolocation.getCurrentPosition(info => {
      const lat = info?.coords?.latitude;
      const lng = info?.coords?.longitude;
      console.log('lat->', lat);
      console.log('lng->', lng);

      const REGION = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      mapRef.current.animateToRegion(REGION, 2000);
      setUserLocation({
        latitude: lat,
        longitude: lng,
      });
    });
  }, []);

  // Geolocation.watchPosition(info => {
  //   const lat = info?.coords?.latitude;
  //   const lng = info?.coords?.longitude;
  //   console.log('lat->', lat);
  //   console.log('lng->', lng);
  //   setUserLocation({
  //     latitude: lat,
  //     longitude: lng,
  //   });
  // });

  useEffect(() => {}, []);

  const convertImageToBase64 = async uri => {
    try {
      console.log('converting base64 ....');
      RNFS.readFile(uri, 'base64').then(res => {
        // console.log('BASE64======>', res);
        setBase64ImageString(res);
        getGCPUrlImageHandler({
          fileName: 'Hello',
          base64Data: res,
          isPdf: false,
          userId: profile?._id || 'unknown-asset',
        })
          .then(async ({data}) => {
            console.log('RESPONSE', data.response.Key);

            console.warn('CID', claim?._id);

            const rssponse = await patchClaimHandlerIFR({
              claimId: profile?.IFRclaims[profile?.IFRclaims.length - 1],
              title: 'SDM_SUMMON_RESULT_8',
              storageUrl: data.response.Location,
            });

            if (data.response.Location && rssponse) {
              toast.show(t('FILE_UPLOADED'), {
                type: 'success',
                animationType: 'zoom-in',
                successColor: '#480E09',
                placement: 'top',
                duration: 5000,
              });
              // navigation.goBack();

              // dispatch({type: 'DISABLE_LOADING'});
              dispatch({type: 'DISABLE_LOADING'});

              navigation.goBack();
            } else {
              toast.show(t('UPLOAD_FAILED'), {
                type: 'failure',
                animationType: 'zoom-in',
                successColor: '#480E09',
                placement: 'top',
                duration: 5000,
              });

              // dispatch({type: 'DISABLE_LOADING'});
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const captureSnapshot = () => {
    // fitMapToPolyline();
    // setFinalState(polygonRegion)
    // mapRef.current.animateToRegion(
    //   polygonRegion,100);
    console.log('capturing....', viewShotRef.current);
    if (viewShotRef.current) {
      // setTimeout(()=>{

      viewShotRef?.current?.capture().then(async uri => {
        setSnapshot(uri);

        // queue.addJob('testWorker', {
        //   localPath: uri,
        //   userId: profile?._id,
        //   docName: 'NEW',
        //   claimId: claim?._id?.toString(),
        //   shouldTriggerJointVerification: false,
        //   IS_IFR_CLAIM: true,
        // });

        await convertImageToBase64(uri);

        // console.log base64
      });

      // return <IMG+URL>
      // },1000)
    }
  };

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={{height: '100%', width: '100%'}}>
      {/* {base64String && (
        <Image
          source={{
            uri: `data:image/png;base64,${base64String}`,
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      )} */}
      {userLocation?.latitude && (
        <View
          style={{
            padding: 10,
            borderWidth: 7,
            borderColor: isTripStarted ? 'yellow' : 'transparent',
          }}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.8}}>
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

                // @update in varsen db
                if (isTripStarted) {
                  const tt = IFRBoundaries.insert({
                    userPath: userPath,
                    claimId: profile?.IFRclaims[profile?.IFRclaims?.length - 1],
                  });
                  console.warn(tt);
                }
              }}
              // onMapReady={() => {
              //   PermissionsAndroid.request(
              //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              //   ).then(granted => {
              //     // alert(granted) // just to ensure that permissions were granted
              //   });
              // }}
              // cacheEnabled
              mapType="hybrid"
              provider={PROVIDER_GOOGLE}
              maxZoomLevel={28}
              minZoomLevel={17}
              zoomControlEnabled
              // showsMyLocationButton={true}
              initialRegion={{
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation
              showsMyLocationButton
              followsUserLocation
              style={{
                height: '90%',
                width: '100%',
              }}>
              {/* <LocalTile

              />

              <UrlTile
    urlTemplate="https://api.mapbox.com/v4/mapbox.satellite/14/8919/5843@2x.jpg90?access_token=API_KEY"
    zIndex={-1}
    tileCachePath={'/data/user/0/com.awesomeProject/files/mapTiles'}
  /> */}

              <Polyline
                strokeWidth={2}
                lineDashPhase={'round'}
                strokeColor="red"
                // lineDashPattern={[10]}
                coordinates={userPath}
              />
            </MapView>
          </ViewShot>
          <View style={{marginTop: '5%'}}>
            {!isTripStarted ? (
              <>
                <CustomButton
                  onPress={async () => {
                    const rs = await IFRBoundaries.removeAllRecords();
                    console.warn('rs', rs);
                    setI(true);
                  }}>
                  <Text>प्रारंभ करें</Text>
                </CustomButton>
              </>
            ) : (
              <CustomButton
                onPress={async () => {
                  console.log(userPath);
                  try {
                    dispatch({type: 'ENABLE_LOADING'});
                    setI(false);

                    patchClaimFieldsIFRHandler({
                      boundary: userPath,
                      claimId:
                        profile?.IFRclaims[profile?.IFRclaims?.length - 1],
                      boundaryImageUrl: 'S3 URL',
                    })
                      .then(async res => {
                        setI(false);
                        const img = await captureSnapshot();
                        console.log('SUCCESS');
                      })
                      .catch(err => {
                        console.error('error', err);
                      })
                      .finally(f => {});
                    // mark trip as complete
                    // update the data to server
                    // navigate to back screen with a button approval
                    // send the recipt
                  } catch (error) {
                    console.error('error', error);
                  }
                }}>
                <Text>सीमा पूर्ण</Text>
              </CustomButton>
            )}
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                bottom: 60,
                left: '20%',
                right: '20 %',
              }}>
              स्थान की सटीकता लगभग {Math.trunc(locationAccuracy)} मीटर है।
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

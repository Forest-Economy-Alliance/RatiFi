import React, {useState, useRef,useEffect, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Image,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const BG_IMG_PATH = require('../../assets/images/background.png');
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot';
const {height, width} = Dimensions.get('window');

import CustomButton from '../../components/CustomButton';

function ViewwMap() {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const viewShotRef = useRef(null);
  const mapRef = useRef(null);
  const [snappshot, setSnapshot] = useState(null);
  const [base64String, setBase64ImageString] = useState(null);
  const [finalState,setFinalState] = useState([]);
  // const [base64Image, setBase64Image] = useState(null);
  const goBack = () => {
    // Move to RoleScreen
    navigation.navigate('HomeScreenIFR');
  };
  console.log("base64--------------------------------------------",base64String)
  const convertImageToBase64 = async uri => {
    try {
      console.log("converting base64 ....")
      RNFS.readFile(uri, 'base64').then(res => {
        setBase64ImageString(res);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };
  const captureSnapshot = () => {
    // fitMapToPolyline();
    setFinalState(polygonRegion)
    mapRef.current.animateToRegion(
      polygonRegion,100);
    console.log('capturing....');
    if (viewShotRef.current) {
      setTimeout(()=>{
        viewShotRef.current.capture().then(uri => {
          setSnapshot(uri);
          convertImageToBase64(uri)
        });
      },1000)
    }
  };
  console.log('snapc=shot------------>>>>>>>>>', snappshot);

   const cordsArray = [
    {
      "latitude": "17.43084982",
      "longitude": "78.32327473",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39aca"
      }
    },
    {
      "latitude": "17.43084982",
      "longitude": "78.32327473",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39acb"
      }
    },
    {
      "latitude": "17.43066749",
      "longitude": "78.3230679",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39acc"
      }
    },
    {
      "latitude": "17.43047586",
      "longitude": "78.32286886",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39acd"
      }
    },
    {
      "latitude": "17.43028516",
      "longitude": "78.32266882",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ace"
      }
    },
    {
      "latitude": "17.43009482",
      "longitude": "78.32246841",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39acf"
      }
    },
    {
      "latitude": "17.42990462",
      "longitude": "78.32226785",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad0"
      }
    },
    {
      "latitude": "17.4297145",
      "longitude": "78.32206721",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad1"
      }
    },
    {
      "latitude": "17.42952438",
      "longitude": "78.32186657",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad2"
      }
    },
    {
      "latitude": "17.4293344",
      "longitude": "78.32166578",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad3"
      }
    },
    {
      "latitude": "17.42914472",
      "longitude": "78.32146469",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad4"
      }
    },
    {
      "latitude": "17.42915776",
      "longitude": "78.32144579",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad5"
      }
    },
    {
      "latitude": "17.42939022",
      "longitude": "78.32158926",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad6"
      }
    },
    {
      "latitude": "17.42962904",
      "longitude": "78.32172078",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad7"
      }
    },
    {
      "latitude": "17.42999206",
      "longitude": "78.32190753",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad8"
      }
    },
    {
      "latitude": "17.43023827",
      "longitude": "78.32202315",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ad9"
      }
    },
    {
      "latitude": "17.43044739",
      "longitude": "78.32219192",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39ada"
      }
    },
    {
      "latitude": "17.43053337",
      "longitude": "78.32245717",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39adb"
      }
    },
    {
      "latitude": "17.43067791",
      "longitude": "78.32269594",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39adc"
      }
    },
    {
      "latitude": "17.43075042",
      "longitude": "78.32281517",
      "_id": {
        "$oid": "65316fb4d4ca5c0dc8d39add"
      }
    }
  ]

  const newArray=[];
 cordsArray.map((item)=>{
   newArray.push({
    latitude:parseFloat(item.latitude),
    longitude:parseFloat(item.longitude)
   })
 })
 console.log(newArray,"newARry--------------------------------------------")
 const calculateBoundingBox = coordinates => {
   let minLat = coordinates[0].latitude;
   let maxLat = coordinates[0].latitude;
    let minLng = coordinates[0].longitude;
    let maxLng = coordinates[0].longitude;

    coordinates.forEach(coord => {
      minLat = Math.min(minLat, coord.latitude);
      maxLat = Math.max(maxLat, coord.latitude);
      minLng = Math.min(minLng, coord.longitude);
      maxLng = Math.max(maxLng, coord.longitude);
    });
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: maxLat - minLat + 0.001, // Add some padding to the region
      longitudeDelta: maxLng - minLng + 0.001,
    };
  };
 
  const polygonRegion = calculateBoundingBox(cordsArray);
 
  console.log(cordsArray[0]);

  useEffect(()=>{
    const polygonRegion = calculateBoundingBox(cordsArray);
setFinalState(polygonRegion)
  },[])
 
  return (
    <ImageBackground
      source={BG_IMG_PATH}
      // ref={mapRef}
      resizeMode="cover"
      blurRadius={10}
      style={{height: '100%', width: '100%'}}>
      <View style={{marginTop: 10, marginBottom: 10, marginLeft: 10}}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 18}}>
            <FontAwesome name="arrow-left" size={18} /> {t('Go Back')}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          // padding: 10,
          borderWidth: 7,
          borderColor: 'transparent',
        }}>
        <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.8}}>
          {!snappshot ? (
            <MapView
            ref={mapRef}
              mapType="hybrid"
              provider={PROVIDER_GOOGLE}
              maxZoomLevel={20}
              initialRegion={polygonRegion}
              region={finalState}
              // showsUserLocation
              followsUserLocation
              style={{
                height: '100%',
                width: '100%',
              }}>
              {/* {
              polygonRegion.latitude?
            
            <Marker coordinate={{
              latitude:polygonRegion.latitude,
              longitude:polygonRegion.longitude
            }} ></Marker>
            :null
          } */}
          {
            newArray.length!==0?
            <Polyline
              coordinates={newArray}
              strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={5}
            />
            :null
          }
            </MapView>
          ) : null}
        </ViewShot>
        <Pressable
          style={{
            position: 'absolute',
            bottom: 50,
            backgroundColor: 'black',
            padding: 15,
            left: 120,
            borderRadius: 20,
          }}
          onPress={() => captureSnapshot()}>
          <Text style={{color: 'white'}}>Click Snapshot</Text>
        </Pressable>

        {snappshot !== null ? (
          <Image source={{uri: snappshot}} style={styles.snapshot} />
        ) : null}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  bg: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
  darkness: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  snapshot: {
    width: width, // Adjust the width and height as needed
    height: height,
  },
});

export default ViewwMap;

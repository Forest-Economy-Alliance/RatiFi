import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  InteractionManager,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Image} from 'react-native-compressor';
import {useDispatch, useSelector} from 'react-redux';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useToast} from 'react-native-toast-notifications';

const CameraCapture = ({navigation, route}) => {
  const {isFront} = route.params || {};
  const dispatch = useDispatch();
  const toast = useToast();
  const state1 = useSelector(state => state.entities.auth.userInfo.profile);
  const cameraRef = useRef(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const has = await checkAndRequestPermission();
        if (!has) {
          Alert.alert('Permission Denied', 'Camera permission is required');
          navigation.goBack();
          return;
        }

        // Try to launch system camera via react-native-image-picker
        try {
          const ImagePicker = require('react-native-image-picker');
          if (ImagePicker && ImagePicker.launchCamera) {
            ImagePicker.launchCamera({mediaType: 'photo', saveToPhotos: false}, async response => {
              if (response?.didCancel) {
                navigation.goBack();
                return;
              }
              const uri = response?.assets && response.assets[0] && response.assets[0].uri;
              if (!uri) {
                Alert.alert('Camera error', 'No image returned');
                navigation.goBack();
                return;
              }
              dispatch({type: 'ENABLE_LOADING'});
              try {
                const compressed = await Image.compress(uri);
                const b64 = await RNFS.readFile(compressed, 'base64');
                const {data: res} = await getGCPUrlImageHandler({
                  fileName: 'capture',
                  base64Data: b64,
                  isPdf: false,
                  isVerificationDoc: true,
                  isFront: isFront,
                  isBack: !isFront,
                  userId: state1?._id,
                });

                if (res?.response?.Location) {
                  if (isFront) {
                    dispatch({
                      type: 'UPDATE_APPUTIL_KEY',
                      payload: {key: 'verificationAadharFrontUrl', value: res.response.Location},
                    });
                    toast.show('Front uploaded', {type: 'success'});
                  } else {
                    dispatch({
                      type: 'UPDATE_APPUTIL_KEY',
                      payload: {key: 'verificationAadharBackUrl', value: res.response.Location},
                    });
                    toast.show('Back uploaded', {type: 'success'});
                  }
                } else {
                  Alert.alert('Upload failed', 'Could not upload image');
                }
              } catch (err) {
                console.log('capture/upload error', err);
                Alert.alert('Error', 'Failed to capture or upload image');
              } finally {
                dispatch({type: 'DISABLE_LOADING'});
                navigation.goBack();
              }
            });
            return;
          }
        } catch (e) {
          // image-picker not installed; fall back to showing message
          console.warn('image-picker not available', e);
        }

        // If image-picker not available, show message and go back
        if (mounted) {
          Alert.alert('Camera unavailable', 'Camera module is not available');
          navigation.goBack();
        }
      } catch (err) {
        console.warn(err);
        navigation.goBack();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const checkAndRequestPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const ok = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (ok) return true;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to capture documents',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      console.warn(e);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const has = await checkAndRequestPermission();
      if (!has) {
        Alert.alert('Permission Denied', 'Camera permission is required');
        navigation.goBack();
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (!cameraRef.current || !CameraComp) return;
      dispatch({type: 'ENABLE_LOADING'});
      const options = {quality: 0.5};
      const data = await cameraRef.current.takePictureAsync(options);
      const compressed = await Image.compress(data.uri);
      const b64 = await RNFS.readFile(compressed, 'base64');

      const {data: res} = await getGCPUrlImageHandler({
        fileName: 'capture',
        base64Data: b64,
        isPdf: false,
        isVerificationDoc: true,
        isFront: isFront,
        isBack: !isFront,
        userId: state1?._id,
      });

      if (res?.response?.Location) {
        if (isFront) {
          dispatch({
            type: 'UPDATE_APPUTIL_KEY',
            payload: {key: 'verificationAadharFrontUrl', value: res.response.Location},
          });
          dispatch({type: 'DISABLE_LOADING'});
          toast.show('Front uploaded', {type: 'success'});
        } else {
          dispatch({
            type: 'UPDATE_APPUTIL_KEY',
            payload: {key: 'verificationAadharBackUrl', value: res.response.Location},
          });
          dispatch({type: 'DISABLE_LOADING'});
          toast.show('Back uploaded', {type: 'success'});
        }
        navigation.goBack();
      } else {
        dispatch({type: 'DISABLE_LOADING'});
        Alert.alert('Upload failed', 'Could not upload image');
      }
    } catch (err) {
      console.log('capture error', err);
      dispatch({type: 'DISABLE_LOADING'});
      Alert.alert('Error', 'Failed to capture image');
    }
  };

  // This screen immediately launches the system camera; we render a placeholder while that happens
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', textAlign: 'center', marginTop: 20}}>Opening camera…</Text>
    </View>
  );
};

export default CameraCapture;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  preview: {flex: 1},
  controls: {height: 100, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'},
  captureBtn: {backgroundColor: '#2196F3', padding: 16, borderRadius: 8},
  cancelBtn: {backgroundColor: 'gray', padding: 12, borderRadius: 8},
});

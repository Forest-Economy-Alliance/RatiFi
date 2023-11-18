import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import {useDispatch} from 'react-redux';

export default function WebDashboard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  dispatch({type: 'DISABLE_LOADING'});

  return (
    <View style={{height: '100%', width: '100%'}}>
        <View style={{padding:10,backgroundColor:'green'}}>
            <Text style={{color:'white'}}>JharFRA - Dashboard</Text>
        </View>
      <WebView
        onLoadStart={() => {
          dispatch({type: 'ENABLE_LOADING'});
          setTimeout(() => {
            dispatch({type: 'DISABLE_LOADING'});
          }, 1000);
        }}
        source={{
          uri: 'https://isb-dev.d2dkcdyh37wuqz.amplifyapp.com',
        }}
      />
    </View>
  );
}

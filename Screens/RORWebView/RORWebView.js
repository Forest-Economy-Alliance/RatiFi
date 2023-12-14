import React from 'react';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';

export default function RORWebView() {
  const district = useSelector(
    state => state.entities.auth.userInfo.profile.district,
  );
  // console.log(`https://j harbhoomi.jharkhand.gov.in/MISROR/${district}District`);

  useEffect(() => {
    Linking.openURL(
      `https://ratifi.forestgovernance.in/getROR`
    );
  }, []);

  return (
    <WebView
      source={{
        uri: `https://ratifi.forestgovernance.in/getROR`,
      }}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}

import React from 'react';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';

export default function RORWebView() {
  const district = useSelector(
    state => state.entities.auth.userInfo.profile.district,
  );
  console.log(`https://jharbhoomi.jharkhand.gov.in/MISROR/${district}District`);

  useEffect(() => {
    Linking.openURL(
      `https://jharbhoomi.jharkhand.gov.in/MISROR/${district}District`,
    );
  }, []);

  return (
    <WebView
      source={{
        uri: `https://jharbhoomi.jharkhand.gov.in/MISROR/${district}District`,
      }}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}

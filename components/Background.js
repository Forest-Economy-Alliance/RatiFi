import React from 'react';
import {View, ImageBackground} from 'react-native';

export default function Background(props) {
  const BG_IMG_PATH = require('../assets/images/background.png');
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground blurRadius={5} source={BG_IMG_PATH} resizeMode="cover">
        {props.children}
      </ImageBackground>
    </View>
  );
}

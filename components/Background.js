import React from 'react';
import {View, ImageBackground} from 'react-native';

export default function Background(props) {
  const BG_IMG_PATH = require('../assets/images/background.png');
  console.log(props);
  return (
    <View
      style={[
        {
          flex: 1,
        },
        props.style,
      ]}
    >
      <ImageBackground
        source={BG_IMG_PATH}
        resizeMode="cover"
        blurRadius={5}
        style={{flex: 1}}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
}

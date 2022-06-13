import React from 'react';
import {View} from 'react-native';

export default function Background(props) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {props.children}
    </View>
  );
}

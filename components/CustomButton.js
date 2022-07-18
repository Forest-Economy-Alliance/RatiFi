import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function CustomButton(props) {
  return (
    <View style={[styles.view, props.style]}>
      <TouchableOpacity
        style={[styles.container, props.button]}
        onPress={props.onPress}>
        <Text style={[styles.btnText]}>{props.text || props.children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: '4%',
    borderWidth: 1,
    borderColor: '#fff',
    width: '35%',
    borderRadius: 70,
  },
  btnText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function CustomButton(props) {
  return (
    <View style={[props.style, styles.view]}>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Text style={[styles.btnText]}>{props.text}</Text>
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

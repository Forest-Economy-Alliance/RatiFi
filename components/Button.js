import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => props.onPress()}>
      <Text style={{color: 'white'}}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#480E09',
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
});

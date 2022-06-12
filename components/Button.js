

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => props?.onPress}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5
  }
})

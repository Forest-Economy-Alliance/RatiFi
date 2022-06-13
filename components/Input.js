import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

export default function Input(props) {
  return (
    <TextInput placeholderTextColor={'#fff'} style={styles.input} {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    width: '100%',
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'transparent',
    marginVertical: 5,
    // marginHorizontal: 5,
  },
});

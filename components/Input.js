import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function Input(props) {
  return (
    <TextInput placeholderTextColor={'#480E09'} style={styles.input}  {...props} />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 30,
    color: '#480E09',
  }
})

import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export default function CustomInput(props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'#fff'}
        selectionColor={'#fff'}
        {...props}
        style={[styles.input, props.style]}
        textAlign={'center'}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 70,
    paddingHorizontal: 20,
    width: '80%',
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: '5%',
    color: '#FFFFFF',
    paddingVertical: '2%',
  },
});

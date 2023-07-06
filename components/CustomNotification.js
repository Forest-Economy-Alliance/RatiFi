import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, Pressable} from 'react-native';

export default function CustomError({
  visible,
  setVisible,
  notificationText,
  errors,
  buttonText,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={styles.errorView}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{notificationText}</Text>
          <View style={styles.horizontalLineErr} />
           
              <Pressable
                style={styles.button}
                onPress={() => {
                    console.log("hello")
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </Pressable>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  errorCard: {
    width: '80%',
    backgroundColor: '#193E05',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 34,
    color: '#FF6C00',
    margin: '15%',
  },
  horizontalLineErr: {
    width: '90%',
    borderWidth: 0.5,
    borderColor: '#FF6C00',
    marginBottom: '10%',
  },
  titleErr: {
    marginTop: '10%',
  },
  titleTextErr: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#538415',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    padding: '4%',
    paddingHorizontal: '8%',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});

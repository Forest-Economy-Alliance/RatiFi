import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal} from 'react-native';

export default function CustomError({
  visible,
  setVisible,
  errorText,
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
          <Text style={styles.errorText}>{errorText}</Text>
          <View style={styles.horizontalLineErr} />
          {errors.name && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.name}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.phoneNumber && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.phoneNumber}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.phoneNumber}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.password && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.password}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.password}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.confirmPassword && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>
                  {errors.confirmPassword}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>
                  {buttonText.confirmPassword}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {errors.member && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.member}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.member}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.role && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.role}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.role}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.type && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.type}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.type}</Text>
              </TouchableOpacity>
            </>
          )}
          {errors.uid && (
            <>
              <View style={styles.titleErr}>
                <Text style={styles.titleTextErr}>{errors.uid}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={styles.buttonText}>{buttonText.uid}</Text>
              </TouchableOpacity>
            </>
          )}
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

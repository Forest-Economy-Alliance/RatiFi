/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';



const App = () => {

  return (
    <SafeAreaView>
      <Text style={styles.Title}>RATIFI</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30%',
  },
});

export default App;

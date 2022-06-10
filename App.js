import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useState,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LangSelectionScreen from './screens/LanguageSelection/LangSelectionScreen';
import NamePhoneScreen from './screens/NamePhone/NamePhoneScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LangSelection"
          component={LangSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NamePhone"
          component={NamePhoneScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;
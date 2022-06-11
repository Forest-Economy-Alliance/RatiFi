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
import LangSelectionScreen from './Screens/LanguageSelection/LangSelectionScreen';
import NamePhoneScreen from './Screens/NamePhone/NamePhoneScreen';
import PasswordScreen from './Screens/Password/PasswordScreen';
import LocationInformationScreen from './Screens/LocationInformation/LocationInformationScreen';
import RoleInformationScreen from './Screens/RoleInformation/RoleInformationScreen';
import downloadPDFScreen from './Screens/DownloadPDF/downloadPDFScreen';

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
        <Stack.Screen
          name="Password"
          component={PasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationInformation"
          component={LocationInformationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RoleInformation"
          component={RoleInformationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DownloadPDF"
          component={downloadPDFScreen}
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
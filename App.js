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


// <View
//     style={{
//       flex: 1,
//       backgroundColor: 'white',
//       alignItems: 'center',
//       justifyContent: 'space-evenly',
//     }}>
//     <Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>
//       {t('hello')}{' '}
//     </Text>
//     <Text style={{fontWeight: 'bold', fontSize: 25, color: '#33A850'}}>
//       {t('this line is translated')}
//     </Text>
//     <TouchableOpacity
//       onPress={() => changeLanguage('en')}
//       style={{
//         backgroundColor:
//           currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
//         padding: 20,
//       }}>
//       <Text>Select English</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       onPress={() => changeLanguage('hi')}
//       style={{
//         backgroundColor:
//           currentLanguage === 'hi' ? '#33A850' : '#d3d3d3',
//         padding: 20,
//       }}>
//       <Text>हिंदी का चयन करें</Text>
//     </TouchableOpacity>
//   </View>
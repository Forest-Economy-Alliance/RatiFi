import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import PastRecordsScreen from '../Screens/PastRecordsScreen/PastRecordsScreen';

const Stack = createNativeStackNavigator();

const LoggedInNavigator = () => {
  const {t, i18n} = useTranslation();
  return (
    <Stack.Navigator
      initialRouteName="ForestFiSplash"
      screenOptions={{
        headerStyle: {
          // backgroundColor: 'green',
        },
        headerTitleStyle: {
          // color: 'white'
        },
      }}
    >
      <Stack.Screen
        name="ForestFiSplash"
        component={ForestFiSplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RatiFiSplash"
        component={RatiFiSplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LangSelection"
        component={LangSelectionScreen}
        options={{
          headerShown: false,
          // headerTitle: 'hi',
        }}
      />
      <Stack.Screen
        name="NamePhone"
        component={NamePhoneScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Please enter Phone Number',
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

<Stack.Screen
      name="PastRecordsScreen"
      component={PastRecordsScreen}
      options={{
        headerShown:false
      }}

      />
      
    
    </Stack.Navigator>
  );
};

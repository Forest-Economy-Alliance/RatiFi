import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LangSelectionScreen from '../Screens/LanguageSelection/LangSelectionScreen';
import NamePhoneScreen from '../Screens/NamePhone/NamePhoneScreen';
import PasswordScreen from '../Screens/Password/PasswordScreen';
import LocationInformationScreen from '../Screens/LocationInformation/LocationInformationScreen';
// import RoleInformationScreen from '../Screens/RoleInformation/RoleInformationScreen';
import downloadPDFScreen from '../Screens/DownloadPDF/downloadPDFScreen';
import ForestFiSplashScreen from '../Screens/ForestFiSplash/ForestFiSplashScreen';
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';
import FormsPage from '../Screens/FormsPage/FormsPage';
import OTPScreen from '../Screens/OTPScreen/OTPScreen';
import IdCardScreen from '../Screens/IdCard/IdCardScreen';
import LoginScreen from '../Screens/Login/LoginScreen';
import LoginPasswordScreen from '../Screens/LoginPassword/LoginPassword';
import ForgotPasswordScreen from '../Screens/ForgotPassword/ForgotPasswordScreen';
import RoleScreen from '../Screens/Role/RoleScreen';
import LocationScreen from '../Screens/Location/Location';
import FRCHomeScreen from '../Screens/FRCHome/FRCHomeScreen';
import FRCInitialScreen from '../Screens/FRCInitial/FRCInitialScreen';
import { useTranslation } from 'react-i18next';
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {loading} = useSelector(state => state.entities.appUtil.appUtil);

  const {t, i18n} = useTranslation();
  let language = 'hi';
  const changeLanguage = value => {
    i18n.changeLanguage(value).catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    <NavigationContainer>
      {loading && <Loader />}
      <Stack.Navigator initialRouteName="ForestFiSplash">
        <Stack.Screen
          name="ForestFiSplash"
          component={ForestFiSplashScreen}
          options={{
            headerShown: false,
            animation: 'default',
          }}
        />
        <Stack.Screen
          name="LangSelection"
          component={LangSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginPassword"
          component={LoginPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            animation: 'default',
          }}
        /> */}
        <Stack.Screen
          name="NamePhone"
          component={NamePhoneScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OTPScreen}
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
          name="IdCard"
          component={IdCardScreen}
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
          name="Role"
          component={RoleScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FRCHome"
          component={FRCHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FRCInitial"
          component={FRCInitialScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="RoleInformation"
          component={RoleInformationScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="DownloadPDF"
          component={downloadPDFScreen}
          options={
            {
              // headerShown: false,
            }
          }
        />
        <Stack.Screen
          name="FormsPage"
          component={FormsPage}
          options={{
            headerTitle: t('FORM_DOWNLOAD_SCREEN_HEADER'),
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

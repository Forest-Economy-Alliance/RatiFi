/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LangSelectionScreen from '../Screens/LanguageSelection/LangSelectionScreen';
import NamePhoneScreen from '../Screens/NamePhone/NamePhoneScreen';
import PasswordScreen from '../Screens/Password/PasswordScreen';
import LocationInformationScreen from '../Screens/LocationInformation/LocationInformationScreen';
import LocationInformationScreenSdlc from '../Screens/LocationInformation/LocationInformationSDLC';

// import RoleInformationScreen from '../Screens/RoleInformation/RoleInformationScreen';
import downloadPDFScreen from '../Screens/DownloadPDF/downloadPDFScreen';
import ForestFiSplashScreen from '../Screens/ForestFiSplash/ForestFiSplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import FormsPage from '../Screens/FormsPage/FormsPage';
import OTPScreen from '../Screens/OTPScreen/OTPScreen';
import IdCardScreen from '../Screens/IdCard/IdCardScreen';
import LoginScreen from '../Screens/Login/LoginScreen';
import LoginPasswordScreen from '../Screens/LoginPassword/LoginPassword';
import MobilePasswordScreen from '../Screens/MobilePassword/MobilePassword';
import ForgotPasswordScreen from '../Screens/ForgotPassword/ForgotPasswordScreen';
import RoleScreen from '../Screens/Role/RoleScreen';
import LocationScreen from '../Screens/Location/Location';
import FRCHomeScreen from '../Screens/FRCHome/FRCHomeScreen';
import FRCInitialScreen from '../Screens/FRCInitial/FRCInitialScreen';
import {useTranslation} from 'react-i18next';
// import PastRecordsScreen from '../Screens/PastRecordsScreen/PastRecordsScreen';
import GenderScreen from '../Screens/Gender/GenderScreen';

import PastRecordsScreen from '../Screens/PastRecordsScreen/PastRecordsScreen';
import HomeScreen from '../Screens/HomeScreen/homeScreen';
import FRCMembersScreen from '../Screens/HomeScreen/FRCMembersScreen';
import ProfileScreen from '../Screens/ProfileScreen/profilescreen';
import {PDFPreviewScreen} from '../Screens/PDFPreviewScreen/PDFPreviewScreen';
import LocationScreenOdisha from '../Screens/Location/LocationOdisha';
import ClaimAlertsScreen from '../Screens/ClaimAlerts/ClaimAlertsScreen';
import ClaimTypeSelectionScreen from '../Screens/ChooseIFRorCFR';
import IFRScreen from '../Screens/PastRecordsIFR';
import IFRDownloadPDF from '../Screens/FormsPageIFR';
import HomeScreenIFR from '../Screens/HomeScreenIFR';
import PastRecordsIFR from '../Screens/PastRecordsIFR';
import {MarkBoundry} from '../Screens/MarkBoundry';
import ClaimAlertsScreenIFR from '../Screens/ClaimAlertsIFR/ClaimAlertsScreenIFR';
import WebDashboard from '../Screens/WebDashboard';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import ValidateIFRScreen from '../Screens/ValidateIFR';

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

  const {globalSyncStatus} = useSelector(
    state => state.entities.appUtil.appUtil,
  );
 
  
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      {loading && <Loader />}
      
        <View style={{backgroundColor: 'rgba(52, 52, 52, alpha)'}}>
          {globalSyncStatus && (
            <ProgressBar
              indeterminate
              styleAttr="Horizontal"
              color="white"
              style={{height: 30}}
            />
          )}
        </View>

      <Stack.Navigator
        initialRouteName="ForestFiSplash"
        screenOptions={{
          animation: 'none',
        }}>
        <Stack.Screen
          name="ForestFiSplash"
          component={ForestFiSplashScreen}
          options={{
            headerShown: false,
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
          name="ClaimTypeSelectionScreen"
          component={ClaimTypeSelectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="IFRDownloadPDF"
          component={IFRDownloadPDF}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WebDashboard"
          component={WebDashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PastRecordsIFR"
          component={PastRecordsIFR}
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
        <Stack.Screen
          name="MobilePassword"
          component={MobilePasswordScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowProfile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
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
          name="LocationSdlc"
          component={LocationInformationScreenSdlc}
          options={{
            headerShown: false,
          }}
        />
        {/* <CheckStatus>

         </CheckStatus> */}
        <Stack.Screen
          name="Role"
          component={RoleScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
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
          name="LocationOdisha"
          component={LocationScreenOdisha}
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
          name="HomeScreenIFR"
          component={HomeScreenIFR}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ValidateIFRScreen"
          component={ValidateIFRScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MarkBoundry"
          component={MarkBoundry}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FRCMembers"
          component={FRCMembersScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PDFPreviewScreen"
          component={PDFPreviewScreen}
          options={{
            // headerShown: false,
            headerTransparent: true,
            headerTitle: 'दस्तावेज़',
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
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FormsPage"
          component={FormsPage}
          options={{
            headerTitle: t('FORM_DOWNLOAD_SCREEN_HEADER'),
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PastRecordsScreen"
          component={PastRecordsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ClaimAlertsScreen"
          component={ClaimAlertsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ClaimAlertsScreenIFR"
          component={ClaimAlertsScreenIFR}
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

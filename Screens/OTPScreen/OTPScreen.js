import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {selectName} from '../../redux-store/reducers/entities/appUtil';
import {useRoute} from '@react-navigation/native';
import {verifyOTPAction} from '../../redux-store/actions/auth';
const BG_IMG_PATH = require('../../assets/images/background.png');

const NamePhoneScreen = ({navigation}) => {
  useEffect(() => {
    formik.handleReset();
  }, []);

  const dispatch = useDispatch();
  const {language} = useSelector(e => e?.entities?.appUtil?.appUtil);
  const route = useRoute();
  console.log(route?.params?.phoneNumber);
  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [wrongOTP, setWrongOTP] = useState('');
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  const {otp,authLevel} = useSelector(state => state.entities.auth.userInfo?.profile);

  const forgetPasswordCode = route.params.forgetPasswordCode || '2';
  const state = {
    otp: '',
  };
  console.log(forgetPasswordCode, 'forgetPassword Code');
  const onVerifyOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    // navigation.navigate('Password');
    if (formik.values.otp === otp) {

      let PROFILE_STATUS = "CREATED";
      if (authLevel && authLevel!=='-1') {
        PROFILE_STATUS = "AVAILABLE"; // means he has done all resitration steps till last
      }

     
      if (forgetPasswordCode == 1) {
        navigation.replace('Password', {
          mobile: route.params.phoneNumber,
          forgetPasswordCode: '1',
        });
      } else if (PROFILE_STATUS === 'AVAILABLE') {
        navigation.replace('HomeScreen');
        // navigation.navigate("DownloadPDF")
        // updating to screen code to 2 as otp verification is done ,
        // now two cases ,
        // in reponse if we get AVAILABLE
        // else we get created
        // if available -> Home Screen
        // if created -> Password
        // dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 2});
        //  navigation.navigate("Login")
      } else if (PROFILE_STATUS === 'CREATED') {
        dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 2});
        navigation.replace('Password', {mobile: route.params.phoneNumber});
      } else {
        setWrongOTP(t('Wrong OTP'));
      }
    } else {
      setWrongOTP(t('Wrong OTP'));
    }

    return;
  };

  const formik = useFormik({
    initialValues: state,
    // validationSchema: OTPSchema,
    onSubmit: onVerifyOtp,
  });

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('OTP')}</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.name}>
              <Text style={styles.nameTxt}>{name}</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('Enter OTP')}</Text>
            </View>

            <CustomInput
              onChangeText={formik.handleChange('otp')}
              onBlur={formik.handleBlur('otp')}
              value={formik.values.otp}
              error={formik.errors.otp && formik.touched.otp}
              keyboardType="numeric"
            />
            <Text style={{alignSelf: 'center', color: 'red', marginTop: 10}}>
              {wrongOTP}
            </Text>
            <CustomButton
              text={t('Next')}
              onPress={formik.handleSubmit}
              style={styles.otpBtn}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default NamePhoneScreen;

const styles = StyleSheet.create({
  bg: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
  darkness: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    alignItems: 'center',
    paddingTop: '15%',
    marginHorizontal: '10%',
  },
  headerText: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: '10%',
    marginBottom: '10%',
  },
  name: {
    alignItems: 'center',
    marginHorizontal: '10%',
    margin: '10%',
  },
  nameTxt: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
    paddingTop: '10%',
    marginHorizontal: '10%',
  },
  titleText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  sub: {
    alignItems: 'center',
    marginTop: '4%',
    marginHorizontal: '10%',
  },
  subText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  otpBtn: {
    marginTop: '30%',
  },
  inputName: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  inputPhone: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  inputPhoneTextContainer: {
    color: 'white',
    width: '100%',
    backgroundColor: 'white',
  },
  inputPhoneText: {
    fontSize: 20,
    color: '#480E09',
  },
  inputPhoneCodeText: {
    fontSize: 20,
    color: '#480E09',
  },
  inputPhoneCountryPickerButton: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '25%',
  },
  getOtpButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  getOtpButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  afterOTP: {
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  afterOTPText: {
    fontSize: 20,
    color: '#480E09',
    // marginTop: '5%',
  },
  inputOTP: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
    marginTop: '5%',
  },
  resendOtpButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  resendOtpButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  verifyOtpButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  verifyOtpButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: 'red',
    marginTop: '2%',
  },
});

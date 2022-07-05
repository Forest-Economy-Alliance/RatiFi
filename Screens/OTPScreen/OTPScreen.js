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
import {useSelector} from 'react-redux';
import {selectName} from '../../redux-store/reducers/entities/appUtil';

const BG_IMG_PATH = require('../../assets/images/background.png');
const NamePhoneScreen = ({navigation}) => {
  const language = 'hi';

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const name = useSelector(state => state.entities.appUtil.appUtil.name);

  const state = {
    otp: '',
  };
  const onVerifyOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    navigation.navigate('Password');
    // dispatch(
    //   verifyOTPAction(
    //     {
    //       mobile: formik.values.phoneNumber,
    //       otp: formik2.values.otp,
    //     },
    //     args => {
    //       if (args === true) {
    //         console.log('HI');
    //         dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 2});
    //         navigation.navigate('Password');
    //       } else {
    //         setWrongOTP('Wrong OTP');
    //       }
    //     },
    //   ),
    // );
    // navigation.navigate('Password');
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

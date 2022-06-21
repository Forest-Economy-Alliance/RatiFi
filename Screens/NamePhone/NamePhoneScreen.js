import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

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

  const state = {
    name: '',
    phoneNumber: '',
  };

  const onGetOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    console.log('values', values);
    navigation.navigate('OTP');
    // navigation.navigate('LanguageSelection');
    // dispatch(
    //   postOTPAction(
    //     {
    //       mobile: formik.values.phoneNumber,
    //       name: formik.values.name,
    //       lat: '123.23',
    //       lng: '123.2',
    //       dd: DD,
    //     },
    //     args => {},
    //   ),
    // );
  };

  const formik = useFormik({
    initialValues: state,
    // validationSchema: NPSchema,
    onSubmit: onGetOtp,
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
      <View style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('Registration')}</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('Enter your name')}</Text>
            </View>
            <CustomInput
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
              error={formik.errors.name && formik.touched.name}
            />
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('Enter mobile number')}</Text>
            </View>
            <CustomInput
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber && formik.touched.phoneNumber}
              keyboardType="numeric"
            />
            <View style={styles.sub}>
              <Text style={styles.subText}>
                {t('You will receive otp on this number')}
              </Text>
            </View>
            <CustomButton
              text={t('Get OTP')}
              onPress={formik.handleSubmit}
              style={styles.otpBtn}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
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
    fontSize: 14,
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

// {/* <Text>{t('Enter your name')}</Text>
//           <TextInput
//             style={styles.inputName}
//             placeholder={t('name')}
//             placeholderTextColor="#480E09"
//             onChangeText={formik.handleChange('name')}
//             value={formik.values.name}
//             onBlur={formik.handleBlur('name')}
//           />

//           {formik.touched.name && formik.errors.name && (
//             <Text style={styles.error}>{formik.errors.name}</Text>
//           )}
//           <Text>{t('you will recived otp on this number')}</Text>
//           <PhoneInput
//             ref={phoneInput}
//             placeholder={t('phone/mobile')}
//             placeholderTextColor="#480E09"
//             defaultCode="IN"
//             layout="second"
//             containerStyle={styles.inputPhone}
//             textInputStyle={styles.inputPhoneText}
//             textContainerStyle={styles.inputPhoneTextContainer}
//             codeTextStyle={styles.inputPhoneCodeText}
//             countryPickerButtonStyle={styles.inputPhoneCountryPickerButton}
//             onChangeFormattedText={formik.handleChange('phoneNumber')}
//             value={formik.values.phoneNumber}
//             onBlur={formik.handleBlur('phoneNumber')}
//           />
//           {formik.touched.phoneNumber && formik.errors.phoneNumber && (
//             <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
//           )}
//           <Text>{t('you will receive otp on this number')}</Text>
//           {/* get otp button */}
//           {!pressed && (
//             <TouchableOpacity
//               onPress={formik.handleSubmit}
//               style={styles.getOtpButton}>
//               <Text style={styles.getOtpButtonText}>{t('get otp')}</Text>
//             </TouchableOpacity>
//           )}
//           {pressed && (
//             <View style={styles.afterOTP}>
//               <Text style={styles.afterOTPText}>
//                 {t('OTP sent to your mobile !!')}
//               </Text>
//               <TextInput
//                 style={styles.inputOTP}
//                 placeholder={t('ENTER OTP')}
//                 placeholderTextColor="#480E09"
//                 onChangeText={formik2.handleChange('otp')}
//                 value={formik2.values.otp}
//                 onBlur={formik2.handleBlur('otp')}
//               />
//               {formik2.touched.otp && formik2.errors.otp && (
//                 <Text style={styles.error}>{formik2.errors.otp}</Text>
//               )}

//               <Text>{wrongOtp}</Text>
//               <TouchableOpacity
//                 style={styles.verifyOtpButton}
//                 onPress={formik2.handleSubmit}>
//                 <Text style={styles.verifyOtpButtonText}>
//                   {t('verify otp')}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.resendOtpButton}
//                 onPress={formik.handleSubmit}>
//                 <Text style={styles.resendOtpButtonText}>
//                   {t('resend otp')}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}} */

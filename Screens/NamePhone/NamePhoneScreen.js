import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Button,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../slices/userSlice';
import PhoneInput from 'react-native-phone-number-input';

import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';

const NamePhoneScreen = ({navigation}) => {
  const language = useSelector(selectLanguage);

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const phoneInput = useRef(null);

  const [pressed, setPressed] = useState(false);

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

  const state2 = {
    otp: '',
  };

  const onGetOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    setPressed(true);
  };

  const onVerifyOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    navigation.navigate('Password');
  };

  const NPSchema = object().shape({
    name: string().required('Name is Required'),
    phoneNumber: string()
      .phone(null, false, 'Invalid Phone Nummber')
      .required('Phone Number is Required'),
  });

  const NPSchema2 = object().shape({
    otp: string().required('OTP is Required'),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: NPSchema,
    onSubmit: onGetOtp,
  });

  const formik2 = useFormik({
    initialValues: state2,
    validationSchema: NPSchema2,
    onSubmit: onVerifyOtp,
  });

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.inputName}
          placeholder={t('name')}
          placeholderTextColor="#480E09"
          onChangeText={formik.handleChange('name')}
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.error}>{formik.errors.name}</Text>
        )}
        <PhoneInput
          ref={phoneInput}
          placeholder={t('phone/mobile')}
          placeholderTextColor="#480E09"
          defaultCode="IN"
          layout="second"
          containerStyle={styles.inputPhone}
          textInputStyle={styles.inputPhoneText}
          textContainerStyle={styles.inputPhoneTextContainer}
          codeTextStyle={styles.inputPhoneCodeText}
          countryPickerButtonStyle={styles.inputPhoneCountryPickerButton}
          onChangeFormattedText={formik.handleChange('phoneNumber')}
          value={formik.values.phoneNumber}
          onBlur={formik.handleBlur('phoneNumber')}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
        )}
        {/* get otp button */}
        {!pressed && (
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.getOtpButton}>
            <Text style={styles.getOtpButtonText}>{t('get otp')}</Text>
          </TouchableOpacity>
        )}
        {pressed && (
          <View style={styles.afterOTP}>
            <Text style={styles.afterOTPText}>
              {t('OTP sent to your mobile !!')}
            </Text>
            <TextInput
              style={styles.inputOTP}
              placeholder={t('ENTER OTP')}
              placeholderTextColor="#480E09"
              onChangeText={formik2.handleChange('otp')}
              value={formik2.values.otp}
              onBlur={formik2.handleBlur('otp')}
            />
            {formik2.touched.otp && formik2.errors.otp && (
              <Text style={styles.error}>{formik2.errors.otp}</Text>
            )}
            <TouchableOpacity style={styles.resendOtpButton} onPress={() => {}}>
              <Text style={styles.resendOtpButtonText}>{t('resend otp')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={formik2.handleSubmit}>
              <Text style={styles.verifyOtpButtonText}>{t('verify otp')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default NamePhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '15%',
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

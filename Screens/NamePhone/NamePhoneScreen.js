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
  ToastAndroid,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectLanguage} from '../../_slices/userSlice';
import PhoneInput from 'react-native-phone-number-input';
import Input from '../../components/Input';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';
import {postOTPAction, verifyOTPAction} from '../../redux-store/actions/auth';

const NamePhoneScreen = ({navigation}) => {
  const language = 'hi';

  const {t, i18n} = useTranslation();

  const dispatch = useDispatch();

  const {DD, profile} = useSelector(state => state.entities.auth.userInfo);

  const [currentLanguage, setCurrentLanguage] = useState('en');

  // const dstate = useSelector(state => state.entities.auth);

  // console.log(dstate);

  const [wrongOtp, setWrongOTP] = useState('');

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
    // dispatch(setName(values.name));
    // dispatch(setMobile(values.phoneNumber));
    formikActions.setSubmitting(false);
    setPressed(true);
    dispatch(
      postOTPAction(
        {
          mobile: formik.values.phoneNumber,
          name: formik.values.name,
          lat: '123.23',
          lng: '123.2',
          dd: DD,
        },
        args => {},
      ),
    );
  };

  const onVerifyOtp = (values, formikActions) => {
    formikActions.setSubmitting(false);
    dispatch(
      verifyOTPAction(
        {
          mobile: formik.values.phoneNumber,
          otp: formik2.values.otp,
        },
        args => {
          if (args === true) {
            console.log('HI');
            dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 2});
            navigation.navigate('Password');
          } else {
            setWrongOTP('Wrong OTP');
          }
        },
      ),
    );
    // navigation.navigate('Password');
  };

  const NPSchema = object().shape({
    name: string().required(t('Name is Required')),
    phoneNumber: string()
      .phone(null, false, t('Invalid Phone Number'))
      .required(t('Phone Number is Required')),
  });

  const NPSchema2 = object().shape({
    otp: string().required(t('OTP is Required')),
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
        <Text>{t('Enter your name')}</Text>
        <Input
          editable={pressed ? false : true}
          textAlign={'center'}
          style={{
            borderColor: pressed ? 1 : undefined,
          }}
          placeholder={t('name')}
          placeholderTextColor="gray"
          onChangeText={formik.handleChange('name')}
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
        />

        {formik.touched.name && formik.errors.name && (
          <Text style={styles.error}>{formik.errors.name}</Text>
        )}
        <Text>{t('you will recived otp on this number')}</Text>
        <PhoneInput
          // disabled={pressed ? true : false} to be confirmed
          ref={phoneInput}
          placeholder={t('phone/mobile')}
          placeholderTextColor="#480E09"
          defaultCode="IN"
          layout="first"
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
        <Text>{t('you will recived otp on this number')}</Text>
        {/* get otp button */}
        {/* <Button title='FormsPage' onPress={() => navigation.navigate('FormsPage')} /> */}
        {!pressed && (
          <TouchableOpacity
            onPress={formik.handleSubmit}
            style={styles.getOtpButton}
          >
            <Text style={styles.getOtpButtonText}>{t('get otp')}</Text>
          </TouchableOpacity>
        )}
        {pressed && (
          <View style={styles.afterOTP}>
            <Text style={styles.afterOTPText}>
              {t('OTP sent to your mobile !!')}
            </Text>
            <Input
              // style={styles.inputOTP}
              edi
              placeholder={t('Enter OTP')}
              placeholderTextColor="#480E09"
              onChangeText={formik2.handleChange('otp')}
              value={formik2.values.otp}
              onBlur={formik2.handleBlur('otp')}
            />
            {formik2.touched.otp && formik2.errors.otp && (
              <Text style={styles.error}>{formik2.errors.otp}</Text>
            )}

            <Text>{wrongOtp}</Text>
            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={formik2.handleSubmit}
            >
              <Text style={styles.verifyOtpButtonText}>{t('verify otp')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resendOtpButton}
              onPress={formik.handleSubmit}
            >
              <Text style={styles.resendOtpButtonText}>{t('resend otp')}</Text>
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

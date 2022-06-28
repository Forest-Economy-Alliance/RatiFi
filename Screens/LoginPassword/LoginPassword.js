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
import {useFormik} from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {object} from 'yup';
import {string} from 'yup';
import {ref} from 'yup';
import CustomError from '../../components/CustomError';

const BG_IMG_PATH = require('../../assets/images/background.png');
const LoginPasswordScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();

  const name = useState('Ram Krishna');
  const state = {
    password: '',
  };

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };
  const PassSchema = object().shape({
    password: string().required(t('Password is Required')),
  });

  const onLogin = (values, formikActions) => {
    formikActions.setSubmitting(false);
    // dispatch(
    //   updatePasswordAction(
    //     {
    //       mobile: mobile,
    //       password: values.password,
    //       confirmPassword: values.confirmPassword,
    //     },
    //     args => {
    //       if (args) {
    //         dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});
    //       }
    //     },
    //   ),
    // );
    navigation.navigate('IdCard');
  };

  const buttonText = {
    password: t('Fill Password'),
  };

  const formik = useFormik({
    initialValues: state,
    validationSchema: PassSchema,
    onSubmit: onLogin,
  });

  const [errorVisible, setErrorVisible] = useState(false);

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
              <Text style={styles.headerText}>{t('Login')}</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.name}>
              <Text style={styles.nameTxt}>{name}</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('password')}</Text>
            </View>
            <CustomInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              secureTextEntry={true}
              error={formik.errors.password && formik.touched.password}
            />
            <CustomButton
              text={t('Login')}
              onPress={() => {
                if (formik.errors.password) {
                  setErrorVisible(true);
                }
                formik.handleSubmit();
              }}
              style={styles.otpBtn}
            />
            <CustomButton
              text={t('Forgot Password')}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
              style={styles.forgPassBtn}
              button={styles.forgPassWidth}
            />
            <CustomError
              visible={errorVisible}
              setVisible={setErrorVisible}
              errorText={t('Please fill all the fields')}
              errors={formik.errors}
              buttonText={buttonText}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

export default LoginPasswordScreen;

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
    marginTop: '20%',
  },
  forgPassBtn: {
    marginTop: '50%',
  },
  forgPassWidth: {
    width: '70%',
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

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
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';
import { postOTPAction } from '../../redux-store/actions/auth';

const BG_IMG_PATH = require('../../assets/images/background.png');
const ForgotPasswordScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();

  // const [name, setName] = useState('Ram Krishna');
  const {name} = useSelector(state => state.entities.auth.userInfo.profile);
  
  const [curLen, setCurLen] = useState(0);

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [errorVisible, setErrorVisible] = useState(false);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const state = {
    phoneNumber: '',
  };

  const onGetOtp = async (values, formikActions) => {
    formikActions.setSubmitting(false);
    console.log('values', values);
  
    // dispatch({type: 'UPDATE_NAME', payload: values.name});
  // const DD=await getDeviceHash();

    dispatch(
      postOTPAction(
        {
          mobile: formik.values.phoneNumber,
          name: formik.values.name,
          // lat: '123.23',
          // lng: '123.2',
          // dd: DD,
        },
        args => {
          // sending phone number in OTP Screen, as we need their to send in API Call
          navigation.navigate('OTP',{
            phoneNumber:formik.values.phoneNumber
          });        
        },
      ),
    );
  };

  const NPSchema = object().shape({
    phoneNumber: string()
      .required(t('Phone Number is Required'))
      .phone('IN', 'false', t('Invalid Phone Number')),
  });

  const buttonText = {
    phoneNumber: t('Fill Phone Number'),
  };

  const formik = useFormik({
    initialValues: state,
    validationSchema: NPSchema,
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
      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('Registration')}</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.name}>
              <Text style={styles.nameTxt}>{name}</Text>
            </View>
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
              onPress={() => {
                if (formik.errors.phoneNumber) {
                  setErrorVisible(true);
                }
                formik.handleSubmit();
              }}
              style={styles.otpBtn}
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
      </ScrollView>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

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
  name: {
    alignItems: 'center',
    margin: '10%',
    marginTop: '25%',
    marginHorizontal: '10%',
  },
  nameTxt: {
    fontSize: 25,
    color: '#FFFFFF',
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

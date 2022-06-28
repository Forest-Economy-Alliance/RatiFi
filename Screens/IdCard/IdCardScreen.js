import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import {object, string} from 'yup';
import CustomError from '../../components/CustomError';

const BG_IMG_PATH = require('../../assets/images/background.png');
const IdCardScreen = ({navigation}) => {
  const language = 'hi';
  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  const state = {
    type: '',
    uid: '',
  };

  const {t, i18n} = useTranslation();

  const [errorVisible, setErrorVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const onNext = (values, formikActions) => {
    formikActions.setSubmitting(false);
    navigation.navigate('IdCard');
  };

  const uidSchema = object().shape({
    type: string().required(t('Identity Card Type is Required')),
    uid: string().required(t('UID is required')),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: uidSchema,
    onSubmit: onNext,
  });

  const data1 = [
    {
      label: 'AADHAR',
      value: '1',
    },
    {
      label: 'GOVERNMENT ID',
      value: '2',
    },
  ];

  const buttonText = {
    type: t('Fill Identity Card Type'),
    uid: t('Fill UID'),
  };

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
              <View style={styles.name}>
                <Text style={styles.nameTxt}>{name}</Text>
              </View>
              <Text style={styles.headerText}>{t('Identity Card')}</Text>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('identity card type')}</Text>
            </View>
            <Dropdown
              visible={true}
              data={data1}
              formik={formik}
              variable={'type'}
            />
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('Identity Card UID')}</Text>
            </View>
            <CustomInput
              onChangeText={formik.handleChange('uid')}
              onBlur={formik.handleBlur('uid')}
              value={formik.values.uid}
              error={formik.errors.uid && formik.touched.uid}
            />
            <CustomButton
              text={t('Next')}
              onPress={() => {
                if (formik.errors.type || formik.errors.uid) {
                  console.log(formik.errors);
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
      </View>
    </ImageBackground>
  );
};

export default IdCardScreen;

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
    marginTop: '5%',
    fontSize: 25,
    color: '#FFFFFF',
  },
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: '10%',
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
    marginHorizontal: '10%',
    marginTop: '10%',
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

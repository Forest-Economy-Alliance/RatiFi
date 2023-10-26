/* eslint-disable no-alert */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import queue, { Worker } from 'react-native-job-queue';

import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, string, ref} from 'yup';
import {updatePasswordAction} from '../../redux-store/actions/auth';
import {useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {updatePasswordHandler} from '../../services/authService';

const BG_IMG_PATH = require('../../assets/images/background.png');

const PasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginflow, setLoginFlow] = useState(false);
  React.useEffect(() => {
    if (route?.params?.login === true) {
      setLoginFlow(true);
    }
  }, [route?.params]);
  const route = useRoute();
  console.log('P', route.params);
  const forgetPasswordCode = route.params.forgetPasswordCode || '2';
  console.log(forgetPasswordCode);
  const state = {
    password: '',
    confirmPassword: '',
  };
  const mobile = route.params.mobile;
  // const mobile = useSelector(
  //   state => state.entities.auth.userInfo.profile.mobile,
  // );
  const pwdToVerify = useSelector(
    state => state.entities.auth.userInfo.profile.password,
  );

  const {language, globalSyncStatus} = useSelector(
    e => e?.entities?.appUtil?.appUtil,
  );

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
    confirmPassword: string()
      .required(t('Confirm Password is Required'))
      .oneOf(
        [ref('password'), null],
        t('Password and Confirm Password does not match'),
      ),
  });
  console.log('loginflow--', loginflow);




  const onNext = (values, formikActions) => {
    formikActions.setSubmitting(false);
    // dispatch({type: 'ENABLE_LOADING'});
    if (loginflow === true) {
      console.log('PTV', pwdToVerify);
      if (pwdToVerify === formik.values.password) {
        navigation.replace('DownloadPDF');
      } else {
        toast.show(t('INCORRECT_PASSWORD'), {
          type: 'success',
          animationType: 'zoom-in',
          successColor: '#480E09',
          placement: 'top',
          duration: 5000,
        });
      }
    } else {
      dispatch({
        type: 'UPDATE_APPUTIL_KEY',
        payload: {
          key: 'globalSyncStatus',
          value: true,
        },
      });

      queue.addJob('UPDATEPasswordWorker', {
        mobile,
        password: formik.values.password,
      },{
        attempts:2,
        timeout:5000
      })

      if (forgetPasswordCode == 1) {
        navigation.navigate('HomeScreen');
      }
      navigation.navigate('Location');

      return;
    }
    // dispatch({type: 'DISABLE_LOADING'});
  };
  // alert("HI")
  const formik = useFormik({
    initialValues: state,
    validationSchema: !loginflow ? PassSchema : null,
    onSubmit: onNext,
  });

  useEffect(() => {
    changeLanguage(language);
  }, []);

  function cb(response) {
    const args = response?.success;
    dispatch({type: 'SAVE_PROFILE', payload: response.data});

    dispatch({type: 'DISABLE_LOADING'});
    dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'globalSyncStatus',
        value: true,
      },
    });

    if (forgetPasswordCode == 1) {
      navigation.navigate('HomeScreen');
    } else if (args) {
      // screen code 3 means , password set
      dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});

      // odish screen if oritya
      if (language === 'or') {
        navigation.navigate('LocationOdisha');
      } else navigation.navigate('Location');
    }
  }



  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <CustomInput
        style={styles.inputPass}
        placeholder={t('password')}
        placeholderTextColor="#FF6C00"
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        keyboardType="number-pad"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      {!loginflow && (
        <CustomInput
          style={styles.inputConfPass}
          placeholder={t('confirm password')}
          placeholderTextColor="#FF6C00"
          onChangeText={formik.handleChange('confirmPassword')}
          secureTextEntry={true}
          keyboardType="number-pad"
          onBlur={formik.handleBlur('confirmPassword')}
          value={formik.values.confirmPassword}
        />
      )}
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
      )}
      <CustomButton style={styles.nextButton} onPress={formik.handleSubmit}>
        <Text style={styles.nextButtonText}>
          {loginflow ? 'LOGIN' : t('next')}
        </Text>
      </CustomButton>
    </ImageBackground>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: '10%',
    // padding: '15%',
  },
  inputPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    // color: '#480E09',
  },
  inputConfPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    // color: '#480E09',
  },
  nextButton: {
    // backgroundColor: '#480E09',

    // height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nextButtonText: {
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
  bg: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    paddingHorizontal: '10%',
    paddingVertical: '10%',
  },
});

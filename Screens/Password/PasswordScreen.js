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
  View,
  Pressable,
} from 'react-native';
import queue, {Worker} from 'react-native-job-queue';
// import queue, {Worker} from '../../index';

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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BG_IMG_PATH = require('../../assets/images/background.png');

const PasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginflow, setLoginFlow] = useState(false);
  const route = useRoute();

  React.useEffect(() => {
    if (route?.params?.login === true) {
      setLoginFlow(true);
    }
  }, [route?.params]);


  console.log('Params', route.params);
  const forgetPasswordCode = route.params.forgetPasswordCode || '2';
  console.log('forgetPasswordCode', forgetPasswordCode);

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

  console.log('PwdToVerify', pwdToVerify);

  const {language, globalSyncStatus} = useSelector(
    e => e?.entities?.appUtil?.appUtil,
  );

  const {t} = useTranslation();
  const authTranslation = t('auth');
  const commonTranslation = t('common');
  


  const PassSchema = object().shape({
    password: string().required(authTranslation.password_required),
    confirmPassword: string()
      .required(authTranslation.confirm_password_required)
      .oneOf(
        [ref('password'), null],
        authTranslation.password_does_not_match,
      ),
  });
  console.log('loginflow--', loginflow);

  const savePasswordHandler = async ({ mobile, password }) => {
    try {
      // const { data: response } = await updatePasswordHandler({ mobile, password });
      const response = await updatePasswordHandler({ mobile, password });

      console.log('Response from updatePasswordHandler:', response);
      dispatch({ type: 'SAVE_PROFILE', payload: response.data });
      dispatch({ type: 'DISABLE_LOADING' });
      dispatch({
        type: 'UPDATE_APPUTIL_KEY',
        payload: {
          key: 'globalSyncStatus',
          value: true,
        },
      });
      if (response?.success) {
        dispatch({ type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3 });
      }
      return response;
    } catch (err) {
      console.log('Error updating password', err);
      throw err;
    }
  };

  const onNext = async (values, formikActions) => {
    formikActions.setSubmitting(false);
    // dispatch({type: 'ENABLE_LOADING'});
    if (loginflow === true) {
      console.log('PwdToVerify', pwdToVerify);
      if (pwdToVerify === formik.values.password) {
        navigation.replace('DownloadPDF');
      } else {
        toast.show(authTranslation.incorrect_password, {
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

      // console.log("Schedule Job updatePasswordWorker")
      // queue.addJob(
      //   'UPDATEPasswordWorker',
      //   {
      //     mobile,
      //     password: formik.values.password,
      //   },
      //   {
      //     attempts: 2,
      //     timeout: 5000,
      //   },
      // );

      try {
        await savePasswordHandler({ mobile, password: formik.values.password });
        navigation?.replace('ClaimTypeSelectionScreen');
      } catch (error) {
        console.log('Error saving password', error);
      }


  
      if (forgetPasswordCode == 1) {
        navigation.replace('HomeScreen');
      }

      
      // navigation?.replace('GovernmentOfficialCheck')
      // navigation.replace('Location');

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

   if (args) {
      // screen code 3 means , password set
      dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});

      // odish screen if oritya
      if (language === 'or') {
        navigation.navigate('LocationOdisha');
      } else {
        navigation.navigate('ClaimTypeSelectionScreen');
    }

    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View
        style={{
          marginLeft: 20,
          marginTop: 10,
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100%',
          right: 0,
          left: 0,
          paddingVertical: 5,
          paddingLeft: 10,
        }}>
        <Pressable>
          <Text style={{fontSize: 18, color: '#480E09', marginBottom: 10}}>
            {authTranslation.set_pin}
          </Text>
        </Pressable>
      </View>

      <Text style={{color: '#fff', fontSize: 18, marginTop: 30}}>
        {authTranslation.enter_4_digit_pin}
      </Text>

      <TextInput
        maxLength={4}
        style={styles.inputPass}
        placeholder={authTranslation.enter_password}
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
        <TextInput
          maxLength={4}
          style={styles.inputConfPass}
          placeholder={authTranslation.confirm_password}
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
          {loginflow ? authTranslation.login : commonTranslation.next}
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
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 70,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: '5%',
    color: '#FFFFFF',
    paddingVertical: '2%',
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    // color: '#480E09',
  },
  inputConfPass: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 70,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: 'transparent',
    marginTop: '5%',
    color: '#FFFFFF',
    paddingVertical: '2%',
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

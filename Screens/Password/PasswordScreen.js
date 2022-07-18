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
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, string, ref} from 'yup';
import {updatePasswordAction} from '../../redux-store/actions/auth';
import {useRoute} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';


const BG_IMG_PATH = require('../../assets/images/background.png');




const PasswordScreen = ({navigation}) => {
  const language = 'hi';
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

  const state = {
    password: '',
    confirmPassword: '',
  };
  const mobile = useSelector(
    state => state.entities.auth.userInfo.profile.mobile,
  );
  const pwdToVerify = useSelector(
    state => state.entities.auth.userInfo.profile.password
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

  const onNext = (values, formikActions) => {
    formikActions.setSubmitting(false);
    // dispatch({type: 'ENABLE_LOADING'});
    if (loginflow) {
      console.log("PTV",pwdToVerify)
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

      dispatch(
        updatePasswordAction(
          {
            mobile: mobile,
            password: formik.values.password,
            confirmPassword: formik.values.confirmPassword,
          },
          args => {
            if (args) {
              // screen code 3 means , password set 
              dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});
              navigation.navigate('Location');
            }
          },
        ),
      );
      
    }
    // dispatch({type: 'DISABLE_LOADING'});
  };

  const formik = useFormik({
    initialValues: state,
    validationSchema: !loginflow ? PassSchema : null,
    onSubmit: onNext,
  });

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (<ImageBackground
    source={BG_IMG_PATH}
    resizeMode="cover"
    blurRadius={10}
    style={styles.bg}>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.inputPass}
          placeholder={t('password')}
          placeholderTextColor="#480E09"
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
            style={styles.inputConfPass}
            placeholder={t('confirm password')}
            placeholderTextColor="#480E09"
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
        <TouchableOpacity
          style={styles.nextButton}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.nextButtonText}>
            {loginflow ? 'LOGIN' : t('next')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    padding: '15%',
  },
  inputPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  inputConfPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  nextButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: '8%',
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
      // flex: 1,
      height: '100%',
      width: '100%',
    }

});
// /* eslint-disable no-alert */
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   Keyboard,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {useTranslation} from 'react-i18next';
// import '../../assets/i18n/i18n';
// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {useFormik} from 'formik';
// import {object, string, ref} from 'yup';
// import {updatePasswordAction} from '../../redux-store/actions/auth';

// const PasswordScreen = ({navigation}) => {
//   const language = 'hi';
//   const dispatch = useDispatch();

//   const mobile = useSelector(
//     state => state.entities.auth.userInfo.profile.mobile,
//   );
//   const state = {
//     password: '',
//     confirmPassword: '',
//   };

//   const {t, i18n} = useTranslation();

//   const [currentLanguage, setCurrentLanguage] = useState('en');

//   const changeLanguage = value => {
//     i18n
//       .changeLanguage(value)
//       .then(() => setCurrentLanguage(value))
//       .catch(err => console.log(err));
//   };
//   const PassSchema = object().shape({
//     password: string().required(t('Password is Required')),
//     confirmPassword: string()
//       .required(t('Confirm Password is Required'))
//       .oneOf(
//         [ref('password'), null],
//         t('Password and Confirm Password does not match'),
//       ),
//   });

//   const onNext = (values, formikActions) => {
//     formikActions.setSubmitting(false);
//     dispatch(
//       updatePasswordAction(
//         {
//           mobile: mobile,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//         },
//         args => {
//           if (args) {
//             dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});
//           }
//         },
//       ),
//     );
//     navigation.navigate('LocationInformation');
//   };

//   const formik = useFormik({
//     initialValues: state,
//     validationSchema: PassSchema,
//     onSubmit: onNext,
//   });

//   useEffect(() => {
//     changeLanguage(language);
//   }, []);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <KeyboardAvoidingView style={styles.container}>
//         <TextInput
//           style={styles.inputPass}
//           placeholder={t('password')}
//           placeholderTextColor="#480E09"
//           onChangeText={formik.handleChange('password')}
//           secureTextEntry={true}
//           onBlur={formik.handleBlur('password')}
//           value={formik.values.password}
//         />
//         {formik.touched.password && formik.errors.password && (
//           <Text style={styles.error}>{formik.errors.password}</Text>
//         )}
//         <TextInput
//           style={styles.inputConfPass}
//           placeholder={t('confirm password')}
//           placeholderTextColor="#480E09"
//           onChangeText={formik.handleChange('confirmPassword')}
//           secureTextEntry={true}
//           onBlur={formik.handleBlur('confirmPassword')}
//           value={formik.values.confirmPassword}
//         />
//         {formik.touched.confirmPassword && formik.errors.confirmPassword && (
//           <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
//         )}
//         <TouchableOpacity
//           style={styles.nextButton}
//           onPress={formik.handleSubmit}>
//           <Text style={styles.nextButtonText}>{t('next')}</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default PasswordScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     // justifyContent: 'center',
//     padding: '15%',
//   },
//   inputPass: {
//     borderColor: '#CCCCCC',
//     borderBottomWidth: 1,
//     width: '100%',
//     fontSize: 25,
//     color: '#480E09',
//   },
//   inputConfPass: {
//     borderColor: '#CCCCCC',
//     borderBottomWidth: 1,
//     width: '100%',
//     fontSize: 25,
//     color: '#480E09',
//   },
//   nextButton: {
//     backgroundColor: '#480E09',
//     width: '100%',
//     height: '8%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '10%',
//   },
//   nextButtonText: {
//     color: 'white',
//     textTransform: 'uppercase',
//     fontSize: 20,
//   },
//   error: {
//     fontSize: 12,
//     fontFamily: 'Roboto-Medium',
//     fontWeight: '400',
//     fontStyle: 'normal',
//     lineHeight: 14,
//     color: 'red',
//     marginTop: '2%',
//   },
// });

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

const BG_IMG_PATH = require('../../assets/images/background.png');
const PasswordScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();

  const mobile = useSelector(
    state => state.entities.auth.userInfo.profile.mobile,
  );
  const state = {
    password: '',
    confirmPassword: '',
  };

  const [name, setName] = useState('Ram Krishna');

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };
  // const PassSchema = object().shape({
  //   password: string().required(t('Password is Required')),
  //   confirmPassword: string()
  //     .required(t('Confirm Password is Required'))
  //     .oneOf(
  //       [ref('password'), null],
  //       t('Password and Confirm Password does not match'),
  //     ),
  // });

  const onNext = (values, formikActions) => {
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

  const formik = useFormik({
    initialValues: state,
    // validationSchema: PassSchema,
    onSubmit: onNext,
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
              <Text style={styles.headerText}>{t('Password')}</Text>
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
              error={formik.errors.password && formik.touched.password}
            />
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('confirm password')}</Text>
            </View>
            <CustomInput
              onChangeText={formik.handleChange('confirmPassword')}
              onBlur={formik.handleBlur('confirmPassword')}
              value={formik.values.confirmPassword}
              error={
                formik.errors.confirmPassword && formik.touched.confirmPassword
              }
            />
            <CustomButton
              text={t('Password Set')}
              onPress={formik.handleSubmit}
              style={styles.otpBtn}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

export default PasswordScreen;

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

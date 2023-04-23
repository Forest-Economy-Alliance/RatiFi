import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Alert,
  Linking,
  Alert,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import 'yup-phone';
import CustomButton from '../../components/CustomButton';
import {useSelector,useDispatch} from 'react-redux';
import {useSelector,useDispatch} from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import {object, string} from 'yup';
import CustomError from '../../components/CustomError';
import { updateUserInfoAction } from '../../redux-store/actions/auth';
import { updateUserInfoAction } from '../../redux-store/actions/auth';
const BG_IMG_PATH = require('../../assets/images/background.png');
const RoleScreen = ({navigation}) => {
  const language = 'hi';
  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  const state = {
    member: '',
    role: '',
  };

  const {t, i18n} = useTranslation();
  const dispatch=useDispatch();
  const dispatch=useDispatch();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [errorVisible, setErrorVisible] = useState(false);


  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const onNext = (values, formikActions) => {
    console.log(values);
    formikActions.setSubmitting(false);



    dispatch(
      updateUserInfoAction(
        {

          authLevel:values.member,
          postLevel:values.role
          
        },
        args => {
          if (args) {


            // screencode 5 means role set
            dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 5});

            // navigation.navigate('HomeScreen');
            navigation.navigate('FRCHome');
<<<<<<< Updated upstream
            navigation.navigate("HomeScreen")
            // navigation.navigate('IdCard');

=======
            // navigation.navigate('HomeScreen');
            navigation.navigate('FRCHome');
            // navigation.navigate('IdCard');
          } else {
            // toast.show(t('ALREADY_ASSIGNED_ROLE'), {
            //   type: 'success',
            //   animationType: 'zoom-in',
            //   successColor: '#480E09',
            //   placement: 'top',
            //   duration: 5000,
            // });
            // alert(t('ALREADY_ASSIGNED_ROLE'));
            // this alert button should have a help button which will redirect to the help screen
            Alert.alert(t('ALREADY_ASSIGNED_ROLE'), "", [
              {
                text: "Ok",
                // onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Help', onPress: () => {
                // link to whatsapp
                Linking.openURL("https://wa.me/918107204259?text=I'm%20having%20issue%20with%20Ratifi%20Registration.");
              }},
            ]);
        
            // toast.show(t('ALREADY_ASSIGNED_ROLE'), {
            //   type: 'success',
            //   animationType: 'zoom-in',
            //   successColor: '#480E09',
            //   placement: 'top',
            //   duration: 5000,
            // });
            // alert(t('ALREADY_ASSIGNED_ROLE'));
            // this alert button should have a help button which will redirect to the help screen
            Alert.alert(t('ALREADY_ASSIGNED_ROLE'), "", [
              {
                text: "Ok",
                // onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Help', onPress: () => {
                // link to whatsapp
                Linking.openURL("https://wa.me/918107204259?text=I'm%20having%20issue%20with%20Ratifi%20Registration.");
              }},
            ]);
        
>>>>>>> Stashed changes
          }
        },
      ),
    );

    

    
  };

  const uidSchema = object().shape({
    member: string().required(t('Membership is Required')),
    role: string().required(t('Role is Required')),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: uidSchema,
    onSubmit: onNext,
  });

  const data1 = [
    {
      label: t('FRC'),
      value: '1',
      roleData: [
        {
          label: t('President'),
          value: '1',
        },
        {
          label: t('Secretary'),
          value: '2',
        },
        {
          label: t('Member'),
          value: '3',
        },
      ],
    },
    {
      label: t('SDLC'),
      value: '2',
      roleData: [
        {
          label: t('Subdivisonal Officer'),
          value: '1',
        },
        {
          label: t('Tehsildar'),
          value: '2',
        },
        {
          label: t('Forest Range Officer'),
          value: '3',
        },
        {
          label: t('Member'),
          value: '4',
        },
      ],
    },
    {
      label: t('DLC'),
      value: '3',
      roleData: [
        {
          label: 'District Collector',
          value: '1',
        },
        {
          label: 'District Forest Officer',
          label: 'District Forest Officer',
          value: '2',
        },
        {
          label: 'Officer-in-Charge (Tribal Affairs)',
          label: 'Officer-in-Charge (Tribal Affairs)',
          value: '3',
        },
        {
          label: 'Member',
          label: 'Member',
          value: '4',
        },
      ],
    },
  ];

  const buttonText = {
    member: t('Fill Membership'),
    role: t('Fill Role'),
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
      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <View style={styles.name}>
                <Text style={styles.nameTxt}>{name}</Text>
              </View>
              <View style={styles.horizontalLine} />
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>
                {t('specify your membership')}
              </Text>
            </View>
            <Dropdown
              visible={true}
              data={data1}
              formik={formik}
              variable={'member'}
            />
            <View style={styles.title}>
              <Text style={styles.titleText}>{t('specify your role')}</Text>
            </View>
            <Dropdown
              visible={true}
              data={
                data1
                  .filter(item => item.label === formik.values.member)
                  .map(item => {
                    return item.roleData;
                  })[0]
              }
              formik={formik}
              variable={'role'}
            />
            <CustomButton
              text={t('Next')}
              onPress={async () => {
                if (formik.errors.member || formik.errors.role) {
                  console.log(formik.errors);
                  setErrorVisible(true);
                }
                formik.handleSubmit();
                // navigation.navigate('FRCHome');
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

export default RoleScreen;

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

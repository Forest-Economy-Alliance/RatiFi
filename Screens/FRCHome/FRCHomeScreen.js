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
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';

const BG_IMG_PATH = require('../../assets/images/background.png');
const FRCHomeScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();

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

  const [name, setName] = useState('Ram Krishna');
  const [member, setMember] = useState('FRC');
  const [role, setRole] = useState('Secretary');
  const [state, setState] = useState('Himachal Pradesh');
  const [district, setDistrict] = useState('Kagda');
  const [tehsil, setTehsil] = useState('Palampur');
  const [panchayat, setPanchayat] = useState('Gopalpur');
  const [village, setVillage] = useState('Gujrehra');

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
              <Text style={styles.headerText}>
                {name}
                {', '}
                {role}
                {', '}
                {member}
              </Text>
              <Text style={styles.subheaderText}>
                {t(village)}
                {', '}
                {t(panchayat)}
                {', '}
                {t(tehsil)}
                {', '}
                {t(district)}
                {', '}
                {t(state)}
              </Text>
            </View>
            <CustomButton
              text={t('Edit Profile')}
              onPress={() => {}}
              style={styles.epBtnView}
              button={styles.epBtn}
            />
            {/* <View style={styles.horizontalLine} /> */}
            <CustomInput/>
            <CustomButton
              text={t('Track old claim')}
              onPress={() => {}}
              style={styles.otBtnView}
              button={styles.otBtn}
            />
            <CustomButton
              text={t('File claim')}
              onPress={() => {}}
              style={styles.ntBtnView}
              button={styles.ntBtn}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default FRCHomeScreen;

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
    alignItems: 'flex-start',
    paddingTop: '15%',
    marginHorizontal: '10%',
  },
  headerText: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  subheaderText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  horizontalLine: {
    width: '80%',
    marginLeft: '10%',
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
  epBtnView: {
    flexDirection: 'row',
    marginTop: '2%',
    marginRight: '10%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // backgroundColor: '#FFFFFF',
  },
  epBtn: {
    width: '40%',
    paddingVertical: '2%',
  },
  otBtnView: {
    flexDirection: 'row',
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
  },
  otBtn: {
    width: '75%',
    paddingVertical: '2%',
  },
  ntBtnView: {
    flexDirection: 'row',
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
  },
  ntBtn: {
    width: '55%',
    paddingVertical: '2%',
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

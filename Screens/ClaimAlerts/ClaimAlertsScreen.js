/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import {BackHandler} from 'react-native';

import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import {object, string} from 'yup';
import CustomError from '../../components/CustomError';
import {updateUserInfoAction} from '../../redux-store/actions/auth';
import {useRoute} from '@react-navigation/native';
import {G} from 'react-native-svg';
import {request} from '../../services/APICentral';
import dayjs from 'dayjs';
const BG_IMG_PATH = require('../../assets/images/background.png');
const ClaimAlertsScreen = ({navigation}) => {
  const [alerts, setAlerts] = useState([]);
  const {namet, panchayat, tehsil, statet, district, postLevel, authLevel} =
    useSelector(state => state.entities.auth.userInfo?.profile);
  console.log(authLevel);
  // console.log(authLevel=="एसडीएलसी");
  const route = useRoute();
  const {_id} = useSelector(state => state.entities.auth.userInfo?.profile);

  const language = 'hi';
  const dispatch = useDispatch();
  const name = useSelector(state => state.entities.appUtil.appUtil.name);

  const state = {
    state: '',
    district: '',
    tehsil: '',
    panchayat: '',
    village: '',
  };

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [errorVisible, setErrorVisible] = useState(false);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const buttonText = {
    state: t('Fill State'),
    district: t('Fill District'),
    tehsil: t('Fill Tehsil'),
    panchayat: t('Fill Panchayat'),
    village: t('Fill Village'),
  };

  useEffect(() => {
    changeLanguage(language);

    console.log(_id);
    request(`/fetch-notifications?id=${_id}`, {method: 'GET'}, true, false)
      .then(({data}) => {
        console.log(data);
        setAlerts(data?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <ScrollView style={styles.darkness}>
        <Text style={{fontSize:20,marginVertical:10,marginHorizontal:10}} numberOfLines={2}>{t('claim_alerts')}</Text>
        <FlatList
        ListEmptyComponent={()=>{
          return <View style={{
            margin:10,
            padding:10
          }}>
      <Text style={{color:'#fff',fontWeight:'600',textDecorationLine:'underline'}}>{t('No Alerts')}</Text>
      <Text style={{color:'#fff',marginTop:10}}>{t('Alerts regarding claim will appear here')}</Text>
          </View>
        }}
          data={alerts}
          renderItem={({item, index}) => (
            <View style={{marginHorizontal:10,marginVertical:5,borderWidth:1,padding:10,borderRadius:10,borderColor:'#fff'}}>
          <Text style={{color:"#fff",marginVertical:5}}>{item?.message}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{color:'#fff'}}>{item?.senderName}</Text>
              <Text  style={{color:'#fff'}}> {item?.senderMobile}</Text>
          </View>
          <Text style={{color:'#fff'}}>{dayjs(item?.createdAt).format('DD/MM/YYYY HH:MM A')}</Text>
            </View>
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default ClaimAlertsScreen;

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
    marginTop: '4%',
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
    marginBottom: '10%',
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

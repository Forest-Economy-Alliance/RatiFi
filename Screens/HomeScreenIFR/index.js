/* eslint-disable prettier/prettier */
/**
 * Comment - This is Central Home Screen with 4 Menus
 */
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    Alert,
  } from 'react-native';
  import FastImage from 'react-native-fast-image';
  import {useTranslation} from 'react-i18next';
  import '../../assets/i18n/i18n';
  import React, {useEffect, useState} from 'react';
  // import {Dropdown} from 'react-native-element-dropdown';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import {useDispatch, useSelector} from 'react-redux';
  import {AllVillages} from '../../constants/Villages';
  import CustomButton from '../../components/CustomButton';
  import Dropdown from '../../components/CustomDropdown';
  import {useFormik} from 'formik';
  import Loader from '../../components/Loader';
  import CustomSignOutPopup from '../../components/CustomSignOutPopup';
  import axios from 'axios';
  import {BASE_URL, request} from '../../services/APICentral';
  import {BackHandler} from 'react-native';
  import HI from '../../assets/i18n/hi.json';
  import {getDeviceHash} from '../../utils/DeviceUtil';
  import RoleScreen from '../Role/RoleScreen';
  import {verifYYMember} from '../../redux-store/actions/auth';
  import {
    checkAccount,
    logoutHandler,
    verifyyMember,
    viewFRCMember,
  } from '../../services/authService';
  import {firebase} from '@react-native-firebase/messaging';
  const BG_IMG_PATH = require('../../assets/images/background.png');
  
  const HomeScreenIFR = ({navigation}) => {
    const [notificationCount, setNC] = useState(0);
  
    const [imgUrl, setImgUrl] = useState('x');
    const [vData, setVData] = useState([]);
    const {
      name,
      panchayat,
      tehsil,
      state,
      district,
      postLevel,
      authLevel,
      village,
    } = useSelector(state => state.entities.auth.userInfo?.profile);
    // console.log(authLevel=="एसडीएलसी");
    // alert("Hi")
    const vil = useSelector(
      state => state.entities.auth.userInfo.profile.village,
    );
    const [vis, setVis] = useState(false);
    const language = 'hi';
    const dispatch = useDispatch();
    const [role, setRole] = useState('FRC');
    const [val5, setVal5] = useState('');
    // const [village, setVillage] = useState('');
    const [gramSabha, setGramSabha] = useState('');
    const [pressed, setPressed] = useState(false);
    const [villages, setVillages] = useState(AllVillages);
    const {t, i18n} = useTranslation();
  
    const [currentLanguage, setCurrentLanguage] = useState('en');
    console.log(postLevel == 'अध्यक्ष');
  
    const changeLanguage = value => {
      i18n
        .changeLanguage(value)
        .then(() => setCurrentLanguage(value))
        .catch(err => console.log(err));
    };
  
    useEffect(() => {
      changeLanguage(language);
    }, []);
  
    const {profile} = useSelector(state => state.entities.auth.userInfo);
  
    const handleSignOut = () => {
      setVis(true);
    };
  
    const fetchData = async () => {
      await firebase.messaging().registerDeviceForRemoteMessages();
      const fcmToken = await firebase.messaging().getToken();
      console.log('fcm', fcmToken);
  
      return fcmToken;
    };
    const signout = async () => {
      logoutHandler({
        id: profile?._id?.toString(),
        fcmToken: await fetchData(),
      })
        .then(res => {
          setVis(false);
          dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 1});
          dispatch({type: 'SAVE_TOKEN', payload: null});
          // App Breackage Issue - To be discussed later  dispatch({type: 'CLEAR_PROFILE', payload: null});
          navigation.replace('NamePhone');
        })
        .catch(error => {
          Alert.alert('Something went wrong',error?.toString());
        });
      // dispatch({type: 'SAVE_PROFILE', payload: null});
    };
  
    const viewFRCMembers = village => {
      console.log('view all FRC members of village', {
        village: village,
        authLevel: authLevel,
        postLevel: 'सदस्य',
      });
      dispatch({type: 'ENABLE_LOADING'});
      return viewFRCMember({
        village: village,
        authLevel: authLevel,
        postLevel: 'सदस्य',
      })
        .then(async response => {
          console.log('View Members', response.data.data);
          navigation.navigate('FRCMembers', {members: response.data.data});
          dispatch({type: 'DISABLE_LOADING'});
          //     if (response.success) {
          //       dispatch({ type: 'VERIFY_MEMBER', payload: {} });
          //     }
          //     if (callback) {
          //       callback(response.message);
          //     }
        })
        .catch(err => {
          console.log('NETWORK', err);
          dispatch({type: 'DISABLE_LOADING'});
        });
    };
    // console.log(districts);
  
    // const uidSchema = object().shape({
    //   type: string().required(t('Identity Card Type is Required')),
    //   uid: string().required(t('UID is Required')),
    // });
  
    const formik = useFormik({
      // initialValues: state,
      // validationSchema: uidSchema,
      // onSubmit: onNext,
    });
  
    // leave app on back button press on this screen
    useEffect(() => {
      const backAction = () => {
        // current screen is home screen
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
    }, []);
    // Make a useEffect run on particular pages
    const getEnglish = param => {
      console.log('OK', HI.translation);
  
      const left = Object.keys(HI.translation);
      const right = Object.values(HI.translation);
      const len = left.length;
      for (let i = 0; i < len; i++) {
        if (right[i] === val5.label) {
          return left[i].toLowerCase();
        }
      }
    };
  
    const UpdateRole = () => {
      // Move to RoleScreen
      navigation.navigate('Role');
    };
  
    useEffect(() => {
      // dispatch user profile
      checkAccount({mobile: profile?.mobile}).then(data => {
        dispatch({type: 'SAVE_PROFILE', payload: data?.data?.data});
      });
  
      request(
        `/fetch-notifications?id=${profile?._id}`,
        {method: 'GET'},
        true,
        false,
      )
        .then(({data}) => {
          console.log('x', data?.data?.length);
          setNC(data?.data?.length);
        })
        .catch(err => {
          console.log(err);
        });
    }, []);
  
    return (
      // flexWrap: 'wrap',
      <ImageBackground
        source={BG_IMG_PATH}
        resizeMode="cover"
        blurRadius={10}
        style={styles.bg}
        // imageStyle={{tintColor: 'rgba(255,0,0,0.5)'}}
        >
        <View style={{paddingHorizontal: 20}}>
          {vis && (
            <CustomSignOutPopup vis={vis} setVis={setVis} signout={signout} />
          )}
  
          <TouchableOpacity style={styles.roleContainer} onPress={handleSignOut}>
            <Text style={styles.roleText}>
              {' '}
              <FontAwesome name="user-circle-o" size={30} color="white" />{' '}
            </Text>
          </TouchableOpacity>
  
          {/* <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={villages}
              search={false}
              maxHeight={300}
              labelField="Village"
              valueField="value"
              placeholder={t('gram sabha')}
              searchPlaceholder="Search..."
              value={val5}
              onChange={item => {
                console.log(item);
                setVal5(item.value);
                setVillage(item.Village);
              }}
              dropdownPosition="bottom"
            /> */}
  
          {/*   
            <Dropdown
              
              downloadPDFScreenFix={setVal5}
              visible={true}
              data={vData}
              formik={formik}
              variable={'type'}
            />
    
     */}
  
          <View style={styles.header}>
            {village === '-1' ? (
              <Text>कृपया अपनी जानकरी अपडेट करें</Text>
            ) : (
              <>
                <Text style={styles.headerText}>
                  {name}
                  {', '}
                  {postLevel}
                  {', '}
                  {authLevel}
                </Text>
                <Text style={styles.subheaderText}>
                  {/* {t(village)} */}
                  {t(panchayat)}
                  {', '}
                  {t(tehsil)}
                  {', '}
                  {t(district)}
                  {', '}
                  {t(state)}
                </Text>
              </>
            )}
          </View>
  
         
  
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            text={t('Edit Profile')}
            onPress={() => {
              // if (redux vairable ===or){}
              if (language === 'or') {
                navigation.navigate('LocationOdisha', {
                  editProfile: true,
                });
              } else {
                navigation.navigate('Location', {
                  editProfile: true,
                  role: authLevel,
                });
              }
  
              // if(authLevel=="एसडीएलसी"){
              //     navigation.navigate("LocationInformationSDLC")
              // }
              // else{
              //     navigation.navigate("Location", {
              //         editProfile: true
              //     })
              // }
            }}
          />
          {/* Add a button to change Role */}
          {/* @COMMENTED OUT ON 7 SEPT - 7:39PM <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            text={t('Edit Role')}
            onPress={() => {
              UpdateRole();
            }}
          /> */}
          {true && (
            <CustomButton
              style={{marginBottom: 20}}
              button={{width: 300}}
              // dsbled={profile?.claims?.length==0}
              text={t('Track old claim')}
              onPress={() => {
                if (profile?.claims?.length === 0) {
                  alert(t('CLAIM_NOT_APPLIED'));
                } else navigation.navigate('PastRecordsIFR');
              }}
            />
          )}
          {/* <CustomButton
                      style={{ marginBottom: 20 }}
                      button={{ width: 300 }}
                      // dsbled={profile?.claims?.length==0}
                      text={t('Change Gender')}
                      onPress={() => {
                           
                              navigation.navigate('Gender')
                      }}
                  /> */}
       
  
          <View
            style={{
              backgroundColor: 'green',
            }}></View>
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            onPress={() => {
              navigation.navigate('ClaimAlertsScreen');
              // all the alers related to claim
              // @ TODO
              // Notii aiotn Badge Icon
            }}>
            {t('claim_alerts')}
            &nbsp;&nbsp;
            {notificationCount !== 0 && (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5,
                  zIndex: 199,
                  borderRadius: 10,
                }}>
                ({notificationCount})
              </Text>
            )}
          </CustomButton>
        </View>
  
  
        
        {/* <CustomButton
            style={{marginBottom: 20,backgroundColor:'#480E09',paddingVertical:10,textAlign:'center'}}
            button={{width: 300}}
            btnText={{textAlign:'center'}}
            onPress={() => {
               navigation.navigate("IFRScreen");
            }}>
            {t('apply for individual forest right')}
          </CustomButton> */}
      </ImageBackground>
    );
  };
  
 
  
  export default HomeScreenIFR;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      padding: '20%',
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: '5%',
      marginBottom: '5%',
      // backgroundColor: '#D3F2D3',
      alignSelf: 'flex-end',
      borderRadius: 100,
      // borderWidth: 1,
      borderColor: '#C8CCC8',
      // paddingHorizontal:20
    },
    roleText: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: '5%',
      color: '#480E09',
    },
    inputGramSabha: {
      borderColor: '#CCCCCC',
      borderBottomWidth: 1,
      width: '100%',
      fontSize: 25,
      color: '#480E09',
    },
    dropdown: {
      margin: '5%',
      height: '8%',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 25,
      color: '#480E09',
    },
    selectedTextStyle: {
      fontSize: 25,
      color: '#480E09',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: 'black',
    },
    nextButton: {
      backgroundColor: '#480E09',
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    },
    nextButtonText: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 20,
    },
    getDocsButton: {
      backgroundColor: '#480E09',
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    },
    getDocsButtonText: {
      color: 'white',
      textTransform: 'uppercase',
      fontSize: 20,
    },
    msgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#C8CCC8',
      marginTop: '10%',
      padding: '5%',
    },
    msg: {
      fontSize: 20,
      color: '#480E09',
      textAlign: 'center',
    },
    subMsg: {
      fontSize: 20,
      color: '#480E09',
      textAlign: 'center',
      marginTop: '5%',
    },
    bg: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    header: {
      paddingTop: '15%',
      marginHorizontal: '10%',
      marginBottom: '10%',
    },
    headerText: {
      fontSize: 22,
      color: '#FFFFFF',
    },
    subheaderText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
  });
  
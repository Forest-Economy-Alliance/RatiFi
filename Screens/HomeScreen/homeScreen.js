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
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
// import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  updatedOneSignalIDHandler,
  verifyyMember,
  viewFRCMember,
} from '../../services/authService';
import {firebase} from '@react-native-firebase/messaging';
import {OneSignal} from 'react-native-onesignal';
import {VasernDB} from '../../vasern';

import {err} from 'react-native-svg/lib/typescript/xml';
import auth from '../../redux-store/reducers/entities/auth';
import {patchClaimHandler} from '../../services/claimService';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useFocusEffect} from '@react-navigation/native';
import NetworkSpeed from 'react-native-network-speed';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
const BG_IMG_PATH = require('../../assets/images/background.png');

const HomeScreen = ({navigation}) => {
  const {ClaimImages} = VasernDB;
  const {isConnected} = useNetInfo();
  const [speed, setSpeed] = useState('');
  const [canSync,setCanSync]=useState(true);
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
    activeStatus,
    password,
    subdivison,
  } = useSelector(state => state.entities.auth.userInfo?.profile);

  const {typeOfClaim} = useSelector(state => state.entities.appUtil.appUtil);

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
  const [pendingCount, setPendingCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  console.log(postLevel == 'अध्यक्ष');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (!password) {
      navigation.replace('Password');
    } else if (!typeOfClaim) {
      navigation.replace('ClaimTypeSelectionScreen');
    } else if (!authLevel || !postLevel) {
      navigation.replace('GovernmentOfficialCheck');
    }
  }, []);

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
      fcmToken: 'await fetchData()',
    })
      .then(res => {
        setVis(false);

        ({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 1});
        dispatch({type: 'SAVE_TOKEN', payload: null});
        // App Breackage Issue - To be discussed later  dispatch({type: 'CLEAR_PROFILE', payload: null});
        navigation.replace('MobilePassword');
      })
      .catch(error => {
        Alert.alert('Something went wrong', error?.toString());
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
  //

  useFocusEffect(
    React.useCallback(() => {
      console.log('syncer called');

      async function syncer() {
        console.log('syncer called');
        setCanSync(false);
        const da = await ClaimImages.data();
        console.log('len', da?.length);
        setPendingCount(da?.length);
        for await (let key of da) {
          try {
            console.log(key?.name + '->initiated');
            const response = await getGCPUrlImageHandler({
              fileName: 'Hello',
              base64Data: key?.base64Data,
              isPdf: false,
              userId: key?.userId || 'unknown-asset',
            });

            const rssponse = await patchClaimHandler({
              claimId: key?.claimId,
              title: key?.name,
              userId: key?.userId,
              storageUrl: response?.data.response.Location,
              extraImageID: key?.extraImageID || undefined,
              shouldTriggerJointVerification:
                key?.shouldTriggerJointVerification,
              IS_IFR_CLAIM: key?.IS_IFR_CLAIM || false,
              oneSignalId:
                OneSignal.User.pushSubscription.getPushSubscriptionId(),
            });

            console.log('updated-claim');

            // const rmv = await ClaimImages.remove(key?.id);
            // console.warn('rmv',rmv);
            console.log(response?.data.response.Location);

            setPendingCount(e =>Math.max(e-1,0));

            await ClaimImages.remove(key);

          } catch (itemError) {
            console.warn('ierr', itemError);
          }finally{
            setCanSync(true);
            break;
            return ;
          }
        }
      }

      // if(isConnected)
      syncer();
      let t = 0;
      NetworkSpeed.startListenNetworkSpeed(
        ({
          downLoadSpeed,
          downLoadSpeedCurrent,
          upLoadSpeed,
          upLoadSpeedCurrent,
        }) => {
          console.log(upLoadSpeed + 'kb/s'); // upload speed for the current app 当前app的上传速度(currently can only be used on Android)
          setSpeed(upLoadSpeed);
          t += 1;
          console.log(t);
          if (t % 5 === 0 && canSync) syncer();
        },
      );

      // return () => NetworkSpeed.stopListenNetworkSpeed();
    }, []),
  );

  const UpdateRole = () => {
    // Move to RoleScreen
    navigation.navigate('Role');
  };

  useEffect(() => {
    dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'globalSyncStatus',
        value: false,
      },
    });
    // dispatch user profile
    checkAccount({mobile: profile?.mobile}).then(data => {
      console.log(data?.data);

      const {
        authLevel,
        district,
        village,
        panchayat,
        range,
        subdivison,
        tehsil,
      } = data?.data?.data;
      const associatedFields = [
        ...checkFromServer(
          authLevel,
          district,
          subdivison,
          tehsil,
          range,
          panchayat,
          village,
        ),
      ];

    
      console.warn('associatedFields', associatedFields);
      console.log(associatedFields.includes('-1'));
      if (associatedFields.includes('-1') === true) {
        navigation.replace('Location');
      } else {
        console.log('Gelocation Fine');
      }

      dispatch({type: 'SAVE_PROFILE', payload: data?.data?.data});
      dispatch({
        type: 'SAVE_GOVT_OFFICIALS',
        payload: data?.data?.govtOfficials,
      });
    });

    let URL = `/fetch-notifications?id=${profile?._id}`;
    if (authLevel === 'एफआरसी' /* && postLevel === 'सदस्य' */) {
      URL = `/fetch-notifications-by-village?village=${village}`;
    }

    request(URL, {method: 'GET'}, true, false)
      .then(({data}) => {
        console.log('x', data?.data?.length);
        setNC(data?.data?.length);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  async function alpha() {
    OneSignal.Notifications.requestPermission(true);
    const data = OneSignal.User.pushSubscription.getPushSubscriptionId();
    console.log('pid', data);
    dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'OneSignalSubsToken',
        value: data,
      },
    });

    // patch To server
    updatedOneSignalIDHandler({
      userId: profile?._id,
      oneSignalId: data,
    })
      .then(res => {
        console.log('oneSignalId updated in DB');
      })
      .catch(f => {
        console.log('Failed to update oneSignalID', f);
      });
  }

  useEffect(() => {
    if (profile?._id) OneSignal.login(profile?._id);
    if (profile?.mobile) OneSignal.User.addSms(profile?.mobile);
    alpha();
  }, []);

  const handleDisplayLocation = () => {
    if (authLevel === t('FRC')) {
      return [district, subdivison, tehsil, panchayat, village];
    } else if (authLevel === t('SDLC')) {
      return [district, subdivison];
    } else if (authLevel === t('DLC')) {
      return [district];
    } else if (authLevel === t(t('SLMC'))) {
      return [t('Jharkhand')];
    } else if (authLevel === 'भारसाधक  - वन विभाग (SDLC)') {
      return [district, subdivison];
    } else if (authLevel === 'भारसाधक  - राजस्व विभाग (SDLC)') {
      return [district, subdivison, tehsil];
    }
    return [];
  };

  const checkFromServer = (A, B, C, D, range, E, F) => {
    if (A === t('FRC')) {
      return [B, C, D, E, F];
    } else if (A === t('SDLC')) {
      return [B, C];
    } else if (A === t('DLC')) {
      return [B];
    } else if (A === t(t('SLMC'))) {
      return [t('Jharkhand')];
    } else if (A === 'भारसाधक  - वन विभाग (SDLC)') {
      return [B, C];
    } else if (A === 'भारसाधक  - राजस्व विभाग (SDLC)') {
      return [B, C, D];
    }
    return [];
  };

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View style={{paddingHorizontal: 20}}>
        {vis && (
          <CustomSignOutPopup vis={vis} setVis={setVis} signout={signout} />
        )}

        <TouchableOpacity style={styles.roleContainer} onPress={handleSignOut}>
          <Text
            style={{
              fontSize: 20,
              alignSelf: 'center',
              color: '#fff',
              fontWeight: '700',
              color: 'white',
              textDecorationLine: 'underline',
            }}>
            {t('CFR')}
          </Text>

          <Text style={styles.roleText}>
            
            <FontAwesome name="user-circle-o" size={30} color="white" />{' '}
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          {village === '-1' ? (
            <Text style={styles.headerText}>
              {name}
              {', '}
              {postLevel}
              {', '}
              {authLevel}
              {'\n '}
              {t(district) !== '-1' && district + ', '}
              {tehsil !== '-1' && tehsil + ', '}
              {panchayat !== '-1' && panchayat + ', '}
              {t(state)}
            </Text>
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
                {/* {t(village)}{', '}
                {t(panchayat)}
                {', '}
                {t(tehsil)}
                {', '}
                {t(district)}
                {', '}
                {t(state)} */}
                {handleDisplayLocation().map((item, i, a) => {
                  if (i === a.length - 1) return `${t(item)}`;
                  else return `${t(item)}, `;
                })}
              </Text>
            </>
          )}
        </View>

        {!activeStatus && (
          <View
            style={[
              styles.header,
              {
                borderWidth: 1,
                paddingTop: 0,
                borderStyle: 'dashed',
                padding: 10,
              },
            ]}>
            <Text style={{color: 'white', fontSize: 20}}>
              आपके आधार कार्ड विवरण सत्यापित होने के बाद, आपकी प्रोफ़ाइल सक्रिय
              हो जाएगी
            </Text>
            <Text style={{color: 'white', marginTop: 5, fontWeight: '700'}}>
              VERIFICATION - IN-PROCESS
            </Text>
          </View>
        )}

        {Boolean(authLevel === 'एफआरसी' && postLevel !== 'सदस्य') && (
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            text={<Text style={{fontWeight: '700'}}>अवेदन दस्तावेज़ </Text>}
            onPress={() => {
              navigation.navigate('DownloadPDF', {code: 'president'});
            }}
          />
        )}

        {/* Add a button to change Role */}
        {/* @COMMENTED OUT ON 7 SEPT - 7:39PM <CustomButton
          style={{marginBottom: 20}}
          button={{width: 300}}
          text={t('Edit Role')}
          onPress={() => {
            UpdateRole();
          }}
        /> */}
        {Boolean(authLevel == 'एफआरसी' && postLevel !== 'सदस्य') && (
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            // dsbled={profile?.claims?.length==0}
            text={t('Track old claim')}
            onPress={() => {
              if (profile?.claims?.length === 0) {
                Alert.alert('सूचना', t('CLAIM_NOT_APPLIED'));
              } else navigation.navigate('PastRecordsScreen');
            }}
          />
        )}

        {/* {Boolean(authLevel == 'एफआरसी' && postLevel === 'सदस्य') && (
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            // dsbled={profile?.claims?.length==0}
            text={'समुदायिक आवेदन स्थिति'}
            onPress={() => {
              if (profile?.claims?.length === 0) {
                Alert.alert('सूचना', t('CLAIM_NOT_APPLIED'));
              } else navigation.navigate('ViewForms');
            }}
          />
        )} */}
        {/* <CustomButton
                    style={{ marginBottom: 20 }}
                    button={{ width: 300 }}
                    // dsbled={profile?.claims?.length==0}
                    text={t('Change Gender')}
                    onPress={() => {
                         
                            navigation.navigate('Gender')
                    }}
                /> */}

        {/* REMOVED - ON HOLD TILL CAMPAIGN LAUNCH - 27Oct 12:44PM */}
        {/* {postLevel === 'अध्यक्ष' && (
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            // dsbled={profile?.claims?.length==0}
            // text={t('VERIFY MEMBER')}
            text={t('View All Members')}
            onPress={() => {
              viewFRCMembers(village);
            }}
          />
        )} */}

        {authLevel !== 'एफआरसी' && activeStatus && (
          <CustomButton
            style={{marginBottom: 20}}
            button={{width: 300}}
            // dsbled={profile?.claims?.length==0}
            text={'एफआरसी आवेदन स्थिति'}
            onPress={() => {
              console.log('ji');
              navigation.navigate('LocationSdlc');
            }}
          />
        )}

        <View
          style={{
            backgroundColor: 'green',
          }}></View>

        {activeStatus && Boolean(authLevel !== t('SLMC')) && (
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
                {notificationCount !== undefined && `(`}
                {notificationCount}
                {notificationCount != undefined && `)`}
              </Text>
            )}
          </CustomButton>
        )}
      </View>

      {/* HELPDESK TO BE DONE IN FUTURE - 18/Nov */}
      {/* {Boolean(authLevel === 'एफआरसी') && (
        <CustomButton
          style={{marginBottom: 20}}
          button={{width: 300}}
          text={t('Edit Profile')}
          onPress={() => {
            navigation.navigate('Location', {
              editProfile: true,
              role: authLevel,
            });

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
      )} */}

      {/* <CustomButton
          style={{marginBottom: 20}}
          button={{width: 300}}
          // dsbled={profile?.claims?.length==0}
          text={
            <>
              <Ionicons name="open-outline" size={20} />
              &nbsp;
              LOCATION
            </>
          }
          onPress={() => {
            // console.log('ifr-claim');
            navigation.navigate('Location');
          }}
        /> */}

      {authLevel !== 'एफआरसी' && activeStatus && (
        <CustomButton
          style={{marginBottom: 20}}
          button={{width: 300}}
          // dsbled={profile?.claims?.length==0}
          text={
            <>
              <Ionicons name="open-outline" size={20} />
              &nbsp;
              {t('Go to Dashboard')}
            </>
          }
          onPress={() => {
            // console.log('ifr-claim');
            navigation.navigate('WebDashboard');
          }}
        />
      )}

      {(postLevel === 'अध्यक्ष' || postLevel === 'सचिव') && (
        <CustomButton
          style={{marginBottom: 20}}
          button={{width: 300}}
          // dsbled={profile?.claims?.length==0}
          text={t('Validate IFR Claim')}
          onPress={() => {
            console.log('ifr-claim');
            navigation.navigate('ValidateIFRScreen');
          }}
        />
      )}

      <Pressable
        onPress={() => alert('OK')}
        style={{
          flexDirection: 'row',
          marginRight: 10,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 22}}>
          <MaterialCommunityIcons
            name="web-sync"
            size={22}
            color={pendingCount === 0 ? 'white' : 'yellow'}
          />
         
        </Text>
        <Text
          style={{
            color: pendingCount === 0 ? 'white' : 'yellow',
            fontSize: 16,
          }}>{` ${
          pendingCount === 0 ? '' : '(' + pendingCount + ')'
        }`}</Text>
      </Pressable>
      {/* <Text style={{flex: 1, textAlign: 'center'}}>{pendingCount}</Text> */}
    </ImageBackground>
  );
};

export default HomeScreen;

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
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '5%',
    // backgroundColor: '#D3F2D3',
    // alignSelf: 'flex-end',
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




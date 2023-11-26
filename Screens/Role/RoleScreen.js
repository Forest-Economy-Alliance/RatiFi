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
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import RNFS from 'react-native-fs';

import {useTranslation} from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import '../../assets/i18n/i18n';
import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'yup-phone';
import CustomButton from '../../components/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import {object, string} from 'yup';
import CustomError from '../../components/CustomError';
import {updateUserInfoAction} from '../../redux-store/actions/auth';
import {fetchClaimDetailsByFRCHandler} from '../../services/claimService';
import {updateUserHandler} from '../../services/authService';
import {RNCamera} from 'react-native-camera';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useToast} from 'react-native-toast-notifications';
import FastImage from 'react-native-fast-image';
import { Image } from 'react-native-compressor';

const BG_IMG_PATH = require('../../assets/images/background.png');


const handleHTTPtoHTTPS = args => {
  if (args.includes('https:')) {
    return args;
  } else {
    return args.replace(/^http:/, 'https:')
  }
};



const RoleScreen = ({navigation}) => {
  const toast = useToast();
  const {language, verificationAadharBackUrl, verificationAadharFrontUrl} =
    useSelector(state => state.entities.appUtil.appUtil);

  const state = {
    member: '',
    role: '',
  };
  const route = useRoute();

  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const [currentLanguage, setCurrentLanguage] = useState('en');
  const {name, village, postLevel} = useSelector(
    state => state.entities.auth.userInfo.profile,
  );
  const state1 = useSelector(state => state.entities.auth.userInfo.profile);
  console.log(state1.postLevel, 'state');
  const [errorVisible, setErrorVisible] = useState(false);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  const onNext = (values, formikActions) => {


  
    if( (values?.member===t('FRC')) || (values?.member!==t('FRC') &&  uploadStatus?.f &&  uploadStatus?.b)){

    
    console.log(values);
    formikActions.setSubmitting(false);

    dispatch({type: 'ENABLE_LOADING'});
    dispatch(
      updateUserInfoAction(
        {
          authLevel: values.member,
          postLevel: values.role,
          village: village,
          isMember: values.role === t('Member'),
          activeStatus: values.member !== 'एफआरसी' ? false : true,
        },
        args => {
          console.log('role-args', args);
          if (args) {
            dispatch({type: 'DISABLE_LOADING'});

            // screencode 5 means role set
            dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 5});

            // navigation.navigate('HomeScreen');
            console.log('yy', postLevel);
            if (values.member !== 'एफआरसी') {
              navigation.replace('HomeScreen', {
                toBeValidated: true,
              });
            } else if (!(values.role === t('Member'))) {
              // check if secretyary or president have already filed a claim
              fetchClaimDetailsByFRCHandler({frc: village}).then(res => {
                if (res?.data?.data[0]?._id?.toString()) {
                  // secretary ke claim me wahi id patch
                  updateUserHandler({
                    claims: [res?.data?.data[0]?._id?.toString()],
                  })
                    .then(rr => {
                      navigation.replace('HomeScreen');
                    })
                    .catch(e => {
                      Alert.alert(t('info'), 'Something went wrong');
                    });
                } else {
                  // Changed Folow as on 27Oct 12:23PM
                  navigation.replace('HomeScreen');
                }
              });

              // navigation.navigate('ClaimTypeSelectionScreen', {
              //   isMember: false,
              // });

              // FROM
              // navigation.navigate('DownloadPDF');

              // TO
              navigation.replace('HomeScreen');
            } else {
              console.log('ok');

              navigation.replace('HomeScreen');

              // navigation.navigate('IdCard');
            }
          } else {
            dispatch({type: 'DISABLE_LOADING'});
            // toast.show(t('ALREADY_ASSIGNED_ROLE'), {
            //   type: 'success',
            //   animationType: 'zoom-in',
            //   successColor: '#480E09',
            //   placement: 'top',
            //   duration: 5000,
            // });
            // alert(t('ALREADY_ASSIGNED_ROLE'));
            // this alert button should have a help button which will redirect to the help screen

            Alert.alert('सूचना', t('ALREADY_ASSIGNED_ROLE'), [
              {
                text: 'Ok',
                // onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'सहायता',
                onPress: () => {
                  // link to whatsapp
                  Linking.openURL(
                    "https://wa.me/12345?text=I'm%20having%20issue%20with%JharFRA%20Registration.",
                  );
                },
              },
            ]);
          }
        },
      ),
    );
      }else{
        Alert.alert('सुचना','कृपया सत्यापन के लिए आईडी अपलोड करें');
      }
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
        // {
        //   label: t('Tehsildar'),
        //   value: '2',
        // },
        // {
        //   label: t('ACF'),
        //   value: '3',
        // },

        {
          label: t('Member'),
          value: '4',
        },
      
        // {
        //   label: t('Circle Officer'),
        //   value: '5',
        // },
        // {
        //   label: t('Range Officer'),
        //   value: '6',
        // },
      ],
    },
    {
      label: t('DLC'),
      value: '3',
      roleData: [
        {
          label: t('District Collector'),
          value: '1',
        },
        {
          label: t('District Forest Officer'),
          value: '2',
        },
        {
          label: t('District Welfare Officer'),
          value: '3',
        },
        {
          label: t('Officer-in-Charge (Tribal Affairs)'),
          value: '4',
        },
        {
          label: t('Member'),
          value: '5',
        },
      ],
    },
    {
      label: t('SLMC'),
      value: '4',
      roleData: [
        {
          label: 'मुख्य सचिव - अध्यक्ष',
          value: '1',
        },
        {
          label: 'सचिव - राजस्व विभाग',
          value: '2',
        },
        {
          label: 'सचिव - जन जाति या समाज कल्याण विभाग',
          value: '3',
        },
        {
          label: 'सचिव - वन विभाग',
          value: '4',
        },
        {
          label: 'सचिव - पंचायती राज',
          value: '5',
        },
        {
          label: 'प्रधान मुख्य वन संरक्षक',
          value: '6',
        },
        {
          label: 'जनजाति सलाहकार परिषद सदस्य',
          value: '7',
        },
        {
          label: 'जनजातीय कल्याण आयुक्त',
          value: '8',
        },
      ],
    },
    {
      label: t('Forest_Department'),
      value: '5',
      roleData: [
        {
          label: 'वन परिक्षेत्र अधिकारी',
          value: '1',
        },
        {
          label: 'वन रक्षक',
          value: '2',
        },
      ],
    },
    {
      label: t('Revenue_Department'),
      value: '6',
      roleData: [
        {
          label: 'राजस्व उपनिरक्षक',
          value: '1',
        },{
          label: 'अंचल निरक्षक',
          value: '2',
        },
        {
          label: t('Circle Officer'),
          value: '5',
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

  const goBack = () => {
    // Move to RoleScreen
    navigation.goBack();
    // navigation.navigate("HomeScreen")
  };

  const cameraRef = useRef(null);
  const [cameraModalVis, setCameraModalVis] = useState(false);
  const [previewDocModalVis, setPreviewDocModal] = useState(false);
  const [docUrlToPreview, setDocUrlToPreview] = useState('');

  const [uploadStatus, setUploadStatus] = useState({f: false, b: false});
  const [isFront, setIsFront] = useState(null);

  console.log(verificationAadharBackUrl);
  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      {cameraModalVis && (
        <Modal style={{padding: 100, backgroundColor: 'white'}}>
          <RNCamera
            ref={cameraRef}
            onCameraReady={e => {
              dispatch({type: 'DISABLE_LOADING'});
            }}
            // flashMode={'on'}
            style={styles.rnCamera}
            captureAudio={false}
            ratio="16:9"
            useNativeZoom></RNCamera>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingTop: 'auto',
              paddingBottom: 'auto',
              backgroundColor: 'black',
              flex: 0.2,
            }}>
            <TouchableOpacity
              disabled={false}
              style={{
                borderWidth: 1,
                borderRadius: 50,
                alignItems: 'center',
                padding: 20,
                marginTop: 'auto',
                marginBottom: 'auto',
                // alignSelf:'flex-start',
                alignSelf: 'center',
                backgroundColor: '#fff',
              }}
              onPress={async () => {
                try {
                  dispatch({type: 'ENABLE_LOADING'});
                  if (cameraRef) {
                    console.warn(cameraRef);
                    const options = {quality: 0.4};
                    const data = await cameraRef?.current?.takePictureAsync(
                      options,
                    );

                    
                    const compressedURI=await Image.compress(data?.uri);
                    
                    const r = await RNFS.readFile(compressedURI, 'base64');
                      
                    dispatch({type: 'ENABLE_LOADING'});

                    getGCPUrlImageHandler({
                      fileName: 'Hello',
                      base64Data: r,
                      isPdf: false,
                      isVerificationDoc: true,
                      isFront: isFront,
                      isBack: !isFront,
                      userId: state1?._id,
                    })
                      .then(async ({data}) => {
                        console.log('RESPONSE', data);
                        console.log("HERE REACHED ")
                        if (isFront === true) {
                          dispatch({
                            type: 'UPDATE_APPUTIL_KEY',
                            payload: {
                              key: 'verificationAadharFrontUrl',
                              value: data?.response?.Location,
                            },
                          });
                          setUploadStatus({...uploadStatus, f: true});
                        } else if (isFront === false) {
                          dispatch({
                            type: 'UPDATE_APPUTIL_KEY',
                            payload: {
                              key: 'verificationAadharBackUrl',
                              value: data?.response?.Location,
                            },
                          });

                          setUploadStatus({...uploadStatus, b: true});
                        }

                        // console.warn("CID", claim?._id)
                        // const rssponse = await patchClaimHandler({
                        //     claimId: claim?._id.toString(),
                        //     title: docName,
                        //     storageUrl: data.response.Location
                        // })

                        // console.log("WOW", rssponse.data);

                        setCameraModalVis(false);

                        if (data?.response?.Location) {
                          toast.show(t('FILE_UPLOADED'), {
                            type: 'success',
                            animationType: 'zoom-in',
                            successColor: '#480E09',
                            placement: 'top',
                            duration: 5000,
                          });

                          // dispatch({type: 'DISABLE_LOADING'});
                        } else {
                          toast.show(t('UPLOAD_FAILED'), {
                            type: 'failure',
                            animationType: 'zoom-in',
                            successColor: '#480E09',
                            placement: 'top',
                            duration: 5000,
                          });

                          // dispatch({type: 'DISABLE_LOADING'});
                        }
                      })

                      .catch(err => {
                        console.log(err);
                      });
                  }
                } catch (error) {
                  console.log('ERROR', error);
                } finally {
                  dispatch({type: 'DISABLE_LOADING'});
                }
              }}>
              <Text>&nbsp;&nbsp; &nbsp;&nbsp;</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{color: 'white', paddingHorizontal: 20}}
              onPress={() => {
                setCameraModalVis(false);
              }}>
              <Text style={{color: 'white'}}>
                <Ionicons name="close" size={50} />
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {previewDocModalVis && (
        <Modal style={{padding: 100, backgroundColor: 'white'}}>
          <View style={{flex: 0.8}}>
            <FastImage
              // onLoadStart={() => dispatch({type: 'ENABLE_LOADING'})}
              // onLoadEnd={() => dispatch({type: 'DISABLE_LOADING'})}
              source={{uri: handleHTTPtoHTTPS(docUrlToPreview)}}
              style={{flex: 1}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingTop: 'auto',
              paddingBottom: 'auto',
              backgroundColor: 'black',
              flex: 0.2,
            }}>
            <TouchableOpacity
              style={{color: 'white', paddingHorizontal: 20}}
              onPress={() => setPreviewDocModal(false)}>
              <Text style={{color: 'white'}}>
                <Ionicons name="close" size={50} c />
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {state1.postLevel !== undefined ? (
        <View style={{marginTop: 10, marginBottom: 10, marginLeft: 10}}>
          <Pressable onPress={goBack}>
            <Text style={{fontSize: 18}}>
              <FontAwesome name="arrow-left" size={18} /> {t('Go Back')}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}

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

            {Boolean(
              formik.values.member !== t('FRC') && formik.values.member
            ) && (
              <View>
                <View>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>
                      {t('Upload Aadhar Card')}
                    </Text>
                    <Text style={styles.titleText}>
                      (प्रोफ़ाइल सत्यापन हेतु)
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.title,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Pressable
                    onPress={() => {
                      setIsFront(true);
                      setCameraModalVis(true);
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 10,
                        borderStyle: 'dashed',
                      }}>
                      FRONT <Ionicons name="camera-sharp" size={22} />
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setIsFront(false);
                      setCameraModalVis(true);
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        borderColor: '#fff',
                        borderWidth: 1,
                        padding: 10,
                        borderStyle: 'dashed',
                      }}>
                      BACK <Ionicons name="camera-sharp" size={22} />
                    </Text>
                  </Pressable>
                </View>

                {/* Preview */}
                <View
                  style={[
                    styles.title,
                    {
                      flexDirection: 'row',
                      justifyContent: uploadStatus?.f
                        ? 'space-between'
                        : 'flex-end',
                      marginTop: 5,
                    },
                  ]}>
                  {uploadStatus?.f && (
                    <Pressable
                      onPress={() => {
                        setDocUrlToPreview(verificationAadharFrontUrl);
                        setPreviewDocModal(true);
                      }}>
                      <Text style={{color: 'white', padding: 10}}>
                        VIEW <Ionicons name="eye" size={22} />
                      </Text>
                    </Pressable>
                  )}

                  {uploadStatus?.b && (
                    <Pressable
                      onPress={() => {
                        setDocUrlToPreview(verificationAadharBackUrl);
                        setPreviewDocModal(true);
                      }}>
                      <Text style={{color: 'white', padding: 10}}>
                        VIEW <Ionicons name="eye" size={22} />
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}

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
  rnCamera: {
    flex: 0.9,
    width: '100%',
    position: 'relative',
    zIndex: 10000,
    alignSelf: 'center',
  },
});

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
import {Image} from 'react-native-compressor';

const BG_IMG_PATH = require('../../assets/images/background.png');

const handleHTTPtoHTTPS = args => {
  if (args.includes('https:')) {
    return args;
  } else {
    return args.replace(/^http:/, 'https:');
  }
};

const GovernmentOfficialCheck = ({navigation}) => {
  const toast = useToast();
  const {language, verificationAadharBackUrl, verificationAadharFrontUrl} =
    useSelector(state => state.entities.appUtil.appUtil);

  const state = {
    member: '',
    role: '',
    gender: '',
  };
  const route = useRoute();

  const {t} = useTranslation();
  const appTranslation = t('app');
  const commonTranslation = t('common');
  const roleTranslation = t('role');
  const aboundaryTranslation = t('aboundary');
  
  const dispatch = useDispatch();

  const {name, village, postLevel} = useSelector(
    state => state.entities.auth.userInfo.profile,
  );
  const state1 = useSelector(state => state.entities.auth.userInfo.profile);
  console.log(state1.postLevel, 'state');
  const [errorVisible, setErrorVisible] = useState(false);



  const onNext = (values, formikActions) => {
    if (
      values?.member === roleTranslation.frc ||
      (values?.member !== roleTranslation.frc && uploadStatus?.f && uploadStatus?.b)
    ) {




      console.log(values);
      formikActions.setSubmitting(false);

      dispatch({type: 'ENABLE_LOADING'});


      

      dispatch(
        updateUserInfoAction(
          {
            authLevel: values.member,
            postLevel: values.role,
            // village: village,
            gender: values?.gender,
            isMember: values.role === roleTranslation.member,
            activeStatus: values.member !== 'एफआरसी' ? false : true,
          },
          args => {
            console.log('role-args', args);
            if (args) {
              dispatch({type: 'DISABLE_LOADING'});

              // screencode 5 means role set
              dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 5});

              if (values?.member === roleTranslation.slmc) {
                navigation.replace('HomeScreen');
                return;
              }
              // navigation.navigate('HomeScreen');
              // console.log('yy', postLevel);
              if (values.member !== 'एफआरसी') {
                navigation.replace('Location');
              } else if (!(values.role === roleTranslation.member)) {
                // check if secretyary or president have already filed a claim
                // fetchClaimDetailsByFRCHandler({frc: village}).then(res => {
                //   if (res?.data?.data[0]?._id?.toString()) {
                //     // secretary ke claim me wahi id patch
                //     updateUserHandler({
                //       claims: [res?.data?.data[0]?._id?.toString()],
                //     })
                //       .then(rr => {
                //         navigation.replace('HomeScreen');
                //       })
                //       .catch(e => {
                //         Alert.alert(t('info'), 'Something went wrong');
                //       });
                //   } else {
                //     // Changed Folow as on 27Oct 12:23PM
                //     navigation.replace('Location');
                //   }
                // });

                // navigation.navigate('ClaimTypeSelectionScreen', {
                //   isMember: false,
                // });

                // FROM
                // navigation.navigate('DownloadPDF');

                // TO
                navigation.replace('Location');
              } else {
                console.log('ok');

                navigation.replace('Location');

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

              // Alert.alert('सूचना', t('ALREADY_ASSIGNED_ROLE'), [
              //   {
              //     text: 'Ok',
              //     // onPress: () => console.log('Cancel Pressed'),
              //     style: 'cancel',
              //   },
              //   {
              //     text: 'सहायता',
              //     onPress: () => {
              //       // link to whatsapp
              //       Linking.openURL(
              //         "https://wa.me/12345?text=I'm%20having%20issue%20with%JharFRA%20Registration.",
              //       );
              //     },
              //   },
              // ]);
            }
          },
        ),
      );



    } else {
      Alert.alert(appTranslation.upload_id_for_verification);
    }
  };

  const uidSchema = object().shape({
    gender: string().required(appTranslation.gender_required),
    member: string().required(appTranslation.membership_required),
    role: string().required(appTranslation.role_required),
  });

  const formik = useFormik({
    initialValues: state,
    validationSchema: uidSchema,
    onSubmit: onNext,
  });

  const data1 = [
    {
      label: roleTranslation.frc,
      value: '1',
      roleData: [
        {
          label: roleTranslation.president,
          value: '1',
        },
        {
          label: roleTranslation.secretary,
          value: '2',
        },
        {
          label: roleTranslation.member,
          value: '3',
        },
      ],
    },
    {
      label: roleTranslation.sdlc,
      value: '2',
      roleData: [
        {
          label: roleTranslation.subdivisonal_officer,
          value: '1',
        },
        

        {
          label: roleTranslation.member,
          value: '4',
        },

        
      ],
    },
    {
      label: roleTranslation.dlc,
      value: '3',
      roleData: [
        {
          label: roleTranslation.district_collector,
          value: '1',
        },
        {
          label: roleTranslation.district_forest_officer,
          value: '2',
        },
        {
          label: roleTranslation.district_welfare_officer,
          value: '3',
        },
        {
          label: roleTranslation.member,
          value: '5',
        },
      ],
    },
    {
      label: roleTranslation.slmc,
      value: '4',
      roleData: [
        {
          label: roleTranslation.panchayati_raj_secretary,
          value: '1',
        },
        {
          label: roleTranslation.pradhan_mukhya_van_sanrakshak,
          value: '2',
        },
        
      ],
    },
    {
      label: roleTranslation.forest_department,
      value: '5',
      roleData: [
        {
          label: roleTranslation.forest_range_officer,
          value: '1',
        },
        {
          label: roleTranslation.forest_guard,
          value: '2',
        },
      ],
    },
    {
      label: roleTranslation.revenue_department,
      value: '6',
      roleData: [
        {
          label: roleTranslation.revenue_officer,
          value: '1',
        },
        {
          label: roleTranslation.circle_off,
          value: '2',
        },
        {
          label: roleTranslation.circle_officer,
          value: '5',
        },
      ],
    },
  ];

  const buttonText = {
    member: appTranslation.choose_membership,
    role: appTranslation.choose_role,
  };

  const goBack = () => {
    // Move to GovernmentOfficialCheck
    navigation.goBack();
    // navigation.navigate("HomeScreen")
  };

  const cameraRef = useRef(null);
  const [cameraModalVis, setCameraModalVis] = useState(false);
  const [previewDocModalVis, setPreviewDocModal] = useState(false);
  const [docUrlToPreview, setDocUrlToPreview] = useState('');

  const [uploadStatus, setUploadStatus] = useState({f: false, b: false});
  const [isFront, setIsFront] = useState(null);

  const [roleData, setRoleData] = useState([]);

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

                    const compressedURI = await Image.compress(data?.uri);

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
                        console.log('HERE REACHED ');
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

                        if (data?.response?.Location) {
                          toast.show(appTranslation.file_uploaded, {
                            type: 'success',
                            animationType: 'zoom-in',
                            successColor: '#480E09',
                            placement: 'top',
                            duration: 5000,
                          });
                          setCameraModalVis(false);
                          dispatch({type: 'DISABLE_LOADING'});
                        } else {
                          toast.show(appTranslation.upload_failed, {
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
                }
                //  finally {
                //   dispatch({type: 'DISABLE_LOADING'});
                // }
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
              <FontAwesome name="arrow-left" size={18} /> {commonTranslation.back}
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
              <Text style={styles.titleText}>{appTranslation.choose_gender}</Text>
            </View>
            <Dropdown
              visible={true}
              data={[
                {
                  label: appTranslation.male,
                  value: 1,
                },
                {
                  label: appTranslation.female,
                  value: 2,
                },
              ]}
              formik={formik}
              variable={'gender'}
            />

            <View style={styles.title}>
              <Text style={styles.titleText}>
                {appTranslation.choose_membership}
              </Text>
            </View>
            <Dropdown
              visible={true}
              data={data1}
              formik={formik}
              variable={'member'}
              exec={val => {
                setRoleData([]);
                formik?.setFieldValue('role', '');
                const arr = data1
                  .filter(item => item.label === val)
                  .map(item => {
                    return item.roleData;
                  })[0];
                setTimeout(() => {
                  setRoleData(arr);
                }, 500);
              }}
            />
            {Boolean(roleData?.length !== 0) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>{appTranslation.choose_role}</Text>
                </View>
                <Dropdown
                  visible={true}
                  data={roleData}
                  formik={formik}
                  variable={'role'}
                />
              </>
            )}

            {Boolean(
              formik.values.member !== roleTranslation.frc && formik.values.member,
            ) && (
              <View>
                <View>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>
                      {appTranslation.upload_aadhar_card}
                    </Text>
                    <Text style={styles.titleText}>
                      {appTranslation.for_profile_verification}
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
                      {commonTranslation.next} <Ionicons name="camera-sharp" size={22} />
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
                      {commonTranslation.back} <Ionicons name="camera-sharp" size={22} />
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
              text={commonTranslation.next}
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
              errorText={commonTranslation.fill_all_the_fields}
              errors={formik.errors}
              buttonText={buttonText}
            />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default GovernmentOfficialCheck;

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
    marginTop: '15%',
    marginBottom: '8%',
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

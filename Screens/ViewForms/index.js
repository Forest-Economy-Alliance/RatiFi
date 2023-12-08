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
  Button,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Pressable,
  ProgressBarAndroid,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Image} from 'react-native-compressor';
import PagerView from 'react-native-pager-view';

import queue from 'react-native-job-queue';
import {ProgressBar} from '@react-native-community/progress-bar-android';

import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import dayjs from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, ref, string} from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fetchClaimDetailsHandler,
  patchClaimHandler,
} from '../../services/claimService';
import {fetchClaimDetailsByIdAction} from '../../redux-store/actions/claim';
import RNFS from 'react-native-fs';

import {RNCamera} from 'react-native-camera';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useToast} from 'react-native-toast-notifications';
import FastImage from 'react-native-fast-image';

const BG_IMG_PATH = require('../../assets/images/background.png');

const handleHTTPtoHTTPS = args => {
  if (args.includes('https:')) {
    return args;
  } else {
    return args.replace(/^http:/, 'https:');
  }
};

var ok = false;

const ViewForms = ({navigation}) => {
  const {language, formUploadSyncStatus, globalSyncStatus} = useSelector(
    state => state.entities.appUtil.appUtil,
  );

  const dispatch = useDispatch();

  const toast = useToast();
  const cameraRef = useRef(null);

  const [stage, setStage] = useState(1);

  const [bit, setBit] = useState(false);

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

  const {
    name,
    panchayat,
    tehsil,
    state,
    district,
    village,
    postLevel,
    authLevel,
  } = useSelector(state => state.entities.auth.userInfo?.profile);

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

  const {profile} = useSelector(state => state.entities.auth.userInfo);

  // const {claim}=useSelector(state=>state?.entities?.claimUtil?.claimInfo)

  const [claim, setClaim] = useState(null);

  const [uploadType, setUploadType] = useState('MAIN_DOC');
  const [focusedExtraImageID, setFocusedExtraImageID] = useState(null);
  const [shouldTriggerJointVerification, setShouldTriggerJointVerification] =
    useState(false);
  // console.log("UIF",claim);

  // const [name, setName] = useState('Ram Krishna');
  const [member, setMember] = useState('FRC');
  const [role, setRole] = useState('Secretary');

  const [cameraModalVis, setCameraModalVis] = useState(false);
  const [previewDocModalVis, setPreviewDocModal] = useState(false);
  const [docUrlToPreview, setDocUrlToPreview] = useState('');

  const [docName, setDocName] = useState('SDM_SUMMON');

  // const [state, setState] = useState('Himachal Pradesh');
  // const [district, setDistrict] = useState('Kagda');
  // const [tehsil, setTehsil] = useState('Palampur');
  // const [panchayat, setPanchayat] = useState('Gopalpur');
  // const [village, setVillage] = useState('Gujrehra');

  // const useSelector=useSelector(state=>state.claim)

  const handleDocPreview = url => {
    // alert(url)
    const finalUrl = handleHTTPtoHTTPS(url);
    setDocUrlToPreview(finalUrl);
    // get-image-for-previev
  };

  useEffect(() => {
    if (ok === false) dispatch({type: 'ENABLE_LOADING'});
    // changeLanguage(language);
    // fetch Details on basis of applicaton
    // alert(profile?.claims[3])

    console.warn('BEFORE_GOING', profile?.claims[profile?.claims.length - 1]);
    fetchClaimDetailsHandler({
      claimId: profile?.claims[profile?.claims.length - 1],
    })
      .then(response => {
        console.warn(response.data.data);
        setClaim(response.data.data);

        // dispatch({type: 'DISABLE_LOADING'});
      })
      .catch(error => {
        console.log('ERROR', error);
      })
      .finally(f => {
        dispatch({type: 'DISABLE_LOADING'});
      });
    ok = true;
  }, [globalSyncStatus]);

  const goBack = () => {
    // Move to RoleScreen
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View style={{marginTop: 10, marginBottom: 10, marginLeft: 10}}>
        <Pressable onPress={goBack}>
          <Text style={{fontSize: 18}}>
            <FontAwesome name="arrow-left" size={18} /> {t('Go Back')}
          </Text>
        </Pressable>
      </View>

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
                  if (cameraRef) {
                    console.warn(cameraRef);
                    const options = {
                      quality: 0.4,
                      base64: false,
                      skipProcessing: true,
                    };
                    dispatch({type: 'ENABLE_LOADING'});

                    const data = await cameraRef?.current?.takePictureAsync(
                      options,
                    );

                    const compressedURI = await Image.compress(data?.uri);
                    console.log('compressed-compressedURI', compressedURI);

                    setCameraModalVis(false);

                    dispatch({
                      type: 'UPDATE_APPUTIL_KEY',
                      payload: {
                        key: 'globalSyncStatus',
                        value: true,
                      },
                    });
                    // console.log(data.uri)
                    // console.log(await RNFS.readFile(data.uri, 'base64'));

                    if (uploadType === 'MAIN_DOC') {
                      queue.addJob('testWorker', {
                        localPath: compressedURI,
                        userId: profile?._id,
                        docName: docName,
                        claimId: claim?._id?.toString(),
                        shouldTriggerJointVerification,
                      });
                    } else if (uploadType === 'NEW_EXTRA_IMAGE') {
                      queue.addJob('testWorker', {
                        localPath: compressedURI,
                        userId: profile?._id,
                        docName: docName,
                        claimId: claim?._id?.toString(),
                        extraImageID: 'NEW',
                      });
                    } else if (uploadType === 'UPDATE_EXTRA_IMAGE') {
                      queue.addJob('testWorker', {
                        localPath: compressedURI,
                        userId: profile?._id,
                        docName: docName,
                        claimId: claim?._id?.toString(),
                        extraImageID: focusedExtraImageID,
                      });
                    }

                    dispatch({type: 'DISABLE_LOADING'});
                    setShouldTriggerJointVerification(false);
                    return;
                  }
                } catch (error) {
                  console.log('ERROR', error);
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
              onLoadStart={() => dispatch({type: 'ENABLE_LOADING'})}
              onLoadEnd={() => dispatch({type: 'DISABLE_LOADING'})}
              source={{
                uri: docUrlToPreview,
                cache: FastImage.cacheControl.immutable,
              }}
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

      {formUploadSyncStatus && (
        <ProgressBar styleAttr="Horizontal" color="#Fff" style={{height: 40}} />
      )}

      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: 40,
            marginTop: 20,
          }}>
          <Text style={[styles.headerText]}>{t('Application_Number')}</Text>
          <Text style={[styles.headerText, {fontWeight: 'bold'}]}>
            &nbsp;{claim?.applicationNumber}
          </Text>
        </View>

        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator
          style={{minHeight: 55, maxHeight: 55}}>
          {[1, 2, 3, 4, 5, 6].map((item, id) => (
            <TouchableOpacity
              onPress={() => setStage(item)}
              key={`key-${item}`}
              style={{
                padding: 10,
                borderWidth: 1,
                marginTop: 10,
                backgroundColor: item == stage ? '#fff' : 'transparent',
              }}>
              <Text style={{color: item === stage ? 'green' : '#fff'}}>
                {id === 5 ? 'प्रपत्र' : `चरण ${item}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* STAGE 1 (FORM 1-3)*/}
        {stage === 1 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  वन अधिकार समिति का गठन / पुनर्गठन
                </Text>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: '600'}}>
                  (कार्यरत वन अधिकार समिति के पहले से उपस्थित होने पर चरण १ को
                  वैकल्पिक माना जाये)
                </Text>
              </View>

              {/* FORM 1 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      कार्यवाही रजिस्टर की छाया प्रति (1.1 या 1.2)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[0]?.title ===
                            'SDM_SUMMON_RESULT_1'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_1');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[0]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[0]?.title === 'SDM_SUMMON_RESULT_1'
                    ) ? null : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                 
                </View>

                {claim?.courtDocuments[0]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[0]?.title ===
                              'SDM_SUMMON_RESULT_1'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_1');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[0]?.title ===
                        'SDM_SUMMON_RESULT_1'
                      ) ? null: (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                   
                  </View>
                ))}
              </View>

              {/* + Not Required <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[0]?.title === 'SDM_SUMMON_RESULT_1' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_1');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View> */}
            </ScrollView>
          </>
        )}

        {/* STAGE 2 (FORM 4-9*/}
        {stage === 2 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  सामुदायिक वन अधिकारों का दावा तैयार करना
                </Text>
              </View>

              {/* FORM 2 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      दावा प्रक्रिया आरम्भ करने और दस्तावेजों की मांग के लिए
                      SDLC को पत्र (2 . 1) (संलग्न 4)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[1]?.title ===
                            'SDM_SUMMON_RESULT_3'
                        )
                      ) {
                        Alert.alert("सूचना","दस्तावेज़ अभी तक अपलोड नहीं किया गया है")
                        // setUploadType('MAIN_DOC');
                        // setDocName('SDM_SUMMON_RESULT_2');
                        // setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[1]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[1]?.title === 'SDM_SUMMON_RESULT_2'
                    ) ?   <Ionicons name="camera" color="white" size={20} /> : (
                      <Text style={{fontSize: 12}}>फोटो देखें</Text>
                    )}
                  </CustomButton>
                 
                </View>

                {claim?.courtDocuments[1]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[1]?.title ===
                              'SDM_SUMMON_RESULT_2'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_2');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[1]?.title ===
                        'SDM_SUMMON_RESULT_2'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[1]?.title ===
                      'SDM_SUMMON_RESULT_2' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_2');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[1]?.title === 'SDM_SUMMON_RESULT_2' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_2');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 3  */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      दावित वन क्षेत्र का नक़्शा (संलग्न 4)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[2]?.title ===
                            'SDM_SUMMON_RESULT_3'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_3');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[2]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[2]?.title === 'SDM_SUMMON_RESULT_3'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[2]?.title ===
                    'SDM_SUMMON_RESULT_3' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_3');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[2]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[2]?.title ===
                              'SDM_SUMMON_RESULT_3'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_3');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[2]?.title ===
                        'SDM_SUMMON_RESULT_3'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[2]?.title ===
                      'SDM_SUMMON_RESULT_3' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_3');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[2]?.title === 'SDM_SUMMON_RESULT_3' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_3');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 4 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      नियम 13 (झ) के अंतर्गत बुजुर्गों का शपथ पत्र (2.5) (संलग्न
                      3)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[3]?.title ===
                            'SDM_SUMMON_RESULT_4'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_4');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[3]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[3]?.title === 'SDM_SUMMON_RESULT_4'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[3]?.title ===
                    'SDM_SUMMON_RESULT_4' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_4');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[3]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[3]?.title ===
                              'SDM_SUMMON_RESULT_4'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_4');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[3]?.title ===
                        'SDM_SUMMON_RESULT_4'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[3]?.title ===
                      'SDM_SUMMON_RESULT_4' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_4');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[3]?.title === 'SDM_SUMMON_RESULT_4' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_4');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 5 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      नियम 13 (झ) के अंतर्गत एक दस्तावेज़ - खतियान भाग 2 / पंजी 2
                      इत्यादि (संलग्न 3)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[4]?.title ===
                            'SDM_SUMMON_RESULT_5'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_5');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[4]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[4]?.title === 'SDM_SUMMON_RESULT_5'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[4]?.title ===
                    'SDM_SUMMON_RESULT_5' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_5');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[4]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[4]?.title ===
                              'SDM_SUMMON_RESULT_5'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_5');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[4]?.title ===
                        'SDM_SUMMON_RESULT_5'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[4]?.title ===
                      'SDM_SUMMON_RESULT_5' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_5');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[4]?.title === 'SDM_SUMMON_RESULT_5' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_5');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 6  */}
              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      नियम 13 (झ) के अंतर्गत सरना / श्मशान / देवस्थल इत्यादि का
                      फ़ोटो (संलग्न 3) (वैकल्पिक)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[5]?.title ===
                            'SDM_SUMMON_RESULT_6'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_6');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[5]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[5]?.title === 'SDM_SUMMON_RESULT_6'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[5]?.title ===
                    'SDM_SUMMON_RESULT_6' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_6');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[5]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[5]?.title ===
                              'SDM_SUMMON_RESULT_6'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_6');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[5]?.title ===
                        'SDM_SUMMON_RESULT_6'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[5]?.title ===
                      'SDM_SUMMON_RESULT_6' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_6');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[5]?.title === 'SDM_SUMMON_RESULT_6' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_6');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 7  */}
              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      दावेदारों के नाम और हस्ताक्षर (2. 4) (संलग्न 1)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[6]?.title ===
                            'SDM_SUMMON_RESULT_7'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_7');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[6]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[6]?.title === 'SDM_SUMMON_RESULT_7'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[6]?.title ===
                    'SDM_SUMMON_RESULT_7' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_7');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[6]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[6]?.title ===
                              'SDM_SUMMON_RESULT_7'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_7');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[6]?.title ===
                        'SDM_SUMMON_RESULT_7'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[6]?.title ===
                      'SDM_SUMMON_RESULT_7' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_7');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[6]?.title === 'SDM_SUMMON_RESULT_7' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_7');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>
            </ScrollView>
          </>
        )}

        {/* STAGE 3 (FORM 10-10)*/}
        {stage === 3 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  वन क्षेत्र का सीमांकन
                </Text>
              </View>

              {/* FORM 8  */}
              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      सीमांकन के लिए पडोसी गांव को सूचना की पावती (2.7) (संलग्न
                      6)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[7]?.title ===
                            'SDM_SUMMON_RESULT_8'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_8');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[7]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[7]?.title === 'SDM_SUMMON_RESULT_8'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[7]?.title ===
                    'SDM_SUMMON_RESULT_8' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_8');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[7]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[7]?.title ===
                              'SDM_SUMMON_RESULT_8'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_8');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[7]?.title ===
                        'SDM_SUMMON_RESULT_8'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[7]?.title ===
                      'SDM_SUMMON_RESULT_8' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_8');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[7]?.title === 'SDM_SUMMON_RESULT_8' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_8');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 9  */}
              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          //   // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      सीमांकन की कार्यवाही (2.9) (संलग्न 8)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[8]?.title ===
                            'SDM_SUMMON_RESULT_9'
                        )
                      ) {
                        setUploadType('MAIN_DOC');
                        setDocName('SDM_SUMMON_RESULT_9');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[8]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[8]?.title === 'SDM_SUMMON_RESULT_9'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[8]?.title ===
                    'SDM_SUMMON_RESULT_9' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_9');
                        setUploadType('UPDATE_EXTRA_IMAGE');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[8]?.extraImages?.map((item, indd) => (
                  <View
                    key={`${claim?.courtDocuments?.title}-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[8]?.title ===
                              'SDM_SUMMON_RESULT_9'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_9');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[8]?.title ===
                        'SDM_SUMMON_RESULT_9'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[8]?.title ===
                      'SDM_SUMMON_RESULT_9' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_9');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[8]?.title === 'SDM_SUMMON_RESULT_9' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_9');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>
            </ScrollView>
          </>
        )}

        {/* STAGE 4 (FORM 11-12)*/}
        {stage === 4 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  भौतिक सत्यापन
                </Text>
              </View>

              {/* FORM 10 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      भौतिक सत्यापन के लिए वन और राजस्व विभाग के अधिकारियों को
                      सूचना की पावती (2.6) (संलग्न 5)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[9]?.title ===
                            'SDM_SUMMON_RESULT_10'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_10');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[9]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[9]?.title === 'SDM_SUMMON_RESULT_10'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[9]?.title ===
                    'SDM_SUMMON_RESULT_10' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_10');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[9]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[9]?.title ===
                              'SDM_SUMMON_RESULT_10'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_10');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[9]?.title ===
                        'SDM_SUMMON_RESULT_10'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[9]?.title ===
                      'SDM_SUMMON_RESULT_10' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_10');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[9]?.title === 'SDM_SUMMON_RESULT_10' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_10');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 11 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      भौतिक सत्यापन प्रतिवेदन (2.8) (संलग्न 7)
                      {/* <Image /> */}
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[10]?.title ===
                            'SDM_SUMMON_RESULT_11'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_11');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[10]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[10]?.title ===
                      'SDM_SUMMON_RESULT_11'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[10]?.title ===
                    'SDM_SUMMON_RESULT_11' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_11');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[10]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[10]?.title ===
                              'SDM_SUMMON_RESULT_11'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_11');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[10]?.title ===
                        'SDM_SUMMON_RESULT_11'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[10]?.title ===
                      'SDM_SUMMON_RESULT_11' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_11');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[10]?.title ===
                  'SDM_SUMMON_RESULT_11' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_11');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>
            </ScrollView>
          </>
        )}

        {/* STAGE 5 (FORM 13-14)*/}
        {stage === 5 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  सामुदायिक अधिकारों की अनुशंसा के लिए ग्राम सभा
                </Text>
              </View>

              {/* FORM 12 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      ग्राम सभा की कार्यवाही (2.10) (संलग्न 9)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[11]?.title ===
                            'SDM_SUMMON_RESULT_12'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_12');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[11]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[11]?.title ===
                      'SDM_SUMMON_RESULT_12'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[11]?.title ===
                    'SDM_SUMMON_RESULT_12' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_12');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[11]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[11]?.title ===
                              'SDM_SUMMON_RESULT_12'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_12');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[11]?.title ===
                        'SDM_SUMMON_RESULT_12'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[11]?.title ===
                      'SDM_SUMMON_RESULT_12' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_12');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[11]?.title ===
                  'SDM_SUMMON_RESULT_12' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_12');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>
            </ScrollView>
          </>
        )}

        {/* STAGE 6 (FORM 15-17)*/}
        {stage === 6 && (
          <>
            <ScrollView>
              <View style={{padding: 20}}>
                <Text style={{fontSize: 26, color: '#fff', fontWeight: '600'}}>
                  दावा विवरण
                </Text>
              </View>

              {/* FORM 13 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      दावा अभिलेख (2.11)
                      {/* <Image /> */}
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[12]?.title ===
                            'SDM_SUMMON_RESULT_13'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_13');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[12]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[12]?.title ===
                      'SDM_SUMMON_RESULT_13'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[12]?.title ===
                    'SDM_SUMMON_RESULT_13' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_13');
                        // hit the alert on sccess
                        setShouldTriggerJointVerification(true);
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[12]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[12]?.title ===
                              'SDM_SUMMON_RESULT_13'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_13');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[12]?.title ===
                        'SDM_SUMMON_RESULT_13'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[12]?.title ===
                      'SDM_SUMMON_RESULT_13' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_13');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[12]?.title ===
                  'SDM_SUMMON_RESULT_13' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_13');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 14 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      प्रारूप - ख (2.2)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[13]?.title ===
                            'SDM_SUMMON_RESULT_14'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_14');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[13]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[13]?.title ===
                      'SDM_SUMMON_RESULT_14'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[13]?.title ===
                    'SDM_SUMMON_RESULT_14' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_14');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[13]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[13]?.title ===
                              'SDM_SUMMON_RESULT_14'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_14');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[13]?.title ===
                        'SDM_SUMMON_RESULT_14'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[13]?.title ===
                      'SDM_SUMMON_RESULT_14' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_14');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[13]?.title ===
                  'SDM_SUMMON_RESULT_14' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_14');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 15 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      प्रारूप - ग (2.3)
                      {/* <Image /> */}
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[14]?.title ===
                            'SDM_SUMMON_RESULT_15'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_15');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[14]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[14]?.title ===
                      'SDM_SUMMON_RESULT_15'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[14]?.title ===
                    'SDM_SUMMON_RESULT_15' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_15');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[14]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[14]?.title ===
                              'SDM_SUMMON_RESULT_15'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_15');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[14]?.title ===
                        'SDM_SUMMON_RESULT_15'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[14]?.title ===
                      'SDM_SUMMON_RESULT_15' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_15');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[14]?.title ===
                  'SDM_SUMMON_RESULT_15' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_15');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>

              {/* FORM 16 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      अनुमंडल (SDLC) से प्राप्त पावती
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[15]?.title ===
                            'SDM_SUMMON_RESULT_16'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_16');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[15]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[15]?.title ===
                      'SDM_SUMMON_RESULT_16'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[15]?.title ===
                    'SDM_SUMMON_RESULT_16' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_16');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[15]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[15]?.title ===
                              'SDM_SUMMON_RESULT_16'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_16');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[15]?.title ===
                        'SDM_SUMMON_RESULT_16'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {
                    claim?.courtDocuments[15]?.title ===
                      'SDM_SUMMON_RESULT_16' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_16');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )
                    }
                  </View>
                ))}
              </View>

              {/* + Not Required <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[15]?.title ===
                  'SDM_SUMMON_RESULT_16' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_16');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View> */}

              {/* FORM 17 */}

              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      भौतिक सत्यापन के लिए द्वितीय सूचना (2.12)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[16]?.title ===
                            'SDM_SUMMON_RESULT_17'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_17');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[16]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[16]?.title ===
                      'SDM_SUMMON_RESULT_17'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[16]?.title ===
                    'SDM_SUMMON_RESULT_17' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_17');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[16]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[16]?.title ===
                              'SDM_SUMMON_RESULT_17'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_17');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[16]?.title ===
                        'SDM_SUMMON_RESULT_17'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[16]?.title ===
                      'SDM_SUMMON_RESULT_17' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_17');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              {/* + Not Required <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[16]?.title ===
                  'SDM_SUMMON_RESULT_17' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_17');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View> */}

              {/* FORM 18 SDLC ke pawati */}
              <View style={{borderTopWidth: 1, borderColor: '#fff'}}>
                <View style={{...styles.header, marginTop: -20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={[
                        styles.subheaderText,
                        {
                          fontSize: 18,
                          width: '100%',
                          // textDecorationLine: 'underline',
                        },
                      ]}>
                      {/* <Image /> */}
                      दावों के दुबारा भौतिक सत्यापन और SDLC की अनुशंसा के लिए
                      पत्र (2.13)
                    </Text>
                    {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingVertical: 10,
                  }}>
                  <CustomButton
                    onPress={() => {
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})
                      // alert(claim?.courtDocuments.length)
                      if (
                        !(
                          claim?.courtDocuments.length &&
                          claim?.courtDocuments[17]?.title ===
                            'SDM_SUMMON_RESULT_18'
                        )
                      ) {
                        setDocName('SDM_SUMMON_RESULT_18');
                        setCameraModalVis(true);
                      } else {
                        setPreviewDocModal(true);
                        handleDocPreview(claim?.courtDocuments[17]?.storageUrl);
                      }
                    }}
                    style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                    {!(
                      claim?.courtDocuments[17]?.title ===
                      'SDM_SUMMON_RESULT_18'
                    ) ? (
                      <Ionicons name="camera" color="white" size={20} />
                    ) : (
                      <Text style={{fontSize: 12}}> फोटो देखें</Text>
                    )}
                  </CustomButton>
                  {claim?.courtDocuments[17]?.title ===
                    'SDM_SUMMON_RESULT_18' && (
                    <CustomButton
                      onPress={() => {
                        setDocName('SDM_SUMMON_RESULT_18');
                        setCameraModalVis(true);
                      }}
                      style={{
                        width: '100%',
                        marginRight: 40,
                        marginTop: 10,
                      }}>
                      {<Ionicons name="camera" color="white" size={20} />}
                    </CustomButton>
                  )}
                </View>

                {claim?.courtDocuments[17]?.extraImages?.map((item, indd) => (
                  <View
                    key={`random-uid-${indd}`}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        // fetch Details on basis of applicato
                        // dispatch({type:"ENABLE_LOADING"})
                        // alert(claim?.courtDocuments.length)
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[17]?.title ===
                              'SDM_SUMMON_RESULT_18'
                          )
                        ) {
                          setDocName('SDM_SUMMON_RESULT_18');
                          setCameraModalVis(true);
                        } else {
                          setPreviewDocModal(true);

                          handleDocPreview(item?.url);
                        }
                      }}
                      style={{
                        width: '100%',
                        marginLeft: 40,
                        marginTop: 10,
                      }}>
                      {!(
                        claim?.courtDocuments[17]?.title ===
                        'SDM_SUMMON_RESULT_18'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[17]?.title ===
                      'SDM_SUMMON_RESULT_18' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_18');
                          setCameraModalVis(true);
                          setFocusedExtraImageID(indd + 1);
                          //   UPDATE IMAGE that object wiht particulat indd
                          setUploadType('UPDATE_EXTRA_IMAGE');
                        }}
                        style={{
                          width: '100%',
                          marginRight: 40,
                          marginTop: 10,
                        }}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderColor: '#fff',
                }}>
                {claim?.courtDocuments[17]?.title ===
                  'SDM_SUMMON_RESULT_18' && (
                  <CustomButton
                    onPress={() => {
                      setDocName('SDM_SUMMON_RESULT_18');
                      setCameraModalVis(true);

                      setUploadType('NEW_EXTRA_IMAGE');
                      // CAPTUR THAT IMAGE WITH A NEW ENTRY IN LAST OF THAT ARRAY
                    }}
                    style={{width: '50%', marginRight: 40, marginTop: 10}}>
                    <FontAwesome5 color="#fff" name="plus" size={20} />
                  </CustomButton>
                )}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default ViewForms;

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
    paddingTop: '8%',
    marginHorizontal: '5%',
  },
  headerText: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  subheaderText: {
    fontSize: 18,
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
    // flexDirection: 'row',
    marginTop: '20%',
    // alignItems: 'center',
    // justifyContent: 'center',
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
  rnCamera: {
    flex: 0.9,
    width: '100%',
    position: 'relative',
    zIndex: 10000,
    alignSelf: 'center',
  },
});

// ( claim!==undefined && !(claim?.courtDocuments[2]?.title==='SDM_SUMMON_RESULT_1'))
//( claim!=undefined && !(claim?.courtDocuments[2]?.title==='SDM_SUMMON') )

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
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, ref, string} from 'yup';
import FastImage from 'react-native-fast-image';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  fetchClaimDetailsHandler,
  fetchClaimDetailsHandlerIFR,
  patchClaimFieldsIFRHandler,
  patchClaimHandler,
  patchClaimHandlerIFR,
} from '../../services/claimService';
import {fetchClaimDetailsByIdAction} from '../../redux-store/actions/claim';

import {RNCamera} from 'react-native-camera';
import {getGCPUrlImageHandler} from '../../services/commonService';
import {useToast} from 'react-native-toast-notifications';
import { Image } from 'react-native-compressor';

const BG_IMG_PATH = require('../../assets/images/background.png');



const handleHTTPtoHTTPS = args => {
  if (args.includes('https:')) {
    return args;
  } else {
    return args.replace(/^http:/, 'https:');
  }
};

const PastRecordsIFR = ({navigation}) => {
  const {language} = useSelector(state => state.entities.appUtil.appUtil);

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  const toast = useToast();
  const cameraRef = useRef(null);

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
    setDocUrlToPreview(url);
    // get-image-for-previev
  };

  useEffect(() => {
    dispatch({type: 'ENABLE_LOADING'});
    // changeLanguage(language);
    // fetch Details on basis of applicaton
    // alert(profile?.claims[0])

    console.warn(
      'BEFORE_GOING',
      profile?.IFRclaims[profile?.IFRclaims.length - 1],
    );
    fetchClaimDetailsHandlerIFR({
      claimId: profile?.IFRclaims[profile?.IFRclaims.length - 1],
    })
      .then(response => {
        console.warn(response.data.data);
        setClaim(response.data.data);
        dispatch({type: 'DISABLE_LOADING'});
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  }, [refresh, cameraModalVis]);

  const goBack = () => {
    // Move to RoleScreen
    navigation.goBack();
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
                  dispatch({type: 'ENABLE_LOADING'});
                  if (cameraRef) {
                    console.warn(cameraRef);
                    const options = {quality: 0.9, base64: false};
                    const data = await cameraRef?.current?.takePictureAsync(
                      options,
                    );

                    const compressedURI=await Image.compress(data?.uri);
                    console.log('compressed-compressedURI',compressedURI)

                    const base64data = await RNFS.readFile(compressedURI, 'base64');
                    // console.log(data?.base64)
                    RNFS.unlink(compressedURI)
                    RNFS.unlink(data?.uri)

                    getGCPUrlImageHandler({
                      fileName: 'Hello',
                      base64Data:base64data,
                      isPdf: false,
                      userId: profile?._id || 'unknown-asset',
                    })
                      .then(async ({data}) => {
                        console.log('RESPONSE', data.response.Key);

                        console.warn('CID', claim?._id);
                        const rssponse = await patchClaimHandlerIFR({
                          claimId: claim?._id.toString(),
                          title: docName,
                          storageUrl: data.response.Location,
                        });

                        // console.log("WOW", rssponse.data);

                        setCameraModalVis(false);

                        if (data.response.Location) {
                          toast.show(t('FILE_UPLOADED'), {
                            type: 'success',
                            animationType: 'zoom-in',
                            successColor: '#480E09',
                            placement: 'top',
                            duration: 5000,
                          });

                          dispatch({type: 'DISABLE_LOADING'});
                        } else {
                          toast.show(t('UPLOAD_FAILED'), {
                            type: 'failure',
                            animationType: 'zoom-in',
                            successColor: '#480E09',
                            placement: 'top',
                            duration: 5000,
                          });

                          dispatch({type: 'DISABLE_LOADING'});
                        }
                      })

                      .catch(err => {
                        console.log(err);
                      });
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

      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
           

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 40,
                marginTop: 20,
              }}>
              <Text style={[styles.headerText]}>{t('Application_Number')}</Text>
              <Text style={[styles.headerText, {fontWeight: 'bold'}]}>
                {' '}
                &nbsp;{claim?.applicationNumber}
              </Text>
            </View>

            {!claim?.isGivenForValidation ? (
              <ScrollView>

                {/* FORM 1 */}
                <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '40%'},
                        ]}>
                        {/* <Image /> */}
                        दावा पत्र क (3.1)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[0]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                      {!(
                        claim?.courtDocuments[0]?.title ===
                        'SDM_SUMMON_RESULT_1'
                      ) ? (
                        <Ionicons name="camera" color="white" size={20} />
                      ) : (
                        <Text style={{fontSize: 12}}> फोटो देखें</Text>
                      )}
                    </CustomButton>
                    {claim?.courtDocuments[0]?.title ===
                      'SDM_SUMMON_RESULT_1' && (
                      <CustomButton
                        onPress={() => {
                          setDocName('SDM_SUMMON_RESULT_1');
                          setCameraModalVis(true);
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                </View>

                {/* FORM 2 */}
                <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        नियम 13.1(ग) के अंतर्गत दावित वन भूमि पर सुधारों की शपथपत्र (3.3)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[1]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                </View>

                {/* FORM 3 */}
                <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        नियम 13.1(झ) के अंतर्गत बुजुर्गों के शपथपत्र (3.4)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[2]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                </View>

                {/* FORM 4 */}
                <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        दावा अभिलेख (3.6)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[3]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
                </View>

 {/* FORM 5*/}
 <View style={{borderWidth:1,marginVertical:10,paddingBottom:10,borderColor:'#fff'}}>
                  <View style={{...styles.header}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '40%'},
                        ]}>
                        {/* <Image /> */}
                        सीमांकन
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <CustomButton
                      onPress={() => {
                        if (
                          !(
                            claim?.courtDocuments.length &&
                            claim?.courtDocuments[7]?.title ===
                              'SDM_SUMMON_RESULT_8'
                          )
                        ) {


                          setDocName('SDM_SUMMON_RESULT_8');
                          navigation.navigate('MarkBoundry',{
                            setRefresh:setRefresh
                          });
                      

                        } else {  
                          
                          
                            setPreviewDocModal(true);
                            handleDocPreview(
                              claim?.courtDocuments[7]?.storageUrl,
                            );
                          

                          // alert('Map Boundary has been saved');
                        }
                      
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
                      {Boolean(!(claim?.courtDocuments[7]?.title ===
                              'SDM_SUMMON_RESULT_8')) ? (
                        <MaterialIcons
                          name="gps-fixed"
                          color="white"
                          size={20}
                        />
                      ) : (
                        <Text style={{fontSize: 12}}> सीमा देखें
                        </Text>
                      )}
                    </CustomButton>

                    {Boolean(true) && (
                      <CustomButton
                        onPress={() => {
                          navigation.navigate('MarkBoundry');
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        <MaterialIcons name="gps-fixed" size={20} />
                      </CustomButton>
                    )}
                  </View>
                </View>


 {/* FORM 6*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        वन और राजस्व विभाग को भौतिक सत्यापन के लिए सूचना पत्र (3.7)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[5]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 7*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        भैतिक सत्यापन प्रतिवेदन (3.8)
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[6]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 8*/}

<View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        सीमांकन
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[4]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 9*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        भौतिक सत्यापन की सुचान

                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[8]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 10*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        भौतिक सत्यापन का प्रतिवेदन
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[9]?.storageUrl,
                          );
                        }
                      }}
                      style={{width: '100%', marginLeft: 40, marginTop: 10}}>
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
                        }}
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>


 {/* FORM 11*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                        वन अधिकार समिति का प्रतिवेदन
                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[10]?.storageUrl,
                          );
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
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 12*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                       
                      
                        ग्राम सभा की कार्यवाही

                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[11]?.storageUrl,
                          );
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
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>


 {/* FORM 13*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                       
                        व्यक्तिगत वन अधिकार दावा अभिलेख


                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[11]?.storageUrl,
                          );
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
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>

 {/* FORM 14*/}
 <View>
                  <View style={styles.header}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.subheaderText,
                          {fontSize: 16, width: '100%'},
                        ]}>
                        {/* <Image /> */}
                       
                        अनुमण्डल से आवेदन जमा करने की पावती


                      </Text>
                      {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                    </View>
                  </View>
                  <View
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
                          handleDocPreview(
                            claim?.courtDocuments[13]?.storageUrl,
                          );
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
                        style={{width: '100%', marginRight: 40, marginTop: 10}}>
                        {<Ionicons name="camera" color="white" size={20} />}
                      </CustomButton>
                    )}
                  </View>
</View>
              
                {/* <TouchableOpacity onPress={()=>{
    navigation.navigate("MarkBoundry")
}}>


<View  style={{flexDirection:'row',justifyContent:'center', marginVertical:30,marginHorizontal:50,borderWidth:1,borderColor:'#fff',padding:20,borderRadius:20}}>
    <Text> </Text>
    <MaterialIcons name="gps-fixed" size={20} /> 
</View>
</TouchableOpacity> */}

                <View style={{marginVertical: 10, marginTop: 50}}>
                  <CustomButton
                    onPress={() => {
                      //
                      patchClaimFieldsIFRHandler({
                        claimId: claim?._id?.toString(),
                        isGivenForValidation: true,
                      })
                        .then(res => {
                          setRefresh(g => !g);
                        })
                        .catch(err => {
                          console.log('err', err);
                        });
                    }}
                    button={{width: '50%'}}>
                    सत्यापन के लिए दावा सबमिट करें
                  </CustomButton>
                </View>
              </ScrollView>
            ) : (
              <ScrollView>
                <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                  <Text style={{fontSize: 20}}>
                    {' '}
                    कृपया अपने गांव के एफआरसी अध्यक्ष/सचिव से संपर्क करें
                  </Text>
                </View>
                <View>
                  <CustomButton
                    button={{width: 250, marginBottom: 10}}
                    onPress={() => {
                      navigation.replace('HomeScreenIFR');
                    }}>
                    <Ionicons name="ios-home" size={20} />
                    &nbsp; होम स्क्रीन
                  </CustomButton>
                </View>
              </ScrollView>
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default PastRecordsIFR;

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
    marginVertical: '5%',
    marginHorizontal: '10%',
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

// ( claim!==undefined && !(claim?.courtDocuments[1]?.title==='SDM_SUMMON_RESULT_1'))
//( claim!=undefined && !(claim?.courtDocuments[0]?.title==='SDM_SUMMON') )

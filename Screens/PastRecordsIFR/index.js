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
    Image,
    Button,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler,Pressable
} from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchClaimDetailsHandler, patchClaimHandler } from '../../services/claimService';
import { fetchClaimDetailsByIdAction } from '../../redux-store/actions/claim';


import { RNCamera } from 'react-native-camera'
import { getGCPUrlImageHandler } from '../../services/commonService';
import { useToast } from 'react-native-toast-notifications';



const BG_IMG_PATH = require('../../assets/images/background.png');



const PastRecordsIFR = ({ navigation }) => {
    const {language} = useSelector(state => state.entities.appUtil.appUtil);

    const dispatch = useDispatch();


    const toast = useToast();
    const cameraRef = useRef(null);

    const [bit, setBit] = useState(false);

    const [curLen, setCurLen] = useState(0);

    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [errorVisible, setErrorVisible] = useState(false);

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setCurrentLanguage(value))
            .catch(err => console.log(err));
    };

    const { name, panchayat, tehsil, state, district, village, postLevel, authLevel } = useSelector(state => state.entities.auth.userInfo?.profile);

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


    const { profile } = useSelector(state => state.entities.auth.userInfo);

    // const {claim}=useSelector(state=>state?.entities?.claimUtil?.claimInfo)

    const [claim, setClaim] = useState(null);


    // console.log("UIF",claim);

    // const [name, setName] = useState('Ram Krishna');
    const [member, setMember] = useState('FRC');
    const [role, setRole] = useState('Secretary');


    const [cameraModalVis, setCameraModalVis] = useState(false);
    const [previewDocModalVis, setPreviewDocModal] = useState(false);
    const [docUrlToPreview, setDocUrlToPreview] = useState('');

    const [docName, setDocName] = useState('SDM_SUMMON')



    // const [state, setState] = useState('Himachal Pradesh');
    // const [district, setDistrict] = useState('Kagda');
    // const [tehsil, setTehsil] = useState('Palampur');
    // const [panchayat, setPanchayat] = useState('Gopalpur');
    // const [village, setVillage] = useState('Gujrehra');

    // const useSelector=useSelector(state=>state.claim)


    const handleDocPreview = (url) => {
        // alert(url)
        setDocUrlToPreview(url)
        // get-image-for-previev

    }








    useEffect(() => {

        dispatch({ type: "ENABLE_LOADING" })
        // changeLanguage(language);
        // fetch Details on basis of applicaton
        // alert(profile?.claims[0])

        console.warn("BEFORE_GOING", profile?.claims[profile?.claims.length - 1]);
        fetchClaimDetailsHandler({ claimId: profile?.claims[profile?.claims.length - 1] })
            .then(response => {
                console.warn(response.data.data);
                setClaim(response.data.data);
                dispatch({ type: "DISABLE_LOADING" })
            })
            .catch(error => {
                console.log("ERROR", error);
            })
    }, [cameraModalVis, previewDocModalVis]);











    const goBack = () =>{
        // Move to RoleScreen
        navigation.navigate("HomeScreen")
    }
    




    return (
        <ImageBackground
            source={BG_IMG_PATH}
            resizeMode="cover"
            blurRadius={10}
            style={styles.bg}>

<View style={{marginTop:10, marginBottom:10,marginLeft:10 }} >
            <Pressable onPress={goBack}>
            <Text style={{fontSize:18}}>
                <FontAwesome name="arrow-left" size={18} /> {t('Go Back')}</Text>

            </Pressable>
          </View>

            {cameraModalVis && <Modal style={{ padding: 100, backgroundColor: 'white' }}>
                <RNCamera
                    ref={cameraRef}
                    onCameraReady={e => {
                        dispatch({ type: "DISABLE_LOADING" })
                    }}
                    // flashMode={'on'}
                    style={styles.rnCamera}
                    captureAudio={false}
                    ratio="16:9"
                    useNativeZoom
                >

                </RNCamera>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 'auto', paddingBottom: 'auto', backgroundColor: 'black', flex: 0.2 }}>

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
                            backgroundColor: '#fff'
                        }
                        }

                        onPress={async () => {
                            try {

                                dispatch({ type: "ENABLE_LOADING" })
                                if (cameraRef) {
                                    console.warn(cameraRef)
                                    const options = { quality: 0.4, base64: true };
                                    const data = await cameraRef?.current?.takePictureAsync(options);

                                    // console.log(data?.base64)


                                    getGCPUrlImageHandler({
                                        fileName: 'Hello',
                                        base64Data: data?.base64,
                                        isPdf: false,
                                        userId:profile?._id || 'unknown-asset'
                                    }).then(async ({ data }) => {
                                        console.log("RESPONSE", data.response.Key);


                                        console.warn("CID", claim?._id)
                                        const rssponse = await patchClaimHandler({
                                            claimId: claim?._id.toString(),
                                            title: docName,
                                            storageUrl: data.response.Location
                                        })

                                        // console.log("WOW", rssponse.data);

                                        setCameraModalVis(false);

                                        if ( data.response.Location) {


                                            toast.show(t('FILE_UPLOADED'), {
                                                type: 'success',
                                                animationType: 'zoom-in',
                                                successColor: '#480E09',
                                                placement: 'top',
                                                duration: 5000,
                                            });


                                            dispatch({ type: "DISABLE_LOADING" })


                                        } else {
                                            toast.show(t('UPLOAD_FAILED'), {
                                                type: 'failure',
                                                animationType: 'zoom-in',
                                                successColor: '#480E09',
                                                placement: 'top',
                                                duration: 5000,
                                            });


                                            dispatch({ type: "DISABLE_LOADING" })
                                        }

                                    })




                                        .catch(err => {
                                            console.log(err)
                                        })




                                }

                            }

                            catch (error) {

                                console.log("ERROR", error);
                            }
                        }}


                    >
                        <Text >

                            &nbsp;&nbsp;  &nbsp;&nbsp;
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ color: 'white', paddingHorizontal: 20 }}
                        onPress={() => {




                            setCameraModalVis(false)



                        }}
                    >
                        <Text style={{ color: 'white' }}>
                            <Ionicons name="close" size={50} />
                        </Text>
                    </TouchableOpacity>






                </View>


            </Modal>}



            {
                previewDocModalVis && <Modal style={{ padding: 100, backgroundColor: 'white' }}>

                    <View style={{ flex: 0.8 }}>
                        <Image 
                        onLoadStart={()=> dispatch({ type: "ENABLE_LOADING" })}
                        onLoadEnd={()=> dispatch({ type: "DISABLE_LOADING" })}
                        source={{ uri: docUrlToPreview }} style={{ flex: 1 }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 'auto', paddingBottom: 'auto', backgroundColor: 'black', flex: 0.2 }}>



                        <TouchableOpacity style={{ color: 'white', paddingHorizontal: 20 }}
                            onPress={() => setPreviewDocModal(false)}
                        >
                            <Text style={{ color: 'white' }}>
                                <Ionicons name="close" size={50} c />
                            </Text>
                        </TouchableOpacity>






                    </View>


                </Modal>
            }



            <ScrollView style={styles.darkness}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView>

                        {/* <CustomButton
              text={t('Edit Profile')}
              onPress={() => {
                navigation.navigate("Location", {
                  editProfile: true
                })
              }}
              style={styles.epBtnView}
              button={styles.epBtn}
            /> */}
                        {/* <View styl123e={styles.horizontalLine} /> */}
                        {/* <CustomInput /> */}


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, marginTop: 20 }}>
                            <Text style={[styles.headerText]}>{t('Application_Number')}</Text>
                            <Text style={[styles.headerText, { fontWeight: 'bold' }]}>{claim?.applicationNumber}</Text>
                        </View>

                        {/* <CustomButton
                text={t('Track old claim')} 
                onPress={() => {
  
                }}
                style={styles.otBtnView}
                button={styles.otBtn}
              />
              <CustomButton
                text={t('File claim')}
                onPress={() => {
                  console.log("CLICKET")
                  navigation.navigate("DownloadPDF")
                }}
                style={styles.ntBtnView}
                button={styles.ntBtn}
              /> */}





                        <ScrollView>



                            <View >
                                <View style={styles.header}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.subheaderText, { fontSize: 12, width: '40%' }]}>
                                            {/* <Image /> */}
                                             {t('form')}0
                                        </Text>
                                        {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                                    </View>

                                </View>
                                <View 
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    
                                }}
                                >
                                    <CustomButton
                                        onPress={() => {
                                            // fetch Details on basis of applicato
                                            // dispatch({type:"ENABLE_LOADING"})
                                            // alert(claim?.courtDocuments.length)
                                            if (!(claim?.courtDocuments.length && claim?.courtDocuments[0]?.title === 'SDM_SUMMON_RESULT_1')) {
                                                setDocName('SDM_SUMMON_RESULT_1')
                                                setCameraModalVis(true)
                                            }
                                            else {
                                                setPreviewDocModal(true)
                                                handleDocPreview(claim?.courtDocuments[0]?.storageUrl)
                                            }
                                        }}
                                        style={{ width: '100%', marginLeft: 40  , marginTop: 10}}
                                    >
                                        {!(claim?.courtDocuments[0]?.title === 'SDM_SUMMON_RESULT_1') ? <Ionicons name="camera" color="white" size={20} />
                                            : <Text style={{ fontSize: 12 }}> फोटो देखें</Text>}
                                    </CustomButton>
                                    {claim?.courtDocuments[0]?.title === 'SDM_SUMMON_RESULT_1' && <CustomButton
                                            onPress={() => {
                                                    setDocName('SDM_SUMMON_RESULT_1')
                                                    setCameraModalVis(true)
                                            }}
                                            style={{ width: '100%' ,  marginRight: 40 , marginTop: 10}}
                                        >
                                            {<Ionicons name="camera" color="white" size={20} />}
                                        </CustomButton>
                                    }
                                </View>

                            </View>

                            <View >
                                <View style={styles.header}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.subheaderText, { fontSize: 12, width: '40%' }]}>
                                            {/* <Image /> */}
                                             {t('form')}1
                                        </Text>
                                        {/* <Text style={[styles.subheaderText, { fontSize: 12 }]}>Date : {dayjs().format('DD/MM/YYYY')}</Text> */}
                                    </View>

                                </View>
                                <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    
                                }} >
                                    <CustomButton
                                        onPress={() => {
                                            // fetch Details on basis of applicato
                                            // dispatch({type:"ENABLE_LOADING"})
                                            // alert(claim?.courtDocuments.length)
                                            if (!(claim?.courtDocuments.length && claim?.courtDocuments[1]?.title === 'SDM_SUMMON_RESULT_2')) {
                                                setDocName('SDM_SUMMON_RESULT_2')
                                                setCameraModalVis(true)
                                            }
                                            else {
                                                setPreviewDocModal(true)
                                                handleDocPreview(claim?.courtDocuments[1]?.storageUrl)
                                            }
                                        }}
                                        
                                            style={{ width: '100%', marginLeft: 40  , marginTop: 10}}

                                    >
                                        {!(claim?.courtDocuments[1]?.title === 'SDM_SUMMON_RESULT_2') ? <Ionicons name="camera" color="white" size={20} />
                                            : <Text style={{ fontSize: 12 }}> फोटो देखें</Text>}
                                    </CustomButton>
                                    {claim?.courtDocuments[1]?.title === 'SDM_SUMMON_RESULT_2' && <CustomButton
                                            onPress={() => {
                                                    setDocName('SDM_SUMMON_RESULT_2')
                                                    setCameraModalVis(true)
                                            }}
                                            style={{ width: '100%' ,  marginRight: 40 , marginTop: 10}}
                                        >
                                            {<Ionicons name="camera" color="white" size={20} />}
                                        </CustomButton>
                                    }
                                </View>

                            </View>

              



<TouchableOpacity onPress={()=>{
    navigation.navigate("MarkBoundry")
}}>


<View  style={{flexDirection:'row',justifyContent:'center', marginVertical:30,marginHorizontal:50,borderWidth:1,borderColor:'#fff',padding:20,borderRadius:20}}>
    <Text>Mark the boundry </Text>
    <MaterialIcons name="gps-fixed" size={20} /> 
</View>
</TouchableOpacity>




                            <View style={{marginVertical:10,marginTop:50}}>

<CustomButton button={{width:'50%'}}>Submit Claim</CustomButton>


</View>


                        </ScrollView>



















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

        paddingTop: '15%',
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
    }

});



// ( claim!==undefined && !(claim?.courtDocuments[1]?.title==='SDM_SUMMON_RESULT_1'))
//( claim!=undefined && !(claim?.courtDocuments[0]?.title==='SDM_SUMMON') )
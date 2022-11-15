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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchClaimDetailsHandler, patchClaimHandler } from '../../services/claimService';
import { fetchClaimDetailsByIdAction } from '../../redux-store/actions/claim';


import { RNCamera } from 'react-native-camera'
import { getGCPUrlImageHandler } from '../../services/commonService';



const BG_IMG_PATH = require('../../assets/images/background.png');



const PastRecordsScreen = ({ navigation }) => {
  const language = 'hi';
  const dispatch = useDispatch();


  const cameraRef=useRef(null);



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




  const {profile} = useSelector(state => state.entities.auth.userInfo);

  const {claim}=useSelector(state=>state?.entities?.claimUtil?.claimInfo)



  // console.log("UIF",UIF);

  // const [name, setName] = useState('Ram Krishna');
  const [member, setMember] = useState('FRC');
  const [role, setRole] = useState('Secretary');

  const [cameraModalVis,setCameraModalVis]=useState(false);
  const [previewDocModalVis,setPreviewDocModal]=useState(false);
  const [docUrlToPreview,setDocUrlToPreview]=useState('');

  const [docName,setDocName]=useState('SDM_SUMMON')



  // const [state, setState] = useState('Himachal Pradesh');
  // const [district, setDistrict] = useState('Kagda');
  // const [tehsil, setTehsil] = useState('Palampur');
  // const [panchayat, setPanchayat] = useState('Gopalpur');
  // const [village, setVillage] = useState('Gujrehra');

  // const useSelector=useSelector(state=>state.claim)


const handleDocPreview=(url)=>{
  setDocUrlToPreview(url)
  // get-image-for-preview



}








  useEffect(() => {
    changeLanguage(language);



    // fetch Details on basis of applicaton
    dispatch(fetchClaimDetailsByIdAction({claimId:profile?.claims[0]}));
    // dispatch(fetchClaimDetailsHandler({id:'A163'},args=>{
    //   console.log("DONE")
    // }));





  }, []);

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>



{cameraModalVis && <Modal style={{padding:100,backgroundColor:'white'}}>
<RNCamera 
ref={cameraRef}
onCameraReady={e=>{
  dispatch({type:"DISABLE_LOADING"})
}}
// flashMode={'on'}
style={styles.rnCamera}
captureAudio={false}
ratio="16:9"
useNativeZoom
>

</RNCamera>

<View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',paddingTop:'auto',paddingBottom:'auto',backgroundColor:'black',flex:0.2}}>

<TouchableOpacity 
disabled={false}
style={{borderWidth:1,
borderRadius:50,
alignItems:'center',
padding:20,
marginTop:'auto',
marginBottom:'auto',
// alignSelf:'flex-start',
alignSelf:'center',
backgroundColor:'#fff'
}
}

onPress={async()=>{
  try{
    
    dispatch({type:"ENABLE_LOADING"})
 if(cameraRef){
  console.warn(cameraRef)
  const options = { quality: 0.5, base64: true };
  const data = await cameraRef?.current?.takePictureAsync(options);

  // console.log(data?.base64)
  dispatch({type:"ENABLE_LOADING"})

  getGCPUrlImageHandler({
    fileName:'Hello',
    base64Data:data?.base64,
    isPdf:false
  }).then(async({data})=>{
    console.log("RESPONSE",data.name);


    console.warn("CID",claim?._id)
   const rssponse= await patchClaimHandler({
      claimId:claim?._id.toString(),
      title:docName,
      storageUrl:`https://storage.googleapis.com/ratifi-document-storage/${data.name}`
    })

    console.log("WOW",rssponse.data);

    setCameraModalVis(false);

    if(rssponse.data.success===true)
    dispatch({type:"DISABLE_LOADING"})




  })




  .catch(err=>{
    console.log(err)
  })




 }
 
}

catch(error){

  console.log("ERROR",error);
}
}}


>
  <Text >  
     
             &nbsp;&nbsp;  &nbsp;&nbsp; 
    </Text>
</TouchableOpacity>


<TouchableOpacity style={{color:'white',paddingHorizontal:20}}
onPress={()=>{




  setCameraModalVis(false)



}}
>
  <Text style={{color:'white'}}>
    <Ionicons name="close" size={50} />
  </Text>
</TouchableOpacity>






</View>


</Modal>}



{
  previewDocModalVis && <Modal style={{padding:100,backgroundColor:'white'}}>
    
    <View style={{flex:0.8}}>
    <Image source={{uri:docUrlToPreview}} style={{flex:1}} />
    </View>
  
  <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',paddingTop:'auto',paddingBottom:'auto',backgroundColor:'black',flex:0.2}}>
  

  
  <TouchableOpacity style={{color:'white',paddingHorizontal:20}}
  onPress={()=>setPreviewDocModal(false)}
  >
    <Text style={{color:'white'}}>
      <Ionicons name="close" size={50}  c/>
    </Text>
  </TouchableOpacity>
  
  
  
  
  
  
  </View>
  
  
  </Modal>
}



      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {name}
                {', '}
                {postLevel}
                {', '}
                {authLevel}
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
              onPress={() => {
                navigation.navigate("Location", {
                  editProfile: true
                })
              }}
              style={styles.epBtnView}
              button={styles.epBtn}
            />
            {/* <View styl123e={styles.horizontalLine} /> */}
            {/* <CustomInput /> */}
          

              <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:40,marginTop:20}}>
               <Text style={[styles.headerText]}>{t('Application_Number')}</Text>
               <Text style={[styles.headerText,{fontWeight:'bold'}]}>{claim?.applicationNumber}</Text>
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








            <View >
              <View style={styles.header}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Text style={[styles.subheaderText, { fontSize: 12 }]}>
                    {/* <Image /> */}
                    SDM को प्रस्तुत किया </Text>
                  <Text style={[styles.subheaderText, { fontSize: 12 }]}>तिथि : {dayjs().add(7,'day').format('DD/MM/YYYY')} </Text>
                </View>

              </View>
              <View >
                <CustomButton
                onPress={()=>{
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})

                      // handleDocPreview(claim[0])
                      // setPreviewDocModal(true);

                      if(!(claim?.courtDocuments[0]?.title==='SDM_SUMMON'))
                      setCameraModalVis(true)
                      else
                      {
                        setPreviewDocModal(true)
                        handleDocPreview(claim?.courtDocuments[0]?.storageUrl)
                      }


                  
                }}
                 style={{ width: '100%' ,marginTop:10,paddingRight:30,alignItems:'flex-end'}}
                >
                {!(claim?.courtDocuments[0]?.title==='SDM_SUMMON') ?   <Ionicons name="camera" color="white" size={20}/>
                     :  <Text style={{fontSize:12}}> फोटो देखें</Text>}
                </CustomButton>
              </View>

            </View>



            <View >
              <View style={styles.header}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Text style={[styles.subheaderText, { fontSize: 12 }]}>
                    {/* <Image /> */}
                    SDM का जवाब</Text>
                  <Text style={[styles.subheaderText, { fontSize: 12 }]}>तिथि : {dayjs().add(14,'day').format('DD/MM/YYYY')}</Text>
                </View>

              </View>
              <View >
                <CustomButton
               onPress={()=>{
                      // fetch Details on basis of applicato
                      // dispatch({type:"ENABLE_LOADING"})

                      if(!(claim?.courtDocuments[1]?.title==='SDM_SUMMON_RESULT_1'))
                      {
                        setDocName('SDM_SUMMON_RESULT_1')
                        setCameraModalVis(true)}
                      else
                      {
                        setPreviewDocModal(true)
                        handleDocPreview(claim?.courtDocuments[1]?.storageUrl)
                      }


                  
                }}
                 style={{ width: '100%' ,marginTop:10,paddingRight:30,alignItems:'flex-end'}}
                >
                {!(claim?.courtDocuments[1]?.title==='SDM_SUMMON_RESULT_1') ?   <Ionicons name="camera" color="white" size={20}/>
                     :  <Text style={{fontSize:12}}> फोटो देखें</Text>}
                </CustomButton>
              </View>

            </View>


























          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ImageBackground>
  );
};

export default PastRecordsScreen;

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
    position:'relative',
    zIndex:10000,
    alignSelf: 'center',
  }

});

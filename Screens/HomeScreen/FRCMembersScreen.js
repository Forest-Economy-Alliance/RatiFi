/* eslint-disable prettier/prettier */
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
    Alert,Pressable ,ScrollView
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect, useState } from 'react';
// import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { AllVillages } from '../../constants/Villages';
import CustomButton from '../../components/CustomButton';
import Dropdown from '../../components/CustomDropdown';
import { useFormik } from 'formik';
import Loader from '../../components/Loader';
import CustomSignOutPopup from '../../components/CustomSignOutPopup';
import axios from 'axios';
import { BASE_URL } from '../../services/APICentral';
import { BackHandler } from 'react-native';
import HI from '../../assets/i18n/hi.json';
import { getDeviceHash } from '../../utils/DeviceUtil';
import RoleScreen from '../Role/RoleScreen';
import { verifYYMember } from '../../redux-store/actions/auth';
import { logoutHandler, verifyyMember, viewFRCMember } from '../../services/authService';
import {Dimensions} from 'react-native';
import { firebase } from '@react-native-firebase/messaging';
const BG_IMG_PATH = require('../../assets/images/background.png');

const HomeScreen = ({ navigation,route  }) => {
    // const {state} = this.props.navigation;
// console.log(route.params.members,"FRC Members");
    const [imgUrl, setImgUrl] = useState('x');
    const [vData, setVData] = useState([]);
    const [members,setMembers] = useState(route.params.members)
    const { name, panchayat, tehsil, state, district, postLevel, authLevel,village } = useSelector(state => state.entities.auth.userInfo?.profile);
    // console.log(authLevel=="एसडीएलसी");

    const vil = useSelector(state => state.entities.auth.userInfo.profile.village);
    const [vis, setVis] = useState(false);
    const {language} = useSelector(state => state.entities.appUtil.appUtil);

    const dispatch = useDispatch();
    const [role, setRole] = useState('FRC');
    const [val5, setVal5] = useState('');
    // const [village, setVillage] = useState('');
    const [gramSabha, setGramSabha] = useState('');
    const [pressed, setPressed] = useState(false);
    const [villages, setVillages] = useState(AllVillages);
    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('en');
     console.log(postLevel=="अध्यक्ष")

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setCurrentLanguage(value))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        changeLanguage(language);
    }, []);





    const { profile } = useSelector(state => state.entities.auth.userInfo);





    const handleSignOut = () => {
        setVis(true);
    }
   
    const fetchData = async () => {
        await firebase.messaging().registerDeviceForRemoteMessages();
        const fcmToken = await firebase.messaging().getToken();
        console.log('fcm', fcmToken);
       
        return fcmToken;
      };
    const signout=async()=>{

        logoutHandler({
          id:profile?._id?.toString(),
          fcmToken:await fetchData()
        }).then(res=>{
    
    
          setVis(false);
          dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 1});
          dispatch({type: 'SAVE_TOKEN', payload: null});
          navigation.replace("NamePhone")
    
    
    
        }).catch(error=>{
    
          alert("Something went wrong")
    
    
        })
        // dispatch({type: 'SAVE_PROFILE', payload: null});
      }

    const verifyMember = (id) =>{
       dispatch({ type: 'ENABLE_LOADING' });
 
//   dispatch({ type: 'DISABLE_LOADING' });   
console.log(id)     
  return verifyyMember({id:id})
  .then(async (response) => {
    return viewFRCMember({village:village,authLevel:authLevel,postLevel:"सदस्य"}) 
    .then(async (res) => {
        setMembers(res.data);
        dispatch({ type: 'DISABLE_LOADING' });
    })
        // console.log('Verify Member', response);
    //     const newMembers = members;
    //    const arr= await newMembers.filter(item=>
    //        item._id !== id            
    //     )
    //     console.log(arr,"new Members");
    //     console.log(response.data,"updated member")
    //     arr.push(response.data);
    //     setMembers(arr);
    //     console.log(members)
        
    //     if (response.success) {
    //       dispatch({ type: 'VERIFY_MEMBER', payload: {} });
    //     }
    //     if (callback) {
    //       callback(response.message);
    //     }
      })
      .catch(err => {
        console.log('NETWORK', err);
        dispatch({ type: 'DISABLE_LOADING' });
      });
    }

    const viewFRCMembers = (village) =>{
        console.log("view all FRC members of village" ,{village:village,authLevel:authLevel,postLevel:"सदस्य"});
        return viewFRCMember({village:village,authLevel:authLevel,postLevel:"सदस्य"}) 
        .then(async (response) => {
            console.log('View Members', response.data);
        //     if (response.success) {
        //       dispatch({ type: 'VERIFY_MEMBER', payload: {} });
        //     }
        //     if (callback) {
        //       callback(response.message);
        //       dispatch({ type: 'DISABLE_LOADING' });
        //     }
          })
          .catch(err => {
            console.log('NETWORK', err);
            dispatch({ type: 'DISABLE_LOADING' });
          });
    }
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
            Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };
        
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        
        return () => backHandler.remove();
    }, []);
    // Make a useEffect run on particular pages
    const getEnglish = (param) => {


        // console.log("OK", HI.translation)

        const left = Object.keys(HI.translation);
        const right = Object.values(HI.translation);
        const len = left.length;
        for (let i = 0; i < len; i++) {
            if (right[i] === val5.label) {
                return left[i].toLowerCase();
            }
        }

    }

    const goBack = () =>{
        // Move to RoleScreen
        navigation.navigate("HomeScreen")
    }
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const maleMember = members.filter((member)=>member.gender!="female")
    const male = maleMember.length;
    const female = members.length-male;
    console.log(male,female)
    const isEligible = female/members.length;
    console.log(isEligible)
    return (
        // flexWrap: 'wrap',
        <ImageBackground
            source={BG_IMG_PATH}
            resizeMode="cover"
            blurRadius={10}
            style={styles.bg}>
            <View>

            <View style={{height:50,width:windowWidth}} >
            <Pressable onPress={()=>goBack()}>
            <Text style={{fontSize:18,marginLeft:10,marginTop:10,color:'white',marginBottom:10}}><FontAwesome name="arrow-left" size={18} /> {t('Go Back')}</Text>

            </Pressable>
          </View>
          <ScrollView style={{ backgroundColor: 'rgba(0,0,0,0.3)',height:windowHeight,width:'100%'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            {
                isEligible <= 0.33 ? 
                <View style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:15}}>
                    <Text style={{color:'red'}}>{t('The FRC Team is not Eligible, The number of Women should be 1/3rd of total FRC Team.')} </Text>
                    
                    <Text style={{color:'red'}}>No  of Male: {maleMember.length} </Text>
                    <Text style={{color:'red'}}>No  of Female: {members.length-maleMember.length} </Text>
                </View>
                :
                <View></View>
                }
          <View style={styles.header}>
                    {village === '-1'
                        ? <Text>कृपया अपनी जानकरी अपडेट करें</Text> :
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
                        </>}
                </View>
             
             {
          members.map((data)=>{
                console.log(data.name)
                return(
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginBottom:35,marginLeft:20}}>
                    <Text style={{color:'white'}}>
                        {data.name}
                    {/* {' '} */}
                    </Text>
                  {
                    data.isVarified===false ?
                    // <CustomButton
                    // text={t('VERIFY MEMBER')}
                    // onPress={() => {
                    //     verifyMember(data._id)
                    // }}
                    // style={styles.epBtnView}
                    // button={styles.epBtn}
                    // />
                    <Pressable
                    style={{
                        borderWidth:2, paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,borderColor:'#fff',borderRadius:5,marginRight:10
                    }}
                    onPress={() => {
                     verifyMember(data._id)
                        }}
                    >
                    <Text style={{color:'white'}}>{t('VERIFY MEMBER')}</Text>
                </Pressable>
                    :
                    // <CustomButton
                    // text={'Already Verified'}
                   
                    // style={styles.epBtnView}
                    // button={styles.epBtn}
                    // />
                    <Pressable
                    style={{
                        borderWidth:2, paddingTop:5,paddingBottom:5,paddingLeft:5,paddingRight:5,borderColor:'#fff',borderRadius:5,marginRight:10
                    }}
                    >
                    <Text style={{color:'#fff'}}>{t('Already Verified')}</Text>
                </Pressable>
                }  
                </View>
                )
              })
                }
                
           
            
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
           

        

                {/* {vis && <CustomSignOutPopup vis={vis} setVis={setVis} signout={signout} />}

                <TouchableOpacity style={styles.roleContainer} onPress={handleSignOut}>
                    <Text style={styles.roleText}> <FontAwesome name="user-circle-o" size={30} color="white" /> </Text>
                </TouchableOpacity> */}


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

 
            </View>
        </ImageBackground>
    );
};

{/* <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => {
                    navigation.navigate('FormsPage');
                  }}
                >
                  <Text style={styles.nextButtonText}>{t('download')}</Text>
                </TouchableOpacity> */}

export default HomeScreen;

const styles = StyleSheet.create({
     
    //  darkness: {
    //     // flex: 0.1,
    //     backgroundColor: 'rgba(0,0,0,0.3)',
    //     width:windowWidth
    //   },
    roleContainer: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '1%',
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
        marginBottom: '10%'
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
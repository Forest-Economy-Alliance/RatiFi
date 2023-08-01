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
    Modal,Pressable
} from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomError from '../../components/CustomError';
import { fetchClaimDetailsHandler } from '../../services/claimService';
import { BackHandler  } from 'react-native';
import {Picker} from '@react-native-picker/picker';


const BG_IMG_PATH = require('../../assets/images/background.png');
const ProfileScreen = ({ navigation }) => {
    const {language} = useSelector(state => state.entities.appUtil.appUtil);

    const dispatch = useDispatch();

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

    // console.log("UIF",UIF);

    // const [name, setName] = useState('Ram Krishna');
    const [member, setMember] = useState('FRC');
    const [role, setRole] = useState('Secretary');
    // const [state, setState] = useState('Himachal Pradesh');
    // const [district, setDistrict] = useState('Kagda');
    // const [tehsil, setTehsil] = useState('Palampur');
    // const [panchayat, setPanchayat] = useState('Gopalpur');
    // const [village, setVillage] = useState('Gujrehra');
    const { profile } = useSelector(state => state.entities.auth.userInfo);

    const [selectedValue, setSelectedValue] = useState('form0');

    const [claim, setClaim] = useState(null);
    useEffect(() => {
        changeLanguage(language);


        dispatch({ type: "ENABLE_LOADING" })

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
    }, []);
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
            <Text style={{fontSize:18}}><FontAwesome name="arrow-left" size={18} /> {t('Go Back')}</Text>

            </Pressable>
          </View>
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
                        <View style={styles.marginview}>
                            <Text style={styles.subheaderTextnew}>
                                {t('Check your upoad documents here')}
                            </Text>
                        </View>
                        <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedValue(itemValue)
        }>
        <Picker.Item label="Form 0" value="form0" />
        <Picker.Item label="Form 1" value="form1" />
        <Picker.Item label="Form 2" value="form2" />
        <Picker.Item label="Form 3" value="form3" />
        <Picker.Item label="Form 4" value="form4" />
        <Picker.Item label="Form 5" value="form5" />
        <Picker.Item label="Form 6" value="form6" />
        <Picker.Item label="Form 7" value="form7" />
        <Picker.Item label="Form 8" value="form8" />
        <Picker.Item label="Form 9" value="form9" />
        <Picker.Item label="Form 10" value="form10" />
        <Picker.Item label="Form 11" value="form11" />
        <Picker.Item label="Form 12" value="form12" />
        <Picker.Item label="Form 13" value="form13" />
        <Picker.Item label="Form 14" value="form14" />
        <Picker.Item label="Form 15" value="form15" />
        <Picker.Item label="Form 16" value="form16" />
        <Picker.Item label="Form 17" value="form17" />
        <Picker.Item label="Form 18" value="form18" />
      </Picker>
      <CustomButton
                                        onPress={() => {

                                            let ind = selectedValue.slice(4); 
                                            ind = parseInt(ind);

                                            if (claim?.courtDocuments[ind]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[ind]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
    </View>









                        {/* <View
                            style={styles.fileSection}>
                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form0")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[0]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[0]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>    
                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form1")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[1]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[1]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>
                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form2")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[2]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[2]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>


                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form3")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[3]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[3]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>


                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form4")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[4]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[4]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>


                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form5")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[5]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[5]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form6")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[6]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[6]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form7")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[7]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[7]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form8")}</Text>
                                {/* <CustomButton
                                    onPress={() => {
                                        // navigation.navigate("PDFPreviewScreen", {
                                        //     url: 'https://00f74ba44bae72e745ffba76e7a5e029d356a337ac-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F8.pdf?jk=AFshE3Vd5RBn9YHeIawXRVWQbw4xGGtsMQYhwB1yooDjOG_3f2o3LIS5bwaNFIV5vxZT6GAPk4nKudoRU4EvgS1lhIYfa3eejFhmCfX67yoYNDe9eujy0AmIHfGjrYEMjd11rM_AZS1qtmyFqqErN6D3LYgT4xtI-ErAlom9Qmz1zG5u1IUinQdpeXTQiKN0NOXGkBYelDgh5fLWqPi21OBpW6dExQGhm9uimN7G3oTZVLk85ki7HAwaNFCNGflfBI9QO5-DQ23I9fHgyKh2nNrecCQ_lXh7zq9dEUE8R_afdHvngOjYt2tyvvBoLcLzKLW2gZqDLWIleMm-K2nKsrjzlv2CQ11vV2lowMb2jZ2boH8cnKcJZUFOZXfC_X3j3tmcLt0batlUOP-6cfX5WVUagf1kCmGsxnYItwWK-FxlNdheI5t4rHpDtUA7a0Zbwr1DBy0WkgjVKlwYHoN3lmMGwlkPdc5eDXcbHEZ7f4DO2MwGgiKlXIPBnPMysthS6VfitdCrqQsADyBZIjLqy4NlPlZPiVhYtChhvrIDFb3Vw1gSzJ69AB7FWVGLDjdyrVs-Dnm1jO3gqabSE0QvcxALbVlswZXsAmVrO4B6UMB2Eiy3J4n_03Am3KbhTCIUhw-4zCJCOxYq2UsbgTP-7XiUi0v8-bS71akbFt51j7fkhlJJcgXN80qyhTXVrbpfo15YKGzIl-eWhrSBl-mybkOEbeC05jSKJVxleH6by19kOkYUARSPgQmQiruvp86IEMFOO3AC_bkKw1XXjaih9PtKxfrsnajTi7V9xa-ewjWPOYEGdwW-UL-2AH9-RpIZXkgfiLOm2B06aE76BGwCwxdxOHGIl__EmOBkitJ2Cv10h4YCYbDCTbx0e2CeT5jBQgeRsgXvJUBvzMgJyRftVJN9O_WhtKnTmJMX0WMbDjusvz5KLIO0BmyUksyJ4G-spsmtu_CnjitpMbmFBxKd8GUnmVMj3vhUXd9-ddDKyWtXR8vIMnYSr2wT4f_-Fn0TjAwgc05j87hb_DsUAL3I3x-hQ24km7cISy8dO2Gb5tj1B_fTtWLocLdqd8eTgOfl60pGLoRVNZ_I5RnELe3PwfENoECTPEwmRpXO6egxa_xPMHeQl6UL8qGxjuu67MSEIWhgM8Ag6uOVgzbmnvumxtye4zAz0GAEzkV1VAF75PLW8xCyjGRlnpWxcuonkDTqs8gwiiqtkJaCcw&isca=1'
                                        // })
                                        navigation.navigate("PDFPreviewScreen", {
                                            url: claim?.courtDocuments[8]?.storageUrl
                                        });
                                    }}
                                    button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                    {t('View Document')}
                                </CustomButton> 
                                                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[8]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[8]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form9")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[9]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[9]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form10")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[10]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[10]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form11")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[11]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[11]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>


                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form12")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[12]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[12]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form13")}</Text>
                                    <CustomButton
                                        
                                        onPress={() => {
                                            if (claim?.courtDocuments[13]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[13]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form14")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[14]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[14]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>


                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form15")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[15]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[15]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>

                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form16")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[16]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[16]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>
                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form17")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[17]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[17]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>
                            <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form18")}</Text>
                                    <CustomButton
                                        onPress={() => {
                                            if (claim?.courtDocuments[18]?.storageUrl) {
                                                    navigation.navigate("PDFPreviewScreen", {
                                                    url: claim?.courtDocuments[18]?.storageUrl
                                                })
                                            }
                                            else {
                                                alert("No document found")
                                            }
                                        }}
                                        button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                        {t('View Document')}
                                    </CustomButton>
                            </View>
                            {/* <View style={styles.fileContent}>
                                <Text style={{ margin: 10, fontSize: 16, fontWeight: '800', color: "white" }}>
                                    {t("Form19")}</Text>
                                <CustomButton
                                    onPress={() => {
                                        navigation.navigate("PDFPreviewScreen", {
                                            url: claim?.courtDocuments[18]?.storageUrl
                                        })
                                    }}
                                    button={{ width: 200, fontWeight: '800', marginLeft: 10 }}>
                                    {t('View Document')}
                                </CustomButton>
                            </View> 


                        </View>
 */}


                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ImageBackground>
    );
};

export default ProfileScreen;

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
        alignItems: 'flex-start',
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

    fileSection: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        marginTop: '15%',
        display: "flex",
        flexDirection: "column"
    },
    fileContent: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        marginTop: '10%',
        display: "flex",
        flexDirection: "row",
        height: 45,

        paddingLeft: "10%"
    },
    subheaderTextnew: {
        fontSize: 16,
        // textDecorationLine:'underline',
        textDecorationStyle: 'dotted',
        color: '#FFFFFF',
        fontWeight: "400",
        textAlign: 'center'
    },
    file: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',

    },
    marginview: {
        marginTop: "20%",
        paddingHorizontal: '10%',
        alignSelf: 'center'
    },
    newbuttonstyle: {
        height: 30,
        width: 400,
        marginLeft: 0,

        fontSize: 12,
        color: '#FFFFFF',
    }

});

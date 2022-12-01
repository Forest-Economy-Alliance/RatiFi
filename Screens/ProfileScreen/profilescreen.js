import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, string} from 'yup';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomError from '../../components/CustomError';

const BG_IMG_PATH = require('../../assets/images/background.png');
const ProfileScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();

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

  const {name,panchayat,tehsil,state,district,village,postLevel,authLevel} = useSelector(state => state.entities.auth.userInfo?.profile);

  // console.log("UIF",UIF);

  // const [name, setName] = useState('Ram Krishna');
  const [member, setMember] = useState('FRC');
  const [role, setRole] = useState('Secretary');
  // const [state, setState] = useState('Himachal Pradesh');
  // const [district, setDistrict] = useState('Kagda');
  // const [tehsil, setTehsil] = useState('Palampur');
  // const [panchayat, setPanchayat] = useState('Gopalpur');
  // const [village, setVillage] = useState('Gujrehra');

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
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

            <View
            style={styles.fileSection}>
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form1")}</Text>
              <CustomButton
                  onPress={()=>{
                    navigation.navigate("PDFPreviewScreen",{
                      url:'https://00f74ba44b015510f9940aa8e8e50b2bb72533eba0-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F1.pdf?jk=AFshE3U2Nng-trNTCk0DfeaTHD5SPYTMBJch0jJsiovB5rf4LRXisK-HXLbL-UugNtsgku6HLL1i9opRIrDA85DUXUBmiOS9y_jA5M7qEBdmxvF6nE6HkAOy6-19W2fFfLIUt6e1J3gcrWCAIsYLQN6nWLoSy-w7mnLU9eHYFYM5GHeAuvrVNAw_tDMHtDV1DEVGpHBs2FG_WZILL7gf9ak1xvM7K1UINJcJEHMQKg8G-dYKpvn6TotLSarRs_r2WhLbABHgYWJWXxJ0rdoN9vqUdHAuAoIJUk_1W1ZUmBXfr_pmfHGVyi6OK2SqeOy9MjQ2GVCQdE_xAnKXSGZ0DG0hy0O-fvg49fcb5XNn3e0KlbPmsfOfImQwY5ECEIKE1YEukPvAvpQlzGFWH0Ab7_vaAaHEA9vO9tNvTTdJURHOOLKcfROFljTlBGcdd4INtlsyfU-10-2eAdjuFRn3Bf7rs4eOKKMcnfniK6Sogmm07Jro3dV4Omuf3zrg6QboqLuRi5Bjjbnrr8uuTEFwsguWBg2_l4bM9mneYHDQqKNmSrKR1cYTBGoL6kjfmuKHvK9CiiBDWUWcgwSz0sR9_3pRIZBKzqUKtNEouH7xIFZhhRGPVo5iVa5iagCciEV_ovGB41Ht6lOZymNreV2IKGS90UPgp0YeSriZTRQ9Pr_bWZnyqw9F5mhAlC3T2tOLd8ZPVaGQLcg_sAMKHnj7xjb3mXyUoT8OFnR2e4wtr_UqY-quMRft1XZ5RrvXJBfAK3mJEat1XPOe6ilcP5YonUPMGgg2AUknhwNWM0PT8jAHrlnTgybzYSIg7Yt5e1NBfpB0WKkWIAEZQ9O7g8mhHwpWaIeUc-lMKiXkyOr7Yjs66neG1bIiQg_dCNcNMaUQyQQMrAe4oeB19UrNVrinWvWWBOGT5FIoHw1-LjC3t_cpm3_uwTA0Uyc9rXN0DEza2QYeGfS9Nl9-ubkTyVnexJl7gjq-FwsSmkdTjq1_8aeoonjoulkryL3zP0cup_uO0wjZ-qm-7g1cSdVUbknW6xIsRGb8qqoWVtwXS0bVvtPBMEWLRaWpBda2izCAUizB-TmVt5SANwmsU54VmfA3W2SoEn6mEX2Znv7aZBYrwdvYCSFg51RSD4OFHPEZBLE-ZyYKodISQYQJKNzdGJXNnxUhIYNdPKGaKbG5S8NbYEU5DOjHBq5EFNWzZf46adkI-Ao5JTJVnJNrhw&isca=1'
                    })
                  }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>{t("Form2")}</Text>
              <CustomButton
                 onPress={()=>{
                  navigation.navigate("PDFPreviewScreen",{
                    url:'https://00f74ba44b326f1e1a4b8a11ccd7a7bfabddb18707-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F2.pdf?jk=AFshE3XCZd7iecPfEjZsb5MWg0u_UI5Wx9pewHncVDGi1dk74BBfBB3SsrKr0YEQqzqbmmL7fySCY4wnaBIC5-Au5EXgJu5U-MXPA0KL-ELkQW0oz7kF6lyrH56sFp7U5qZa0W4L77w7dUZbeYkMmagnO2aKI4RVOMGTFrGjytjihZrN5rIRFZfA27MSwLcwuiaOwpJKx5GKh4ov7ZKsKi_24I7Ug7Q5coatDy-7coEB6Pp6JVkL-FFFIVE3nYqGqLsih4d9tVAG7uniuM_3LVir4ttqop2muDEmgB0tCYNwE4EkMeKhu_DDN49ivcc4bOVIwtTYaMoeBBmbSHx_DCpfl36PCMLPoeWWuo-lBv2Fsfwpo8WrnuMwBt1iEMLqF7ewxJ-Vx_2-JmVZcXR5qDTRmOwkCy4K67yEde8Pg-y1tDL8caVVLf2uwViStN11i5ZKTgyRVZlSot3euDqyj4Ju8inTS5v19TdV4p844DDwMX-pPSFjnD41O1zMGUxZpimEi6xOGrxA4cWwtAwMtMW3-_gy5o-PQf70tqZjbP36u2wYTrr2Wzelpfflh-8vMMh-MWw_W_2iv35Z8PaPrTEyQgV_TIPreY0ksJ1-9mNoChAFu-s3sECe_RlbcRaNeVTsn7lxlWwG_-tqzeFAhD8ku1jxoD6oRufn2RJmWf8m2FQms2_wtZ3lUjKmzyWRIRxMOVo_-vnucHmHyTacj4ClDnym9YR0TZkCpxQv0s0_kh0bJBlfFH6DK_G7t-FM0wgLsbBSQ2SuLjOUZM56og1inL8lSx_lfqQT8k7q6xelqLkyMVQmaUle4wW2oSvV8V7ae-Ix8pfcZ3JloWhEf2X9PROxUDIusol1jwfjrxHmVEVSNLZQM5JCxJJ8x4b91gYCSOzZzahgHWPZy-BVoRdnU_a1G8-n4yebEAgZRCcuhyf7NSA_i0uxk4MaXbxnucCweN8hvxHcEUEJY43I5drchaxFUJqQQ27aCWstLLI33JT1hby_35G-IMHXgcCF29fBX00Ba3PIlbGHJuo40jFMJtAPP9l1duLso0AD6GGO_96eYxEngjd9MF4AE181D0BWpgh-7MnQFIwVGgwu0-1tMu--Ln1WHxCBCLUfYilEt5xpqUGOeJUW-ptawaRE_7T9YPo1kd0slnm3FgVDRvEqT4MRch6ikdDqq-bsfFU2EIHODMyKgJov88WWSxynMR6Tx4KgMEd_oQ&isca=1'
                  })
                }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

             
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form3")}</Text>
              <CustomButton
               onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44b9652f14ec1163f0df4c75b20ceea52e3-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F3.pdf?jk=AFshE3UPNpOiayEM56iCmE0dzkkoJsD8AXxvby4-P-M0pMy0XJW4PnB2H9PDTMLvPLjOKUH1-L0HMCTgMq_Znb6DDmBylIVo7nurz_ReBP4sZU2JnxZ-FChYnnk0A8Ho1oLFOU9Fi2uItWBYRDlhqFBd0hnM_chX_8HCLDsrrf9DqUQIKIAU8sLam2dG3arv8EAVQ7ZuMTc1wCmZP-afrm1G6iGIpZwHhz01SrReM4yPtEMy9UIwolSiQRjP8YFgkIBbzZTsBlNRtA7brkYDBzahxqTc8e5vChrmLMJIr42Mq3RqYtM0n4F_c-8CEF3duosznqd6DJw3T7k57UPDI1q7E4SDSKLUbHmK2gzcDKp-v8Qak1cvtF6LZRAtqSoRRI62EfxxzWavviF_Y7xAbhTnSTrM_6SWOg5is7Mt0yMp_JhF2o4sSz8Zgmn8FnmzGSMeZ16-NBu6Eo_orUdU8KFMLXC1M1kxjNvyi6Ej_N1HSMwqwPZ3q_iECxwuoJW0bPqT2tPIF3HJkF6BEQzSJystwPyspyVNN-1YhcPNCbfXbtSqZMrgxhhAb516KwqxPsgcEQtFDK0VArtkzbjEnx_GFeVOQntAIlgP23OJz4A7MNGaFR9Y2W-fmqD7izsNO4kKwdjQ03-DZXOiNS5r_x3ZsHLsLYh4MqNKWV04uoeI5iB0kQOIfncNvgBMSN0Jsw6O7cDJF6qg18e3tlxbZXya8Ti7f-EYBZDFopAR3iBYCl66VtJyhSDFMYeT1jGPk6MrxR8fmrc7Aplyk8dz0JqCehxZxfuSBL4LQUgcVir7ZJ9abTEJI5-i2Gm2ooKal1_ptrLRP1_1Ijqak13sR437hmlCfFTGkYX-iK5LmojxexaazCJ6CnEYL3nQGZ4r_x1A24abCL-cqC7ISWZsDw2eLNYpa6d3eLAF8P_SAmTYZf0e0jKaV9R2oSuEpZFVsJyAnbc5o1X0jv1xJPLYUG7Tx6Em729CCBUvU4uUAnPt5O3XeWvk_DtJbktN_rcs_SVlmIab0lXQ4lVfd8Q2T-aO4VTduL_6L8Whf7myxL9KX0FPUDpKrZm_yHPEe5Fs4RkkxY5Dhr4nhFxJ9RgmNvdzYvdph2RMwkcjIMw5fip8aMz0XtXXzoTZuy9hrIkzso4_K9M1zpMMzuy57B2NGacxmyxVNsHiyCU7aJkEhhxhBydC_grr2mWjeVt1kZPODKdlK6kmEtbPZQ&isca=1'  })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                
                {t('View Document')}
              </CustomButton>
              </View>


              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form4")}</Text>
              <CustomButton
               onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44bb5db8c8c27314839da663aeb46438fea-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F4.pdf?jk=AFshE3VzmfkDr_jB1MsaSIXl7yK0D5ogfShum9C_oG0m5WzEztMkXYBq9s8mzHriW1AbQ4XLygNt42uCeJ6McmQZk5ln_WZQmXEo2qOXkNQVsfvTkoXTJj-3L1BtpsYbdBEjHGI4ITzNc3DkOWhG-CIDETuh8BRinD6YnpKNV0ul-bE1xAZuseHVG-f1HoDM41_bIfWDzvjxsYo7eC7ZL0c0Bw9c2v6HoBxN9QO0b6q77xQSlmqgN9O1kR4_Fd68jrr38jb1NCBb1XprRZYq1M_k2TyjqLnllEdFxMPNFRDxtvPRHwY9K8k8xqY1KLQO0uftEwCuzpO5myKD8JrwHTtdErAJLvaa5i9cxAcUy8io_ixh30PoAL8Xn3ro_435crnNu7V3YvW8vGPYP3jA_GB_Ube4YERtZiFDATszA2sLQuP6Ga2GSoRPfIa333iZGU2nbVBQVsl_8NG48cGwdelwx8rtSe5KjWDKPOcWsyUq2jURLCwvBFxmMNB-Jng44lNBNApfVfyqtpSGI4E4h6cENdDauSx7VitptmTgzDBEpZz6HHlL_cRFIYKqTMKcq-fZoTJslcZTdu2pSwPREVQZuonFnG-gvOT0T0gZhGmFUoDtpohLrfIE9zAJ6as84lj__Ujzvg-UWKnX30W8btyr7YYhcM-6D66pcJtGx5E5sp87usIuP_AbNZIN0aW3Uvt8EUZya1M9E-aGrZ9teg376_E1uXDhRBBWuxaoiuVE9UBKElZytDftVLcNyo96oALtz9qn-Ly3GzCGV_tISe8GAz2JOAtDdESeyBVjkOCmNGVcMNVRwk0VL2FFbW_E5HD-zVh-bdWRWD-9y7OmP5eCIsA2YeiMhSndo_Bp8pmZfBCFhcbSapo1LixITkfwjUqsEhc3AHidv4ci4BRE9HhXYGzPDIhYxosql2tQlOlX3HSu5MB0S11yrZ70qowsGlNMswmIOFzMm0_A45DxIlF1vLHIb4tJCtT6TEeN5OhbWfqaEC-0oMF23pYQVMFbTcWSs1e5YbqF4Y0AS10oo7cRN_QZnjuAN64BSL17vkihRljx_FLTx6cRoO51SXRG5MYQHyPCPWjo_K1UJQtcge9wOR1BU5tvZxSuveZ9FeTv7yN5WmMbkDj7vXKfCMn_Y4Cr5-BmGv3ZEtzqsp2Hg_dRo9vpcLWAE7j5vG8NeChwnEmafkHpNCTH2-N2_5whtFhpMEi80yJhbw&isca=1'
                })
            }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>


              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form5")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44ba1c44ccad1a035c7e0281d5d8a6e2836-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F5.pdf?jk=AFshE3XWz6RIaIS-beifzo0JLPyQgTv7_7r_8FdUUIgtZo7ZFzzY9W2gI2VoSEZnOc_o4_9HXm3XrBai7R9ewv9BdfhdrSf6HrS63S3DPyZRkcxYESR1MqG0GXMW27_FG2yU_2GH6k4Up4DXL-1FSqp6Bkmo-DFcKYT5i2a5B_B-ZcAulZa0PpzX0ZD1R2OfhESbtc5efvXU19Flk6F7uwgh275sw8Y5696lbJoys4FtvD6xi3fwGIzhmQ-FDRxxWtWpeWtVLo3UuiTmquIWJvaf7sb16ZXRtRi1OeJMVBkSR87DFvS3eWjFRIX9JOsrPyZodOxuKvGytbo3Ur0jGJkPe7gn6C_BkI9X5wByUfPRikM9K35vp3Bk_gfyNTbfQ0uY5efPvdQjp4iIclrERP6LRtgZB9VtWgj3T3iEbJ-o6-0owzcCLZU8MDLWZysKlwHjxeVtcTsDnyPsgpSPikHk0Ic490ptUCJzd3_lB2tzNo1UB-1e3fSfJvLvcEjwksHEaNjsFQ_60lCaCCMHcF_OvIPsB9uVZN0pIvmX7aRgKq5v-CXMyUPfwnqRcqci5ZqU-QEg3kI4AQ_HZXQ3VkQIqFWKXtKW4WaBqEXJ-9LTCpQePHGfTBKQJjYtL0V3Z1H94RYTSXI5-PMPR8FA2fEW55JQ4QWz_zum1TbFRrDLVr2GVkYhZMA5aphBaBqd9cM9JuCRtWtNSfLDvecTepeFb6H223acNJGB2c-f1N8vOV1AKvJPxYY_pjYvwh4RoHznDlszTPvFB6LFwWtqutXxKiwLv3b_9Xt9wSKXon86zgbyXzGBQJkOpW0_HMwK7yNz6C5BcwU1lsMeF505nzXDq28eiY3IoQzG2PJisO1eXf2-q2t6LomM___9IL8XeOyrd5JVt077DA1rH4b8U-qGKx29GWcBAMZpehnaPVH5bAdr2uQWhbzPHklcvI0fTxzzOJRpPCzg4PvVjxEGpcuKE3R6Qf71KVdnTgS4iTpmy28Ga7NaxCKBfomYxWDRrNKd-_s0GFRIbnuIe6Ri2_BG6PBcsMyzt8hRREwxFLyTw5PMa_Idfc5Z0jFw4RIM6etxqoJk-wwvEDngbg-_DB2DwbVY7a6v26VLemSrhWfJxtp4rVQKuJ9riRTPmzOT1D2YKRvHGTjz_MgpDgqIhQH5O6Y81Z-6JEp5b9noc-eVUUxlpJYB1U1JgxDTJTQ5lv-KaTkFC8fSRA&isca=1'
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form6")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44b3ae40e466bcc342195d6af15b60fbcae-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F6.pdf?jk=AFshE3XIzMjyBtKsUxzsg3fpPOx82OmLvoXl-arz3pdRm5zqSjSjTpKG9BmwRBpRGszFebzMOOnHFlRbJVoVmrDb6eUOFsK3xA_Pa5a2RokrdA92OU0-PopSPmMugFUyleiAyaYn9OVsHDb3AM8KfVu-danvLX4FZhbkmc-H_ZdBe-R0zK6u4gkeQXJYENlb8s3KfWH3JfLPpBjzJIOQhYvqZC3ouK1znTeFHY5vaYtOtk3m1ZQG7cF0vApJaYBpp65k5hLfTstH00D9h7FZUFo7gdQefCXS46x6SvdTRXgVArtJ0nEAcwzUTUKUzVhHCgo7spjfIiaarN8NUCSJgVGBSAoDtyO8tM-7U9iyZMNtYefkp0WKjVNQSl33agBSofmSuKe75RrsKpnGV5AHCZI0N0yVadeuHGUgW7EUxc-LNqE0phECyRYd0Kz9PigQuWRsc0gy_3ZE9EIis4doJXwZJF6HJa2CYJm8nUQJLdpyMO-xT9DaUYfbIDFRHcKgqKYBZdGMTxPdDQHm669JIGptfigNRFh50SqYdrPYmutNd8CCA8DKJlPXqrpp_YuxRbB8jyoI8TP-5bC6JbGIDnP2LxTVVi3TqAvXZcEa1pLD38CiewAAbqSy-wbkjBm_j1iSV28Bsn_TzveOe-eQvE9tx8Yfhy4AyuES4FIRllQlwg58S9ePVsFBThbJY1OigGmIUOsOGxBk0zrLUeGKhZR2XrLoZyLt5H_fTr7cC73W2BdcDG0qhHTcYJ7sOyfFFhgGXEkNJtXEbc6eBwsRAECMX91CuxVLT_PdJQLQVvaswPbGwQ_T5VHTD5a1DuwB9kbguPJIIcf0pcLSEjQsRYZ2FqmxGFNMV-DMRAidBZ1GOlEqZ7qM5bWULRwLkPXCyNiwz9tOb2Q4Dzoww4fo-tTeA7bb9SjiYcKHISxQd_5O5Asr3k7VHOEEKRnuZdNwWCxgkrMQ961hxXr_ZorfMblfzBp__PMMBD9as_83pKvlZWw1LcChynbQM0lanpn6sn1be4v9bJZb-VUfSWM4IX7EUOGma9Bu25Y_UoSirSUEuPD9mr5lVqe9rmyvL659cNR70H7PxYk_gT0aqfCDOAuJPVq1JBUA2e0CSNcKeU3sZwXL-bhA6A-W7FUwsJwvL36zXMi8tNuVE-BHqz49DDH0dYXPR-RXZkCd0hnKssKdTmrufjyKabFhsjxQhyo-exqFZrN4W2dR2g&isca=1'
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form7")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44bf0ae3373730578053bc8fb964aa5eb1a-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F7.pdf?jk=AFshE3VHh3sMLwROIPaHprz5bxNnfB3qWIg_7HM3JjmYtRj2Aka2Hv-AL6p8QX72ltAOhxNHAI5N0DgxG81jt7EaQIHot6jNooKiGFWVDQFjMpnNzhqrVckknCKuMEpmg4JTmT0vAGZEKYG5SNr6udcRNcquwFsPRmu-uznA3QxZVEBQ3SBo1aGoDT0PE_9-6Si9Hlo7VGySFiUa7TaSud82IM-NQLqOQ3wVimJQ4RxcBMeQLVprE_C2ds5gz6MZthRhlgqJuBVthBFyoBkpd5EH8Xt4hDSVUvdig_zZWRz6MYuaApBdHqAr05GBvtBo_zdRZ4NSYeOi9-R_gc2GBLVck9bJjV4oYJLOgumARJoWywWFkLYnl-HtnO1TkSgqlRdSoyBnobXD1kC3GJbKiIhWINgOy8DAvq0_GZ_IMpCGeaJtz1C0uuwj9ui7BfwBFtL1H-NNfX2Hgd5g8GhaU4pYrQENFtClr4Qa-FzHltwtNkV5N3fqidulOSstbEGOLd365Xyf2pkQtRuTkXcFIcDw7mvyFSW33FKRSck8HL1Qo_9HUHi-M5gtsjPmBh4yEuXnzdWAmLjKJfr02VC2MobWNINCe7MIohK6HLc05A_UDI-TIJatVKJVXC6uMF5wE7Uzfpw4wFQVYf1L3XQ2sXRbeD2Mo_tmvGuOrSZlh_tLlrqhuZB8iM3C62eIS2fDMlZ5dWbavjHsaZEPgVoPEGMqEIsiZO4_gEKS0IyPOIE5RarR_XhVYmP5JlEmTvsqlB4ZXXTcvnpY6L_LsQaP5uONgtSXxKN4uTPDBrdiV8XzrnbDwhVvZtcYdJAdzROe-uA-b2QkPFozRdCorkUFkEw6ifyPX5zZI5iK2X-KCkc2kLW27W93GaCd6afhDxCB2HtzdV9goao5vZKSBNZBYGyDL9R1PrZNLinXurdet2w4oqADEfFv4BfU3U_AQCS5k-nucrAZNQIrB6xFJG6BA086Cd2BVZZWjdpJaCVLbeuqqGXx4wXx59tUhACSZXpUm40tCsgVb5EOqnPnEoLHGVpAkajcE8UlHA_T6KJiTN4GIPsSPXI39yyaiA97fiyI3Nph0s8KYC336HtN0sk_piUmLdXxxRB0WfabSBkjaEULA3W_OjeHvYQzEwTYgZC_SsfVhkmThf1ZbNerLnYGexs6yxh66_uc2hLy4JbuQ9Hs80RETQ465YBDJcvpC5XQ-nDHypjPQDWo3g&isca=1'
                });
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form8")}</Text>
              <CustomButton
                onPress={()=>{
                  navigation.navigate("PDFPreviewScreen",{
                    url:'https://00f74ba44bae72e745ffba76e7a5e029d356a337ac-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F8.pdf?jk=AFshE3Vd5RBn9YHeIawXRVWQbw4xGGtsMQYhwB1yooDjOG_3f2o3LIS5bwaNFIV5vxZT6GAPk4nKudoRU4EvgS1lhIYfa3eejFhmCfX67yoYNDe9eujy0AmIHfGjrYEMjd11rM_AZS1qtmyFqqErN6D3LYgT4xtI-ErAlom9Qmz1zG5u1IUinQdpeXTQiKN0NOXGkBYelDgh5fLWqPi21OBpW6dExQGhm9uimN7G3oTZVLk85ki7HAwaNFCNGflfBI9QO5-DQ23I9fHgyKh2nNrecCQ_lXh7zq9dEUE8R_afdHvngOjYt2tyvvBoLcLzKLW2gZqDLWIleMm-K2nKsrjzlv2CQ11vV2lowMb2jZ2boH8cnKcJZUFOZXfC_X3j3tmcLt0batlUOP-6cfX5WVUagf1kCmGsxnYItwWK-FxlNdheI5t4rHpDtUA7a0Zbwr1DBy0WkgjVKlwYHoN3lmMGwlkPdc5eDXcbHEZ7f4DO2MwGgiKlXIPBnPMysthS6VfitdCrqQsADyBZIjLqy4NlPlZPiVhYtChhvrIDFb3Vw1gSzJ69AB7FWVGLDjdyrVs-Dnm1jO3gqabSE0QvcxALbVlswZXsAmVrO4B6UMB2Eiy3J4n_03Am3KbhTCIUhw-4zCJCOxYq2UsbgTP-7XiUi0v8-bS71akbFt51j7fkhlJJcgXN80qyhTXVrbpfo15YKGzIl-eWhrSBl-mybkOEbeC05jSKJVxleH6by19kOkYUARSPgQmQiruvp86IEMFOO3AC_bkKw1XXjaih9PtKxfrsnajTi7V9xa-ewjWPOYEGdwW-UL-2AH9-RpIZXkgfiLOm2B06aE76BGwCwxdxOHGIl__EmOBkitJ2Cv10h4YCYbDCTbx0e2CeT5jBQgeRsgXvJUBvzMgJyRftVJN9O_WhtKnTmJMX0WMbDjusvz5KLIO0BmyUksyJ4G-spsmtu_CnjitpMbmFBxKd8GUnmVMj3vhUXd9-ddDKyWtXR8vIMnYSr2wT4f_-Fn0TjAwgc05j87hb_DsUAL3I3x-hQ24km7cISy8dO2Gb5tj1B_fTtWLocLdqd8eTgOfl60pGLoRVNZ_I5RnELe3PwfENoECTPEwmRpXO6egxa_xPMHeQl6UL8qGxjuu67MSEIWhgM8Ag6uOVgzbmnvumxtye4zAz0GAEzkV1VAF75PLW8xCyjGRlnpWxcuonkDTqs8gwiiqtkJaCcw&isca=1'
                  })
                }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form9")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form10")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form11")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>


              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form12")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("")
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form13")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form14")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>


              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form15")}</Text>
              <CustomButton
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>

              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form16")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:''
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form17")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:''
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form18")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:''
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>
              <View style = { styles.fileContent}>
              <Text style={{ margin: 10, fontSize:16 , fontWeight: '800'  , color :"white"}  }>
                {t("Form19")}</Text>
              <CustomButton
              onPress={()=>{
                navigation.navigate("PDFPreviewScreen",{
                  url:'https://00f74ba44b6e71bf97c8b68d3c63782ff5dac5363e-apidata.googleusercontent.com/download/storage/v1/b/ratifi-document-storage/o/villages-map-pdf%2Fstatic-forms%2F19.pdf?jk=AFshE3XH79v0gsyAbuPZNVoweZMIyJ0asdgV0LHSTwyAmnGsAosj120xSCyVf1cACHjtO-n0GJWzW3uT4dk1H7MmNZBKHi3FR1s2vFHoWZDPZ0EYs-57mxm2AG4jEMeScFbBfzpumidOooxEUXqDQHIpUNnjYtwbvEw8dsXZr_e5Beg4Y943b_uSwAaQFCa-KAGZ3LbQSdN3T8rFe5Bqy8fC0A-3-6mZn5RT4b76s6ssPokrDTuwpv7f2NJLHb-Zf5r0TgX3jFvIHL4NNHNt3LPrx8SbeTw0QqukI7JG7VV_0F6kWhyvZoWtPcsOmK6QQKokXsna3asZ040BMnPx0Um9eMkORPi7zMQeXVXNHiFFsHbr37Oih_uqHkvl9VKDJtu-Zp5uBKVSdgsefmawsP3QL0mNidgzoYG5HzveF5bd2WQTJGfy2JTjwKxxWZ3EL2W07iCDAMIXiP36bUbdjRff9VrZg-wN5vvs8tMJkBNoFBdgZqykYqvAdWl8r_6Kg7Q5Ry1exbcyK22KzJJmzjtXVDUIYz-z5b5OitC7fwbRVmmpuMfb-e-eghPB5PVvjiE6usPtMRgmE97WRj3p-nqaHsK0hjULMUyglN51Z_b2qyl1YvGSIxxhf96hGKfSKv_AsoiY1fYUl_xEl-cyNhFfMAJnF_Se_HBUkyLRwz4ljaW4dFAe08HLnGWZcidT12HQJCpg0tJEwGjCDpPbpS1IUiCwjkMjJKB-bk4_V7hjlAjNblc7uwV-Wi3i52HuWwJ-jiDyEZ5xV2H5ayhLzaxjZmbCE0YQymmFdYBvd379QkRVy_c_gsfwySp9BsIoGahIylEcuxtfdd_Tvxy4_fSy8y-ZdJ-DHP-o6rPJIhXlFWtJQSOnaUhHqD-VCAzKqKxh2mfXZFLZbH8HQUvs1v1PvgyQafKpNNUH97C-Cdp0KSfN_ECS_hI8BZ-BXbqJzWclNkhM2NB02NLkV3CLsqiybHB5NtFK-81y1Vt1-5WirZI1wF-hE4pyycE_9e9-3974AVR3xMmME_if_-DJVCUo7xUMtIqL4nsvMan97OR0VA18Re7beJdTJlA4T72YGozI-q-e5RlNgWurjbgHjJUnS9qzcpnQgymrULioSP7IstOj5APdvmIMZaEI_9pLhqEOAfnc6OY6SHB3oVGN8rMD-0v6AIWNVkR31LWaJxcemutL11SR_--Q9VA4zZ72dHwBE3pRqGFRCU0&isca=1'
                })
              }}
                button={{ width: 200 ,  fontWeight: '800'  ,marginLeft: 10 }}>
                {t('View Document')}
              </CustomButton>
              </View>


            </View>
            
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

  fileSection:{ 
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
  flexDirection:"row",
  height: 45, 
  
  paddingLeft:"10%"
 }, 
 subheaderTextnew: { 
  fontSize: 16,
  // textDecorationLine:'underline',
  textDecorationStyle:'dotted',
  color: '#FFFFFF', 
  fontWeight : "400",
  textAlign:'center'
 }, 
 file:{ 
  fontSize: 18,
  fontFamily: 'Roboto-Medium',
  
 }, 
 marginview: {
   marginTop: "20%",
   paddingHorizontal:'10%',
   alignSelf:'center'
 }, 
 newbuttonstyle :{
   height: 30, 
   width: 400, 
   marginLeft:0 , 
   
   fontSize: 12,
    color: '#FFFFFF',
 }
 
});

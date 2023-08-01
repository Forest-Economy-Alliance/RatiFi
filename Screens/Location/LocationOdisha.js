/* eslint-disable prettier/prettier */
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView,Pressable,Modal
} from 'react-native';
import { BackHandler } from 'react-native';

import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import { object, string } from 'yup';
import CustomError from '../../components/CustomError';
import CustomNotification from '../../components/CustomNotification'
import { updateUserInfoAction } from '../../redux-store/actions/auth';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { G } from 'react-native-svg';
const BG_IMG_PATH = require('../../assets/images/background.png');
const LocationScreenOdisha = ({ navigation }) => {


    const [editProfileMode, setEditProfileMode] = useState(false);
    const { namet, panchayat, tehsil, statet, district, postLevel, authLevel } = useSelector(state => state.entities.auth.userInfo?.profile);
    // console.log(authLevel=="एसडीएलसी");
    const route = useRoute();

 
    React.useEffect(() => {
        console.log(route.params)
        if (route?.params?.editProfile === true) {
            setEditProfileMode(true);
        }



    }, [route?.params?.editProfile])

    const {language} = useSelector(state => state.entities.appUtil.appUtil);
 
    const dispatch = useDispatch();
    const stateName = useSelector(state => state.entities.appUtil.appUtil.name);
    
    
    const state = {
        state: '',
        district: '',
        tehsil: '',
        panchayat: '',
        village: '',
    };

    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [errorVisible, setErrorVisible] = useState(false);
    const [panchayatInfoShow,setPanchayatInfoShow] = useState(false);

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setCurrentLanguage(value))
            .catch(err => console.log(err));
    };

  
    const onNext = (values, formikActions) => {
        setPanchayatInfoShow(false)

        formikActions.setSubmitting(false);
        // navigation.navigate('FRCHome');
        

        dispatch(
            updateUserInfoAction(
                {
                    state: formik.values.state,
                    district: formik.values.district,
                    tehsil: formik.values.tehsil,
                    panchayat: formik.values.panchayat,
                    village: formik.values.village,
                },
                args => {
                    if (args) {

                        if (editProfileMode) {
                            navigation.navigate("DownloadPDF")
                        }
                        else {// navigation.navigate('RoleInformation');

                            //screen code 4 , means location information set
                            dispatch({ type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 4 });

                            navigation.navigate("Gender")
                        }
                    }
                },
            ),
        );





    };

    const locSchema = object().shape({
        state: string().required(t('State is Required')),
        district: string().required(t('District is Required')),
        tehsil: string().required(t('Tehsil is Required')),
        panchayat: string().required(t('Panchayat is Required')),
        village: string().required(t('Village is Required')),
    });

    const formik = useFormik({
        initialValues: state,
        validationSchema: locSchema,
        onSubmit: onNext,
    });
 



 // NO NEED TO FILL VILLAGES WITH TRANSALTION
 // IN BELOW MAPPING IS THERE, FILL OUT THAT
    const states = [
        {
            label: t('Odisha'),
            value: '1',
            Districts: [
                {
                    label: t('Malkangiri'),
                    value: '1',
                    Tehsils: [
                        {
                            label: t('Khairaput'),
                            value: '1',
                            Panchayats: [
                                {
                                    label: t('ANDRAHAL'),
                                    value: '1',
                                },
                                {
                                    label: t('BADODURAL'),
                                    value: '2',
                                },
                                {
                                    label: t('GOVINDAPALLI'),
                                    value: '3',
                                },
                                {
                                    label: t('KADAMGUDA'),
                                    value: '4'
                                },
                                {
                                    label: t('Khairaput'),
                                    value: '5'
                                },
                                {
                                    label: t('MADKAPADAR'),
                                    value: '6'
                                },
                                {
                                    label: t('MUDULIPODA'),
                                    value: '7'
                                },
                                {
                                    label: t('PODAGHAT'),
                                    value: '9'
                                },
                                {
                                    label: t('RASBEDA'),
                                    value: '10'
                                },
                               

                            ],
                            Villages: [
                                // Invalid
                                {
                                    label: t('Bano'),
                                    value: '1',
                                },
                                {
                                    label: t('Samdega'),
                                    value: '1'
                                },
                                {
                                    label: t('Karkatta'),
                                    value: '4'
                                },
                                {
                                    label: t('Bintuka'),
                                    value: '4'
                                },
                                {
                                    label: t('Jamursoya'),
                                    value: '4'
                                },
                                {
                                    label: t('Kewetang'),
                                    value: '4'
                                },
                                {
                                    label: t('Turyu'),
                                    value: '4'
                                },
                                {
                                    label: t('Pangur'),
                                    value: '4'
                                },
                                {
                                    label: t('Jarakel'),
                                    value: '5'
                                },
                                {
                                    label: t('Baromda'),
                                    value: '5'
                                }, {
                                    label: t('Jambera'),
                                    value: '5'
                                }, {
                                    label: t('Barbera'),
                                    value: '5'
                                }, {
                                    label: t('Bumbalda'),
                                    value: '6'
                                }, {
                                    label: t('Jamang'),
                                    value: '6'
                                }, {
                                    label: t('Pabura'),
                                    value: '6'
                                },
                                {
                                    label: t('Soy'),
                                    value: '7'
                                }, {
                                    label: t('Barbera'),
                                    value: '7'
                                }, {
                                    label: t('Ella'),
                                    value: '7'
                                }, {
                                    label: t('Kauwajor'),
                                    value: '7'
                                }, {
                                    label: t('Mahabuang'),
                                    value: '7'
                                }, {
                                    label: t('Sijang'),
                                    value: '7'
                                },
                                {
                                    label: t('Unikel'),
                                    value: '7'
                                }, {
                                    label: t('Bujaga'),
                                    value: '3'
                                }, {
                                    label: t('Kuruchdega'),
                                    value: '3'
                                },
                                {
                                    label: t('Chhotketunga'),
                                    value: '3'
                                }, {
                                    label: t('Jaldega'),
                                    value: '3'
                                },
                                {
                                    label: t('Virta'),
                                    value: '3'
                                },
                                {
                                    label: t('Bandu'),
                                    value: '2'
                                }, {
                                    label: t('Boroseta'),
                                    value: '2'
                                }, {
                                    label: t('Jamtoli'),
                                    value: '2'
                                }, {
                                    label: t('Ketka'),
                                    value: '2'
                                },
                                {
                                    label: t('Simhatu'),
                                    value: '2'
                                },
                                {
                                    label: t('Beraergi'),
                                    value: '9'
                                },
                                {
                                    label: t('Buruergi'),
                                    value: '9'
                                },
                                {
                                    label: t('Olhan'),
                                    value: '9'
                                },
                                {
                                    label: t('Sumingbera'),
                                    value: '9'
                                },
                                {
                                    label: t('Vinjhamarcha'),
                                    value: '9'
                                },
                                {
                                    label: t('Rabbai'),
                                    value: '9'
                                }, {
                                    label: t('Sutriuli'),
                                    value: '9'
                                }, {
                                    label: t('Helgara'),
                                    value: '10'
                                },
                                {
                                    label: t('Banki'),
                                    value: '10'
                                },
                                {
                                    label: t('Kanaroya'),
                                    value: '10'
                                },
                                {
                                    label: t('Pado'),
                                    value: '10'
                                }, {
                                    label: t('Badkaduel'),
                                    value: '11'
                                }, {
                                    label: t('Barerpa'),
                                    value: '11'
                                }, {
                                    label: t('Chhotkaduel'),
                                    value: '11'
                                }, {
                                    label: t('Kudrum'),
                                    value: '11'
                                }, {
                                    label: t('Lamgarh'),
                                    value: '11'
                                }, {
                                    label: t('Maimsora'),
                                    value: '11'
                                }, {
                                    label: t('Navagaon'),
                                    value: '11'
                                }
                                , {
                                    label: t('Chaklabasa'),
                                    value: '12'
                                },
                                , {
                                    label: t('Chaklabasa'),
                                    value: '12'
                                }, {
                                    label: t('Sora'),
                                    value: '12'
                                }, {
                                    label: t('Buruhonjar'),
                                    value: '12'
                                }, {
                                    label: t('Chorbandu'),
                                    value: '12'
                                }, {
                                    label: t('Sotasoya'),
                                    value: '13'
                                }, {
                                    label: t('Sahubera'),
                                    value: '14'
                                },
                                {
                                    label: t('Jamtai'),
                                    value: '15'
                                }, {
                                    label: t('Bokamara'),
                                    value: '14'
                                }, {
                                    label: t('Hurda'),
                                    value: '15'
                                }, {
                                    label: t('Kohipath'),
                                    value: '15'
                                }, {
                                    label: t('Kewengutu'),
                                    value: '15'
                                }, {
                                    label: t('Jorobari'),
                                    value: '15'
                                }, {
                                    label: t('Jorponda'),
                                    value: '15'
                                }, {
                                    label: t('Birhuli'),
                                    value: '16'
                                },
                                {
                                    label: t('Kanta'),
                                    value: '16'
                                },
                                {
                                    label: t('Marani'),
                                    value: '16'
                                },
                                {
                                    label: t('Raikera'),
                                    value: '16'
                                },
                                {
                                    label: t('Tembro'),
                                    value: '16'
                                },

                                {
                                    label: t('Genmer'),
                                    value: '17'
                                },

                                {
                                    label: t('Chandsai'),
                                    value: '17'
                                },
                                {
                                    label: t('Gerda'),
                                    value: '17'
                                },
                                {
                                    label: t('Khijurbahar'),
                                    value: '17'
                                }, {
                                    label: t('Toniya'),
                                    value: '17'
                                },


                            ],
                        },
                        {
                            label: t('CHITRAKONDA'),
                            value: '2',
                            Panchayats: [
                                {
                                    label: t('BADAPADAR'),
                                    value: '18'
                                },
                                {
                                    label: t('CHITRAKONDA'),
                                    value: '19'
                                },
                                // {
                                //     label: t('Kharwagarha'),
                                //     value: '20'
                                // },
                                {
                                    label: t('JODAMBA'),
                                    value: '21'
                                },
                                //  {
                                //     label: t('Lamboi'),
                                //     value: '22'
                                // }
                                , {
                                    label: t('NUAGUDA'),
                                    value: '23'
                                }, {
                                    label: t('Tingina'),
                                    value: '24'
                                }, {
                                    label: t('Orga'),
                                    value: '25'
                                }, {
                                    label: t('Parba'),
                                    value: '26'
                                }, {
                                    label: t('Tati'),
                                    value: '27'
                                },
                            ],
                            Villages: [
                                // Invalid
                                {
                                    label: t('Jamtoli'),
                                    value: '18'
                                },
                                {
                                    label: t('Pahantoli'),
                                    value: '18'
                                }, {
                                    label: t('Mahomdega'),
                                    value: '18'
                                },
                                {
                                    label: t('Sawanjara'),
                                    value: '18'
                                },
                                {
                                    label: t('Ramjari'),
                                    value: '19'
                                }, {
                                    label: t('Minjurgarha'),
                                    value: '19'
                                },
                                {
                                    label: t('Minjurgarha'),
                                    value: '19'
                                }, {
                                    label: t('Kharwagarha'),
                                    value: '20'
                                }, {
                                    label: t('Gattigarha'),
                                    value: '20'
                                }, {
                                    label: t('Kinirkela'),
                                    value: '20'
                                }, {
                                    label: t('Patiamba'),
                                    value: '20'
                                }, {
                                    label: t('Dumarbera'),
                                    value: '21'
                                }, {
                                    label: t('Gangutoli'),
                                    value: '21'
                                }, {
                                    label: t('Badkitanger'),
                                    value: '21'
                                }, {
                                    label: t('Konmerla'),
                                    value: '21'
                                }, {
                                    label: t('Kolomdega'),
                                    value: '21'
                                }, {
                                    label: t('Tilaijara'),
                                    value: '22'
                                }, {
                                    label: t('Harrapnai'),
                                    value: '22'
                                }, {
                                    label: t('Karmapani'),
                                    value: '22'
                                }, {
                                    label: t('Bendojara'),
                                    value: '22'
                                }, {
                                    label: t('Lomboi Mahua Toli'),
                                    value: '22'
                                },
                                {
                                    label: t('Basaer'),
                                    value: '22'
                                }, {
                                    label: t('Mama Bhagina'),
                                    value: '22'
                                }, {
                                    label: t('Bhitbuna'),
                                    value: '23',
                                }, {
                                    label: t('Baraibera'),
                                    value: '23'
                                }, {
                                    label: t('Hututuwa'),
                                    value: '23'
                                },
                                {
                                    label: t('Lamdega'),
                                    value: '23'
                                }, {
                                    label: t('Parba lamdega'),
                                    value: '23'
                                }, {
                                    label: t('Dhorhibahar'),
                                    value: '24'
                                }, {
                                    label: t('Tikra'),
                                    value: '24'
                                }, {
                                    label: t('Silinga'),
                                    value: '24'
                                }, {
                                    label: t('Dhelsera'),
                                    value: '25'
                                }, {
                                    label: t('Dhelsera'),
                                    value: '25'
                                }, {
                                    label: t('Orga'),
                                    value: "25"
                                }, {
                                    label: t('Sarubahar'),
                                    value: '25'
                                }, {
                                    label: t('Parba'),
                                    value: '26'
                                }, {
                                    label: t('Dhingurpani'),
                                    value: '26'
                                }, {
                                    label: t('Dhouranhan'),
                                    value: '26'
                                }, {
                                    label: t('Kouwadarha'),
                                    value: '26'
                                }, {
                                    label: t('Lachhanpur'),
                                    value: '26'
                                }, {
                                    label: t('Siharmunda'),
                                    value: '26'
                                }, {
                                    label: t('Sukhajhariya'),
                                    value: '26'
                                }, {
                                    label: t('Mangaspur'),
                                    value: '26'
                                }, {
                                    label: t('Bendosera'),
                                    value: '26'
                                }, {
                                    label: t('Janoda'),
                                    value: '26'
                                }, {
                                    label: t('Jundih'),
                                    value: '26'
                                }, {
                                    label: t('Bhanvarchawa'),
                                    value: '26'
                                }, {
                                    label: t('Tati'),
                                    value: '27'
                                }, {
                                    label: t('Hutubada'),
                                    value: '27'
                                },
                                {
                                    label: t('Turupdega'),
                                    value: '27'
                                },
                                {
                                    label: t('Barbera'),
                                    value: '27'
                                }, {
                                    label: t('Toniya'),
                                    value: '27'
                                },
                            ],
                        },
                        {
                            label: t('KALIMELA'),
                            value: '3',
                            Panchayats: [
                                {
                                    label: t('BHEJANGIWADA'),
                                    value: '28',
                                }, {
                                    label: t('BODIGETTA'),
                                    value: '29'
                                }, {
                                    label: t('CHINTALWADA'),
                                    value: '30'
                                }, {
                                    label: t('CHITRANGAPALLI'),
                                    value: '31'
                                }, {
                                    label: t('GOMPAKUNDA'),
                                    value: '32'
                                }, {
                                    label: t('GUMUKA'),
                                    value: '33'
                                }, {
                                    label: t('kALIMELA'),
                                    value: '34'
                                }, {
                                    label: t('KOIMETLA'),
                                    value: '35'
                                }, {
                                    label: t('KANGURUKUNDA'),
                                    value: '36'
                                }, {
                                    label: t('LUGEL'),
                                    value: '37'
                                }, {
                                    label: t('MAHARAJAPALLI'),
                                    value: '38'
                                
                                }, {
                                    label: t('MALAVARAM'),
                                    value: '39'
                                
                                }, {
                                    label: t('MANYAMKUNDA'),
                                    value: '40'
                                
                                }, {
                                    label: t('NALAGUNTHI'),
                                    value: '41'
                                
                                }, {
                                    label: t('TELERAI'),
                                    value: '42'
                                
                                }, {
                                    label: t('TIGAL'),
                                    value: '43'
                            
                                }, {
                                    label: t('VENKATAPALLAM'),
                                    value: '44'
                                }
                            ],
                            Villages: [
                                {
                                    label: t('Arnamala'),
                                    value: '28',
                                },
                                {
                                    label: t('Bongram'),
                                    value: '28',
                                },
                                {
                                    label: t('Keyondpani'),
                                    value: '28',
                                },
                                {
                                    label: t('Kinbira'),
                                    value: '28'
                                }, {
                                    label: t('Sirikonde Kera'),
                                    value: '28'
                                }, {
                                    label: t('Takba'),
                                    value: '28'
                                }, {
                                    label: t('Shapur'),
                                    value: '29'
                                }, {
                                    label: t('Kombakera'),
                                    value: '29'
                                }, {
                                    label: t('Konjoba'),
                                    value: '29'
                                }, {
                                    label: t('Dumardih'),
                                    value: '30'
                                }, {
                                    label: t('Jurkela'),
                                    value: '30'
                                }, {
                                    label: t('Karamtoli'),
                                    value: '30'
                                }, {
                                    label: t('Larba'),
                                    value: '30'
                                }, {
                                    label: t('Shivnathpur'),
                                    value: '30'

                                }, {
                                    label: t('Tangertoli'),
                                    value: '30'
                                }, {
                                    label: t('Jamtoli'),
                                    value: '31'
                                }, {
                                    label: t('Kunderdega'),
                                    value: '31'
                                }, {
                                    label: t('Bhanwarpahari'),
                                    value: '32'
                                }, {
                                    label: t('Bhanwarpahari'),
                                    value: '32'

                                }, {
                                    label: t('Nawatoli'),
                                    value: '32'
                                }, {
                                    label: t('Saraipani'),
                                    value: '32'

                                }, {
                                    label: t('Sarangapani'),
                                    value: '32'

                                }, {
                                    label: t('Machka'),
                                    value: '32'
                                }, {
                                    label: t('Sundratoli'),
                                    value: '32'
                                }, {
                                    label: t('Barwadih'),
                                    value: '33'

                                }, {
                                    label: t('Ghansilari'),
                                    value: '33'
                                }, {
                                    label: t('Tainsera'),
                                    value: '33'
                                }, {
                                    label: t('Bandarchuwan'),
                                    value: '34'
                                }, {
                                    label: t('Besrajara'),
                                    label: '34'
                                }, {
                                    label: t('Selsoya'),
                                    label: '34'
                                }, {
                                    label: t('Setasoya'),
                                    value: '34'
                                }, {
                                    label: t('Sardhatoli'),
                                    value: '35'
                                }, {
                                    label: t('Jhapla'),
                                    value: '35'
                                }, {
                                    label: t('Sokorla'),
                                    value: '35'
                                }
                                , {
                                    label: t('Tutikel'),
                                    value: '35'
                                },
                                , {
                                    label: t('Eidega'),
                                    value: '36'
                                }, {
                                    label: t('Kudabera'),
                                    value: '36'
                                }, {
                                    label: t('Kalhatoli'),
                                    value: '36'
                                }, {
                                    label: t('Pogloya'),
                                    value: '36'
                                }, {
                                    label: t('Ramjari'),
                                    value: '36'
                                }, {
                                    label: t('Barasloya'),
                                    value: '37'
                                }, {
                                    label: t('Barketunga'),
                                    value: '37'
                                }, {
                                    label: t('Kulasoya'),
                                    value: '37'
                                }
                                , {
                                    label: t('Sijang'),
                                    value: '37'
                                }, {
                                    label: t('Kombakra'),
                                    value: '38'
                                }, {
                                    label: t('Lachragarh'),
                                    value: '38'
                                }
                            ],
                        },
                    ],
                },
            ],
        },
    ];












    const panchayatToVillageMapping = {

        // KALIMELA

        [t('BHEJANGIWADA')]: [
            {
                label: t('Arnamala'),
                value: '1',
            },

            {
                label: t('Badaliguda'),
                value: '1'
            },
            {
                label: t('Bapanpali'),
                value: '1'
            },
            {
                label: t('Kurukundi'),
                value: '1'
            },
            
        ],
        [t('BODIGETTA')]: [
            {
                label: t('Badigata'),
                value: '4'
            },
            {
                label: t('Kurubu'),
                value: '4'
            },
            {
                label: t('Kutmanpali'),
                value: '4'
            },
            {
                label: t('Marigata'),
                value: '4'
            },
            {
                label: t('Tekagura'),
                value: '4'
            },
        ],
        [t('CHINTALWADA')]: [
            {
                label: t('CHINTALWADA'),
                value: '5'
            },
            {
                label: t('Karkatpalli'),
                value: '5'
            }, {
                label: t('Kosalkunda'),
                value: '5'
            }, {
                label: t('Pitakonda'),
                value: '5'
            }, {
                label: t('Sindhiguda'),
                value: '6'
            },
        ],
        [t('CHITRANGAPALLI')]: [{
            label: t('Chitrangpali'),
            value: '6'
        },

        {
            label: t('Doraguda (MPV-9)'),
            value: '6'
        }, {
            label: t('Gumukaguda'),
            value: '6'
        },
        {
            label: t('Mudakhal'),
            value: '7'
        }, {
            label: t('Odelguda'),
            value: '7'
        }, {
            label: t('Supali'),
            value: '7'
        }, {
            label: t('Usakapali'),
            value: '7'
        }
        ],

        [t('GOMPAKUNDA')]: [
            {
                label: t('Gagarmetla'),
                value: '7'
            }, {
                label: t('Barbera'),
                value: '7'
            },
            {
                label: t('Gampakonda'),
                value: '7'
            },
            {
                label: t('Iralgonda'),
                value: '7'
            }, {
                label: t('Kanheiguda'),
                value: '7'
            }, 
        ],
        [t('GUMUKA')]: [{
            label: t('GUMUKA'),
            value: '8'
        }, {
            label: t('Pedakonda'),
            value: '8'
        }],

        [t('kALIMELA')]: [
            {
                label: t('Ambaguda'),
                value: '2'
            }, {
                label: t('kALIMELA'),
                value: '2'
            }, {
                label: t('Kotaguda'),
                value: '2'
            },
        ],
        [t('KANGURUKUNDA')]: [
            {
                label: t('Kangurkonda'),
                value: '2'
            }, {
                label: t('Patakonda'),
                value: '2'
            }, {
                label: t('Salamarikonda'),
                value: '2'
            }
        ],
        [t('KOIMETLA')]: [{
            label: t('KOIMETLA'),
            value: '9'
        },
        {
            label: t('Kowasiguda'),
            value: '9'
        },
        {
            label: t('Maranpalli'),
            value: '9'
        }
       ],
        [t('LUGEL')]: [{
            label: t('Krushnanagar'),
            value: '10'
        },
        {
            label: t('LUGEL'),
            value: '10'
        },
        {
            label: t('Phulkonkonda'),
            value: '10'
        }],

        [t('MAHARAJAPALLI')]: [, {
            label: t('Biliguda'),
            value: '12'
        }, {
                label: t('Koikonda'),
                value: '12'
            }, {
                label: t('Maharajpalli'),
                value: '12'
            }, {
                label: t('MPV -81'),
                value: '12'
            }],
        [t('MALAVARAM')]: [
            
            {
            label: t('Anantapalli'),
            value: '13'
        },
        {
            label: t('Berenpalli'),
            value: '13'
       
        }
        ,
        {
            label: t('Dopenkonda'),
            value: '13'
       
        },
        {
            label: t('Malabharam'),
            value: '13'
       
        },
        {
            label: t('Nilakota'),
            value: '13'
       
        },
        {
            label: t('Tendraspaly'),
            value: '13'
       
        }
    ],
        [t('MANYAMKUNDA')]: [{
            label: t('Billigura'),
            value: '14'
        },
        {
            label: t('Doganda'),
            value: '14'
        },
        {
            label: t('Gunthabeda'),
            value: '14'
        },
        {
            label: t('Kantabanjiguda'),
            value: '14'
        },
        {
            label: t('Mangipalli'),
            value: '14'
        },
        {
            label: t('Manyamkonda'),
            value: '14'
        },
        {
            label: t('Pendikonda'),
            value: '14'
        },
        {
            label: t('Penkurai'),
            value: '14'
        },
        {
            label: t('Poluru'),
            value: '14'
        },
        {
            label: t('Potteru'),
            value: '14'
        },
        {
            label: t('Ramachandrapur'),
            value: '14'
        },
        {
            label: t('Sailuru'),
            value: '14'
        },
        {
            label: t('Singrajkota'),
            value: '14'
        },
        {
            label: t('Togurkota'),
            value: '14'
        },
        ],
        [t('NALAGUNTHI')]: [{
            label: t('Idikonda'),
            value: '15'
        }, {
            label: t('Nalagunti'),
            value: '15'
        }],
        [t('TELERAI')]: [{
            label: t('Ambapadar'),
            value: '16'
        },
        {
            label: t('Badapadar'),
            value: '16'
        },
        {
            label: t('Dayaltungi'),
            value: '16'
        },
        {
            label: t('Jabanpalli'),
            value: '16'
        },
        {
            label: t('Jakalgandi'),
            value: '16'
        },
        {
            label: t('Kandalgura'),
            value: '16'
        },
        {
            label: t('Oramgura'),
            value: '16'
        },
        {
            label: t('Pedawara'),
            value: '16'
        },
        {
            label: t('Singabaram'),
            value: '16'
        
        },
        {
            label: t('Sudhakunta'),
            value: '16'
        },
        {
            label: t('TELERAI'),
            value: '16'
        }
    
    
    ],
        [t('TIGAL')]: [
            {
                label: t('Tamanpalli'),
                value: '17'
            },
            {
                label: t('TIGAL'),
                value: '17'
            }
        ],
        [t('VENKATAPALLAM')]: [{
            label: t('Bhenkatapalli'),
            value: '1'
        }, {
            label: t('Koyaguda'),
            value: '2'
        }, {
            label: t('Mangipalli'),
            value: '3'
        }
        ],









        // CHITRAKONDA

        [t('BADAPADAR')]: [
            {
                label: t('Badpader'),
                value: '28',
            },
            {
                label: t('Banguru'),
                value: '28',
            },
            {
                label: t('Bangurupoda'),
                value: '28',
            },
            {
                label: t('Hatipadar'),
                value: '28'
            }, {
                label: t('Iswarguda'),
                value: '28'
            }, {
                label: t('Janbai'),
                value: '28'
            },
             {
                label: t('Kamarguda'),
                value: '28'
            },
             {
                label: t('Khilaput'),
                value: '28'
            },
             {
                label: t('lambasingi'),
                value: '28'
            },
             {
                label: t('Limalori'),
                value: '28'
            },
             {
                label: t('Metaguda'),
                value: '28'
            },
             {
                label: t('Pabiliguda'),
                value: '28'
            },
             {
                label: t('Padmagiri'),
                value: '28'
            },
             {
                label: t('Paneshgandhi'),
                value: '28'
            },
             {
                label: t('Phulagandhi'),
                value: '28'
            },
             {
                label: t('Rekhapali'),
                value: '28'
            },
             {
                label: t('Sariapali'),
                value: '28'
            },
        ],

        [t('CHITRAKONDA')]: [{
            label: t('Chitrakonda (CT)'),
            value: '29'
        }, {
            label: t('Rajal konda'),
            value: '29'
        }
        ],


        [t('JODAMBA')]: [{
            label: t('BADATALPADAR'),
            value: '30'
        }, {
            label: t('Bhitardarlabeda'),
            value: '30'
        }, {
            label: t('Bihanagudi'),
            value: '30'
        }, {
            label: t('Darlabeda'),
            value: '30'
        }, {
            label: t('Doraguda'),
            value: '30'

        }, {
            label: t('GAJALGUMI'),
            value: '30'
        }, {
            label: t('Gopinathguda'),
            value: '30'
        },
        {
            label: t('Jajpalama'),
            value: '30'
        },
        {
            label: t('jampurulu'),
            value: '30'
        },
        {
            label: t('Janturai'),
            value: '30'
        },
        {
            label: t('Jodamba'),
            value: '30'
        },
        {
            label: t('KARANJAGUDA'),
            value: '30'
        },
        {
            label: t('Khajuriguda'),
            value: '30'
        },
        {
            label: t('Kumbhipatiaguda'),
            value: '30'
        },
        {
            label: t('Kunturpader'),
            value: '30'
        },
        {
            label: t('Kusumput'),
            value: '30'
        },
        {
            label: t('Kutunipadar'),
            value: '30'
        },{
            label:t('ladiguda'),
            value:'30'
        }
        ,{
            label:t('Matikhala'),
            value:'30'
        }
        ,{
            label:t('Nilaram'),
            value:'30'
        }
        ,{
            label:t('Nuaguda'),
            value:'30'
        }
        ,{
            label:t('PALASPADAR'),
            value:'30'
        }
        ,{
            label:t('Panapader'),
            value:'30'
        }
        ,{
            label:t('Panaspadar'),
            value:'30'
        }
        ,{
            label:t('PODKHAL'),
            value:'30'
        }
        ,{
            label:t('SANTALPADAR'),
            value:'30'
        }
        ,{
            label:t('Similipader'),
            value:'30'
        },{
            label:t('Tarabeda'),
            value:'30'
        }
        ,{
            label:t('Tikarpada'),
            value:'30'
        }
    ],


        [t('NUAGUDA')]: [{
            label: t('Badput'),
            value: '31'
        }, {
            label: t('Ghagadabandha'),
            value: '31'
        },
        {
            label: t('Kalpadar'),
            value: '31'
        }, {
            label: t('Narasingpur'),
            value: '31'
        }, {
            label: t('Nuaguda'),
            value: '31'
        }, {
            label: t('Paliguda'),
            value: '31'
        }, {
            label: t('Purunapani'),
            value: '31'
        }, {
            label: t('Ramaguda'),
            value: '31'
        }, {
            label: t('Rathaguda'),
            value: '31'
        }
    
    
    
    ],

        [t('PANASPUT')]: [{
            label: t('Bezing'),
            value: '32'
        }, {
            label: t('Damagada'),
            value: '32'

        }, {
            label: t('Dangarpadar'),
            value: '32'

        }, {
            label: t('Ghanabeda'),
            value: '32'

        }, {
            label: t('Goilikhari'),
            value: '32'
        }, {
            label: t('Gorasethu'),
            value: '32'
        }, {
            label: t('Handikhal'),
            value: '32'
        }, {
            label: t('jamuguda'),
            value: '32'
        }, {
            label: t('Kumudaguda'),
            value: '32'
        }, {
            label: t('Mukudipali'),
            value: '32'
        }, {
            label: t('Mulaput'),
            value: '32'
        }, {
            label: t('Mundiguma'),
            value: '32'
        }, {
            label: t('Panasput'),
            value: '32'
        }, {
            label: t('Salgamput'),
            value: '32'
        }, {
            label: t('Sindhiput'),
            value: '32'
        }, {
            label: t('Singoi'),
            value: '32'
        }, {
            label: t('Tabalaguda'),
            value: '32'
        },{
            label:t('Tutugumi'),
            value:'32'
        }
    ],


        [t('PAPERMETLA')]: [{
            label: t('Bhimaram'),
            value: '33'

        }, {
            label: t('Bidarpakhana'),
            value: '33'
        }, {
            label: t('Dudhapalli'),
            value: '33'
        },
        {
            label: t('Gandhiguda'),
            value: '33'
        },{
            label: t('Jantapai'),
            value: '33'
        },{
            label: t('Kadalibandha'),
            value: '33'
        },{
            label: t('Katapali'),
            value: '33'
        },{
            label: t('Kuniguda'),
            value: '33'
        },{
            label: t('lauguda'),
            value: '33'
        },{
            label: t('Lochapani'),
            value: '33'
        },{
            label: t('Nuadoliamb'),
            value: '33'
        },{
            label: t('Nuaguda'),
            value: '33'
        },{
            label: t('Papermenta'),
            value: '33'
        },{
            label: t('Purulubandha'),
            value: '33'
        },{
            label: t('Tentaguda'),
            value: '33'
        },{
            label: t('Tentuliguda'),
            value: '33'
        }
    ],



        [t('POPULUR')]: [{
            label: t('Brundamamedi'),
            value: '34'
        }, {
            label: t('Jadaput'),
            value: '34'
        }, {
            label: t('Jalagulur'),
            value: '34'
        }, {
            label: t('Muraliguda'),
            value: '34'
        
        }, {
            label: t('Naguluru'),
            value: '34'
        },
        {
        
            label: t('Papulur'),
            value: '34'
        },
        {
        
            label: t('Petal'),
            value: '34'
        },
        {
        
            label: t('Sanapapulur'),
            value: '34'
        }
    
    ],






        // KHAIRAPUT

        [t('ANDRAHAL')]: [
            {
            label: t('ANDRAHAL'),
            value: '18'
        },
        {
            label: t('Badabel'),
            value: '18'
        }, {
            label: t('Bhaliapadar'),
            value: '18'
        },
        {
            label: t('Dumuripoda'),
            value: '18'
        },
        {
            label: t('Katamaguda'),
            value: '18'
        },
        {
            label: t('Khaliguda'),
            value: '18'
        },
        {
            label: t('Patraput'),
            value: '18'
        }
    
    ],


        [t('BADODURAL')]: [
            {
                label: t('Angel'),
                value: '20'
            },
            {
                label: t('Badadural'),
                value: '19'
            },
            {
                label: t('Baliguda'),
                value: '20'
            }],





    }



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




    const   buttonText = {
        state: t('Fill State'),
        district: t('Fill District'),
        tehsil: t('Fill Tehsil'),
        panchayat: t('Fill Panchayat'),
        village: t('Fill Village'),
        panchayatName:t('Ok')
    };

    useEffect(() => {
        changeLanguage(language);
    }, []);
    // console.log(formik.values);
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
                {
                    editProfileMode?
                 <View style={{marginTop:10, marginBottom:10,marginLeft:10,}} >
            <Pressable onPress={goBack}>
            <Text style={{fontSize:18}}><FontAwesome name="arrow-left" size={18} /> {t('Go Back')}</Text>

            </Pressable>
          </View>:<View></View>
                }
            <ScrollView style={styles.darkness}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView>
                        <View style={styles.header}>
                            <View style={styles.name}>
                                <Text style={styles.nameTxt}>
                                    

                                    {t('Select your location')}
                                </Text>
                            </View>
                            <View style={styles.horizontalLine} />
                        </View>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>{t('State')}</Text>
                        </View>
                        <Dropdown
                            visible={true}
                            data={states}
                            formik={formik}
                            variable={'state'}
                            
                        />
                        {formik.values.state !== '' && (
                            <>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{t('District')}</Text>
                                </View>
                                <Dropdown
                                    visible={true}
                                    data={
                                        states
                                            ?.filter(item => item.label === formik.values.state)
                                            ?.map(item => {
                                                return item.Districts;
                                            })[0]
                                    }
                                    formik={formik}
                                    variable={'district'}
                                />
                            </>
                        )}
                        
                        {formik.values.district !== '' && (
                            <>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{t('Tehsil')}</Text>
                                </View>
                                <Dropdown
                                    visible={true}
                                    data={
                                        states
                                            ?.filter(item => item.label === formik.values.state)
                                            ?.map(item => {
                                                return item.Districts;
                                            })[0]
                                            ?.filter(item => item.label === formik.values.district)
                                            ?.map(item => {
                                                return item.Tehsils;
                                            })[0]
                                    }
                                    formik={formik}
                                    variable={'tehsil'}
                                    
                                />
                            </>
                        )}
                        {formik.values.tehsil !== '' && (
                            <>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{t('Panchayat')}</Text>
                                </View>
                                <Dropdown
                                    visible={true}
                                    data={
                                        states
                                            ?.filter(item => item.label === formik.values.state)
                                            ?.map(item => {
                                                return item.Districts;
                                            })[0]
                                            ?.filter(item => item.label === formik.values.district)
                                            ?.map(item => {
                                                return item.Tehsils;
                                            })[0]
                                            ?.filter(item => item.label === formik.values.tehsil)
                                            ?.map(item => {
                                                return item.Panchayats;
                                            })[0]
                                    }
                                    formik={formik}
                                    variable={'panchayat'}
                                />
                            </>
                        )}
                   
                        
                        {formik.values.panchayat !== '' && (
                            <>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{t('village')}</Text>
                                </View>
                                <Dropdown
                                    customTop={0}
                                    visible={true}
                                    data={
                                        //  FIX FOR बरकाडुएल NOT WORKING FOR MAPPING
                                        formik.values.panchayat === "बरकाडुएल" ? [{
                                            label: t('Badkaduel'),
                                            value: '1'
                                        }, {
                                            label: t('Barerpa'),
                                            value: '2'
                                        }, {
                                            label: t('Chhotkaduel'),
                                            value: '3'
                                        }, {
                                            label: t('Kudrum'),
                                            value: '4'
                                        }, {
                                            label: t('Lamgarh'),
                                            value: '5'
                                        }, {
                                            label: t('Maimsora'),
                                            value: '6'
                                        }, {
                                            label: t('Navagaon'),
                                            value: '7'
                                        }
                                        ] : panchayatToVillageMapping[formik.values.panchayat] ? panchayatToVillageMapping[formik.values.panchayat] : []
                                    }
                                    formik={formik}
                                    variable={'village'}
                                />

                            </>
                        )}
                        <CustomButton
                            text={t('Next')}
                            onPress={() => {
                                if (formik.errors.state || formik.errors.district) {
                                    console.log(formik.errors);
                                    setErrorVisible(true);
                                }
                                formik.handleSubmit();
                                // Send Data to next screen
                            }}
                            style = {
                                {
                                    ...styles.otpBtn,
                                    marginTop: 20
                                }
                            }
                        />                        
                        <CustomError
                            visible={errorVisible}
                            setVisible={setErrorVisible}
                            errorText={t('Please fill all the fields')}
                            errors={formik.errors}
                            buttonText={t('Next')}
                        />
                                <Modal
    //   animationType="fade"
      transparent={true}
      visible={panchayatInfoShow}
       >
      <View style={styles.errorView}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{`${t('you have chosen panchayat')} ${formik.values.panchayat} ${t('chosen')}` }</Text>
          <View style={styles.horizontalLineErr} />
           
              <Pressable
                style={styles.button}
                onPress={() => {
                    if (formik.errors.state || formik.errors.district) {
                        console.log(formik.errors);
                        setErrorVisible(true);
                    }
                    console.log(formik.errors,"formik Errors");
                    formik.handleSubmit();
                }}>
                <Text style={styles.buttonText}>{t('Ok')}</Text>
              </Pressable>
          
        </View>
      </View>
    </Modal>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ImageBackground>
    );
};

export default LocationScreenOdisha;

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
        marginTop: '4%',
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
        marginBottom: '10%',
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
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
      },
      errorCard: {
        width: '80%',
        backgroundColor: '#193E05',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      errorText: {
        fontSize: 34,
        color: '#FF6C00',
        margin: '15%',
      },
      horizontalLineErr: {
        width: '90%',
        borderWidth: 0.5,
        borderColor: '#FF6C00',
        marginBottom: '10%',
      },
      titleErr: {
        marginTop: '10%',
      },
      titleTextErr: {
        fontSize: 22,
        color: '#FFFFFF',
      },
      button: {
        backgroundColor: '#538415',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        marginBottom: '10%',
        padding: '4%',
        paddingHorizontal: '8%',
        borderRadius: 20,
      },
      buttonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 18,
      },
});

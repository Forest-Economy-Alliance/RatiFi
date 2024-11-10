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
  Pressable,
  ScrollView,
  Linking,
  Button,
  ToastAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
// import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {AllVillages} from '../../constants/Villages';
import CustomButton from '../../components/CustomButton';
import Dropdown from '../../components/CustomDropdown';
import {useFormik} from 'formik';
import Loader from '../../components/Loader';
import CustomSignOutPopup from '../../components/CustomSignOutPopup';
import axios from 'axios';
import {BASE_URL, request} from '../../services/APICentral';

import HI from '../../assets/i18n/hi.json';
import {getDeviceHash} from '../../utils/DeviceUtil';
import {logoutHandler} from '../../services/authService';
import {firebase} from '@react-native-firebase/messaging';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  postClaimHandler,
  postIFRClaimHandler,
} from '../../services/claimService';

const BG_IMG_PATH = require('../../assets/images/background.png');
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DownloadPDFScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {language, typeOfClaim} = useSelector(
    state => state.entities.appUtil.appUtil,
  );
  const [imgUrl, setImgUrl] = useState('x');
  const [vData, setVData] = useState([]);
  const vil = useSelector(
    state => state.entities.auth.userInfo.profile.village,
  );
  const [vis, setVis] = useState(false);

  const dispatch = useDispatch();
  const [printDocs, setPrintDocs] = useState([]);
  const [role, setRole] = useState('FRC');
  const [val5, setVal5] = useState('');
  const [village, setVillage] = useState('');
  const [gramSabha, setGramSabha] = useState('');
  const [pressed, setPressed] = useState(false);
  const [villages, setVillages] = useState(AllVillages);
  const {t, i18n} = useTranslation();
  const route = useRoute();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  // const imgUrls = {
  //   ambepadar:
  //     'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324247/Map1_oqd9eg.png',
  //   dayaltung:
  //     'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324264/Map2_iq3jyc.png',
  //   telarai:
  //     'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324257/Map3_h8wi6y.png',
  //   pedawara:
  //     'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324266/Map4_f5zkou.png',
  // };

  const data1 = [
    {
      label: 'AADHAR',
      value: '1',
    },
    {
      label: 'GOVERNMENT ID',
      value: '2',
    },
  ];

  const states = [
    {
      label: t('Jharkhand'),
      value: '1',
      Districts: [
        {
          label: t('Simdega'),
          value: '1',
          Tehsils: [
            {
              label: t('Bano'),
              value: '1',
              Panchayats: [
                {
                  label: t('Bano'),
                  value: '1',
                },
                {
                  label: t('Simhatu'),
                  value: '2',
                },
                {
                  label: t('Konsode'),
                  value: '3',
                },
                {
                  label: t('Bintuka'),
                  value: '4',
                },
                {
                  label: t('Kanarowan'),
                  value: '5',
                },
                {
                  label: t('Pabura'),
                  value: '6',
                },
                {
                  label: t('Soy'),
                  value: '7',
                },
                {
                  label: t('Konsode'),
                  value: '8',
                },
                {
                  label: t('Beraergi'),
                  value: '9',
                },
                {
                  label: t('Banki'),
                  value: '10',
                },
                {
                  label: t('Barkaduel'),
                  value: '11',
                },
                {
                  label: t('Ukauli'),
                  value: '12',
                },
                {
                  label: t('Dumariya'),
                  value: '13',
                },
                {
                  label: t('Sahubera'),
                  value: '14',
                },
                {
                  label: t('Jamtai'),
                  value: '15',
                },
                {
                  label: t('Raikera'),
                  value: '16',
                },
                {
                  label: t('Genmer'),
                  value: '17',
                },
              ],
              Villages: [
                {
                  label: t('Bano'),
                  value: '1',
                },
                {
                  label: t('Samdega'),
                  value: '1',
                },
                {
                  label: t('Karkatta'),
                  value: '4',
                },
                {
                  label: t('Bintuka'),
                  value: '4',
                },
                {
                  label: t('Jamursoya'),
                  value: '4',
                },
                {
                  label: t('Kewetang'),
                  value: '4',
                },
                {
                  label: t('Turyu'),
                  value: '4',
                },
                {
                  label: t('Pangur'),
                  value: '4',
                },
                {
                  label: t('Jarakel'),
                  value: '5',
                },
                {
                  label: t('Baromda'),
                  value: '5',
                },
                {
                  label: t('Jambera'),
                  value: '5',
                },
                {
                  label: t('Barbera'),
                  value: '5',
                },
                {
                  label: t('Bumbalda'),
                  value: '6',
                },
                {
                  label: t('Jamang'),
                  value: '6',
                },
                {
                  label: t('Pabura'),
                  value: '6',
                },
                {
                  label: t('Soy'),
                  value: '7',
                },
                {
                  label: t('Barbera'),
                  value: '7',
                },
                {
                  label: t('Ella'),
                  value: '7',
                },
                {
                  label: t('Kauwajor'),
                  value: '7',
                },
                {
                  label: t('Mahabuang'),
                  value: '7',
                },
                {
                  label: t('Sijang'),
                  value: '7',
                },
                {
                  label: t('Unikel'),
                  value: '7',
                },
                {
                  label: t('Bujaga'),
                  value: '8',
                },
                {
                  label: t('Kuruchdega'),
                  value: '8',
                },
                {
                  label: t('Chhotketunga'),
                  value: '8',
                },
                {
                  label: t('Jaldega'),
                  value: '8',
                },
                {
                  label: t('Virta'),
                  value: '8',
                },
                {
                  label: t('Bandu'),
                  value: '2',
                },
                {
                  label: t('Boroseta'),
                  value: '2',
                },
                {
                  label: t('Jamtoli'),
                  value: '2',
                },
                {
                  label: t('Ketka'),
                  value: '2',
                },
                {
                  label: t('Simhatu'),
                  value: '2',
                },
                {
                  label: t('Beraergi'),
                  value: '9',
                },
                {
                  label: t('Buruergi'),
                  value: '9',
                },
                {
                  label: t('Olhan'),
                  value: '9',
                },
                {
                  label: t('Sumingbera'),
                  value: '9',
                },
                {
                  label: t('Vinjhamarcha'),
                  value: '9',
                },
                {
                  label: t('Rabbai'),
                  value: '9',
                },
                {
                  label: t('Sutriuli'),
                  value: '9',
                },
                {
                  label: t('Helgara'),
                  value: '10',
                },
                {
                  label: t('Banki'),
                  value: '10',
                },
                {
                  label: t('Kanaroya'),
                  value: '10',
                },
                {
                  label: t('Pado'),
                  value: '10',
                },
                {
                  label: t('Badkaduel'),
                  value: '11',
                },
                {
                  label: t('Barerpa'),
                  value: '11',
                },
                {
                  label: t('Chhotkaduel'),
                  value: '11',
                },
                {
                  label: t('Kudrum'),
                  value: '11',
                },
                {
                  label: t('Lamgarh'),
                  value: '11',
                },
                {
                  label: t('Maimsora'),
                  value: '11',
                },
                {
                  label: t('Navagaon'),
                  value: '11',
                },
                {
                  label: t('Chaklabasa'),
                  value: '12',
                },
                ,
                {
                  label: t('Chaklabasa'),
                  value: '12',
                },
                {
                  label: t('Sora'),
                  value: '12',
                },
                {
                  label: t('Buruhonjar'),
                  value: '12',
                },
                {
                  label: t('Chorbandu'),
                  value: '12',
                },
                {
                  label: t('Sotasoya'),
                  value: '13',
                },
                {
                  label: t('Sahubera'),
                  value: '14',
                },
                {
                  label: t('Jamtai'),
                  value: '15',
                },
                {
                  label: t('Bokamara'),
                  value: '14',
                },
                {
                  label: t('Hurda'),
                  value: '15',
                },
                {
                  label: t('Kohipath'),
                  value: '15',
                },
                {
                  label: t('Kewengutu'),
                  value: '15',
                },
                {
                  label: t('Jorobari'),
                  value: '15',
                },
                {
                  label: t('Jorponda'),
                  value: '15',
                },
                {
                  label: t('Birhuli'),
                  value: '16',
                },
                {
                  label: t('Kanta'),
                  value: '16',
                },
                {
                  label: t('Marani'),
                  value: '16',
                },
                {
                  label: t('Raikera'),
                  value: '16',
                },
                {
                  label: t('Tembro'),
                  value: '16',
                },

                {
                  label: t('Genmer'),
                  value: '17',
                },

                {
                  label: t('Chandsai'),
                  value: '17',
                },
                {
                  label: t('Gerda'),
                  value: '17',
                },
                {
                  label: t('Khijurbahar'),
                  value: '17',
                },
                {
                  label: t('Toniya'),
                  value: '17',
                },
              ],
            },
            {
              label: t('Jaldega'),
              value: '2',
              Panchayats: [
                {
                  label: t('Jaldega'),
                  value: '18',
                },
                {
                  label: t('Kutungiya'),
                  value: '19',
                },
                {
                  label: t('Kharwagarha'),
                  value: '20',
                },
                {
                  label: t('Konmerla'),
                  value: '21',
                },
                {
                  label: t('Lamboi'),
                  value: '22',
                },
                {
                  label: t('Lamdega'),
                  value: '23',
                },
                {
                  label: t('Tingina'),
                  value: '24',
                },
                {
                  label: t('Orga'),
                  value: '25',
                },
                {
                  label: t('Parba'),
                  value: '26',
                },
                {
                  label: t('Tati'),
                  value: '27',
                },
              ],
              Villages: [
                {
                  label: t('Jamtoli'),
                  value: '18',
                },
                {
                  label: t('Pahantoli'),
                  value: '18',
                },
                {
                  label: t('Mahomdega'),
                  value: '18',
                },
                {
                  label: t('Sawanjara'),
                  value: '18',
                },
                {
                  label: t('Ramjari'),
                  value: '19',
                },
                {
                  label: t('Minjurgarha'),
                  value: '19',
                },
                {
                  label: t('Minjurgarha'),
                  value: '19',
                },
                {
                  label: t('Kharwagarha'),
                  value: '20',
                },
                {
                  label: t('Gattigarha'),
                  value: '20',
                },
                {
                  label: t('Kinirkela'),
                  value: '20',
                },
                {
                  label: t('Patiamba'),
                  value: '20',
                },
                {
                  label: t('Dumarbera'),
                  value: '21',
                },
                {
                  label: t('Gangutoli'),
                  value: '21',
                },
                {
                  label: t('Badkitanger'),
                  value: '21',
                },
                {
                  label: t('Konmerla'),
                  value: '21',
                },
                {
                  label: t('Kolomdega'),
                  value: '21',
                },
                {
                  label: t('Tilaijara'),
                  value: '22',
                },
                {
                  label: t('Harrapnai'),
                  value: '22',
                },
                {
                  label: t('Karmapani'),
                  value: '22',
                },
                {
                  label: t('Bendojara'),
                  value: '22',
                },
                {
                  label: t('Lomboi Mahua Toli'),
                  value: '22',
                },
                {
                  label: t('Basaer'),
                  value: '22',
                },
                {
                  label: t('Mama Bhagina'),
                  value: '22',
                },
                {
                  label: t('Bhitbuna'),
                  value: '23',
                },
                {
                  label: t('Baraibera'),
                  value: '23',
                },
                {
                  label: t('Hututuwa'),
                  value: '23',
                },
                {
                  label: t('Lamdega'),
                  value: '23',
                },
                {
                  label: t('Parba lamdega'),
                  value: '23',
                },
                {
                  label: t('Dhorhibahar'),
                  value: '24',
                },
                {
                  label: t('Tikra'),
                  value: '24',
                },
                {
                  label: t('Silinga'),
                  value: '24',
                },
                {
                  label: t('Dhelsera'),
                  value: '25',
                },
                {
                  label: t('Dhelsera'),
                  value: '25',
                },
                {
                  label: t('Orga'),
                  value: '25',
                },
                {
                  label: t('Sarubahar'),
                  value: '25',
                },
                {
                  label: t('Parba'),
                  value: '26',
                },
                {
                  label: t('Dhingurpani'),
                  value: '26',
                },
                {
                  label: t('Dhouranhan'),
                  value: '26',
                },
                {
                  label: t('Kouwadarha'),
                  value: '26',
                },
                {
                  label: t('Lachhanpur'),
                  value: '26',
                },
                {
                  label: t('Siharmunda'),
                  value: '26',
                },
                {
                  label: t('Sukhajhariya'),
                  value: '26',
                },
                {
                  label: t('Mangaspur'),
                  value: '26',
                },
                {
                  label: t('Bendosera'),
                  value: '26',
                },
                {
                  label: t('Janoda'),
                  value: '26',
                },
                {
                  label: t('Jundih'),
                  value: '26',
                },
                {
                  label: t('Bhanvarchawa'),
                  value: '26',
                },
                {
                  label: t('Tati'),
                  value: '27',
                },
                {
                  label: t('Hutubada'),
                  value: '27',
                },
                {label: t('Turupdega'), value: '27'},
                {
                  label: t('Barbera'),
                  value: '27',
                },
                {
                  value: t('Toniya'),
                  value: '27',
                },
              ],
            },
            {
              label: t('Kolebira'),
              value: '3',
              Panchayats: [
                {
                  label: t('Ransiya'),
                  value: '28',
                },
                {
                  label: t('Shapur'),
                  value: '29',
                },
                {
                  label: t('Agharma'),
                  value: '30',
                },
                {
                  label: t('Kolebira'),
                  value: '31',
                },
                {
                  label: t('Nawatoli'),
                  value: '32',
                },
                {
                  label: t('Domtoli'),
                  value: '33',
                },
                {
                  label: t('Bandarchuan'),
                  value: '34',
                },
                {
                  label: t('Tutikel'),
                  value: '35',
                },
                {
                  label: t('Eidega'),
                  value: '36',
                },
                {
                  label: t('Barsloya'),
                  value: '37',
                },
                {
                  label: t('Lachragarh'),
                  value: '38',
                },
              ],
              Villages: [
                {
                  label: t('Bokba'),
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
                  value: '28',
                },
                {
                  label: t('Sirikonde Kera'),
                  value: '28',
                },
                {
                  label: t('Takba'),
                  value: '28',
                },
                {
                  label: t('Shapur'),
                  value: '29',
                },
                {
                  label: t('Kombakera'),
                  value: '29',
                },
                {
                  label: t('Konjoba'),
                  value: '29',
                },
                {
                  label: t('Dumardih'),
                  value: '30',
                },
                {
                  label: t('Jurkela'),
                  value: '30',
                },
                {
                  label: t('Karamtoli'),
                  value: '30',
                },
                {
                  label: t('Larba'),
                  value: '30',
                },
                {
                  label: t('Shivnathpur'),
                  value: '30',
                },
                {
                  label: t('Tangertoli'),
                  value: '30',
                },
                {
                  label: t('Jamtoli'),
                  value: '31',
                },
                {
                  label: t('Kunderdega'),
                  value: '31',
                },
                {
                  label: t('Bhanwarpahari'),
                  value: '32',
                },
                {
                  label: t('Bhanwarpahari'),
                  value: '32',
                },
                {
                  label: t('Nawatoli'),
                  value: '32',
                },
                {
                  label: t('Saraipani'),
                  value: '32',
                },
                {
                  label: t('Sarangapani'),
                  value: '32',
                },
                {
                  label: t('Machka'),
                  value: '32',
                },
                {
                  label: t('Sundratoli'),
                  value: '32',
                },
                {
                  label: t('Barwadih'),
                  value: '33',
                },
                {
                  label: t('Ghansilari'),
                  value: '33',
                },
                {
                  label: t('Tainsera'),
                  value: '33',
                },
                {
                  label: t('Bandarchuwan'),
                  value: '34',
                },
                {
                  label: t('Besrajara'),
                  label: '34',
                },
                {
                  label: t('Selsoya'),
                  label: '34',
                },
                {
                  label: t('Setasoya'),
                  value: '34',
                },
                {
                  label: t('Sardhatoli'),
                  value: '35',
                },
                {
                  label: t('Jhapla'),
                  value: '35',
                },
                {
                  label: t('Sokorla'),
                  value: '35',
                },
                {
                  label: t('Tutikel'),
                  value: '35',
                },
                ,
                {
                  label: t('Eidega'),
                  value: '36',
                },
                {
                  label: t('Kudabera'),
                  value: '36',
                },
                {
                  label: t('Kalhatoli'),
                  value: '36',
                },
                {
                  label: t('Pogloya'),
                  value: '36',
                },
                {
                  label: t('Ramjari'),
                  value: '36',
                },
                {
                  label: t('Barasloya'),
                  value: '37',
                },
                {
                  label: t('Barketunga'),
                  value: '37',
                },
                {
                  label: t('Kulasoya'),
                  value: '37',
                },
                {
                  label: t('Sijang'),
                  value: '37',
                },
                {
                  label: t('Kombakra'),
                  value: '38',
                },
                {
                  label: t('Lachragarh'),
                  value: '38',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const {profile} = useSelector(state => state.entities.auth.userInfo);

  const villagesData = states[0].Districts[0].Tehsils[0].Villages;

  const handleSignOut = () => {
    setVis(true);
  };

  const fetchData = async () => {
    await firebase.messaging().registerDeviceForRemoteMessages();
    const fcmToken = await firebase.messaging().getToken();
    console.log('fcm', fcmToken);

    return fcmToken;
  };
  const signout = async () => {
    logoutHandler({
      id: profile?._id?.toString(),
      fcmToken: 'await fetchData()',
    })
      .then(res => {
        setVis(false);
        dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 1});
        dispatch({type: 'SAVE_TOKEN', payload: null});
        navigation.replace('MobilePassword');
      })
      .catch(error => {
        alert('Something went wrong');
      });
    // dispatch({type: 'SAVE_PROFILE', payload: null});
  };
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

  const panchayatToVillageMapping = {
    [t('Bano')]: [
      {
        label: t('Bano'),
        value: '1',
      },
      {
        label: t('Samdega'),
        value: '1',
      },
    ],
    [t('Bintuka')]: [
      {
        label: t('Karkatta'),
        value: '4',
      },
      {
        label: t('Bintuka'),
        value: '4',
      },
      {
        label: t('Jamursoya'),
        value: '4',
      },
      {
        label: t('Kewetang'),
        value: '4',
      },
      {
        label: t('Turyu'),
        value: '4',
      },
      {
        label: t('Pangur'),
        value: '4',
      },
    ],
    [t('Kanarowan')]: [
      {
        label: t('Jarakel'),
        value: '5',
      },
      {
        label: t('Baromda'),
        value: '5',
      },
      {
        label: t('Jambera'),
        value: '5',
      },
      {
        label: t('Barbera'),
        value: '5',
      },
      {
        label: t('Kanarowan'),
        value: '6',
      },
    ],
    [t('Pabura')]: [
      {
        label: t('Bamulda'),
        value: '6',
      },

      {
        label: t('Nitmur'),
        value: '6',
      },
      {
        label: t('Jamang'),
        value: '6',
      },
      {
        label: t('Pabura'),
        value: '7',
      },
      {
        label: t('Kenduda'),
        value: '7',
      },
      {
        label: t('Chodordah'),
        value: '7',
      },
    ],

    [t('Soy')]: [
      {
        label: t('Soy'),
        value: '7',
      },
      {
        label: t('Barbera'),
        value: '7',
      },
      {
        label: t('Ela'),
        value: '7',
      },
      {
        label: t('Kauwajor'),
        value: '7',
      },
      {
        label: t('Mahabuang'),
        value: '7',
      },
      {
        label: t('Sijang'),
        value: '7',
      },
      {
        label: t('Unikel'),
        value: '7',
      },
    ],
    [t('Konsode')]: [
      {
        label: t('Bujaga'),
        value: '8',
      },
      {
        label: t('Kuruchdega'),
        value: '8',
      },
      {
        label: t('Chhotketunga'),
        value: '8',
      },
      {
        label: t('Jaldega'),
        value: '8',
      },
      {
        label: t('Virta'),
        value: '8',
      },
    ],

    [t('Semhatu')]: [
      {
        label: t('Bandu'),
        value: '2',
      },
      {
        label: t('Boroseta'),
        value: '2',
      },
      {
        label: t('Jamtoli'),
        value: '2',
      },
      {
        label: t('Ketka'),
        value: '2',
      },
      {
        label: t('Simhatu'),
        value: '2',
      },
    ],
    [t('Simhatu')]: [
      {
        label: t('Bandu'),
        value: '2',
      },
      {
        label: t('Boroseta'),
        value: '2',
      },
      {
        label: t('Jamtoli'),
        value: '2',
      },
      {
        label: t('Ketka'),
        value: '2',
      },
      {
        label: t('Simhatu'),
        value: '2',
      },
    ],
    [t('Beraergi')]: [
      {
        label: t('Beraergi'),
        value: '9',
      },
      {
        label: t('Buruergi'),
        value: '9',
      },
      {
        label: t('Olhan'),
        value: '9',
      },
      {
        label: t('Sumingbera'),
        value: '9',
      },
      {
        label: t('Vinjhamarcha'),
        value: '9',
      },
      {
        label: t('Rabbai'),
        value: '9',
      },
      {
        label: t('Sutriuli'),
        value: '9',
      },
    ],
    [t('Banki')]: [
      {
        label: t('Helgara'),
        value: '10',
      },
      {
        label: t('Banki'),
        value: '10',
      },
      {
        label: t('Kanaroya'),
        value: '10',
      },
      {
        label: t('Pado'),
        value: '10',
      },
    ],

    [t('Ukauli')]: [
      ,
      {
        label: t('Chaklabasa'),
        value: '12',
      },
      {
        label: t('Sora'),
        value: '12',
      },
      {
        label: t('Buruhonjar'),
        value: '12',
      },
      {
        label: t('Chorbandu'),
        value: '12',
      },
    ],
    [t('Dumariya')]: [
      {
        label: t('Sotasoya'),
        value: '13',
      },
    ],
    [t('Sahubera')]: [
      {
        label: t('Sahubera'),
        value: '14',
      },
      {
        label: t('Bokamara'),
        value: '14',
      },
    ],
    [t('Jamtai')]: [
      {
        label: t('Jamtai'),
        value: '15',
      },
      {
        label: t('Hurda'),
        value: '15',
      },
      {
        label: t('Kohipath'),
        value: '15',
      },
      {
        label: t('Kewengutu'),
        value: '15',
      },
      {
        label: t('Jorobari'),
        value: '15',
      },
      {
        label: t('Jorponda'),
        value: '15',
      },
    ],
    [t('Raikera')]: [
      {
        label: t('Birhuli'),
        value: '16',
      },
      {
        label: t('Kanta'),
        value: '16',
      },
      {
        label: t('Marani'),
        value: '16',
      },
      {
        label: t('Raikera'),
        value: '16',
      },
      {
        label: t('Tembro'),
        value: '16',
      },
    ],
    [t('Genmer')]: [
      {
        label: t('Chandsai'),
        value: '17',
      },
      {
        label: t('Genmer'),
        value: '17',
      },

      {
        label: t('Gerda'),
        value: '17',
      },
      {
        label: t('Khijurbahar'),
        value: '17',
      },
      {
        label: t('Toniya'),
        value: '17',
      },
    ],
    [t('Badkaduel')]: [
      {
        label: t('Badkaduel'),
        value: '1',
      },
      {
        label: t('Barerpa'),
        value: '2',
      },
      {
        label: t('Chhotkaduel'),
        value: '3',
      },
      {
        label: t('Kudrum'),
        value: '4',
      },
      {
        label: t('Lamgarh'),
        value: '5',
      },
      {
        label: t('Maimsora'),
        value: '6',
      },
      {
        label: t('Navagaon'),
        value: '7',
      },
    ],

    // KOLIBERA

    [t('Ransiya')]: [
      {
        label: t('Bokba'),
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
        value: '28',
      },
      {
        label: t('Sirikonde Kera'),
        value: '28',
      },
      {
        label: t('Takba'),
        value: '28',
      },
    ],

    [t('Shapur')]: [
      {
        label: t('Kombakera'),
        value: '29',
      },
      {
        label: t('Konjoba'),
        value: '29',
      },
      {
        label: t('Shahpur Kondekera'),
        value: '20',
      },
    ],

    [t('Agharma')]: [
      {
        label: t('Dumardih'),
        value: '30',
      },
      {
        label: t('Jurkela'),
        value: '30',
      },
      {
        label: t('Karamtoli'),
        value: '30',
      },
      {
        label: t('Larba'),
        value: '30',
      },
      {
        label: t('Shivnathpur'),
        value: '30',
      },
      {
        label: t('Tangertoli'),
        value: '30',
      },
    ],

    [t('Kolebira')]: [
      {
        label: t('Jamtoli'),
        value: '31',
      },
      {
        label: t('Kunderdega'),
        value: '31',
      },
    ],

    [t('Nawatoli')]: [
      {
        label: t('Bhanwarpahari'),
        value: '32',
      },
      {
        label: t('Bhanwarpahari'),
        value: '32',
      },
      {
        label: t('Saraipani'),
        value: '32',
      },
      {
        label: t('Sarangapani'),
        value: '32',
      },
      {
        label: t('Machka'),
        value: '32',
      },
      {
        label: t('Sundratoli'),
        value: '32',
      },
    ],

    [t('Domtoli')]: [
      {
        label: t('Barwadih'),
        value: '33',
      },
      {
        label: t('Ghansilari'),
        value: '33',
      },
      {
        label: t('Tainsera'),
        value: '33',
      },
    ],

    [t('Bandarchuwan')]: [
      {
        label: t('Bandarchuwan'),
        value: '34',
      },
      {
        label: t('Besrajara'),
        value: '34',
      },
      {
        label: t('Selsoya'),
        value: '34',
      },
      {
        label: t('Setasoya'),
        value: '34',
      },
    ],

    [t('Tutikel')]: [
      {
        label: t('Sardhatoli'),
        value: '35',
      },
      {
        label: t('Jhapla'),
        value: '35',
      },
      {
        label: t('Sokorla'),
        value: '35',
      },
      {
        label: t('Tutikel'),
        value: '35',
      },
    ],

    [t('Eidega')]: [
      ,
      {
        label: t('Eidega'),
        value: '36',
      },
      {
        label: t('Kudabera'),
        value: '36',
      },
      {
        label: t('Kalhatoli'),
        value: '36',
      },
      {
        label: t('Pogloya'),
        value: '36',
      },
      {
        label: t('Ramjari'),
        value: '36',
      },
    ],

    [t('Barasloya')]: [
      {
        label: t('Barasloya'),
        value: '37',
      },
      {
        label: t('Barketunga'),
        value: '37',
      },
      {
        label: t('Kulasoya'),
        value: '37',
      },
      {
        label: t('Sijang'),
        value: '37',
      },
    ],

    [t('Lachragarh')]: [
      ,
      {
        label: t('Kombakra'),
        value: '38',
      },
      {
        label: t('Lachragarh'),
        value: '38',
      },
    ],

    // JALDEGA

    [t('Jaldega')]: [
      {
        label: t('Jamtoli'),
        value: '18',
      },
      {
        label: t('Pahantoli'),
        value: '18',
      },
      {
        label: t('Mahomdega'),
        value: '18',
      },
      {
        label: t('Sawanjara'),
        value: '18',
      },
    ],

    [t('Kutungiya')]: [
      {
        label: t('Menjurgara'),
        value: '20',
      },
      {
        label: t('Ramjari'),
        value: '19',
      },
      {
        label: t('Dumarmunda'),
        value: '20',
      },
    ],

    [t('Patiamba')]: [
      {
        label: t('Kharwagarha'),
        value: '12',
      },

      {
        label: t('Gattigarha'),
        value: '20',
      },
      {
        label: t('Kinirkela'),
        value: '20',
      },
      {
        label: t('Patiamba'),
        value: '20',
      },
    ],

    [t('Konmerla')]: [
      {
        label: t('Dumarbera'),
        value: '21',
      },
      {
        label: t('Gangutoli'),
        value: '21',
      },
      {
        label: t('Badkitanger'),
        value: '21',
      },
      {
        label: t('Konmerla'),
        value: '21',
      },
      {
        label: t('Kolomdega'),
        value: '21',
      },
      {
        label: t('Baldega'),
        value: '23',
      },
    ],

    [t('Lamdega')]: [
      {
        label: t('Baraibera'),
        value: '23',
      },

      {
        label: t('Bhitbuna'),
        value: '23',
      },

      {
        label: t('Hututuwa'),
        value: '23',
      },
      {
        label: t('Lamdega'),
        value: '23',
      },
      {
        label: t('Parba lamdega'),
        value: '23',
      },
    ],

    [t('Tingina')]: [
      {
        label: t('Dhorhibahar'),
        value: '24',
      },
      {
        label: t('Tikra'),
        value: '24',
      },

      {
        label: t('Tingina'),
        value: '23',
      },
      {
        label: t('Silinga'),
        value: '24',
      },
    ],

    [t('Orga')]: [
      {
        label: t('Dhelsera'),
        value: '25',
      },
      {
        label: t('Orga'),
        value: '25',
      },
      {
        label: t('Sarubahar'),
        value: '25',
      },
    ],

    [t('Parba')]: [
      {
        label: t('Dhingurpani'),
        value: '26',
      },
      {
        label: t('Dhouranjan'),
        value: '28',
      },
      {
        label: t('Kouwadarha'),
        value: '26',
      },
      {
        label: t('Lachhanpur'),
        value: '26',
      },
      {
        label: t('Siharmunda'),
        value: '26',
      },
      {
        label: t('Sukhajhariya'),
        value: '26',
      },
      {
        label: t('Mangaspur'),
        value: '26',
      },
      {
        label: t('Bendosera'),
        value: '26',
      },
      {
        label: t('Janoda'),
        value: '26',
      },
    ],

    [t('Tati')]: [
      {
        label: t('Hutubda'),
        value: '29',
      },
      {
        label: t('Turupdega'),
        value: '27',
      },
      {
        label: t('Barbera'),
        value: '27',
      },
      {
        label: t('Phirka'),
        value: '27',
      },
      {
        label: t('Tati'),
        value: '28',
      },
      {
        label: t('Torian'),
        value: '29',
      },

      // {
      //     value: t('Toniya'),
      //     value: '27'
      // },

      // {
      //     label: t('Tilaijara'),
      //     value: '22'
      // }, {
      //     label: t('Harrapnai'),
      //     value: '22'
      // }, {
      //     label: t('Karmapani'),
      //     value: '22'
      // }, {
      //     label: t('Bendojara'),
      //     value: '22'
      // }, {
      //     label: t('Lomboi Mahua Toli'),
      //     value: '22'
      // },
      // {
      //     label: t('Basaer'),
      //     value: '22'
      // }, {
      //     label: t('Mama Bhagina'),
      //     value: '22'
      // },
      // {
      //     label: t('Jundih'),
      //     value: '26'
      // }, {
      //     label: t('Hutubada'),
      //     value: '27'
      // },

      // {
      //     label: t('Bhanvarchawa'),
      //     value: '26'
      // },
    ],
  };

  const panchayatToVillageMappingOdisha = {
    // KALIMELA

    [t('BHEJANGIWADA')]: [
      {
        label: t('Arnamala'),
        value: '1',
      },

      {
        label: t('Badaliguda'),
        value: '1',
      },
      {
        label: t('Bapanpali'),
        value: '1',
      },
      {
        label: t('Kurukundi'),
        value: '1',
      },
    ],
    [t('BODIGETTA')]: [
      {
        label: t('Badigata'),
        value: '4',
      },
      {
        label: t('Kurubu'),
        value: '4',
      },
      {
        label: t('Kutmanpali'),
        value: '4',
      },
      {
        label: t('Marigata'),
        value: '4',
      },
      {
        label: t('Tekagura'),
        value: '4',
      },
    ],
    [t('CHINTALWADA')]: [
      {
        label: t('CHINTALWADA'),
        value: '5',
      },
      {
        label: t('Karkatpalli'),
        value: '5',
      },
      {
        label: t('Kosalkunda'),
        value: '5',
      },
      {
        label: t('Pitakonda'),
        value: '5',
      },
      {
        label: t('Sindhiguda'),
        value: '6',
      },
    ],
    [t('CHITRANGAPALLI')]: [
      {
        label: t('Chitrangpali'),
        value: '6',
      },

      {
        label: t('Doraguda (MPV-9)'),
        value: '6',
      },
      {
        label: t('Gumukaguda'),
        value: '6',
      },
      {
        label: t('Mudakhal'),
        value: '7',
      },
      {
        label: t('Odelguda'),
        value: '7',
      },
      {
        label: t('Supali'),
        value: '7',
      },
      {
        label: t('Usakapali'),
        value: '7',
      },
    ],

    [t('GOMPAKUNDA')]: [
      {
        label: t('Gagarmetla'),
        value: '7',
      },
      {
        label: t('Barbera'),
        value: '7',
      },
      {
        label: t('Gampakonda'),
        value: '7',
      },
      {
        label: t('Iralgonda'),
        value: '7',
      },
      {
        label: t('Kanheiguda'),
        value: '7',
      },
    ],
    [t('GUMUKA')]: [
      {
        label: t('GUMUKA'),
        value: '8',
      },
      {
        label: t('Pedakonda'),
        value: '8',
      },
    ],

    [t('kALIMELA')]: [
      {
        label: t('Ambaguda'),
        value: '2',
      },
      {
        label: t('kALIMELA'),
        value: '2',
      },
      {
        label: t('Kotaguda'),
        value: '2',
      },
    ],
    [t('KANGURUKUNDA')]: [
      {
        label: t('Kangurkonda'),
        value: '2',
      },
      {
        label: t('Patakonda'),
        value: '2',
      },
      {
        label: t('Salamarikonda'),
        value: '2',
      },
    ],
    [t('KOIMETLA')]: [
      {
        label: t('KOIMETLA'),
        value: '9',
      },
      {
        label: t('Kowasiguda'),
        value: '9',
      },
      {
        label: t('Maranpalli'),
        value: '9',
      },
    ],
    [t('LUGEL')]: [
      {
        label: t('Krushnanagar'),
        value: '10',
      },
      {
        label: t('LUGEL'),
        value: '10',
      },
      {
        label: t('Phulkonkonda'),
        value: '10',
      },
    ],

    [t('MAHARAJAPALLI')]: [
      ,
      {
        label: t('Biliguda'),
        value: '12',
      },
      {
        label: t('Koikonda'),
        value: '12',
      },
      {
        label: t('Maharajpalli'),
        value: '12',
      },
      {
        label: t('MPV -81'),
        value: '12',
      },
    ],
    [t('MALAVARAM')]: [
      {
        label: t('Anantapalli'),
        value: '13',
      },
      {
        label: t('Berenpalli'),
        value: '13',
      },
      {
        label: t('Dopenkonda'),
        value: '13',
      },
      {
        label: t('Malabharam'),
        value: '13',
      },
      {
        label: t('Nilakota'),
        value: '13',
      },
      {
        label: t('Tendraspaly'),
        value: '13',
      },
    ],
    [t('MANYAMKUNDA')]: [
      {
        label: t('Billigura'),
        value: '14',
      },
      {
        label: t('Doganda'),
        value: '14',
      },
      {
        label: t('Gunthabeda'),
        value: '14',
      },
      {
        label: t('Kantabanjiguda'),
        value: '14',
      },
      {
        label: t('Mangipalli'),
        value: '14',
      },
      {
        label: t('Manyamkonda'),
        value: '14',
      },
      {
        label: t('Pendikonda'),
        value: '14',
      },
      {
        label: t('Penkurai'),
        value: '14',
      },
      {
        label: t('Poluru'),
        value: '14',
      },
      {
        label: t('Potteru'),
        value: '14',
      },
      {
        label: t('Ramachandrapur'),
        value: '14',
      },
      {
        label: t('Sailuru'),
        value: '14',
      },
      {
        label: t('Singrajkota'),
        value: '14',
      },
      {
        label: t('Togurkota'),
        value: '14',
      },
    ],
    [t('NALAGUNTHI')]: [
      {
        label: t('Idikonda'),
        value: '15',
      },
      {
        label: t('Nalagunti'),
        value: '15',
      },
    ],
    [t('TELERAI')]: [
      {
        label: t('Ambapadar'),
        value: '16',
      },
      {
        label: t('Badapadar'),
        value: '16',
      },
      {
        label: t('Dayaltungi'),
        value: '16',
      },
      {
        label: t('Jabanpalli'),
        value: '16',
      },
      {
        label: t('Jakalgandi'),
        value: '16',
      },
      {
        label: t('Kandalgura'),
        value: '16',
      },
      {
        label: t('Oramgura'),
        value: '16',
      },
      {
        label: t('Pedawara'),
        value: '16',
      },
      {
        label: t('Singabaram'),
        value: '16',
      },
      {
        label: t('Sudhakunta'),
        value: '16',
      },
      {
        label: t('TELERAI'),
        value: '16',
      },
    ],
    [t('TIGAL')]: [
      {
        label: t('Tamanpalli'),
        value: '17',
      },
      {
        label: t('TIGAL'),
        value: '17',
      },
    ],
    [t('VENKATAPALLAM')]: [
      {
        label: t('Bhenkatapalli'),
        value: '1',
      },
      {
        label: t('Koyaguda'),
        value: '2',
      },
      {
        label: t('Mangipalli'),
        value: '3',
      },
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
        value: '28',
      },
      {
        label: t('Iswarguda'),
        value: '28',
      },
      {
        label: t('Janbai'),
        value: '28',
      },
      {
        label: t('Kamarguda'),
        value: '28',
      },
      {
        label: t('Khilaput'),
        value: '28',
      },
      {
        label: t('lambasingi'),
        value: '28',
      },
      {
        label: t('Limalori'),
        value: '28',
      },
      {
        label: t('Metaguda'),
        value: '28',
      },
      {
        label: t('Pabiliguda'),
        value: '28',
      },
      {
        label: t('Padmagiri'),
        value: '28',
      },
      {
        label: t('Paneshgandhi'),
        value: '28',
      },
      {
        label: t('Phulagandhi'),
        value: '28',
      },
      {
        label: t('Rekhapali'),
        value: '28',
      },
      {
        label: t('Sariapali'),
        value: '28',
      },
    ],

    [t('CHITRAKONDA')]: [
      {
        label: t('Chitrakonda (CT)'),
        value: '29',
      },
      {
        label: t('Rajal konda'),
        value: '29',
      },
    ],

    [t('JODAMBA')]: [
      {
        label: t('BADATALPADAR'),
        value: '30',
      },
      {
        label: t('Bhitardarlabeda'),
        value: '30',
      },
      {
        label: t('Bihanagudi'),
        value: '30',
      },
      {
        label: t('Darlabeda'),
        value: '30',
      },
      {
        label: t('Doraguda'),
        value: '30',
      },
      {
        label: t('GAJALGUMI'),
        value: '30',
      },
      {
        label: t('Gopinathguda'),
        value: '30',
      },
      {
        label: t('Jajpalama'),
        value: '30',
      },
      {
        label: t('jampurulu'),
        value: '30',
      },
      {
        label: t('Janturai'),
        value: '30',
      },
      {
        label: t('Jodamba'),
        value: '30',
      },
      {
        label: t('KARANJAGUDA'),
        value: '30',
      },
      {
        label: t('Khajuriguda'),
        value: '30',
      },
      {
        label: t('Kumbhipatiaguda'),
        value: '30',
      },
      {
        label: t('Kunturpader'),
        value: '30',
      },
      {
        label: t('Kusumput'),
        value: '30',
      },
      {
        label: t('Kutunipadar'),
        value: '30',
      },
      {
        label: t('ladiguda'),
        value: '30',
      },
      {
        label: t('Matikhala'),
        value: '30',
      },
      {
        label: t('Nilaram'),
        value: '30',
      },
      {
        label: t('Nuaguda'),
        value: '30',
      },
      {
        label: t('PALASPADAR'),
        value: '30',
      },
      {
        label: t('Panapader'),
        value: '30',
      },
      {
        label: t('Panaspadar'),
        value: '30',
      },
      {
        label: t('PODKHAL'),
        value: '30',
      },
      {
        label: t('SANTALPADAR'),
        value: '30',
      },
      {
        label: t('Similipader'),
        value: '30',
      },
      {
        label: t('Tarabeda'),
        value: '30',
      },
      {
        label: t('Tikarpada'),
        value: '30',
      },
    ],

    [t('NUAGUDA')]: [
      {
        label: t('Badput'),
        value: '31',
      },
      {
        label: t('Ghagadabandha'),
        value: '31',
      },
      {
        label: t('Kalpadar'),
        value: '31',
      },
      {
        label: t('Narasingpur'),
        value: '31',
      },
      {
        label: t('Nuaguda'),
        value: '31',
      },
      {
        label: t('Paliguda'),
        value: '31',
      },
      {
        label: t('Purunapani'),
        value: '31',
      },
      {
        label: t('Ramaguda'),
        value: '31',
      },
      {
        label: t('Rathaguda'),
        value: '31',
      },
    ],

    [t('PANASPUT')]: [
      {
        label: t('Bezing'),
        value: '32',
      },
      {
        label: t('Damagada'),
        value: '32',
      },
      {
        label: t('Dangarpadar'),
        value: '32',
      },
      {
        label: t('Ghanabeda'),
        value: '32',
      },
      {
        label: t('Goilikhari'),
        value: '32',
      },
      {
        label: t('Gorasethu'),
        value: '32',
      },
      {
        label: t('Handikhal'),
        value: '32',
      },
      {
        label: t('jamuguda'),
        value: '32',
      },
      {
        label: t('Kumudaguda'),
        value: '32',
      },
      {
        label: t('Mukudipali'),
        value: '32',
      },
      {
        label: t('Mulaput'),
        value: '32',
      },
      {
        label: t('Mundiguma'),
        value: '32',
      },
      {
        label: t('Panasput'),
        value: '32',
      },
      {
        label: t('Salgamput'),
        value: '32',
      },
      {
        label: t('Sindhiput'),
        value: '32',
      },
      {
        label: t('Singoi'),
        value: '32',
      },
      {
        label: t('Tabalaguda'),
        value: '32',
      },
      {
        label: t('Tutugumi'),
        value: '32',
      },
    ],

    [t('PAPERMETLA')]: [
      {
        label: t('Bhimaram'),
        value: '33',
      },
      {
        label: t('Bidarpakhana'),
        value: '33',
      },
      {
        label: t('Dudhapalli'),
        value: '33',
      },
      {
        label: t('Gandhiguda'),
        value: '33',
      },
      {
        label: t('Jantapai'),
        value: '33',
      },
      {
        label: t('Kadalibandha'),
        value: '33',
      },
      {
        label: t('Katapali'),
        value: '33',
      },
      {
        label: t('Kuniguda'),
        value: '33',
      },
      {
        label: t('lauguda'),
        value: '33',
      },
      {
        label: t('Lochapani'),
        value: '33',
      },
      {
        label: t('Nuadoliamb'),
        value: '33',
      },
      {
        label: t('Nuaguda'),
        value: '33',
      },
      {
        label: t('Papermenta'),
        value: '33',
      },
      {
        label: t('Purulubandha'),
        value: '33',
      },
      {
        label: t('Tentaguda'),
        value: '33',
      },
      {
        label: t('Tentuliguda'),
        value: '33',
      },
    ],

    [t('POPULUR')]: [
      {
        label: t('Brundamamedi'),
        value: '34',
      },
      {
        label: t('Jadaput'),
        value: '34',
      },
      {
        label: t('Jalagulur'),
        value: '34',
      },
      {
        label: t('Muraliguda'),
        value: '34',
      },
      {
        label: t('Naguluru'),
        value: '34',
      },
      {
        label: t('Papulur'),
        value: '34',
      },
      {
        label: t('Petal'),
        value: '34',
      },
      {
        label: t('Sanapapulur'),
        value: '34',
      },
    ],

    // KHAIRAPUT

    [t('ANDRAHAL')]: [
      {
        label: t('ANDRAHAL'),
        value: '18',
      },
      {
        label: t('Badabel'),
        value: '18',
      },
      {
        label: t('Bhaliapadar'),
        value: '18',
      },
      {
        label: t('Dumuripoda'),
        value: '18',
      },
      {
        label: t('Katamaguda'),
        value: '18',
      },
      {
        label: t('Khaliguda'),
        value: '18',
      },
      {
        label: t('Patraput'),
        value: '18',
      },
    ],

    [t('BADODURAL')]: [
      {
        label: t('Angel'),
        value: '20',
      },
      {
        label: t('Badadural'),
        value: '19',
      },
      {
        label: t('Baliguda'),
        value: '20',
      },
    ],
  };

  useEffect(() => {
    // let temp=states[0].Districts;
    // for(let key of temp ){
    //   for(let th of key.Tehsils){
    //     if(th.label===profile?.tehsil){
    //       console.log("TH",th.Villages);
    //       setVData(th.Villages)
    //     }
    //   }
    // }
    let tempData = [];

    if (language === 'or') {
      for (let key of Object.keys(panchayatToVillageMappingOdisha)) {
        if (key === profile?.panchayat) {
          tempData = panchayatToVillageMappingOdisha[key];
        }
      }
    } else {
      // find all villages tht are mapped with the panchayat in const panchayatToVillageMapping
      for (let key of Object.keys(panchayatToVillageMapping)) {
        if (key === profile?.panchayat) {
          tempData = panchayatToVillageMapping[key];
        }
      }
    }

    setVData(tempData);
  }, []);

  const getEnglish = param => {
    // console.log("OK", HI.translation)

    const left = Object.keys(HI.translation);
    const right = Object.values(HI.translation);
    const len = left.length;
    for (let i = 0; i < len; i++) {
      if (right[i] === val5.label) {
        return left[i].toLowerCase();
      }
    }
  };

  console.log(imgUrl);

  return (
    // flexWrap: 'wrap',
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 10, marginBottom: 30, marginLeft: 10}}>
          <Pressable onPress={goBack}>
            <Text style={{fontSize: 18}}>
              <FontAwesome name="arrow-left" size={18} /> {t('Go Back')}
            </Text>
          </Pressable>
        </View>

        {typeOfClaim === 'CFR' ? (
          <ScrollView style={styles.darkness}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView>
                <Text
                  style={{
                    paddingHorizontal: 40,
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  {' '}
                  गांव - {vil}
                </Text>

                {/* <Dropdown
          downloadPDFScreenFix={setVal5}
          visible={true}
          data={vData}
          formik={formik} 
          variable={'type'}
        />
        <Text>{vil}</Text> */}

                <CustomButton
                  onPress={async () => {
                    setPressed(true);
                    try {
                      // fetch image
                      // await getDeviceHash();
                      // const map_name=getEnglish(val5);
                      setLoading(true);
                      dispatch({type: 'ENABLE_LOADING'});

                      const rr = await request(`/get-documents?vName=${vil}`);

                      console.log(rr.data?.data);
                      // alert(JSON.stringify(rr.data))

                      if (rr?.data?.isMapAvailable === false) {
                        setImgUrl('x');
                      }
                      console.log(rr?.data?.data);
                      setPrintDocs(rr?.data?.data);
                      console.log('owner id', profile._id.toString());

                      if (profile?.claims?.length === 0) {
                        // first download then only
                        const rsponse = await postClaimHandler({
                          ownerId: profile._id.toString(),
                        });

                        console.log('XXXX', rsponse.data.data);

                        dispatch({
                          type: 'SAVE_PROFILE',
                          payload: rsponse?.data?.data,
                        });
                      } else {
                        console.log('Already Applied');
                      }

                      dispatch({type: 'DISABLE_LOADING'});
                      setLoading(false);
                      return;
                    } catch (error) {
                      console.log(error);
                    } finally {
                      dispatch({type: 'DISABLE_LOADING'});
                    }
                  }}
                  button={{width: 200, marginTop: 20}}
                  dsbled={vil ? false : true}>
                  {t('download application document')}
                </CustomButton>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        ) : (
          <CustomButton
            button={{width: 200, marginTop: 20}}
            onPress={async () => {
              setLoading(true);
              dispatch({type: 'ENABLE_LOADING'});
              try {
              const rr = await request(`/get-ifr-documents`);
              console.log(rr.data?.data);

              setPrintDocs(rr.data?.data);
              console.log('owner id', profile._id.toString());

              if (profile?.IFRclaims?.length === 0) {
                // first download then only
                const rsponse = await postIFRClaimHandler({
                  ownerId: profile._id.toString(),
                });

                console.log('XXXX', rsponse.data.data);

                dispatch({
                  type: 'SAVE_PROFILE',
                  payload: rsponse?.data?.data,
                });
              } else {
                console.log('Already Applied');
              }
              dispatch({type: 'DISABLE_LOADING'});
              setLoading(false);
              return;
            }catch(error){
              dispatch({type: 'DISABLE_LOADING'});
              setLoading(false);
              ToastAndroid.show('कृपया अपने इंटरनेट कनेक्शन की जाँच करें',ToastAndroid.BOTTOM)

            }
            }}>
            {t('download application document')}
          </CustomButton>
        )}
        {printDocs?.map(item => {
          const id = "खतियान भाग दो";
          if (item?.name === id) {
            return (
              <View
                key={`pd-${item?.path}`}
                style={{
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View style={{paddingVertical: 5}}>
                  <Text
                    style={{fontSize: 18, color: '#fff', fontWeight: '700'}}>
                    {item?.name}
                  </Text>
                </View>
                <View>
                  <CustomButton
                    onPress={() => {
                      navigation.navigate('RORWebView');
                     
                    }}
                    button={{width: '100%', paddingVertical: 10}}>
                    <MaterialCommunityIcons name="cloud-search" size={28} />
                  </CustomButton>
                </View>
              </View>
            );
          } else {
            return (
              <View
                key={`pd-${item?.path}`}
                style={{
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View style={{paddingVertical: 5}}>
                  <Text
                    style={{fontSize: 18, color: '#fff', fontWeight: '700'}}>
                    {item?.name}
                  </Text>
                </View>
                <View>
                  <CustomButton
                    onPress={() => {
                      Linking.openURL(item?.path);
                    }}
                    button={{width: '100%', paddingVertical: 10}}>
                    <MaterialCommunityIcons name="download-box" size={28} />
                  </CustomButton>
                </View>
              </View>
            );
          }
        })}

        {/* <Button title='ROR' onPress={()=>{
          navigation.navigate("RORWebView")
        }} /> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default DownloadPDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '20%',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '5%',
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
    fontSize: 16,
    color: '#480E09',
    textAlign: 'center',
  },
  subMsg: {
    fontSize: 20,
    color: '#480E09',
    textAlign: 'center',
    marginTop: '5%',
  },
  subMsg2: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: '5%',
  },
  bg: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

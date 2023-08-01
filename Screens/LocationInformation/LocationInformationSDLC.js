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
import { updateUserInfoAction } from '../../redux-store/actions/auth';
import { useRoute } from '@react-navigation/native';
import { G } from 'react-native-svg';
const BG_IMG_PATH = require('../../assets/images/background.png');
const LocationInformationScreenSdlcs = ({ navigation }) => {


  const [editProfileMode, setEditProfileMode] = useState(false);
  const { namet, panchayat, tehsil, statet, district, postLevel, authLevel } = useSelector(state => state.entities.auth.userInfo?.profile);
  console.log(authLevel); 
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
  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  
  
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

  const changeLanguage = value => {
      i18n
          .changeLanguage(value)
          .then(() => setCurrentLanguage(value))
          .catch(err => console.log(err));
  };

  const onNext = (values, formikActions) => {
      // console.log(values);
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

                          navigation.navigate("Role")
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

  const states = [
      {
          label: t('Jharkhand'),
          value: '1',
          Districts: [
              {
                  label: t('Samdega'),
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
                                  value: '4'
                              },
                              {
                                  label: t('Kanarowan'),
                                  value: '5'
                              },
                              {
                                  label: t('Pabura'),
                                  value: '6'
                              },
                              {
                                  label: t('Soy'),
                                  value: '7'
                              },
                              {
                                  label: t('Beraergi'),
                                  value: '9'
                              },
                              {
                                  label: t('Banki'),
                                  value: '10'
                              },
                              {
                                  label: t('Barkaduel'),
                                  value: '11'
                              },
                              {
                                  label: t('Ukauli'),
                                  value: '12'
                              }, {
                                  label: t('Dumariya'),
                                  value: '13'
                              },
                              {
                                  label: t('Sahubera'),
                                  value: '14'
                              },
                              {
                                  label: t('Jamtai'),
                                  value: '15'
                              },
                              {
                                  label: t('Raikera'),
                                  value: '16'
                              },
                              {
                                  label: t('Genmer'),
                                  value: '17'
                              },

                          ],
                          Villages: [
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
                          label: t('Jaldega'),
                          value: '2',
                          Panchayats: [
                              {
                                  label: t('Jaldega'),
                                  value: '18'
                              },
                              {
                                  label: t('Kutungiya'),
                                  value: '19'
                              },
                              // {
                              //     label: t('Kharwagarha'),
                              //     value: '20'
                              // },
                              {
                                  label: t('Konmerla'),
                                  value: '21'
                              },
                              //  {
                              //     label: t('Lamboi'),
                              //     value: '22'
                              // }
                              , {
                                  label: t('Lamdega'),
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
                                  value: t('Toniya'),
                                  value: '27'
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
                              }, {
                                  label: t('Shapur'),
                                  value: '29'
                              }, {
                                  label: t('Agharma'),
                                  value: '30'
                              }, {
                                  label: t('Kolebira'),
                                  value: '31'
                              }, {
                                  label: t('Nawatoli'),
                                  value: '32'
                              }, {
                                  label: t('Domtoli'),
                                  value: '33'
                              }, {
                                  label: t('Bandarchuan'),
                                  value: '34'
                              }, {
                                  label: t('Tutikel'),
                                  value: '35'
                              }, {
                                  label: t('Eidega'),
                                  value: '36'
                              }, {
                                  label: t('Barsloya'),
                                  value: '37'
                              }, {
                                  label: t('Lachragarh'),
                                  value: '38'
                              }
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

      [t('Bano')]: [
          {
              label: t('Bano'),
              value: '1',
          },
          {
              label: t('Samdega'),
              value: '1'
          },],
      [t('Bintuka')]: [
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
      ],
      [t('Kanarowan')]: [
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
              label: t('Kanarowan'),
              value: '6'
          },
      ],
      [t('Pabura')]: [{
          label: t('Bamulda'),
          value: '6'
      },

      {
          label: t('Nitmur'),
          value: '6'
      }, {
          label: t('Jamang'),
          value: '6'
      },
      {
          label: t('Pabura'),
          value: '7'
      }, {
          label: t('Kenduda'),
          value: '7'
      }, {
          label: t('Chodordah'),
          value: '7'
      },
      ],

      [t('Soy')]: [
          {
              label: t('Soy'),
              value: '7'
          }, {
              label: t('Barbera'),
              value: '7'
          },
          {
              label: t('Ela'),
              value: '7'
          },
          {
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
          },
      ],
      [t('Konsode')]: [{
          label: t('Bujaga'),
          value: '8'
      }, {
          label: t('Kuruchdega'),
          value: '8'
      },
      {
          label: t('Chhotketunga'),
          value: '8'
      }, {
          label: t('Jaldega'),
          value: '8'
      },
      {
          label: t('Virta'),
          value: '8'
      },],

      [t('Semhatu')]: [
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
      ],
      [t('Simhatu')]: [
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
      ],
      [t('Beraergi')]: [{
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
      },],
      [t('Banki')]: [{
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
      }],

      [t('Ukauli')]: [, {
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
          }],
      [t('Dumariya')]: [{
          label: t('Sotasoya'),
          value: '13'
      }],
      [t('Sahubera')]: [{
          label: t('Sahubera'),
          value: '14'
      },
      {
          label: t('Bokamara'),
          value: '14'
      },
      ],
      [t('Jamtai')]: [{
          label: t('Jamtai'),
          value: '15'
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
      },],
      [t('Raikera')]: [{
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
      }],
      [t('Genmer')]: [
          {
              label: t('Chandsai'),
              value: '17'
          },
          {
              label: t('Genmer'),
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
          }],
      [t('Badkaduel')]: [{
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
              value: '28'
          }, {
              label: t('Sirikonde Kera'),
              value: '28'
          }, {
              label: t('Takba'),
              value: '28'
          },
      ],

      [t('Shapur')]: [{
          label: t('Kombakera'),
          value: '29'
      }, {
          label: t('Konjoba'),
          value: '29'
      }, {
          label: t('Shahpur Kondekera'),
          value: '20'
      },
      ],


      [t('Agharma')]: [{
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
      },],


      [t('Kolebira')]: [{
          label: t('Jamtoli'),
          value: '31'
      }, {
          label: t('Kunderdega'),
          value: '31'
      }],

      [t('Nawatoli')]: [{
          label: t('Bhanwarpahari'),
          value: '32'
      }, {
          label: t('Bhanwarpahari'),
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
      },],


      [t('Domtoli')]: [{
          label: t('Barwadih'),
          value: '33'

      }, {
          label: t('Ghansilari'),
          value: '33'
      }, {
          label: t('Tainsera'),
          value: '33'
      },],



      [t('Bandarchuwan')]: [{
          label: t('Bandarchuwan'),
          value: '34'
      }, {
          label: t('Besrajara'),
          value: '34'
      }, {
          label: t('Selsoya'),
          value: '34'
      }, {
          label: t('Setasoya'),
          value: '34'
      }],

      [t('Tutikel')]: [{
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
      },],

      [t('Eidega')]: [
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
          }],


      [t('Barasloya')]: [{
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
      }],


      [t('Lachragarh')]: [, {
          label: t('Kombakra'),
          value: '38'
      }, {
              label: t('Lachragarh'),
              value: '38'
          }],









      // JALDEGA

      [t('Jaldega')]: [{
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
      }],


      [t('Kutungiya')]: [
          {
              label: t('Menjurgara'),
              value: '20'
          },
          {
              label: t('Ramjari'),
              value: '19'
          },
          {
              label: t('Dumarmunda'),
              value: '20'
          }],


      [t('Patiamba')]: [
          {
              label: t('Kharwagarha'),
              value: '12'
          },

          {
              label: t('Gattigarha'),
              value: '20'
          }, {
              label: t('Kinirkela'),
              value: '20'
          }, {
              label: t('Patiamba'),
              value: '20'
          },],


      [t('Konmerla')]: [{
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
          label: t('Baldega'),
          value: '23'
      }],



      [t('Lamdega')]: [{
          label: t('Baraibera'),
          value: '23'
      },

      {
          label: t('Bhitbuna'),
          value: '23',
      },


      {
          label: t('Hututuwa'),
          value: '23'
      },
      {
          label: t('Lamdega'),
          value: '23'
      }, {
          label: t('Parba lamdega'),
          value: '23'
      }
      ],



      [t('Tingina')]: [{
          label: t('Dhorhibahar'),
          value: '24'
      }, {
          label: t('Tikra'),
          value: '24'
      },

      {
          label: t('Tingina'),
          value: '23'
      },
      {
          label: t('Silinga'),
          value: '24'
      }],


      [t('Orga')]: [{
          label: t('Dhelsera'),
          value: '25'
      }, {
          label: t('Orga'),
          value: "25"
      }, {
          label: t('Sarubahar'),
          value: '25'
      }],



      [t('Parba')]: [{
          label: t('Dhingurpani'),
          value: '26'
      }, {
          label: t('Dhouranjan'),
          value: '28'
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
      }],



      [t('Tati')]: [{
          label: t('Hutubda'),
          value: '29'
      },
      {
          label: t('Turupdega'),
          value: '27'
      },
      {
          label: t('Barbera'),
          value: '27'
      }, {
          label: t('Phirka'),
          value: '27'
      }, {
          label: t('Tati'),
          value: '28'
      }, {
          label: t('Torian'),
          value: '29'
      }

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
      ]

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




  const buttonText = {
      state: t('Fill State'),
      district: t('Fill District'),
      tehsil: t('Fill Tehsil'),
      panchayat: t('Fill Panchayat'),
      village: t('Fill Village'),
  };

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
                          <View style={styles.name}>
                              <Text style={styles.nameTxt}>
                                  {name}

                                  {t('Select your location')}
                              </Text>
                          </View>
                          <View style={styles.horizontalLine} />
                      </View>
                      {/* <View style={styles.title}>
                          <Text style={styles.titleText}>{t('State')}</Text>
                      </View>
                      <Dropdown
                          visible={true}
                          data={states}
                          formik={formik}
                          variable={'state'}
                      /> */}
                      { (
                          <>
                              <View style={styles.title}>
                                  <Text style={styles.titleText}>{t('District')}</Text>
                              </View>
                              <Dropdown
                                  visible={true}
                                  data={
                                      []
                                  }
                                  formik={formik}
                                  variable={'district'}
                              />
                          </>
                      )}
                      {  (
                          <>
                              <View style={styles.title}>
                                  <Text style={styles.titleText}>{t('Tehsil')}</Text>
                              </View>
                              <Dropdown
                                  visible={true}
                                  data={
                                     []
                                  }
                                  formik={formik}
                                  variable={'tehsil'}
                              />
                          </>
                      )}
                      {/* {formik.values.tehsil !== '' && authLevel!="एसडीएलसी" && (
                          <>
                              <View style={styles.title}>
                                  <Text style={styles.titleText}>{t('Panchayat')}</Text>
                              </View>
                              <Dropdown
                                  visible={true}
                                  data={
                                      states
                                          .filter(item => item.label === formik.values.state)
                                          .map(item => {
                                              return item.Districts;
                                          })[0]
                                          .filter(item => item.label === formik.values.district)
                                          .map(item => {
                                              return item.Tehsils;
                                          })[0]
                                          .filter(item => item.label === formik.values.tehsil)
                                          .map(item => {
                                              return item.Panchayats;
                                          })[0]
                                  }
                                  formik={formik}
                                  variable={'panchayat'}
                              />
                          </>
                      )}
                      {formik.values.panchayat !== '' && authLevel!="एसडीएलसी"&& (
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
                      )} */}
                      <View style={styles.screen}>
                    <View style={styles.container}>
      <Text style={styles.text}>Active Claims : 0 </Text>
      <Text style={styles.text}>Submitted : 0 </Text>
      <Text style={styles.text}>Alerts : 0</Text>
      
    </View>                        
    </View>
      
                      <CustomError
                          visible={errorVisible}
                          setVisible={setErrorVisible}
                          errorText={t('Please fill all the fields')}
                          errors={formik.errors}
                          buttonText={buttonText}
                      />
                  </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
          </ScrollView>
      </ImageBackground>
  );
};

export default LocationInformationScreenSdlcs;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'cream',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderColor: 'white',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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
});

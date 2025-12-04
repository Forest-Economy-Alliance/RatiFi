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
  Pressable,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { BackHandler } from 'react-native';
import queue from 'react-native-job-queue';
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
import CustomNotification from '../../components/CustomNotification';
import { updateUserInfoAction } from '../../redux-store/actions/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { G } from 'react-native-svg';
import axios from 'axios';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { BASE_URL, request } from '../../services/APICentral';
const BG_IMG_PATH = require('../../assets/images/background.png');

const LocationScreen = ({ navigation }) => {
  const { typeOfClaim } = useSelector(state => state.entities.appUtil.appUtil);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const {
    name,
    panchayat,
    tehsil,
    statet,
    district,
    postLevel,
    authLevel,
    mobile,
  } = useSelector(state => state.entities.auth.userInfo?.profile);
  // console.log(authLevel=="एसडीएलसी");
  const route = useRoute();

  const { language } = useSelector(state => state.entities.appUtil.appUtil);

  const dispatch = useDispatch();
  const stateName = useSelector(state => state.entities.appUtil.appUtil.name);

  const state = {
    // state: '',
    district: '',
    subdivison: '',
    range: '',
    tehsil: '',
    panchayat: '',
    village: '',
  };

  const { t } = useTranslation();
  const appTranslation = t('app');
  const commonTranslation = t('common');
  const roleTranslation = t('role');
  const aboundaryTranslation = t('aboundary');

  const [errorVisible, setErrorVisible] = useState(false);
  const [panchayatInfoShow, setPanchayatInfoShow] = useState(false);

  const onNext = (values, formikActions) => {
    setPanchayatInfoShow(false);

    // alert(JSON.stringify(formik.values))
    formikActions.setSubmitting(false);
    // navigation.navigate('FRCHome');
    // return ;

    dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'globalSyncStatus',
        value: true,
      },
    });

    // check first if using those there are available or not

    if (typeOfClaim === 'CFR') {
      // check for role already exists
      request(`/check-avail?mobile=${mobile}`, {
        method: 'POST',
        data: {
          district: formik.values.district,
          subdivison: formik.values.subdivison,
          tehsil: formik.values.tehsil,
          panchayat: formik.values.panchayat,
          village: formik.values.village,
          range: formik.values.range,
          authLevel,
          postLevel,
        },
      })
        .then(res => {
          console.log('avail-response');

          if (res.data.success === true) {
            queue.addJob('UPDATELocationWorker', {
              state: 'झारखंड',
              district: formik.values.district,
              subdivison: formik.values.subdivison,
              tehsil: formik.values.tehsil,
              panchayat: formik.values.panchayat,
              village: formik.values.village,
              range: formik.values.range,
            });

            dispatch({ type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 4 });
            if (typeOfClaim === 'CFR') {
              const timer = setTimeout(() => {
                navigation.replace('HomeScreen');
                return () => {
                  clearTimeout(timer);
                };
              }, 2000);
            } else {
              navigation.navigate('HomeScreenIFR');
            }
          }
        })
        .catch(error => {
          dispatch({
            type: 'UPDATE_APPUTIL_KEY',
            payload: {
              key: 'globalSyncStatus',
              value: false,
            },
          });
          // role already exists

          console.log('avail-error', error);

          Alert.alert(
            commonTranslation.notice,
            appTranslation.already_assigned_role,
            [
              {
                text: commonTranslation.ok,
                // onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: commonTranslation.help,
                onPress: () => {
                  // link to whatsapp
                  const HttpURL = `https://wa.me/7870565464?text=${encodeURIComponent(
                    `JharFRA में पंजीकरण में मदद चाहिए - भूमिका पहले से ही पंजीकृत बताई जा रही है - District ${
                      formik.values.district
                    } | Subdivison - ${formik.values.subdivison} | ${
                      formik?.values?.range ? `${formik?.values?.range} | ` : ''
                    }  Block - ${formik?.values?.tehsil} | Panchayat - ${
                      formik?.values?.panchayat
                    } | Village - ${
                      formik?.values?.village
                    } | Level - ${authLevel} | Role - ${postLevel}`,
                  )}`;
                  console.log(HttpURL);
                  Linking.openURL(HttpURL);
                },
              },
            ],
          );
        })
        .finally(f => {
          // dispatch({
          //   type: 'UPDATE_APPUTIL_KEY',
          //   payload: {
          //     key: 'globalSyncStatus',
          //     value: false,
          //   },
          // });
        });
    } else {
      queue.addJob('UPDATELocationWorker', {
        state: 'झारखंड',
        district: formik.values.district,
        subdivison: formik.values.subdivison,
        tehsil: formik.values.tehsil,
        panchayat: formik.values.panchayat,
        village: formik.values.village,
        range: formik.values.range,
      });

      dispatch({ type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 4 });
      if (typeOfClaim === 'CFR') {
        navigation.replace('HomeScreen');
      } else {
        navigation.navigate('HomeScreenIFR');
      }
    }

    return;
  };

  const formik = useFormik({
    initialValues: state,
    // validationSchema: locSchema,
    onSubmit: onNext,
  });

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
    state: appTranslation.fill_state,
    district: appTranslation.fill_district,
    subdivison: appTranslation.fill_subdivison,
    tehsil: appTranslation.fill_tehsil,
    panchayat: appTranslation.fill_panchayat,
    village: appTranslation.fill_village,
    panchayatName: appTranslation.ok,
  };

  const goBack = () => {
    // Move to RoleScreen
    navigation.goBack();
  };

  const [DISTRICT, setDistrict] = useState('');
  const [districtData, setDistrictData] = useState([]);
  const [subDivisonData, setSubDivisionData] = useState([]);
  const [tehsilData, setTehsilData] = useState([]);
  const [panchayatData, setPanchanyatData] = useState([]);
  const [villageData, setVillageData] = useState([]);
  const [rangeData, setRangeData] = useState([]);

  useEffect(() => {
    console.log('CALL_BEGIN');
    const LAMBDA_URL =
      'https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=';

    const query = 'select distinct "district name" from jharfratable;';
    const url = LAMBDA_URL + encodeURIComponent(query);
    console.warn('URL', url);
    console.log('FFF', BASE_URL + '/lgd?q=' + url);
    const demoDropdownData = [
      {
        label: 'East Godavari',
        value: 'East Godavari',
      },
    ];
    setDistrictData(demoDropdownData);
    // axios
    //   .get(BASE_URL + '/lgd?q=' + url)
    //   .then(res => {
    //     console.log('res', res?.data);
    //     const dropdownData = [];

    //     res?.data?.data?.forEach(cell => {
    //       dropdownData?.push({
    //         label: cell['district name'],
    //         value: cell['district name'],
    //       });
    //     });
    //
    //     setDistrictData(dropdownData);
    //   })
    //   .catch(err => {
    //     console.log('DERROR', err);
    //   })
    //   .finally(f => {
    //     dispatch({
    //       type: 'UPDATE_APPUTIL_KEY',
    //       payload: {
    //         key: 'globalSyncStatus',
    //         value: false,
    //       },
    //     });
    //   });
  }, []);

  const handleShowDropdownOrNot = field => {
    if (authLevel === 'एसडीएलसी') {
      if (field === 'जिला' || field === 'अनुमंडल') {
        return true;
      } else {
        return false;
      }
    } else if (authLevel === 'डीएलसी') {
      if (field === 'जिला') {
        return true;
      } else {
        return false;
      }
    } else if (authLevel === 'एफआरसी') {
      return true;
    } else if (authLevel === 'राज्य स्तरीय निगरानी समिति') {
      return false;
    } else if (authLevel === 'भारसाधक  - वन विभाग (SDLC)') {
      if (field === 'जिला' || field === 'अनुमंडल') {
        return true;
      } else {
        return false;
      }
    } else if (authLevel === 'भारसाधक  - राजस्व विभाग (SDLC)') {
      if (field === 'जिला' || field === 'अनुमंडल' || field === 'प्रखंड') {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleShowNextButton = () => {
    if (authLevel === 'एसडीएलसी') {
      return Boolean(formik?.values?.subdivison !== '');
    } else if (authLevel === 'डीएलसी') {
      return Boolean(formik?.values?.district !== '');
    } else if (authLevel === 'एफआरसी') {
      return Boolean(formik?.values?.village !== '');
    } else if (authLevel === 'राज्य स्तरीय निगरानी समिति') {
      return Boolean(formik?.values?.district !== '');
    } else if (authLevel === 'भारसाधक  - वन विभाग (SDLC)') {
      return Boolean(formik?.values?.subdivison !== '');
    } else if (authLevel === 'भारसाधक  - राजस्व विभाग (SDLC)') {
      return Boolean(formik?.values?.tehsil !== '');
    }
  };
  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}
    >
      {editProfileMode ? (
        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
          <Pressable onPress={goBack}>
            <Text style={{ fontSize: 18 }}>
              <FontAwesome name="arrow-left" size={18} />{' '}
              {commonTranslation.back}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}
      <ScrollView style={styles.darkness}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <View style={styles.name}>
                <Text style={styles.nameTxt}>
                  {appTranslation.select_location}
                </Text>
              </View>
              {/* <Text>{authLevel}</Text> */}
              <View style={styles.horizontalLine} />
            </View>

            <View style={styles.title}>
              <Text style={styles.titleText}>
                {aboundaryTranslation.district}
              </Text>
            </View>
            {districtData?.length !== 0 ? (
              <Dropdown
                visible={true}
                data={districtData}
                formik={formik}
                variable={'district'}
                exec={val => {
                  setSubDivisionData([]);
                  formik?.setFieldValue('subdivison', '');
                  setTehsilData([]);
                  formik?.setFieldValue('tehsil', '');
                  setPanchanyatData([]);
                  formik?.setFieldValue('panchayat', '');
                  setVillageData([]);
                  formik?.setFieldValue('village', '');

                  const LAMBDA_URL =
                    'https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=';
                  const query2 = `SELECT distinct "subdivison" FROM jharfratable WHERE "district name" = '${val}'`;
                  const url2 = LAMBDA_URL + encodeURIComponent(query2);
                  console.warn('URL2', url2);

                  const demoDropdownData = [
                    {
                      label: 'Devipatnam',
                      value: 'Devipatnam',
                    },
                  ];
                  setSubDivisionData(demoDropdownData);

                  // axios
                  //   .get(BASE_URL + '/lgd?q=' + url2)
                  //   .then(rr => {
                  //     console.log('res->SUBDIVSION', rr?.data);
                  //     const d = [];

                  //     rr?.data?.data?.forEach(cell => {
                  //       d?.push({
                  //         label: cell['subdivison'],
                  //         value: cell['subdivison'],
                  //       });
                  //     });
                  //     console.warn('subdivison', d);
                  //     setSubDivisionData(d);
                  //   })
                  //   .catch(err => {
                  //     console.log(err);
                  //   })
                  //   .finally(f => {});
                }}
              />
            ) : (
              <ProgressBar
                indeterminate
                styleAttr="Horizontal"
                color="white"
                style={{ height: 30, width: 100, alignSelf: 'center' }}
              />
            )}

            {Boolean(
              formik?.values?.district !== '' &&
                handleShowDropdownOrNot('अनुमंडल'),
            ) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {aboundaryTranslation.subdivison}
                  </Text>
                </View>
                {subDivisonData?.length !== 0 ? (
                  <Dropdown
                    visible={true}
                    data={subDivisonData}
                    formik={formik}
                    variable={'subdivison'}
                    exec={val => {
                      setRangeData([]);
                      setTehsilData([]);
                      formik?.setFieldValue('tehsil', '');
                      setPanchanyatData([]);
                      formik?.setFieldValue('panchayat', '');
                      setVillageData([]);
                      formik?.setFieldValue('village', '');

                      const LAMBDA_URL =
                        'https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=';
                      const query3 = `SELECT distinct "${
                        authLevel === 'भारसाधक  - वन विभाग (SDLC)'
                          ? 'range'
                          : 'block name'
                      }" FROM jharfratable WHERE "district name" = '${
                        formik?.values?.district
                      }' AND "subdivison" = '${val}'  `;
                      console.warn(query3);
                      const url3 = LAMBDA_URL + encodeURIComponent(query3);
                      console.warn('URL3', url3);

                      const demoDropdownData = [
                        {
                          label: 'Devipatnam',
                          value: 'Devipatnam',
                        },
                      ];
                      setTehsilData(demoDropdownData);

                      // axios
                      //   .get(BASE_URL + '/lgd?q=' + url3)
                      //   .then(rr => {
                      //     console.log('res->BLOCK', rr?.data);
                      //     const d = [];
                      //     const rangeTempArray = [];
                      //     const occured = new Map();

                      //     rr?.data?.data?.forEach(cell => {
                      //       if (cell['block name']) {
                      //         d?.push({
                      //           label: cell['block name'],
                      //           value: cell['block name'],
                      //         });
                      //       }

                      //       if (cell['range'] && !occured.get(cell['range'])) {
                      //         rangeTempArray.push({
                      //           label: cell['range'],
                      //           value: cell['range'],
                      //         });
                      //         occured.set(cell['range'], true);
                      //       }
                      //     });
                      //     console.warn('DR-BLOCKS', d);
                      //     setTehsilData(d);

                      //     setRangeData(rangeTempArray);
                      //   })
                      //   .catch(err => {
                      //     console.log(err);
                      //   })
                      //   .finally(f => {
                      //     dispatch({
                      //       type: 'UPDATE_APPUTIL_KEY',
                      //       payload: {
                      //         key: 'globalSyncStatus',
                      //         value: false,
                      //       },
                      //     });
                      //   });
                    }}
                  />
                ) : (
                  <ProgressBar
                    indeterminate
                    styleAttr="Horizontal"
                    color="white"
                    style={{ height: 30, width: 100, alignSelf: 'center' }}
                  />
                )}
              </>
            )}

            {Boolean(
              formik?.values?.subdivison !== '' &&
                authLevel === 'भारसाधक  - वन विभाग (SDLC)',
            ) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {appTranslation.forest_area}
                  </Text>
                </View>
                {rangeData?.length !== 0 ? (
                  <Dropdown
                    visible={true}
                    data={rangeData}
                    formik={formik}
                    variable={'range'}
                    exec={val => {}}
                  />
                ) : (
                  <ProgressBar
                    indeterminate
                    styleAttr="Horizontal"
                    color="white"
                    style={{ height: 30, width: 100, alignSelf: 'center' }}
                  />
                )}
              </>
            )}

            {Boolean(
              formik?.values?.subdivison !== '' &&
                handleShowDropdownOrNot('प्रखंड'),
            ) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {aboundaryTranslation.block}
                  </Text>
                </View>
                {tehsilData?.length !== 0 ? (
                  <Dropdown
                    visible={true}
                    data={tehsilData}
                    formik={formik}
                    variable={'tehsil'}
                    exec={val => {
                      setPanchanyatData([]);
                      formik?.setFieldValue('panchayat', '');
                      setVillageData([]);
                      formik?.setFieldValue('village', '');

                      const LAMBDA_URL =
                        'https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=';
                      const query2 = `SELECT distinct "local body name" FROM jharfratable WHERE "district name" = '${formik?.values?.district}' AND "subdivison" = '${formik?.values?.subdivison}' AND "block name" ='${val}'  `;
                      const url2 = LAMBDA_URL + encodeURIComponent(query2);
                      console.warn('URL2', url2);
                      console.warn('PANCHAYAT', query2);

                      const demoDropdownData = [
                        {
                          label: 'Choppakonda',
                          value: 'Choppakonda',
                        },
                      ];
                      setPanchanyatData(demoDropdownData);

                      // axios
                      //   .get(BASE_URL + '/lgd?q=' + url2)
                      //   .then(rr => {
                      //     console.log('res->LOCAL_BODY', rr?.data);
                      //     const d = [];

                      //     rr?.data?.data?.forEach(cell => {
                      //       d?.push({
                      //         label: cell['local body name'],
                      //         value: cell['local body name'],
                      //       });
                      //     });
                      //     console.warn('DR-Panchayat', d);
                      //     setPanchanyatData(d);
                      //   })
                      //   .catch(err => {
                      //     console.log(err);
                      //   })
                      //   .finally(f => {
                      //     dispatch({
                      //       type: 'UPDATE_APPUTIL_KEY',
                      //       payload: {
                      //         key: 'globalSyncStatus',
                      //         value: false,
                      //       },
                      //     });
                      //   });
                    }}
                  />
                ) : (
                  <ProgressBar
                    indeterminate
                    styleAttr="Horizontal"
                    color="white"
                    style={{ height: 30, width: 100, alignSelf: 'center' }}
                  />
                )}
              </>
            )}

            {Boolean(
              formik?.values?.tehsil !== '' &&
                handleShowDropdownOrNot('पंचायत'),
            ) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {aboundaryTranslation.panchayat}
                  </Text>
                </View>
                {panchayatData?.length !== 0 ? (
                  <Dropdown
                    visible={true}
                    data={panchayatData}
                    formik={formik}
                    variable={'panchayat'}
                    exec={val => {
                      setVillageData([]);
                      formik?.setFieldValue('village', '');

                      const LAMBDA_URL =
                        'https://vukkgqofhd.execute-api.us-east-1.amazonaws.com/prod?query=';
                      const query2 = `SELECT distinct "village name" FROM jharfratable WHERE "district name" = '${formik?.values?.district}' AND "subdivison" = '${formik?.values?.subdivison}' AND "block name" ='${formik?.values?.tehsil}' AND "local body name"='${val}'`;
                      const url2 = LAMBDA_URL + encodeURIComponent(query2);
                      console.warn('URL2', url2);
                      console.warn('Q2', query2);

                      const demoDropdownData = [
                        {
                          label: 'Maddirathigudem',
                          value: 'Maddirathigudem',
                        },
                      ];
                      setVillageData(demoDropdownData);

                      // axios
                      //   .get(BASE_URL + '/lgd?q=' + url2)
                      //   .then(rr => {
                      //     console.log('res->village', rr?.data);
                      //     const d = [];

                      //     rr?.data?.data?.forEach(cell => {
                      //       d?.push({
                      //         label: cell['village name'],
                      //         value: cell['village name'],
                      //       });
                      //     });
                      //     console.warn('DR-VillGE', d);
                      //     setVillageData(d);
                      //   })
                      //   .catch(err => {
                      //     console.log(err);
                      //   })
                      //   .finally(f => {
                      //     dispatch({
                      //       type: 'UPDATE_APPUTIL_KEY',
                      //       payload: {
                      //         key: 'globalSyncStatus',
                      //         value: false,
                      //       },
                      //     });
                      //   });
                    }}
                  />
                ) : (
                  <ProgressBar
                    indeterminate
                    styleAttr="Horizontal"
                    color="white"
                    style={{ height: 30, width: 100, alignSelf: 'center' }}
                  />
                )}
              </>
            )}

            {Boolean(
              formik?.values?.panchayat !== '' &&
                handleShowDropdownOrNot('गाँव'),
            ) && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>
                    {aboundaryTranslation.village}
                  </Text>
                </View>
                {villageData?.length !== 0 ? (
                  <Dropdown
                    visible={true}
                    data={villageData}
                    formik={formik}
                    variable={'village'}
                  />
                ) : (
                  <ProgressBar
                    indeterminate
                    styleAttr="Horizontal"
                    color="white"
                    style={{ height: 30, width: 100, alignSelf: 'center' }}
                  />
                )}
              </>
            )}

            {Boolean(handleShowNextButton()) && (
              <CustomButton
                text={commonTranslation.next}
                onPress={() => {
                  if (formik.errors.state || formik.errors.district) {
                    console.log(formik.errors);
                    setErrorVisible(true);
                  }
                  formik.handleSubmit();
                  // Send Data to next screen
                }}
                style={{
                  ...styles.otpBtn,
                  marginTop: 20,
                }}
              />
            )}
            <CustomError
              visible={errorVisible}
              setVisible={setErrorVisible}
              errorText={commonTranslation.fill_all_the_fields}
              errors={formik.errors}
              buttonText={commonTranslation.next}
            />
            <Modal
              //   animationType="fade"
              transparent={true}
              visible={panchayatInfoShow}
            >
              <View style={styles.errorView}>
                <View style={styles.errorCard}>
                  <Text
                    style={styles.errorText}
                  >{`${appTranslation.chosen_panchayat} ${formik.values.panchayat}`}</Text>
                  <View style={styles.horizontalLineErr} />

                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      if (formik.errors.state || formik.errors.district) {
                        console.log(formik.errors);
                        setErrorVisible(true);
                      }
                      console.log(formik.errors, 'formik Errors');
                      formik.handleSubmit();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {commonTranslation.ok}
                    </Text>
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

export default LocationScreen;

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
    fontSize: 20,
    fontWeight: 'bold',
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

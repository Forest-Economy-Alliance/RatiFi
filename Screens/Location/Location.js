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
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import 'yup-phone';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';
import Dropdown from '../../components/CustomDropdown';
import {object, string} from 'yup';
import CustomError from '../../components/CustomError';

const BG_IMG_PATH = require('../../assets/images/background.png');
const LocationScreen = ({navigation}) => {
  const language = 'hi';
  const name = useSelector(state => state.entities.appUtil.appUtil.name);
  const state = {
    state: '',
    district: '',
    tehsil: '',
    panchayat: '',
    village: '',
  };

  const {t, i18n} = useTranslation();

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
    navigation.navigate('FRCHome');
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
      label: 'Jharkhand',
      value: '1',
      Districts: [
        {
          label: 'Simdega',
          value: '1',
          Tehsils: [
            {
              label: 'Bano',
              value: '1',
              Panchayats: [
                {
                  label: 'Banki',
                  value: '1',
                },
                {
                  label: 'Simhatu',
                  value: '2',
                },
                {
                  label: 'Konsode',
                  value: '3',
                },
              ],
              Villages: [
                {
                  label: 'Banki',
                  value: '1',
                },
                {
                  label: 'Boroseta',
                  value: '2',
                },
                {
                  label: 'Chotketunga',
                  value: '3',
                },
              ],
            },
            {
              label: 'Jaldega',
              value: '2',
              Panchayats: [
                {
                  label: 'Kutungia',
                  value: '1',
                },
                {
                  label: 'Patiamba',
                  value: '2',
                },
                {
                  label: 'Konmerla',
                  value: '3',
                },
                {
                  label: 'Jaldega',
                  value: '4',
                },
              ],
              Villages: [
                {
                  label: 'Ramjari',
                  value: '1',
                },
                {
                  label: 'Karimati',
                  value: '2',
                },
                {
                  label: 'Baldega',
                  value: '3',
                },
                {
                  label: 'Mahomdega',
                  value: '4',
                },
                {
                  label: 'Kharwagada',
                  value: '5',
                },
              ],
            },
            {
              label: 'Kolebira',
              value: '3',
              Panchayats: [
                {
                  label: 'Lachragarh',
                  value: '1',
                },
                {
                  label: 'Tutikel',
                  value: '2',
                },
                {
                  label: 'Eidega',
                  value: '3',
                },
                {
                  label: 'Nawatoli',
                  value: '4',
                },
              ],
              Villages: [
                {
                  label: 'Kombakra',
                  value: '1',
                },
                {
                  label: 'Sardhatoli',
                  value: '2',
                },
                {
                  label: 'Eidega',
                  value: '3',
                },
                {
                  label: 'Bhanwarpahari',
                  value: '4',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

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
                  {', '}
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
                      .filter(item => item.label === formik.values.state)
                      .map(item => {
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
                      .filter(item => item.label === formik.values.state)
                      .map(item => {
                        return item.Districts;
                      })[0]
                      .filter(item => item.label === formik.values.district)
                      .map(item => {
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
            {formik.values.panchayat !== '' && (
              <>
                <View style={styles.title}>
                  <Text style={styles.titleText}>{t('village')}</Text>
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
                        return item.Villages;
                      })[0]
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
              }}
              style={styles.otpBtn}
            />
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

/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import i18n from '../../assets/i18n/i18n';
import {updateUserInfoAction} from '../../redux-store/actions/auth';

i18n.t('Jharkhand');

const DATA = [
  {
    State: i18n.t('Jharkhand'),
    Districts: [
      {
        District: 'Simdega',
        Tehsils: [
          {
            Tehsil: 'Bano',
            Panchayats: [
              {
                Panchayat: 'Banki',
              },
              {
                Panchayat: 'Simhatu',
              },
              {
                Panchayat: 'Konsode',
              },
            ],
            Village: [
              {
                Village: 'Banki',
              },
              {
                Village: 'Boroseta',
              },
              {
                Village: 'Chotketunga',
              },
            ],
          },
          {
            Tehsil: 'Jaldega',
            Panchayats: [
              {
                Panchayat: 'Kutungia',
              },
              {
                Panchayat: 'Patiamba',
              },
              {
                Panchayat: 'Konmerla',
              },
              {
                Panchayat: 'Jaldega',
              },
            ],
            Village: [
              {
                Village: 'Ramjari',
              },
              {
                Village: 'Karimati',
              },
              {
                Village: 'Baldega',
              },
              {
                Village: 'Mahomdega',
              },
              {
                Village: 'Kharwagada',
              },
            ],
          },
          {
            Tehsil: 'Kolebira',
            Panchayats: [
              {
                Panchayat: 'Lachragarh',
              },
              {
                Panchayat: 'Tutikel',
              },
              {
                Panchayat: 'Eidega',
              },
              {
                Panchayat: 'Nawatoli',
              },
            ],
            Village: [
              {
                Village: 'Kombakra',
              },
              {
                Village: 'Sardhatoli',
              },
              {
                Village: 'Eidega',
              },
              {
                Village: 'Bhanwarpahari',
              },
            ],
          },
        ],
      },
    ],
  },
];

const LocationInformationScreen = ({navigation}) => {
  const {language} = useSelector(state => state.entities.appUtil.appUtil);

  const dispatch = useDispatch();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [village, setVillage] = useState('');
  const { namet, panchayatt, tehsilt, statet, districtt, postLevelt, authLevelt } = useSelector(state => state.entities.auth.userInfo?.profile);
  
  
  console.log(authLevelt)

  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [val3, setVal3] = useState('');
  const [val4, setVal4] = useState('');
  const [val5, setVal5] = useState('');

  const [err, setErr] = useState(0);
  const {t, i18n} = useTranslation();

  const [states, setStates] = useState([
    {
      State: t('Jharkhand'),
      value: '1',
    },
  ]);
  const [districts, setDistricts] = useState([
    {
      District: 'Simdega',
      value: '1',
    },
  ]);
  const [tehsils, sttTehsils] = useState([
    {
      Tehsil: 'Bano',
      value: '1',
    },
    {
      Tehsil: 'Jaldega',
      value: '2',
    },
    {
      Tehsil: 'Kolebira',
      value: '3',
    },
  ]);
  const [panchayats, setPanchayats] = useState([
    {
      Panchayat: 'Banki',
      value: '1',
    },
    {
      Panchayat: 'Simhatu',
      value: '2',
    },
    {
      Panchayat: 'Konsode',
      value: '3',
    },
    {
      Panchayat: 'Kutungia',
      value: '4',
    },
    {
      Panchayat: 'Patiamba',
      value: '5',
    },
    {
      Panchayat: 'Konmerla',
      value: '6',
    },
    {
      Panchayat: 'Jaldega',
      value: '7',
    },
    {
      Panchayat: 'Lachragarh',
      value: '8',
    },
    {
      Panchayat: 'Tutikel',
      value: '9',
    },
    {
      Panchayat: 'Eidega',
      value: '10',
    },
    {
      Panchayat: 'Nawatoli',
      value: '11',
    },
  ]);
  const [villages, setVillages] = useState(
    [
    {
      Village: 'Kombakra',
      value: '1',
    },
    {
      Village: 'Sardhatoli',
      value: '2',
    },
    {
      Village: 'Eidega',
      value: '3',
    },
    {
      Village: 'Bhanwarpahari',
      value: '4',
    },
    {
      Village: 'Ramjari',
      value: '5',
    },
    {
      Village: 'Karimati',
      value: '6',
    },
    {
      Village: 'Baldega',
      value: '7',
    },
    {
      Village: 'Mahomdega',
      value: '8',
    },
    {
      Village: 'Kharwagada',
      value: '9',
    },
    {
      Village: 'Kombakra',
      value: '10',
    },
    {
      Village: 'Sardhatoli',
      value: '11',
    },
    {
      Village: 'Eidega',
      value: '12',
    },
    {
      Village: 'Bhanwarpahari',
      value: '13',
    },
  ]);

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        {/* <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={states}
          search={false}
          maxHeight={300}
          labelField="State"
          valueField="value"
          placeholder={t('state')}
          searchPlaceholder="Search..."
          value={val1}
          onChange={item => {
            console.log(item);
            setVal1(item.value);
            setState(item.State);
          }}
          dropdownPosition="bottom"
        /> */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={districts}
          search={false}
          maxHeight={300}
          labelField="District"
          valueField="value"
          placeholder={t('district')}
          searchPlaceholder="Search..."
          value={val2}
          onChange={item => {
            console.log(item);
            setVal2(item.value);
            setDistrict(item.District);
          }}
          dropdownPosition="bottom"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={tehsils}
          search={false}
          maxHeight={300}
          labelField="Tehsil"
          valueField="value"
          placeholder={t('tehsil/block')}
          searchPlaceholder="Search..."
          value={val3}
          onChange={item => {
            console.log(item);
            setVal3(item.value);
            setTehsil(item.Tehsil);
          }}
          dropdownPosition="bottom"
        />
        {authLevelt!="एसडीएलसी" &&        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={panchayats}
          search={false}
          maxHeight={300}
          labelField="Panchayat"
          valueField="value"
          placeholder={t('panchayat')}
          searchPlaceholder="Search..."
          value={val4}
          onChange={item => {
            console.log(item);
            setVal4(item.value);
            setPanchayat(item.Panchayat);
          }}
          dropdownPosition="bottom"
        />}
        {authLevelt!="एसडीएलसी" &&<Dropdown
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
          placeholder={t('village')}
          searchPlaceholder="Search..."
          value={val5}
          onChange={item => {
            console.log(item);
            setVal5(item.value);
            setVillage(item.Village);
          }}
          dropdownPosition="bottom"
        />}

        
        {err === 1 ? (
          <Text style={styles.error}>{t('Fill all the fields')}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (
              state === '' ||
              district === '' ||
              tehsil === '' ||
              panchayat === '' ||
              village === ''
            ) {
              console.log(state, district, tehsil, panchayat, village);
              setErr(1);
            } else {
              console.log(state, district, tehsil, panchayat, village);
              dispatch(
                updateUserInfoAction(
                  {
                    state: state,
                    district: district,
                    tehsil: tehsil,
                    panchayat: panchayat,
                    village: village,
                  },
                  args => {
                    if (args) {
                      navigation.navigate('RoleInformation');
                    }
                  },
                ),
              );
            }
          }}>
          <Text style={styles.nextButtonText}>{t('next')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LocationInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: '15%',
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
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nextButtonText: {
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

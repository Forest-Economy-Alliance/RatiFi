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

console.log(i18n.t('Jharkhand'));

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
  const language = 'hi';
  const dispatch = useDispatch();
  const statue = useSelector(state => state.entities.auth);
  console.log('HI');
  console.log(statue);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [village, setVillage] = useState('');

  const [err, setErr] = useState(0);
  const {t, i18n} = useTranslation();

  const [states, setStates] = useState([
    {
      State: t('Jharkhand'),
    },
  ]);
  const [districts, setDistricts] = useState([
    {
      District: 'Simdega',
    },
  ]);
  const [tehsils, sttTehsils] = useState([
    {
      Tehsil: 'Bano',
    },
    {
      Tehsil: 'Jaldega',
    },
    {
      Tehsil: 'Kolebira',
    },
  ]);
  const [panchayats, setPanchayats] = useState([
    {
      Panchayat: 'Banki',
    },
    {
      Panchayat: 'Simhatu',
    },
    {
      Panchayat: 'Konsode',
    },
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
  ]);
  const [villages, setVillages] = useState([
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
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={states}
          search
          maxHeight={300}
          labelField="State"
          placeholder={t('state')}
          searchPlaceholder="Search..."
          value={state}
          onChange={item => {
            console.log(item);
            setState(item.value?.State);
          }}
          dropdownPosition="bottom"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={districts}
          search
          maxHeight={300}
          labelField="District"
          placeholder={t('district')}
          searchPlaceholder="Search..."
          value={district}
          onChange={item => {
            console.log(item);
            setDistrict(item.value?.District);
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
          search
          maxHeight={300}
          labelField="Tehsil"
          placeholder={t('tehsil/block')}
          searchPlaceholder="Search..."
          value={tehsil}
          onChange={item => {
            console.log(item);
            setDistrict(item.value?.Tehsil);
          }}
          dropdownPosition="bottom"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={panchayats}
          search
          maxHeight={300}
          labelField="Panchayat"
          placeholder={t('panchayat')}
          searchPlaceholder="Search..."
          value={panchayat}
          onChange={item => {
            console.log(item);
            setDistrict(item.value?.Panchayat);
          }}
          dropdownPosition="bottom"
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={villages}
          search
          maxHeight={300}
          labelField="Village"
          placeholder={t('village')}
          searchPlaceholder="Search..."
          value={village}
          onChange={item => {
            console.log(item);
            setDistrict(item.value?.Panchayat);
          }}
          dropdownPosition="bottom"
        />
        {err === 1 ? (
          <Text style={styles.error}>{t('Fill all the fields')}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            dispatch(
              updateUserInfoAction(
                {
                  state: 'Jharkhand',
                  district: 'Simdega',
                  tehsil: 'Bano',
                  panchayat: 'Banki',
                  village: 'Kombakra',
                },
                args => {
                  if (args) {
                    navigation.navigate('RoleInformation');
                  }
                },
              ),
            );
          }}
        >
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

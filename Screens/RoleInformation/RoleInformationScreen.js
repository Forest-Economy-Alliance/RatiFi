import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
import {updateUserInfoAction} from '../../redux-store/actions/auth';

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

const RoleInformationScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [idType, setIdType] = useState('');
  const [role, setRole] = useState('');
  const [pos, setPos] = useState('');

  const [err, setErr] = useState(0);

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const ROLES = [
    {label: 'FRC', value: '1'},
    {label: 'SDLC', value: '2'},
    {label: 'DLC', value: '3'},
  ];

  const POS1 = [
    {label: t('President'), value: '1'},
    {label: t('Secretary'), value: '2'},
    {label: t('Member'), value: '3'},
  ];
  const POS2 = [
    {label: t('Subdivisonal Officer'), value: '1'},
    {label: t('Tehsildar'), value: '2'},
    {label: t('Forest Range Officer'), value: '3'},
    {label: t('Member'), value: '3'},
  ];
  const POS3 = [
    {label: t('District Collector'), value: '1'},
    {label: t('District Forest Officer'), value: '2'},
    {label: t('Officer-in-Charge (Tribal Affairs)'), value: '3'},
    {label: t('Member'), value: '4'},
  ];

  const IDENTIFICATION = [
    {label: 'Aadhar Card', value: '1'},
    {label: 'Government ID', value: '2'},
  ];

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>{t('finish registration')}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={ROLES}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t('specify your membership')}
          searchPlaceholder="Search..."
          value={role}
          onChange={item => {
            setRole(item.value);
          }}
          renderItem={renderItem}
        />
        <Text style={styles.subtitle}>(FRC/SDLC/DLC)</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={role === '1' ? POS1 : role === '2' ? POS2 : POS3}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t('specify your role')}
          searchPlaceholder="Search..."
          value={pos}
          onChange={item => {
            setPos(item.value);
          }}
          renderItem={renderItem}
        />
        <Text style={styles.subtitle}>
          (FRC: [President or Secretary] SDLC: [SDM or RO or Tehsildar] DLC:DC,
          DFO or DTWO)
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={IDENTIFICATION}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t('identity card type')}
          searchPlaceholder="Search..."
          value={idType}
          onChange={item => {
            setIdType(item.value);
          }}
          renderItem={renderItem}
        />
        <Text style={styles.subtitle}>(AADHAR or GOVT ID)</Text>
        <TextInput
          style={styles.inputConfPass}
          placeholder={t('identity card number')}
          placeholderTextColor="#480E09"
          onChangeText={text => {
            setId(text);
          }}
          value={id}
        />
        {err === 1 ? (
          <Text style={styles.error}>{t('Fill all the fields')}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            if (id === '' || idType === '' || role === '' || pos === '') {
              setErr(1);
            } else {
              setErr(0);
              dispatch(
                updateUserInfoAction(
                  {
                    authLevel: 1, //Integer, enums will be there
                    postLevel: 2, //Integer
                    identificationProofType: 2, // Integers
                    identificationProofNumber: 'EFSFDFSDFS', // String
                  },
                  args => {
                    if (args) navigation.navigate('DownloadPDF');
                  },
                ),
              );
            }
          }}
        >
          <Text style={styles.nextButtonText}>{t('next')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RoleInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '10%',
  },
  dropdown: {
    marginTop: '5%',
    height: '8%',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    width: '100%',
    padding: '4%',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#480E09',
  },
  placeholderStyle: {
    fontSize: 20,
    color: '#480E09',
  },
  selectedTextStyle: {
    fontSize: 20,
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
  subtitle: {
    fontSize: 14,
    color: '#480E09',
    marginBottom: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: '#606489',
  },
  inputPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  inputConfPass: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
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

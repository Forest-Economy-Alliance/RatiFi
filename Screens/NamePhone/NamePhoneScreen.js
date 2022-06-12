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
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectLanguage} from '../../slices/userSlice';
import PhoneInput from 'react-native-phone-number-input';

const NamePhoneScreen = ({navigation}) => {
  const language = useSelector(selectLanguage);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const phoneInput = useRef(null);

  const [pressed, setPressed] = useState(false);

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
        <TextInput
          style={styles.inputName}
          placeholder={t('name')}
          placeholderTextColor="#480E09"
          onChangeText={text => {
            setName(text);
          }}
          value={name}
        />
        <PhoneInput
          ref={phoneInput}
          placeholder={t('phone/mobile')}
          placeholderTextColor="#480E09"
          defaultCode="IN"
          layout="second"
          containerStyle={styles.inputPhone}
          textInputStyle={styles.inputPhoneText}
          textContainerStyle={styles.inputPhoneTextContainer}
          codeTextStyle={styles.inputPhoneCodeText}
          countryPickerButtonStyle={styles.inputPhoneCountryPickerButton}
          onChangeFormattedText={text => {
            setPhoneNumber(text);
          }}
        />
        {/* get otp button */}
        {!pressed && (
          <TouchableOpacity
            onPress={() => {
              setPressed(true);
            }}
            style={styles.getOtpButton}>
            <Text style={styles.getOtpButtonText}>{t('get otp')}</Text>
          </TouchableOpacity>
        )}
        {pressed && (
          <View style={styles.afterOTP}>
            <Text style={styles.afterOTPText}>
              {t('OTP sent to your mobile !!')}
            </Text>
            <TextInput
              style={styles.inputOTP}
              placeholder={t('ENTER OTP')}
              placeholderTextColor="#480E09"
              onChangeText={text => {
                setPhoneNumber(text);
              }}
              value={phoneNumber}
            />
            {/* two buttons */}
            <TouchableOpacity style={styles.resendOtpButton} onPress={() => {}}>
              <Text style={styles.resendOtpButtonText}>{t('resend otp')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.verifyOtpButton}
              onPress={() => {
                navigation.navigate('Password');
              }}>
              <Text style={styles.verifyOtpButtonText}>{t('verify otp')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default NamePhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: '15%',
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
});

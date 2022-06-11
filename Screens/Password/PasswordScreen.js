import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../../slices/userSlice';
import PhoneInput from 'react-native-phone-number-input';

const NamePhoneScreen = ({ navigation }) => {
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { t, i18n } = useTranslation();

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    style={styles.inputPass}
                    placeholder={t('password')}
                    placeholderTextColor="#480E09"
                    onChangeText={text => {
                        setPassword(text);
                    }}
                    value={password}
                />
                <TextInput
                    style={styles.inputConfPass}
                    placeholder={t('confirm password')}
                    placeholderTextColor="#480E09"
                    onChangeText={text => {
                        setConfirmPassword(text);
                    }}
                    value={confirmPassword}
                />
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        if (password === confirmPassword) {
                            navigation.navigate('LocationInformation');
                        } else {
                            alert('Password does not match');
                        }
                    }}
                >
                    <Text style={styles.nextButtonText}>{t('next')}</Text>
                </TouchableOpacity>
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
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
    },
    nextButtonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 20,
    }
});

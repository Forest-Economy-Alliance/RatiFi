import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../../slices/userSlice';

const NamePhoneScreen = () => {
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = React.useState('en');

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
                    style={styles.inputName}
                    placeholder={t('name')}
                    placeholderTextColor="#480E09"
                    placeholderStyle={styles.placeholder}
                    onChangeText={text => {
                        setName(text);
                    }}
                    value={name}
                />
                <TextInput
                    style={styles.inputName}
                    placeholder={t('phone/mobile')}
                    placeholderTextColor="#480E09"
                    placeholderStyle={styles.placeholder}
                    onChangeText={text => {
                        setPhone(text);
                    }}
                    value={phone}
                />
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
        justifyContent: 'center',
        padding: '15%',
    },
    inputName: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        width: '100%',
        fontSize: 30,
        color: '#480E09',
    },
});

import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../../slices/userSlice';

const NamePhoneScreen = () => {
    const language = useSelector(selectLanguage);
    const dispatch = useDispatch();

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
        <View style={styles.container}>
            <Text style={styles.text}>
                {
                    t('name')
                }
            </Text>
        </View>
    );
};

export default NamePhoneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#480E09'
    }
});

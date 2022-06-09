import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from "react-native";
import i18n from "./assets/i18n/i18n";
import { Dropdown } from 'react-native-element-dropdown';

const Profile = ({ route, navigation }) => {

    const { language } = route.params;
    console.log(language);

    const { t, i18n } = useTranslation();

    const [currentLanguage, setLanguage] = useState('hi');

    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => setLanguage(value))
            .catch(err => console.log(err));
    };

    // changeLanguage(language);
    useEffect(() => {
        changeLanguage(language);
    }, [language]);
    // console.log(currentLanguage);

    // const myIcon = <Icon name="rocket" size={30} color="#900" />
    const [username, setUserName] = useState("");
    // console.log(username);
    const [password, setPassword] = useState("");
    // console.log(password);
    const [phone, setPhone] = useState("");
    // console.log(password);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const internet = [
        { label: 'yes', value: 'yes' },
        { label: 'no', value: 'no' }
    ];

    const submit = () => {
    }

    return (
        <ImageBackground source={require('./S3.png')} style={styles.image}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('name')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={username}
                        onChangeText={(text) => setUserName(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('Password')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('phone')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={internet}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={t('Internet')}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignContent: "center",
        // alignItems: "center",
        alignSelf: "center",
        padding: 10,
        justifyContent: "center",
        backgroundColor: '#fff',
        // padding: 20,

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    labels: {
        fontSize: 20,
        color: "#000",
        fontWeight: '200',
        marginTop: "5%",
        lineHeight: 23,
        fontFamily: 'regular',
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 1,
        paddingHorizontal: 15,
        paddingVertical: 7,
        fontFamily: 'regular',
        fontSize: 18,
        color: '#fff',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "30%",
    },
    wrapperText: {
        fontSize: 14,
        color: "#fff",
        marginRight: 10,
        paddingRight: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 1,
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginTop: "5%",
    },
});

export default Profile;
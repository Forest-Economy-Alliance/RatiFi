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

const Info = ({ route, navigation }) => {

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
    const [role, setRole] = useState("");
    // console.log(username);
    const [status, setStatus] = useState("");
    // console.log(password);
    const [id, setID] = useState("");
    // console.log(password);
    const [id_number, setIDNumber] = useState("");
    // console.log(password);
    const [token, setToken] = useState("");
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
                        {t('role')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={role}
                        onChangeText={(text) => setRole(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('status')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={status}
                        onChangeText={(text) => setStatus(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('id')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={id}
                        onChangeText={(text) => setID(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('id_number')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={id_number}
                        onChangeText={(text) => setIDNumber(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('token')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={token}
                        onChangeText={(text) => setToken(text)}
                    />
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        alignSelf: "center",
        padding: 10,
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
});

export default Info;
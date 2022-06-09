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

const Location = ({ route, navigation }) => {

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
    const [district, setDistrict] = useState("");
    // console.log(username);
    const [varstate, setVarState] = useState("");
    // console.log(password);
    const [tehsil, setTehsil] = useState("");
    // console.log(password);
    const [panchayat, setPanchayat] = useState("");
    // console.log(password);
    const [village, setVillage] = useState("");
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
                        {t('state')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={varstate}
                        onChangeText={(text) => setVarState(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('district')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={district}
                        onChangeText={(text) => setDistrict(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('tehsil')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={tehsil}
                        onChangeText={(text) => setTehsil(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('panchayat')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={panchayat}
                        onChangeText={(text) => setPanchayat(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}>
                        {t('village')}
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={village}
                        onChangeText={(text) => setVillage(text)}
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

export default Location;
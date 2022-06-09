import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from "react-native";
import i18n from "./assets/i18n/i18n";
import { useTranslation } from 'react-i18next';

// import { BottomSheet } from 'react-native-btr';

const Language = ["hi", "or", "en"];
const Display = ["हिंदी", "ଓଡ଼ିଆ", "English"];
const DisplayLangDict = {
    "hi": "हिंदी",
    "or": "ଓଡ଼ିଆ",
    "en": "English",
}

export default function Login({ navigation }) {

    // const myIcon = <Icon name="rocket" size={30} color="#900" />

    var selLanguage = "be";

    const submit = (language) => {
        // console.log(language);
        selLanguage = language;
        // console.log(selLanguage);
        navigation.navigate("Info", { language: `${selLanguage}` }); // navigate to Home screen
        Alert.alert("Redirection to Info Page")
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./S3.png')} style={styles.image}>
                <FlatList
                    data={Language}
                    style={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(language) => {
                        return (
                            <View style={styles.listItem}>
                                {/* <Text>{animal.item}</Text> */}
                                <TouchableOpacity style={styles.button} onPress={() => submit(language.item)} >
                                    <Text style={styles.buttonText}>{DisplayLangDict[language.item]}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        width: "50%",
        marginTop: "40%",
        marginBottom: "100%",
        alignContent: "center",
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
    },
    listItem: {
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomColor: "#fc0303",
        textAlign: "center",
        borderColor: "#333",
        padding: 25,
    },
});
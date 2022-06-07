import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    Button,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Dropdown } from 'react-native-element-dropdown';
import { BottomSheet, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { BottomSheet } from 'react-native-btr';

const data = [
    { label: 'FRC', value: 'frc' },
    { label: 'STLC', value: 'stlc' },
    { label: 'DLC', value: 'dlc' },
];


export default function Login() {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [language, setLanguage] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    const [isVisible, setVisible] = useState(true);
    const languages = [
        { 
            title: 'Odiya',
            onPress: () => {
                setLanguage('Odiya');
                setVisible(false);
                Alert.alert('Odiya');
            }
        },
        { 
            title: 'Hindi' ,
            onPress: () => {
                setLanguage('Hindi');
                setVisible(false);
                Alert.alert('Hindi');
            }
        },
        {
            title: 'Back',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setVisible(false),
        },
    ]

    // const myIcon = <Icon name="rocket" size={30} color="#900" />

    return (
        <View style={styles.container}>
            {/* <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={styles.bottomSheet}>
                    <Text style={styles.bottomSheetText}>
                        This is the bottom sheet
                    </Text>
                </View>
            </BottomSheet> */}
            <ImageBackground style={styles.image} source={require("./Forest.jpg")}>
                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Please Enter Full Name"
                        placeholderTextColor="#003f5c"
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <View style={styles.dropdownContainer}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Role'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity style={styles.languageButton} onPress={() => setVisible(true)} >
                        <Icon name="globe" size={50} color="#fff"/>
                    </TouchableOpacity>
                    <BottomSheet modalProps={{}} isVisible={isVisible}>
                        {languages.map((l, i) => (
                            <ListItem
                                key={i}
                                containerStyle={l.containerStyle}
                                onPress={l.onPress}
                            >
                                <ListItem.Content>
                                    <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </BottomSheet>
                </View>

            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
    },

    image: {
        // marginBottom: 40,
        height: "100%",
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
    },

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginTop: 20,
        textAlign: "center",
        alignItems: "center",
        alignSelf: "center",
    },

    TextInput: {
        // height: 50,
        flex: 1,
    },

    forgot_button: {
        height: 30,
        marginTop: 30,
        alignSelf: "center",
        backgroundColor: "#fff",
        color: "#003f5c",
        fontSize: 16,
        padding: 5,
        borderRadius: 15,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 40,
        backgroundColor: "#fff",
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
    buttonText: {
        fontSize: 18,
    },
    loginText: {
        fontSize: 18,
        color: "#003f5c",
    },
    dropdown: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 8,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: "center",
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
    },
    selectedTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: "center",
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    dropdownContainer: {
        marginTop: 20,
        alignSelf: "center",
        alignContent: "center",
        backgroundColor: "#fff",
        width: "80%",
        borderRadius: 25,
        height: 45,
        justifyContent: "center",
    },
    languageButton: {
        width: "25%",
        borderRadius: 25,
        marginLeft: "75%",
        height: 50,
        backgroundColor: "transparent",
        marginTop: 100,
    },
});
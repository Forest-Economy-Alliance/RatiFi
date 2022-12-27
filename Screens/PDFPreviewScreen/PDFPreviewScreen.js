import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, Image, Text, Dimensions } from "react-native"
import Pdf from 'react-native-pdf';

const BG_IMG_PATH = require('../../assets/images/background.png');

export const PDFPreviewScreen = (props) => {

    const route = useRoute();

    return <ImageBackground
        source={BG_IMG_PATH}
        resizeMode="cover"
        blurRadius={10}
        style={styles.bg}>

        <Image
            source={{ uri: route?.params?.url }}
            style={{
                height: '100%',
                width: '100%',
                resizeMode: 'cover'
            }}
        />






    </ImageBackground>
}

const styles = StyleSheet.create({
    bg: {
        // flex: 1,
        height: '100%',
        width: '100%',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
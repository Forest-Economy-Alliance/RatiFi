import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, Dimensions } from "react-native"
import Pdf from 'react-native-pdf';

const BG_IMG_PATH = require('../../assets/images/background.png');

export const PDFPreviewScreen = (props) => {

    const route=useRoute();


    

    return <ImageBackground
        source={BG_IMG_PATH}
        resizeMode="cover"
        blurRadius={10}
        style={styles.bg}>


        <Pdf
            trustAllCerts={false}
            source={{ uri:route?.params?.url
              , cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log(error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}

            style={styles.pdf}
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
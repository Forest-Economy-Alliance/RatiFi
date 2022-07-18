import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {t} from 'i18next';

const languages = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'हिन्दी',
    value: 'hi',
  },
  {
    name: 'ગુજરાતી',
    value: 'gu',
  },
  {
    name: 'ଓଡ଼ିଆ',
    value: 'or',
  },
  {
    name: 'ಕನ್ನಡ',
    value: 'kn',
  },
  {
    name: 'മലയാളം',
    value: 'ml',
  },
  {
    name: 'தமிழ்',
    value: 'ta',
  },
  {
    name: 'తెలుగు',
    value: 'te',
  },
];
const BG_IMG_PATH = require('../../assets/images/background.png');
const LangSelectionScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.entities.auth.userInfo);
  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View style={styles.darkness}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Select your language')}</Text>
          <View style={styles.horizontalLine} />
        </View>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.value}
              onPress={() => {
                // updating screen registration code  to 1 , means we have choosed the lanuage
                dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 1});
                if(!token)
                {
                  navigation.navigate("NamePhone")
                }else
                navigation.navigate('Login');
              }}
              style={styles.button}>
              <Text style={styles.text}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default LangSelectionScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
  darkness: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  button: {
    padding: '4%',
    borderWidth: 1,
    marginTop: '7%',
    borderColor: '#fff',
    borderRadius: 70,
    width: '40%',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: '20%',
    marginHorizontal: '10%',
  },
  headerText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
  horizontalLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    marginTop: '10%',
    marginBottom: '10%',
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {useState} from 'react';

const BG_IMG_PATH = require('../../assets/images/background.png');
const ClaimTypeSelectionScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.entities.auth.userInfo);
  const {t, i18n} = useTranslation();

  const [userType, setUserType] = useState('');

  const route = useRoute();

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => null)
      .catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage('hi');
    console.log('ooooo->', route?.params?.isMember);
  }, []);

  const claimTypes = [
    {
      name: t('CFR'),
      value: 'cfr',
    },
    {
      name: t('IFR'),
      value: 'ifr',
    },
  ];
  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View style={styles.darkness}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Select your claim')}</Text>
          <View style={styles.horizontalLine} />
        </View>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          {claimTypes.map(lang => (
            <TouchableOpacity
              key={lang.value}
              onPress={() => {
                //
                // const isMemeber = route?.params?.isMember;

               
                const loginMode = route?.params?.loginMode;
                if (lang?.value === 'ifr') {
                  dispatch({type: 'UPDATE_TYPE_OF_CLAIM', payload: 'IFR'});
                  navigation.navigate(
                    loginMode ? 'HomeScreenIFR' : 'IFRDownloadPDF',
                  );
                } else {
                  dispatch({type: 'UPDATE_TYPE_OF_CLAIM', payload: 'CFR'});
                  navigation.navigate(loginMode ? 'HomeScreen' : 'Role');
                }
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

export default ClaimTypeSelectionScreen;

const styles = StyleSheet.create({
  innerContainer: {
    // flexGrow: 1,
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
    minWidth: '50%',
    borderWidth: 1,
    marginTop: '7%',
    borderColor: '#fff',
    borderRadius: 70,
    // width: '40%',
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

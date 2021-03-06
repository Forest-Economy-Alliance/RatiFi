import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const DownloadPDFScreen = ({navigation}) => {
  const language = 'hi';
  const dispatch = useDispatch();
  const [role, setRole] = useState('FRC');
  const [gramSabha, setGramSabha] = useState('');
  const [pressed, setPressed] = useState(false);

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  const imgUrls = {
    ambepadar:
      'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324247/Map1_oqd9eg.png',
    dayaltung:
      'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324264/Map2_iq3jyc.png',
    telarai:
      'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324257/Map3_h8wi6y.png',
    pedawara:
      'https://res.cloudinary.com/df2q7cryi/image/upload/v1655324266/Map4_f5zkou.png',
  };

  return (
    // flexWrap: 'wrap',
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{role}</Text>
        </View>
        <TextInput
          style={styles.inputGramSabha}
          placeholder={t('gram sabha')}
          placeholderTextColor="#480E09"
          onChangeText={text => {
            setGramSabha(text);
          }}
          value={gramSabha}
        />
        <TouchableOpacity
          style={styles.getDocsButton}
          onPress={() => {
            setPressed(true);
          }}
        >
          <Text style={styles.getDocsButtonText}>{t('get documents')}</Text>
        </TouchableOpacity>
        {pressed && (
          <>
            <View style={styles.msgContainer}>
              <Text style={styles.msg}>
                {imgUrls[gramSabha]
                  ? t('your forest map is available')
                  : t('your_forest_map_is_not_available')}
              </Text>
              {imgUrls[gramSabha] && (
                <Image
                  source={{uri: imgUrls[gramSabha]}}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              )}
            </View>
            <Text style={styles.subMsg}>
              {t('download application document')}
            </Text>
            {pressed && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  navigation.navigate('FormsPage');
                }}
              >
                <Text style={styles.nextButtonText}>{t('download')}</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DownloadPDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '10%',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    backgroundColor: '#D3F2D3',
    alignSelf: 'flex-end',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C8CCC8',
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '5%',
    color: '#480E09',
  },
  inputGramSabha: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  nextButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nextButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  getDocsButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  getDocsButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  msgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8CCC8',
    marginTop: '10%',
    padding: '5%',
  },
  msg: {
    fontSize: 20,
    color: '#480E09',
    textAlign: 'center',
  },
  subMsg: {
    fontSize: 20,
    color: '#480E09',
    textAlign: 'center',
    marginTop: '5%',
  },
});

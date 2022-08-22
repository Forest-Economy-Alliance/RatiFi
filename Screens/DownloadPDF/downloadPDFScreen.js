import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import { AllVillages } from '../../constants/Villages';
import CustomButton from '../../components/CustomButton';

const BG_IMG_PATH = require('../../assets/images/background.png');
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
  const [val5, setVal5] = useState('');
  const [village, setVillage] = useState('');
  const [gramSabha, setGramSabha] = useState('');
  const [pressed, setPressed] = useState(false);
  const [villages,setVillages]=useState(AllVillages);
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
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
  <View style={{paddingHorizontal:20}}>
    
  
          
        <View style={styles.roleContainer}>
       
          <Text style={styles.roleText}> <FontAwesome name="user-circle-o" size={30}/> </Text>
        </View>
      
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={villages}
          search={false}
          maxHeight={300}
          labelField="Village"
          valueField="value"
          placeholder={t('gram sabha')}
          searchPlaceholder="Search..."
          value={val5}
          onChange={item => {
            console.log(item);
            setVal5(item.value);
            setVillage(item.Village);
          }}
          dropdownPosition="bottom"
        />



       <CustomButton onPress={() => {
            setPressed(true);
          }}
        button={{width:200}}
        dsbled={val5 ? false :true}
          >
       {t('get documents')}
       </CustomButton>
    
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
              <CustomButton
              disabled={true}
                button={{marginTop:20}}
              onPress={() => {
                navigation.navigate('FormsPage');
              }}>
                  {t('download')}
              </CustomButton>
            )}
          </>
        )}

</View>
    
    </ImageBackground>
  );
};

{/* <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  navigation.navigate('FormsPage');
                }}
              >
                <Text style={styles.nextButtonText}>{t('download')}</Text>
              </TouchableOpacity> */}

export default DownloadPDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '20%',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop:'5%',
    marginBottom: '5%',
    backgroundColor: '#D3F2D3',
    alignSelf: 'flex-end',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C8CCC8',
    // paddingHorizontal:20
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
  dropdown: {
    margin: '5%',
    height: '8%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 25,
    color: '#480E09',
  },
  selectedTextStyle: {
    fontSize: 25,
    color: '#480E09',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
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
  bg: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
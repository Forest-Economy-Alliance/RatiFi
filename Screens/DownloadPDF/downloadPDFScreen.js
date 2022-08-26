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
import { useTranslation } from 'react-i18next';
import '../../assets/i18n/i18n';
import React, { useEffect, useState } from 'react';
// import {Dropdown} from 'react-native-element-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { AllVillages } from '../../constants/Villages';
import CustomButton from '../../components/CustomButton';
import Dropdown from '../../components/CustomDropdown';
import { useFormik } from 'formik';
const BG_IMG_PATH = require('../../assets/images/background.png');
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DownloadPDFScreen = ({ navigation }) => {


  const vil = useSelector(state => state.entities.auth.userInfo.profile.village);

  const language = 'hi';
  const dispatch = useDispatch();
  const [role, setRole] = useState('FRC');
  const [val5, setVal5] = useState('');
  const [village, setVillage] = useState('');
  const [gramSabha, setGramSabha] = useState('');
  const [pressed, setPressed] = useState(false);
  const [villages, setVillages] = useState(AllVillages);
  const { t, i18n } = useTranslation();

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


  const data1 = [
    {
      label: 'AADHAR',
      value: '1',
    },
    {
      label: 'GOVERNMENT ID',
      value: '2',
    },
  ];

  const states = [
    {
      label: t('Jharkhand'),
      value: '1',
      Districts: [
        {
          label: t('Samdega'),
          value: '1',
          Tehsils: [
            {
              label: t('Bano'),
              value: '1',
              Panchayats: [
                {
                  label: t('Bano'),
                  value: '1',
                },
                {
                  label: t('Simhatu'),
                  value: '2',
                },
                {
                  label: t('Konsode'),
                  value: '3',
                },
                {
                  label:t('Bintuka'),
                  value:'4'
                },
                {
                  label:t('Kanarowan'),
                  value:'5'
                },
                {
                  label:t('Pabura'),
                  value:'6'
                },
                {
                  label:t('Soy'),
                  value:'7'
                },
                {
                  label:t('Konsode'),
                  value:'8'
                },
                {
                  label:t('Beraergi'),
                  value:'9'
                },
                {
                  label:t('Banki'),
                  value:'10'
                },
                {
                  label:t('Barkaduel'),
                  value:'11'
                },
                {
                  label:t('Ukauli'),
                  value:'12'
                },{
                  label:t('Dumariya'),
                  value:'13'
                },
                {
                  label:t('Sahubera'),
                  value:'14'
                },
                {
                  label:t('Jamtai'),
                  value:'15'
                },
                {
                  label:t('Raikera'),
                  value:'16'
                },
                {
                  label:t('Genmer'),
                  value:'17'
                },
             
              ],
              Villages: [
                {
                  label: t('Bano'),
                  value: '1',
                },
                {
                  label:t('Samdega'),
                  value:'1'
                },
                {
                  label:t('Karkatta'),
                  value:'4'
                },
                {
                  label:t('Bintuka'),
                  value:'4'
                },
                {
                  label:t('Jamursoya'),
                  value:'4'
                },
                {
                  label:t('Kewetang'),
                  value:'4'
                },
                {
                  label:t('Turyu'),
                  value:'4'
                },
                {
                  label:t('Pangur'),
                  value:'4'
                },
                {
                  label:t('Jarakel'),
                  value:'5'
                },
                {
                  label:t('Baromda'),
                  value:'5'
                },{
                  label:t('Jambera'),
                  value:'5'
                },{
                  label:t('Barbera'),
                  value:'5'
                },{
                  label:t('Bumbalda'),
                  value:'6'
                },{
                  label:t('Jamang'),
                  value:'6'
                },{
                  label:t('Pabura'),
                  value:'6'
                },
                {
                  label:t('Soy'),
                  value:'7'
                },{
                  label:t('Barbera'),
                  value:'7'
                },{
                  label:t('Ella'),
                  value:'7'
                },{
                  label:t('Kauwajor'),
                  value:'7'
                },{
                  label:t('Mahabuang'),
                  value:'7'
                },{
                  label:t('Sijang'),
                  value:'7'
                },
                {
                  label:t('Unikel'),
                  value:'7'
                },{
                  label:t('Bujaga'),
                  value:'8'
                },{
                  label:t('Kuruchdega'),
                  value:'8'
                },
                {
                  label:t('Chhotketunga'),
                  value:'8'
                },{
                  label:t('Jaldega'),
                  value:'8'
                },
                {
                  label:t('Virta'),
                  value:'8'
                },
                {
                  label:t('Bandu'),
                  value:'2'
                },{
                  label:t('Boroseta'),
                  value:'2'
                },{
                  label:t('Jamtoli'),
                  value:'2'
                },{
                  label:t('Ketka'),
                  value:'2'
                },
                {
                  label:t('Simhatu'),
                  value:'2'
                },
                {
                  label:t('Beraergi'),
                  value:'9'
                },
                {
                  label:t('Buruergi'),
                  value:'9'
                },
                {
                  label:t('Olhan'),
                  value:'9'
                },
                {
                  label:t('Sumingbera'),
                  value:'9'
                },
                {
                  label:t('Vinjhamarcha'),
                  value:'9'
                },
                {
                  label:t('Rabbai'),
                  value:'9'
                },{
                  label:t('Sutriuli'),
                  value:'9'
                },{
                  label:t('Helgara'),
                  value:'10'
                },
                {
                  label:t('Banki'),
                  value:'10'
                },
                {
                  label:t('Kanaroya'),
                  value:'10'
                },
                {
                  label:t('Pado'),
                  value:'10'
                },{
                  label:t('Badkaduel'),
                  value:'11'
                },{
                  label:t('Barerpa'),
                  value:'11'
                },{
                  label:t('Chhotkaduel'),
                  value:'11'
                },{
                  label:t('Kudrum'),
                  value:'11'
                },{
                  label:t('Lamgarh'),
                  value:'11'
                },{
                  label:t('Maimsora'),
                  value:'11'
                },{
                  label:t('Navagaon'),
                  value:'11'
                }
                ,{
                  label:t('Chaklabasa'),
                  value:'12'
                },
                ,{
                  label:t('Chaklabasa'),
                  value:'12'
                },{
                  label:t('Sora'),
                  value:'12'
                },{
                  label:t('Buruhonjar'),
                  value:'12'
                },{
                  label:t('Chorbandu'),
                  value:'12'
                },{
                  label:t('Sotasoya'),
                  value:'13'
                },{
                  label:t('Sahubera'),
                  value:'14'
                },
                {
                  label:t('Jamtai'),
                  value:'15'
                },{
                  label:t('Bokamara'),
                  value:'14'
                },{
                  label:t('Hurda'),
                  value:'15'
                },{
                  label:t('Kohipath'),
                  value:'15'
                },{
                  label:t('Kewengutu'),
                  value:'15'
                },{
                  label:t('Jorobari'),
                  value:'15'
                },{
                  label:t('Jorponda'),
                  value:'15'
                },{
                  label:t('Birhuli'),
                  value:'16'
                },
                {
                  label:t('Kanta'),
                  value:'16'
                },
                {
                  label:t('Marani'),
                  value:'16'
                },
                {
                  label:t('Raikera'),
                  value:'16'
                },
                {
                  label:t('Tembro'),
                  value:'16'
                },
                
                {
                  label:t('Genmer'),
                  value:'17'
                },
               
                {
                  label:t('Chandsai'),
                  value:'17'
                },
                {
                  label:t('Gerda'),
                  value:'17'
                },
                {
                  label:t('Khijurbahar'),
                  value:'17'
                },{
                  label:t('Toniya'),
                  value:'17'
                },
               
               
              ],
            },
            {
              label: t('Jaldega'),
              value: '2',
              Panchayats: [
                {
                  label:t('Jaldega'),
                  value:'18'
                },
                {
                  label:t('Kutungiya'),
                  value:'19'
                },
                {
                  label:t('Kharwagarha'),
                  value:'20'
                },
                {
                  label:t('Konmerla'),
                  value:'21'
                },{
                  label:t('Lamboi'),
                  value:'22'
                }
                ,{
                  label:t('Lamdega'),
                  value:'23'
                },{
                  label:t('Tingina'),
                  value:'24'
                },{
                  label:t('Orga'),
                  value:'25'
                },{
                  label:t('Parba'),
                  value:'26'
                },{
                  label:t('Tati'),
                  value:'27'
                },
              ],
              Villages: [
                {
                  label:t('Jamtoli'),
                  value:'18'
                },
                {
                  label:t('Pahantoli'),
                  value:'18'
                },{
                  label:t('Mahomdega'),
                  value:'18'
                },
                {
                  label:t('Sawanjara'),
                  value:'18'
                },
                {
                  label:t('Ramjari'),
                  value:'19'
                },{
                  label:t('Minjurgarha'),
                  value:'19'
                },
                {
                  label:t('Minjurgarha'),
                  value:'19'
                },{
                  label:t('Kharwagarha'),
                  value:'20'
                },{
                  label:t('Gattigarha'),
                  value:'20'
                },{
                  label:t('Kinirkela'),
                  value:'20'
                },{
                  label:t('Patiamba'),
                  value:'20'
                },{
                  label:t('Dumarbera'),
                  value:'21'
                },{
                  label:t('Gangutoli'),
                  value:'21'
                },{
                  label:t('Badkitanger'),
                  value:'21'
                },{
                  label:t('Konmerla'),
                  value:'21'
                },{
                  label:t('Kolomdega'),
                  value:'21'
                },{
                  label:t('Tilaijara'),
                  value:'22'
                },{
                  label:t('Harrapnai'),
                  value:'22'
                },{
                  label:t('Karmapani'),
                  value:'22'
                },{
                  label:t('Bendojara'),
                  value:'22'
                },{
                  label:t('Lomboi Mahua Toli'),
                  value:'22'
                },
                {
                  label:t('Basaer'),
                  value:'22'
                },{
                  label:t('Mama Bhagina'),
                  value:'22'
                },{
                  label:t('Bhitbuna'),
                  value:'23',
                },{
                  label:t('Baraibera'),
                  value:'23'
                },{
                  label:t('Hututuwa'),
                  value:'23'
                },
                {
                  label:t('Lamdega'),
                  value:'23'
                },{
                  label:t('Parba lamdega'),
                  value:'23'
                },{
                  label:t('Dhorhibahar'),
                  value:'24'
                },{
                 label:t('Tikra'),
                 value:'24' 
                },{
                  label:t('Silinga'),
                  value:'24'
                },{
                  label:t('Dhelsera'),
                  value:'25'
                },{
                  label:t('Dhelsera'),
                  value:'25'
                },{
                  label:t('Orga'),
                  value:"25"
                },{
                  label:t('Sarubahar'),
                  value:'25'
                },{
                  label:t('Parba'),
                  value:'26'
                },{
                  label:t('Dhingurpani'),
                  value:'26'
                },{
                  label:t('Dhouranhan'),
                  value:'26'
                },{
                  label:t('Kouwadarha'),
                  value:'26'
                },{
                  label:t('Lachhanpur'),
                  value:'26'
                },{
                  label:t('Siharmunda'),
                  value:'26'
                },{
                  label:t('Sukhajhariya'),
                  value:'26'
                },{
                  label:t('Mangaspur'),
                  value:'26'
                },{
                  label:t('Bendosera'),
                   value:'26'
                },{
                  label:t('Janoda'),
                  value:'26'
                },{
                  label:t('Jundih'),
                  value:'26'
                },{
                  label:t('Bhanvarchawa'),
                  value:'26'
                },{
                  label:t('Tati'),
                  value:'27'
                },{
                  label:t('Hutubada'),
                  value:'27'
                },
                {label:t('Turupdega'),
                value:'27'},
                {
                  label:t('Barbera'),
                  value:'27'
                },{
                  value:t('Toniya'),
                  value:'27'
                },
              ],
            },
            {
              label: t('Kolebira'),
              value: '3',
              Panchayats: [
                {
                  label: t('Ransiya'),
                  value: '28',
                },{
                  label:t('Shapur'),
                  value:'29'
                },{
                  label:t('Agharma'),
                  value:'30'
                },{
                  label:t('Kolebira'),
                  value:'31'
                },{
                  label:t('Nawatoli'),
                  value:'32'
                },{
                  label:t('Domtoli'),
                  value:'33'
                },{
                  label:t('Bandarchuan'),
                  value:'34'
                },{
                  label:t('Tutikel'),
                  value:'35'
                },{
                  label:t('Eidega'),
                  value:'36'
                },{
                  label:t('Barsloya'),
                  value:'37'
                },{
                  label:t('Lachragarh'),
                  value:'38'
                }
              ],
              Villages: [
                {
                  label: t('Bokba'),
                  value: '28',
                },
                {
                  label: t('Bongram'),
                  value: '28',
                },
                {
                  label: t('Keyondpani'),
                  value: '28',
                },
                {
                  label:t('Kinbira'),
                  value:'28'
                },{
                  label:t('Sirikonde Kera'),
                  value:'28'
                },{
                  label:t('Takba'),
                  value:'28'
                },{
                  label:t('Shapur'),
                  value:'29'
                },{
                  label:t('Kombakera'),
                  value:'29'
                },{
                  label:t('Konjoba'),
                  value:'29'
                },{
                  label:t('Dumardih'),
                  value:'30'
                },{
                  label:t('Jurkela'),
                  value:'30'
                },{
                  label:t('Karamtoli'),
                  value:'30'
                },{
                  label:t('Larba'),
                  value:'30'
                },{
                  label:t('Shivnathpur'),
                  value:'30'
                
                },{
                  label:t('Tangertoli'),
                  value:'30'
                },{
                  label:t('Jamtoli'),
                  value:'31'
                },{
                  label:t('Kunderdega'),
                  value:'31'
                },{
                  label:t('Bhanwarpahari'),
                  value:'32'
                },{
                  label:t('Bhanwarpahari'),
                  value:'32'
                
                },{
                  label:t('Nawatoli'),
                  value:'32'
                },{
                  label:t('Saraipani'),
                  value:'32'
                
                },{
                  label:t('Sarangapani'),
                  value:'32'
                
                },{
                  label:t('Machka'),
                  value:'32'
                },{
                  label:t('Sundratoli'),
                  value:'32'
                },{
                  label:t('Barwadih'),
                  value:'33'
                
                },{
                  label:t('Ghansilari'),
                  value:'33'
                },{
                  label:t('Tainsera'),
                  value:'33'
                },{
                  label:t('Bandarchuwan'),
                  value:'34'
                },{
                  label:t('Besrajara'),
                  label:'34'
                },{
                  label:t('Selsoya'),
                  label:'34'
                },{
                  label:t('Setasoya'),
                  value:'34'
                },{
                  label:t('Sardhatoli'),
                  value:'35'
                },{
                  label:t('Jhapla'),
                  value:'35'
                },{
                  label:t('Sokorla'),
                  value:'35'
                }
                ,{
                  label:t('Tutikel'),
                  value:'35'
                },
                ,{
                  label:t('Eidega'),
                  value:'36'
                },{
                  label:t('Kudabera'),
                  value:'36'
                },{
                  label:t('Kalhatoli'),
                  value:'36'
                },{
                  label:t('Pogloya'),
                  value:'36'
                },{
                  label:t('Ramjari'),
                  value:'36'
                },{
                  label:t('Barasloya'),
                  value:'37'
                },{
                  label:t('Barketunga'),
                  value:'37'
                },{
                  label:t('Kulasoya'),
                  value:'37'
                }
                ,{
                  label:t('Sijang'),
                  value:'37'
                },{
                  label:t('Kombakra'),
                  value:'38'
                },{
                  label:t('Lachragarh'),
                  value:'38'
                }
              ],
            },
          ],
        },
      ],
    },
  ];


  const villagesData=(states[0].Districts[0].Tehsils[0].Panchayats);

// console.log(districts);


  // const uidSchema = object().shape({
  //   type: string().required(t('Identity Card Type is Required')),
  //   uid: string().required(t('UID is Required')),
  // });

  const formik = useFormik({
    // initialValues: state,
    // validationSchema: uidSchema,
    // onSubmit: onNext,
  });




  return (
    // flexWrap: 'wrap',
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <View style={{ paddingHorizontal: 20 }}>



        <View style={styles.roleContainer}>
          <Text style={styles.roleText}> <FontAwesome name="user-circle-o" size={30} /> </Text>
        </View>


        {/* <Dropdown
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
        /> */}


        <Dropdown
          
          downloadPDFScreenFix={setVal5}
          visible={true}
          data={villagesData}
          formik={formik}
          variable={'type'}
        />


        <CustomButton onPress={() => {
          setPressed(true);
        }}
          button={{ width: 200,marginTop:20 }}
          dsbled={val5 ? false : true}
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
                  source={{ uri: imgUrls[gramSabha] }}
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
                button={{ marginTop: 20 }}
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
    marginTop: '5%',
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
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import Button from '../../components/CustomButton';
import FormSaveLocationPicker from '../../components/FormSaveLocationPicker';
import Form1Jharkhand from '../../utility/Form1_Jharkhand';
import Form2Jharkhand from '../../utility/Form2_Jharkhand';
import Form3Jharkhand from '../../utility/Form3_Jharkhand';
import Form4Jharkhand from '../../utility/Form4_Jharkhand';
import Form5Jharkhand from '../../utility/Form5_Jharkhand';
import Form6Jharkhand from '../../utility/Form6_Jharkhand';
import Form7Jharkhand from '../../utility/Form7_Jharkhand';
import Form8Jharkhand from '../../utility/Form8_Jharkhand';
import Form9Jharkhand from '../../utility/Form9_Jharkhand';
import Form10Jharkhand from '../../utility/Form10_Jharkhand';
import Form11Jharkhand from '../../utility/Form11_Jharkhand';
import Form12Jharkhand from '../../utility/Form12_Jharkhand';
import Form13Jharkhand from '../../utility/Form13_Jharkhand';
import Form14Jharkhand from '../../utility/Form14_Jharkhand';
import Form15Jharkhand from '../../utility/Form15_Jharkhand';
import Form16Jharkhand from '../../utility/Form16_Jharkhand';
import Form17Jharkhand from '../../utility/Form17_Jharkhand';
import Form18Jharkhand from '../../utility/Form18_Jharkhand';
import Form19Jharkhand from '../../utility/Form19_Jharkhand';
import {useTranslation} from 'react-i18next';
import * as Progress from 'react-native-progress';
import * as ScopedStorage from 'react-native-scoped-storage';
const BG_IMG_PATH = require('../../assets/images/background.png');

import DownloadLoader from '../../components/DownloadLoader';
import CustomButton from '../../components/CustomButton';

const FormsPage = ({navigation}) => {
  const {t} = useTranslation();
  const [progress, setProgress] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.entities.auth.userInfo);
  const {formSaveDir} = useSelector(state => state.entities.appUtil.appUtil);

  const getDistrict = () => t(profile?.district);
  const getPanchayat = () => t(profile?.panchayat);
  const getTehsil = () => t(profile?.tehsil);
  const getVillage = () => t(profile?.village);

  const [activeSlide, setActiveSlide] = useState(0);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write the pdf');
      } else {
        console.log('External Storage permission denied');
      }
      return true;
    } catch (err) {
      console.warn(err);
      requestPermission();
      return false;
    }
  };
  if (!formSaveDir) {
    requestPermission();
    return <FormSaveLocationPicker />;
  }
  const carouselItems = [
    {
      title: 'Form 1',
      form: new Form1Jharkhand(
        [getVillage(), getPanchayat(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page1_Jharkhand.jpg'),
    },
    {
      title: 'Form 2',
      form: new Form2Jharkhand(
        [getPanchayat(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page2_Jharkhand.png'),
    },
    {
      title: 'Form 3',
      form: new Form3Jharkhand(
        [getPanchayat(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page3_Jharkhand.png'),
    },
    {
      title: 'Form 4',
      form: new Form4Jharkhand(
        [getPanchayat(), getTehsil(), getDistrict(), '      ', '      '],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page4_Jharkhand.png'),
    },
    {
      title: 'Form 5',
      form: new Form5Jharkhand(
        [getTehsil(), getVillage(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page5_Jharkhand.png'),
    },
    {
      title: 'Form 6',
      form: new Form6Jharkhand(
        [[getVillage(), getPanchayat(), getTehsil(), getDistrict()]],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page6_Mangal.png'),
    },
    {
      title: 'Form 7',
      form: new Form7Jharkhand(
        [getVillage(), getPanchayat(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page7_Mangal.png'),
    },
    {
      title: 'Form 8',
      form: new Form8Jharkhand(
        [getVillage(), getPanchayat(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page8_Jharkhand.png'),
    },
    {
      title: 'Form 9',
      form: new Form9Jharkhand(null, ['none']),
      imageName: require('../../assets/images/FormPreviews/Page9_Jharkhand.png'),
    },
    {
      title: 'Form 10',
      form: new Form10Jharkhand(null, null),
      imageName: require('../../assets/images/FormPreviews/Page10_Jharkhand.png'),
    },
    {
      title: 'Form 11',
      form: new Form11Jharkhand(null, null),
      imageName: require('../../assets/images/FormPreviews/Page11_Jharkhand.png'),
    },
    {
      title: 'Form 12',
      form: new Form12Jharkhand(null, null),
      imageName: require('../../assets/images/FormPreviews/Page12_Jharkhand.png'),
    },
    {
      title: 'Form 13',
      form: new Form13Jharkhand([getTehsil()], null),
      imageName: require('../../assets/images/FormPreviews/Page13_Jharkhand.png'),
    },
    {
      title: 'Form 14',
      form: new Form14Jharkhand([getTehsil()], null),
      imageName: require('../../assets/images/FormPreviews/Page14_Jharkhand.png'),
    },
    {
      title: 'Form 15',
      form: new Form15Jharkhand(
        [getTehsil(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page15_Jharkhand.png'),
    },
    {
      title: 'Form 16',
      form: new Form16Jharkhand(
        [getTehsil(), getTehsil(), getDistrict()],
        null,
      ),
      imageName: require('../../assets/images/FormPreviews/Page16_Jharkhand.png'),
    },
    {
      title: 'Form 17',
      form: new Form17Jharkhand([getTehsil()], null),
      imageName: require('../../assets/images/FormPreviews/page17_Mangal.png'),
    },
    {
      title: 'Form 18',
      form: new Form18Jharkhand([getVillage(), getTehsil()], null),
      imageName: require('../../assets/images/FormPreviews/page18_Mangal.png'),
    },
    {
      title: 'Form 19',
      form: new Form19Jharkhand([getTehsil(), getTehsil()], null),
      imageName: require('../../assets/images/FormPreviews/Page19_Jharkhand.png'),
    },
  ];

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 5,
          marginLeft: 25,
          marginRight: 25,
          elevation: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={item.imageName}
          style={{width: '80%', height: '80%'}}
          resizeMode="contain"
        />
      
      </View>
    );
  };

  const generatePDF = async (obj, name) => {
    // if (requestPermission()) {
    // file location returned by the createPDF
    // replace the '' empty string with directory info if you want to any directory
    await obj.createPDF('DD', name);
    // alert(location);
    // } else {
    // console.log('NO PERMISSION');
    // }
  };

  return (
  
       <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>

   
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 10,
          }}
        >
          <Carousel
            data={carouselItems}
            sliderWidth={350}
            itemWidth={350}
            renderItem={_renderItem}
            onSnapToItem={index => setActiveSlide(index)}
          />
        </View>
      </View>
      <View style={{paddingVertical: 20}}>
        <Button
          onPress={async () => {
            setProgress(0.009);
            for (const key of carouselItems) {
              const response = await generatePDF(key.form, key.title);
              setProgress(e => e + 1 / 19);
            }
            setProgress(0);
            toast.show(`सभी पीडीएफ ${formSaveDir} फ़ोल्डर में सहेजे गए`, {
              type: 'success',
              animationType: 'zoom-in',
              successColor: '#480E09',
              placement: 'top',
              duration: 8000,
            });
          }}
        >
           Download Forms
        </Button>
        <CustomButton style={{marginTop:10}} onPress={()=>{
          navigation.navigate("FRCHome")
        }}>
          Apply Claim 
        </CustomButton>
      </View>
      {progress != 0 ? (
        <DownloadLoader>
          <View>
            <Progress.Pie
              progress={progress}
              size={40}
              color="#480E09"
              style={{alignSelf: 'center', marginBottom: 10}}
            />
            <Text>{t('Please wait')}...</Text>
          </View>
        </DownloadLoader>
      ) : null}

</ImageBackground>
 
  );
};

export default FormsPage;

const styles=StyleSheet.create({
  bg: {
    // flex: 1,
    height: '100%',
    width: '100%',
  }
})
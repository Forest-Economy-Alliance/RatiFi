import {
  Text,
  View,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  Button,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
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

// import {
//   getDistrict,
//   getPanchayat,
//   getTehsil,
//   getVillage,
// } from '../../slices/userSlice';

const FormsPage = ({navigation}) => {
  const {t} = useTranslation();
  const {profile} = useSelector(state => state.entities.auth.userInfo);
  console.log(profile);
  console.log(t(profile?.district));
  const getDistrict = () => t(profile?.district);
  const getPanchayat = () => t(profile?.panchayat);
  const getTehsil = () => t(profile?.tehsil);
  const getVillage = () => t(profile?.village);
  const [activeSlide, setActiveSlide] = useState(0);

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
      form: async () =>
        new Form3Jharkhand([getPanchayat(), getTehsil(), getDistrict()], null),
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

  requestPermission = async () => {
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
      return false;
    }
  };

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
        <Button
          title={'Download ' + item.title}
          onPress={() => {
            generatePDF(item.form, item.title);
          }}
        />
      </View>
    );
  };

  const generatePDF = async (obj, name) => {
    if (this.requestPermission()) {
      // file location returned by the createPDF
      // replace the '' empty string with directory info if you want to any directory
      let location = await obj.createPDF('', name);
      // alert(location.filePath);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{color: 'black'}}>
          {' '}
          {'(experimental)\n'} Form {activeSlide}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Carousel
          data={carouselItems}
          sliderWidth={350}
          itemWidth={350}
          renderItem={_renderItem}
          onSnapToItem={index => setActiveSlide(index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default FormsPage;

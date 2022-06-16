import {
  Text,
  View,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, {Component} from 'react';
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

import {
  getDistrict,
  getPanchayat,
  getTehsil,
  getVillage,
} from '../../slices/userSlice';

class FormsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Form 1',
          callback: async () => {
            let obj = Form1Jharkhand(
              [getVillage(), getPanchayat(), getTehsil(), getDistrict()],
              null,
            );
            this.generatePDF(obj, 'Form1_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page1_Jharkhand.jpg'),
        },
        {
          title: 'Item 2',
          callback: async () => {
            let obj = Form2Jharkhand(
              [getPanchayat(), getTehsil(), getDistrict()],
              null,
            );
            this.generatePDF(obj, 'Form2_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page2_Jharkhand.png'),
        },
        {
          title: 'Item 3',
          callback: async () => {
            let obj = Form3Jharkhand(
              [getPanchayat(), getTehsil(), getDistrict()],
              null,
            );
            this.generatePDF(obj, 'Form3_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page3_Jharkhand.png'),
        },
        {
          title: 'Item 4',
          callback: async () => {
            let obj = Form4Jharkhand(
              [getPanchayat(), getTehsil(), getDistrict(), '      ', '      '],
              null,
            );
            this.generatePDF(obj, 'Form4_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page4_Jharkhand.png'),
        },
        {
          title: 'Item 5',
          callback: async () => {
            let obj = Form5Jharkhand(
              [getTehsil(), getVillage(), getDistrict()],
              null,
            );

            await this.generatePDF(obj, 'Form5_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page5_Jharkhand.png'),
        },
        {
          title: 'Item 6',
          callback: async () => {
            let obj = Form6Jharkhand(
              [[getVillage(), getPanchayat(), getTehsil(), getDistrict()]],
              null,
            );
            await this.generatePDF(obj, 'Form6_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page6_Mangal.png'),
        },
        {
          title: 'Item 7',
          callback: async () => {
            let obj = Form7Jharkhand([
              [getVillage(), getPanchayat(), getTehsil(), getDistrict()]
            ], null);
            await this.generatePDF(obj, 'Form7_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page7_Mangal.png'),
        },
        {
          title: 'Item 8',
          callback: async () => {
            let obj = Form8Jharkhand([[getVillage(), getPanchayat(), getTehsil(), getDistrict()]], null);
            await this.generatePDF(obj, 'Form8_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page8_Jharkhand.png'),
        },
        {
          title: 'Item 9',
          callback: async () => {
            let obj = Form9Jharkhand(null, ["none"]);
            await this.generatePDF(obj, 'Form9_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page9_Jharkhand.png'),
        },
        {
          title: 'Item 10',
          callback: async () => {
            let obj = Form10Jharkhand(null, null);
            await this.generatePDF(obj, 'Form10_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page10_Jharkhand.png'),
        },
        {
          title: 'Item 11',
          callback: async () => {
            let obj = Form11Jharkhand(null, null);
            await this.generatePDF(obj, 'Form11_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page11_Jharkhand.png'),
        },
        {
          title: 'Item 12',
          callback: async () => {
            let obj = Form12Jharkhand(null, null);
            await this.generatePDF(obj, 'Form12_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page12_Jharkhand.png'),
        },
        {
          title: 'Item 13',
          callback: async () => {
            let obj = Form13Jharkhand([getTehsil()], null);
            await this.generatePDF(obj, 'Form13_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page13_Jharkhand.png'),
        },
        {
          title: 'Item 14',
          callback: async () => {
            let obj = Form14Jharkhand([getTehsil()], null);
            await this.generatePDF(obj, 'Form14_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page14_Jharkhand.png'),
        },
        {
          title: 'Item 15',
          callback: async () => {
            let obj = Form15Jharkhand([getTehsil(),getTehsil(),getDistrict()], null);
            await this.generatePDF(obj, 'Form15_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page15_Jharkhand.png'),
        },
        {
          title: 'Item 16',
          callback: async () => {
            let obj = Form16Jharkhand([getTehsil(),getTehsil(),getDistrict()], null);
            await this.generatePDF(obj, 'Form16_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page16_Jharkhand.png'),
        },
        {
          title: 'Item 17',
          callback: () => {
            let obj = Form17Jharkhand([getTehsil()], null);
            this.generatePDF(obj, 'Form17_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/page17_Mangal.png'),
        },
        {
          title: 'Item 18',
          callback: () => {
            let obj = Form18Jharkhand([getVillage(), getTehsil()], null);
            this.generatePDF(obj, 'Form18_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/page18_Mangal.png'),
        },
        {
          title: 'Item 19',
          callback: () => {
            let obj = Form19Jharkhand([getTehsil(),getTehsil()], null);
            this.generatePDF(obj, 'Form19_Jharkhand');
          },
          imageName: require('../../assets/images/FormPreviews/Page19_Jharkhand.png'),
        },
      ],
    };
  }
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

  _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 5,
          marginLeft: 25,
          marginRight: 25,
          padding: 10,
          elevation: 5,
        }}>
        <Image
          source={item.imageName}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
    );
  };

  async generatePDF(obj, name) {
    if (this.requestPermission()) {
      let location = await obj.createPDF('', name);
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white', paddingTop: 50}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}> Page {this.state.activeIndex}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Carousel
            ref={ref => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={350}
            itemWidth={350}
            renderItem={this._renderItem}
            onSnapToItem={index => this.setState({activeIndex: index})}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default FormsPage;

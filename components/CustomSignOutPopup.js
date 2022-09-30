import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import i18n from '../assets/i18n/i18n';
import CustomButton from './CustomButton';

export default function CustomSignOutPopup(props) {

  if(!props.vis){
    return null;
  }


  return (
    <Modal transparent>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: height / 2.25,
            flexDirection: 'column',
            padding: 10,
            borderRadius: 10,
          }}>
          {/* <ActivityIndicator color={'black'} /> */}
          <View>
          <Text
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              paddingLeft: 10,
              borderRadius: 12,
              color: 'black',
            }}>
            {i18n.t('Are you sure, you want to sign out?')}
          
          </Text>
          </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:15,marginBottom:10}}>

        
          <TouchableOpacity onPress={()=>props.signout()}>
            <Text style={{color:'#480E09',borderWidth:1,padding:5,paddingHorizontal:10,borderRadius:10}}>YES</Text>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={()=>props.setVis(false)}>
            <Text style={{color:'#480E09',borderWidth:1,padding:5,paddingHorizontal:10,borderRadius:10}}>NO</Text>
          </TouchableOpacity>


          </View>
        </View>
        
      </View>
    </Modal>
  );
}

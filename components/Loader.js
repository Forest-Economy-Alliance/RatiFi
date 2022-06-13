import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
const {height, width} = Dimensions.get('window');

export default function Loader() {
  return (
    <Modal transparent>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: height / 2.25,
            flexDirection: 'row',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <ActivityIndicator color={'black'} />
          <Text
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              paddingLeft: 10,
              borderRadius: 12,
              color: 'black',
            }}
          >
            Please wait...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

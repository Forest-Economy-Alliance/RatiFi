import React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { useTranslation } from 'react-i18next';

export default function Loader() {
  const { t} = useTranslation();
  const commonTranslation = t('common');

  return (
    <Modal transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
            {commonTranslation.please_wait}...
          </Text>
        </View>
      </View>
    </Modal>
  );
}

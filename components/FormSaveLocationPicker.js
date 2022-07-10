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
import Button from './CustomButton';
import * as ScopedStorage from 'react-native-scoped-storage';
import {useDispatch} from 'react-redux';
import {t} from 'i18next';

export default function FormSaveLocationPicker(props) {
  const dispatch = useDispatch();

  return (
    <Modal transparent>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: height / 2.25,
            flexDirection: 'column',
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text>{t('Please select Storage Location')}</Text>
          <Button
            onPress={async () => {
              let dir = await ScopedStorage.openDocumentTree(true);
              console.log('DIREcTORY', dir);
              dispatch({type: 'SAVE_FORM_DIR_URL', payload: dir.path});
            }}
          >
            CHOOSE
          </Button>
        </View>
      </View>
    </Modal>
  );
}

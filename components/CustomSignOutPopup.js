import {t} from 'i18next';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

export default function CustomSignOutPopup(props) {
  const {t} = useTranslation();
  if (!props.vis) {
    return null;
  }
  const {govtOfficials, profile} = useSelector(
    state => state.entities.auth.userInfo,
  );
  return (
    <Modal transparent>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            backgroundColor: 'white',
            // alignSelf: 'center',
            marginHorizontal: 30,
            marginTop: height / 4,
            flexDirection: 'column',
            padding: 10,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons name="face-agent" size={30} color="black" />
            <Text style={{color: 'black', fontSize: 18}}>
              {' '}
              सहायता केंद्र - {govtOfficials?.helpline}{' '}
            </Text>
          </View>

          {Boolean(profile?.authLevel === t('FRC') || profile?.authLevel===t('SDLC')) && (
            <View>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={{color: 'black', marginRight: 5}}>
                    {t('Subdivisonal Officer')}
                    {/* {JSON.stringify(govtOfficials)} */}
                  </Text>
                  <Text style={{color: 'green'}}>
                    {govtOfficials?.sdlcChairman
                      ? govtOfficials?.sdlcChairman?.name
                      : 'पंजीकृत नहीं है'}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={{color: 'black', marginRight: 5}}>
                    {t('Forest Range Officer')}
                  </Text>
                  <Text style={{color: 'green'}}>
                    {govtOfficials?.rangeOfficer
                      ? govtOfficials?.rangeOfficer?.name
                      : 'पंजीकृत नहीं है'}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={{color: 'black', marginRight: 5}}>
                    {t('Circle Officer')}
                  </Text>
                  <Text style={{color: 'green'}}>
                    {govtOfficials?.circleOfficer
                      ? govtOfficials?.circleOfficer?.name
                      : 'पंजीकृत नहीं है'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View
            style={{height: 1, backgroundColor: 'black', marginVertical: 5}}
          />

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <TouchableOpacity onPress={() => props.signout()}>
              <Text
                style={{
                  color: '#480E09',
                  borderWidth: 1,
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                {t('SIGN_OUT')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.setVis(false)}>
              <Text
                style={{
                  color: '#480E09',
                  borderWidth: 1,
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                {t('NO')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

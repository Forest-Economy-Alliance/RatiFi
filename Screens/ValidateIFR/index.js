import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  Linking,
} from 'react-native';
import {
  IFRfetchClaimDetailsByFRCHandler,
  fetchClaimDetailsByFRCHandler,
} from '../../services/claimService';
import {useTranslation} from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';

const BG_IMG_PATH = require('../../assets/images/background.png');

export default function ValidateIFRScreen() {
  const {
    name,
    panchayat,
    tehsil,
    state,
    district,
    village,
    postLevel,
    authLevel,
  } = useSelector(state => state.entities.auth.userInfo?.profile);

  const {t} = useTranslation();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    IFRfetchClaimDetailsByFRCHandler()
      .then(res => {
        console.log(res.data);
        if (res?.data?.success) {
          setClaims(res?.data?.data);
        }
      })
      .catch(err => {});

    // fetch ifr claims handler by frc
    // fetch selected fields, application Number - , boundray JPEG, name ,phone Number, applied Date and time
    // on Click open a model that will display the JPEG Image
    //
    // {   }
  }, []);

  //

  return (
    <ImageBackground
      source={BG_IMG_PATH}
      resizeMode="cover"
      blurRadius={10}
      style={styles.bg}>
      <ScrollView>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 20, marginBottom: 20,fontWeight:'700'}}>
            {t('IFR')} दावे ({village})
          </Text>

          {claims?.map(
            item => (
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}>
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 18}}>{item?.applicationNumber}</Text>
                </View>

                {Boolean(item?.boundaryImageUrl) && (
                  <View>
                    <CustomButton
                      onPress={() => {
                        Linking.openURL(item?.boundaryImageUrl);
                      }}
                      button={{width: '100%', marginTop: 5}}>
                      <Text>नक्शा देखे</Text>
                    </CustomButton>
                  </View>
                )}
              </View>
            ),
          )}

          {claims?.length===0 && <Text style={{fontSize:18}}>आपके मौजा में ऐप का उपयोग करके अभी तक कोई व्यक्तिगत दावा नहीं भरा गया है</Text>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
});

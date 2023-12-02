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
import {useDispatch, useSelector} from 'react-redux';

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

  const dispatch=useDispatch();
  useEffect(() => {
    console.log(village)
    dispatch({type:'ENABLE_LOADING'})
    IFRfetchClaimDetailsByFRCHandler({village})
      .then(res => {
        console.log('ok',res.data);
        if (res?.data?.success) {
          setClaims(res?.data?.data);
        }
      })
      .catch(err => {
        console.log('error',err)
      })
      .finally(f=>{
        dispatch({type:'DISABLE_LOADING'})

      })

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
              key={`to-be-validated-${item?.mobile}`}
                style={{
                  marginVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}>
                <View style={{padding: 10}}>
                  <Text style={{fontSize: 18}}>दावा दावा : {item?.IFRclaims[0]?.applicationNumber}</Text>
                  <Text style={{fontSize: 18}}>नाम : {item?.name}</Text>
                  <Text style={{fontSize: 18}}>फ़ोन : {item?.mobile}</Text>
                </View>

                {Boolean(item?.IFRclaims[0]?.boundary?.length!==0) && (
                  <View>
                    <CustomButton
                      onPress={() => {
                        Linking.openURL(item?.IFRclaims[0]?.courtDocuments[7]?.storageUrl);
                      }}
                      button={{width: '100%', marginTop: 5}}>
                      <Text>नक्शा देखे</Text>
                    </CustomButton>
                  </View>
                )}
              </View>
            ),
          )}

          {claims?.length===0 && <Text style={{fontSize:18}}>आपके {t('village')} में ऐप का उपयोग करके अभी तक कोई व्यक्तिगत दावा नहीं भरा गया है</Text>}
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

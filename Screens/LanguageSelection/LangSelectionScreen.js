import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {setLanguage} from '../../slices/userSlice';

const languages = [
  {
    name: 'English',
    value: 'en',
  },
  {
    name: 'हिन्दी',
    value: 'hi',
  },
  {
    name: 'ગુજરાતી',
    value: 'gu',
  },
  {
    name: 'ଓଡ଼ିଆ',
    value: 'or',
  },
  {
    name: 'ಕನ್ನಡ',
    value: 'kn',
  },
  {
    name: 'മലയാളം',
    value: 'ml',
  },
  {
    name: 'தமிழ்',
    value: 'ta',
  },
  {
    name: 'తెలుగు',
    value: 'te',
  },
];

const LangSelectionScreen = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.value}
            onPress={() => {
              // console.log(selectLanguage);
              dispatch(setLanguage(lang.value));
              navigation.navigate('NamePhone');
            }}
            style={styles.button}>
            <Text style={styles.text}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LangSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#480E09',
  },
});

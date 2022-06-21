import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../assets/i18n/i18n';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {object, string, ref} from 'yup';

const DownloadPDFScreen = ({navigation}) => {
  const language = 'hi';
  const [role, setRole] = useState('FRC');
  const [pressed, setPressed] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const state = {
    gramSabha: '',
  };

  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState('en');

  const ValSchema = object().shape({
    gramSabha: string().required(t('Gram Sabha is Required')),
  });

  const onGet = (values, formikActions) => {
    setPressed(true);
    formikActions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: state,
    validationSchema: ValSchema,
    onSubmit: onGet,
  });

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setCurrentLanguage(value))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    changeLanguage(language);
  }, []);

  return (
    // flexWrap: 'wrap',
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{role}</Text>
        </View>

        <TextInput
          style={styles.inputGramSabha}
          placeholder={t('gram sabha')}
          placeholderTextColor="#480E09"
          onChangeText={formik.handleChange('gramSabha')}
          value={formik.values.gramSabha}
          onBlur={formik.handleBlur('gramSabha')}
        />
        {formik.errors.gramSabha && formik.touched.gramSabha && (
          <Text style={styles.error}>{formik.errors.gramSabha}</Text>
        )}
        <TouchableOpacity
          style={styles.getDocsButton}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.getDocsButtonText}>{t('GET_DOCUMENTS')}</Text>
        </TouchableOpacity>
        {pressed && isAvailable && (
          <>
            <View style={styles.msgContainer}>
              <Text style={styles.msg}>
                {t('your forest map is available')}
              </Text>
            </View>
            <Text style={styles.subMsg}>
              {t('download application document')}
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                navigation.navigate('FormsPage');
              }}
            >
              <Text style={styles.nextButtonText}>{t('download')}</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DownloadPDFScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '10%',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: '5%',
    backgroundColor: '#D3F2D3',
    alignSelf: 'flex-end',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C8CCC8',
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: '5%',
    color: '#480E09',
  },
  inputGramSabha: {
    borderColor: '#CCCCCC',
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 25,
    color: '#480E09',
  },
  nextButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nextButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  getDocsButton: {
    backgroundColor: '#480E09',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  getDocsButtonText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  msgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8CCC8',
    marginTop: '10%',
    padding: '5%',
  },
  msg: {
    fontSize: 30,
    color: '#480E09',
    textAlign: 'center',
  },
  subMsg: {
    fontSize: 20,
    color: '#480E09',
    textAlign: 'center',
    marginTop: '5%',
  },
  error: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 14,
    color: 'red',
    marginTop: '2%',
  },
});

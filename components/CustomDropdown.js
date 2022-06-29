import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const Dropdown = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');

  // const windowWidth = Dimensions.get('window').width;

  const openDropdown = () => {
    DropdownButton.current.measure((fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width);
      // console.log('Component height is: ' + height);
      // console.log('X offset to frame: ' + fx);
      // console.log('Y offset to frame: ' + fy);
      // console.log('X offset to page: ' + px);
      // console.log('Y offset to page: ' + py);
      setDropdownTop(height + py);
    });

    setVisible(true);
  };

  const onSelect = item => {
    setSelectedValue(item.label);
    props.formik.setFieldValue(props.variable, item.label);
    // console.log('Selected', item);
  };

  useEffect(() => {
    console.log('HII', props.visible);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        {item.value === '1' && (
          <TouchableOpacity
            style={styles.item3}
            onPress={() => onItemPress(item)}>
            <Text style={styles.buttonText1}>{item.label}</Text>
          </TouchableOpacity>
        )}
        {item.value !== '1' ? (
          <>
            <View style={styles.horLine} />
            <TouchableOpacity
              style={styles.item}
              onPress={() => onItemPress(item)}>
              <Text style={styles.buttonText1}>{item.label}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };
  const onItemPress = item => {
    // setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  return props.visible ? (
    <>
      <TouchableOpacity
        onPress={() => {
          visible ? setVisible(false) : openDropdown();
        }}
        ref={DropdownButton}
        style={styles.button}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{selectedValue}</Text>
        </View>
        <View style={styles.vIcon}>
          {visible ? (
            <Ionicon
              name="caret-up"
              size={20}
              color="#000"
              style={styles.icon}
            />
          ) : (
            <Ionicon
              name="caret-down"
              size={20}
              color="#000"
              style={styles.icon}
            />
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <ScrollView
          style={[
            props.data ? styles.dropdown : null,
            {
              top: dropdownTop,
            },
          ]}>
          {props.data?.map((item, index) => renderItem({item, index}))}
        </ScrollView>
      </Modal>
    </>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  label: {
    alignItems: 'center',
    // backgroundColor: 'black',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: '3%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginLeft: '10%',
    marginTop: '4%',
    width: '70%',
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: '2%',
  },
  buttonText1: {
    color: '#FFFFFF',
    fontSize: 14,
    // textAlign: 'center',
    marginRight: '2%',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,1)',
    width: '80%',
    borderRadius: 12,
    zIndex: 999,
    height: '25%',
    marginHorizontal: '10%',
    paddingHorizontal: '8%',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    marginBottom: '5%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '10%',
  },
  item3: {
    flexDirection: 'row',
    paddingTop: '10%',
    paddingBottom: '10%',
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  avatar2: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  avatarTitle: {
    color: 'white',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    backgroundColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
  },
  pad: {
    height: '5%',
  },
  newView: {
    backgroundColor: '#0063FF',
    borderRadius: 19,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginLeft: '5%',
  },
  newText: {
    color: 'white',
    fontSize: 11,
  },
  vIcon: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: '10%',
    paddingVertical: '3%',

    marginTop: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  horLine: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    width: '100%',
    // marginTop: '2%',
    marginBottom: '10%',
  },
});

export default Dropdown;

import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

const DropdownCreatePost = props => {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selected, setSelected] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState('AADHAR');
  const data = [
    {
      label: 'AADHAR',
      isNew: false,
      value: '1',
    },
    {
      label: 'GOVERNMENT ID',
      isNew: false,
      value: '2',
    },
  ];

  // const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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
    // console.log('Selected', item);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        {item.value === '1' && (
          <TouchableOpacity
            style={styles.item3}
            onPress={() => onItemPress(item)}>
            <Text style={styles.buttonText1}>{item.label}</Text>
            {item.isNew && (
              <View style={styles.newView}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        {item.value !== '1' ? (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onItemPress(item)}>
            <Text style={styles.buttonText1}>{item.label}</Text>
            {item.isNew && (
              <View style={styles.newView}>
                <Text style={styles.newText}>New</Text>
              </View>
            )}
          </TouchableOpacity>
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

  return (
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
        <Ionicon name="caret-down" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <ScrollView
          style={[
            styles.dropdown,
            {
              top: dropdownTop,
            },
          ]}>
          {data.map((item, index) => renderItem({item, index}))}
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '90%',
    alignItems: 'center',
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: '2%',
  },
  buttonText1: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginRight: '2%',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 12,
    zIndex: 999,
    height: 120,
    marginHorizontal: '10%',
    paddingLeft: '8%',
  },
  item: {
    flexDirection: 'row',
    paddingBottom: '10%',
  },
  item2: {
    flexDirection: 'row',
    paddingBottom: '25%',
  },
  item3: {
    flexDirection: 'row',
    paddingTop: '10%',
    paddingBottom: '10%',
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
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginHorizontal: '10%',
    marginTop: '4%',
    borderRadius: 20,
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
});

export default DropdownCreatePost;

import RNLocation from 'react-native-location';

export const fetchPermissions = async () => {
  console.log('here');

  let permission = await RNLocation.checkPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'coarse', // or 'fine'
    },
  });

  console.log('here2');
  console.log(permission);

  permission = await RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
      rationale: {
        title: 'We need to access your location',
        message: 'We use your location to show where you are on the map',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      },
    },
  });
  console.log(permission);
};

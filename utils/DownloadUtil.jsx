import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
// todo
export const DownloadImage = IMG_URL => {
  console.log('CALLED');
  // console.log(IMG_URL);
  let data = new Date();
  // let ext=getExtension(IMG_URL);
  // ext='.'+ext[0]
  //we explicitely assinging because image does not have extension in unsplash from filename
  let ext = '.png';
  // console.log(ext);
  // Get conig and fd from blb fetch
  const {config, fs} = RNFetchBlob;
  // console.log(fs.dirs);
  let PictureDir = fs.dirs.PictureDir + '/Ratifi';
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(data.getTime() + data.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  ToastAndroid.show('Downloading ...', ToastAndroid.SHORT);
  config(options)
    .fetch('GET', IMG_URL)
    .then(res => {
      // console.log("res", JSON.stringify(res));
      ToastAndroid.show('Image Downloaded', ToastAndroid.SHORT);
    })
    .catch(err => ToastAndroid.show('Download Failed', ToastAndroid.SHORT));

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const checkPermision = async () => {
    if (Platform.OS == 'ios') {
      DownloadImage(IMG_URL);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Premission Required',
            message: 'App need storage permission',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log("GRANTED");
          DownloadImage(IMG_URL);
        } else {
          alert('Storage Permissions not granted');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  checkPermision();
};
export const DownloadPDF = pdfUrl => {};

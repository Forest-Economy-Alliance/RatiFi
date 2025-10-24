import {
  getManufacturer,
  getUniqueId,
  getBrand,
  getDeviceName,
  getModel,
  getBuildNumber,
  getFirstInstallTime,
  getSerialNumber,
} from 'react-native-device-info';
import CryptoJS from 'react-native-crypto-js';

// import jwt from 'jsonwebtoken';
export const getDeviceHash = async () => {
  const manufacturer = await getManufacturer();
  const uniquID = await getUniqueId();
  const brand = await getBrand();
  const deviceName = await getDeviceName();
  const model = await getModel();
  const buildNumber = await getBuildNumber();
  const firstInstallTime = await getFirstInstallTime();
  const serialNumber = await getSerialNumber();

  const DD = {
    manufacturer,
    uniquID,
    brand,
    deviceName,
    model,
    buildNumber,
    firstInstallTime,
    serialNumber,
  };

  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(DD),
    'HSDKJF2342@231HFDSJF',
  ).toString();

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext, 'HSDKJF2342@231HFDSJF');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log('====================================');
    console.log("->",decryptedData);
    console.log('====================================');

  return ciphertext;
};

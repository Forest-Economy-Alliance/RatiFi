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
  var bytes = CryptoJS.AES.decrypt('U2FsdGVkX18mp3T8KlhZz0ziBB+pHNAPAnIFwlTt/uX7AYLqEzOrLWYcH5sd5BIb9KYlUlS6e2WwGvNUYlTWviwGw7HDOxCQcKo4UffPxprzjWtbLOBuA6V3XKH9iIo/7be1JPKMDM1Ejt2TcsnQWWndAPU2czQ79R3CPml+UKvdsIRTj81xfTndMWA/evGDaI8eMurBIqwuRZ/YRCWG52FcspxsDgTe83p+QcgNURY5Kr/soU/C/uRBYnqTqHWdC46770go2cY8joUWvr9TnS3HBZnJL8Z4z/cX7UdhaRQhobGbSPjCXsyUsn79NhDh', 'HSDKJF2342@231HFDSJF');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log('====================================');
    console.log("->",decryptedData);
    console.log('====================================');

  return ciphertext;
};

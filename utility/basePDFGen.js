import RNHTMLtoPDF from 'react-native-html-to-pdf';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import MangalFont from './mangalFont';
import KrutiDevFont from './krutiDevFont';
import {Linking, ToastAndroid} from 'react-native';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';
import {BASE_URL} from '../services/APICentral';
import store from '../redux-store';
/**
 * This is an abstract class which defines the interface for a form type.
 * @class FormTypeAbstract
 */
class FormPDFAbstract {
  stringRegex = /\$string\d+/g;
  pictureRegex = /\$picture\d+/g;

  fieldStrings = [];
  fieldPictures = [];

  //#region Interface Variables
  totalStrings;
  totalPictures;
  /**
   * The template string for the form written in html.
   **/
  template = '';

  //#endregion

  constructor(_fieldPictures, _fieldStrings, _totalStrings, _totalPictures) {
    this.fieldPictures = _fieldPictures;
    this.fieldStrings = _fieldStrings;
    this.totalStrings = _totalStrings;
    this.totalPictures = _totalPictures;
  }

  /**
   * @usage This method is used to generate the pdf file.
   * ```
   * // Example:
   * // Request write permission for external storage if required
   *   requestFilePermission()
   *   let obj =  new GenericFormPDF(["Bruh"],["path/to/picture"])
   *   obj.createPDF('', 'test')
   * ```
   * @param {*} _directory The directory where the pdf will be saved.
   * @param {*} _fileName  The name of the file.
   * @returns Absolute location of the file.
   */
  createPDF = async (_directory, _fileName) => {
    console.log('Creating PDF');
    let headEnd = this.template.search('</head>');
    var replacedTemplate =
      this.template.slice(0, headEnd) +
      MangalFont +
      KrutiDevFont +
      this.template.slice(headEnd);
    if (this.totalStrings > 0) {
      replacedTemplate = replacedTemplate.replace(this.stringRegex, match => {
        let startIndex = match.search(/\d+/g);
        return this.fieldStrings[match.substring(startIndex, match.length)];
      });
    }
    if (this.totalPictures > 0) {
      replacedTemplate = replacedTemplate.replace(this.pictureRegex, match => {
        let startIndex = match.search(/\d+/g);
        return this.fieldPictures[match.substring(startIndex, match.length)];
      });
    }


    
    try {
      let file = await RNHTMLtoPDF.convert({
        html: replacedTemplate,
        fileName: _fileName,
        directory: _directory,
        fonts: [MangalFont],
      });

      console.log('FF', file);




      const pdfFile = {
        uri: file.filePath,
        type: 'application/pdf',
        name: `${_fileName}.pdf`,
    };
    
    var body = new FormData();
 
    body.append('pdfFile', pdfFile);
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/get-documents');                                 
    // xhr.send(body);
    


    RNFetchBlob.fs
    .exists(file.filePath)
    .then(exist => {
      console.log(`file ${exist ? '' : 'not'} exists`);

      RNFetchBlob.fs.readFile(file.filePath, 'base64')
      .then(data => {
        // console.log("DATA",data);





         axios.post(BASE_URL+'/get-gcp-url',{
          base64Data:data,
          fileName:_fileName
        }).then(({data})=>{
            // console.log(data.name);
          // store.store.dispatch()
          setTimeout(()=>{
            store.store.dispatch({type:'UPDATE_FORMDATA',payload:data.name});
          },200)
              //  const response=await Linking.openURL(`https://ratifi-backend-v2.herokuapp.com/get-docuemnts?f0=${}&f9=${}`);

            // unlink as well
        }).catch(err=>{
          console.log("something went wrong",err)
        })




      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(ef=>{
      console.error(ef);
    })

    return ;

















    // upload to GCP
    fetch('https://ratifi-backend-v2.herokuapp.com/get-url',{
      method:'POST',
      body:body                        
    })
    .then(response=>{
      console.log(response)
    })
    .catch(err=>console.log(err))


      RNFetchBlob.fs
        .exists(file.filePath)
        .then(exist => {
          console.log(`file ${exist ? '' : 'not'} exists`);
          RNFetchBlob.fs.readFile(file.filePath, 'base64').then(data => {





            // eslint-disable-next-line prettier/prettier
            let finalPath = store.store.getState().entities.appUtil.appUtil
              .formSaveDir;
            console.log('GTP', finalPath);

            RNFS.moveFile(
              file.filePath,
              finalPath + '/' + '' + _fileName + '.pdf',
            )
              .then(r => {
                console.log('MOVED');
              })
              .catch(uc => console.log('uc', uc));
            // axios
            //   .post(`${BASE_URL}/upload-document`, {
            //     pdf: data,
            //     name: _fileName,
            //   })
            //   .then(res => {})
            //   .catch(e => console.log(_fileName, e));
          });
        })
        .catch(() => {});

      // ToastAndroid.showWithGravityAndOffset(
      //   'Form saved',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   25,
      //   50,
      // );

      // alert(file.filePath);
      return file.filePath;
    } catch (error) {
      console.log('Error creating PDF: ' + error);
    }
  };
}

class GenericFormPDF extends FormPDFAbstract {
  template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            h1 {
                text-align: center;
            }
        </style>
        ${MangalFont}
    </head>
    <body>
        <h1>Hello, $string0!</h1>
        <img src="$picture0" alt="">
    </body>
    </html>
    `;

  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 1;
    let totalPictures = 1;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export {GenericFormPDF, FormPDFAbstract};

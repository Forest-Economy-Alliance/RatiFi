import {FormPDFAbstract} from './basePDFGen';
import Page1 from '../assets/Forms/Jharkhand/Page1_Jharkhand';

  /**
   *
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0: Village Name / Gram
   *
   *  1: Village Panchayat / Gram Panchayat
   *
   *  2: Bloc Name / Prakhand
   *
   *  3: District / Jila
   *
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
class Form1Jharkhand extends FormPDFAbstract {
  template = Page1;
  /**
   *
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0: Village Name / Gram
   *
   *  1: Village Panchayat / Gram Panchayat
   *
   *  2: Bloc Name / Prakhand
   *
   *  3: District / Jila
   *
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 4;
    let totalPictures = 0;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export default Form1Jharkhand;

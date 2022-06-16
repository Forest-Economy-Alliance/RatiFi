import {FormPDFAbstract} from './basePDFGen';
import Page4 from '../assets/Forms/Jharkhand/Page4_Jharkhand';

  /**
   *
   *  Form 4 Jharkhand
   * 
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0: Village Panchayat / Gram Panchayat
   *
   *  1: Bloc Name / Prakhand
   *
   *  2: District / Jila
   *
   *  3: Candidate 1
   *
   *  4: Candidate 2
   *
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
class Form4Jharkhand extends FormPDFAbstract {
  template = Page4;
  /**
   *
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0: Village Panchayat / Gram Panchayat
   *
   *  1: Bloc Name / Prakhand
   *
   *  2: District / Jila
   *
   *  3: Candidate 1
   *
   *  4: Candidate 2
   *
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 5;
    let totalPictures = 0;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export default Form4Jharkhand;

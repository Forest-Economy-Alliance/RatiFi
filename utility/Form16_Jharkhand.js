import {FormPDFAbstract} from './basePDFGen';
import Page16 from '../assets/Forms/Jharkhand/Page16_Jharkhand';

/**
 *  Form 1 for Jharkhand state
 */
class Form16Jharkhand extends FormPDFAbstract {
  template = Page16;
  /**
   *
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0 :
   *
   *  1 :
   *
   *  2 :
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 3;
    let totalPictures = 0;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export default Form16Jharkhand;

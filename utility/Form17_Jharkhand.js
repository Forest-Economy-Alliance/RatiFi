import {FormPDFAbstract} from './basePDFGen';
import Page17 from '../assets/Forms/Jharkhand/Page17_Jharkhand';

/**
 *  Form 1 for Jharkhand state
 */
class Form17Jharkhand extends FormPDFAbstract {
  template = Page17;
  /**
   *
   * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
   *
   *  0 :
   *
   *  1 :
   *
   * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
   *
   * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
   *
   *  Pass null to ignore
   *
   */
  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 2;
    let totalPictures = 0;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export default Form17Jharkhand;

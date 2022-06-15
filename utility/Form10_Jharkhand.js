import { FormPDFAbstract } from "./basePDFGen";
import Page10 from "../assets/Forms/Jharkhand/Page10_Jharkhand"

/**
 *  Form 1 for Jharkhand state
 */
class Form10Jharkhand extends FormPDFAbstract {
    template = Page10;
    /**
     * 
     * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
     * 
     *  pass null to ignore
     * 
     * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
     * 
     * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
     *  
     *  Pass null to ignore
     * 
     */
    constructor(_fieldStrings, _fieldPictures) {
        let totalStrings = 0;
        let totalPictures = 0;
        super(_fieldPictures, _fieldStrings, totalStrings, totalPictures)
    }
}

export default Form10Jharkhand;
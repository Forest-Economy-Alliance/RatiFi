import { FormPDFAbstract } from "./basePDFGen";
import MangalFont from "./mangalFont";
import Page9 from "../assets/Forms/Jharkhand/Page9_Jharkhand"

/**
 *  Form 1 for Jharkhand state
 */
class Form9Jharkhand extends FormPDFAbstract {
    template = Page9;
    /**
     * 
     * @param {*} _fieldStrings List of strings to be replaced in the template in this order:
     * 
     *  Pass null to ignore
     * 
     * `Note : Must be in hindi and in the unicodes for **Mangal** font refer assets/fonts/Mangal.ttf`
     * 
     * @param {*} _fieldPictures Pictures to be replaced in the template in this order:
     *  
     *  0 : Placeholder Image
     * 
     */
    constructor(_fieldStrings, _fieldPictures) {
        let totalStrings = 0;
        let totalPictures = 1;
        super(_fieldPictures, _fieldStrings, totalStrings, totalPictures)
    }
}

export default Form9Jharkhand;
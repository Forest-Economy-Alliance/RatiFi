import { FormPDFAbstract } from "./basePDFGen";
import Page5 from "../assets/Forms/Jharkhand/Page5_Jharkhand"

/**
 *  Form 1 for Jharkhand state
 */
class Form5Jharkhand extends FormPDFAbstract {
    template = Page5;
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
        super(_fieldPictures, _fieldStrings, totalStrings, totalPictures)
    }
}

export default Form5Jharkhand;
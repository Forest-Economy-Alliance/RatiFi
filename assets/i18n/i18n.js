import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import gu from './gu.json';
import or from './or.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        hi: hi,
        gu: gu,
        or: or,
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;

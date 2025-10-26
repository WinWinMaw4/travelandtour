import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import myTranslation from './locales/my/translation.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n to React
  .init({
    resources: {
      en: { translation: enTranslation },
      my: { translation: myTranslation },
    },
    fallbackLng: 'en', // fallback if language not found
    interpolation: { escapeValue: false }, // React already escapes
  });

export default i18n;

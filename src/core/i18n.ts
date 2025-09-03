import i18n from 'i18next';
import en from './translations/en.json';
import ga from './translations/ga.json';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: en,
  },
  ga: {
    translation: ga,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['translation'],
  defaultNS,
  resources,
});

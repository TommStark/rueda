import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEs from '../features/home/locales/es';
import marketEs from '../features/market/locales/es';
import portfolioEs from '../features/portfolio/locales/es';
import favoritesEs from '../features/favorites/locales/es';
import historyEs from '../features/orders/locales/es';
import navigationEs from '../shared/locales/es/navigation';
import commonEs from '../shared/locales/es/common';

i18n.use(initReactI18next).init({
  resources: {
    es: {
      home: homeEs,
      market: marketEs,
      portfolio: portfolioEs,
      favorites: favoritesEs,
      history: historyEs,
      navigation: navigationEs,
      common: commonEs,
    },
  },
  lng: 'es',
  fallbackLng: 'es',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

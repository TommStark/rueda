import homeEs from '../../features/home/locales/es';
import marketEs from '../../features/market/locales/es';
import portfolioEs from '../../features/portfolio/locales/es';
import favoritesEs from '../../features/favorites/locales/es';
import historyEs from '../../features/orders/locales/es';
import navigationEs from '../locales/es/navigation';
import commonEs from '../locales/es/common';
import errorsEs from '../locales/es/errors';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      home: typeof homeEs;
      market: typeof marketEs;
      portfolio: typeof portfolioEs;
      favorites: typeof favoritesEs;
      history: typeof historyEs;
      navigation: typeof navigationEs;
      common: typeof commonEs;
      errors: typeof errorsEs;
    };
  }
}

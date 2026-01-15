import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (
  namespace?:
    | 'common'
    | 'home'
    | 'market'
    | 'portfolio'
    | 'favorites'
    | 'history'
    | 'navigation'
    | 'errors'
) => {
  return useI18nTranslation(namespace);
};

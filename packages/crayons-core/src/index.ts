import {
  setTranslations,
  i18n,
  getLang,
  setLang,
  i18nState,
} from './global/Translation';

export * from './components';
export { ToastController } from './global/crayons';

export const TranslationController = {
  setTranslations,
  i18n,
  setLang,
  i18nState,
  getLang,
};

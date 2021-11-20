import { TranslationController as controller } from '@freshworks/crayons-i18n';

export const TranslationController = new controller();

export const i18n = TranslationController.i18n.bind(TranslationController);

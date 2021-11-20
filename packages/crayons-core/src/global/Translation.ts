import { TranslationController } from '@freshworks/crayons-i18n';

export const controller = new TranslationController();

export const i18n = controller.i18n.bind(controller);

# Localisation Support (i18n)

Crayons comes with `i18n` support. Based on the `lang` attribute on the html element, the translation gets applied.

To overwrite the existing translations or to add any new translations, you can use `setTranslations` method in `TranslationController`.

```js
javascript: import { TranslationController } from "@freshworks/crayons";
react: import { TranslationController } from "@freshworks/crayons/react";

TranslationController.setTranslation({
    //en :{...custom translation object},
    //de :{...custom translation object},
})
```
To know about the `translation keys` that should be used in the translation object you can check [here](#translation-keys)

## Translation Keys

Translation key and value for EN lang.
```js
{
  common: {
    add: 'Add',
    cancel: 'Cancel',
    update: 'Update',
  },
  modal: {
    cancel: 'Cancel',
    ok: 'OK',
  },
  search: {
    search: 'Search',
    no_items_found: 'No items found',
    no_data_available: 'No data available',
  },
}
```

## SetLang

You can also set language manually by using `TranslationController.setLang(<<pass lang here>>)` method. Once the lang is set, the components will show the appropriate localised content.
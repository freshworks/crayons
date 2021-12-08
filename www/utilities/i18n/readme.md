# Localisation Support (i18n)

Crayons comes with `i18n` support. Based on the `lang` attribute on the html element, the translation gets applied.

## TranslationController

To manage Translations you can import `TranslationController` and use it as mentioned in the below sections.

### Usage

If you are using module bundlers:
```js
javascript esm: import { TranslationController } from "@freshworks/crayons/dist/components";
react: import { TranslationController } from "@freshworks/crayons/react";
```
If you are using cdn:
 ```html 
 <script
  type="module"
  src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.esm.js">
</script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.js">
</script>
<script type="module">
 import { TranslationController } from 'https://unpkg.com/@freshworks/crayons@canary/dist/crayons/index.esm.js';
 </script>
 // now you can use TranslationController's methods as describe in the below sections
```

## Set Translations
To overwrite the existing translations or to add any new translations, you can use `setTranslations` method in `TranslationController`.

```js 
TranslationController.setTranslation({
    //en :{...custom translation object},
    //de :{...custom translation object},
})
```

To know about the `translation keys` that should be used in the translation object you can check [here](#translation-keys)

### Translation Keys

Translation key and value for EN lang.
```js
en : {
  datepicker: {
    cancel: 'Cancel',
    update: 'Update',
  },
  dropdown: {
    add: 'Add',
    cancel: 'Cancel',
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
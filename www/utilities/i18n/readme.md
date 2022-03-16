# Internationalization Support (i18n)

Crayons comes with `i18n` support using `@freshworks/crayons-i18n` package. 

This provides:

- User language detection
- Proper pluralizations
- Translation context
- Nesting of keys, Interpolation (variable replacement)
  

Based on the `lang` attribute on the html element, the translation gets applied. Whenever the `lang` attribute changes, the corresponding strings of that lang will be used.

To overwrite the existing translations or to add any new translations, you can use `setTranslations` method in `TranslationController`.

To use with applications using `crayons` 
```js
javascript: import { TranslationController } from "@freshworks/crayons";
react: import { TranslationController } from "@freshworks/crayons/react";

TranslationController.setTranslations({
    //en :{...custom translation object},
    //de :{...custom translation object},
})
```
### setLang

You can also set language manually by using `TranslationController.setLang(<<pass lang here>>)` method. Once the lang is set, the components will show the appropriate localised content.

### Usage in a stencil project
If any of your stencil project needs `i18n` capabilities, you can use `crayons-i18n` package like below:

```js
// translation.js
import { TranslationController as controller } from "@freshworks/crayons-i18n";
export const TranslationController = new controller(); // create a singleton instance and share it across the app.

// usage
import { TranslationController } from "./translation"

// set lang manually
TranslationController.setLang("en");

TranslationController.setTranslations({
    //en :{...custom translation object},
    //de :{...custom translation object},
})
```

To know about the `translation keys` that should be used in the translation object you can check [here](#translation-keys)

#### Translation Keys

Translation key and value for EN lang.
```js
{
  "datepicker": {
    "cancel": "Cancel",
    "update": "Update",
    "to": "to"
  },
  "dropdown": {
    "add": "Add",
    "cancel": "Cancel"
  },
  "fileUploader": {
    "text": "Upload file",
    "description": "or drag and drop here",
    "acceptError": "File format not accepted",
    "maxFileSizeError": "Exceeded maximum file size",
    "maxFilesLimitError": "Exceeding maximum files limit",
    "fileUploadError": "File upload failed",
    "uploading": "Uploading",
    "selectedFiles": "Selected files",
    "remove": "remove"
  },
  "modal": {
    "cancel": "Cancel",
    "ok": "OK"
  },
  "search": {
    "search": "Search",
    "noItemsFound": "No items found",
    "noDataAvailable": "No data available"
  },
  "form": {
    "required": "{{field}} is required",
    "invalidUrl": "Enter a valid URL",
    "invalidEmail": "Enter a valid email",
    "invalidNumber": "Enter a valid number"
  },
  "pagination": {
    "buttonGroupLabel": "Pagination controls",
    "previousButtonLabel": "Previous",
    "nextButtonLabel": "Next",
    "content": "<span class='record'>{{start}}</span> to <span class='record'>{{end}}</span> of {{total}}"
  },
  "datatable": {
    "chooseColumns": "Choose columns",
    "actions": "Actions"
  }
}

```

### Interpolation

Interpolation is one of the most used functionalities in i18n.

Keys, by default, are strings surrounded by curly brackets:

```
{
    "key": "hello {{world}}"
}
```

```
TranslationController.t('key', { world: 'great' });
// -> "hello world"
```

## Examples

### HTMl 
```html live
<iframe width="100%" height="300" src="//jsfiddle.net/65rghmb4/21/embedded/html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
```

### React
```html live
 <iframe width="100%" height="300" src="https://codesandbox.io/embed/crayons-i18n-react-example-vpl9k5?fontsize=14&hidenavigation=1&theme=dark"></iframe>
```

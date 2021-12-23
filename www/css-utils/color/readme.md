# Color

Color utilities provide easy way to add font and background colors to your application.

## Font color

'fw-color-#{$colorName}' is the class to be applied to apply font color.

For example, to apply '#475867' color, we can use 'fw-color-smoke-700'.

```html live
<template>
  <p class="fw-color-azure-800">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit
    feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque.
    Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan.
    Pellentesque in pharetra odio.
  </p>
</template>
```

#### color-hex code mapping.

| colorName      | Hex code | color                                                              |
| -------------- | -------- | ------------------------------------------------------------------ |
| smoke-700      | #475867  | <div style="backgroundColor:#475867;width:20px;height:20px"></div> |
| smoke-300      | #92a2b1  | <div style="backgroundColor:#92a2b1;width:20px;height:20px"></div> |
| azure-800      | #2c5cc5  | <div style="backgroundColor:#2c5cc5;width:20px;height:20px"></div> |
| azure-100      | #bbdcfe  | <div style="backgroundColor:#bbdcfe;width:20px;height:20px"></div> |
| elephant-900   | #12344d  | <div style="backgroundColor:#12344d;width:20px;height:20px"></div> |
| elephant-800   | #264966  | <div style="backgroundColor:#264966;width:20px;height:20px"></div> |
| jungle-800     | #005c3f  | <div style="backgroundColor:#005c3f;width:20px;height:20px"></div> |
| jungle-500     | #00a886  | <div style="backgroundColor:#00a886;width:20px;height:20px"></div> |
| persimmon-900  | #c82124  | <div style="backgroundColor:#c82124;width:20px;height:20px"></div> |
| persimmon-800  | #d72d30  | <div style="backgroundColor:#d72d30;width:20px;height:20px"></div> |
| casablanca-700 | #e86f25  | <div style="backgroundColor:#e86f25;width:20px;height:20px"></div> |

## Background color

'fw-bg-#{$colorName}' is the class to be applied to apply background color.

For example, to apply '#f5f7f9' color, we can use 'fw-bg-smoke-25'.

```html live
<template>
  <p class="fw-bg-smoke-25">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit
    feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque.
    Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan.
    Pellentesque in pharetra odio.
  </p>
</template>
```

#### color-hex code mapping.

| colorName     | Hex code | color                                                              |
| ------------- | -------- | ------------------------------------------------------------------ |
| casablanca-50 | #fef1e1  | <div style="backgroundColor:#fef1e1;width:20px;height:20px"></div> |
| elephant-900  | #12344d  | <div style="backgroundColor:#12344d;width:20px;height:20px"></div> |
| smoke-100     | #cfd7df  | <div style="backgroundColor:#cfd7df;width:20px;height:20px"></div> |
| smoke-50      | #ebeff3  | <div style="backgroundColor:#ebeff3;width:20px;height:20px"></div> |
| smoke-25      | #f5f7f9  | <div style="backgroundColor:#f5f7f9;width:20px;height:20px"></div> |
| jungle-50     | #e0f5f1  | <div style="backgroundColor:#e0f5f1;width:20px;height:20px"></div> |
| azure-50      | #e5f2fd  | <div style="backgroundColor:#e5f2fd;width:20px;height:20px"></div> |
| persimmon-50  | #ffecf0  | <div style="backgroundColor:#ffecf0;width:20px;height:20px"></div> |

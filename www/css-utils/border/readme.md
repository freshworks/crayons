# Border

Border utilities are provided to easily implement borders

## Border width

'fw-b-#{$width}' is the class to be applied to apply border width. Apply 'fw-b-0' to remove border.

- To apply border on all directions, we can use 'fw-b-#{$width}'.
- To apply border only on top, we can use 'fw-b-t-#{$width}'.
- To apply border only on right, we can use 'fw-b-r-#{$width}'.
- To apply border only on bottom, we can use 'fw-b-b-#{$width}'.
- To apply border only on left, we can use 'fw-b-l-#{$width}'.

_#{$width} can be either 1, 2 or 3._

## Border Style

'fw-b-#{$style}' is the class to be applied to apply border radius.

- To apply border style solid, we can use 'fw-b-solid'.

_Only border style solid is supported._

```html live
<template>
  <p class="fw-b-1 fw-b-solid">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit
    feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque.
    Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan.
    Pellentesque in pharetra odio.
  </p>
</template>
```

## Border Radius

'fw-br-#{$radius}' is the class to be applied to apply border radius.

- To apply border radius on all directions, we can use 'fw-br-#{$radius}'.
- To apply border radius only on top right side, we can use 'fw-br-tr-#{$radius}'.
- To apply border radius only on bottom right side, we can use 'fw-br-br-#{$radius}'.
- To apply border radius only on bottom left side, we can use 'fw-br-bl-#{$radius}'.
- To apply border radius only on top left side, we can use 'fw-br-tl-#{$radius}'.

_#{$radius} can be either 1, 2, 3 or 4._

```html live
<template>
  <p class="fw-b-1 fw-b-solid fw-br-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit
    feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque.
    Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan.
    Pellentesque in pharetra odio.
  </p>
</template>
```

## Border Colors

'fw-b-#{$color}' is the class to be applied to apply border radius. By default `fw-b-azure-100` color is applied for borders.

- To apply border color '#cfd7df', we can use 'fw-b-smoke-100'.
- To apply border color '#bbdcfe', we can use 'fw-b-azure-100'.
- To apply border color '#ffd0d6', we can use 'fw-b-persimmon-100'.
- To apply border color '#fddbb5', we can use 'fw-b-casablanca-100'.

_Only border colors smoke-100, azure-100, persimmon-100 and casablanca-100 are supported._

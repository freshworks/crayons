# Spacing (Margin and Padding)

## Padding

- To apply padding style on all directions, we can use 'fw-p-#{$spacing}'. 
- To apply padding style only on top, we can use 'fw-pt-#{$spacing}'.
- To apply padding style only on right, we can use 'fw-pr-#{$spacing}'.
- To apply padding style only on bottom, we can use 'fw-pb-#{$spacing}'.
- To apply padding style only on left, we can use 'fw-pl-#{$spacing}'.
- To apply padding only to top and bottom, we can use 'fw-py-#{$spacing}'.
- To apply padding only to left and right, we can use 'fw-px-#{$spacing}'.

*#{$spacing} can be multiples of 4 from 0 to 28.*

```html live
<template>
  <p class="fw-p-16">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
  </p>
</template>
```

## Margin

- To apply margin style on all directions, we can use 'fw-m-#{$spacing}'. 
- To apply margin style only on top, we can use 'fw-mt-#{$spacing}'.
- To apply margin style only on right, we can use 'fw-mr-#{$spacing}'.
- To apply margin style only on bottom, we can use 'fw-mb-#{$spacing}'.
- To apply margin style only on left, we can use 'fw-ml-#{$spacing}'.
- To apply margin only to top and bottom, we can use 'fw-my-#{$spacing}'.
- To apply margin only to left and right, we can use 'fw-mx-#{$spacing}'.

*#{$spacing} can be multiples of 4 from 0 to 28.*

```html live
<template>
  <p class="fw-m-16">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
  </p>
</template>
```

### Spacing size chart

spacing | 0 | 4 | 8 | 12 | 16 | 20 | 24 | 28
--- | --- | --- | --- |--- |--- |--- |--- |---
rem | 0rem | 0.25rem | 0.5rem | 0.75rem | 1rem | 1.25rem | 1.5rem | 1.75
px (font size of the root element being 16px) | 0px | 4px | 8px | 12px | 16px | 20px | 24px | 28px


----------------------------------------------

Built with ❤ at Freshworks

# Typography

We can easily add font related styles through SASS mixin and CSS Utils.

For header content, we can use the 'fw-font-header-#{$size}'.  
For body content, we can use the 'fw-font-#{$size}'. 

*#{$size} has to be substituted with font size number.*

```html live
<template>
  <div class="container">
    <div class="fw-font-header-16">Lorem ipsum dolor</div>
    <div class="fw-font-12">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
    </div>
  </div>
</template>
```

----------------------------------------------

Built with ❤ at Freshworks

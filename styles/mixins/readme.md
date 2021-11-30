# Mixins Samples

## Typography
```html
<style lang="scss">
  .container {
    @include typography(
      'body',         // Type. Options are 'header' and 'body'
      16px,           // Size. Options are  '12px', '14px', '16px', '18px', '24px', '32px', '44px'
      #12344d,        // Color.
      400             // Weight
    );
  }
</style>
<template>
  <div class="container">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
  </div>
</template>
```

## Color:
```html
<style lang="scss">
  .warning {
    @include background('warning'); // Options available are 'dark', 'smoke', 'success', 'info', 'danger'.
  }
</style>
<template>
  <div class="warning">Do not remove.</div>
</template>
```

## Spacing:

### Padding:
```html 
<style lang="scss">
  .container {
    @include padding(10px, 20px, null, 20px); // Top Right Bottom Left. When passing null that particular style does not get included.
  }
</style>
<template>
  <p class="container">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
  </p>
</template>
```

### Margin: 
```html
<style lang="scss">
  .container {
    @include margin(10px, 20px, null, 20px); // Top Right Bottom Left. When passing null that particular style does not get included.
  }
</style>
<template>
  <p class="container">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium velit feugiat rutrum ultrices. Morbi elementum id velit sit amet scelerisque. Proin tempus placerat luctus. Maecenas pulvinar quis libero nec accumsan. Pellentesque in pharetra odio.
  </p>
</template>
```

## Card: 
```html
<style lang="scss">
  .card {
    width: 100px;
    padding: 20px 40px;
    @include card(3, 4px); // Including the scss mixin
  }
</style>
<template>
  <div class="card">Card elevation level 3</div>
</template>
```

----------------------------------------------

Built with ❤ at Freshworks
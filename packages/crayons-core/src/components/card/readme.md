# Card

Cards are usually container elements. They dont have functionality on their own. So, instead of adding them as components, SASS mixins and CSS classes are exposed to create cards easily when creating components. 


# As SASS Mixin
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

# As CSS Class
```html
  <template>
    <div class="fw-card-0">Card elevation level 0</div>
    <div class="fw-card-1">Card elevation level 1</div>
    <div class="fw-card-2">Card elevation level 2</div>
    <div class="fw-card-3">Card elevation level 3</div>
  </template>
```


----------------------------------------------

Built with ❤ at Freshworks
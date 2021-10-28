# Color

To use background util, we can use class 'fw-bg-#{$color}'.

*#{$color} can be substituted with 'dark', 'smoke', 'success', 'info', 'danger' and 'warning' values.*

```html live
<style>
  .box {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .box.fw-bg-dark {
    color: white;
  }
</style>
<template>
  <div class="fw-flex">
    <div class="box fw-flex-grow fw-bg-dark">Dark</div>
    <div class="box fw-flex-grow fw-bg-smoke">Smoke</div>
    <div class="box fw-flex-grow fw-bg-info">Info</div>
    <div class="box fw-flex-grow fw-bg-success">Success</div>
    <div class="box fw-flex-grow fw-bg-warning">Warning</div>  
    <div class="box fw-flex-grow fw-bg-danger">Danger</div>
  </div>
</template>
```

----------------------------------------------

Built with ❤ at Freshworks

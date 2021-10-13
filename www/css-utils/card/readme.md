# Card

Cards are usually container elements. They dont have functionality on their own. So, instead of adding them as components, SASS mixins and CSS classes are exposed to create cards easily when creating components. 


# Using SASS Mixin
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

# Using CSS Card and Layout utils

## Sample - card with interactive component - Variation 1
```html live
  <template>
    <div>
      <div class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
        <div class="fw-flex-grow">
          <div class="fw-font-header-16">Arabic</div>
          <div class="fw-font-12">Last updated - 25 June 2020</div>
        </div>
        <div class="fw-flex-grow-0">
          <fw-button color="secondary" class="fw-font-header-14"> Download existing </fw-button>
          <fw-button color="secondary" class="fw-font-header-14 fw-ml-8"> Update file </fw-button>
        </div>
        <div class="fw-flex-grow-0">
          <fw-button size="icon" color="text" role="button" class="fw-ml-12">
            <fw-icon name="delete"></fw-icon>
          </fw-button>
        </div>
      </div>
    </div>
  </template>
```

## Sample - card with interactive component - Variation 2
```html live
<template>
  <div>
    <div class="fw-card-2 fw-p-24 fw-flex fw-flex-row fw-items-center">
      <div class="fw-flex-grow">
        <div class="fw-font-header-14">Show typing indicator</div>
        <div class="fw-font-12">An indicator to see and share when messages are being typed</div>
      </div>
      <div class="fw-flex-grow-0">
        <fw-toggle size="medium" checked></fw-toggle>
      </div>
    </div>
  </div>
</template>
```

## Sample - End user widget cards 
```html live
<template>
  <div>
    <div class="fw-card-3 fw-p-20 fw-flex fw-flex-column">
      <div class="fw-flex">
        <span class="fw-flex-grow fw-font-header-18">Chat with us</span>
        <span class="fw-font-12"><a href="#">View history</a></span>
      </div>
      <div>
        <div class="fw-flex fw-flex-column fw-mt-4">
          <div class="fw-font-header-14">Support</div>
          <div class="fw-font-12">Typically replies within 5 minutes</div>
        </div>
      </div>
    </div>
  </div>
</template>
```


----------------------------------------------

Built with ❤ at Freshworks
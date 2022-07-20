# Card

Cards are usually container elements. They dont have functionality on their own. So, instead of adding them as components, CSS classes are exposed to create cards easily when creating components. 

To apply card css utils, we can use 'fw-card-#{$elevation}'

*#{$elevation} can be from 0-3.*

## Sample - card with interactive component 
```html live
  <template>
    <div class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <section class="fw-flex-grow">
        <h5 class="fw-type-h5 fw-my-0">Arabic</h5>
        <p class="fw-type-xs fw-my-0">Last updated - 25 June 2020</p>
      </section>
      <section class="fw-flex-grow-0">
        <fw-button color="secondary" class="fw-type-h6"> Download existing </fw-button>
        <fw-button color="secondary" class="fw-type-h6 fw-ml-8"> Update file </fw-button>
        <fw-button size="icon" color="text" role="button" class="fw-ml-12">
          <fw-icon name="delete" ></fw-icon>
        </fw-button>
      </section>
    </div>
  </template>
```

## Sample - card with interactive component 
```html live
<template>
  <div class="fw-card-2 fw-p-24 fw-flex fw-flex-row fw-items-center">
    <section class="fw-flex-grow">
      <h6 class="fw-type-h6 fw-my-0">Show typing indicator</h6>
      <p class="fw-type-xs fw-my-0">An indicator to see and share when messages are being typed</p>
    </section>
    <section class="fw-flex-grow-0">
      <fw-toggle size="medium" checked></fw-toggle>
    </section>
  </div>
</template>
```

## Sample - End user widget cards 
```html live
<template>
  <div class="fw-card-3 fw-p-20 fw-flex fw-flex-column">
    <section class="fw-flex">
      <h4 class="fw-flex-grow fw-type-h4 fw-my-0">Chat with us</h4>
      <a class="fw-type-xs" href="#">View history</a>
    </section>
    <section class="fw-flex fw-flex-column fw-mt-4">
      <h6 class="fw-type-h6 fw-my-0">Support</h6>
      <p class="fw-type-xs fw-my-0">Typically replies within 5 minutes</p>
    </section>
  </div>
</template>
```

## Sample - Conversation search result cards
```html live
<style>
  .options fw-icon {
    vertical-align: middle;
  }
</style>
<template>
  <div class="fw-card-1 fw-py-16 fw-px-20 fw-flex fw-flex-row">
    <section>
      <fw-avatar
        size="medium"
        image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
      ></fw-avatar>
    </section>
    <section class="fw-flex-grow fw-px-16 fw-flex fw-flex-column">
      <h5 class="fw-type-h5 fw-mt-0 fw-mb-8">Courtney Henry</h5>
      <p class="fw-type-xs fw-mt-0 fw-mb-16">Hey! I need help with cancellation of a combo pack that I had ordered yesterday.</p>
      <section class="fw-type-xs fw-flex fw-flex-row options">
        <span class="fw-pr-12">
          <span class="fw-mr-8"><fw-icon name="inbox" size="12" ></fw-icon></span>
          <span>Cancellation</span>
        </span>
        <span class="fw-px-12">Open</span>
        <span class="fw-px-12">Due in 1 hr</span>
        <span class="fw-px-12">Alex James (Me)</span>
      </section>
    </section>
    <section>
      <span class="fw-type-xs">11 May 2021, 5:30 PM</span>
    </section>
  </div>
</template>
```

----------------------------------------------

Built with ❤ at Freshworks
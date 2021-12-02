# Card

Cards are usually container elements. They dont have functionality on their own. So, instead of adding them as components, CSS classes are exposed to create cards easily when creating components. 

To apply card css utils, we can use 'fw-card-#{$elevation}'

*#{$elevation} can be from 0-3.*

## Sample - card with interactive component 
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

## Sample - card with interactive component 
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

## Sample - Conversation search result cards
```html live
<style>
  .options fw-icon {
    vertical-align: middle;
  }
</style>
<template>
  <div>
    <div class="fw-card-1 fw-py-16 fw-px-20 fw-flex fw-flex-row">
      <div>
        <fw-avatar
    size="medium"
    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  ></fw-avatar>
      </div>
      <div class="fw-flex-grow fw-px-16 fw-flex fw-flex-column">
        <div class="fw-font-header-16 fw-mb-8">Courtney Henry</div>
        <div class="fw-font-12 fw-mb-16">Hey! I need help with cancellation of a combo pack that I had ordered yesterday.</div>
        <div class="fw-font-12 fw-flex fw-flex-row options">
          <div class="fw-pr-12">
            <span class="fw-mr-8"><fw-icon name="inbox" size="12"></fw-icon></span>
            <span>Cancellation</span>
          </div>
          <div class="fw-px-12">Open</div>
          <div class="fw-px-12">Due in 1 hr</div>
          <div class="fw-px-12">Alex James (Me)</div>
        </div>
      </div>
      <div>
        <span class="fw-font-12">11 May 2021, 5:30 PM</span>
      </div>
    </div>
  </div>
</template>
```

----------------------------------------------

Built with ❤ at Freshworks
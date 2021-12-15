# Sortable (fw-sortable)

fw-sortable can be used to reorder a list items via drag and drop.

## Demo

fw-sortable is a custom component with an open shadow that acts as a wrapper to the list items having `draggable` attribute as true, that can be dragged and dropped with in the wrapper to change their order.

```html live
<template>
  <fw-sortable class="sort">
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Booking ID</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div draggable="false" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Customer Name</div>
      <fw-icon class="fw-flex-grow-0" name="lock"></fw-icon>
    </div>
    <div draggable="false" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Hotel</div>
      <fw-icon class="fw-flex-grow-0" name="lock"></fw-icon>
    </div>
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Number of Rooms</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">ID Number</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Payment Type</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Room Preference</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div draggable="true" class="fw-card-1 fw-p-24 fw-flex fw-flex-row">
      <div class="fw-flex-grow fw-type-h5">Check</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
  </fw-sortable>
</template>
```

<!-- Auto Generated Below -->


----------------------------------------------

Built with ❤ at Freshworks

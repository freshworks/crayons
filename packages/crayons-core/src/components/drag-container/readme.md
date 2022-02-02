# Drag Container (fw-drag-container)

fw-drag-container can be used to reorder a list items via drag and drop or move/copy items between two fw-drag-container elements.

## Demo

fw-drag-container is a custom component with an open shadow that acts as a wrapper to the list items having `draggable` attribute as true, that can be dragged and dropped with in the wrapper to change their order.

```html live
<template>
  <fw-drag-container>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Booking ID</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div
      draggable="false"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Customer Name</div>
      <fw-icon class="fw-flex-grow-0" name="lock"></fw-icon>
    </div>
    <div
      draggable="false"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Hotel</div>
      <fw-icon class="fw-flex-grow-0" name="lock"></fw-icon>
    </div>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Number of Rooms</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">ID Number</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Payment Type</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Room Preference</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
    <div
      draggable="true"
      class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
    >
      <div class="fw-flex-grow fw-type-h5">Check</div>
      <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
    </div>
  </fw-drag-container>
</template>
```

Demo for dragging items from one container to another container

```html live
<span>Retain the original drag element on drop</span>
<template>
  <div class="fw-flex flex-container-border fw-justify-around">
    <fw-drag-container
      id="source-field-copy"
      sortable="false"
      class="fw-b-1 fw-b-solid"
    >
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Input field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Select field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable=""
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Decimal field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Date & Time field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Button</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
    </fw-drag-container>

    <fw-drag-container
      accept-from="source-field-copy"
      add-on-drop="true"
      class="fw-b-1 fw-b-solid fw-b-casablanca-100"
    >
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Input field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
    </fw-drag-container>
  </div>
</template>

<span>Remove the drag element on drop</span>

<template>
  <div class="fw-flex flex-container-border fw-justify-around">
    <fw-drag-container
      id="source-field-move"
      sortable="false"
      class="fw-b-1 fw-b-solid"
    >
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Input field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable=""
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Select field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable=""
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Decimal field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Date & Time field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Button</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
    </fw-drag-container>

    <fw-drag-container
      id="drop-move"
      accept-from="source-field-move"
      add-on-drop="true"
      copy="false"
      class="fw-b-1 fw-b-solid fw-b-casablanca-100"
    >
      <div
        draggable="true"
        class="fw-card-1 fw-p-24 fw-flex fw-flex-row fw-content-center"
      >
        <div class="fw-flex-grow fw-type-h5">Input field</div>
        <fw-icon class="fw-flex-grow-0" name="drag"></fw-icon>
      </div>
    </fw-drag-container>
  </div>
</template>
<script type="application/javascript">
  var drop = document.getElementById('drop-move');
  drop.addEventListener('fwDrop', (e) => {
    console.log(e.detail);
  });
</script>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                   | Type      | Default |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `acceptFrom`       | `accept-from`       | Id of the fw-sortable element from which draggable content can be accepted. Add comma separated id's for multiple containers. | `string`  | `''`    |
| `addOnDrop`        | `add-on-drop`       | Whether the drag element should be added to the container on drop. If set to false, the placeholder will be retained.         | `boolean` | `true`  |
| `copy`             | `copy`              | Whether the drag element should be moved or copied.                                                                           | `boolean` | `true`  |
| `placeholderClass` | `placeholder-class` | The class name for the drag/drop placeholder. Add space separated class names for multiple classes                            | `string`  | `''`    |
| `sortable`         | `sortable`          | Whether the list should be sortable.                                                                                          | `boolean` | `true`  |


## Events

| Event    | Description                                                       | Type                |
| -------- | ----------------------------------------------------------------- | ------------------- |
| `fwDrop` | Triggered when an draggable item is dropped inside the container. | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks

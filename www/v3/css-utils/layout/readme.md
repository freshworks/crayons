# Layout

Flex utilities are provided in an atomic way to easily create any layout easily.

## Flex 

'fw-flex' is the class to include to create a **flex container**. 

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div class="fw-flex flex-container-border">
    <div class="flex-item-border fw-flex-grow">Flex item 1</div>
    <div class="flex-item-border fw-flex-grow">Flex item 2</div>
  </div>
</template>
```


### Flex Direction

'fw-flex-#{$direction}' is the class to establishes the main-axis for the **flex container**.

*#{$direction} should be substituted with one of these values 'row', 'row-reverse', 'column', 'column-reverse'.*

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Row Example:</span>
    <div class="fw-flex flex-container-border fw-flex-row">
      <div class="flex-item-border fw-flex-grow">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow">Flex item 2</div>
    </div>
    <br />
    <span>Row reverse example:</span>
    <div class="fw-flex flex-container-border fw-flex-row-reverse">
      <div class="flex-item-border fw-flex-grow">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow">Flex item 2</div>
    </div>
    <br />
    <span>Column example:</span>
    <div class="fw-flex flex-container-border fw-flex-column">
      <div class="flex-item-border fw-flex-grow">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow">Flex item 2</div>
    </div>
    <br />
    <span>Column reverse example:</span>
    <div class="fw-flex flex-container-border fw-flex-column-reverse">
      <div class="flex-item-border fw-flex-grow">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow">Flex item 2</div>
    </div>
  </div>
</template>
```

### Flex Wrap

'fw-flex-#{$wrap}' is a class that can be used to either wrap/unwrap/reverse-wrap items inside the **flex container**.

*#{$wrap} should be substituted with one of these values 'wrap', 'wrap-reverse', 'nowrap'.*

```html live 
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
    width: 100%;
  }
</style>
<template>
  <div>
    <span>Wrap example:</span>
    <div class="fw-flex flex-container-border fw-flex-wrap">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
    </div>
    <br />
    <span>Nowrap example:</span>
    <div class="fw-flex flex-container-border fw-flex-nowrap">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
    </div>
    <br />
    <span>Wrap reverse example:</span>
    <div class="fw-flex flex-container-border fw-flex-wrap-reverse">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
    </div>
  </div>
</template>
```

### Flex Justify

We can use 'fw-justify-#{$value}' class to position a flex item along a **flex container**'s main axis.

*#{$value} should be substituted with one of these values 'start', 'end', 'center', 'between', 'around', 'evenly'.*

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Start example:</span>
    <div class="fw-flex flex-container-border fw-justify-start">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>End example:</span>
    <div class="fw-flex flex-container-border fw-justify-end">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Center example:</span>
    <div class="fw-flex flex-container-border fw-justify-center">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Between example:</span>
    <div class="fw-flex flex-container-border fw-justify-between">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Around example:</span>
    <div class="fw-flex flex-container-border fw-justify-around">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Evenly example:</span>
    <div class="fw-flex flex-container-border fw-justify-evenly">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
  </div>
</template>
```

### Flex Align Contents

We can use 'fw-content-#{$name}' class to position items in multi-row **flex container**.

*#{$name} should be substituted with one of these values 'start', 'end', 'center', 'between', 'around', 'evenly'*

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
    height: 100px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
    width: 150px;
  }
</style>
<template>
  <div>
    <span>Start example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-start">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>End example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-end">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Center example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-center">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Between example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-between">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Around example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-around">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
    <br />
    <span>Evenly example:</span>
    <div class="fw-flex fw-flex-wrap flex-container-border fw-content-evenly">
      <div class="flex-item-border">Flex item 1</div>
      <div class="flex-item-border">Flex item 2</div>
      <div class="flex-item-border">Flex item 3</div>
      <div class="flex-item-border">Flex item 4</div>
      <div class="flex-item-border">Flex item 5</div>
      <div class="flex-item-border">Flex item 6</div>
      <div class="flex-item-border">Flex item 7</div>
    </div>
  </div>
</template>
```

### Flex Align Items

We can use 'fw-items-#{$item}' class to position a flex item along a **flex container**'s cross axis.

*#{$item} should be substituted with one of these values 'start', 'end', 'center', 'baseline', 'stretch'.*

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
    height: 60px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Start example:</span>
    <div class="fw-flex flex-container-border fw-items-start">
      <div class="flex-item-border fw-mr-8">Item 1</div>
      <div class="flex-item-border fw-mr-8">Item 2</div>
      <div class="flex-item-border fw-mr-8">Item 3</div>
      <div class="flex-item-border fw-mr-8">Item 4</div>
    </div>
    <br />
    <span>End example:</span>
    <div class="fw-flex flex-container-border fw-items-end">
      <div class="flex-item-border fw-mr-8">Item 1</div>
      <div class="flex-item-border fw-mr-8">Item 2</div>
      <div class="flex-item-border fw-mr-8">Item 3</div>
      <div class="flex-item-border fw-mr-8">Item 4</div>
    </div>
    <br />
    <span>Center example:</span>
    <div class="fw-flex flex-container-border fw-items-center">
      <div class="flex-item-border fw-mr-8">Item 1</div>
      <div class="flex-item-border fw-mr-8">Item 2</div>
      <div class="flex-item-border fw-mr-8">Item 3</div>
      <div class="flex-item-border fw-mr-8">Item 4</div>
    </div>
    <br />
    <span>Baseline example:</span>
    <div class="fw-flex flex-container-border fw-items-baseline">
      <div class="flex-item-border fw-mr-8">Item 1</div>
      <div class="flex-item-border fw-mr-8">Item 2</div>
      <div class="flex-item-border fw-mr-8">Item 3</div>
      <div class="flex-item-border fw-mr-8">Item 4</div>
    </div>
    <br />
    <span>Stretch example:</span>
    <div class="fw-flex flex-container-border fw-items-stretch">
      <div class="flex-item-border fw-mr-8">Item 1</div>
      <div class="flex-item-border fw-mr-8">Item 2</div>
      <div class="flex-item-border fw-mr-8">Item 3</div>
      <div class="flex-item-border fw-mr-8">Item 4</div>
    </div>
  </div>
</template>
```

### Flex Grow

We can use either 'fw-flex-grow-0' or 'fw-flex-grow' value in **flex items**. 'fw-flex-grow-0' to prevent a flex item from growing. 'fw-flex-grow' to allow a flex item to grow to fill any available space.

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Grow-0 example:</span>
    <div class="fw-flex flex-container-border">
      <div class="flex-item-border fw-flex-grow-0">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow-0">Flex item 2</div>
    </div>
    <br />
    <span>Grow example:</span>
    <div class="fw-flex flex-container-border">
      <div class="flex-item-border fw-flex-grow">Flex item 1</div>
      <div class="flex-item-border fw-flex-grow">Flex item 2</div>
    </div>
  </div>
</template>
```

### Flex Shrink

We can use either 'fw-flex-shrink-0' or 'fw-flex-shrink' value in **flex items**. 'fw-flex-shrink-0' to prevent a flex item from shrinking. 'fw-flex-shrink' to allow a **flex item** to shrink if needed.

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Shrink-0 example:</span>
    <div class="fw-flex flex-container-border">
      <div class="flex-item-border fw-flex-shrink-0" style="width: 70%;">Flex item 1</div>
      <div class="flex-item-border fw-flex-shrink-0" style="width: 31%;">Flex item 2</div>
    </div>
    <br />
    <span>Shrink example:</span>
    <div class="fw-flex flex-container-border">
      <div class="flex-item-border fw-flex-shrink" style="width: 70%;">Flex item 1</div>
      <div class="flex-item-border fw-flex-shrink" style="width: 31%;">Flex item 2</div>
    </div>
  </div>
</template>
```

### Flex Order

We can use 'fw-order-#{$number}' class to render **flex items** in a different order than they appear in the DOM.

*#{$number} should be substituted with a value from 0 to 12.*
*Other values that can be used are 'fw-order-first', 'fw-order-last', 'fw-order-none'.*

```html live
<style>
  .flex-container-border {
    border: 1px solid black;
    padding: 5px;
  }
  .flex-item-border {
    background: #2c5cc5; color: white; 
  }
</style>
<template>
  <div>
    <span>Order example:</span>
    <div class="fw-flex flex-container-border">
      <div class="flex-item-border fw-px-8 fw-order-5">1</div>
      <div class="flex-item-border fw-px-8 fw-order-4">2</div>
      <div class="flex-item-border fw-px-8 fw-order-3">3</div>
      <div class="flex-item-border fw-px-8 fw-order-2">4</div>
      <div class="flex-item-border fw-px-8 fw-order-1">5</div>
      <div class="flex-item-border fw-px-8 fw-order-first">6</div>
      <div class="flex-item-border fw-px-8 fw-order-last">7</div>
    </div>
  </div>
</template>
```

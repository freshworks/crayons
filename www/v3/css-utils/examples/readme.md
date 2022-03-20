## Examples

This page contains examples for creating layouts by combining various css utils.

## Example using border, font colors and typography

```html live
<style>
  .details {
    width: 70%;
  }
</style>
<template>
  <div class="details fw-bg-smoke-25">
    <div
      class="header fw-type-h6 fw-py-16 fw-px-16 fw-b-b-1 fw-b-solid fw-b-smoke-100"
    >
      Object details
    </div>
    <div class="body">
      <table>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Booking Id</td>
          <td class="fw-b-0 fw-type-h6">#123124</td>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Hotel</td>
          <a href="#">
            <td class="fw-b-0 fw-type-h6 fw-color-azure-800">Leela palace</td>
          </a>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Customer Name</td>
          <a href="#">
            <td class="fw-b-0 fw-type-h6 fw-color-azure-800">Daniel</td>
          </a>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Number of rooms</td>
          <td class="fw-b-0 fw-type-h6">2</td>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Booking Amount</td>
          <td class="fw-b-0 fw-type-h6">4,550</td>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">ID Number</td>
          <td class="fw-b-0 fw-type-h6">HDG25098797</td>
        </tr>
        <tr class="fw-b-0">
          <td class="fw-b-0 fw-type-sm">Contact number</td>
          <td class="fw-b-0 fw-type-h6">573627382384</td>
        </tr>
      </table>
    </div>
  </div>
</template>
```

## Example using card and typography

```html live
<template>
  <div>
    <div class="fw-card-1 fw-p-20 fw-flex fw-flex-column" style="width: 30%;">
      <div class="fw-flex fw-flex-row">
        <span class="fw-flex-grow fw-type-h7">Booking ID</span>
        <span class="fw-type-xs"><fw-icon name="arrow-right"></fw-icon></span>
      </div>
      <a href="#">
        <div class="fw-type-h6 fw-color-azure-800">#1237483</div>
      </a>

      <div class="fw-mt-20">
        <div class="fw-type-h7">Hotel</div>
        <a href="#">
          <div class="fw-type-h6 fw-mt-4 fw-color-azure-800">Leela Palace</div>
        </a>
      </div>

      <div class="fw-mt-20">
        <div class="fw-type-h7">Customer Name</div>
        <a href="#">
          <div class="fw-type-h6 fw-mt-4 fw-color-azure-800">David</div>
        </a>
      </div>
    </div>
  </div>
</template>
```

## Example using accordians, cards and typography

```html live
<div style="width:336px;">
  <fw-accordion
    style="--fw-accordion-border: 1px solid #F5F7F9; --fw-accordion-box-shadow: 0px 1px 8px rgba(152, 152, 152, 0.13); --fw-accordion-border-radius: 4px;"
    expanded="true"
  >
    <fw-accordion-title
      truncate-on-overflow="true"
      style="--fw-accordion-title-background-color: #F5F7F9;"
    >
      <fw-icon name="email"></fw-icon>
      <span style="padding-left: 5px;">Tickets</span>
    </fw-accordion-title>
    <fw-accordion-body style="--fw-accordion-body-background-color: #FFFFFF">
      <div>
        <div class="fw-card-1 fw-py-16 fw-px-20 fw-flex fw-flex-row">
          <div>
            <fw-avatar
              size="medium"
              image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            ></fw-avatar>
          </div>
          <div class="fw-flex-grow fw-px-16 fw-flex fw-flex-column">
            <div class="fw-type-xs">#123745</div>
            <div
              class="fw-type-sm fw-mb-16"
              style="white-space:nowrap;overflow:hidden; 
 text-overflow:ellipsis; width: 160px;"
            >
              Unclean rooms and washrooms
            </div>
            <div class="fw-type-xs">
              <fw-label value="Pending" color="yellow"></fw-label>
            </div>
          </div>
          <div>
            <span class="fw-type-xs"
              ><fw-icon name="chevron-right"></fw-icon
            ></span>
          </div>
        </div>
      </div>
      <div class="fw-mt-8">
        <div class="fw-card-1 fw-py-16 fw-px-20 fw-flex fw-flex-row">
          <div>
            <fw-avatar
              size="medium"
              image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            ></fw-avatar>
          </div>
          <div class="fw-flex-grow fw-px-16 fw-flex fw-flex-column">
            <div class="fw-type-xs">#123745</div>
            <div
              class="fw-type-sm fw-mb-16"
              style="white-space:nowrap;overflow:hidden; 
 text-overflow:ellipsis; width: 160px;"
            >
              Requesting partial refund
            </div>
            <div class="fw-type-xs">
              <fw-label value="Pending" color="yellow"></fw-label>
            </div>
          </div>
          <div>
            <span class="fw-type-xs"
              ><fw-icon name="chevron-right"></fw-icon
            ></span>
          </div>
        </div>
      </div>

      <br />
      <div class="fw-flex fw-justify-between">
        <fw-button color="secondary">View all tickets</fw-button>
        <fw-button color="secondary">Add a ticket</fw-button>
      </div>
    </fw-accordion-body>
  </fw-accordion>
</div>
```

## Example using font colors and typography

```html live
<style>
  tr {
    background-color: #fff;
  }
  td {
    width: 70%;
  }
</style>
<template>
  <div class="details">
    <table>
      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Booking Id</td>
        <td class="fw-type-h6 fw-b-0 fw-pt-20">#123124</td>
      </tr>
      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Hotel</td>
        <a href="#">
          <td class="fw-type-h6 fw-color-azure-800 fw-b-0 fw-pt-20">
            Hotel Ampala
          </td>
        </a>
      </tr>

      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Customer Name</td>
        <a href="#">
          <td class="fw-type-h6 fw-color-azure-800 fw-b-0 fw-pt-20">Daniel</td>
        </a>
      </tr>

      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Number of rooms</td>
        <td class="fw-type-h6 fw-b-0 fw-pt-20">2</td>
      </tr>

      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Booking Amount</td>
        <td class="fw-type-h6 fw-b-0 fw-pt-20">4,550</td>
      </tr>

      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">ID Number</td>
        <td class="fw-type-h6 fw-b-0 fw-pt-20">HDG25098797</td>
      </tr>

      <tr class="fw-b-0">
        <td class="fw-type-sm fw-b-0 fw-pt-20">Contact number</td>
        <td class="fw-type-h6 fw-b-0 fw-pt-20">573627382384</td>
      </tr>
    </table>
  </div>
</template>
```
